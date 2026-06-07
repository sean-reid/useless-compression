import { SEED_FORMATS } from './seed'
import generatedJson from './generated.json'
import type { CompressionFormat, MediaType, Status } from './types'

export type { CompressionFormat, MediaType, Status } from './types'

const GENERATED_FORMATS = generatedJson as CompressionFormat[]

// platinum first so curated voice wins on any name/id collision (dedup again
// at runtime, cheap)
function dedupe(list: CompressionFormat[]): CompressionFormat[] {
  const seenIds = new Set<string>()
  const seenNames = new Set<string>()
  const out: CompressionFormat[] = []
  for (const f of list) {
    const idKey = f.id
    const nameKey = f.name.trim().toLowerCase()
    if (seenIds.has(idKey) || seenNames.has(nameKey)) continue
    seenIds.add(idKey)
    seenNames.add(nameKey)
    out.push(f)
  }
  return out
}

export const FORMATS: CompressionFormat[] = dedupe([...SEED_FORMATS, ...GENERATED_FORMATS])

export const FORMAT_BY_ID: Record<string, CompressionFormat> =
  Object.fromEntries(FORMATS.map((f) => [f.id, f]))

export const MEDIA_TYPES: MediaType[] = ['text', 'image', 'audio', 'video', '3d', 'document', 'data', 'meta']
export const STATUSES: Status[] = ['spec', 'algorithm', 'interactive']

export const COUNT_BY_MEDIA: Record<MediaType, number> = MEDIA_TYPES.reduce((acc, m) => {
  acc[m] = FORMATS.filter((f) => f.mediaType === m).length
  return acc
}, {} as Record<MediaType, number>)
