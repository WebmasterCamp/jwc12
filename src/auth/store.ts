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
import { BranchType } from '@/modules/register/types'
import { USE_FIRESTORE_EMULATOR } from '@/utils/env'

export interface AuthStore {
  pending: boolean
  uid: string | null
  user: AuthUser | null
  currentStep: number
  farthestStep: number
  consented: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
  updateStep: (current: number, furthest?: number) => Promise<void>
  updateConsent: (consent: boolean) => Promise<void>
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

export const useAuthStore = create<AuthStore>((set, get) => {
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
      let data: Partial<AuthStore> = {
        pending: false,
        uid: user?.uid ?? null,
        user: authUser,
      }
      if (user) {
        const { farthestStep, currentStep, consented } = await getRegistration(user.uid)
        data = {
          ...data,
          currentStep,
          farthestStep,
          consented,
        }
      }
      set((state) => ({
        ...state,
        ...data,
      }))
    })
  }

  const updateStep = async (current: number, farthest?: number) => {
    const storedStep = get().currentStep
    if (storedStep === current && !farthest) return
    let data: Partial<AuthStore> = { currentStep: current }
    if (farthest) data = { ...data, farthestStep: farthest }
    await updateRegistration(data)
    set((state) => ({ ...state, ...data }))
  }

  const updateConsent = async (consent: boolean) => {
    await updateRegistration({ consented: consent })
    set((state) => ({ ...state, consent }))
  }

  return {
    pending: true,
    uid: null,
    user: null,
    currentStep: 0,
    farthestStep: 0,
    consented: false,
    signIn,
    signOut,
    updateStep,
    updateConsent,
  }
})

export function getUid() {
  const uid = useAuthStore.getState().uid
  if (uid === null) {
    throw new Error('uid cannot be null')
  }
  return uid
}
