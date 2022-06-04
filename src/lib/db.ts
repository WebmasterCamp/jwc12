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

import { getUid } from '@/auth/store'
import { USE_FIRESTORE_EMULATOR } from '@/utils/env'

import { app } from './firebase'

const db = getFirestore(app)
if (USE_FIRESTORE_EMULATOR) {
  connectFirestoreEmulator(db, 'localhost', 8080)
}

function getRegistrationRef() {
  return doc(db, 'registrations', getUid())
}

interface Registration {
  answers: any
  createdAt: Timestamp
  updatedAt: Timestamp
}

export async function hasRegistration() {
  const docSnap = await getDoc(getRegistrationRef())
  return docSnap.exists()
}

export async function getRegistration() {
  if (!(await hasRegistration())) {
    await setDoc(getRegistrationRef(), {
      answers: {},
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  }
  const docSnap = await getDoc(getRegistrationRef())
  return docSnap.data() as Registration
}

export async function updateRegistration(data: Partial<Registration>) {
  await getRegistration()
  return await updateDoc(getRegistrationRef(), {
    ...data,
    updatedAt: serverTimestamp(),
  })
}

export async function updateAnswers(newAnswers: any) {
  const { answers } = await getRegistration()
  return await updateRegistration({
    answers: { ...answers, ...newAnswers },
  })
}
