import { useEffect, useRef, useState } from 'react'

export function useBlobUrl(blob: Blob | undefined): string | undefined {
  const [url, setUrl] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (typeof blob === 'undefined') return
    const currentUrl = URL.createObjectURL(blob)
    setUrl(currentUrl)
    return () => {
      URL.revokeObjectURL(currentUrl)
      setUrl(undefined)
    }
  }, [blob])

  return url
}
