import { useEffect, useRef } from 'react'

import { decode } from 'blurhash'

export interface BlurhashProps {
  blurhash: string
  className?: string
}

export function Blurhash({ blurhash, className }: BlurhashProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current!!
    const width = canvas.width
    const height = canvas.height
    const pixels = decode(blurhash, width, height)
    const ctx = canvasRef.current?.getContext('2d')!!
    const imageData = ctx.createImageData(width, height)
    imageData.data.set(pixels)
    ctx.putImageData(imageData, 0, 0)
  }, [blurhash])

  return <canvas ref={canvasRef} className={className} />
}
