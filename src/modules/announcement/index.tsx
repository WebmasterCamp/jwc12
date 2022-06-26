import { useMemo } from 'react'

import Link from 'next/link'
import { useRouter } from 'next/router'

import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { Loading } from '@/components/Loading'
import { Logo } from '@/components/Logo'
import { useInterviewCandidates } from '@/db/hooks'

import { BranchType } from '../register/types'
import { CandidateList } from './components/CandidateList'
import { Paper } from './components/Paper'
import { SquareBranchCard } from './components/SquareBranchCard'

export function Announcement() {
  const router = useRouter()
  const branch = router.query.branch?.[0] as BranchType | undefined
  const { pending, data } = useInterviewCandidates()
  const candidates = data?.data

  const filteredDataByBranch = useMemo(() => {
    const filteredData = candidates?.filter((candidate) => candidate.branch === branch) ?? []
    return filteredData
  }, [candidates, branch])

  if (pending) {
    return <Loading />
  }

  return (
    <div>
      <Link href="/" passHref>
        <a className="block h-[47px] w-[96px] mx-6 my-4 sm:h-[72px] sm:w-[146px] sm:mx-10 sm:mt-10">
          <Logo />
        </a>
      </Link>
      <Container maxWidth="3xl">
        <h1 className="text-center text-3xl text-white font-bold mb-8">
          ประกาศรายชื่อผู้มีสิทธิ์สัมภาษณ์
        </h1>
        <Paper>
          <h2 className="text-lg font-bold mb-4">ขั้นตอนต่อไป</h2>
          <p className="mb-6">
            การสัมภาษณ์จะจัดขึ้นในวันที่ <Emphasis>27 - 28 มิถุนายน 2565</Emphasis> ผ่านทางโปรแกรม{' '}
            <Emphasis>Zoom</Emphasis> ในช่วงเวลา <Emphasis>19:00 - 22:00น.</Emphasis>{' '}
            สำหรับผู้ที่ผ่านการคัดเลือกเข้าสู่รอบสัมภาษณ์{' '}
            <Emphasis>จะมีพี่ ๆ ติดต่อกลับไปเพื่อทำการยืนยันวันและเวลาในการสัมภาษณ์</Emphasis>{' '}
            ขอให้น้อง ๆ ที่ผ่านการคัดเลือกเฝ้าหน้าจอโทรศัพท์และอีเมลของตัวเองไว้ให้ดี เดี๋ยวพี่ ๆ
            จะรีบติดต่อไปหา!
          </p>
          <h2 className="text-lg font-bold mb-4">สิ่งที่ต้องเตรียมก่อนการสัมภาษณ์</h2>
          <ol className="list-decimal ml-6 mb-6">
            <li>
              โปรแกรม Zoom meeting{' '}
              <a className="text-primary underline" href="https://zoom.us/download">
                (ดาวน์โหลดได้ที่นี่)
              </a>
            </li>
            <li>เช็กอินเทอร์เน็ตและไมโครโฟนให้พร้อมก่อนการสัมภาษณ์</li>
            <li>Portfolio หรือของที่อยากโชว์ สามารถเตรียมมาเพื่อประกอบการพิจารณาได้ (ถ้ามี)</li>
            <li>บัตรนักเรียน หรือ บัตรประชาชน เพื่อยืนยันตัวตนผู้สมัคร</li>
          </ol>
          <h2 className="text-lg font-bold mb-4">มีข้อสงสัยเพิ่มเติมสามารถติดต่อ</h2>
          <p className="mb-6">
            <Emphasis>พี่สมิง</Emphasis> โทร. <PhoneNumber phoneNumber="089-696-2432" />
            <br />
            <Emphasis>พี่มูมู่</Emphasis> โทร. <PhoneNumber phoneNumber="086-834-3127" />
          </p>
        </Paper>
        {/* Branch selection */}
        <h1 className="text-center text-3xl text-white font-bold mb-8 mt-16">โปรดเลือกสาขา</h1>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 sm:mb-0">
          <SquareBranchCard branch={BranchType.CONTENT} selected={branch === BranchType.CONTENT} />
          <SquareBranchCard branch={BranchType.DESIGN} selected={branch === BranchType.DESIGN} />
          <SquareBranchCard
            branch={BranchType.MARKETING}
            selected={branch === BranchType.MARKETING}
          />
          <SquareBranchCard
            branch={BranchType.PROGRAMMING}
            selected={branch === BranchType.PROGRAMMING}
          />
        </div>

        {branch && <CandidateList key={branch} branch={branch} candidates={filteredDataByBranch} />}
        <div className="h-20" />
      </Container>
      <Footer />
    </div>
  )
}

export function Emphasis({ children }: { children: string }) {
  return <span className="text-primary">{children}</span>
}

export function PhoneNumber({ phoneNumber }: { phoneNumber: string }) {
  return (
    <a href={`tel:${phoneNumber}`} className="text-primary underline">
      {phoneNumber}
    </a>
  )
}
