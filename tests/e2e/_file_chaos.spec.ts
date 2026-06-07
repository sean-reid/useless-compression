import { test, expect } from '@playwright/test'

test('multiple file windows on mobile are chaotic but on-screen', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  await page.waitForLoadState('networkidle')

  // open three files
  await page.getByRole('button', { name: /fmt884\.zip/i }).first().click()
  await page.waitForTimeout(200)
  await page.getByRole('button', { name: /start menu/i }).click()
  await page.getByRole('button', { name: /open readme/i }).click()
  await page.waitForTimeout(200)
  await page.getByRole('button', { name: /start menu/i }).click()
  await page.getByRole('button', { name: /open \/the_cube/ }).click()
  await page.waitForTimeout(400)

  const dialogs = page.locator('[role=dialog][aria-label*=".zip"], [role=dialog][aria-label*=".txt"], [role=dialog][aria-label*="winzipper"]')
  const n = await dialogs.count()
  expect(n).toBeGreaterThanOrEqual(2)

  // every close button must be on-screen
  const closes = page.locator('[role=dialog] button[aria-label=close]')
  const cn = await closes.count()
  for (let i = 0; i < cn; i++) {
    const b = await closes.nth(i).boundingBox()
    expect(b).not.toBeNull()
    if (b) {
      expect(b.x).toBeGreaterThanOrEqual(0)
      expect(b.x + b.width).toBeLessThanOrEqual(375)
    }
  }

  await page.screenshot({ path: 'screenshots/files-chaos-mobile.png', fullPage: false })
})
