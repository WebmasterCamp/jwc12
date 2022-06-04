import { FunctionComponent } from 'react'

import Link from 'next/link'

import clsx from 'clsx'

import { Button } from './Button'

interface Props {
  className?: string
}

export const Navbar: FunctionComponent<Props> = ({ className = '' }) => {
  return (
    <nav className={clsx('flex px-4 py-2 justify-between items-center sticky', className)}>
      <Link href={'/'}>
        <a>
          <picture>
            <source srcSet="/images/jwc12-logo.avif" type="image/avif" />
            <source srcSet="/images/jwc12-logo.webp" type="image/webp" />
            <img src="/images/jwc12-logo.png" alt="Junior Webmaster Camp 12" className="h-14" />
          </picture>
        </a>
      </Link>
      <div className="flex gap-4 items-center">
        <a href="#about">JWC คืออะไร</a>
        <a href="#schedule">กำหนดการ</a>
        <a href="#faq">คำถามที่พบบ่อย</a>
        <a href="#contact">ติดต่อเรา</a>
        <Button variant="gold">สมัครค่าย JWC</Button>
      </div>
    </nav>
  )
}
