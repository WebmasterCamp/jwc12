import type { NextPage } from 'next'

import { useAuthStore } from '@/auth/store'
import { withAuth } from '@/auth/withAuth'
import { Button } from '@/components/Button'
import { Container } from '@/components/Container'
import { ImagePreview } from '@/components/ImagePreview'
import { Redirect } from '@/components/Redirect'
import { withRegistrationData } from '@/db'

const CompletePage: NextPage = withRegistrationData(({ registration }) => {
  const { signOut } = useAuthStore()
  const { answers, submitted } = registration!!

  if (!submitted) {
    return <Redirect to={`/register`} replace />
  }

  return (
    <Container maxWidth="4xl" className="self-center m-auto flex flex-col justify-center">
      <div className="bg-white text-black rounded-md w-full text-center flex flex-col items-center p-4 py-[86px] md:py-[116px]">
        <ImagePreview className="mb-8" value={answers.basic.profile} />
        <p className="font-bold">{`${answers.basic.title}${answers.basic.firstName} ${answers.basic.lastName}`}</p>
        <p>
          คุณได้ทำการลงทะเบียนสำเร็จเรียบร้อยแล้ว
          <br />
          โปรดติดตามประกาศรายชื่อผู้มีสิทธิ์สัมภาษณ์ได้ในวันที่ 26 มิถุนายน 2565
        </p>
        <Button className="mt-4" onClick={signOut}>
          ออกจากระบบ
        </Button>
      </div>
    </Container>
  )
})

export default withAuth(CompletePage)
