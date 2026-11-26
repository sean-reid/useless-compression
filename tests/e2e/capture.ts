import type { Page } from '@playwright/test'

const WEBKIT_MAX_PX = 32767

export async function fullPageShot(page: Page, path: string) {
  const { width, height, scale } = await page.evaluate(() => ({
    width: document.documentElement.scrollWidth,
    height: document.documentElement.scrollHeight,
    scale: window.devicePixelRatio,
  }))
  const maxHeight = Math.floor(WEBKIT_MAX_PX / scale)
  await page.screenshot({
    path,
    fullPage: true,
    clip: { x: 0, y: 0, width, height: Math.min(height, maxHeight) },
  })
}
