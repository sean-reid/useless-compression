import { test } from '@playwright/test'

test('open fmt884.zip from taskbar', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.getByRole('button', { name: /fmt884\.zip/i }).first().click()
  await page.waitForTimeout(600)
  await page.screenshot({ path: 'screenshots/file-fmt884.png', fullPage: false })
})

test('open untitled (do not open) from taskbar', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.getByRole('button', { name: /untitled \(do not open\)/i }).first().click()
  await page.waitForTimeout(600)
  await page.screenshot({ path: 'screenshots/file-untitled.png', fullPage: false })
})
