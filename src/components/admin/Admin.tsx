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
} from 'react-admin'

import { contentQuestions } from '@/modules/register/questions/content'
import { coreQuestions } from '@/modules/register/questions/core'
import { designQuestions } from '@/modules/register/questions/design'
import { marketingQuestions } from '@/modules/register/questions/marketing'
import { programmingQuestions } from '@/modules/register/questions/programming'
import { InputType, Question, SimpleInput } from '@/modules/register/types'

import { authProvider, dataProvider } from './adminConfig'

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

export const RegistrationList = () => (
  <List filter={{ submitted: true }}>
    <Datagrid>
      <TextField source="id" />
      <TextField source="confirmedBranch" />
      <TextField source="submitted" />
      <EditButton />
    </Datagrid>
  </List>
)

export const RegistrationEdit = () => (
  <Edit>
    <SimpleForm>
      <TextField source="id" />
      <TextField source="confirmedBranch" />
      {renderCoreQuestions()}
    </SimpleForm>
  </Edit>
)

const AdminBackOffice = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    {/* TODO: Change to "registrations" if production */}
    <Resource name="registrations_staging" list={<RegistrationList />} edit={RegistrationEdit} />
  </Admin>
)

// Note: dynamic import require default export
export default AdminBackOffice
