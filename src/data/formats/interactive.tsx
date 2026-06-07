import BCompressor from '@/components/BCompressor'
import TextTransform from '@/components/interactive/TextTransform'
import ImageTransform from '@/components/interactive/ImageTransform'
import VideoTransform from '@/components/interactive/VideoTransform'

// ─── helpers ────────────────────────────────────────────────────────────────

function splitSentences(s: string): string[] {
  return s.split(/(?<=[.!?…])\s+/).filter(Boolean)
}

// ─── TEXT transforms ────────────────────────────────────────────────────────

const yell = (s: string) => s.replace(/[a-z]/g, '')
const whisper = (s: string) => s.replace(/[A-Z]/g, '')
const tldrLast = (s: string) =>
  splitSentences(s).map((sent) => sent.trim().split(/\s+/).pop() || '').join(' ')
const tldrFirst = (s: string) =>
  splitSentences(s).map((sent) => sent.trim().split(/\s+/)[0] || '').join(' ')
const monoTone = (s: string) => s.replace(/[A-Za-z]+/g, 'one')
const anagram = (s: string) =>
  s.replace(/[A-Za-z]+/g, (w) => w.split('').sort().join(''))
const commaMax = (s: string) => s.split(/\s+/).join(', ')
const noCommas = (s: string) => s.replace(/,/g, '')
const noPeriods = (s: string) => s.replace(/[.]/g, '')
const noEmDashes = (s: string) => s.replace(/[—–]/g, '')
const allQuestions = (s: string) => s.replace(/[.!]/g, '?')
const allStatements = (s: string) => s.replace(/\?/g, '.')
const reverseWords = (s: string) =>
  s.split(/(\s+)/).map((tok) => /\s/.test(tok) || tok.toLowerCase() === 'the' ? tok : tok.split('').reverse().join('')).join('')
const reverseSentences = (s: string) => splitSentences(s).reverse().join(' ')
const firstLetterOnly = (s: string) =>
  s.replace(/\b\w/g, (m) => m).replace(/\b(\w)\w*/g, '$1')
const middleLetterOnly = (s: string) =>
  s.replace(/\b(\w+)\b/g, (w) => w[Math.floor((w.length - 1) / 2)] || '')
const justifiedTooMuch = (s: string) =>
  s.split(/\s+/).join(' '.repeat(40))
const semicolonOnly = (s: string) => s.replace(/[.!?,:]/g, ';')
const vowelectomy = (s: string) => s.replace(/[aeiouAEIOU]/g, '')
const onlyTheGreg = (s: string) => {
  const words = s.split(/\s+/).filter((w) => w.toLowerCase() === 'greg')
  return words.length ? words.join(' ') : 'greg'
}
const onlyTheArticles = (s: string) =>
  s.split(/\s+/).filter((w) => /^(a|an|the)$/i.test(w)).join(' ')
const onlyArticles = onlyTheArticles
const onlyPrepositions = (s: string) => {
  const preps = new Set(['of', 'in', 'on', 'at', 'by', 'for', 'with', 'about', 'against', 'between', 'into', 'through', 'during', 'before', 'after', 'to', 'from', 'up', 'down', 'over', 'under', 'around', 'near', 'off'])
  return s.split(/\s+/).filter((w) => preps.has(w.toLowerCase())).join(' ')
}
const secondPerson = (s: string) =>
  splitSentences(s).map((sent) => 'you ' + sent.trim().replace(/^[A-Z]/, (m) => m.toLowerCase())).join(' ')
const loudSpace = (s: string) =>
  s.toLowerCase().split('').map((c) => c === ' ' ? ' ' : c).join('') // visual: text is lowercase, spaces remain. user is told the spaces are louder.
const regexAlgo = () => '.*'
const sentenceShuffle = (s: string) => {
  const arr = [...splitSentences(s)]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j]!, arr[i]!]
  }
  return arr.join(' ')
}
const wordShuffle = (s: string) =>
  splitSentences(s).map((sent) => {
    const words = sent.trim().split(/\s+/)
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[words[i], words[j]] = [words[j]!, words[i]!]
    }
    return words.join(' ')
  }).join(' ')
