import { useCallback } from 'react'
import toast from 'react-hot-toast'

import Link from 'next/link'

import copy from 'copy-to-clipboard'
import useSWR from 'swr'

import { useAuthStore } from '@/auth/store'
import { Container } from '@/components/Container'
import { Loading } from '@/components/Loading'
import { Logo } from '@/components/Logo'
import { Redirect } from '@/components/Redirect'
import { getCamper } from '@/db'

import { Paper } from '../announcement/components/Paper'

export function DiscordPage() {
  const { uid } = useAuthStore()

  const { data, isValidating, error } = useSWR(['camper', uid], async (_, uid: string) => {
    return await getCamper(uid)
  })
  const verifyCode = uid?.substring(0, 6) ?? ''

  const handleCodeClick = useCallback(() => {
    copy(verifyCode)
    toast.success('คัดลอกรหัสยืนยันตัวตนแล้ว')
  }, [verifyCode])

  if (error) return <div>failed to load</div>
  if (!data && !isValidating) {
    return <Redirect to="/campers" replace />
  }
  if (!data) return <Loading />

  return (
    <div>
      <Link href="/" passHref>
        <a className="block h-[47px] w-[96px] mx-6 my-4 sm:h-[72px] sm:w-[146px] sm:mx-10 sm:mt-10">
          <Logo />
        </a>
      </Link>
      <Container maxWidth="3xl">
        <h1 className="text-2xl text-center mb-4 font-bold">เข้าร่วม Discord</h1>
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
          <div
            className="
              bg-slate-200 text-slate-900 rounded-xl py-4 cursor-pointer
              transition-colors hover:bg-slate-300
              flex gap-2 items-center justify-center relative
              text-2xl font-mono
            "
            onClick={handleCodeClick}
          >
            {verifyCode}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-slate-600 absolute right-4"
            >
              <mask
                id="mask0_1234_9160"
                style={{ maskType: 'alpha' }}
                maskUnits="userSpaceOnUse"
                x="0"
                y="0"
                width="24"
                height="24"
              >
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_1234_9160)">
                <path
                  d="M9 18C8.45 18 7.97933 17.8043 7.588 17.413C7.196 17.021 7 16.55 7 16V4C7 3.45 7.196 2.979 7.588 2.587C7.97933 2.19567 8.45 2 9 2H18C18.55 2 19.021 2.19567 19.413 2.587C19.8043 2.979 20 3.45 20 4V16C20 16.55 19.8043 17.021 19.413 17.413C19.021 17.8043 18.55 18 18 18H9ZM9 16H18V4H9V16ZM5 22C4.45 22 3.979 21.8043 3.587 21.413C3.19567 21.021 3 20.55 3 20V7C3 6.71667 3.096 6.479 3.288 6.287C3.47933 6.09567 3.71667 6 4 6C4.28333 6 4.521 6.09567 4.713 6.287C4.90433 6.479 5 6.71667 5 7V20H15C15.2833 20 15.521 20.096 15.713 20.288C15.9043 20.4793 16 20.7167 16 21C16 21.2833 15.9043 21.5207 15.713 21.712C15.521 21.904 15.2833 22 15 22H5Z"
                  fill="currentColor"
                />
              </g>
            </svg>
          </div>
        </Paper>
      </Container>
    </div>
  )
}
