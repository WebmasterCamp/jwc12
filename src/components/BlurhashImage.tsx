/* eslint-disable jsx-a11y/alt-text */
import { ImgHTMLAttributes, useState } from 'react'

import clsx from 'clsx'

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
        <Image key={src} src={src} {...rest} />
      </div>
    </div>
  )
}

function Image(props: ImgHTMLAttributes<HTMLImageElement>) {
  const [show, setShow] = useState(false)
  return (
    <img
      className={clsx('absolute inset-0 w-full h-full object-cover', !show && 'opacity-0')}
      onLoad={() => setShow(true)}
      {...props}
    />
  )
}
