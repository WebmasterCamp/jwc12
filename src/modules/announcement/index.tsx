import { useMemo } from 'react'

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
  const branch = router.query.branch as BranchType | undefined
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
      <div className="h-[47px] w-[96px] mx-6 my-4 sm:h-[72px] sm:w-[146px] sm:mx-10 sm:mt-10">
        <Logo />
      </div>
      <Container maxWidth="3xl">
        <h1 className="text-center text-3xl text-white font-bold mb-8">
          ประกาศรายชื่อผู้มีสิทธิ์สัมภาษณ์
        </h1>
        <Paper>
          <h2 className="text-lg font-bold mb-4">ขั้นตอนต่อไป</h2>
          <p className="mb-6">
            การสัมภาษณ์จะจัดขึ้นใน วันอังคารที่ 28 มิถุนายน 2565 ผ่านทางโปรแกรม Zoom ตั้งแต่เวลา xx
            - xx ขอให้น้องๆ
          </p>
          <h2 className="text-lg font-bold mb-4">สิ่งที่ต้องเตรียมก่อนการสัมภาษณ์</h2>
          <ol className="list-decimal ml-6">
            <li>เช็คเวลาสัมภาษณ์ของตนเอง</li>
            <li>เตรียม Portfolio หรือผลงานต่างๆ (ถ้ามี)</li>
            <li>สัมภาษณ์</li>
          </ol>
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
      </Container>
      <Footer />
    </div>
  )
}
