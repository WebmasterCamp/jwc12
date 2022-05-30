import type { NextPage } from 'next'
import Link from 'next/link'

import { CookieConsent } from '../components/CookieConsent'

const About: NextPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col px-5 text-white">
      <CookieConsent />
      <Link href="/">Hone</Link>
    </div>
  )
}

export default About
