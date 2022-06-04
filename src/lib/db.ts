import { connectFirestoreEmulator, doc, getDoc, getFirestore, setDoc } from 'firebase/firestore'

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

export async function hasRegistered() {
  const docSnap = await getDoc(getRegistrationRef())
  return docSnap.exists()
}

export async function getRegistrationData() {
  const docSnap = await getDoc(getRegistrationRef())
  return docSnap.data()
}

export async function setRegistrationData(data: any) {
  return setDoc(getRegistrationRef(), data)
}
