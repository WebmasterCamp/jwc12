import type { NextPage } from 'next'
import Link from 'next/link'
import { CookieConsent } from '../components/CookieConsent'
import { FollowUsBar } from '../components/FollowUsBar'
import { ParticlesWidget } from '../components/Particles'
import { Footer } from '../layouts/document/components/Footer'

const Home: NextPage = () => {
  return (
    <div className="text-white relative flex min-h-screen w-full flex-col items-center px-5 sm:justify-center">
      <ParticlesWidget />
      <FollowUsBar className="absolute right-0 top-0 m-3 mt-5 sm:my-5 sm:mx-10" />

      <div className="mt-32 w-full max-w-screen-md sm:mt-0">
        <div className="relative mx-auto mb-8 w-full max-w-xl xl:max-w-screen-2xl">
          <picture>
            <source srcSet="/images/jwc12-logo.avif" type="image/avif" />
            <source srcSet="/images/jwc12-logo.webp" type="image/webp" />
            <img
              src="/images/jwc12-logo.png"
              alt="Junior Webmaster Camp 12"
              className="mx-auto w-full"
            />
          </picture>
        </div>
        <div className="mx-auto w-full text-center text-3xl font-medium leading-7">
          เราจะกลับมาอีกใน
          <br className="sm:hidden" />
          <span className="text-4xl font-bold">อนาคต</span>อันใกล้นี้
        </div>
      </div>
      <Footer className="sm:absolute sm:bottom-10 sm:my-0" />
    </div>
  )
}

export default Home
