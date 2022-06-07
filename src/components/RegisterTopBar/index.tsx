import { Logo } from '../Logo'
import { UserBar } from '../UserBar'

interface RegisterTopBarProps {
  displayName?: string
  signOut: () => void
}

export const RegisterTopBar: React.FC<RegisterTopBarProps> = ({ displayName, signOut }) => {
  return (
    <div className="w-full flex items-center justify-between mb-4">
      <Logo />
      <UserBar displayName={displayName} signOut={signOut} />
    </div>
  )
}
