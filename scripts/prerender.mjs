// Post-build step: 관광지·도시 라우트를 정적 HTML 로 떠낸다.
//
// Why: 이 사이트는 SPA 라서 HTML 에는 <div id="root"> 밖에 없다. 홈(/)과 /en 은
// index.html / gen-en-html.mjs 가 <head> 를 직접 챙겨주지만, 본문은 여전히 JS 가
// 그린다. 구글은 JS 를 실행하긴 해도 렌더링이 지연·누락될 수 있고, 네이버·광고
// 심사·소셜 스크래퍼는 아예 실행하지 않는다. 관광지 페이지는 "본문 텍스트"가
// 자산이므로 HTML 에 글이 들어 있어야 한다.
//
// How: 빌드된 dist 를 로컬 서버로 띄우고, 헤드리스 Chrome 으로 각 라우트를 열어
// 렌더가 끝난 DOM 을 그대로 파일로 쓴다. 프레임워크 교체(Next/Astro) 없이
// puppeteer(이미 OG 이미지 생성에 쓰고 있다) 하나로 끝난다.
//
// 산출물은 dist/<route>/index.html 이고, Vercel 은 SPA rewrite 보다 실제 파일을
// 먼저 서빙하므로(vercel.json 의 /(.*) → /index.html 보다 우선) 크롤러는 이 HTML 을
// 받는다. 브라우저는 같은 HTML 에 들어 있는 /assets/*.js 로 그대로 앱이 된다.
//
// 알아둘 점:
//  - React 는 기존 DOM 위에 hydrate 하지 않고 다시 그린다(createRoot). 내용이
//    동일하므로 눈에 띄는 차이는 없지만, 진짜 hydration 이 필요해지면 그때
//    hydrateRoot 로 바꿔야 한다.
//  - .ds-fade 는 IntersectionObserver 가 is-visible 을 붙이기 전까지 opacity:0 이다.
//    스냅샷 전에 전부 is-visible 로 만들어 둔다 — 안 그러면 크롤러가 본문을
//    "숨겨진 콘텐츠"로 본다.
//  - 라우트 목록은 src/data/attractions.js 가 유일한 출처다. 여기에 경로를 다시
//    적지 않는다.
//
// Fail-fast: 라우트 하나라도 렌더 신호(html[data-seo="ready"])를 못 내면 빌드를
// 세운다. 메타가 빈 HTML 을 조용히 배포하는 것보다 낫다.

import { createServer } from 'node:http'
import { readFile, writeFile, mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'
import { contentRoutes } from '../src/data/attractions.js'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')

// 이 두 파일은 index.html 과 gen-en-html.mjs 가 관리한다. 프리렌더가 덮어쓰면
// 네이버 진단용으로 한 줄로 유지한 <head> 와 영어 OG 가 날아간다.
const PROTECTED = ['index.html', path.join('en', 'index.html')]

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
}

const exists = async (p) => {
  try {
    return (await stat(p)).isFile()
  } catch {
    return false
  }
}

const indexHtml = path.join(dist, 'index.html')
if (!(await exists(indexHtml))) {
  throw new Error('prerender: dist/index.html 이 없습니다. vite build 가 먼저 돌아야 합니다.')
}

// dist 를 그대로 서빙하고, 없는 경로는 index.html 로 떨군다(SPA fallback).
// 프리렌더 대상 경로는 아직 파일이 없으므로 전부 이 fallback 을 타고 React 가 그린다.
const server = createServer(async (req, res) => {
  const urlPath = decodeURIComponent(req.url.split('?')[0])
  const candidate = urlPath.endsWith('/')
    ? path.join(dist, urlPath, 'index.html')
    : path.join(dist, urlPath)
  const file = (await exists(candidate)) ? candidate : indexHtml
  try {
    const body = await readFile(file)
    res.writeHead(200, { 'content-type': MIME[path.extname(file)] ?? 'application/octet-stream' })
    res.end(body)
  } catch (err) {
    res.writeHead(500)
    res.end(String(err))
  }
})

await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve))
const { port } = server.address()

const routes = contentRoutes()
// CI(베르셀) 빌드 컨테이너는 root 로 돌고 /dev/shm 이 매우 작다. 두 플래그가 없으면
// 크롬이 아예 뜨지 않아 빌드가 통째로 실패한다 — 로컬에서는 넣어도 동작이 같다.
let browser
try {
  browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })
} catch (err) {
  throw new Error(
    `prerender: 헤드리스 크롬을 띄우지 못했습니다 (${err.message}). ` +
      '빌드 환경에 puppeteer 의 크롬이 설치돼 있는지 확인하세요 — 설치 단계에서 ' +
      'PUPPETEER_SKIP_DOWNLOAD 가 켜져 있으면 받아오지 않습니다.',
  )
}

try {
  const page = await browser.newPage()
  await page.setViewport({ width: 1280, height: 900 })

  for (const route of routes) {
    const out = path.join(dist, route.path, 'index.html')
    const rel = path.relative(dist, out)
    if (PROTECTED.includes(rel)) {
      throw new Error(`prerender: ${rel} 은 보호 대상입니다. 라우트 경로를 확인하세요.`)
    }

    await page.goto(`http://127.0.0.1:${port}${route.path}`, { waitUntil: 'networkidle0' })
    // useSeo 가 <head> 를 다 채운 뒤에 붙이는 신호. 이걸 기다려야 메타가 실린다.
    await page.waitForSelector('html[data-seo="ready"]', { timeout: 20000 })

    const html = await page.evaluate(() => {
      // 스크롤 전이라 아직 안 보이는 fade 요소를 모두 드러낸다.
      document.querySelectorAll('.ds-fade').forEach((el) => el.classList.add('is-visible'))
      // 신호용 속성은 산출물에 남기지 않는다.
      document.documentElement.removeAttribute('data-seo')
      return `<!doctype html>\n${document.documentElement.outerHTML}`
    })

    await mkdir(path.dirname(out), { recursive: true })
    await writeFile(out, html, 'utf8')
    console.log(`  ${route.path} → ${rel.replace(/\\/g, '/')} (${(html.length / 1024).toFixed(0)} KB)`)
  }

  console.log(`✓ Prerendered ${routes.length} route(s) to static HTML`)
} finally {
  await browser.close()
  server.close()
}
