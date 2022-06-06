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
import { connectStorageEmulator, getBlob, getStorage, ref, uploadBytes } from 'firebase/storage'

import { getUid } from '@/auth/store'
import '@/lib/firebase'
import { app } from '@/lib/firebase'
import type { StepName } from '@/modules/register/questions'
import { USE_FIRESTORE_EMULATOR } from '@/utils/env'

import { Answers, Registration } from './types'

export * from './context'

const db = getFirestore(app)
const storage = getStorage()

if (USE_FIRESTORE_EMULATOR) {
  connectFirestoreEmulator(db, 'localhost', 8080)
  connectStorageEmulator(storage, 'localhost', 9000)
}

export function getRegistrationRef(uid?: string) {
  return doc(db, 'registrations', uid ? uid : getUid()) as DocumentReference<Registration>
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
  return await getBlob(storageRef)
}
