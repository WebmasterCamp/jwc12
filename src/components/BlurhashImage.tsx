import { ImgHTMLAttributes } from 'react'

import { Blurhash } from './Blurhash'

export type BlurhashImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  blurhash: string | null
}

export function BlurhashImage({ blurhash, className, src, ...rest }: BlurhashImageProps) {
  return (
    <div className={className}>
      <div className="relative w-full h-full">
        {blurhash && (
          <Blurhash className="absolute top-0 left-0 w-full h-full" blurhash={blurhash} />
        )}
        {/* eslint-disable-next-line jsx-a11y/alt-text */}
        {src && <img className="absolute inset-0 w-full h-full object-cover" src={src} {...rest} />}
      </div>
    </div>
  )
}
