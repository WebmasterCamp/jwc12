import toast from 'react-hot-toast'

import equal from 'fast-deep-equal'
import {
  DocumentReference,
  Timestamp,
  connectFirestoreEmulator,
  doc,
  getDoc,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import {
  connectStorageEmulator,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from 'firebase/storage'

import { getUid } from '@/auth/store'
import '@/lib/firebase'
import { app } from '@/lib/firebase'
import type { StepName } from '@/modules/register/questions'
import { USE_FIRESTORE_EMULATOR } from '@/utils/env'

import {
  Answers,
  Camper,
  CamperListDocument,
  InterviewCandidatesDocument,
  Registration,
  RegistrationStats,
} from './types'

export * from './context'

const db = getFirestore(app)
const storage = getStorage()

export const registrationStatsRef = doc(
  db,
  'stats',
  'registrations'
) as DocumentReference<RegistrationStats>

export const interviewCandidatesRef = doc(
  db,
  'stats',
  'interviewCandidates'
) as DocumentReference<InterviewCandidatesDocument>

export const campersRef = doc(db, 'stats', 'campers') as DocumentReference<CamperListDocument>

if (USE_FIRESTORE_EMULATOR) {
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectStorageEmulator(storage, 'localhost', 9000)
}

export function getRegistrationRef(uid?: string) {
  const target = process.env.MODE === 'PRODUCTION' ? 'registrations' : 'registrations_staging'
  return doc(db, target, uid ? uid : getUid()) as DocumentReference<Registration>
}

export function getCamperRef(uid?: string) {
  if (process.env.MODE !== 'production') {
    return doc(db, 'campers_staging', 'mock') as DocumentReference<Camper>
  }
  return doc(db, 'campers', uid ? uid : getUid()) as DocumentReference<Camper>
}

function getStorageRef(filename: string) {
  return ref(storage, filename)
}

export async function hasRegistration(uid?: string) {
  const docSnap = await getDoc(getRegistrationRef(uid))
  return docSnap.exists()
}

export async function getRegistration(uid?: string): Promise<Registration> {
  const docSnap = await getDoc(getRegistrationRef(uid))
  if (!docSnap.exists()) {
    const data: Partial<Registration> = {
      answers: {
        basic: {},
        additional: {},
        core: {},
        branch: {},
      },
      currentStep: 1,
      furthestStep: 1,
      consented: false,
      confirmedBranch: null,
      submitted: false,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
    }
    await setDoc(getRegistrationRef(uid), data)
    return await getRegistration(uid)
  }
  return docSnap.data() as Registration
}

export async function getCamper(uid?: string): Promise<Camper | null> {
  const docSnap = await getDoc(getCamperRef(uid))
  if (!docSnap.exists()) {
    return null
  }
  return docSnap.data()
}

export async function updateRegistration(data: Partial<Registration>) {
  try {
    return await updateDoc(getRegistrationRef(), {
      ...data,
      updatedAt: serverTimestamp(),
    })
  } catch (e) {
    toast.error('ไม่สามารถบันทึกข้อมูลได้ โปรดรีเฟรชแล้วลองอีกครั้ง')
    throw e
  }
}

export async function updateAnswers(allAnswers: Answers, stepName: StepName, newAnswers: any) {
  const answers = allAnswers[stepName]
  let shouldUpdate = false
  const updateObject = {} as any
  Object.keys(newAnswers).forEach((key) => {
    const oldAnswer = answers[key]
    const newAnswer = newAnswers[key]
    if (equal(oldAnswer, newAnswer)) return
    shouldUpdate = true
    updateObject[`answers.${stepName}.${key}`] = newAnswer
  })
  if (!shouldUpdate) return
  return await updateRegistration(updateObject)
}

export async function uploadImage(name: string, file: File) {
  const storageRef = getStorageRef(name)
  await uploadBytes(storageRef, file)
}

export async function downloadImage(name: string) {
  const fileName = name.split('?')[0]
  const storageRef = getStorageRef(fileName)
  return await getDownloadURL(storageRef)
}
