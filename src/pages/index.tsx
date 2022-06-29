import { ReactNode, useEffect, useRef, useState } from 'react'

import type { NextPage } from 'next'
import Link from 'next/link'

import FacebookIcon from '@iconify/icons-fa6-brands/facebook'
import InstagramIcon from '@iconify/icons-fa6-brands/instagram'
import TwitterIcon from '@iconify/icons-fa6-brands/twitter'
import { Icon } from '@iconify/react'

import { BranchesSection } from '@/components/BranchesSection'
import { LinkButton } from '@/components/Button'
import { FaqSection } from '@/components/FaqSection'
import { Footer } from '@/components/Footer'
import { Logo } from '@/components/Logo'
import { MovingCards } from '@/components/MovingCards'
import { Navbar } from '@/components/Navbar'
import { ParticlesWidget } from '@/components/Particles'
import { PlaceSection } from '@/components/PlaceSection'
import { ScheduleSection } from '@/components/ScheduleSection'
import { Section } from '@/components/Section'
import { Star } from '@/components/Star'
import { useRegistrationStats } from '@/db/hooks'
import { supportsHEVCAlpha } from '@/utils/checkHVECAlphaSupport'

const Home: NextPage = () => {
  const stats = useRegistrationStats()
  const supportsHEVC = useRef<boolean>()

  useEffect(() => {
    supportsHEVC.current = supportsHEVCAlpha()
  }, [])

  return (
    <>
      <Navbar className="text-white" />
      <div className="flex min-h-screen overflow-x-hidden w-full flex-col px-5 text-white">
        <ParticlesWidget />
        <div className="w-full lg:w-1/2 mx-auto pt-16">
          <div className="flex gap-x-4 items-center justify-center">
            <Star />
            <p className="text-gold-dark whitespace-nowrap text-center">
              ค่ายสร้างเว็บที่เด็กม.ปลาย พลาดไม่ได้ !!
            </p>
            <Star />
          </div>
          <h1 className="text-4xl lg:text-5xl text-center space-y-4 font-heading">
            Make Your Site,
            <br /> Write Your <span className="text-ct">Future</span>
          </h1>
          <SponsorLogosOnHero />
          <div className="flex flex-col gap-4 sm:gap-8 sm:flex-row sm:justify-center">
            <Link href="/campers" passHref>
              <LinkButton className="register-button" color="gold">
                ประกาศผลผู้ผ่านการคัดเลือก
              </LinkButton>
            </Link>
          </div>
          <MovingCards />
        </div>
        <Section className="flex flex-col-reverse gap-10 md:flex-row md:items-center lg:max-w-[1088px]">
          <div className="flex-1">
            <h2 id="about" className="text-3xl font-heading lg:text-4xl mb-4 font-semibold">
              JWC คืออะไร
            </h2>
            <p className="">
              <span className="text-gold font-bold inline-block mb-2">
                JWC คือ ค่ายสร้างเว็บของเด็กม.ปลายผู้มีความฝัน อยากฟันฝ่าโชคชะตาและกำหนดอนาคต
              </span>
              <br />
              มาสร้างคำทำนายของตนบนไพ่ทั้ง 4 สาขา แห่งวงการดิจิทัล ได้แก่ Content, Design, Marketing
              และ Programming แลกเปลี่ยนความคิดกับผู้กำหนดโชคชะตาด้วยกัน ร่วมสร้างสรรค์คำทำนายบนไพ่
              พร้อมเปิดประสบการณ์ใหม่ในการทำเวิร์คช็อปสุดเข้มข้น แล้วมาท้าชนโชคชะตาล่าอนาคตด้วยกัน
              กับค่าย JWC12: Make Your Site, Write Your Future
            </p>
          </div>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="flex-[1-0-0%]"
            src={
              supportsHEVC.current ? '/images/shuffle-cards-hevc.mov' : `/images/shuffle-cards.webm`
            }
          ></video>
        </Section>
        <ScheduleSection />
        <PlaceSection />
        <BranchesSection statData={stats.data} />
        <FaqSection />
        <Section className="text-center">
          <h2 className="text-3xl lg:text-4l font-semibold font-heading mb-16">ภาพกิจกรรม</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Array(9)
              .fill(0)
              .map((_, i) => `/images/0${i + 1}.jpg`)
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
              className="hover:text-gold transition-colors ease-in"
              rel="noreferrer"
            >
              <Icon icon={FacebookIcon} className="mr-3 inline text-3xl sm:text-5xl" inline />
            </a>
            <a
              href="https://twitter.com/jwcth"
              className="hover:text-gold transition-colors ease-in"
              target="_blank"
              rel="noreferrer"
            >
              <Icon icon={TwitterIcon} className="mr-3 inline text-3xl sm:text-5xl" inline />
            </a>
            <a
              href="https://www.instagram.com/jwcth/"
              target="_blank"
              className="hover:text-gold transition-colors ease-in"
              rel="noreferrer"
            >
              <Icon icon={InstagramIcon} className="mr-3 inline text-3xl sm:text-5xl" inline />
            </a>
          </div>
        </Section>
        <Section className="text-center">
          <h2 className="text-3xl font-heading lg:text-4xl mb-16 font-semibold">ผู้สนับสนุน</h2>
          <SponsorLogosOnBottom />
        </Section>
        {/* TODO: Media Partner images broken */}
        {/* <Section className="text-center">
          <h2 className="text-3xl font-heading lg:text-4xl mb-16 font-semibold">พันธมิตร</h2>
          <MediaPartner />
        </Section> */}
        <Footer />
      </div>
    </>
  )
}

