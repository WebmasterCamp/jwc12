import { useState } from 'react'

import clsx from 'clsx'

import styles from './index.module.css'

interface CardProps {
  grow: boolean
  displaying?: boolean
  key?: any
  selected?: boolean
  showing?: boolean
}

const Card = ({
  grow = false,
  displaying = false,
  selected = false,
  showing = false,
}: CardProps) => {
  return (
    <div
      className={clsx(
        grow && styles.grow,
        displaying && 'border-8',
        selected && 'animate-spin',
        showing && styles.showing
      )}
    >
      <img src="/images/cards/generic.png" className="w-full" alt="" />
    </div>
  )
}

const enum AnimationState {
  Pending = 0,
  Animating = 1,
  Finish = 2,
}

export const Random = () => {
  // TODO: Randomization logic
  // TODO: Change style
  // selected card during randomization
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [animationState, setAnimationState] = useState(AnimationState.Pending)
  const [remainingCards, setRemainingCards] = useState(10)
  // Time to shift to each card
  const interval = 500

  const randomize = () => {
    // TODO: Find a better way to do this
    if (animationState === AnimationState.Pending) {
      const timesToShift = Math.floor(Math.random() * 20)
      setAnimationState(AnimationState.Animating)
      for (let i = 0; i < timesToShift; i++) {
        setTimeout(() => {
          // Go through all cards
          setSelectedIndex((index) => (index + 1) % remainingCards)
          if (i === timesToShift - 1) {
            // Last one
            setAnimationState(AnimationState.Finish)
            // Prepare to show the result
          }
        }, i * interval)
      }
    } else if (animationState === AnimationState.Finish) {
      // Remove the card and set the index to -1
      // Note: Use something else for key
      // TODO: Use array
      setRemainingCards((x) => x - 1)
      setSelectedIndex(-1)
      setAnimationState(AnimationState.Pending)
    }
  }

  return (
    <>
      <div onClick={randomize} className="flex h-screen">
        <div className=" w-3/4 m-auto gap-8  p-8 grid grid-cols-5 grid-rows-2">
          {/* TODO: Use actual array */}
          {Array(remainingCards)
            .fill(0)
            .map((_, i) => (
              <Card
                key={i}
                grow={i === selectedIndex}
                selected={i === selectedIndex && animationState === AnimationState.Finish}
              />
            ))}
        </div>
      </div>
      {animationState === AnimationState.Finish && (
        <div onClick={randomize} className="absolute flex inset-0 bg-black/75">
          <div className="m-auto w-1/4">
            <Card grow={true} showing={true} />
          </div>
        </div>
      )}
    </>
  )
}
