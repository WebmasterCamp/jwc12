import { useMemo, useState } from 'react'
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

const CommentsSection = () => {
  const [shown, setShown] = useState(false)
  const open = () => setShown((_) => true)
  const close = () => setShown((_) => false)
  if (!shown) {
    return <button onClick={open}>Show the comment</button>
  }
  return (
    <>
      <ArrayField source="comments">
        <Datagrid>
          <TextField source="author" />
          <TextField source="body" />
        </Datagrid>
      </ArrayField>
      <button onClick={close}>{"I don't want to see the comments. :("}</button>
    </>
  )
}

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
        <h3>Comments (โปรดใช้วิจารณญาณในการอ่าน เพราะว่า comment เป็น subjective)</h3>
        <CommentsSection></CommentsSection>
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
