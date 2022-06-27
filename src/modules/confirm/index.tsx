import Link from 'next/link'

import useSWR from 'swr'

import { useAuthStore } from '@/auth/store'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { ExternalLink } from '@/components/ExternalLink'
import { Logo } from '@/components/Logo'
import { getRegistration } from '@/db'

import { Paper } from '../announcement/components/Paper'

const DiscordButton = () => {
  return <Button className="bg-[#5865F2] text-white hover:bg-[#404EED]">เชื่อมต่อ Discord</Button>
}

const Header: React.FC<{ label: string }> = ({ label }) => {
  return <h1 className="basis-full font-bold text-xl">{label}</h1>
}

const DataField: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  return (
    <div className="basis-1/2">
      <div className="text-gray-400 text-xs">{label}</div>
      <div>{value}</div>
    </div>
  )
}

export const ConfirmPage: React.FC = () => {
  const { pending, uid } = useAuthStore()

  const { data, error } = useSWR(['user', uid], async (_, uid: string) => {
    return await getRegistration(uid)
  })

  if (error) return <div>failed to load</div>
  if (pending || !data) return null

  console.log(data)

  return (
    <div>
      <Link href="/" passHref>
        <a className="block h-[47px] w-[96px] mx-6 my-4 sm:h-[72px] sm:w-[146px] sm:mx-10 sm:mt-10">
          <Logo />
        </a>
      </Link>
      <Container maxWidth="3xl">
        <h1 className="text-2xl text-center mb-4 font-bold">ยืนยันสิทธิ์</h1>
        <Paper className="flex flex-row w-full flex-wrap gap-y-4">
          <Header label="Discord" />
          <p>
            ภายในค่าย JWC12 ครั้งนี้ เราจะใช้{' '}
            <ExternalLink
              href="https://discord.com/download"
              className="text-[#5865F2] hover:text-[#404EED]"
            >
              Discord
            </ExternalLink>{' '}
            เป็นช่องการสื่อสารหลักและการจัดกิจกรรมบางส่วน
          </p>
          <div className="basis-full flex flex-row">
            <DiscordButton />
          </div>

          <div className="mb-3 basis-full" />
          <Header label="ข้อมูลส่วนตัว" />
          <DataField label="ชื่อ" value={data.answers.basic.firstName} />
          <DataField label="นามสกุล" value={data.answers.basic.lastName} />
          <DataField label="ชื่อเล่น" value={data.answers.basic.nickname} />
          <DataField label="วันเกิด" value={data.answers.basic.birthDate} />
          <DataField label="เบอร์โทร" value={data.answers.basic.telephone} />
          <DataField label="อีเมล" value={data.answers.basic.email} />
          <DataField label="สาขา" value={data.confirmedBranch ?? ''} />
          <DataField label="ไซส์เสื้อ" value={data.answers.additional.shirtSize} />

          <div className="mb-3 basis-full" />
          <Header label="ติดต่อฉุกเฉิน" />
          <DataField label="ชื่อ" value={data.answers.additional.emergencyFirstName} />
          <DataField label="นามสกุล" value={data.answers.additional.emergencyLastName} />
          <DataField label="ความสัมพันธ์" value={data.answers.additional.emergencyReleationship} />
          <DataField label="เบอร์โทร" value={data.answers.additional.emergencyPhone} />

          <div className="mb-3 basis-full" />
          <Header label="ผู้ปกครอง" />
          <DataField label="ชื่อ" value={data.answers.additional.parentFirstName} />
          <DataField label="นามสกุล" value={data.answers.additional.parentLastName} />
          <DataField label="ความสัมพันธ์" value={data.answers.additional.parentReleationship} />
          <DataField label="เบอร์โทร" value={data.answers.additional.parentPhone} />

          <div className="mb-3 basis-full" />
          <Button className="w-full">ยืนยันสิทธิ์</Button>
        </Paper>
      </Container>
    </div>
  )
}
