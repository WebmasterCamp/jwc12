import { CSSProperties, useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import styles from './ScheduleSection.module.css'
import { Section } from './Section'

const schedules = [
  {
    title: 'รับสมัคร',
    date: '8 - 24 มิถุนายน',
    imageUrl: '/images/รับสมัคร.svg',
  },
  {
    title: 'ประกาศผล\nผู้มีสิทธิ์สัมภาษณ์',
    date: ' 26 มิถุนายน',
    imageUrl: '/images/2-ประกาศรอบ1.svg',
  },
  {
    title: 'สัมภาษณ์ออนไลน์',
    date: '28 มิถุนายน',
    imageUrl: '/images/3-สัมออนไลน์.svg',
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
  },
  {
    title: 'วันค่าย',
    date: '8 - 10 กรกฎาคม',
    imageUrl: '/images/6-วันค่าย.svg',
  },
]

export const ScheduleSection: React.FunctionComponent = () => {
  //   const schedulesRef = useRef<(HTMLDivElement | null)[]>([null, null])
  //   const [schedulesState, setSchedulesState] = useState<(HTMLDivElement | null)[]>([null, null])
  // TODO: Draw connecting lines
  //   useEffect(() => {
  //     setSchedulesState((_) => schedulesRef.current)
  //     console.log('update')
  //   }, [schedulesRef])
  return (
    <Section className="text-center">
      <h2 id="schedule" className="text-3xl font-heading lg:text-4xl mb-16 font-semibold">
        กำหนดการ
      </h2>
      <div
        className={clsx(
          'flex flex-col lg:grid lg:grid-cols-6 gap-x-0 gap-y-8 lg:justify-evenly w-full mx-auto',
          styles.scheduleGrid
        )}
      >
        {schedules.map((task) => {
          return (
            <div key={task.title} className="flex flex-col items-center">
              <picture className="rounded-full bg-black/40 p-4 mb-4">
                <img src={task.imageUrl} alt={task.title} />
              </picture>
              <h3 className="font-heading whitespace-pre-line font-bold text-xl text-gold">
                {task.title}
              </h3>
              <p>{task.date}</p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}
