import { useMemo } from 'react'

import useSWR from 'swr'

import { LoadingAnimation } from '@/components/Loading'
import { downloadImage } from '@/db'
import { extractBlurhash } from '@/utils/extractBlurhash'
import { useBlobUrl } from '@/utils/useBlobUrl'

import { BlurhashImage } from '../BlurhashImage'

export interface ImagePreviewProps {
  value: string | undefined
  className?: string
}

export function ImagePreview({ value, className }: ImagePreviewProps) {
  const { data: imageUrl, isValidating } = useSWR(value, downloadImage, {
    revalidateOnFocus: false,
  })
  const blurhash = useMemo(() => extractBlurhash(value), [value])
  return (
    <div className={className}>
      <div className="relative w-48 h-48">
        {isValidating && !blurhash && (
          <div className="w-48 h-48 bg-gray-100 rounded-md flex items-center justify-center">
            <LoadingAnimation className="w-[148px] h-[148px]" />
          </div>
        )}
        <BlurhashImage
          className="w-48 h-48 rounded-md overflow-hidden"
          src={imageUrl}
          blurhash={blurhash}
          alt=""
        />
      </div>
    </div>
  )
}
