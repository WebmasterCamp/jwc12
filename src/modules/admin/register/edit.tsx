import { useMemo } from 'react'
import {
  ArrayField,
  BooleanField,
  Datagrid,
  Edit,
  FunctionField,
  NumberField,
  SimpleForm,
  TextField,
  TextInput,
  useGetIdentity,
  useGetOne,
} from 'react-admin'

import { BranchType } from '@/modules/register/types'

import { branchToQuestion } from '../constants'
import { UserAdmin } from '../types'
import { registrationTransform, renderBranchQuestions, renderQuestion } from '../utils'

export const RegistrationEdit = () => {
  const { isLoading: isIdentityLoading, identity } = useGetIdentity()
  const { isLoading: isUserLoading, data: user } = useGetOne<UserAdmin>('users', {
    id: identity?.id ?? '',
  })

  const questions = useMemo(() => {
    return renderQuestion(
      branchToQuestion[`${user?.branch}` as BranchType],
      user?.branch || '',
      user
    )
  }, [user])

  if (isIdentityLoading || isUserLoading) {
    return <p>Loading...</p>
  }

  return (
    <Edit transform={registrationTransform}>
      <SimpleForm>
        <TextField source="id" />
        <TextField source="confirmedBranch" />
        <h2>มี 0 ไหม </h2>
        <BooleanField source="hasZero" />
        <h2>คะแนนรวม (ถ้าไม่มีช่องนี้ แสดงว่ายังไม่มีใครตรวจน้อง)</h2>
        <NumberField source="totalScore" />
        <FunctionField
          label="confirmedBranch"
          source="confirmedBranch"
          render={(record: any) => {
            return `Confirm Branch: ${record?.confirmedBranch}`
          }}
        />
        {questions}
        <NumberField source="score.total" />
        {/* TODO: Add collapsible */}
        <h3>Comments (โปรดใช้วิจารณญาณในการอ่าน เพราะว่า comment เป็น subjective)</h3>
        <ArrayField source="comments">
          <Datagrid>
            <TextField source="author" />
            <TextField source="body" />
          </Datagrid>
        </ArrayField>
        <TextInput
          defaultValue={user?.name}
          source="currentComment.author"
          validate={(val) => (val == user?.name ? undefined : "Can't change your name")}
        />
        <TextInput source="currentComment.body" />
      </SimpleForm>
    </Edit>
  )
}
