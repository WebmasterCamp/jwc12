import equal from 'fast-deep-equal'
import {
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
import { USE_FIRESTORE_EMULATOR } from '@/utils/env'

import { app } from './firebase'

const db = getFirestore(app)
const storage = getStorage()

if (USE_FIRESTORE_EMULATOR) {
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectStorageEmulator(storage, 'localhost', 9000)
}

function getRegistrationRef(uid?: string) {
  return doc(db, 'registrations', uid ? uid : getUid())
}

function getStorageRef(filename: string) {
  return ref(storage, filename)
}

interface Registration {
  answers: any
  createdAt: Timestamp
  updatedAt: Timestamp
  currentStep: number
  farthestStep: number
  consent: boolean
}

export async function hasRegistration(uid?: string) {
  const docSnap = await getDoc(getRegistrationRef(uid))
  return docSnap.exists()
}

export async function getRegistration(uid?: string): Promise<Registration> {
  const docSnap = await getDoc(getRegistrationRef(uid))
  if (!docSnap.exists()) {
    await setDoc(getRegistrationRef(uid), {
      answers: {},
      currentStep: 1,
      farthestStep: 1,
      consent: false,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
    return await getRegistration(uid)
  }
  return docSnap.data() as Registration
}

export async function updateRegistration(data: Partial<Registration>) {
  return await updateDoc(getRegistrationRef(), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function updateAnswers(newAnswers: any) {
  const { answers } = await getRegistration()
  if (!areAnswersChanged(answers, newAnswers)) return
  return await updateRegistration({
    answers: { ...answers, ...newAnswers },
  })
}

function areAnswersChanged(oldAnswers: any, newAnswers: any) {
  return !equal(oldAnswers, newAnswers)
}

export async function uploadImage(name: string, file: File) {
  const storageRef = getStorageRef(name)
  await uploadBytes(storageRef, file)
}

export async function downloadImage(name: string) {
  const storageRef = getStorageRef(name)
  const response = await getDownloadURL(storageRef)
  return response
}
