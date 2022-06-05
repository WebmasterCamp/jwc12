import { ComponentType } from 'react'

import { useRouter } from 'next/router'

import { Loading } from '@/components/Loading'
import { Login } from '@/components/Login'
import { Redirect } from '@/components/Redirect'

import { useAuthStore } from './store'

export function withAuth<T>(Comp: ComponentType<T>) {
  return function WithAuth(props: T) {
    const { pending, uid, farthestStep } = useAuthStore()
    const router = useRouter()
    const step = router.query.step ? parseInt(router.query.step as string, 10) : 1
    if (pending) return <Loading />
    if (!uid) return <Login />
    if (step > farthestStep) return <Redirect to={`/register/step/${farthestStep}`} />
    return <Comp {...props} />
  }
}
