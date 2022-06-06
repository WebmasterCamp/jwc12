import { ComponentType } from 'react'

import { useRouter } from 'next/router'

import { Loading } from '@/components/Loading'
import { Redirect } from '@/components/Redirect'

import { useAuthStore } from './store'

export function withAuth<T>(Comp: ComponentType<T>) {
  return function WithAuth(props: T) {
    const { pending, uid } = useAuthStore()
    const router = useRouter()
    const path = router.asPath
    // Waiting for retreiving data from firebase
    if (pending) {
      return <Loading />
    }
    // User not logged in
    if (!uid) {
      return <Redirect to={`/login?redirect=${path}`} replace />
    }
    return <Comp {...props} />
  }
}
