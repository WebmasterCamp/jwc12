import React from 'react'
import { BooleanInput, Edit, NumberInput, SimpleForm, TextInput } from 'react-admin'

import { useUser } from '../hook/user'

export const UserEdit = () => {
  const { isLoading } = useUser()

  if (isLoading) return null

  return (
    <Edit>
      <SimpleForm>
        <TextInput disabled label="Id" source="id" />
        <TextInput source="name" />
        <TextInput source="branch" />
        <NumberInput source="which" />
        <BooleanInput source="readContact" />
      </SimpleForm>
    </Edit>
  )
}
