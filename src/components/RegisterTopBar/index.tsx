import Link from 'next/link'

import { Logo } from '../Logo'
import { UserBar } from '../UserBar'

interface RegisterTopBarProps {
  displayName?: string
  signOut: () => void
}

export const RegisterTopBar: React.FC<RegisterTopBarProps> = ({ displayName, signOut }) => {
  return (
    <div className="w-full flex items-center justify-between mb-4">
      <header>
        <Link href="/" passHref>
          <a>
            <Logo className="h-16" />
          </a>
        </Link>
      </header>

      <UserBar displayName={displayName} signOut={signOut} />
    </div>
  )
}
