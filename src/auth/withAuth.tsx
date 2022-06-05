import { ComponentType } from 'react'

import { useRouter } from 'next/router'

import { Loading } from '@/components/Loading'
import { Redirect } from '@/components/Redirect'

import { useAuthStore } from './store'

export function withAuth<T>(Comp: ComponentType<T>) {
  return function WithAuth(props: T) {
    const { pending, uid, farthestStep, consented } = useAuthStore()
    const router = useRouter()
    const path = router.asPath
    const step = router.query.step ? parseInt(router.query.step as string, 10) : 1
    // Waiting for retreiving data from firebase
    if (pending) {
      return <Loading />
    }
    // User not logged in
    if (!uid) {
      return <Redirect to={`/login?redirect=${path}`} replace />
    }
    // User logged in but not consent
    if (!consented && path !== '/register') {
      return <Redirect to={`/register`} replace />
    }
    // User loggedin but go further than the farthest step
    if (step > farthestStep) {
      return <Redirect to={`/register/step/${farthestStep}`} replace />
    }
    return <Comp {...props} />
  }
}
