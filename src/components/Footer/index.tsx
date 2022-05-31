import { FC } from 'react'

import Link from 'next/link'

import clsx from 'clsx'

interface Props {
  className?: string
}

export const Footer: FC<Props> = ({ className }) => {
  return (
    <footer
      className={clsx('text-md mx-5 mb-5 text-center leading-8 text-white lg:text-lg', className)}
    >
      Copyright 2022, Young Webmaster Camp,
      <br />
      in association with Thai Webmaster Association, all rights reserved.
      <div className="mt-3 text-sm">
        <Link href="/policy/privacy">
          <a className="underline">Privacy Policy</a>
        </Link>{' '}
        |{' '}
        <Link href="/policy/cookies">
          <a className="underline">Cookie Policy</a>
        </Link>
      </div>
    </footer>
  )
}
