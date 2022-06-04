import type { NextPage } from 'next'

import FacebookIcon from '@iconify/icons-fa6-brands/facebook'
import InstagramIcon from '@iconify/icons-fa6-brands/instagram'
import TwitterIcon from '@iconify/icons-fa6-brands/twitter'
import { Icon } from '@iconify/react'

import { Button } from '@/components/Button'
import { Footer } from '@/components/Footer'
import { Map } from '@/components/Map'
import { Navbar } from '@/components/Navbar'
import { ParticlesWidget } from '@/components/Particles'
import { Question } from '@/components/Question'
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
            <span className="text-gold font-bold">
              JWC คือ ค่ายสร้างเว็บของเด็กม.ปลายที่อยากกำหนดโชคชะตา
            </span>{' '}
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
        <p>TODO: Insert schedule</p>
      </Section>
      <Section className="rounded-xl lg:border grid grid-cols-1 lg:grid-cols-2 border-gold lg:w-10/12">
        <div className="hidden lg:block">
          <Map />
        </div>
        <div>
          <h2 className="text-3xl font-heading mb-4 font-semibold">สถานที่</h2>
          <h3 className="text-gold font-heading font-semibold">
            คณะเทคโนโลยีสารสนเทศ <br></br> สถาบันเทคโนโลยีพระจอมเกล้าเจ้าคุณทหารลาดกระบัง
          </h3>
          <p className="mb-4">เลขที่ 1 ซอยฉลองกรุง 1 แขวงลาดกระบัง เขตลาดกระบัง กรุงเทพฯ</p>
          <h3 className="text-3xl font-heading mb-4 font-semibold">วิธีการเดินทาง</h3>
        </div>
      </Section>
      <Section className="text-center">
        <h2 className="text-3xl font-heading lg:text-4xl mb-4 font-semibold">
          เลือกสาขาที่ต้องการสมัคร
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 text-brown-dark font-heading font-bold text-3xl">
          {/* TODO: Use actual cards */}
          <div className="bg-white p-8">Card</div>
          <div className="bg-white p-8">Card</div>
          <div className="bg-white p-8">Card</div>
          <div className="bg-white p-8">Card</div>
        </div>
      </Section>
      <Section>
        <h2 id="faq" className="text-3xl font-heading lg:text-4xl mb-4 font-semibold text-center">
          คำถามที่พบบ่อย
        </h2>
        <Question title="Lorem ipsum dolor amend">rinrinirtnritni</Question>
        <Question title="Lorem ipsum dolor amend">rinrinirtnritni</Question>
        <Question title="Lorem ipsum dolor amend">rinrinirtnritni</Question>
        <Question title="Lorem ipsum dolor amend">rinrinirtnritni</Question>
      </Section>
      <Section className="text-center">
        <h2 className="text-3xl lg:text-4l font-semibold font-heading mb-4">ภาพกิจกรรม</h2>
        <p>TODO: ใส่ภาพกิจกรรม</p>
      </Section>
      <Section className="text-center">
        <h2 className="text-3xl lg:text-4l font-semibold font-heading mb-4">ติดตามข่าวสารของเรา</h2>
        <div className="space-x-8">
          <a
            href="https://www.facebook.com/jwcth"
            target="_blank"
            className="hover:text-gold"
            rel="noreferrer"
          >
            <Icon icon={FacebookIcon} className="mr-3 inline text-3xl sm:text-5xl" inline />
          </a>
          <a
            href="https://twitter.com/jwcth"
            className="hover:text-gold"
            target="_blank"
            rel="noreferrer"
          >
            <Icon icon={TwitterIcon} className="mr-3 inline text-3xl sm:text-5xl" inline />
          </a>
          <a
            href="https://www.instagram.com/jwcth/"
            target="_blank"
            className="hover:text-gold"
            rel="noreferrer"
          >
            <Icon icon={InstagramIcon} className="mr-3 inline text-3xl sm:text-5xl" inline />
          </a>
        </div>
      </Section>
      <Section className="text-center">
        <h2 className="text-3xl font-heading lg:text-4xl mb-4 font-semibold">ผู้สนับสนุน</h2>
      </Section>
      <Footer />
    </div>
  )
}

export default Home
