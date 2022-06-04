import Image from 'next/image'

import { useAuthStore } from '@/auth/store'
import { Container } from '@/components/Container'

export function Login() {
  const { signIn } = useAuthStore()

  return (
    <Container className="mb-12 max-w-4xl self-center m-auto flex-1 flex flex-col justify-center">
      <div className="bg-white rounded-md w-full text-center p-4 py-[86px] md:py-[116px]">
        <div className="inline-block w-[212px] h-[104px] md:w-[320px] md:h-[158px]">
          <Image src="/images/login-logo.png" width={320} height={158} />
        </div>
        <p className="mt-2 font-heading text-black text-lg md:text-2xl">
          ระบบรับสมัครค่าย Junior Webmaster Camp ครั้งที่ 12
        </p>
        <p className="my-4 font-sans text-black text-base">
          กรุณาเข้าสู่ระบบด้วย Facebook เพื่อเริ่มการสมัครค่าย
        </p>
        <button
          className="bg-[#4968AC] rounded-[10px] inline-flex gap-3 items-center py-[6px] px-5"
          onClick={signIn}
        >
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M28.5469 14.5C28.5469 6.74023 22.2598 0.453125 14.5 0.453125C6.74023 0.453125 0.453125 6.74023 0.453125 14.5C0.453125 21.511 5.58986 27.3223 12.3052 28.377V18.5606H8.73682V14.5H12.3052V11.4052C12.3052 7.88494 14.4009 5.94047 17.6107 5.94047C19.1479 5.94047 20.7554 6.21461 20.7554 6.21461V9.66969H18.9837C17.2391 9.66969 16.6948 10.7527 16.6948 11.8634V14.5H20.5906L19.9675 18.5606H16.6948V28.377C23.4101 27.3223 28.5469 21.511 28.5469 14.5Z"
              fill="white"
            />
          </svg>
          เข้าสู่ระบบด้วย Facebook
        </button>
      </div>
    </Container>
  )
}
