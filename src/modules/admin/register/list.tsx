import {
  Datagrid,
  EditButton,
  FunctionField,
  List,
  TextField,
  useGetIdentity,
  useGetOne,
} from 'react-admin'

import { UserAdmin } from '../types'

export const RegistrationList = () => {
  const { isLoading: isIdentityLoading, identity } = useGetIdentity()
  const { isLoading: isUserLoading, data: user } = useGetOne<UserAdmin>('users', {
    id: identity?.id ?? '',
  })

  if (isIdentityLoading || isUserLoading) {
    return <p>Loading...</p>
  }

  return (
    <List filter={{ submitted: true }}>
      <Datagrid>
        <FunctionField
          label="firstName"
          render={(record: any) => {
            return `${record?.answers?.basic?.firstName}`
          }}
        />
        <TextField source="confirmedBranch" />
        <TextField source="submitted" />
        <EditButton />
      </Datagrid>
    </List>
  )
}
