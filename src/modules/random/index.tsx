import { useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'

import clsx from 'clsx'
import { doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore'

import { app } from '@/lib/firebase'

import { cards as initialCards } from './cards'
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
        showing && styles.showing,
        'relative'
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

const db = getFirestore(app)

export const Random = () => {
  // TODO: Randomization logic
  // TODO: Change style
  // selected card during randomization
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [cards, setCards] = useState(initialCards)
  const [animationState, setAnimationState] = useState(AnimationState.Pending)

  // Time to shift to each card
  const interval = 100

  const animate = useCallback(
    (initialAnimationState?: AnimationState) => {
      // TODO: Find a better way to do this
      const aniState = initialAnimationState ? initialAnimationState : animationState
      console.log('ANIMATE')
      if (aniState === AnimationState.Pending) {
        const timesToShift = Math.floor(Math.random() * 20)
        setAnimationState(AnimationState.Animating)
        for (let i = 0; i < timesToShift; i++) {
          setTimeout(() => {
            // Go through all cards
            setSelectedIndex((index) => (index + 1) % cards.length)
            if (i === timesToShift - 1) {
              // Last one
              setAnimationState(AnimationState.Finish)
              setDoc(doc(db, 'config', 'random'), { trigger: false }, { merge: true })
              setTimeout(() => animate(AnimationState.Finish), 5000)
              // Prepare to show the result
            }
          }, i * interval)
        }
      } else if (aniState === AnimationState.Finish) {
        // Remove the card and set the index to -1
        // Note: Use something else for key
        // TODO: Use array
        setCards((oldCards) => [
          ...oldCards.slice(0, selectedIndex),
          ...oldCards.slice(selectedIndex + 1),
        ])
        setSelectedIndex(-1)
        setAnimationState(AnimationState.Pending)
      } else {
        // Animating
        // Illegal
        setAnimationState(AnimationState.Pending)
      }
    },
    [animationState, cards.length, selectedIndex]
  )

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'config', 'random'), (doc) => {
      const animationConfig = doc.data()
      // Some weird error
      if (animationConfig == undefined) throw Error()
      // Not trigger
      console.log(animationConfig.trigger)
      if (!animationConfig.trigger) return
      animate()
    })
    return unsub
  }, [animate])

  return (
    <>
      <div className="flex h-screen">
        <div className=" w-3/4 m-auto gap-8  p-8 grid grid-cols-5 grid-rows-2">
          {/* TODO: Use actual array */}
          {cards.map((x, i) => (
            <Card
              key={x.name}
              grow={i === selectedIndex}
              selected={i === selectedIndex && animationState === AnimationState.Finish}
            />
          ))}
        </div>
      </div>
      {animationState === AnimationState.Finish && (
        <div className="absolute overflow-hidden flex inset-0 bg-black/75">
          <div className={clsx('m-auto w-1/4 relative')}>
            <div className={styles.showing}>
              <Card grow={true} />
            </div>
            <div className="w-full top-0 absolute">
              <img
                src={
                  selectedIndex != -1 ? cards[selectedIndex].imageUrl : '/images/cards/generic.png'
                }
                alt=""
                className={clsx('top-0 z-[999]', styles.showingBack)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
