export type MediaType =
  | 'text'
  | 'image'
  | 'audio'
  | 'video'
  | '3d'
  | 'document'
  | 'data'
  | 'meta'

export type Lossiness =
  | 'lossless'
  | 'lossy'
  | 'destructive'   // damages the original beyond reason
  | 'creative'      // produces something not the input
  | 'undefined'     // not defined. not definable.

export type Status =
  | 'spec'          // only described
  | 'algorithm'     // detailed enough to implement
  | 'interactive'   // runs in the browser

export type FormatStats = {
  downloads?: string
  stars?: string
  complaints?: string
  lawsuits?: string
  forks?: string
  uptime?: string
  cited_by?: string
}

export type CompressionFormat = {
  id: string                 // kebab-case
  name: string               // display
  blurb: string              // a fragment, not a punchline
  mediaType: MediaType
  tags: string[]
  spec: string               // terse, weird, no twist endings
  ratio: string              // free-form string
  lossiness: Lossiness
  status: Status
  stats?: FormatStats
  yearProposed?: string
  by?: string
  /** id of an interactive component registered in interactive.tsx */
  interactiveId?: string
}
