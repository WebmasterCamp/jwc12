import { db } from '../db'

export async function updateCamperList(campers: unknown[]) {
  const campersDoc = db.doc('stats/campers')
  await campersDoc.update({
    data: campers,
  })
}
