import { test } from '@playwright/test'

test('library actually-runs filter', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1200 })
  await page.goto('/#/library')
  await page.waitForLoadState('networkidle')
  await page.getByRole('button', { name: /actually runs \(\d+\)/i }).click()
  await page.waitForTimeout(400)
  await page.screenshot({ path: 'screenshots/library-runs.png', fullPage: false })
})

test('format detail centerline.jpg interactive', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#/format/centerline-jpg')
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(400)
  await page.screenshot({ path: 'screenshots/format-centerline.png', fullPage: false })
})

test('format detail vowelectomy interactive', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#/format/vowelectomy')
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(400)
  await page.screenshot({ path: 'screenshots/format-vowelectomy.png', fullPage: false })
})
