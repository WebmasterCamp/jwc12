import { isBlurhashValid } from 'blurhash'

export function extractBlurhash(name: string | undefined) {
  const query = name?.split('?')?.[1] ?? ''
  const { blurhash } = Object.fromEntries(new URLSearchParams(query).entries())
  if (isBlurhashValid(blurhash)) {
    return blurhash
  }
  return null
}
