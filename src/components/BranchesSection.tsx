import { useState } from 'react'

import { Dialog } from '@headlessui/react'
import CrossIcon from '@iconify/icons-akar-icons/cross'
import { Icon } from '@iconify/react'
import clsx from 'clsx'

import { RegistrationStats } from '@/db/types'

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
const branchesDescription: Array<{ branch: Branch; title: string; description: string }> = [
  {
    branch: 'ct',
    title: 'The Content Creator: นักกวี',
    description:
      'ผู้บอกเล่าเรื่องราวของอนาคต เหมาะสำหรับคนที่ชอบถ่ายทอดเรื่องราว ทำหน้าที่ใช้ความคิดสร้างสรรค์เนื้อหาบนเว็บไซต์ให้ออกมาน่าสนใจและสื่อออกไปได้ตรงเป้า',
  },
  {
    branch: 'ds',
    title: 'The Designer: จิตรกร',
    description:
      'ผู้แต่งแต้มอนาคต เหมาะสำหรับคนที่ชอบจินตนาการ สร้างสรรค์สิ่งสวยงาม ทำหน้าที่ออกแบบ UX/UI ทำให้เว็บไซต์เป็นที่จดจำ​​ ใช้ง่าย โดนใจผู้ใช้งาน',
  },
  {
    branch: 'mk',
    title: 'The Marketer: นักพยากรณ์',
    description:
      'ผู้ทำนายอนาคต เหมาะสำหรับคนที่ชอบวางแผนอนาคต กำหนดโชคชะตา ทำหน้าที่วางกลยุทธ์เพื่อสร้างรายได้ให้กับเว็บไซต์ และทำให้ตอบสนองต่อผู้ใช้งาน',
  },
  {
    branch: 'pg',
    title: ' The Programmer: จอมเวท',
    description:
      'ผู้สรรค์สร้างอนาคต เหมาะสำหรับคนที่ชอบเรียนภาษาโบราณและศาสตร์ลึกลับ ทำหน้าที่เขียนโค้ดจากภาษาคอมพิวเตอร์ไหนก็ได้ ให้ออกมาเป็นเว็บไซต์ที่ใช้งานได้',
  },
]

interface Props {
  statData: undefined | RegistrationStats
}

export const BranchesSection: React.FunctionComponent<Props> = ({ statData }) => {
  const [branch, setBranch] = useState<Branch | null>(null)
  const onClose = () => setBranch(null)
  return (
    <Section className="text-center">
      <h2 className="text-3xl font-heading lg:text-4xl mb-16 font-semibold">
        เลือกสาขาที่ต้องการสมัคร
      </h2>
      <div
        className={clsx(
          'grid grid-cols-1 lg:grid-cols-4 gap-8 font-heading font-bold text-3xl text-white',
          styles.branchesGrid
        )}
      >
        {/* TODO: Use actual cards */}
        <div
          onClick={() => setBranch('ct')}
          className={clsx('cursor-pointer aspect-card', branch != null && 'pointer-events-none')}
        >
          <img alt={nameMap['ct']} src={imageUrl('ct')} />
        </div>
        <div
          onClick={() => setBranch('ds')}
          className={clsx('cursor-pointer aspect-card', branch != null && 'pointer-events-none')}
        >
          <img alt={nameMap['ds']} src={imageUrl('ds')} />
        </div>
        <div
          onClick={() => setBranch('mk')}
          className={clsx('cursor-pointer aspect-card', branch != null && 'pointer-events-none')}
        >
          <img alt={nameMap['mk']} src={imageUrl('mk')} />
        </div>
        <div
          onClick={() => setBranch('pg')}
          className={clsx('cursor-pointer aspect-card', branch != null && 'pointer-events-none')}
        >
          <img alt={nameMap['pg']} src={imageUrl('pg')} />
        </div>
        {branchesDescription.map((detail) => (
          <BranchDialog
            key={detail.branch}
            title={detail.title}
            open={branch === detail.branch}
            description={detail.description}
            count={statData ? statData[getStatname(detail.branch)] : 0}
            onClose={onClose}
          />
        ))}
      </div>
    </Section>
  )
}