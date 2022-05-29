import type { NextPage } from 'next'

import { CookieConsent } from '../components/CookieConsent'

const Home: NextPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col px-5 text-white">
      <div className="w-full">JWC12 Register</div>
      <CookieConsent />
      {/* <Footer /> */}
    </div>
  )
}

export default Home
