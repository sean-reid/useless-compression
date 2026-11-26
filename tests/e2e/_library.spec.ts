import { test } from '@playwright/test'
import { fullPageShot } from './capture'

test('library desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#/library')
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(600)
  await fullPageShot(page, 'screenshots/library-desktop.png')
})

test('format detail b-compress', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#/format/b-compress')
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(400)
  await fullPageShot(page, 'screenshots/format-bcompress.png')
})

test('format detail mp2', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#/format/mp2')
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(400)
  await fullPageShot(page, 'screenshots/format-mp2.png')
})
