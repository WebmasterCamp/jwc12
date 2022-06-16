import { Fragment } from 'react'
import {
  Admin,
  BooleanField,
  Datagrid,
  Edit,
  EditButton,
  List,
  ListGuesser,
  Resource,
  SimpleForm,
  TextField,
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

function renderBranchQuestions(question: Question, branch: string) {
  return question.inputs
    .filter((it) => it.type === InputType.TEXTAREA)
    .map((it, index) => {
      const input = it as SimpleInput
      return (
        <Fragment key={input.name}>
          <h2>{input.question}</h2>
          <TextField source={`answers.branch.${branch}_Q${index + 1}`} />
        </Fragment>
      )
    })
}

function renderCoreQuestions() {
  return coreQuestions.inputs
    .filter((it) => it.type === InputType.TEXTAREA)
    .map((it, index) => {
      const input = it as SimpleInput
      return (
        <Fragment key={input.name}>
          <h2>{input.question}</h2>
          <TextField source={`answers.core.core_Q${index + 1}`} />
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

export const RegistrationEdit = () => {
  const { isLoading: isIdentityLoading, identity } = useGetIdentity()
  const { isLoading: isUserLoading, data: user } = useGetOne('users', {
    id: identity?.id,
  })
  if (isIdentityLoading || isUserLoading) {
    return <p>Loading...</p>
  }
  return (
    <Edit>
      <SimpleForm>
        <TextField source="id" />
        <TextField source="confirmedBranch" />
        {user.branch === 'core' && typeof user.branch === 'string'
          ? renderCoreQuestions()
          : renderBranchQuestions(branchToQuestion[`${user?.branch}`], user.branch)}
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
