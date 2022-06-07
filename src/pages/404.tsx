import Link from 'next/link'

import { Container } from '@/components/Container'
import { Loading } from '@/components/Loading'

const NotFoundPage = () => {
  return (
    <Container maxWidth="sm" className="min-height-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center flex-1">
        <p className="text-3xl">ไม่มีหน้านี้อยู่</p>
        <Link href="/">
          <div className="">กลับสู้หน้าหลัก</div>
        </Link>
      </div>
    </Container>
  )
}

export default NotFoundPage
