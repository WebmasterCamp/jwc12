import { FunctionComponent, useState } from 'react'

import Link from 'next/link'

import BarsIcon from '@iconify/icons-fa6-solid/bars'
import { Icon } from '@iconify/react'
import clsx from 'clsx'

import { Button } from './Button'

interface Props {
  className?: string
}

export const Navbar: FunctionComponent<Props> = ({ className = '' }) => {
  const [shown, setShown] = useState(false)
  const toggleNavbar = () => setShown((shown) => !shown)
  return (
    <div className="sticky top-0 z-50 bg-primary">
      <nav className={clsx('flex px-4 py-2 justify-between items-center', className)}>
        <Link href={'/'}>
          <a>
            <picture>
              <source srcSet="/images/jwc12-logo.avif" type="image/avif" />
              <source srcSet="/images/jwc12-logo.webp" type="image/webp" />
              <img src="/images/jwc12-logo.png" alt="Junior Webmaster Camp 12" className="h-14" />
            </picture>
          </a>
        </Link>
        <div className="lg:hidden">
          <Button onClick={toggleNavbar} variant="outlined" className="lg:hidden">
            <Icon icon={BarsIcon} className="inline-block" /> เมนู
          </Button>
        </div>
        <div className="hidden lg:flex flex-row gap-4 items-center">
          <a href="#about">JWC คืออะไร</a>
          <a href="#schedule">กำหนดการ</a>
          <a href="#faq">คำถามที่พบบ่อย</a>
          <a href="#contact">ติดต่อเรา</a>
          <Link href="/register">
            <Button color="gold">สมัครค่าย JWC</Button>
          </Link>
        </div>
      </nav>
      <div
        className={clsx(
          'lg:hidden flex-col text-right text-white bg-primary',
          shown ? 'flex' : 'hidden'
        )}
      >
        <a className="p-4" href="#about">
          JWC คืออะไร
        </a>
        <a className="p-4" href="#schedule">
          กำหนดการ
        </a>
        <a className="p-4" href="#faq">
          คำถามที่พบบ่อย
        </a>
        <a className="p-4" href="#contact">
          ติดต่อเรา
        </a>
        <div className="p-4">
          <Button color="gold">สมัครค่าย JWC</Button>
        </div>
      </div>
    </div>
  )
}
