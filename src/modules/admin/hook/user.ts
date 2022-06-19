import { useGetIdentity, useGetOne } from 'react-admin'

import { UserAdmin } from '../types'

export const useUser = () => {
  const { isLoading: isIdentityLoading, identity } = useGetIdentity()
  const { isLoading: isUserLoading, data: user } = useGetOne<UserAdmin>('users', {
    id: identity?.id ?? '',
  })

  return {
    isLoading: isIdentityLoading || isUserLoading,
    user,
  }
}
