import { test } from '@playwright/test'
import { fullPageShot } from './capture'

// utility "test" that captures a screenshot at each viewport.
// not run in CI — invoke with: pnpm e2e tests/e2e/_screenshot.spec.ts --project=chromium
test.describe.configure({ mode: 'serial' })

const viewports = [
  { name: 'desktop', w: 1440, h: 900 },
  { name: 'tablet', w: 768, h: 1024 },
  { name: 'mobile', w: 375, h: 812 },
]

for (const vp of viewports) {
  test(`screenshot home @ ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.w, height: vp.h })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    // let the chrome settle for a moment (falling emojis, snails)
    await page.waitForTimeout(2200)
    await fullPageShot(page, `screenshots/home-${vp.name}.png`)
  })

  test(`screenshot home with mail open @ ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.w, height: vp.h })
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.getByRole('button', { name: /open mail/i }).click()
    await page.waitForTimeout(1000)
    await page.screenshot({ path: `screenshots/home-mail-${vp.name}.png`, fullPage: false })
  })

  test(`screenshot about @ ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.w, height: vp.h })
    await page.goto('/#/about')
    await page.waitForLoadState('networkidle')
    await fullPageShot(page, `screenshots/about-${vp.name}.png`)
  })

  test(`screenshot library @ ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.w, height: vp.h })
    await page.goto('/#/library')
    await page.waitForLoadState('networkidle')
    await fullPageShot(page, `screenshots/library-${vp.name}.png`)
  })

  test(`screenshot 404 @ ${vp.name}`, async ({ page }) => {
    await page.setViewportSize({ width: vp.w, height: vp.h })
    await page.goto('/#/nope')
    await page.waitForLoadState('networkidle')
    await fullPageShot(page, `screenshots/404-${vp.name}.png`)
  })
}
