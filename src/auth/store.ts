import {
  connectAuthEmulator,
  signOut as firebaseSignOut,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
} from 'firebase/auth'
import { FacebookAuthProvider } from 'firebase/auth'
import create from 'zustand'

import { USE_FIRESTORE_EMULATOR } from '@/utils/env'

export interface AuthStore {
  pending: boolean
  uid: string | null
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

const auth = getAuth()
if (USE_FIRESTORE_EMULATOR) {
  connectAuthEmulator(auth, 'http://localhost:9099')
}
const provider = new FacebookAuthProvider()

export const useAuthStore = create<AuthStore>((set) => {
  const signIn = async () => {
    await signInWithPopup(auth, provider)
  }

  const signOut = async () => {
    await firebaseSignOut(auth)
  }

  onAuthStateChanged(auth, (user) => {
    set((state) => ({
      ...state,
      pending: false,
      uid: user?.uid ?? null,
    }))
  })

  return {
    pending: true,
    uid: null,
    signIn,
    signOut,
  }
})

export function getUid() {
  const uid = useAuthStore.getState().uid
  if (uid === null) {
    throw new Error('uid cannot be null')
  }
  return uid
}
