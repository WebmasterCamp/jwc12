import { useMemo } from 'react'

import { Loading } from '@/components/Loading'
import { useCampers } from '@/db/hooks'
import { Camper } from '@/db/types'

import { Emphasis, PhoneNumber } from './components'
import { AnnouncementTemplate } from './template'
import { AnnouncementColumn } from './types'

const columns: AnnouncementColumn<Camper>[] = [
  {
    key: 'id',
    label: 'รหัส',
  },
  {
    key: 'name',
    label: 'ชื่อ - นามสกุล',
  },
  {
    key: 'confirmAmount',
    label: 'ยอดโอน (บาท)',
  },
]

export function CampersAnnouncement() {
  const { pending, data } = useCampers()

  const campers = useMemo(() => data?.data ?? [], [data])

  if (pending) {
    return <Loading />
  }

  return (
    <AnnouncementTemplate
      title="ประกาศผลผู้ผ่านการคัดเลือก"
      tableHeader="รายชื่อผู้ผ่านการคัดเลือกเข้าร่วมค่าย JWC12"
      linkPrefix="/campers/"
      candidates={campers}
      columns={columns}
    >
      <h2 className="text-lg font-bold mb-4">ขั้นตอนต่อไป</h2>
      <p className="mb-6">
        ขอให้น้อง ๆ ที่ผ่านการคัดเลือกเฝ้าหน้าจอโทรศัพท์และอีเมลของตัวเองไว้ให้ดี เดี๋ยวพี่ ๆ
        จะรีบติดต่อไปหา! โดยน้อง ๆ จะต้องกรอกฟอร์มยืนยันและโอนเงินค่ายืนยันสิทธิ์ไปยังบัญชีที่พี่ ๆ
        แจ้งไว้ในอีเมล <Emphasis>ภายในวันพฤหัสบดีที่ 30 มิถุนายน 2565 เวลา 12:00 น.</Emphasis>{' '}
        มิฉะนั้นจะถือว่าสละสิทธิ์
        <br />
        <br />
        หมายเหตุ ทางค่ายจะคืนเงินให้ เมื่อน้องอยู่ครบตามระยะเวลาการจัดค่าย (8 - 10 กรกฎาคม 2565)
      </p>
      <h2 className="text-lg font-bold mb-4">
        สิ่งที่ต้องเตรียมเพื่อยืนยันสิทธิ์เข้าร่วมค่าย JWC12
      </h2>
      <ol className="list-decimal ml-6 mb-6">
        <li>ดูจำนวนเงินค่ายืนยันสิทธิ์จำนวน 500.xx ได้ที่ท้ายรายชื่อของตนเอง</li>
        <li>เตรียมหลักฐานการฉีดวัคซีนโควิด-19 แคปจอจากหมอพร้อมรอไว้ได้เลย</li>
        <li>อย่าลืมเข้าไปอ่านรายละเอียดและกรอกฟอร์มยืนยันสิทธิ์ที่พี่ ๆ ส่งให้น้อง ๆ ทางอีเมล</li>
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
