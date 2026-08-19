// Post-build step: emit dist/en/index.html — a copy of the built index.html
// with English <head> metadata (title, description, canonical, OG, Twitter).
//
// Why: the site is an SPA served from a single index.html, so social scrapers
// (Kakao, Facebook, X, Slack, LinkedIn — none run JS) would otherwise see the
// Korean OG tags at /en. A physical dist/en/index.html is served by Vercel for
// /en (static files take precedence over the SPA rewrite), so scrapers get the
// English preview. It loads the same hashed JS/CSS via absolute /assets/* paths,
// so React Router still boots and renders the English homepage.
//
// Fail-fast: every substitution must match, otherwise the build errors loudly —
// that surfaces any future index.html change instead of silently shipping stale
// or Korean OG tags on /en.

import { readFile, writeFile, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const distIndex = path.join(root, 'dist', 'index.html')
const outDir = path.join(root, 'dist', 'en')
const outFile = path.join(outDir, 'index.html')

const BASE = 'https://mustgokorea.co.kr'

// Length budgets, both enforced by Naver's ADVoost diagnostic / SERP rendering:
//   title       15–45 chars — outside that range it reports a 경고
//   description ~80 chars   — Naver truncates past this in search results
// `title` must stay identical to document.title in src/pages/EnHomePage.jsx,
// which re-applies it client-side once React Router mounts the English page.
const EN = {
  title: 'Mustgo — Trusted Partner in Business Travel',
  description:
    'Outbound business trips and inbound VIP visits to Korea. Reply in 1 business day.',
  ogTitle: 'Mustgo — Your Trusted Partner in Two-Way Business Travel',
  ogImage: `${BASE}/og-image-en.png`,
  ogImageAlt: 'Mustgo — Your Trusted Partner in Two-Way Business Travel',
  url: `${BASE}/en`,
}

// [label, regex, replacement]. Each must change the string or the build fails.
const SUBS = [
  ['lang', /lang="ko"/, 'lang="en"'],
  ['title', /<title>[^<]*<\/title>/, `<title>${EN.title}</title>`],
  ['description', /(name="description"\s+content=")[^"]*(")/, `$1${EN.description}$2`],
  ['canonical', /(rel="canonical" href=")[^"]*(")/, `$1${EN.url}$2`],
  ['og:locale', /(property="og:locale" content=")[^"]*(")/, `$1en_US$2`],
  ['og:url', /(property="og:url" content=")[^"]*(")/, `$1${EN.url}$2`],
  ['og:title', /(property="og:title" content=")[^"]*(")/, `$1${EN.ogTitle}$2`],
  ['og:description', /(property="og:description"\s+content=")[^"]*(")/, `$1${EN.description}$2`],
  ['og:image', /(property="og:image" content=")[^"]*(")/, `$1${EN.ogImage}$2`],
  ['og:image:alt', /(property="og:image:alt" content=")[^"]*(")/, `$1${EN.ogImageAlt}$2`],
  ['twitter:title', /(name="twitter:title" content=")[^"]*(")/, `$1${EN.ogTitle}$2`],
  ['twitter:description', /(name="twitter:description"\s+content=")[^"]*(")/, `$1${EN.description}$2`],
  ['twitter:image', /(name="twitter:image" content=")[^"]*(")/, `$1${EN.ogImage}$2`],
]

let html = await readFile(distIndex, 'utf8')
for (const [label, re, rep] of SUBS) {
  const next = html.replace(re, rep)
  if (next === html) {
    throw new Error(
      `gen-en-html: no match for "${label}". Did index.html change? Update scripts/gen-en-html.mjs.`,
    )
  }
  html = next
}

await mkdir(outDir, { recursive: true })
await writeFile(outFile, html, 'utf8')
console.log(`✓ Wrote dist/en/index.html (English OG for /en)`)
