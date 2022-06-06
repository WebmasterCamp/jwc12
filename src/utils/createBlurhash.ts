import { encode } from 'blurhash'

export async function createBlurhash(file: File) {
  const url = URL.createObjectURL(file)
  try {
    const imageData = await getImageData(url)
    const hash = encode(imageData.data, imageData.width, imageData.height, 4, 4)
    return hash
  } finally {
    URL.revokeObjectURL(url)
  }
}

async function getImageData(url: string): Promise<ImageData> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = url
    image.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')!!
      ctx.drawImage(image, 0, 0, 64, (64 * image.height) / image.width)
      resolve(ctx.getImageData(0, 0, 64, 64))
    }
    image.onerror = (e) => {
      reject(e)
    }
  })
}
