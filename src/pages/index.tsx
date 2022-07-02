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
        <div className="w-full lg:w-3/4 mx-auto pt-16">
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
        <Section className="text-center">
          <h2 className="text-3xl font-heading lg:text-4xl mb-16 font-semibold">พันธมิตร</h2>
          <MediaPartner />
        </Section>
        <Footer />
      </div>
    </>
  )
}

const withLink = (url: string, children: ReactNode) => (
  <a
    href={url}
    target="_blank"
    rel="noreferrer"
    className="flex flex-row justify-center items-center"
  >
    {children}
  </a>
)

function SponsorLogosOnHero() {
  return (
    <div className="space-x-4 text-center mx-auto flex flex-row items-center justify-center gap-x-6 flex-wrap my-20">
      <div className="flex flex-row flex-wrap basis-full justify-center gap-x-[56px] gap-y-[56px] mb-[20px]">
        {withLink(
          'https://www.webmaster.or.th/',
          <img
            className="h-[36px] md:h-[72px] cursor-pointer"
            src="/images/sponsors/VIP0A_TWA.svg"
            alt="Thai Webmaster Association"
          />
        )}
        {withLink(
          'https://www.it.kmitl.ac.th/',
          <img
            className="h-[44px] md:h-[88px] cursor-pointer"
            src="/images/sponsors/VIP0B_IT.svg"
            alt="IT KMITL"
          />
        )}
      </div>
      <div className="flex flex-row flex-wrap basis-full justify-center items-end gap-x-[56px] gap-y-[56px] mb-[70px]">
        {withLink(
          'https://www.cpall.co.th/',
          <img
            className="h-[48px] md:h-[96px] cursor-pointer"
            src="/images/sponsors/VIP_01_CP.svg"
            alt="CP All"
          />
        )}
        {withLink(
          'https://www.scb.co.th/',
          <img
            className="h-[28px] md:h-[56px] cursor-pointer"
            src="/images/sponsors/VIP_02_SCB.svg"
            alt="SCB"
          />
        )}
      </div>
      <div className="flex flex-row flex-wrap basis-full justify-center items-end gap-x-[56px] gap-y-[56px]">
        {withLink(
          'https://foretoday.asia/ ',
          <img
            className="h-[30px] md:h-[60px] cursor-pointer"
            src="/images/sponsors/VIP_03_ForeToday.svg"
            alt="Fore Today"
          />
        )}
        {withLink(
          'https://www.shippop.com/',
          <img
            className="h-[24px] md:h-[48px] cursor-pointer"
            src="/images/sponsors/VIP_04_Shippop.svg"
            alt="Shippop"
          />
        )}
      </div>
    </div>
  )
}

