// Writes docs/structured-data.json into index.html as a single-line
// <script type="application/ld+json"> block.
//
// Why a script: the JSON-LD in index.html MUST stay on one line (Naver's
// ADVoost diagnostic parses line by line and reads a wrapped block as "no
// structured data"), but one-line JSON is miserable to hand-edit. So the
// readable copy in docs/ is the source of truth — edit there, run this.
//
//   node scripts/sync-jsonld.mjs
//
// Run manually after editing the schema; it is not part of `npm run build`,
// since index.html is committed with the minified block already in place.

import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const jsonFile = path.join(root, 'docs', 'structured-data.json')
const htmlFile = path.join(root, 'index.html')

const data = JSON.parse(await readFile(jsonFile, 'utf8'))
const html = await readFile(htmlFile, 'utf8')

const block = `<script type="application/ld+json">${JSON.stringify(data)}</script>`
const re = /<script type="application\/ld\+json">[\s\S]*?<\/script>/

if (!re.test(html)) {
  throw new Error('sync-jsonld: no <script type="application/ld+json"> block found in index.html')
}

const next = html.replace(re, block)
if (next === html) {
  console.log('· index.html JSON-LD already up to date')
} else {
  await writeFile(htmlFile, next, 'utf8')
  console.log('✓ Synced docs/structured-data.json → index.html (single line)')
}
