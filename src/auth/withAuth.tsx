import { ComponentType } from 'react'

import { Redirect } from '@/components/Redirect'

import { useAuthStore } from './store'

export function withAuth<T>(Comp: ComponentType<T>) {
  return function WithAuth(props: T) {
    const { pending, uid } = useAuthStore()
    if (pending) return <>Loading...</>
    if (!uid) return <Redirect to="/" />
    return <Comp {...props} />
  }
}
