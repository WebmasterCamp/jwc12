import { Fragment, useEffect, useState } from 'react'
import {
  Admin,
  ArrayField,
  BooleanField,
  Datagrid,
  DateField,
  Edit,
  EditButton,
  List,
  NumberField,
  NumberInput,
  RaRecord,
  Resource,
  SimpleForm,
  TextField,
  TextInput,
  useGetIdentity,
  useGetOne,
} from 'react-admin'

import { contentQuestions } from '@/modules/register/questions/content'
import { coreQuestions } from '@/modules/register/questions/core'
import { designQuestions } from '@/modules/register/questions/design'
import { marketingQuestions } from '@/modules/register/questions/marketing'
import { programmingQuestions } from '@/modules/register/questions/programming'
import { InputType, Question, SimpleInput } from '@/modules/register/types'

import { authProvider, dataProvider } from './adminConfig'

const branchToQuestion = {
  marketing: marketingQuestions,
  programming: programmingQuestions,
  content: contentQuestions,
  design: designQuestions,
  core: coreQuestions,
} as {
  [key: string]: Question
}

function renderBranchQuestions(question: Question, branch: string, checker: any) {
  if (typeof checker.name != 'string') {
    return <p className="text-red-500 font-bold text-5xl">Please set your name first!!!</p>
  }
  return question.inputs
    .filter((it) => it.type === InputType.TEXTAREA)
    .map((it, index) => {
      const input = it as SimpleInput
      return (
        <Fragment key={input.name}>
          <h2>{input.question}</h2>
          <TextField source={`answers.branch.${branch}_Q${index + 1}`} />
          <NumberInput
            min={0}
            max={10}
            step={1}
            source={`score.branch_Q${index + 1}.${checker.name}`}
          />
        </Fragment>
      )
    })
}

function renderCoreQuestions(checker: any) {
  if (typeof checker.name != 'string') {
    return <p className="text-red-500 font-bold text-5xl">Please set your name first.</p>
  }
  return coreQuestions.inputs
    .filter((it) => it.type === InputType.TEXTAREA)
    .map((it, index) => {
      const input = it as SimpleInput
      return (
        <Fragment key={input.name}>
          <h2>{input.question}</h2>
          <TextField source={`answers.core.core_Q${index + 1}`} />
          <NumberInput
            min={0}
            max={10}
            step={1}
            source={`score.core_Q${index + 1}.${checker.name}`}
          />
        </Fragment>
      )
    })
}

type Branchable = {
  branch: string
}

export const RegistrationList = () => {
  const { isLoading: isIdentityLoading, identity } = useGetIdentity()
  const { isLoading: isUserLoading, data: user } = useGetOne('users', {
    id: identity?.id,
  })
  // don't stare at me.
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
        <TextField source="id" />
        <TextField source="confirmedBranch" />
        <BooleanField source={`checkedBy.${user.name}`} />
        <NumberField source="totalScore" />
        <BooleanField source="hasZero" />
        <EditButton />
      </Datagrid>
    </List>
  )
}

const registrationTransform = ({ currentComment, checker, branch, ...record }: RaRecord) => {
  const score = record.score
  // True when someone put the score.
  let isThereScore = false
  // There is any zero in score. Zero is a number not null.
  let hasZero = false
  // Total score for calculation
  let totalScore = 0
  // True when person filled the form add the score
  let checked = false

  // Summation of score
  // Loop over question score
  for (let questionScore of Object.values(score)) {
    // Loop over score by each person
    // Please don't care about TypeScript.
    for (let [personCheck, personScore] of Object.entries(questionScore as any)) {
      if (typeof personScore === 'number') {
        // Score belong to the person that enter the form.
        if (personCheck === checker) {
          // There is at least one field checked.
          checked = true
        }
        totalScore += personScore
        // If someone put score, that mean they are checked.
        isThereScore = true
        if (personScore === 0) hasZero = true
      }
    }
  }
  // If someone puts score, put calculated total score.
  if (isThereScore) {
    record.totalScore = totalScore
  } else {
    // Otherwise, set it to null
    record.totalScore = null
  }
  // If there is a zero, red flag them.
  if (isThereScore && hasZero) {
    record.hasZero = true
  } else {
    record.hasZero = false
  }

  // Utitlity: so no need to check again unless something happens.
  // If there is no such field already, replaces it with an empty object so the property can be set.
  record.checkedBy = record.checkedBy || {}

  record.checkedBy[checker] = checked

  return {
    ...record,
    comments: (function () {
      // Actually array
      if (typeof currentComment.body !== 'string' || currentComment.body.length == 0)
        // If undefined, return empty array
        return record.comments || []
      if (typeof record.comments === 'object') {
        return [...record.comments, currentComment]
      }
      return [currentComment]
    })(),
    // score: {
    //   ...record.score,
    //   total: Object.values(score)
    // }
  }
}

export const RegistrationEdit = () => {
  const { isLoading: isIdentityLoading, identity } = useGetIdentity()
  const { isLoading: isUserLoading, data: user } = useGetOne('users', {
    id: identity?.id,
  })
  useEffect(() => {
    console.table(user)
    console.table(identity)
  }, [user, identity])
  if (isIdentityLoading || isUserLoading) {
    return <p>Loading...</p>
  }
  return (
    <Edit transform={registrationTransform}>
      <SimpleForm>
        <h2>สาขา จะขึ้น Core หากเป็นคนตรวจคำถามกลาง​ (แก้ input ไม่ได้)</h2>
        <TextInput
          source="branch"
          defaultValue={user.branch}
          validate={(val) => (val == user.branch ? undefined : "Can't change branch")}
        ></TextInput>
        <TextField source="id" />
        <TextField source="confirmedBranch" />
        <h2>มี 0 ไหม </h2>
        <BooleanField source="hasZero" />
        <h2>คะแนนรวม (ถ้าไม่มีช่องนี้ แสดงว่ายังไม่มีใครตรวจน้อง)</h2>
        <NumberField source="totalScore" />
        {user.branch === 'core' && typeof user.branch === 'string'
          ? renderCoreQuestions(user)
          : renderBranchQuestions(branchToQuestion[`${user?.branch}`], user.branch, user)}
        <NumberField source="socre.total" />
        <h3>Comments</h3>
        <ArrayField source="comments">
          <Datagrid>
            <TextField source="author" />
            <TextField source="body" />
          </Datagrid>
        </ArrayField>
        <TextInput
          defaultValue={user.name}
          source="currentComment.author"
          validate={(val) => (val == user.name ? undefined : "Can't change your name")}
        />
        <TextInput source="currentComment.body" />
        <h2>ชื่อคนตรวจ (แก้ไม่ได้)</h2>
        <TextInput
          source="checker"
          defaultValue={user.name}
          validate={(val) => (val == user.name ? undefined : "Can't change your name")}
        />
      </SimpleForm>
    </Edit>
  )
}

const AdminBackOffice = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    {/* TODO: Change to "registrations" if production */}
    <Resource name="registrations_staging" list={<RegistrationList />} edit={RegistrationEdit} />
  </Admin>
)

// Note: dynamic import require default export
export default AdminBackOffice
