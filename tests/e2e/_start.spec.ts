import { test } from '@playwright/test'

test('start menu open', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.getByRole('button', { name: /start menu/i }).click()
  await page.waitForTimeout(400)
  await page.screenshot({ path: 'screenshots/start-menu.png', fullPage: false })
})

test('greg tribute page', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/#/greg')
  await page.waitForLoadState('networkidle')
  await page.waitForTimeout(800)
  await page.screenshot({ path: 'screenshots/greg-tribute.png', fullPage: true })
})
