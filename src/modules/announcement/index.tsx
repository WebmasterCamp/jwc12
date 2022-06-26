import { useMemo } from 'react'

import { useRouter } from 'next/router'

import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { Loading } from '@/components/Loading'
import { Logo } from '@/components/Logo'
import { useInterviewCandidates } from '@/db/hooks'

import { BranchType } from '../register/types'
import { Paper } from './components/Paper'
import { SquareBranchCard } from './components/SquareBranchCard'
import { TableItem } from './components/TableItem'
import { branchColorMapping } from './constants'

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
      <div className="h-[72px] w-[146px]">
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

        <div className="flex flex-row gap-4 justify-between mb-8">
          <SquareBranchCard branch={BranchType.CONTENT} />
          <SquareBranchCard branch={BranchType.DESIGN} />
          <SquareBranchCard branch={BranchType.MARKETING} />
          <SquareBranchCard branch={BranchType.PROGRAMMING} />
        </div>

        <Paper className="mb-20">
          <h6 className="font-bold">
            รายชื่อผู้ผ่านการคัดเลือกเข้ารอบสัมภาษณ์ สาขา{' '}
            <span className={branchColorMapping[branch ?? ''] ?? ''}>{branch}</span>
          </h6>
          <table className="w-full mt-4 rounded-md">
            <thead>
              <tr className="w-full">
                <th className="text-left p-1 md:p-3">รหัส</th>
                <th className="text-left p-1 md:p-3">ชื่อ</th>
                <th className="text-left p-1 md:p-3">นามสกุล</th>
              </tr>
            </thead>
            <tbody>
              {filteredDataByBranch.map((item, index) => (
                <TableItem
                  key={item.id}
                  id={item.id}
                  name={item.firstName}
                  surname={item.lastName}
                  background={index % 2 === 0 ? 'white' : 'gray'}
                />
              ))}
            </tbody>
          </table>
        </Paper>
      </Container>
      <Footer />
    </div>
  )
}
