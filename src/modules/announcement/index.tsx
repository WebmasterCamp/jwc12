import { useMemo } from 'react'

import { GetStaticProps } from 'next'
import { useRouter } from 'next/router'

import axios from 'axios'

import { Container } from '@/components/Container'
import { Footer } from '@/components/Footer'
import { Logo } from '@/components/Logo'

import { BranchType } from '../register/types'
import { Paper } from './components/Paper'
import { SquareBranchCard } from './components/SquareBranchCard'
import { TableItem } from './components/TableItem'
import { branchColorMapping } from './constants'

interface AirtableResponseData {
  records: {
    id: string
    createdTime: Date
    fields: {
      ID?: string
      Branch?: BranchType
      'First Name'?: string
      'Last Name'?: string
      Time?: Date
    }
  }[]
}

export const Announcement: React.FC<{ data: AirtableResponseData['records'] }> = ({ data }) => {
  const router = useRouter()
  const branch = router.query.branch as BranchType | undefined

  const filteredDataByBranch = useMemo(() => {
    const filteredData = data.filter(
      ({ fields }) => fields.Branch?.toLowerCase() === branch?.toLocaleLowerCase()
    )
    return filteredData
  }, [data, branch])

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
                  id={item.fields.ID ?? 'unknown'}
                  name={item.fields['First Name'] ?? 'unknown'}
                  surname={item.fields['Last Name'] ?? 'unknown'}
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

export const getStaticProps: GetStaticProps = async (context) => {
  // const { data } = await axios.get<AirtableResponseData>(
  //   'https://api.airtable.com/v0/app433thI9OO5vRGF/mock-interview',
  //   {
  //     headers: {
  //       // TODO: replce this thing to be something safe
  //       // Authorization: `Bearer <secret-key>`,
  //     },
  //   }
  // )

  return {
    props: {
      data: [],
    },
  }
}
