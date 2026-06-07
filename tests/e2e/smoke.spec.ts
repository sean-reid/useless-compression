import { test, expect } from '@playwright/test'

test('home page shows the title with strikethrough USELESS wordmark', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /useless compression/i }).first()).toBeVisible()
})

test('home page exposes /library and /about links', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('link', { name: /\/library/ })).toBeVisible()
  await expect(page.getByRole('link', { name: /\/about/ })).toBeVisible()
})

test('B-Compress demo replaces some letters with the B emoji', async ({ page }) => {
  await page.goto('/')
  const input = page.getByLabel(/type something/i)
  await input.fill('aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
  // not all letters get replaced. some do.
  const out = page.locator('text=/🅱️/')
  await expect(out.first()).toBeVisible()
})

test('navigate to library and see catalog placeholder', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('link', { name: /\/library/ }).click()
  await expect(page).toHaveURL(/#\/library$/)
  await expect(page.getByRole('heading', { name: /the library/i })).toBeVisible()
})

test('unknown route shows 404', async ({ page }) => {
  await page.goto('/#/this-does-not-exist')
  await expect(page.getByText('404', { exact: false }).first()).toBeVisible()
})
