import * as admin from 'firebase-admin'
import * as functions from 'firebase-functions'

type Branch = 'programming' | 'design' | 'marketing' | 'content'

interface PartialRegistration {
  confirmedBranch: Branch | null
  submitted: boolean
}

admin.initializeApp()

const db = admin.firestore()
const statsDoc = db.doc('stats/registrations')

async function incrementRegistrationCount(branch: Branch, delta: number) {
  await statsDoc.update({
    [branch]: admin.firestore.FieldValue.increment(delta),
    all: admin.firestore.FieldValue.increment(delta),
  })
}

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
        await incrementRegistrationCount(previousValue.confirmedBranch, -1)
      }
      if (newValue.submitted && newValue.confirmedBranch !== null) {
        await incrementRegistrationCount(newValue.confirmedBranch, 1)
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
  await statsDoc.set(counts)
  res.status(200).send(JSON.stringify(counts))
})
