import { useMemo, useState } from 'react'
import { useEffect } from 'react'
import { useCallback } from 'react'

import clsx from 'clsx'
import { DocumentReference, doc, getFirestore, onSnapshot, setDoc } from 'firebase/firestore'

import { Loading } from '@/components/Loading'
import { useDocument } from '@/db/hooks'
import { RandomConfigDocument } from '@/db/types'
import { app } from '@/lib/firebase'

import { CARD_PATH_MAPPER } from './cards'
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
  const [finish, setFinish] = useState(false)

  const { pending, data } = useDocument(randomConfigRef)

  const config = useMemo(() => {
    if (pending) return null
    return data?.configMap?.[data?.currentOrder ?? 0]
  }, [data?.configMap, data?.currentOrder, pending])

  // console.log('data', data)

  useEffect(() => {
    const interval = setInterval(() => {
      setUrl(CARD_PATH_MAPPER[Math.floor(Math.random() * 7) as CARD_PATH_MAPPER])
      console.log(config?.duration)
      setFinish(false)
    }, 200)
    const timeout = setTimeout(() => {
      clearInterval(interval)
      setUrl(CARD_PATH_MAPPER[(config?.team ?? 0) as CARD_PATH_MAPPER])
      setFinish(true)
    }, config?.duration ?? 2000)
    return () => {
      clearTimeout(timeout)
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.currentOrder])

  if (pending) {
    return <Loading />
  }

  return (
    <div className={styles.container}>
      <div className="flex justify-center items-center flex-col min-h-screen w-full gap-y-12">
        <h1 className="text-white font-heading text-3xl">บ้านต่อไปคืออ...</h1>
        <div className="w-[20vw]">
          <img src={url} alt="" className={clsx('w-full', finish && styles.showing)} />
        </div>
      </div>
    </div>
  )
}
