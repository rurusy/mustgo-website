// 도시 허브의 카드용 썸네일을 만든다. 수동 실행: `node scripts/make-thumbs.mjs`
// (render-og-image.mjs 와 같은 성격 — 빌드 단계가 아니라 사진을 추가했을 때 한 번 돌린다.)
//
// Why: 포토코리아 원본은 1620px, 장당 200~900KB 다. 허브 카드는 실제로 약 430px 폭으로
// 그려지므로 원본을 그대로 쓰면 15장 = 5.8MB 가 카드 하나당 4배 과하게 내려간다.
// 상세 페이지의 큰 사진은 원본을 그대로 쓰고(페이지당 한 장), 카드만 줄인다.
//
// 이미지 라이브러리를 새로 넣지 않으려고 이미 있는 헤드리스 크롬의 canvas 로 줄인다.
// file:// 로 읽으면 canvas 가 오염(taint)되어 toDataURL 이 막히므로 로컬 서버로 띄운다.

import { createServer } from 'node:http'
import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = path.join(root, 'public', 'photos', 'attractions')
const outDir = path.join(srcDir, 'thumbs')

const MAX_WIDTH = 800
const QUALITY = 0.75

const server = createServer(async (req, res) => {
  const name = decodeURIComponent(req.url.replace(/^\//, ''))
  // 빈 HTML 을 같은 오리진으로 내려준다. about:blank 에서 http 이미지를 읽으면
  // 디코딩 단계에서 막히고, 같은 오리진이라야 canvas 도 오염되지 않는다.
  if (!name) {
    res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' })
    res.end('<!doctype html><title>thumbs</title>')
    return
  }
  try {
    const body = await readFile(path.join(srcDir, name))
    res.writeHead(200, { 'content-type': 'image/jpeg' })
    res.end(body)
  } catch {
    res.writeHead(404)
    res.end()
  }
})
await new Promise((r) => server.listen(0, '127.0.0.1', r))
const { port } = server.address()

const files = (await readdir(srcDir)).filter((f) => f.endsWith('.jpg'))
await mkdir(outDir, { recursive: true })

const browser = await puppeteer.launch({ headless: 'new' })
try {
  const page = await browser.newPage()
  await page.goto(`http://127.0.0.1:${port}/`)

  let saved = 0
  for (const file of files) {
    const dataUrl = await page.evaluate(
      async (src, maxWidth, quality) => {
        const img = new Image()
        img.src = src
        await img.decode()
        const scale = Math.min(1, maxWidth / img.naturalWidth)
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.naturalWidth * scale)
        canvas.height = Math.round(img.naturalHeight * scale)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        return canvas.toDataURL('image/jpeg', quality)
      },
      file,
      MAX_WIDTH,
      QUALITY,
    )

    const buf = Buffer.from(dataUrl.split(',')[1], 'base64')
    const outFile = path.join(outDir, file)
    await writeFile(outFile, buf)
    const before = (await stat(path.join(srcDir, file))).size
    console.log(
      `  ${file}: ${(before / 1024).toFixed(0)} KB → ${(buf.length / 1024).toFixed(0)} KB`,
    )
    saved += before - buf.length
  }
  console.log(`✓ ${files.length}장 생성 (public/photos/attractions/thumbs) — ${(saved / 1024 / 1024).toFixed(1)} MB 절감`)
} finally {
  await browser.close()
  server.close()
}
