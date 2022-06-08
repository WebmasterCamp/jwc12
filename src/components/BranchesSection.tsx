import { Fragment, useState } from 'react'

import clsx from 'clsx'

import { RegistrationStats } from '@/db/types'
import { contentQuestions } from '@/modules/register/questions/content'
import { designQuestions } from '@/modules/register/questions/design'
import { marketingQuestions } from '@/modules/register/questions/marketing'
import { programmingQuestions } from '@/modules/register/questions/programming'
import { InputType, Question, SimpleInput } from '@/modules/register/types'

import { BranchDialog } from './BranchDialog'
import styles from './BranchesSection.module.css'
import { Section } from './Section'

type Branch = 'pg' | 'mk' | 'ds' | 'ct'
type BranchAbbr = {
  [key in Branch]: string
}

const nameMap: BranchAbbr = {
  pg: 'Programming',
  ct: 'Content',
  mk: 'Marketing',
  ds: 'Design',
}

const getStatname = (branch: Branch) => nameMap[branch].toLowerCase() as keyof RegistrationStats

const imageUrl = (name: Branch) => `/images/Card_${nameMap[name]}.png`

// TODO: Add questions
const branchesDescription = [
  {
    branch: 'ct',
    title: 'The Content Creator: นักกวี',
    description:
      'ผู้บอกเล่าเรื่องราวของอนาคต เหมาะสำหรับคนที่ชอบถ่ายทอดเรื่องราว ทำหน้าที่ใช้ความคิดสร้างสรรค์เนื้อหาบนเว็บไซต์ให้ออกมาน่าสนใจและสื่อออกไปได้ตรงเป้า',
    questions: getExampleQuestions(contentQuestions),
  },
  {
    branch: 'ds',
    title: 'The Designer: จิตรกร',
    description:
      'ผู้แต่งแต้มอนาคต เหมาะสำหรับคนที่ชอบจินตนาการ สร้างสรรค์สิ่งสวยงาม ทำหน้าที่ออกแบบ UX/UI ทำให้เว็บไซต์เป็นที่จดจำ​​ ใช้ง่าย โดนใจผู้ใช้งาน',
    questions: getExampleQuestions(designQuestions),
  },
  {
    branch: 'mk',
    title: 'The Marketer: นักพยากรณ์',
    description:
      'ผู้ทำนายอนาคต เหมาะสำหรับคนที่ชอบวางแผนอนาคต กำหนดโชคชะตา ทำหน้าที่วางกลยุทธ์เพื่อสร้างรายได้ให้กับเว็บไซต์ และทำให้ตอบสนองต่อผู้ใช้งาน',
    questions: getExampleQuestions(marketingQuestions),
  },
  {
    branch: 'pg',
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
  const [branch, setBranch] = useState<Branch | null>(null)
  const onClose = () => setBranch(null)
  return (
    <Section className="text-center -mx-5 w-[calc(100%+40px)] sm:px-4 py-4" noPadding>
      <h2 className="text-3xl font-heading lg:text-4xl mb-16 font-semibold">
        เลือกสาขาที่ต้องการสมัคร
      </h2>
      <div
        className={clsx(
          'flex flex-row overflow-x-scroll sm:overflow-x-visible gap-8 font-heading font-bold text-3xl text-white',
          '-mt-6 pt-6 sm:px-9 snap-x',
          styles.branchesGrid
        )}
      >
        <div className="sm:hidden" style={{ minWidth: 'calc(100vw / 2 - 146.5px)' }} />
        {(['ct', 'ds', 'mk', 'pg'] as const).map((b) => (
          <div
            key={b}
            onClick={() => setBranch(b)}
            className={clsx(
              'min-w-[229px] min-h-[375px] sm:min-w-0 sm:min-h-0',
              'cursor-pointer aspect-card snap-center',
              'hover:-translate-y-3 hover:scale-105',
              'transition-transform ease-out duration-500',
              branch != null && 'pointer-events-none'
            )}
          >
            <img alt={nameMap[b]} src={imageUrl(b)} />
          </div>
        ))}
        <div className="sm:hidden" style={{ minWidth: 'calc(100vw / 2 - 146.5px)' }} />
        {branchesDescription.map((detail) => (
          <BranchDialog
            key={detail.branch}
            title={detail.title}
            open={branch === detail.branch}
            description={detail.description}
            questions={detail.questions}
            count={statData ? statData[getStatname(detail.branch as Branch)] : 0}
            onClose={onClose}
          />
        ))}
      </div>
    </Section>
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
