export function extractBlurhash(name: string | undefined) {
  const query = name?.split('?')?.[1] ?? ''
  const params = Object.fromEntries(new URLSearchParams(query).entries())
  if (params.blurhash) {
    return params.blurhash as string
  }
  return null
}
