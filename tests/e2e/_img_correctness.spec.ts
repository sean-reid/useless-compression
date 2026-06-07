import { test, expect } from '@playwright/test'

// upload a 200x200 image with 4 distinguishable quadrants + a center marker,
// then verify each transform produced the expected pixel-level result.
//
// quadrants:
//   TL: red (255,0,0)
//   TR: green (0,255,0)
//   BL: blue (0,0,255)
//   BR: yellow (255,255,0)
//   center 20x20: white (255,255,255)

const W = 200
const H = 200

const makeTestPngBuffer = async (page: import('@playwright/test').Page): Promise<Buffer> => {
  const dataUrl = await page.evaluate(({ W, H }) => {
    const c = document.createElement('canvas')
    c.width = W; c.height = H
    const ctx = c.getContext('2d')!
    ctx.fillStyle = 'rgb(255,0,0)';   ctx.fillRect(0, 0, W / 2, H / 2)
    ctx.fillStyle = 'rgb(0,255,0)';   ctx.fillRect(W / 2, 0, W / 2, H / 2)
    ctx.fillStyle = 'rgb(0,0,255)';   ctx.fillRect(0, H / 2, W / 2, H / 2)
    ctx.fillStyle = 'rgb(255,255,0)'; ctx.fillRect(W / 2, H / 2, W / 2, H / 2)
    ctx.fillStyle = 'rgb(255,255,255)'; ctx.fillRect(W / 2 - 10, H / 2 - 10, 20, 20)
    return c.toDataURL('image/png')
  }, { W, H })
  return Buffer.from(dataUrl.split(',')[1]!, 'base64')
}

const ID_LIST = [
  'average-color-jpeg',
  'nsfw-blur',
  'downsample-no-upscale',
  'jpeg-squared',
  'paint-fill-bmp',
  'cinemascope-only',
  'wbmp-but-yelling',
  'centerline-jpg',
  'rotated-13',
  'every-other-row',
  'checkerboard-loss',
  'redonly-jpg',
  'beige-png',
  'framecrop',
  'centerfold-jpg',
  'single-blue',
]

async function runOne(page: import('@playwright/test').Page, id: string, buf: Buffer) {
  await page.goto(`/#/format/${id}`)
  await page.waitForLoadState('networkidle')

  // hide the chaos chrome popups so they don't intercept clicks
  await page.addStyleTag({ content: `
    [role=dialog][aria-label=ad], [role=dialog][aria-label=mailbox] { display: none !important; }
  `})

  const fileInput = page.locator('input[type=file]').first()
  await expect(fileInput).toBeAttached({ timeout: 5000 })
  await fileInput.setInputFiles({ name: 'test.png', mimeType: 'image/png', buffer: buf })

  // wait for canvas to appear and have content
  const canvas = page.locator('canvas').first()
  await expect(canvas).toBeAttached({ timeout: 5000 })
  // give jpeg-squared time to chain its async loops
  await page.waitForTimeout(id === 'jpeg-squared' ? 3000 : 700)

  return await page.evaluate(() => {
    const c = document.querySelector('canvas') as HTMLCanvasElement
    const ctx = c.getContext('2d')!
    const w = c.width, h = c.height
    const data = ctx.getImageData(0, 0, w, h).data
    // sample helpers (clamped to inside)
    const sampleAt = (x: number, y: number): [number, number, number] => {
      x = Math.max(0, Math.min(w - 1, Math.floor(x)))
      y = Math.max(0, Math.min(h - 1, Math.floor(y)))
      const i = (y * w + x) * 4
      return [data[i]!, data[i + 1]!, data[i + 2]!]
    }
    let allBlack = true, allWhite = true, greenZero = true, blueZero = true, binary = true
    const firstR = data[0]!, firstG = data[1]!, firstB = data[2]!
    let uniform = true
    const colorSet = new Set<string>()
    for (let i = 0; i < data.length; i += 4) {
      const r = data[i]!, g = data[i + 1]!, b = data[i + 2]!
      if (r !== 0 || g !== 0 || b !== 0) allBlack = false
      if (r !== 255 || g !== 255 || b !== 255) allWhite = false
      if (g !== 0) greenZero = false
      if (b !== 0) blueZero = false
      if (!((r === 0 || r === 255) && (g === 0 || g === 255) && (b === 0 || b === 255))) binary = false
      if (r !== firstR || g !== firstG || b !== firstB) uniform = false
      if (colorSet.size < 50) colorSet.add(`${r},${g},${b}`)
    }
    return {
      width: w, height: h,
      uniqueColors: colorSet.size,
      topLeftQuadrantSample: sampleAt(w * 0.25, h * 0.25),
      topRightQuadrantSample: sampleAt(w * 0.75, h * 0.25),
      bottomLeftQuadrantSample: sampleAt(w * 0.25, h * 0.75),
      bottomRightQuadrantSample: sampleAt(w * 0.75, h * 0.75),
      centerSample: sampleAt(w / 2, h / 2),
      allBlack, allWhite, allUniform: uniform,
      greenChannelAllZero: greenZero, blueChannelAllZero: blueZero,
      pureBinary: binary,
    }
  })
}

