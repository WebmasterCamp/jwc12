import { useState } from 'react'

import { Dialog } from '@headlessui/react'
import CrossIcon from '@iconify/icons-akar-icons/cross'
import { Icon } from '@iconify/react'
import clsx from 'clsx'

import { BranchDialog } from './BranchDialog'
import styles from './BranchesSection.module.css'
import { Section } from './Section'

type Branch = 'pg' | 'mk' | 'ds' | 'ct'

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

export const BranchesSection: React.FunctionComponent = () => {
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
        <div onClick={() => setBranch('ct')} className="bg-ct p-8 cursor-pointer aspect-card">
          The Content Creator: นักกวี
        </div>
        <div onClick={() => setBranch('ds')} className="bg-ds p-8 cursor-pointer aspect-card">
          The Designer: จิตรกร
        </div>
        <div onClick={() => setBranch('mk')} className="bg-mk p-8 cursor-pointer aspect-card">
          The Marketer: นักพยากรณ์
        </div>
        <div onClick={() => setBranch('pg')} className="bg-pg p-8 cursor-pointer aspect-card">
          The Programmer: จอมเวท
        </div>
        {branchesDescription.map((detail) => (
          <BranchDialog
            key={detail.branch}
            title={detail.title}
            open={branch === detail.branch}
            description={detail.description}
            onClose={onClose}
          />
        ))}
      </div>
    </Section>
  )
}
