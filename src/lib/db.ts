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
import type { StepName } from '@/modules/register/questions'
import { BranchType } from '@/modules/register/types'
import { USE_FIRESTORE_EMULATOR } from '@/utils/env'

import { app } from './firebase'

const db = getFirestore(app)
const storage = getStorage()

if (USE_FIRESTORE_EMULATOR) {
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectStorageEmulator(storage, 'localhost', 9000)
}

function getRegistrationRef(uid?: string) {
  return doc(db, 'registrations', uid ? uid : getUid()) as DocumentReference<Registration>
}

function getStorageRef(filename: string) {
  return ref(storage, filename)
}

export type Answers = {
  [key in StepName]: any
}

interface Registration {
  answers: Answers
  currentStep: number
  farthestStep: number
  consented: boolean
  confirmedBranch: BranchType | null
  createdAt: Timestamp
  updatedAt: Timestamp
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
      farthestStep: 1,
      consented: false,
      confirmedBranch: null,
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp,
    }
    await setDoc(getRegistrationRef(uid), data)
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

export async function updateAnswers(stepName: StepName, newAnswers: any) {
  const answers = (await getRegistration()).answers[stepName]
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
  const storageRef = getStorageRef(name)
  const response = await getDownloadURL(storageRef)
  return response
}

function areAnswersChanged(oldAnswers: any, newAnswers: any) {
  return !equal(oldAnswers, newAnswers)
}
