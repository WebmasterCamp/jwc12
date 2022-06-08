import { CSSProperties, useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import styles from './ScheduleSection.module.css'
import { Section } from './Section'

const schedules = [
  {
    title: 'รับสมัคร',
    date: '8 - 24 มิถุนายน',
    imageUrl: '/images/รับสมัคร.svg',
    beginDate: new Date(Date.UTC(2022, 5, 8, -7, 0, 0)),
    endDate: new Date(Date.UTC(2022, 5, 24, 23 - 7, 59, 59)),
  },
  {
    title: 'ประกาศผล\nผู้มีสิทธิ์สัมภาษณ์',
    date: '26 มิถุนายน',
    imageUrl: '/images/2-ประกาศรอบ1.svg',
    beginDate: new Date(Date.UTC(2022, 5, 26, -7, 0, 0)),
    endDate: new Date(Date.UTC(2022, 5, 26, 23 - 7, 59, 59)),
  },
  {
    title: 'สัมภาษณ์ออนไลน์',
    date: '28 มิถุนายน',
    imageUrl: '/images/3-สัมออนไลน์.svg',
    beginDate: new Date(Date.UTC(2022, 5, 28, -7, 0, 0)),
    endDate: new Date(Date.UTC(2022, 5, 28, 23 - 7, 59, 59)),
  },
  {
    title: 'ประกาศผล\nผู้ผ่านการคัดเลือก',
    date: '29 มิถุนายน',
    imageUrl: '/images/4-ประกาศรอบ2.svg',
  },
  {
    title: 'ยืนยันสิทธิ์',
    date: '29 - 30 มิถุนายน',
    imageUrl: '/images/5-ยืนยันสิทธิ์.svg',
    beginDate: new Date(Date.UTC(2022, 5, 29, -7, 0, 0)),
    endDate: new Date(Date.UTC(2022, 5, 30, 23 - 7, 59, 59)),
  },
  {
    title: 'วันค่าย',
    date: '8 - 10 กรกฎาคม',
    imageUrl: '/images/6-วันค่าย.svg',
    beginDate: new Date(Date.UTC(2022, 6, 8, -7, 0, 0)),
    endDate: new Date(Date.UTC(2022, 5, 10, 23 - 7, 59, 59)),
  },
]

export const ScheduleSection: React.FunctionComponent = () => {
  const [viewMore, setViewMore] = useState(false)
  const text = viewMore ? 'ดูน้อยลง' : 'ดูเพิ่มเติม'
  const toggleViewMore = () => setViewMore((vm) => !vm)
  return (
    <Section className="text-center">
      <h2 id="schedule" className="text-3xl font-heading lg:text-4xl mb-16 font-semibold">
        กำหนดการ
      </h2>
      <div
        className={clsx(
          'flex flex-col lg:grid lg:grid-cols-6 gap-x-0 lg:gap-x-4 xl:gap-x-0 gap-y-8 lg:justify-evenly w-full mx-auto',
          styles.scheduleGrid
        )}
      >
        {schedules.map((task, i) => {
          const active =
            task.beginDate &&
            task.endDate &&
            task.beginDate < new Date() &&
            task.endDate > new Date()
          return (
            <div
              key={task.title}
              className={clsx(
                'flex lg:flex flex-col items-center',
                i >= 3 && !viewMore && 'hidden'
              )}
            >
              <picture className={clsx('mb-4 p-4', active && 'rounded-full bg-black/40')}>
                <img src={task.imageUrl} alt={task.title} />
              </picture>
              <h3 className="font-heading whitespace-pre-line font-bold text-xl text-gold">
                {task.title}
              </h3>
              <p>{task.date}</p>
            </div>
          )
        })}
        <a onClick={toggleViewMore} className="lg:hidden text-gold cursor-pointer underline">
          {text}
        </a>
      </div>
    </Section>
  )
}
