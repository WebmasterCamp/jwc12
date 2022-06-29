import { Fragment, useState } from 'react'

import Link from 'next/link'

import clsx from 'clsx'

import { RegistrationStats } from '@/db/types'
import { contentQuestions } from '@/modules/register/questions/content'
import { designQuestions } from '@/modules/register/questions/design'
import { marketingQuestions } from '@/modules/register/questions/marketing'
import { programmingQuestions } from '@/modules/register/questions/programming'
import { BranchType, InputType, Question, SimpleInput } from '@/modules/register/types'
import { TrackId } from '@/track/enums'

import { BranchDialog } from './BranchDialog'
import styles from './BranchesSection.module.css'
import { LinkButton } from './Button'
import { Section } from './Section'

type BranchAbbr = {
  [key in BranchType]: string
}

const nameMap: BranchAbbr = {
  programming: 'Programming',
  content: 'Content',
  marketing: 'Marketing',
  design: 'Design',
}

const getStatname = (branch: BranchType) => nameMap[branch].toLowerCase() as keyof RegistrationStats

const imageUrl = (name: BranchType) => `/images/Card_${nameMap[name]}.png`

// TODO: Add questions
const branchesDescription = [
  {
    branch: 'content' as BranchType,
    title: 'The Content Creator: นักกวี',
    description:
      'ผู้บอกเล่าเรื่องราวของอนาคต เหมาะสำหรับคนที่ชอบถ่ายทอดเรื่องราว ทำหน้าที่ใช้ความคิดสร้างสรรค์เนื้อหาบนเว็บไซต์ให้ออกมาน่าสนใจและสื่อออกไปได้ตรงเป้า',
    questions: getExampleQuestions(contentQuestions),
  },
  {
    branch: 'design' as BranchType,
    title: 'The Designer: จิตรกร',
    description:
      'ผู้แต่งแต้มอนาคต เหมาะสำหรับคนที่ชอบจินตนาการ สร้างสรรค์สิ่งสวยงาม ทำหน้าที่ออกแบบ UX/UI ทำให้เว็บไซต์เป็นที่จดจำ​​ ใช้ง่าย โดนใจผู้ใช้งาน',
    questions: getExampleQuestions(designQuestions),
  },
  {
    branch: 'marketing' as BranchType,
    title: 'The Marketer: นักพยากรณ์',
    description:
      'ผู้ทำนายอนาคต เหมาะสำหรับคนที่ชอบวางแผนอนาคต กำหนดโชคชะตา ทำหน้าที่วางกลยุทธ์เพื่อสร้างรายได้ให้กับเว็บไซต์ และทำให้ตอบสนองต่อผู้ใช้งาน',
    questions: getExampleQuestions(marketingQuestions),
  },
  {
    branch: 'programming' as BranchType,
    title: ' The Programmer: จอมเวท',
    description:
      'ผู้สรรค์สร้างอนาคต เหมาะสำหรับคนที่ชอบเรียนภาษาโบราณและศาสตร์ลึกลับ ทำหน้าที่เขียนโค้ดจากภาษาคอมพิวเตอร์ไหนก็ได้ ให้ออกมาเป็นเว็บไซต์ที่ใช้งานได้',
    questions: getExampleQuestions(programmingQuestions),
  },
]

interface Props {
  statData: undefined | RegistrationStats
}

export const BranchesSection: React.FunctionComponent<Props> = ({ statData }) => {
  const [branch, setBranch] = useState<BranchType | null>(null)
  const onClose = () => setBranch(null)
  return (
    <Section className="text-center -mx-5 w-[calc(100%+40px)] sm:px-4 py-4" noPadding>
      <h2 className="text-3xl font-heading lg:text-4xl font-semibold" id="branch">
        เลือกสาขาที่ต้องการสมัคร
        <Star />
      </h2>
      <Link href="/campers" passHref>
        <LinkButton className="inline-block register-button mt-6 mb-16" color="gold">
          ประกาศผลผู้ผ่านการคัดเลือก
        </LinkButton>
      </Link>
      <div
        className={clsx(
          'flex flex-row overflow-x-scroll sm:overflow-x-visible -mt-8 pt-8 gap-8 font-heading font-bold text-3xl text-white sm:justify-center',
          'sm:px-9 snap-x',
          styles.branchesGrid
        )}
      >
        <div className="sm:hidden" style={{ minWidth: 'calc(100vw / 2 - 146.5px)' }} />
        {(['content', 'design', 'marketing', 'programming'] as const).map((b) => (
          <div
            key={b}
            id={b}
            onClick={() => setBranch(b)}
            className={clsx(
              'min-w-[229px] min-h-[375px] sm:min-w-0 sm:min-h-0',
              'cursor-pointer aspect-card snap-center',
              'hover:-translate-y-3 hover:scale-105',
              'transition-transform ease-out duration-500',
              branch != null && 'pointer-events-none'
            )}
            data-track-id={TrackId.BRANCH_CARD}
          >
            <img alt={nameMap[b]} src={imageUrl(b)} />
          </div>
        ))}
        <div className="sm:hidden" style={{ minWidth: 'calc(100vw / 2 - 146.5px)' }} />
        {branchesDescription.map((detail) => (
          <BranchDialog
            key={detail.branch}
            branch={detail.branch}
            title={detail.title}
            open={branch === detail.branch}
            description={detail.description}
            questions={detail.questions}
            count={statData ? statData[getStatname(detail.branch)] : 0}
            onClose={onClose}
          />
        ))}
      </div>
    </Section>
  )
}

function Star() {
  return (
    <svg
      className="absolute hidden sm:inline-block -mt-6"
      width="85"
      height="85"
      viewBox="0 0 85 85"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1109_7658)">
        <path
          d="M48.475 49.6871L74.3673 51.003L52.3537 39.797L58.9563 33.8441L49.67 36.8563L51.0032 10.6329L39.103 34.0106L32.5767 26.7757L35.328 35.2493L10.6331 33.997L33.722 45.7483L25.5101 53.1487L35.2321 50.0033L33.9971 74.3671L45.0544 52.6423L51.8897 60.2171L48.475 49.6871Z"
          fill="#E4D0A2"
        />
      </g>
      <defs>
        <clipPath id="clip0_1109_7658">
          <rect
            width="69"
            height="69"
            fill="white"
            transform="translate(18.105 0.246338) rotate(15)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

function getExampleQuestions(question: Question) {
  return question.inputs
    .filter((it) => it.type === InputType.TEXTAREA)
    .map((it) => {
      const input = it as SimpleInput
      return <Fragment key={input.name}>{input.question}</Fragment>
    })
}
