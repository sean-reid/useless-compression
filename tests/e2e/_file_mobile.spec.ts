import { test, expect } from '@playwright/test'

test('file window close button reachable on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 })
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.getByRole('button', { name: /fmt884\.zip/i }).first().click()
  await page.waitForTimeout(500)
  const closeBtn = page.locator('[role=dialog] button[aria-label=close]').first()
  await expect(closeBtn).toBeVisible()
  const box = await closeBtn.boundingBox()
  expect(box).not.toBeNull()
  if (box) {
    // close button must be entirely within viewport
    expect(box.x + box.width).toBeLessThanOrEqual(375)
    expect(box.x).toBeGreaterThanOrEqual(0)
  }
  await page.screenshot({ path: 'screenshots/file-mobile.png', fullPage: false })
  await closeBtn.click()
  await page.waitForTimeout(300)
  await expect(page.locator('[role=dialog]')).toHaveCount(0)
})