const letterShuffle = (s: string) =>
  s.replace(/[A-Za-z]{2,}/g, (w) => {
    const chars = w.split('')
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[chars[i], chars[j]] = [chars[j]!, chars[i]!]
    }
    return chars.join('')
  })
const firstAndLast = (s: string) => {
  const sents = splitSentences(s)
  if (sents.length <= 2) return sents.join(' ')
  return [sents[0], sents[sents.length - 1]].join(' ')
}
const onlyTheMiddle = (s: string) => {
  let arr = [...splitSentences(s)]
  while (arr.length > 1) arr = arr.slice(1, -1).length ? arr.slice(1, -1) : arr.slice(0, 1)
  return arr.join(' ')
}

// ─── IMAGE transforms ───────────────────────────────────────────────────────

function drawTo(canvas: HTMLCanvasElement, w: number, h: number) {
  canvas.width = w
  canvas.height = h
  return canvas.getContext('2d')!
}

function averageColorTransform(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  // sample mean via a small downsample, then fill canvas with that 1 color
  const tmp = document.createElement('canvas')
  tmp.width = 32; tmp.height = 32
  const tctx = tmp.getContext('2d')!
  tctx.drawImage(img, 0, 0, 32, 32)
  const data = tctx.getImageData(0, 0, 32, 32).data
  let r = 0, g = 0, b = 0
  const n = data.length / 4
  for (let i = 0; i < data.length; i += 4) { r += data[i]!; g += data[i + 1]!; b += data[i + 2]! }
  r = Math.round(r / n); g = Math.round(g / n); b = Math.round(b / n)
  const ctx = drawTo(canvas, img.naturalWidth, img.naturalHeight)
  ctx.fillStyle = `rgb(${r},${g},${b})`
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

function nsfwBlurTransform(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const ctx = drawTo(canvas, img.naturalWidth, img.naturalHeight)
  ctx.filter = 'blur(60px)'
  ctx.drawImage(img, 0, 0)
  ctx.filter = 'none'
}

function downsampleOnly(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const ctx = drawTo(canvas, 8, 8)
  ctx.imageSmoothingEnabled = false
  ctx.drawImage(img, 0, 0, 8, 8)
}

// JPEG² — 50 round trips at quality 0.18. downsamples large inputs to a max
// dimension of 600px so artifacts are perceptually visible (JPEG ops on 8x8
// blocks and large images would dilute the effect at native scale).
function jpegSquared(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const MAX = 600
  const scale = Math.min(1, MAX / Math.max(img.naturalWidth, img.naturalHeight))
  const w = Math.max(1, Math.round(img.naturalWidth * scale))
  const h = Math.max(1, Math.round(img.naturalHeight * scale))
  const ctx = drawTo(canvas, w, h)
  ctx.drawImage(img, 0, 0, w, h)
  let data = canvas.toDataURL('image/jpeg', 0.18)
  let n = 0
  function loop() {
    if (n >= 50) return
    const im = new Image()
    im.onload = () => {
      ctx.drawImage(im, 0, 0, w, h)
      data = canvas.toDataURL('image/jpeg', 0.18)
      n++
      loop()
    }
    im.src = data
  }
  loop()
}

function paintFill(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const tmp = document.createElement('canvas')
  tmp.width = img.naturalWidth; tmp.height = img.naturalHeight
  const tctx = tmp.getContext('2d')!
  tctx.drawImage(img, 0, 0)
  const x = Math.floor(Math.random() * tmp.width)
  const y = Math.floor(Math.random() * tmp.height)
  const px = tctx.getImageData(x, y, 1, 1).data
  const ctx = drawTo(canvas, img.naturalWidth, img.naturalHeight)
  ctx.fillStyle = `rgb(${px[0]},${px[1]},${px[2]})`
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

// 1bit b&w, but "yelling" — high contrast threshold
function wbmpYelling(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const ctx = drawTo(canvas, img.naturalWidth, img.naturalHeight)
  ctx.drawImage(img, 0, 0)
  const im = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const d = im.data
  for (let i = 0; i < d.length; i += 4) {
    const lum = 0.3 * d[i]! + 0.59 * d[i + 1]! + 0.11 * d[i + 2]!
    const v = lum < 128 ? 0 : 255
    d[i] = v; d[i + 1] = v; d[i + 2] = v
  }
  ctx.putImageData(im, 0, 0)
}

// centerline.jpg — only the middle row, on black
function centerlineRow(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const w = img.naturalWidth
  const ctx = drawTo(canvas, w, img.naturalHeight)
  ctx.fillStyle = '#000'
  ctx.fillRect(0, 0, w, img.naturalHeight)
  const yMid = Math.floor(img.naturalHeight / 2)
  // copy 1 row from source, render as a 1-pixel strip
  ctx.drawImage(img, 0, yMid, w, 1, 0, yMid, w, 1)
}

// rotated 13deg
function rotate13(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const ctx = drawTo(canvas, img.naturalWidth, img.naturalHeight)
  ctx.fillStyle = '#fff'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.save()
  ctx.translate(canvas.width / 2, canvas.height / 2)
  ctx.rotate((13 * Math.PI) / 180)
  ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2)
  ctx.restore()
}

// every other row is black
function everyOtherRow(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const ctx = drawTo(canvas, img.naturalWidth, img.naturalHeight)
  ctx.drawImage(img, 0, 0)
  const im = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const d = im.data
  const w = canvas.width
  for (let y = 0; y < canvas.height; y++) {
    if (y % 2 === 0) continue
    const start = y * w * 4
    for (let i = start; i < start + w * 4; i += 4) {
      d[i] = 0; d[i + 1] = 0; d[i + 2] = 0
    }
  }
  ctx.putImageData(im, 0, 0)
}

// checkerboard: every other pixel discarded
function checkerboardLoss(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const ctx = drawTo(canvas, img.naturalWidth, img.naturalHeight)
  ctx.drawImage(img, 0, 0)
  const im = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const d = im.data
  const w = canvas.width
  for (let y = 0; y < canvas.height; y++) {
    for (let x = 0; x < w; x++) {
      if ((x + y) % 2 === 0) {
        const i = (y * w + x) * 4
        d[i] = 0; d[i + 1] = 0; d[i + 2] = 0
      }
    }
  }
  ctx.putImageData(im, 0, 0)
}

// red-only: keep red, drop green + blue
function redOnly(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const ctx = drawTo(canvas, img.naturalWidth, img.naturalHeight)
  ctx.drawImage(img, 0, 0)
  const im = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const d = im.data
  for (let i = 0; i < d.length; i += 4) {
    d[i + 1] = 0; d[i + 2] = 0
  }
  ctx.putImageData(im, 0, 0)
}

// every pixel beige
function beige(_img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const ctx = drawTo(canvas, _img.naturalWidth, _img.naturalHeight)
  ctx.fillStyle = '#e8dfc6'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

// only the border (1/10 from each edge), interior blanked
function frameCrop(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const ctx = drawTo(canvas, img.naturalWidth, img.naturalHeight)
  ctx.drawImage(img, 0, 0)
  const im = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const d = im.data
  const w = canvas.width, h = canvas.height
  const bx = Math.floor(w * 0.1), by = Math.floor(h * 0.1)
  for (let y = by; y < h - by; y++) {
    const start = y * w * 4
    for (let x = bx; x < w - bx; x++) {
      const i = start + x * 4
      d[i] = 255; d[i + 1] = 255; d[i + 2] = 255
    }
  }
  ctx.putImageData(im, 0, 0)
}

// fold at middle: mirror top half over bottom half
function centerfold(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const ctx = drawTo(canvas, img.naturalWidth, img.naturalHeight)
  ctx.drawImage(img, 0, 0)
  const half = Math.floor(canvas.height / 2)
  ctx.save()
  ctx.translate(0, canvas.height)
  ctx.scale(1, -1)
  ctx.drawImage(canvas, 0, 0, canvas.width, half, 0, 0, canvas.width, half)
  ctx.restore()
}

// identity — draw the source as-is. used by video formats whose "compression"
// is just "extract one frame".
function identityFrame(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const ctx = drawTo(canvas, img.naturalWidth, img.naturalHeight)
  ctx.drawImage(img, 0, 0)
}

// center-crop to 1:1
function squareCrop(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const w = img.naturalWidth, h = img.naturalHeight
  const s = Math.min(w, h)
  const sx = Math.floor((w - s) / 2)
  const sy = Math.floor((h - s) / 2)
  const ctx = drawTo(canvas, s, s)
  ctx.drawImage(img, sx, sy, s, s, 0, 0, s, s)
}

// rotate 90 — landscape becomes portrait
function rotate90(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const w = img.naturalWidth, h = img.naturalHeight
  const ctx = drawTo(canvas, h, w)
  ctx.save()
  ctx.translate(h / 2, w / 2)
  ctx.rotate(Math.PI / 2)
  ctx.drawImage(img, -w / 2, -h / 2)
  ctx.restore()
}

// the single bluest pixel, then fill the image with it
function singleBlue(img: HTMLImageElement, canvas: HTMLCanvasElement) {
  const tmp = document.createElement('canvas')
  tmp.width = img.naturalWidth; tmp.height = img.naturalHeight
  const tctx = tmp.getContext('2d')!
  tctx.drawImage(img, 0, 0)
  const data = tctx.getImageData(0, 0, tmp.width, tmp.height).data
  let bestB = -1, bestR = 0, bestG = 0
  for (let i = 0; i < data.length; i += 4) {
    const b = data[i + 2]! - 0.5 * data[i]! - 0.5 * data[i + 1]!
    if (b > bestB) { bestB = b; bestR = data[i]!; bestG = data[i + 1]! }
  }
  const ctx = drawTo(canvas, img.naturalWidth, img.naturalHeight)
  const blueVal = Math.max(0, Math.min(255, Math.round(bestB + 0.5 * bestR + 0.5 * bestG)))
  ctx.fillStyle = `rgb(${bestR},${bestG},${blueVal})`
  ctx.fillRect(0, 0, canvas.width, canvas.height)
}

// ─── registry ───────────────────────────────────────────────────────────────

export const INTERACTIVE: Record<string, () => JSX.Element> = {
  // hand-built
  'b-compress':           () => <BCompressor />,

  // text transforms (mostly platinum)
  'yell-algo':            () => <TextTransform transform={yell} />,
  'whisper-algo':         () => <TextTransform transform={whisper} />,
  'tldr-last':            () => <TextTransform transform={tldrLast} />,
  'tldr-first':           () => <TextTransform transform={tldrFirst} />,
  'monotone-text':        () => <TextTransform transform={monoTone} />,
  'anagram-zip':          () => <TextTransform transform={anagram} />,
  'comma-maximalist':     () => <TextTransform transform={commaMax} />,

  // generated text transforms
  'comma-deletion':       () => <TextTransform transform={noCommas} />,
  'period-deletion':      () => <TextTransform transform={noPeriods} />,
  'em-dash-purge':        () => <TextTransform transform={noEmDashes} />,
  'all-questions':        () => <TextTransform transform={allQuestions} />,
  'all-statements':       () => <TextTransform transform={allStatements} />,
  'reversed-word':        () => <TextTransform transform={reverseWords} />,
  'reversed-paragraph':   () => <TextTransform transform={reverseSentences} />,
  'first-letter-only':    () => <TextTransform transform={firstLetterOnly} />,
  'middle-letter-only':   () => <TextTransform transform={middleLetterOnly} />,
  'justified-too-much':   () => <TextTransform transform={justifiedTooMuch} />,
  'semicolon-only':       () => <TextTransform transform={semicolonOnly} />,
  'vowelectomy':          () => <TextTransform transform={vowelectomy} />,
  'only-the-greg':        () => <TextTransform transform={onlyTheGreg} />,
  'only-the-articles':    () => <TextTransform transform={onlyArticles} />,
  'second-person':        () => <TextTransform transform={secondPerson} />,
  'loudspace':            () => <TextTransform transform={loudSpace} />,
  'regex-asterisk':       () => <TextTransform transform={regexAlgo} ratioFn={(i) => `${(2 / Math.max(i.length, 1)).toFixed(4)}×`} />,
  'sentence-shuffle':     () => <TextTransform transform={sentenceShuffle} />,
  'word-shuffle':         () => <TextTransform transform={wordShuffle} />,
  'letter-shuffle':       () => <TextTransform transform={letterShuffle} />,
  'first-and-last':       () => <TextTransform transform={firstAndLast} />,
  'only-the-middle':      () => <TextTransform transform={onlyTheMiddle} />,
  'only-the-prepositions': () => <TextTransform transform={onlyPrepositions} />,

  // image transforms
  'average-color-jpeg':   () => <ImageTransform transform={averageColorTransform} downloadName="average.png" />,
  'nsfw-blur':            () => <ImageTransform transform={nsfwBlurTransform} downloadName="blurred.png" />,
  'downsample-no-upscale': () => <ImageTransform transform={downsampleOnly} downloadName="8x8.png" />,
  'jpeg-squared':         () => <ImageTransform transform={jpegSquared} downloadName="jpeg2.jpg" />,
  'paint-fill-bmp':       () => <ImageTransform transform={paintFill} downloadName="bucket.png" />,

  // ── video formats (accept video, extract a frame, transform) ──
  'cinemascope-only': () => <VideoTransform downloadName="cinemascope.png" transform={(img, c) => {
    const w = img.naturalWidth, h = Math.max(1, Math.round(w / 32))
    const ctx = drawTo(c, w, img.naturalHeight)
    ctx.fillStyle = '#000'
    ctx.fillRect(0, 0, w, img.naturalHeight)
    ctx.drawImage(img, 0, Math.round((img.naturalHeight - h) / 2), w, h)
  }} />,
  'middle-frame-jpg':  () => <VideoTransform transform={identityFrame}        downloadName="middle.jpg" />,
  'keyframe-only-mp4': () => <VideoTransform transform={identityFrame}        downloadName="keyframe.png" />,
  'one-pixel-mp4':     () => <VideoTransform transform={averageColorTransform} downloadName="onepx.png" />,
  'square-crop':       () => <VideoTransform transform={squareCrop}           downloadName="square.png" />,
  'vertical-mp4':      () => <VideoTransform transform={rotate90}             downloadName="vertical.png" />,

  // generated catalog image transforms (each id verified in catalog)
  'wbmp-but-yelling':   () => <ImageTransform transform={wbmpYelling}     downloadName="wbmp.png" />,
  'centerline-jpg':     () => <ImageTransform transform={centerlineRow}   downloadName="centerline.png" />,
  'rotated-13':         () => <ImageTransform transform={rotate13}        downloadName="rotated.png" />,
  'every-other-row':    () => <ImageTransform transform={everyOtherRow}   downloadName="rows.png" />,
  'checkerboard-loss':  () => <ImageTransform transform={checkerboardLoss} downloadName="checker.png" />,
  'redonly-jpg':        () => <ImageTransform transform={redOnly}         downloadName="red.png" />,
  'beige-png':          () => <ImageTransform transform={beige}           downloadName="beige.png" />,
  'framecrop':          () => <ImageTransform transform={frameCrop}       downloadName="frame.png" />,
  'centerfold-jpg':     () => <ImageTransform transform={centerfold}      downloadName="folded.png" />,
  'single-blue':        () => <ImageTransform transform={singleBlue}      downloadName="blue.png" />,
}

export function isInteractive(id: string): boolean {
  return id in INTERACTIVE
}
