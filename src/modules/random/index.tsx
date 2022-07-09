import { useMemo, useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'

import clsx from 'clsx'
import { DocumentReference, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore'

import { Loading } from '@/components/Loading'
import { useDocument } from '@/db/hooks'
import { RandomConfigDocument } from '@/db/types'
import { app } from '@/lib/firebase'

import { cards } from './cards'
import styles from './index.module.css'

const sleep = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time)
  })
}

const db = getFirestore(app)

const randomConfigRef = doc(db, 'config', 'random') as DocumentReference<RandomConfigDocument>

export const Random = () => {
  const [url, setUrl] = useState('/images/cards/generic.png')

  const { pending, data } = useDocument(randomConfigRef)

  const config = useMemo(() => {
    if (pending) return null
    return data?.configMap?.[data?.currentOrder ?? '']
  }, [data?.configMap, data?.currentOrder, pending])

  // console.log('data', data)

  useEffect(() => {
    const interval = setInterval(() => {
      setUrl(cards[Math.floor(Math.random() * 6)].imageUrl)
      console.log(config?.duration)
    }, 100)
    const timeout = setTimeout(() => {
      clearInterval(interval)
    }, config?.duration)
    return () => clearTimeout(timeout)
  }, [config])

  if (pending) {
    return <Loading />
  }

  return (
    <>
      <div className="flex h-screen">
        <div className=" w-3/4 m-auto gap-8  p-8 flex">
          <img src={url} alt="" />
        </div>
      </div>
    </>
  )
}
