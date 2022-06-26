import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

import { app } from './app'
import { db } from './db'

type Branch = 'programming' | 'design' | 'marketing' | 'content'
type Step = 1 | 2 | 3 | 4 | 5

interface PartialRegistration {
  furthestStep: Step
  confirmedBranch: Branch | null
  submitted: boolean
}

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
      const stepStats = await stepStatsDoc.get()
      const oldData = stepStats.data()

      const getValue = (step: Step, delta: number, branch: Branch | null, oldData: any) => {
        let stepKey: any = {
          [step.toString()]: admin.firestore.FieldValue.increment(delta),
        }
        if (step >= 3) {
          stepKey = {
            [step.toString()]: {
              ...oldData?.[step.toString()],
              [branch ?? 'unknown']: (oldData?.[step.toString()][branch ?? 'unknown'] ?? 0) + delta,
            },
          }
        }
        return stepKey
      }

      await stepStatsDoc.update({
        ...oldData,
        ...getValue(previousValue.furthestStep, -1, previousValue.confirmedBranch, oldData),
        ...getValue(newValue.furthestStep, 1, newValue.confirmedBranch, oldData),
      })
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

interface BranchCount {
  programming: number
  design: number
  marketing: number
  content: number
  all: number
}

export const refreshCounts = functions.https.onRequest(async (_, res) => {
  const branchConfirmedRegistrations = await db
    .collection('registrations')
    .select('confirmedBranch', 'submitted')
    .where('confirmedBranch', '!=', null)
    .get()

  const allRegistrations = await db
    .collection('registrations')
    .select('confirmedBranch', 'furthestStep')
    .get()

  const submittedCounts: BranchCount = {
    all: 0,
    programming: 0,
    design: 0,
    marketing: 0,
    content: 0,
  }
  const branchConfirmedCounts: BranchCount = JSON.parse(JSON.stringify(submittedCounts))
  const furthestStepCounts = {
    all: 0,
    '1': 0,
    '2': 0,
    '3': JSON.parse(JSON.stringify(submittedCounts)) as BranchCount,
    '4': JSON.parse(JSON.stringify(submittedCounts)) as BranchCount,
    '5': JSON.parse(JSON.stringify(submittedCounts)) as BranchCount,
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
    const branch = (doc.data() as PartialRegistration).confirmedBranch
    furthestStepCounts.all++
    if (furthestStep >= 3 && branch) {
      ;(furthestStepCounts[furthestStep] as BranchCount).all++
      ;(furthestStepCounts[furthestStep] as BranchCount)[branch]++
    } else {
      furthestStepCounts[furthestStep]++
    }
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
  const ids = (await Promise.all(
    registraions.docs.map(async (doc) => {
      const data = doc.data()
      if (!data.submitted) return null
      await createOrUpdateCheckDocs(doc.data(), doc.id, isStaging)
      return doc.id
    })
  )) as string[]
  return ids.filter((id) => id != null)
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

export const api = functions.https.onRequest(app)
