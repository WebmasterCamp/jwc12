import { useEffect, useState } from 'react'

export function useScrollY() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const listener = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', listener)
    return () => window.removeEventListener('scroll', listener)
  }, [])
  return scrollY
}