const withLink = (url: string, children: ReactNode) => (
  <a href={url} target="_blank" rel="noreferrer">
    {children}
  </a>
)

function SponsorLogosOnHero() {
  return (
    <div className="space-x-4 text-center mx-auto flex flex-row items-center justify-center gap-6 flex-wrap my-20">
      {withLink(
        'https://www.webmaster.or.th/',
        <img
          className="h-14 cursor-pointer"
          src="/images/sponsors/01_TWA.svg"
          alt="Thai Webmaster Association"
        />
      )}
      {withLink(
        'https://www.it.kmitl.ac.th/',
        <img className="h-14 cursor-pointer" src="/images/sponsors/02_IT.svg" alt="IT KMITL" />
      )}
      {withLink(
        'https://www.cpall.co.th/',
        <img
          className="h-[72px] cursor-pointer"
          src="/images/sponsors/VIP_01_CP.svg"
          alt="CP All"
        />
      )}
      {withLink(
        'https://www.scb.co.th/',
        <img className="h-14 cursor-pointer" src="/images/sponsors/VIP_02_SCB.svg" alt="SCB" />
      )}
    </div>
  )
}

function SponsorLogosOnBottom() {
  return (
    <div className="space-x-4 p-8 text-center mx-auto flex flex-col items-center justify-center gap-y-16">
      <div className="flex flex-wrap flex-1 gap-x-20 justify-center items-center">
        {withLink(
          'https://www.webmaster.or.th/',
          <img
            className="h-20 cursor-pointer"
            src="/images/sponsors/01_TWA.svg"
            alt="Thai Webmaster Association"
          />
        )}
        {withLink(
          'https://www.it.kmitl.ac.th/',
          <img className="h-20 cursor-pointer" src="/images/sponsors/02_IT.svg" alt="IT KMITL" />
        )}
      </div>
      <div className="flex flex-wrap flex-1 gap-x-20 justify-center items-center">
        {withLink(
          'https://www.cpall.co.th/',
          <img className="h-20 cursor-pointer" src="/images/sponsors/VIP_01_CP.svg" alt="CP All" />
        )}
        {withLink(
          'https://www.scb.co.th/',
          <img className="h-20 cursor-pointer" src="/images/sponsors/VIP_02_SCB.svg" alt="SCB" />
        )}
      </div>
      <div className="flex flex-wrap flex-1 gap-x-20 justify-center items-center">
        {withLink(
          '/',
          <img
            className="h-20 cursor-pointer"
            src="/images/sponsors/Partner_01_Imagine.svg"
            alt="Imagine"
          />
        )}
        {withLink(
          'https://www.camphub.in.th/',
          <img
            className="h-8 cursor-pointer"
            src="/images/sponsors/Partner_02_camphub.svg"
            alt="camphub"
          />
        )}
      </div>
      <div className="flex flex-wrap flex-1 gap-x-20 justify-center items-center">
        {withLink(
          'https://www.dek-d.com/',
          <img
            className="h-5 cursor-pointer"
            src="/images/sponsors/Sponsor_01_Dekd.svg"
            alt="camphub"
          />
        )}
      </div>
    </div>
  )
}

function MediaPartner() {
  return (
    <div className="space-x-4 p-8 text-center mx-auto flex flex-col items-center justify-center gap-y-16">
      <div className="flex flex-wrap flex-1 gap-x-20 justify-center items-center">
        {withLink(
          'https://www.youtube.com/c/QueenH',
          <img
            className="h-10 cursor-pointer"
            src="/images/mediaPartners/1_QueenH.png"
            alt="QueenH"
          />
        )}
        {withLink(
          'https://www.facebook.com/learnlalen',
          <img
            className="h-10 cursor-pointer"
            src="/images/mediaPartners/2_learnlalen.png"
            alt="learnlalen"
          />
        )}
        {withLink(
          'https://www.modernist.life/',
          <img
            className="h-10 cursor-pointer"
            src="/images/mediaPartners/3_Modernist.png"
            alt="Modernist"
          />
        )}
        {withLink(
          'https://www.contentshifu.com/',
          <img
            className="h-10 cursor-pointer"
            src="/images/mediaPartners/4_content-shifu.png"
            alt="content-shifu"
          />
        )}
        {withLink(
          'https://www.facebook.com/join.codebase/',
          <img
            className="h-10 cursor-pointer"
            src="/images/mediaPartners/5_codebase.png"
            alt="codebase"
          />
        )}
        {withLink(
          'https://baseplayhouse.co/',
          <img className="h-10 cursor-pointer" src="/images/mediaPartners/6_BASE.png" alt="BASE" />
        )}
        {withLink(
          'https://www.facebook.com/dataholicth',
          <img
            className="h-10 cursor-pointer"
            src="/images/mediaPartners/7_dataholic.png"
            alt="dataholicth"
          />
        )}
        {withLink(
          'https://adaddictth.com/',
          <img
            className="h-10 cursor-pointer"
            src="/images/mediaPartners/8_AdAddict.png"
            alt="AdAddict"
          />
        )}
      </div>
    </div>
  )
}

export default Home
