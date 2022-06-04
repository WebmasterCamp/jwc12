import type { NextPage } from 'next'

import { withAuth } from '@/auth/withAuth'
import { Redirect } from '@/components/Redirect'

const RegisterPage: NextPage = () => {
  return <Redirect to="/register/step/1" />
}

export default withAuth(RegisterPage)
