import {
  GithubAuthProvider,
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
  user: AuthUser | null
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}

export interface AuthUser {
  uid: string
  displayName: string
  photoURL: string | null
}

const auth = getAuth()
if (USE_FIRESTORE_EMULATOR) {
  connectAuthEmulator(auth, 'http://localhost:9099')
}
const provider =
  process.env.MODE !== 'DEVELOPMENT' ? new FacebookAuthProvider() : new GithubAuthProvider()

export const useAuthStore = create<AuthStore>((set) => {
  const signIn = async () => {
    await signInWithPopup(auth, provider)
  }

  const signOut = async () => {
    await firebaseSignOut(auth)
  }

  onAuthStateChanged(auth, (user) => {
    const authUser = user
      ? {
          uid: user.uid,
          displayName: user.displayName ?? user.uid,
          photoURL: user.photoURL,
        }
      : null
    set((state) => ({
      ...state,
      pending: false,
      uid: user?.uid ?? null,
      user: authUser,
    }))
  })

  return {
    pending: true,
    uid: null,
    user: null,
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
