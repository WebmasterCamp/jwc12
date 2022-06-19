import { BooleanField, Datagrid, EditButton, FunctionField, List, TextField } from 'react-admin'

import { useUser } from '../hook/user'
import { RegisterActionButtons } from './actions'
import { FilterSidebar } from './filter'

export const RegistrationList = () => {
  const { user, isLoading } = useUser()

  if (isLoading) return null

  return (
    <List actions={<RegisterActionButtons />} aside={<FilterSidebar />}>
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
