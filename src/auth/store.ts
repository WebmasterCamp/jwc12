import toast from 'react-hot-toast'

import { FirebaseError } from 'firebase/app'
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

import { getRegistration, updateRegistration } from '@/db'
import '@/lib/firebase'
import { BranchType } from '@/modules/register/types'
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
    try {
      await signInWithPopup(auth, provider)
    } catch (e) {
      if (e instanceof FirebaseError) {
        if (e.code === 'auth/popup-closed-by-user') return
        toast.error(`ไม่สามารถเข้าสู่ระบบได้ (${e.code})`)
      } else {
        toast.error('ไม่สามารถเข้าสู่ระบบได้')
      }
    }
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
      const data: Partial<AuthStore> = {
        pending: false,
        uid: user?.uid ?? null,
        user: authUser,
      }
      if (user) {
        await getRegistration(user.uid)
      }
      set((state) => ({
        ...state,
        ...data,
      }))
    })
  }

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
