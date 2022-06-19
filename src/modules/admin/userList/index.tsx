import { useState } from 'react'
import {
  Datagrid,
  EditButton,
  FunctionField,
  List,
  TextField,
  TopToolbar,
  useRefresh,
} from 'react-admin'
import { SubmitHandler, useForm } from 'react-hook-form'

import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button as MuiButton,
  TextField as MuiTextField,
} from '@mui/material'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { doc, getFirestore, setDoc } from 'firebase/firestore'

import { app } from '@/lib/firebase'

import { useUser } from '../hook/user'

const db = getFirestore(app)
const auth = getAuth()

interface CreateUserModel {
  email: string
  password: string
}

const CreateUserActions = () => {
  const refresh = useRefresh()
  const [open, setOpen] = useState(false)
  const { register, handleSubmit } = useForm<CreateUserModel>()

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit: SubmitHandler<CreateUserModel> = async (data) => {
    try {
      const cred = await createUserWithEmailAndPassword(auth, data.email, data.password)
      refresh()
      handleClose()
      await setDoc(doc(db, 'users', cred.user.uid), {
        admin: true,
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <TopToolbar>
      <MuiButton onClick={handleClickOpen}>Create User</MuiButton>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We will send
              updates occasionally.
            </DialogContentText>
            <MuiTextField
              autoFocus
              label="email"
              type="email"
              fullWidth
              {...register('email', { required: true })}
            />
            <MuiTextField
              label="password"
              type="password"
              fullWidth
              {...register('password', { required: true })}
            />
          </DialogContent>
          <DialogActions>
            <MuiButton onClick={handleClose}>Cancel</MuiButton>
            <MuiButton onClick={handleClose}>Create</MuiButton>
          </DialogActions>
        </form>
      </Dialog>
    </TopToolbar>
  )
}

export const UserList = () => {
  const { user, isLoading } = useUser()

  if (isLoading) return null

  if (!user?.superAdmin) return <h2>Permission Denied</h2>

  return (
    <List actions={<CreateUserActions />}>
      <Datagrid>
        <FunctionField
          label="รหัสอ้างอิง"
          render={(record: any) => {
            return `${record?.id?.slice(0, 9)}`
          }}
        />
        <TextField label="ชื่อ" source="name" />
        <TextField label="สาขา" source="branch" />
        <TextField label="ข้อ" source="which" />
        <EditButton label="" />
      </Datagrid>
    </List>
  )
}
