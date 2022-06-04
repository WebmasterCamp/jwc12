import { useEffect } from 'react'

import { useRouter } from 'next/router'

export interface RedirectProps {
  to: string
  replace?: boolean
  shallow?: boolean
  scroll?: boolean
}

export function Redirect({ to, replace = false, shallow, scroll }: RedirectProps) {
  const router = useRouter()
  useEffect(() => {
    if (replace) {
      router.replace(to, undefined, {
        shallow,
        scroll,
      })
    } else {
      router.push(to, undefined, {
        shallow,
        scroll,
      })
    }
  }, [router, to, replace, shallow, scroll])
  return null
}
