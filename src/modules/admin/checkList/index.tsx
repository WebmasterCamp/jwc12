import {
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  FunctionField,
  List,
  NumberField,
  TextField,
} from 'react-admin'

import { useUser } from '../hook/user'
import { RegisterActionButtons } from './actions'
import { FilterSidebar } from './filter'

export const CheckList = () => {
  const { user, isLoading, identity } = useUser()

  let source: string = ''
  if (user?.which && user?.branch !== 'core') {
    source = `score.branch_Q${user.which}`
  } else if (user?.which && user?.branch === 'core') {
    source = `score.core_Q${user.which}`
  }

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
        <TextField label="รหัสอ้างอิง" source="id" />
        <DateField label="สมัครตอนไหน" source="createdAt" locales="th-TH" showTime />
        <TextField label="สาขา" source="confirmedBranch" />
        <TextField label="คะแนนรวม" source="totalScore" defaultValue={0} />
        {source.length > 0 && <NumberField source={source} label="คะแนนที่ให้ล่าสุด" />}
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
