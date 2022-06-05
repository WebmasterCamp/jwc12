import clsx from 'clsx'

import styles from './BranchesSection.module.css'
import { Section } from './Section'

export const BranchesSection: React.FunctionComponent = () => {
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
        <div className="bg-ct p-8 cursor-pointer aspect-card">The Content Creator: นักกวี</div>
        <div className="bg-ds p-8 cursor-pointer aspect-card">The Designer: จิตรกร</div>
        <div className="bg-mk p-8 cursor-pointer aspect-card">The Marketer: นักพยากรณ์</div>
        <div className="bg-pg p-8 cursor-pointer aspect-card">The Programmer: จอมเวท</div>
      </div>
    </Section>
  )
}