function SponsorLogosOnBottom() {
  return (
    <div className="space-x-4 text-center mx-auto flex flex-col items-center justify-center gap-y-[112px]">
      {/** VIP */}
      <div className="flex flex-wrap flex-1 gap-x-[56px] gap-y-[72px] justify-center items-center">
        {withLink(
          'https://www.webmaster.or.th/',
          <img
            className="h-[48px] md:h-[96px] cursor-pointer"
            src="/images/sponsors/VIP0A_TWA.svg"
            alt="Thai Webmaster Association"
          />
        )}
        {withLink(
          'https://www.it.kmitl.ac.th/',
          <img
            className="h-[52px] md:h-[104px] cursor-pointer"
            src="/images/sponsors/VIP0B_IT.svg"
            alt="IT KMITL"
          />
        )}
        {withLink(
          'https://www.cpall.co.th/',
          <img
            className="h-[62px] md:h-[124px] cursor-pointer"
            src="/images/sponsors/VIP_01_CP.svg"
            alt="CP All"
          />
        )}
        {withLink(
          'https://www.scb.co.th/',
          <img
            className="h-[36px] md:h-[72px] cursor-pointer"
            src="/images/sponsors/VIP_02_SCB.svg"
            alt="SCB"
          />
        )}
        {withLink(
          'https://foretoday.asia/ ',
          <img
            className="h-[39px] md:h-[78px] cursor-pointer"
            src="/images/sponsors/VIP_03_ForeToday.svg"
            alt="Fore Today"
          />
        )}
        {withLink(
          'https://www.shippop.com/',
          <img
            className="h-[35px] md:h-[70px] cursor-pointer"
            src="/images/sponsors/VIP_04_Shippop.svg"
            alt="Shippop"
          />
        )}
      </div>

      {/** SP */}
      <div className="flex flex-wrap flex-1 gap-x-[72px] gap-y-[64px] justify-center items-center">
        {withLink(
          'https://www.brikl.com/',
          <img
            className="h-[36px] md:h-[72px] cursor-pointer"
            src="/images/sponsors/SP_01_Brikl.svg"
            alt="Brikl"
          />
        )}
        {withLink(
          'https://cleverse.com/ ',
          <img
            className="h-[44px] md:h-[88px] cursor-pointer"
            src="/images/sponsors/SP_02_Cleverse.svg"
            alt="Cleverse"
          />
        )}
        {withLink(
          'https://developer.microsoft.com',
          <img
            className="h-[44px] md:h-[80px] cursor-pointer"
            src="/images/sponsors/SP_03_Microsoft.png"
            alt="Microsoft"
          />
        )}
        {withLink(
          'https://www.viabus.co/',
          <img
            className="h-[36px] md:h-[72px] cursor-pointer"
            src="/images/sponsors/SP_04_VIABUS.svg"
            alt="ViaBus"
          />
        )}
        {withLink(
          '/',
          <img
            className="h-[36px] md:h-[72px] cursor-pointer"
            src="/images/sponsors/SP_05_NUT.svg"
            alt="NUT"
          />
        )}
        {withLink(
          'https://www.facebook.com/oddsteam ',
          <img
            className="h-[36px] md:h-[72px] cursor-pointer"
            src="/images/sponsors/SP_06_ODDS.svg"
            alt="ODDS"
          />
        )}
      </div>

      {/** P */}
      <div className="flex flex-wrap flex-1 gap-x-[48px] gap-y-[32px] justify-center items-center">
        {withLink(
          'https://www.facebook.com/imaginethailandmovement',
          <img
            className="h-[40px] md:h-[80px] cursor-pointer"
            src="/images/sponsors/P_01_ImgTH.svg"
            alt="Imagine"
          />
        )}
        {withLink(
          'https://www.camphub.in.th/',
          <img
            className="h-[44px] md:h-[88px] cursor-pointer"
            src="/images/sponsors/P_02_Camphub.svg"
            alt="camphub"
          />
        )}
        {withLink(
          'https://pantip.com/',
          <img
            className="h-[40px] md:h-[80px] cursor-pointer"
            src="/images/sponsors/P_03_Pantip.svg"
            alt="Pantip"
          />
        )}
        {withLink(
          '/',
          <img
            className="h-[40px] md:h-[80px] cursor-pointer"
            src="/images/sponsors/P_04_YWC-Luxury.svg"
            alt="YWC Luxury"
          />
        )}
        {withLink(
          'https://spaceth.co/',
          <img
            className="h-[40px] md:h-[80px] cursor-pointer"
            src="/images/sponsors/P_05_Spaceth.svg"
            alt="Spaceth"
          />
        )}
      </div>

      {/** S */}
      <div className="flex flex-wrap flex-1 gap-x-[48px] justify-center items-center">
        {withLink(
          'https://www.dek-d.com/',
          <img
            className="h-[40px] md:h-[60px] cursor-pointer"
            src="/images/sponsors/S_01_Dek-d.svg"
            alt="Dek-d"
          />
        )}
      </div>
    </div>
  )
}

function MediaPartner() {
  return (
    <div className="space-x-4 text-center mx-auto flex flex-col items-center justify-center gap-y-[48px]">
      <div className="flex flex-wrap flex-1 gap-x-[60px] gap-y-[48px] justify-center items-center">
        {withLink(
          'https://baseplayhouse.co/',
          <img className="h-[60px] cursor-pointer" src="/images/mediaPartners/MP_01.png" alt="" />
        )}
        {withLink(
          'https://www.modernist.life/',
          <img className="h-[60px] cursor-pointer" src="/images/mediaPartners/MP_02.png" alt="" />
        )}
        {withLink(
          'https://www.skooldio.com/ ',
          <img className="h-[60px] cursor-pointer" src="/images/mediaPartners/MP_03.png" alt="" />
        )}
        {withLink(
          'https://www.facebook.com/join.codebase/',
          <img className="h-[60px] cursor-pointer" src="/images/mediaPartners/MP_04.png" alt="" />
        )}
        {withLink(
          'https://www.mindground.world/',
          <img className="h-[60px] cursor-pointer" src="/images/mediaPartners/MP_05.png" alt="" />
        )}
        {withLink(
          'https://www.contentshifu.com/',
          <img className="h-[60px] cursor-pointer" src="/images/mediaPartners/MP_06.png" alt="" />
        )}
        {withLink(
          'https://www.youtube.com/c/QueenH',
          <img className="h-[60px] cursor-pointer" src="/images/mediaPartners/MP_07.png" alt="" />
        )}
        {withLink(
          'https://www.facebook.com/learnlalen',
          <img className="h-[60px] cursor-pointer" src="/images/mediaPartners/MP_08.png" alt="" />
        )}
        {withLink(
          'https://www.facebook.com/dataholicth',
          <img className="h-[60px] cursor-pointer" src="/images/mediaPartners/MP_09.png" alt="" />
        )}
        {withLink(
          'https://adaddictth.com/',
          <img className="h-[60px] cursor-pointer" src="/images/mediaPartners/MP_10.png" alt="" />
        )}
      </div>
    </div>
  )
}

export default Home
