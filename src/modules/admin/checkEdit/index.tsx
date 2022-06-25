import React, { ReactNode, useMemo, useState } from 'react'
import {
  ArrayField,
  BooleanField,
  BooleanInput,
  Datagrid,
  Edit,
  FunctionField,
  NumberField,
  SaveButton,
  SimpleForm,
  TextField,
  TextInput,
  Toolbar,
} from 'react-admin'

import { BranchType } from '@/modules/register/types'

import { branchToQuestion } from '../constants'
import { useUser } from '../hook/user'
import { registrationTransform, renderQuestion } from '../utils'

const withContent = (title: string, content: ReactNode) => (
  <div className="flex flex-row items-center gap-x-4">
    <h3 className="font-bold inline text-lg">{title}</h3>
    <div>{content}</div>
  </div>
)

const CommentsSection = () => {
  const [shown, setShown] = useState(false)
  const open = () => setShown((_) => true)
  const close = () => setShown((_) => false)
  if (!shown) {
    return (
      <button className="underline hover:text-green-500 font-bold cursor-pointer" onClick={open}>
        Show the comment (โปรดใช้วิจารณญาณในการอ่าน)
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

export const CheckEdit = () => {
  const { user, isLoading, identity } = useUser()

  const questions = useMemo(() => {
    return renderQuestion(
      branchToQuestion[`${user?.branch}` as BranchType],
      user?.branch || '',
      user
    )
  }, [user])

  if (isLoading) {
    return <p>Loading...</p>
  }

  return (
    <Edit mutationMode="optimistic" transform={registrationTransform}>
      <SimpleForm toolbar={<UserEditToolbar />}>
        <div className="flex flex-col gap-y-4 w-full border-2 p-4 rounded-md">
          <FunctionField
            render={(record: any) => withContent('รหัสอ้างอิง', record?.id.slice(0, 9))}
          />
          <FunctionField
            label="confirmedBranch"
            source="confirmedBranch"
            render={(record: any) => withContent('ฝ่าย', record?.confirmedBranch)}
          />
          <FunctionField
            render={(record: any) =>
              withContent('คะแนนรวม', record?.totalScore ?? 'ยังไม่มีใครตรวจ')
            }
          />
          <FunctionField
            render={(record: any) => withContent('ที 0 ไหม', record?.hasZero ? 'ใช่' : 'ไม่ใช่')}
          />
          {questions}
        </div>
        <NumberField source="score.total" />
        <div className="flex flex-col gap-y-2 my-5 w-full border-2 p-4 rounded-md">
          <div className="flex flex-row items-center gap-x-4 w-full">
            <h3 className="font-bold inline text-lg">ชื่อผู้ตรวจ</h3>
            <span>{user?.name}</span>
          </div>
          <TextInput
            defaultValue={identity?.id}
            disabled
            label="checker id "
            className="pointer-events-none cursor-not-allowed"
            source="currentComment.author"
            validate={(val) => (val == identity?.id ? undefined : "Can't change your name")}
          />
          <div className="flex flex-col gap-x-4 w-full">
            <h3 className="font-bold inline text-lg">ความคิดเห็นของคุณ</h3>
            <TextInput label="comment" source="currentComment.body" />
          </div>
          <CommentsSection />
          <BooleanInput label="เอาน้องเข้าค่ายไหม" source="include" />
        </div>
      </SimpleForm>
    </Edit>
  )
}
