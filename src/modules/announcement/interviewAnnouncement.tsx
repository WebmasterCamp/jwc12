import { useMemo } from 'react'

import { Loading } from '@/components/Loading'
import { useInterviewCandidates } from '@/db/hooks'

import { BranchType } from '../register/types'
import { Emphasis, PhoneNumber } from './components'
import { AnnouncementTemplate } from './template'
import { AnnouncementColumn } from './types'

interface InterviewAnnouncementCandidate {
  id: string
  branch: BranchType
  name: string
  interviewTime: string
}

const columns: AnnouncementColumn<InterviewAnnouncementCandidate>[] = [
  {
    key: 'id',
    label: 'รหัส',
  },
  {
    key: 'name',
    label: 'ชื่อ - นามสกุล',
  },
  {
    key: 'interviewTime',
    label: 'วัน/เวลาการสัมภาษณ์',
  },
]

export function InterviewCandidateAnnouncement() {
  const { pending, data } = useInterviewCandidates()

  const candidates: InterviewAnnouncementCandidate[] = useMemo(
    () =>
      (data?.data ?? []).map((candidate) => ({
        name: `${candidate.firstName} ${candidate.lastName}`,
        ...candidate,
      })),
    [data]
  )

  if (pending) {
    return <Loading />
  }

  return (
    <AnnouncementTemplate
      title="ประกาศรายชื่อผู้มีสิทธิ์สัมภาษณ์"
      tableHeader="รายชื่อผู้ผ่านการคัดเลือกเข้ารอบสัมภาษณ์"
      linkPrefix="/announcement/"
      candidates={candidates}
      columns={columns}
    >
      <h2 className="text-lg font-bold mb-4">ขั้นตอนต่อไป</h2>
      <p className="mb-6">
        การสัมภาษณ์จะจัดขึ้นในวันที่ <Emphasis>27 - 28 มิถุนายน 2565</Emphasis> ผ่านทางโปรแกรม{' '}
        <Emphasis>Zoom</Emphasis> ในช่วงเวลา <Emphasis>19:00 - 22:00น.</Emphasis>{' '}
        สำหรับผู้ที่ผ่านการคัดเลือกเข้าสู่รอบสัมภาษณ์{' '}
        <Emphasis>จะมีพี่ ๆ ติดต่อกลับไปเพื่อทำการยืนยันวันและเวลาในการสัมภาษณ์</Emphasis> ขอให้น้อง
        ๆ ที่ผ่านการคัดเลือกเฝ้าหน้าจอโทรศัพท์และอีเมลของตัวเองไว้ให้ดี เดี๋ยวพี่ ๆ จะรีบติดต่อไปหา!
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
    </AnnouncementTemplate>
  )
}
