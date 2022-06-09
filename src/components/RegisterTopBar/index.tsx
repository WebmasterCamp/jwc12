import Link from 'next/link'

import { Logo } from '../Logo'
import { UserBar } from '../UserBar'

export const RegisterTopBar = () => {
  return (
    <div className="w-full flex items-center justify-between mb-4">
      <header>
        <Link href="/" passHref>
          <a>
            <Logo className="h-16" />
          </a>
        </Link>
      </header>

      <UserBar />
    </div>
  )
}
