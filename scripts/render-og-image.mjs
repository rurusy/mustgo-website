// Renders the OG preview canvases to public/*.png via headless Chrome.
// Run with `node scripts/render-og-image.mjs`. Re-run whenever the OG layout
// or copy in og-preview.html / og-preview-en.html changes.

import puppeteer from 'puppeteer'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

// One entry per language. Each screenshots the #og-canvas element of its HTML.
const TARGETS = [
  { html: 'og-preview.html', out: 'public/og-image.png' },
  { html: 'og-preview-en.html', out: 'public/og-image-en.png' },
]

const browser = await puppeteer.launch({ headless: 'new' })
try {
  const page = await browser.newPage()
  // Larger viewport so the 1200×630 .og box has surrounding room — we screenshot
  // the element itself, not the page, so the surrounding background is irrelevant.
  await page.setViewport({ width: 1400, height: 800, deviceScaleFactor: 2 })

  for (const { html, out } of TARGETS) {
    const htmlPath = path.join(root, html)
    const outPath = path.join(root, out)
    await page.goto(pathToFileURL(htmlPath).href, { waitUntil: 'networkidle0' })
    // Wait for Google Fonts to fully load before screenshotting; otherwise Korean
    // glyphs may fall back to a default and the wordmark spacing will drift.
    await page.evaluate(() => document.fonts.ready)
    const ogEl = await page.$('#og-canvas')
    if (!ogEl) throw new Error(`#og-canvas not found in ${html}`)
    await ogEl.screenshot({ path: outPath, type: 'png' })
    console.log(`✓ Wrote ${out}`)
  }
} finally {
  await browser.close()
}
