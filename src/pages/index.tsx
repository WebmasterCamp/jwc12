import type { NextPage } from 'next'

import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { ParticlesWidget } from '@/components/Particles'

const Home: NextPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col px-5 text-white">
      <Navbar />
      <ParticlesWidget />
      <div className="w-full lg:w-1/2 mx-auto">
        <h1 className="text-4xl lg:text-5xl text-center mt-16 space-y-4 font-heading">
          Make Your site,
          <br /> Write Your <span className="text-ct">Future</span>
        </h1>
        {/* TODO: Insert sponsor logo here */}
        <div className=" space-x-4 p-8 text-center mx-auto">TODO: Insert logo</div>
        <div className="flex flex-col gap-4 lg:gap-8 lg:flex-row lg:justify-center">
          <Button variant="gold">สมัครค่าย</Button>
          <Button variant="outlined-gold">รู้จักกับค่าย</Button>
        </div>
      </div>
      <div className="w-full lg:w-1/2 mx-auto"></div>
      <Footer />
    </div>
  )
}

export default Home
