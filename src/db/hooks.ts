import { useEffect, useMemo, useState } from 'react'

import { DocumentReference, onSnapshot } from 'firebase/firestore'

import { useAuthStore } from '@/auth/store'

import { getRegistrationRef, interviewCandidatesRef, registrationStatsRef } from '.'

export interface UseDocumentState<T> {
  pending: boolean
  data: T | undefined
}

export function useRegistrationRef() {
  const { uid } = useAuthStore()
  return useMemo(() => {
    return uid ? getRegistrationRef(uid) : null
  }, [uid])
}

export function useDocument<T>(ref: DocumentReference<T> | null) {
  const [state, setState] = useState<UseDocumentState<T>>({ pending: true, data: undefined })

  useEffect(() => {
    if (ref === null) {
      setState({ pending: true, data: undefined })
      return
    }
    setState({ pending: true, data: undefined })
    return onSnapshot(ref, (doc) => {
      setState({ pending: false, data: doc.data() })
    })
  }, [ref])

  return state
}

export function useRegistrationStats() {
  return useDocument(registrationStatsRef)
}

export function useInterviewCandidates() {
  return useDocument(interviewCandidatesRef)
}
