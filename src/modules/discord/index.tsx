import Link from 'next/link'

import useSWR from 'swr'

import { useAuthStore } from '@/auth/store'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { Logo } from '@/components/Logo'
import { getCamper } from '@/db'

import { Paper } from '../announcement/components/Paper'

export function DiscordPage() {
  const { pending, uid } = useAuthStore()

  const { data, error } = useSWR(['user', uid], async (_, uid: string) => {
    return await getCamper(uid)
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
        <Paper>
          <h2 className="text-lg font-bold mb-4">ขั้นตอนการเข้า Discord</h2>
          <ol className="list-decimal ml-6 mb-6">
            <li>
              ดาวน์โหลดโปรแกรม{' '}
              <a href="https://discord.com/download" className="text-primary underline">
                Discord
              </a>
            </li>
            <li>
              เข้าเซิฟเวอร์ JWC12 ผ่าน{' '}
              <a href={data.discordLink} className="text-primary underline">
                Invite Link
              </a>
            </li>
            <li>
              พิมพ์คำสั่ง{' '}
              <span className="bg-slate-200 text-slate-900 text-sm font-mono p-1 rounded-md">
                /verify
              </span>{' '}
              และกรอกรหัสยืนยันตัวตนด้านล่าง
            </li>
          </ol>
          <h2 className="text-lg font-bold mb-4">รหัสยืนยันตัวตน</h2>
          <div className="bg-slate-200 text-slate-900 rounded-xl py-4 text-center text-2xl font-mono">
            {uid?.substring(0, 6)}
          </div>
        </Paper>
      </Container>
    </div>
  )
}