test('image transforms: correctness sweep', async ({ page }) => {
  test.setTimeout(120_000)
  const buf = await makeTestPngBuffer(page)

  const failures: string[] = []
  const report: Array<{ id: string; result: object; verdict: string }> = []

  for (const id of ID_LIST) {
    try {
      const r = await runOne(page, id, buf)
      let verdict = 'ok'
      // per-format assertions
      switch (id) {
        case 'average-color-jpeg':
          if (!r.allUniform) { verdict = `FAIL: not uniform (${r.uniqueColors} colors). expected single mean color.` }
          break
        case 'paint-fill-bmp':
          if (!r.allUniform) { verdict = `FAIL: not uniform.` }
          break
        case 'single-blue':
          if (!r.allUniform) { verdict = `FAIL: not uniform.` }
          break
        case 'beige-png':
          if (!r.allUniform) verdict = `FAIL: not uniform.`
          else {
            const [r0, g0, b0] = r.topLeftQuadrantSample
            if (Math.abs(r0 - 232) > 3 || Math.abs(g0 - 223) > 3 || Math.abs(b0 - 198) > 3) {
              verdict = `FAIL: color ${r0},${g0},${b0} != beige #e8dfc6 (232,223,198).`
            }
          }
          break
        case 'downsample-no-upscale':
          if (r.width !== 8 || r.height !== 8) verdict = `FAIL: ${r.width}x${r.height} not 8x8.`
          break
        case 'cinemascope-only': {
          const [tlR, tlG, tlB] = r.topLeftQuadrantSample
          if (tlR !== 0 || tlG !== 0 || tlB !== 0) verdict = `FAIL: TL not black (${tlR},${tlG},${tlB}).`
          else {
            const [cR, cG, cB] = r.centerSample
            if (cR === 0 && cG === 0 && cB === 0) verdict = `WARN: center is black too (strip too thin?).`
          }
          break
        }
        case 'centerline-jpg': {
          const [tlR, tlG, tlB] = r.topLeftQuadrantSample
          if (tlR !== 0 || tlG !== 0 || tlB !== 0) verdict = `FAIL: TL not black.`
          else {
            const [cR, cG, cB] = r.centerSample
            if (cR === 0 && cG === 0 && cB === 0) verdict = `WARN: center is also black.`
          }
          break
        }
        case 'wbmp-but-yelling':
          if (!r.pureBinary) verdict = `FAIL: not pure 0/255 (${r.uniqueColors} unique).`
          break
        case 'redonly-jpg':
          if (!r.greenChannelAllZero) verdict = `FAIL: green channel not zero.`
          else if (!r.blueChannelAllZero) verdict = `FAIL: blue channel not zero.`
          break
        case 'framecrop': {
          const [cR, cG, cB] = r.centerSample
          if (cR !== 255 || cG !== 255 || cB !== 255) verdict = `FAIL: center not white (${cR},${cG},${cB}). expected interior blanked.`
          break
        }
        case 'centerfold-jpg': {
          // bottom half should mirror top half. so bottom-left should look like top-left
          const [tlR, tlG, tlB] = r.topLeftQuadrantSample
          const [blR, blG, blB] = r.bottomLeftQuadrantSample
          if (Math.abs(tlR - blR) > 10 || Math.abs(tlG - blG) > 10 || Math.abs(tlB - blB) > 10) {
            verdict = `WARN: bottom-left (${blR},${blG},${blB}) doesn't mirror top-left (${tlR},${tlG},${tlB}).`
          }
          break
        }
        case 'rotated-13': {
          // there should be some pure-white area in a corner (the fill from canvas background)
          // and the canvas should not be empty
          if (r.allBlack || r.allWhite || r.allUniform) verdict = `FAIL: trivial output.`
          break
        }
        case 'nsfw-blur': {
          // pixels should NOT be pure 255/0 anymore — colors should bleed
          const [tlR] = r.topLeftQuadrantSample
          if (tlR === 255) verdict = `WARN: TL still pure red, blur may not have applied.`
          break
        }
        case 'every-other-row': {
          // odd rows should be black, even rows should keep color (or vice versa)
          const oddRowSample = await page.evaluate(() => {
            const c = document.querySelector('canvas') as HTMLCanvasElement
            const ctx = c.getContext('2d')!
            const px1 = ctx.getImageData(50, 1, 1, 1).data
            const px2 = ctx.getImageData(50, 2, 1, 1).data
            return { row1: [px1[0]!, px1[1]!, px1[2]!], row2: [px2[0]!, px2[1]!, px2[2]!] }
          })
          const r1Black = oddRowSample.row1.every((v) => v === 0)
          const r2Black = oddRowSample.row2.every((v) => v === 0)
          if (r1Black === r2Black) verdict = `FAIL: rows 1 and 2 both ${r1Black ? 'black' : 'not black'}. expected alternation.`
          break
        }
        case 'checkerboard-loss': {
          // (0,0) and (1,1) should be one state; (0,1) and (1,0) the other
          const pat = await page.evaluate(() => {
            const c = document.querySelector('canvas') as HTMLCanvasElement
            const ctx = c.getContext('2d')!
            const at = (x: number, y: number) => {
              const p = ctx.getImageData(x, y, 1, 1).data
              return [p[0]!, p[1]!, p[2]!]
            }
            return { a: at(10, 10), b: at(11, 10), c: at(10, 11), d: at(11, 11) }
          })
          const isBlack = (px: number[]) => px[0] === 0 && px[1] === 0 && px[2] === 0
          const ab = isBlack(pat.a), bb = isBlack(pat.b), cb = isBlack(pat.c), db = isBlack(pat.d)
          if (ab === bb || ab !== db || cb !== bb) verdict = `FAIL: not checkerboard. a=${ab} b=${bb} c=${cb} d=${db}.`
          break
        }
        case 'jpeg-squared': {
          // after iterated jpeg compression, output should still have content but be visibly different
          // from the source. red and green channels should be touched (jpeg shifts colors).
          const [tlR, tlG, tlB] = r.topLeftQuadrantSample
          // original is pure red (255,0,0). after jpeg² it should be different.
          if (tlR === 255 && tlG === 0 && tlB === 0) verdict = `FAIL: TL still pure red, jpeg² didn't run.`
          break
        }
      }
      report.push({ id, result: r, verdict })
      if (verdict.startsWith('FAIL')) failures.push(`${id}: ${verdict}`)
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(e)
      failures.push(`${id}: threw ${msg}`)
      report.push({ id, result: {}, verdict: `THREW: ${msg}` })
    }
  }

  // print a compact report
  for (const row of report) {
    console.log(`[${row.verdict.startsWith('ok') ? 'OK' : row.verdict.startsWith('WARN') ? 'WARN' : 'FAIL'}] ${row.id}: ${row.verdict}`)
  }
  if (failures.length) {
    throw new Error(`${failures.length} failures:\n${failures.join('\n')}`)
  }
})
