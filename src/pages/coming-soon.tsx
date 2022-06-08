import type { NextPage } from 'next'

import { FollowUsBar } from '@/components/FollowUsBar'
import { Footer } from '@/components/Footer'
import { Logo } from '@/components/Logo'
import { ParticlesWidget } from '@/components/Particles'

const Home: NextPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col px-5 text-white">
      <ParticlesWidget />
      <div className="flex justify-end">
        <FollowUsBar className="m-3 mt-5 sm:my-5 sm:mx-10" />
      </div>

      <div className="my-10 mx-auto flex min-h-max w-full max-w-screen-md grow flex-col items-center justify-center">
        <div className="relative mx-auto mb-8 w-full max-w-xl xl:max-w-screen-2xl">
          <Logo className="mx-auto w-full" />
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
