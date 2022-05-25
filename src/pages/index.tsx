import type { NextPage } from 'next'
import Particles from 'react-tsparticles'
import { loadFull } from 'tsparticles'
import { FollowUsBar } from '../components/FollowUsBar'

const Home: NextPage = () => {
  const particlesInit = async (main: any) => {
    console.log(main)
    await loadFull(main)
  }

  const particlesLoaded = async (container: any) => {
    console.log(container)
  }
  return (
    <div
      className="relative flex min-h-screen w-full flex-col items-center bg-cover px-5 text-white sm:justify-center"
      style={{
        minHeight: '100dvh',
        backgroundImage: 'url(/line.png)',
      }}
    >
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          particles: {
            color: {
              value: '#E4D0A2',
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce',
              },
              random: false,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 20,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: 'image',
              options: {
                image: {
                  src: '/particle-star.svg',
                  replaceColor: true,
                  height: 100,
                  width: 100,
                },
              },
            },
            size: {
              value: { min: 1, max: 20 },
            },
          },
          detectRetina: true,
        }}
      />
      <FollowUsBar className="absolute right-0 top-0 m-3 mt-5 sm:my-5 sm:mx-10" />

      <div className="mt-32 w-full max-w-screen-md sm:mt-0">
        <div className="relative mx-auto mb-10 w-full max-w-xl xl:max-w-screen-2xl">
          <img src="/jwc12-temp-logo.png" alt="" className="mx-auto w-full" />
          <div className="mx-auto w-full text-center text-3xl font-medium leading-7 sm:absolute sm:bottom-2">
            เราจะกลับมาอีกใน
            <br className="sm:hidden" />
            <span className="text-4xl font-bold">อนาคต</span>อันใกล้นี้
          </div>
        </div>
        <div className="mx-auto mt-10 flex w-full max-w-screen-sm flex-col gap-5 sm:flex-row md:w-2/3">
          <input
            type="text"
            placeholder="กรอกอีเมลของคุณ"
            className="w-full rounded-md py-2 px-3 text-center text-black sm:w-2/3"
          />
          <button className="w-full rounded-md bg-green-500 px-5 py-2 sm:w-1/3">
            รับสมัครข่าวสาร
          </button>
        </div>
      </div>
      <div className="mx-5 mt-12 mb-5 text-center text-sm leading-6 sm:absolute sm:bottom-10 sm:my-0 sm:text-lg sm:leading-8">
        Copyright 2022, Young Webmaster Camp,
        <br />
        in associate with Thai Webmaster Association. All right reserved.
      </div>
    </div>
  )
}

export default Home
