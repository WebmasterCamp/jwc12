import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

import { FollowUsBar } from '@/components/FollowUsBar'
import { Footer } from '@/components/Footer'
import { ParticlesWidget } from '@/components/Particles'

const DebugAuth = dynamic(() => import('@/auth/DebugAuth'), { ssr: false })

const Home: NextPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col px-5 text-white">
      <ParticlesWidget />
      <div className="flex justify-end">
        <FollowUsBar className="m-3 mt-5 sm:my-5 sm:mx-10" />
      </div>
      <DebugAuth />

      <div className="my-10 mx-auto flex min-h-max w-full max-w-screen-md grow flex-col items-center justify-center">
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
      <Footer />
    </div>
  )
}

export default Home
