import { useAuthStore } from './store'

export default function DebugAuth() {
  const { pending, uid, signIn, signOut } = useAuthStore()
  if (pending) return <>Loading auth</>
  if (uid) return <button onClick={signOut}>Sign out</button>
  return <button onClick={signIn}>Sign in</button>
}
