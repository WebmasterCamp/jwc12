import type { NextPage } from 'next'
import { useRouter } from 'next/router'

import { useAuthStore } from '@/auth/store'
import { Login } from '@/components/Login'
import { Redirect } from '@/components/Redirect'

const LoginPage: NextPage = () => {
  const router = useRouter()
  const redirectTo = router.query.redirect as string | null
  const { user } = useAuthStore()

  if (user) {
    return <Redirect to={redirectTo ? redirectTo : `/register`} replace />
  }

  return <Login />
}

export default LoginPage
