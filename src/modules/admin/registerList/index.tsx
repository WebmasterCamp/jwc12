import { Datagrid, List, TextField, downloadCSV } from 'react-admin'

import jsonExport from 'jsonexport'

import { useUser } from '../hook/user'

const exporter = (items: any[]) => {
  const contacts = items.map((item) => ({
    firstName: item.answers.basic.firstName,
    lastName: item.answers.basic.lastName,
    nickname: item.answers.basic.nickname,
    telephone: item.answers.basic.telephone,
    email: item.answers.basic.email,
    confirmedBranch: item.confirmedBranch,
  }))

  jsonExport(
    contacts,
    {
      headers: ['firstName', 'lastName', 'nickname', 'telephone', 'email', 'confirmedBranch'], // order fields in the export
    },
    (err, csv) => {
      downloadCSV(csv, 'contact') // download as 'posts.csv` file
    }
  )
}

export const RegisterList = () => {
  const { user, isLoading } = useUser()

  if (isLoading) return null

  if (!user?.readContact) return <h2>{"Permission denied: need 'readContact: true'"}</h2>

  return (
    <List filter={{ submitted: false }} exporter={exporter}>
      <Datagrid>
        <TextField label="ชื่อ" source="answers.basic.firstName" />
        <TextField label="นามสกุล" source="answers.basic.lastName" />
        <TextField label="ชื่อเล่น" source="answers.basic.nickname" />
        <TextField label="เบอร์โทร" source="answers.basic.telephone" />
        <TextField label="อีเมล" source="answers.basic.email" />
        <TextField label="สาขาที่เลือก" source="confirmedBranch" />
      </Datagrid>
    </List>
  )
}
