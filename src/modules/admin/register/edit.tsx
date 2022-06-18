import { useMemo, useState } from 'react'
import {
  ArrayField,
  BooleanField,
  Datagrid,
  Edit,
  FunctionField,
  NumberField,
  SaveButton,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar,
  useGetIdentity,
  useGetOne,
} from 'react-admin'

import { BranchType } from '@/modules/register/types'

import { branchToQuestion } from '../constants'
import { UserAdmin } from '../types'
import { registrationTransform, renderQuestion } from '../utils'

const CommentsSection = () => {
  const [shown, setShown] = useState(false)
  const open = () => setShown((_) => true)
  const close = () => setShown((_) => false)
  if (!shown) {
    return (
      <button className="underline hover:text-green-500 font-bold cursor-pointer" onClick={open}>
        Show the comment
      </button>
    )
  }
  return (
    <>
      <ArrayField source="comments">
        <Datagrid>
          <TextField source="author" />
          <TextField source="body" />
        </Datagrid>
      </ArrayField>
      <button className="underline hover:text-red-500 font-bold cursor-pointer" onClick={close}>
        {"I don't want to see the comments. :("}
      </button>
    </>
  )
}

const UserEditToolbar = (props: any) => (
  <Toolbar {...props}>
    <SaveButton />
  </Toolbar>
)

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
      <SimpleForm toolbar={<UserEditToolbar />}>
        <TextField source="id" />
        <h2 className="text-3xl font-bold">
          มี 0 ไหม (ถ้าไม่มีช่องนี้ แสดงว่ายังไม่มีใครตรวจน้อง){' '}
        </h2>
        <BooleanField source="hasZero" />
        <h2 className="text-3xl font-bold">
          คะแนนรวม (ถ้าไม่มีช่องนี้ แสดงว่ายังไม่มีใครตรวจน้อง)
        </h2>
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
        <h2 className="text-xl font-bold">
          Comments (โปรดใช้วิจารณญาณในการอ่าน เพราะว่า comment เป็น subjective)
        </h2>
        <CommentsSection></CommentsSection>
        <TextInput
          defaultValue={user?.name}
          label="ชื่อคนเขียนเม้นท์ (แก้ไม่ได้)"
          className="pointer-events-none cursor-not-allowed"
          source="currentComment.author"
          validate={(val) => (val == user?.name ? undefined : "Can't change your name")}
        />
        <TextInput label="เนื้อหา" source="currentComment.body" />
      </SimpleForm>
    </Edit>
  )
}
