import type { NextPage } from 'next'
import Link from 'next/link'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { FollowUsBar } from '../components/FollowUsBar'
import { ParticlesWidget } from '../components/Particles'

const Home: NextPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col items-center bg-cover px-5 font-serif text-white sm:justify-center">
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
        {/* <div className="z-10 mx-auto mt-10 flex w-full max-w-screen-sm flex-col gap-5 sm:flex-row md:w-2/3">
            <input
              type="text"
              placeholder="กรอกอีเมลของคุณ"
              className="z-10 w-full rounded-md border-0 py-2 px-3 text-black shadow-inner outline-none ring ring-[#900F9F] placeholder:font-normal placeholder:text-black/40 focus:shadow-none placeholder:focus:font-medium placeholder:focus:text-black/40 active:text-black sm:w-2/3"
            />
            <button className="z-10 w-full rounded-md bg-[#131D38] px-5 py-2 hover:bg-[#293F7A] sm:w-1/3">
              รับสมัครข่าวสาร
            </button>
          </div> */}
      </div>
      <div className="mx-5 mt-12 mb-3 text-center text-sm leading-6 sm:absolute sm:bottom-10 sm:my-0 sm:text-lg sm:leading-8">
        Copyright 2022, Young Webmaster Camp,
        <br />
        in associate with Thai Webmaster Association. All right reserved.
        <div className="mt-3 text-sm">
          <Link href="/policy">
            <a className="underline">Privacy Policy</a>
          </Link>{' '}
          |{' '}
          <Link href="/terms">
            <a className="underline">Terms and Conditions</a>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Home
