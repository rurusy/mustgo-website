// Post-build step: dist/sitemap.xml 을 생성한다.
//
// Why: 손으로 쓴 public/sitemap.xml 로는 관광지 페이지를 따라갈 수 없다. URL 이
// 수십 개로 늘어나는데 목록을 사람이 관리하면 반드시 어긋난다 — 빠진 URL 은 색인이
// 안 되고, 지운 URL 이 남아 있으면 Search Console 에 오류로 잡힌다. 그래서 라우트와
// 같은 출처(src/data/attractions.js)에서 찍어낸다.
//
// public/sitemap.xml 은 이 스크립트로 대체되어 삭제했다. 생성물은 dist 에만 있고,
// robots.txt 가 가리키는 /sitemap.xml 경로는 그대로다.
//
// hreflang: 한 URL 의 <url> 안에 ko / en / x-default 세 개를 함께 넣는다. 두 언어가
// 같은 슬러그를 쓰기 때문에 짝을 기계적으로 만들 수 있다 (attractions.js 의 경로 규칙).

import { writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { SITE, contentRoutes } from '../src/data/attractions.js'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const out = path.join(root, 'dist', 'sitemap.xml')

// 기존 두 URL. 홈과 영어 홈은 콘텐츠 데이터에 속하지 않으므로 여기 명시한다.
// lastmod 는 실제로 내용이 바뀐 날짜를 유지한다 (빌드일로 덮어쓰면 거짓 신호).
const STATIC = [
  {
    path: '/',
    alternates: { ko: '/', en: '/en' },
    lastmod: '2026-07-09',
    changefreq: 'monthly',
    priority: '1.0',
  },
  {
    path: '/en',
    alternates: { ko: '/', en: '/en' },
    lastmod: '2026-07-09',
    changefreq: 'monthly',
    priority: '0.9',
  },
]

const PRIORITY = { city: '0.8', attraction: '0.7' }

const abs = (p) => `${SITE}${p}`

const entries = [
  ...STATIC,
  ...contentRoutes().map((r) => ({
    path: r.path,
    alternates: r.alternates,
    lastmod: r.lastmod,
    changefreq: 'monthly',
    priority: PRIORITY[r.kind] ?? '0.5',
  })),
]

const urlBlock = (e) => {
  const lines = [`  <url>`, `    <loc>${abs(e.path)}</loc>`]
  if (e.alternates?.ko) {
    lines.push(`    <xhtml:link rel="alternate" hreflang="ko" href="${abs(e.alternates.ko)}" />`)
  }
  if (e.alternates?.en) {
    lines.push(`    <xhtml:link rel="alternate" hreflang="en" href="${abs(e.alternates.en)}" />`)
  }
  if (e.alternates?.ko) {
    lines.push(
      `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(e.alternates.ko)}" />`,
    )
  }
  if (e.lastmod) lines.push(`    <lastmod>${e.lastmod}</lastmod>`)
  lines.push(`    <changefreq>${e.changefreq}</changefreq>`)
  lines.push(`    <priority>${e.priority}</priority>`)
  lines.push(`  </url>`)
  return lines.join('\n')
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.map(urlBlock).join('\n')}
</urlset>
`

await writeFile(out, xml, 'utf8')
console.log(`✓ Wrote dist/sitemap.xml (${entries.length} URLs)`)
