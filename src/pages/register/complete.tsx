import type { NextPage } from 'next'

import { withAuth } from '@/auth/withAuth'

const CompletePage: NextPage = () => {
  return <>CompletePage</>
}

export default withAuth(CompletePage)
