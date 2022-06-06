import { useMemo } from 'react'

import useSWR from 'swr'

import { LoadingAnimation } from '@/components/Loading'
import { downloadImage } from '@/db'
import { extractBlurhash } from '@/utils/extractBlurhash'

import { Blurhash } from '../Blurhash'

export interface ImagePreviewProps {
  value: string | undefined
  className?: string
}

const loading = (
  <div className="w-48 h-48 bg-gray-100 rounded-md flex items-center justify-center">
    <LoadingAnimation className="w-[148px] h-[148px]" />
  </div>
)

export function ImagePreview({ value, className }: ImagePreviewProps) {
  const { data: imageUrl, isValidating } = useSWR(value, downloadImage, {
    revalidateOnFocus: false,
  })
  const blurhash = useMemo(() => extractBlurhash(value), [value])
  const loadingContent = blurhash ? (
    <Blurhash className="w-48 h-48 rounded-md" blurhash={blurhash} />
  ) : (
    loading
  )
  return (
    <div className={className}>
      {isValidating ? (
        loadingContent
      ) : (
        <img className="w-48 h-48 rounded-md object-cover" src={imageUrl} alt="" />
      )}
    </div>
  )
}
