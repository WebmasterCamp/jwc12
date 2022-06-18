import { Fragment, useEffect } from 'react'
import {
  Admin,
  ArrayField,
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
  if (isIdentityLoading || isUserLoading) {
    return <p>Loading...</p>
  }
  return (
    <List filter={{ submitted: true }}>
      <Datagrid>
        <TextField source="id" />
        <TextField source="confirmedBranch" />
        <TextField source="submitted" />
        <EditButton />
      </Datagrid>
    </List>
  )
}

const registrationTransform = ({ currentComment, ...record }: RaRecord) => {
  return {
    ...record,
    comments:
      typeof record.comments === 'object' ? [...record.comments, currentComment] : [currentComment],
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
        <TextField source="id" />
        <TextField source="confirmedBranch" />
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
