import { Admin, Resource } from 'react-admin'

import { authProvider, dataProvider } from './config'
import { RegistrationEdit } from './registerEdit'
import { RegistrationList } from './registerList'

export const checkResource = process.env.MODE !== 'DEVELOPMENT' ? 'check' : 'check_staging'

export const registerResource =
  process.env.MODE !== 'DEVELOPMENT' ? 'registrations' : 'registrations_staging'

export const AdminBackOffice = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name={checkResource} list={RegistrationList} edit={RegistrationEdit} />
  </Admin>
)
