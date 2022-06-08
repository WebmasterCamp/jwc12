import Link from 'next/link'

import { Logo } from '@/components/Logo'

export const Header = () => {
  return (
    <header className="mx-auto mb-8 flex max-w-screen-xl justify-between pt-10">
      <Link href={'/'}>
        <a>
          <Logo className="h-28" />
        </a>
      </Link>
    </header>
  )
}
