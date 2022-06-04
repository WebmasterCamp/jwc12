import type { NextPage } from 'next'

import { withAuth } from '@/auth/withAuth'

const RegisterPage: NextPage = () => {
  return <>RegisterPage</>
}

export default withAuth(RegisterPage)
