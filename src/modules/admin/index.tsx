import { Admin, Resource } from 'react-admin'

import { CheckEdit } from './checkEdit'
import { CheckList } from './checkList'
import { authProvider, dataProvider } from './config'
import { RegisterList } from './registerList'
import { UserEdit } from './userEdit'
import { UserList } from './userList'

export const checkResource = process.env.MODE !== 'DEVELOPMENT' ? 'check' : 'check_staging'
export const userResource = 'users'

export const registerResource =
  process.env.MODE !== 'DEVELOPMENT' ? 'registrations' : 'registrations_staging'

export const AdminBackOffice = () => (
  <Admin dataProvider={dataProvider} authProvider={authProvider}>
    <Resource name={registerResource} list={RegisterList} />
    <Resource name={checkResource} list={CheckList} edit={CheckEdit} />
    <Resource name={userResource} list={UserList} edit={UserEdit} />
  </Admin>
)
