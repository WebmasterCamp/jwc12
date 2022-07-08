import { useState } from 'react'

import { NextPage } from 'next'
import { useRouter } from 'next/router'

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

import { app } from '@/lib/firebase'

const auth = getAuth(app)

const LoginRandom: NextPage = () => {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const login = () => {
    signInWithEmailAndPassword(auth, email, password).then((credential) => {
      router.push('/random')
    })
  }
  return (
    <div>
      <span>Email</span>
      <input value={email} onChange={(e) => setEmail(e.target.value)} />
      <span>Password</span>
      <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
    </div>
  )
}

export default LoginRandom
