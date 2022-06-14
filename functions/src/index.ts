import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

type Branch = 'programming' | 'design' | 'marketing' | 'content'
type Step = 1 | 2 | 3 | 4 | 5

interface PartialRegistration {
  furthestStep: Step
  confirmedBranch: Branch | null
  submitted: boolean
}

admin.initializeApp()

const db = admin.firestore()
const registrationStatsDoc = db.doc('stats/registrations')
const branchStatsDoc = db.doc('stats/branchConfirmed')
const stepStatsDoc = db.doc('stats/furthestStep')

async function incrementBranchStats(
  doc: admin.firestore.DocumentReference<admin.firestore.DocumentData>,
  branch: Branch,
  delta: number
) {
  await doc.update({
    [branch]: admin.firestore.FieldValue.increment(delta),
    all: admin.firestore.FieldValue.increment(delta),
  })
}

async function incrementStepStats(newStep: Step, previousStep: Step, delta: number) {
  await stepStatsDoc.update({
    [newStep.toString()]: admin.firestore.FieldValue.increment(delta),
    [previousStep.toString()]: admin.firestore.FieldValue.increment(-delta),
  })
}

export const onChangeStep = functions.firestore
  .document('registrations/{userId}')
  .onUpdate(async (change) => {
    const newValue = change.after.data() as PartialRegistration
    const previousValue = change.before.data() as PartialRegistration
    if (newValue.furthestStep > previousValue.furthestStep) {
      await incrementStepStats(newValue.furthestStep, previousValue.furthestStep, 1)
    }
  })

export const onConfirmBranch = functions.firestore
  .document('registrations/{userId}')
  .onUpdate(async (change) => {
    const newValue = change.after.data() as PartialRegistration
    const previousValue = change.before.data() as PartialRegistration
    if (
      newValue.confirmedBranch !== previousValue.confirmedBranch &&
      newValue.confirmedBranch !== null
    ) {
      await incrementBranchStats(branchStatsDoc, newValue.confirmedBranch, 1)
    }
  })

export const onSubmit = functions.firestore
  .document('registrations/{userId}')
  .onUpdate(async (change) => {
    const newValue = change.after.data() as PartialRegistration
    const previousValue = change.before.data() as PartialRegistration
    if (
      newValue.confirmedBranch !== previousValue.confirmedBranch ||
      newValue.submitted !== previousValue.submitted
    ) {
      if (previousValue.submitted && previousValue.confirmedBranch !== null) {
        await incrementBranchStats(registrationStatsDoc, previousValue.confirmedBranch, -1)
      }
      if (newValue.submitted && newValue.confirmedBranch !== null) {
        await incrementBranchStats(registrationStatsDoc, newValue.confirmedBranch, 1)
      }
    }
  })

export const refreshCounts = functions.https.onRequest(async (_, res) => {
  const registrations = await db
    .collection('registrations')
    .select('confirmedBranch')
    .where('submitted', '==', true)
    .where('confirmedBranch', '!=', null)
    .get()
  const counts = {
    all: 0,
    programming: 0,
    design: 0,
    marketing: 0,
    content: 0,
  }
  registrations.forEach((doc) => {
    const branch = (doc.data() as PartialRegistration).confirmedBranch
    if (branch != null) {
      counts[branch]++
    }
    counts.all++
  })
  await registrationStatsDoc.set(counts)
  res.status(200).send(JSON.stringify(counts))
})
