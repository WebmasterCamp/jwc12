import { ComponentType } from 'react'

import { Redirect } from '@/components/Redirect'

import { useAuthStore } from './store'

export function withAuth(Comp: ComponentType) {
  return function WithAuth() {
    const { pending, uid } = useAuthStore()
    if (pending) return <>Loading...</>
    if (!uid) return <Redirect to="/" />
    return <Comp />
  }
}
