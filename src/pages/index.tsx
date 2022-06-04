import type { NextPage } from 'next'

import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { ParticlesWidget } from '@/components/Particles'
import { Section } from '@/components/Section'

const Home: NextPage = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col px-5 text-white">
      <Navbar />
      <ParticlesWidget />
      <div className="w-full lg:w-1/2 mx-auto">
        <h1 className="text-4xl lg:text-5xl text-center mt-16 space-y-4 font-heading">
          Make Your site,
          <br /> Write Your <span className="text-ct">Future</span>
        </h1>
        {/* TODO: Insert sponsor logo here */}
        <div className=" space-x-4 p-8 text-center mx-auto">TODO: Insert logo</div>
        <div className="flex flex-col gap-4 lg:gap-8 lg:flex-row lg:justify-center">
          <Button variant="gold">สมัครค่าย</Button>
          <Button variant="outlined-gold">รู้จักกับค่าย</Button>
        </div>
      </div>
      <Section className="flex flex-col-reverse lg:flex-row">
        <div className="flex-1">
          <h2 id="about" className="text-3xl font-heading lg:text-4xl mb-4 font-semibold">
            รู้จักกับค่ายแห่งโชคชะตา
          </h2>
          <p className="">
            <span className="text-gold">JWC คือ ค่ายสร้างเว็บของเด็กม.ปลายที่อยากกำหนดโชคชะตา</span>{' '}
            มาร่วมสร้างคำทำนายของตน บนไพ่แห่งโชคชะตาทั้ง 4 สาขาแห่งวงการดิจิทัล ได้แก่ Content,
            Design, Marketing และ Programming แลกเปลี่ยนความคิดกับผู้กำหนดโชคชะตาด้วยกัน
            สร้างสรรค์คำทำนายบนไพ่ พร้อมเปิดประสบการณ์ใหม่ในการทำเวิร์คช็อปสุดเข้มข้น
            แล้วมาท้าชนโชคชะตาล่าอนาคตด้วยกันกับค่าย JWC12 : Make Your Site, Write Your Future
          </p>
        </div>
        <div className="flex-1">Insert video here</div>
      </Section>
      <Section className="text-center">
        <h2 id="schedule" className="text-3xl font-heading lg:text-4xl mb-4 font-semibold">
          กำหนดการ
        </h2>
      </Section>
      <Footer />
    </div>
  )
}

export default Home
