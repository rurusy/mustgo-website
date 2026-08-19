// Post-build step: inline Vite's emitted stylesheet into dist/index.html.
//
// Why: a <link rel="stylesheet"> in <head> is render-blocking — the browser
// cannot paint until it lands, and Naver's ADVoost diagnostic flags it as
// "렌더 차단 리소스 존재". The bundle is ~7 KB gzipped with zero url() refs, so
// inlining it costs less than the round-trip it removes and makes first paint
// depend on the HTML alone. Google Fonts is handled separately in index.html
// (preload + rel swap), so after this step the page has no blocking subresource.
//
// Runs BEFORE scripts/gen-en-html.mjs so /en inherits the inlined CSS.
//
// The .css file is intentionally left in dist/assets/ — previously-cached HTML
// may still reference it, and it costs nothing to keep serving.
//
// Fail-fast: if Vite stops emitting a stylesheet link (or changes its shape),
// this errors instead of silently shipping an unstyled page.

import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const indexFile = path.join(dist, 'index.html')

let html = await readFile(indexFile, 'utf8')

// Vite emits: <link rel="stylesheet" crossorigin href="/assets/index-HASH.css">
const linkRe = /<link[^>]+rel="stylesheet"[^>]*>/g
const links = html.match(linkRe) ?? []

if (links.length === 0) {
  throw new Error('inline-css: no <link rel="stylesheet"> found in dist/index.html. Did the Vite output change?')
}

let inlined = 0
for (const link of links) {
  const href = link.match(/href="([^"]+\.css)"/)?.[1]
  if (!href || !href.startsWith('/assets/')) continue

  const cssFile = path.join(dist, href.replace(/^\//, ''))
  const css = await readFile(cssFile, 'utf8')
  html = html.replace(link, `<style>${css.trim()}</style>`)
  inlined += 1
  console.log(`  ${href} → inlined (${(css.length / 1024).toFixed(1)} KB)`)
}

if (inlined === 0) {
  throw new Error('inline-css: found stylesheet link(s) but none pointed at /assets/*.css')
}

await writeFile(indexFile, html, 'utf8')
console.log(`✓ Inlined ${inlined} stylesheet(s) into dist/index.html — no render-blocking CSS left`)
