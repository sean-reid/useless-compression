import { test } from '@playwright/test'

test('library desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#/library')
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(600)
  await page.screenshot({ path: 'screenshots/library-desktop.png', fullPage: true })
})

test('format detail b-compress', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#/format/b-compress')
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(400)
  await page.screenshot({ path: 'screenshots/format-bcompress.png', fullPage: true })
})

test('format detail mp2', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#/format/mp2')
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(400)
  await page.screenshot({ path: 'screenshots/format-mp2.png', fullPage: true })
})
