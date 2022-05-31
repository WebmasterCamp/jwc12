import { FunctionComponent, ReactNode } from 'react'

import { Footer } from '@/components/Footer'
import { ParticlesWidget } from '@/components/Particles'

import { Header } from './components/Header'

interface Props {
  children: ReactNode
}

export const DocumentLayout: FunctionComponent<Props> = ({ children }) => {
  return (
    <div id="document" className="relative min-h-screen px-5 text-black">
      <ParticlesWidget />
      <Header />
      <main className="mx-auto max-w-screen-xl">{children}</main>
      <Footer />
    </div>
  )
}
