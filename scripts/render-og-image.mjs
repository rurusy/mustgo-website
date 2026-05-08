// Renders og-preview.html to public/og-image.png via headless Chrome.
// Run with `node scripts/render-og-image.mjs`. Re-run whenever the OG layout
// or copy in og-preview.html changes.

import puppeteer from 'puppeteer'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const HTML_PATH = path.join(__dirname, '..', 'og-preview.html')
const OUT_PATH = path.join(__dirname, '..', 'public', 'og-image.png')

const browser = await puppeteer.launch({ headless: 'new' })
try {
  const page = await browser.newPage()
  // Larger viewport so the 1200×630 .og box has surrounding room — we screenshot
  // the element itself, not the page, so the surrounding background is irrelevant.
  await page.setViewport({ width: 1400, height: 800, deviceScaleFactor: 2 })
  await page.goto(pathToFileURL(HTML_PATH).href, { waitUntil: 'networkidle0' })
  // Wait for Google Fonts to fully load before screenshotting; otherwise Korean
  // glyphs may fall back to a default and the wordmark spacing will drift.
  await page.evaluate(() => document.fonts.ready)
  const ogEl = await page.$('#og-canvas')
  if (!ogEl) throw new Error('#og-canvas not found in og-preview.html')
  await ogEl.screenshot({ path: OUT_PATH, type: 'png' })
  console.log(`✓ Wrote ${OUT_PATH}`)
} finally {
  await browser.close()
}
