import { db } from '../db'

export interface Camper {
  firebaseId: string
  discordLink: string
}

export async function updatePublicCamperList(campers: Camper[]) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const publicCampers = campers.map(({ firebaseId, discordLink, ...camper }) => camper)
  const campersDoc = db.doc('stats/campers')
  await campersDoc.update({
    data: publicCampers,
  })
}

export async function updateInternalCamperList(campers: Camper[]) {
  const campersCollection = db.collection('campers')

  const deleteBatch = db.batch()
  const snapshot = await campersCollection.select().limit(100).get()
  snapshot.docs.forEach((doc) => {
    deleteBatch.delete(doc.ref)
  })
  await deleteBatch.commit()

  const createBatch = db.batch()
  campers.forEach((camper) => {
    createBatch.set(campersCollection.doc(camper.firebaseId), camper)
  })
  await createBatch.commit()
}
