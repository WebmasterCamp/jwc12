import { useEffect, useState } from 'react'

export const useIsSafari = () => {
  const [isSafari, setIsSafari] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent))
    }
  }, [])

  return isSafari
}
