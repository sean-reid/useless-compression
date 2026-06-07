import { useState, useRef, useEffect } from 'react'

type Props = {
  /** mutate the canvas in place using the extracted frame */
  transform: (sourceFrame: HTMLImageElement, canvas: HTMLCanvasElement) => void
  hint?: string
  downloadName?: string
}

// video in → still frame out. accepts video files, extracts a single frame
// at ~1.5s (or the middle if shorter), then runs an image-style transform.
// the "video" part of the format is honored at the file-input level; the
// output is one frame because that's the joke for most of these formats
// anyway (one-frame, cinemascope, etc.).
export default function VideoTransform({ transform, hint = 'upload a video', downloadName = 'compressed.png' }: Props) {
  const [src, setSrc] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => () => { if (src) URL.revokeObjectURL(src) }, [src])

  function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setErr(null)
    setBusy(true)
    setSrc(URL.createObjectURL(file))
  }

  function onLoaded() {
    const v = videoRef.current
    if (!v) return
    // seek to middle (or 1.5s, whichever's shorter)
    const t = Math.min(1.5, v.duration / 2)
    if (Number.isFinite(t) && t >= 0) v.currentTime = t
  }

  function onSeeked() {
    const v = videoRef.current
    const canvas = canvasRef.current
    if (!v || !canvas) { setBusy(false); return }
    try {
      const w = v.videoWidth || 320
      const h = v.videoHeight || 240
      // draw the frame to a temp canvas, then hand it to the transform as an Image
      const tmp = document.createElement('canvas')
      tmp.width = w; tmp.height = h
      const tctx = tmp.getContext('2d')!
      tctx.drawImage(v, 0, 0, w, h)
      const url = tmp.toDataURL()
      const img = new Image()
      img.onload = () => {
        try { transform(img, canvas) } catch (e) { setErr(String(e)) }
        setBusy(false)
      }
      img.onerror = () => { setErr('frame load failed'); setBusy(false) }
      img.src = url
    } catch (e) {
      setErr(e instanceof Error ? e.message : String(e))
      setBusy(false)
    }
  }

  function download() {
    const c = canvasRef.current
    if (!c) return
    c.toBlob((blob) => {
      if (!blob) return
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = downloadName
      a.click()
      URL.revokeObjectURL(url)
    })
  }

  return (
    <div className="relative">
      <label className="font-comic text-pink-600 text-lg block mb-1" style={{ transform: 'rotate(-1deg)' }}>
        {hint}
      </label>
      <input
        type="file"
        accept="video/*"
        onChange={onPick}
        className="block font-mono text-sm border-2 border-black p-1 bg-white"
        style={{ boxShadow: '4px 4px 0 #000' }}
      />
      {!src && <p className="mt-3 typed text-[13px] opacity-70">one frame will appear below. probably the wrong one.</p>}
      {src && (
        <>
          <video
            ref={videoRef}
            src={src}
            onLoadedData={onLoaded}
            onSeeked={onSeeked}
            muted
            playsInline
            preload="auto"
            style={{ display: 'none' }}
          />
          <div className="mt-3 typed text-[14px]">↓ {busy ? 'extracting frame...' : err ? 'something went wrong' : 'one frame'}</div>
          {err && <p className="font-mono text-[12px] text-red-700">{err}</p>}
          <div
            className="mt-1 p-2 bg-[#fffb00] border-4 border-black inline-block"
            style={{ boxShadow: '6px 6px 0 #ff2ea5', maxWidth: '100%' }}
          >
            <canvas ref={canvasRef} className="block max-w-full h-auto" style={{ imageRendering: 'pixelated' }} />
          </div>
          <div className="mt-2">
            <button type="button" onClick={download} className="bg-yellow-300 border-2 border-black px-3 py-1 font-mono text-sm" style={{ boxShadow: '3px 3px 0 #000' }}>
              ⬇ download
            </button>
          </div>
        </>
      )}
    </div>
  )
}
