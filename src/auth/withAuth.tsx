import { ComponentType } from 'react'

import { Login } from '@/components/Login'

import { useAuthStore } from './store'

export function withAuth<T>(Comp: ComponentType<T>) {
  return function WithAuth(props: T) {
    const { pending, uid } = useAuthStore()
    if (pending) return <>Loading...</>
    if (!uid) return <Login />
    return <Comp {...props} />
  }
}