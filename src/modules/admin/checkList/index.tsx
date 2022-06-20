import { BooleanField, Datagrid, EditButton, FunctionField, List, TextField } from 'react-admin'

import { useUser } from '../hook/user'
import { RegisterActionButtons } from './actions'
import { FilterSidebar } from './filter'

export const CheckList = () => {
  const { user, isLoading, identity } = useUser()

  if (isLoading) return null

  console.log(user?.branch)

  const filter =
    user?.branch === 'core'
      ? { submitted: true }
      : { submitted: true, confirmedBranch: user?.branch }

  return (
    <List
      actions={<RegisterActionButtons />}
      aside={<FilterSidebar />}
      perPage={100}
      filter={filter}
    >
      <Datagrid>
        <FunctionField
          label="รหัสอ้างอิง"
          render={(record: any) => {
            return `${record?.id?.slice(0, 9)}`
          }}
        />
        <TextField label="สาขา" source="confirmedBranch" />
        <FunctionField
          label="คะแนนรวม (ทุกคนที่ตรวจ)"
          render={(record: any) => {
            return record?.totalScore ?? 0
          }}
        />
        <BooleanField label="มี 0 ไหม" source="hasZero" />
        <FunctionField
          label="ตรวจแล้ว"
          render={(record: any) => {
            return `${record?.checkedBy?.[identity?.id ?? ''] ? 'Y' : 'N'}`
          }}
        />
        <EditButton label="" />
      </Datagrid>
    </List>
  )
}
