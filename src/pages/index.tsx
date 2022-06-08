import type { NextPage } from 'next'
import Link from 'next/link'

import FacebookIcon from '@iconify/icons-fa6-brands/facebook'
import InstagramIcon from '@iconify/icons-fa6-brands/instagram'
import TwitterIcon from '@iconify/icons-fa6-brands/twitter'
import { Icon } from '@iconify/react'

import { BranchesSection } from '@/components/BranchesSection'
import { Button, LinkButton } from '@/components/Button'
import { FaqSection } from '@/components/FaqSection'
import { Footer } from '@/components/Footer'
import { GoogleMap } from '@/components/Map'
import { MovingCards } from '@/components/MovingCards'
import { Navbar } from '@/components/Navbar'
import { ParticlesWidget } from '@/components/Particles'
import { PlaceSection } from '@/components/PlaceSection'
import { Question } from '@/components/Question'
import { ScheduleSection } from '@/components/ScheduleSection'
import { Section } from '@/components/Section'
import { useRegistrationStats } from '@/db/hooks'

const Home: NextPage = () => {
  const stats = useRegistrationStats()
  return (
    <>
      <Navbar className="text-white" />
      <div className="flex min-h-screen overflow-x-hidden w-full flex-col px-5 text-white">
        <ParticlesWidget />
        <div className="w-full lg:w-1/2 mx-auto">
          <h1 className="text-4xl lg:text-5xl text-center mt-16 space-y-4 font-heading">
            Make Your Site,
            <br /> Write Your <span className="text-ct">Future</span>
          </h1>
          {/* TODO: Insert sponsor logo here */}
          <div className=" space-x-4 p-8 text-center mx-auto">TODO: Insert logo</div>
          <div className="flex flex-col gap-4 lg:gap-8 lg:flex-row lg:justify-center">
            <Link href="/register" passHref>
              <LinkButton className="register-button" color="gold">
                สมัครค่าย
              </LinkButton>
            </Link>
            <LinkButton href="#about" color="gold" variant="outlined">
              รู้จักกับค่าย
            </LinkButton>
          </div>
          <MovingCards />
        </div>
        <Section className="flex flex-col-reverse lg:flex-row">
          <div className="flex-1">
            <h2 id="about" className="text-3xl font-heading lg:text-4xl mb-4 font-semibold">
              JWC คืออะไร
            </h2>
            <p className="">
              <span className="text-gold font-bold">
                JWC คือ ค่ายสร้างเว็บของเด็กม.ปลายผู้มีความฝัน อยากฟันฝ่าโชคชะตาและกำหนดอนาคต
              </span>
              <br />
              มาสร้างคำทำนายของตนบนไพ่ทั้ง 4 สาขา แห่งวงการดิจิทัล ได้แก่ Content, Design, Marketing
              และ Programming แลกเปลี่ยนความคิดกับผู้กำหนดโชคชะตาด้วยกัน ร่วมสร้างสรรค์คำทำนายบนไพ่
              พร้อมเปิดประสบการณ์ใหม่ในการทำเวิร์คช็อปสุดเข้มข้น แล้วมาท้าชนโชคชะตาล่าอนาคตด้วยกัน
              กับค่าย JWC12: Make Your Site, Write Your Future
            </p>
          </div>
          <div className="flex-1">Insert video here</div>
        </Section>
        <ScheduleSection />
        <PlaceSection />
        <BranchesSection statData={stats.data} />
        <FaqSection />
        <Section className="text-center">
          <h2 className="text-3xl lg:text-4l font-semibold font-heading mb-16">ภาพกิจกรรม</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {Array(9)
              .fill(0)
              .map((_, i) => `/images/0${i + 1}.jpeg`)
              .map((x) => (
                <img key={x} src={x} alt="Activities at JWC11" />
              ))}
          </div>
        </Section>
        <Section className="text-center">
          <h2 className="text-3xl lg:text-4l font-semibold font-heading mb-4">
            ติดตามข่าวสารของเรา
          </h2>
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
        {/* 
        TODO: Add this back after sponser send logo
        <Section className="text-center">
          <h2 className="text-3xl font-heading lg:text-4xl mb-4 font-semibold">ผู้สนับสนุน</h2>
        </Section> */}
        <Footer />
      </div>
    </>
  )
}

export default Home
