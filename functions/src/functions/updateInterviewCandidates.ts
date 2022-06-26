import { db } from '../db'

export interface CandidateInput {
  id: string
  firebaseId: string
}

interface CheckDocument {
  confirmedBranch: string
  answers: {
    basic: {
      firstName: string
      lastName: string
    }
  }
}

export async function updateInterviewCandidates(candidates: CandidateInput[]) {
  const infos = await Promise.all(candidates.map(getCandidateInfo))
  const candidatesDoc = db.doc('stats/interviewCandidates')
  await candidatesDoc.update({
    data: infos,
  })
}

async function getCandidateInfo(candidate: CandidateInput) {
  const { firebaseId, ...info } = candidate
  const doc = db.doc(`check/${firebaseId}`)
  const data = (await doc.get()).data() as CheckDocument
  const {
    confirmedBranch: branch,
    answers: {
      basic: { firstName, lastName },
    },
  } = data
  return { ...info, branch, firstName, lastName }
}
