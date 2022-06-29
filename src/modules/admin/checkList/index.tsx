import {
  BooleanField,
  Datagrid,
  DateField,
  EditButton,
  FunctionField,
  List,
  NumberField,
  TextField,
  useRecordContext,
} from 'react-admin'

import clsx from 'clsx'

import { useUser } from '../hook/user'
import { RegisterActionButtons } from './actions'
import { FilterSidebar } from './filter'

const IncludeField = ({ label = 'เอาน้องคนนี้ไหม' }) => {
  const record = useRecordContext()
  const include = record?.include
  return (
    <FunctionField
      label={label}
      sx={{
        color: include ? 'rgb(6 78 59);' : 'rgb(239 68 68)',
        textDecoration: include ? 'underline' : 'line-through',
      }}
      render={(record: any) => {
        return `${record?.include ? 'ใช่' : 'ไม่'}`
      }}
    />
  )
}

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
        <FunctionField
          label="ชื่อ"
          source="answers.basic.firstName"
          render={(record: any) =>
            `${record?.answers?.basic?.firstName} ${record?.answers?.basic?.lastName} (${record?.answers?.basic?.nickname})`
          }
        />
        {/* <TextField label="ชื่อจริง" source="answers.basic.firstName" />
        <TextField label="นามสกุล" source="answers.basic.lastName" />
        <TextField label="ชื่อเล่น" source="answers.basic.nickname" /> */}
        <TextField label="สาขา" source="confirmedBranch" />
        <TextField label="คะแนนรวม" source="totalScore" defaultValue={0} />
        {/* {source.length > 0 && <NumberField source={source} label="คะแนนที่ให้ล่าสุด" />}
        ludeField label="เอาน้องคนนี้ไหม" /> */}
        <EditButton label="" />
      </Datagrid>
    </List>
  )
}
