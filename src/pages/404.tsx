import Link from 'next/link'

import { Container } from '@/components/Container'
import { Navbar } from '@/components/Navbar'
import { ParticlesWidget } from '@/components/Particles'

const NotFoundPage = () => {
  return (
    <>
      <Navbar />
      <Container belowNavbar maxWidth="sm" className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center flex-1 gap-y-5">
          <p className="text-3xl">ไม่มีหน้านี้อยู่</p>
          <Link href="/">
            <div className="cursor-pointer underline text-gold-dark">กลับสู้หน้าหลัก</div>
          </Link>
        </div>
        <ParticlesWidget />
      </Container>
    </>
  )
}

export default NotFoundPage
