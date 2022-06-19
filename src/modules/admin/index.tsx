import { Admin, Resource } from 'react-admin'

import { authProvider, dataProvider } from './config'
import { RegistrationEdit } from './registerEdit'
import { RegistrationList } from './registerList'
import { UserList } from './userList'

export const checkResource = process.env.MODE !== 'DEVELOPMENT' ? 'check' : 'check_staging'
export const userResource = 'users'

export const registerResource =
  process.env.MODE !== 'DEVELOPMENT' ? 'registrations' : 'registrations_staging'

export const AdminBackOffice = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name={checkResource} list={RegistrationList} edit={RegistrationEdit} />
    <Resource name={userResource} list={UserList} />
  </Admin>
)
