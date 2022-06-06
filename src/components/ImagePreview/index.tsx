import useSWR from 'swr'

import { LoadingAnimation } from '@/components/Loading'
import { downloadImage } from '@/db'

export interface ImagePreviewProps {
  value: string | undefined
}

export function ImagePreview({ value }: ImagePreviewProps) {
  const { data: imageUrl, isValidating } = useSWR(value, downloadImage, {
    revalidateOnFocus: false,
  })
  return (
    <div className="w-full p-2">
      {isValidating ? (
        <div className="w-48 h-48 bg-gray-100 rounded-md flex items-center justify-center">
          <LoadingAnimation className="w-[148px] h-[148px]" />
        </div>
      ) : (
        <img className="h-48 rounded-md object-contain" src={imageUrl} alt="" />
      )}
    </div>
  )
}
