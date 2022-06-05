import { CSSProperties, useEffect, useRef, useState } from 'react'

import clsx from 'clsx'

import styles from './ScheduleSection.module.css'
import { Section } from './Section'

// Code from https://thewebdev.info/2021/09/12/how-to-draw-a-line-between-two-divs-with-javascript/
const getOffset = (el: HTMLElement) => {
  const rect = el.getBoundingClientRect()
  return {
    left: rect.left + window.pageXOffset,
    top: rect.top + window.pageYOffset,
    width: rect.width || el.offsetWidth,
    height: rect.height || el.offsetHeight,
  }
}

const px = (n: number) => `${n}px`

interface ConnectProps {
  div1: HTMLElement | null
  div2: HTMLElement | null
  color: string
  thickness: number
}

const Connect: React.FunctionComponent<ConnectProps> = ({ div1, div2, color, thickness }) => {
  if (div1 === null || div2 === null) return <></>
  const off1 = getOffset(div1)
  const off2 = getOffset(div2)

  const x1 = off1.left + off1.width
  const y1 = off1.top + off1.height

  const x2 = off2.left + off2.width
  const y2 = off2.top

  const length = Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))

  const cx = (x1 + x2) / 2 - length / 2
  const cy = (y1 + y2) / 2 - thickness / 2

  const angle = Math.atan2(y1 - y2, x1 - x2) * (180 / Math.PI)

  const styles = {
    padding: 0,
    margin: 0,
    position: 'absolute',
    height: px(thickness),
    left: px(cx),
    top: px(cy),
    width: px(length),
    transform: `rotate(${angle})`,
  } as CSSProperties
  return <div style={styles}></div>
}

const schedules = [
  {
    title: 'รับสมัคร',
    date: '8 - 24 มิถุนายน',
    imageUrl: '/images/รับสมัคร.png',
  },
  {
    title: 'ประกาศผลผู้มีสิทธิ์สัมภาษณ์',
    date: ' 26 มิถุนายน',
    imageUrl: '/images/2-ประกาศรอบ1.png',
  },
  {
    title: 'สัมภาษณ์ออนไลน์',
    date: '28 มิถุนายน',
    imageUrl: '/images/3-สัมออนไลน์2.png',
  },
  {
    title: 'ประกาศผลผู้ผ่านการคัดเลือก',
    date: '29 มิถุนายน',
    imageUrl: '/images/4-ประกาศรอบ2.png',
  },
  {
    title: 'ยืนยันสิทธิ์',
    date: '29 - 30 มิถุนายน',
    imageUrl: '/images/5-ยืนยันสิทธิ์.png',
  },
  {
    title: 'วันค่าย',
    date: '8 - 10 กรกฎาคม',
    imageUrl: '/images/6-วันค่าย.png',
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
          'flex flex-col lg:flex-row gap-8 lg:justify-evenly w-full mx-auto',
          styles.scheduleGrid
        )}
      >
        {schedules.map((task) => {
          return (
            <div key={task.title} className="flex flex-col items-center p-4">
              <picture className="rounded-full bg-primary p-0">
                <img src={task.imageUrl} alt={task.title} />
              </picture>
              <h3 className="font-heading font-bold text-2xl text-gold">{task.title}</h3>
              <p>{task.date}</p>
            </div>
          )
        })}
      </div>
      {/* {schedulesState.length == 2 && (
        <Connect div1={schedulesState[0]} div2={schedulesState[1]} thickness={2} color="white" />
      )} */}
    </Section>
  )
}
