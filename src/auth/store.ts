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

import { getRegistration, updateRegistration } from '@/lib/db'
import { USE_FIRESTORE_EMULATOR } from '@/utils/env'

export interface AuthStore {
  pending: boolean
  uid: string | null
  user: AuthUser | null
  currentStep: number
  farthestStep: number
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  updateStep: (current: number, furthest?: number) => Promise<void>
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

  if (typeof window !== 'undefined') {
    onAuthStateChanged(auth, async (user) => {
      const authUser = user
        ? {
            uid: user.uid,
            displayName: user.displayName ?? user.uid,
            photoURL: user.photoURL,
          }
        : null
      const { farthestStep, currentStep } = await getRegistration(user?.uid)
      set((state) => ({
        ...state,
        pending: false,
        uid: user?.uid ?? null,
        user: authUser,
        currentStep,
        farthestStep,
      }))
    })
  }

  const updateStep = async (current: number, farthest?: number) => {
    let data: Partial<AuthStore> = { currentStep: current }
    if (farthest) data = { ...data, farthestStep: farthest }
    await updateRegistration(data)
    set((state) => ({ ...state, ...data }))
  }

  return {
    pending: true,
    uid: null,
    user: null,
    currentStep: 0,
    farthestStep: 0,
    signIn,
    signOut,
    updateStep,
  }
})

export function getUid() {
  const uid = useAuthStore.getState().uid
  if (uid === null) {
    throw new Error('uid cannot be null')
  }
  return uid
}
