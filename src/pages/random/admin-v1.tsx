import { useEffect, useMemo } from 'react'

import { getDoc, updateDoc } from 'firebase/firestore'

import { withAuth } from '@/auth/withAuth'
import { Button } from '@/components/Button'
import { randomConfigRef } from '@/db'
import { useDocument } from '@/db/hooks'
import { RandomConfigDocument } from '@/db/types'

const RANDOM_CONIG: Omit<RandomConfigDocument, 'currentOrder'> = {
  configMap: {
    1: { team: 1, duration: 3000 },
    2: { team: 2, duration: 3000 },
    3: { team: 3, duration: 3000 },
    4: { team: 4, duration: 3000 },
    5: { team: 10, duration: 3000 },
    6: { team: 6, duration: 3000 },
    7: { team: 7, duration: 3000 },
  },
}

function RandomAdminPage() {
  const { data, pending } = useDocument(randomConfigRef)

  const configMap: RandomConfigDocument['configMap'] = useMemo(() => {
    return data?.configMap ?? {}
  }, [data?.configMap])

  useEffect(() => {
    const initializeFetcher = async () => {
      const doc = await getDoc(randomConfigRef)
      if (doc.data()?.configMap) return
      updateDoc(randomConfigRef, RANDOM_CONIG)
    }
    initializeFetcher()
  }, [])

  const handleClickNext = () => {
    const nextOrder = (data?.currentOrder ?? 0) + 1
    updateDoc(randomConfigRef, {
      currentOrder: nextOrder,
    })
  }

  const handleClickPrev = () => {
    const prevOrder = (data?.currentOrder ?? 0) - 1
    updateDoc(randomConfigRef, {
      currentOrder: prevOrder < 0 ? 0 : prevOrder,
    })
  }

  if (pending) {
    return <p>Loading...</p>
  }

  return (
    <div className="h-full w-full min-h-screen flex justify-center">
      <div className="h-full w-full max-w-lg flex flex-col justify-center items-center m-auto gap-4 bg-white rounded-md p-4">
        <h1 className="text-2xl font-primary">Index</h1>
        <h1 className="text-3xl font-primary font-bold">{data?.currentOrder ?? 'unset'}</h1>
        <h1 className="text-2xl font-primary">Selected Number</h1>
        <h1 className="text-3xl font-primary font-bold">
          {configMap?.[data?.currentOrder ?? 0]?.team ?? 'unset'}
        </h1>
        <h1 className="text-2xl font-primary">Random Duration</h1>
        <h1 className="text-3xl font-primary font-bold">
          {configMap?.[data?.currentOrder ?? 0]?.duration ?? 'unset'}
        </h1>
        <div className="w-full flex flex-row gap-4">
          <Button className="w-full" variant="outlined" onClick={handleClickPrev}>
            Prev
          </Button>
          <Button className="w-full" onClick={handleClickNext}>
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

export default withAuth(RandomAdminPage)
