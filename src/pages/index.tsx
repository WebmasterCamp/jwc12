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
      className="bg-cover relative text-white w-full flex items-center sm:justify-center flex-col px-5"
      style={{
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
      <FollowUsBar className="right-0 top-0 absolute m-3 mt-5 sm:my-5 sm:mx-10" />

      <div className="max-w-screen-md mt-32 sm:mt-0 w-full">
        <div className="mb-10 w-full max-w-xl relative xl:max-w-screen-2xl mx-auto">
          <img src="/jwc12-temp-logo.png" alt="" className="w-full mx-auto" />
          <div className="text-3xl font-medium mx-auto text-center sm:absolute sm:bottom-2 w-full leading-7">
            เราจะกลับมาอีกใน
            <br className="sm:hidden" />
            <span className="font-bold text-4xl">อนาคต</span>อันใกล้นี้
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-5 w-full md:w-2/3 mt-10 max-w-screen-sm mx-auto">
          <input
            type="text"
            placeholder="กรอกอีเมลของคุณ"
            className="py-2 px-3 rounded-md w-full sm:w-2/3 text-center text-black"
          />
          <button className="bg-green-500 px-5 rounded-md w-full sm:w-1/3 py-2">รับสมัครข่าวสาร</button>
        </div>
      </div>
      <div className="text-sm leading-6 sm:text-lg mx-5 text-center sm:leading-8 mt-12 mb-5 sm:my-0 sm:absolute sm:bottom-10">
        Copyright 2022, Young Webmaster Camp,
        <br />
        in associate with Thai Webmaster Association. All right reserved.
      </div>
    </div>
  )
}

export default Home
