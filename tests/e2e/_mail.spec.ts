import { test } from '@playwright/test'

test('mail popup zoomed', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 })
  await page.goto('/')
  await page.waitForLoadState('networkidle')
  await page.getByRole('button', { name: /open mail/i }).click()
  await page.waitForTimeout(800)
  // crop to the popup region (top-right corner)
  const dialog = page.getByRole('dialog', { name: 'mailbox' })
  await dialog.screenshot({ path: 'screenshots/mail-zoom.png' })
})
