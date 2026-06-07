import { test, expect } from '@playwright/test'

test('library top viewport', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1200 })
  await page.goto('/#/library')
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(600)
  await page.screenshot({ path: 'screenshots/library-top.png', fullPage: false })
})

test('library audio filter', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1200 })
  await page.goto('/#/library')
  await page.waitForLoadState('networkidle')
  await page.getByRole('button', { name: /^audio/i }).click()
  await page.waitForTimeout(300)
  await page.screenshot({ path: 'screenshots/library-audio.png', fullPage: false })
})

test('library count matches', async ({ page }) => {
  await page.goto('/#/library')
  await expect(page.getByText(/\d+ of 1003 catalogued/)).toBeVisible()
})
