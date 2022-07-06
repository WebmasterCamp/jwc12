import { useState } from 'react'

import clsx from 'clsx'

import styles from './index.module.css'

const Card = ({ grow = false }) => {
  return (
    <div className={clsx(grow && styles.grow)}>
      <img src="/images/cards/generic.png" className="w-full" alt="" />
    </div>
  )
}

export const Random = () => {
  // TODO: Randomization logic
  // TODO: Change style
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [remainingCards, setRemainingCards] = useState(10)

  const randomize = () => {
    // TODO: Find a better way to do this
    const timesToShift = Math.floor(Math.random() * 20)
    for (let i = 0; i < timesToShift; i++) {
      setTimeout(() => {
        setSelectedIndex((index) => (index + 1) % 10)
      }, i * 500)
    }
  }
  return (
    <div onClick={randomize} className="flex h-screen">
      <div className=" w-3/4 m-auto gap-8  p-8 grid grid-cols-5 grid-rows-2">
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <Card key={i} grow={i === selectedIndex} />
          ))}
      </div>
    </div>
  )
}
