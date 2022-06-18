import { useEffect, useState } from 'react'
import {
  BooleanField,
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

  const [filter, setFilter] = useState<any>({ submitted: true })
  useEffect(() => {
    // Valid branch (not core)
    if (user && ['programming', 'design', 'marketing', 'content'].includes(user.branch)) {
      setFilter((f: any) => ({ ...f, confirmedBranch: user.branch }))
    }
  }, [user, isUserLoading])
  if (isIdentityLoading || isUserLoading) {
    return <p>Loading...</p>
  }

  return (
    <List filter={filter}>
      <Datagrid>
        <FunctionField
          label="รหัสอ้างอิง"
          render={(record: any) => {
            return `${record?.id?.slice(0, 9)}`
          }}
        />
        <TextField label="สาขา" source="confirmedBranch" />
        <TextField label="คะแนนรวม (ทุกคนที่ตรวจ)" source="totalScore" />
        <BooleanField label="มี 0 ไหม" source="hasZero" />
        <BooleanField label="ตรวจแล้ว" source={`checkedBy.${user?.name}`} />
        <EditButton />
      </Datagrid>
    </List>
  )
}
