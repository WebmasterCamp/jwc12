import type { NextPage } from 'next'

import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { ParticlesWidget } from '@/components/Particles'

const Home: NextPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col px-5 text-white">
      <Navbar />
      <ParticlesWidget />
      <Footer />
    </div>
  )
}

export default Home
