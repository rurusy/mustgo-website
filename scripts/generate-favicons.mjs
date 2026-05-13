// Generate PNG + ICO favicon assets from public/favicon.svg.
// Requires `sharp` and `png-to-ico` (install via `npm install --no-save sharp png-to-ico`).
import { readFile, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'
import sharp from 'sharp'
import pngToIco from 'png-to-ico'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const publicDir = resolve(root, 'public')
const svgPath = resolve(publicDir, 'favicon.svg')

const svg = await readFile(svgPath)

// Render once at high resolution and downscale for crispness.
const master = await sharp(svg, { density: 1024 }).resize(512, 512).png().toBuffer()

const pngTargets = [
  { size: 16, name: 'favicon-16.png' },
  { size: 32, name: 'favicon-32.png' },
  { size: 48, name: 'favicon-48.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'favicon-192.png' },
  { size: 512, name: 'favicon-512.png' },
]

for (const { size, name } of pngTargets) {
  await sharp(master).resize(size, size).png().toFile(resolve(publicDir, name))
  console.log(`✓ ${name} (${size}x${size})`)
}

// Multi-size ICO from the small PNGs (standard 16/32/48 stack).
const icoBuffer = await pngToIco([
  resolve(publicDir, 'favicon-16.png'),
  resolve(publicDir, 'favicon-32.png'),
  resolve(publicDir, 'favicon-48.png'),
])
await writeFile(resolve(publicDir, 'favicon.ico'), icoBuffer)
console.log('✓ favicon.ico (16/32/48)')
