import { Admin, Resource } from 'react-admin'

import { authProvider, dataProvider } from './config'
import { RegistrationEdit } from './register/edit'
import { RegistrationList } from './register/list'

export const registerResource =
  process.env.MODE !== 'DEVELOPMENT' ? 'registrations' : 'registrations_staging'

export const AdminBackOffice = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name={registerResource} list={RegistrationList} edit={RegistrationEdit} />
  </Admin>
)
