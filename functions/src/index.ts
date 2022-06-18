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

async function createOrUpdateCheckDocs(data: any, userId: string, isStaging = true) {
  const collectionName = isStaging ? 'check_staging' : 'check'
  const checkDoc = db.doc(`${collectionName}/${userId}`)
  const checkDocExists = await checkDoc.get()
  if (checkDocExists.exists) {
    await checkDoc.update(data)
  } else {
    await checkDoc.create(data)
  }
}

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

export const onCreate = functions.firestore
  .document('registrations/{userId}')
  .onCreate(async (snap) => {
    const newValue = snap.data() as PartialRegistration
    await stepStatsDoc.update({
      [newValue.furthestStep.toString()]: admin.firestore.FieldValue.increment(1),
      all: admin.firestore.FieldValue.increment(1),
    })
  })

export const onChange = functions.firestore
  .document('registrations/{userId}')
  .onUpdate(async (change, context) => {
    const userId = context.params.userId
    const newValue = change.after.data() as PartialRegistration
    const previousValue = change.before.data() as PartialRegistration

    // CASE : Change furthest step
    if (newValue.furthestStep > previousValue.furthestStep) {
      await incrementStepStats(newValue.furthestStep, previousValue.furthestStep, 1)
    }

    // CASE : Confirm branch
    if (
      newValue.confirmedBranch !== previousValue.confirmedBranch &&
      newValue.confirmedBranch !== null
    ) {
      await incrementBranchStats(branchStatsDoc, newValue.confirmedBranch, 1)
    }

    // CASE : Submit
    if (
      newValue.confirmedBranch !== previousValue.confirmedBranch ||
      newValue.submitted !== previousValue.submitted
    ) {
      await createOrUpdateCheckDocs(newValue, userId, false)

      if (previousValue.submitted && previousValue.confirmedBranch !== null) {
        await incrementBranchStats(registrationStatsDoc, previousValue.confirmedBranch, -1)
      }
      if (newValue.submitted && newValue.confirmedBranch !== null) {
        await incrementBranchStats(registrationStatsDoc, newValue.confirmedBranch, 1)
      }
    }
  })

export const onStagingChange = functions.firestore
  .document('registrations_staging/{userId}')
  .onUpdate(async (change, context) => {
    const userId = context.params.userId
    const newValue = change.after.data() as PartialRegistration
    const previousValue = change.before.data() as PartialRegistration

    // CASE : Submit
    if (
      newValue.confirmedBranch !== previousValue.confirmedBranch ||
      newValue.submitted !== previousValue.submitted
    ) {
      await createOrUpdateCheckDocs(newValue, userId)

      if (previousValue.submitted && previousValue.confirmedBranch !== null) {
        await incrementBranchStats(registrationStatsDoc, previousValue.confirmedBranch, -1)
      }
      if (newValue.submitted && newValue.confirmedBranch !== null) {
        await incrementBranchStats(registrationStatsDoc, newValue.confirmedBranch, 1)
      }
    }
  })

export const refreshCounts = functions.https.onRequest(async (_, res) => {
  const branchConfirmedRegistrations = await db
    .collection('registrations')
    .select('confirmedBranch', 'submitted')
    .where('confirmedBranch', '!=', null)
    .get()

  const allRegistrations = await db.collection('registrations').select('furthestStep').get()

  const submittedCounts = {
    all: 0,
    programming: 0,
    design: 0,
    marketing: 0,
    content: 0,
  }
  const branchConfirmedCounts = {
    all: 0,
    programming: 0,
    design: 0,
    marketing: 0,
    content: 0,
  }
  const furthestStepCounts = {
    all: 0,
    '1': 0,
    '2': 0,
    '3': 0,
    '4': 0,
    '5': 0,
  }

  branchConfirmedRegistrations.forEach((doc) => {
    const branch = (doc.data() as PartialRegistration).confirmedBranch
    const submitted = (doc.data() as PartialRegistration).submitted
    if (branch != null) {
      if (submitted) submittedCounts[branch]++
      branchConfirmedCounts[branch]++
    }
    if (submitted) submittedCounts.all++
    branchConfirmedCounts.all++
  })

  allRegistrations.forEach((doc) => {
    const furthestStep = (doc.data() as PartialRegistration).furthestStep
    furthestStepCounts[furthestStep]++
    furthestStepCounts.all++
  })

  await registrationStatsDoc.set(submittedCounts)
  await branchStatsDoc.set(branchConfirmedCounts)
  await stepStatsDoc.set(furthestStepCounts)

  res
    .status(200)
    .send(JSON.stringify({ submittedCounts, branchConfirmedCounts, furthestStepCounts }))
})

async function setupCheckDoc(
  registraions: admin.firestore.QuerySnapshot<admin.firestore.DocumentData>,
  isStaging: boolean
) {
  const ids = await Promise.all(
    registraions.docs
      .map(async (doc) => {
        const data = doc.data()
        if (!data.submitted) return null
        await createOrUpdateCheckDocs(doc.data(), doc.id, isStaging)
        return doc.id
      })
      .filter((id) => id !== null)
  )
  return ids
}

export const initializeCheckStagingDocs = functions.https.onRequest(async (_, res) => {
  const allRegistrations = await db.collection('registrations_staging').get()
  const ids = await setupCheckDoc(allRegistrations, true)
  res.status(200).json({ ids, total: ids.length })
})

export const initializeCheckDocs = functions.https.onRequest(async (_, res) => {
  const allRegistrations = await db.collection('registrations').get()
  const ids = await setupCheckDoc(allRegistrations, false)
  res.status(200).json({ ids, total: ids.length })
})
