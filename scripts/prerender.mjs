// Post-build step: 관광지·도시 라우트를 정적 HTML 로 떠낸다.
//
// Why: 이 사이트는 SPA 라서 HTML 에는 <div id="root"> 밖에 없다. 홈(/)과 /en 은
// index.html / gen-en-html.mjs 가 <head> 를 직접 챙겨주지만, 본문은 여전히 JS 가
// 그린다. 구글은 JS 를 실행하긴 해도 렌더링이 지연·누락될 수 있고, 네이버·광고
// 심사·소셜 스크래퍼는 아예 실행하지 않는다. 관광지 페이지는 "본문 텍스트"가
// 자산이므로 HTML 에 글이 들어 있어야 한다.
//
// How: `vite build --ssr` 이 만들어 둔 dist-ssr/entry-server.js 를 Node 에서 불러
// React 를 그대로 렌더하고, 빌드된 dist/index.html 을 템플릿 삼아 머리말을 갈아끼운다.
//
// 처음에는 헤드리스 크롬으로 실제 페이지를 띄워 DOM 을 떠냈다. 로컬에서는 잘 돌았지만
// 베르셀 빌드 컨테이너에서 크롬이 뜨지 않아 배포가 통째로 막혔다(2026-10-15). 브라우저를
// 쓰지 않으면 그 환경 의존이 사라진다 — 지금 방식은 Node 와 React 만 있으면 된다.
//
// 산출물은 dist/<route>/index.html 이고, Vercel 은 SPA rewrite 보다 실제 파일을
// 먼저 서빙하므로(vercel.json 의 /(.*) → /index.html 보다 우선) 크롤러는 이 HTML 을
// 받는다. 브라우저는 같은 HTML 에 들어 있는 /assets/*.js 로 그대로 앱이 된다.
//
// 알아둘 점:
//  - React 는 기존 DOM 위에 hydrate 하지 않고 다시 그린다(createRoot). 내용이
//    동일하므로 눈에 띄는 차이는 없지만, 진짜 hydration 이 필요해지면 그때
//    hydrateRoot 로 바꿔야 한다.
//  - <head> 의 모든 태그는 한 줄로 유지한다. 네이버 ADVoost 진단이 줄 단위로 파싱해서,
//    줄이 나뉜 태그를 "없는 것"으로 읽는다 (index.html 상단 주석 참고).
//  - 라우트 목록과 head 내용은 src/data/attractions.js 와 src/data/seo.js 가 유일한
//    출처다. 여기에 경로나 문구를 다시 적지 않는다.
//
// Fail-fast: 치환이 하나라도 빗나가면 빌드를 세운다. index.html 머리말이 바뀌었는데
// 조용히 옛 메타를 단 페이지를 배포하는 것보다 낫다.

import { readFile, writeFile, mkdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { contentRoutes } from '../src/data/attractions.js'
import { seoForAttraction, seoForCity } from '../src/data/seo.js'
import { SITE } from '../src/data/site.js'

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const ssrEntry = path.join(root, 'dist-ssr', 'entry-server.js')

// 이 두 파일은 index.html 과 gen-en-html.mjs 가 관리한다. 프리렌더가 덮어쓰면
// 네이버 진단용으로 한 줄로 유지한 <head> 와 영어 OG 가 날아간다.
const PROTECTED = ['index.html', path.join('en', 'index.html')]

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
if (!(await exists(ssrEntry))) {
  throw new Error(
    'prerender: dist-ssr/entry-server.js 가 없습니다. ' +
      '`vite build --ssr src/entry-server.jsx --outDir dist-ssr` 가 먼저 돌아야 합니다.',
  )
}

const { render } = await import(pathToFileURL(ssrEntry).href)
const template = await readFile(indexHtml, 'utf8')

const escapeAttr = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')

const abs = (url) => (url?.startsWith('http') ? url : `${SITE}${url ?? ''}`)

// [라벨, 찾을 정규식, 바꿀 문자열]. 하나라도 안 맞으면 빌드를 세운다.
function substitutions(seo) {
  const url = abs(seo.path)
  const title = escapeAttr(seo.title)
  const description = escapeAttr(seo.description)
  const image = seo.image ? abs(seo.image) : null
  const imageAlt = seo.imageAlt ? escapeAttr(seo.imageAlt) : null

  const subs = [
    ['lang', /lang="ko"/, `lang="${seo.lang}"`],
    ['title', /<title>[^<]*<\/title>/, `<title>${title}</title>`],
    ['description', /(name="description" content=")[^"]*(")/, `$1${description}$2`],
    ['canonical', /(rel="canonical" href=")[^"]*(")/, `$1${url}$2`],
    [
      'hreflang ko',
      /(hreflang="ko" href=")[^"]*(")/,
      `$1${abs(seo.alternates.ko)}$2`,
    ],
    [
      'hreflang en',
      /(hreflang="en" href=")[^"]*(")/,
      `$1${abs(seo.alternates.en)}$2`,
    ],
    [
      'hreflang x-default',
      /(hreflang="x-default" href=")[^"]*(")/,
      `$1${abs(seo.alternates.ko)}$2`,
    ],
    ['og:type', /(property="og:type" content=")[^"]*(")/, `$1${seo.type}$2`],
    [
      'og:locale',
      /(property="og:locale" content=")[^"]*(")/,
      `$1${seo.lang === 'en' ? 'en_US' : 'ko_KR'}$2`,
    ],
    ['og:url', /(property="og:url" content=")[^"]*(")/, `$1${url}$2`],
    ['og:title', /(property="og:title" content=")[^"]*(")/, `$1${title}$2`],
    ['og:description', /(property="og:description" content=")[^"]*(")/, `$1${description}$2`],
    ['twitter:title', /(name="twitter:title" content=")[^"]*(")/, `$1${title}$2`],
    ['twitter:description', /(name="twitter:description" content=")[^"]*(")/, `$1${description}$2`],
  ]

  if (image) {
    subs.push(
      ['og:image', /(property="og:image" content=")[^"]*(")/, `$1${image}$2`],
      ['og:image:alt', /(property="og:image:alt" content=")[^"]*(")/, `$1${imageAlt}$2`],
      ['twitter:image', /(name="twitter:image" content=")[^"]*(")/, `$1${image}$2`],
      // 홈의 OG 이미지(2400×1260) 치수는 관광지 사진에 맞지 않는다. 치수를 틀리게
      // 알리느니 빼는 편이 낫다 — 선택 항목이다.
      ['og:image:width 제거', /\s*<meta property="og:image:width"[^>]*>/, ''],
      ['og:image:height 제거', /\s*<meta property="og:image:height"[^>]*>/, ''],
    )
  }

  return subs
}

const routes = contentRoutes()
let written = 0

for (const route of routes) {
  const out = path.join(dist, route.path, 'index.html')
  const rel = path.relative(dist, out)
  if (PROTECTED.includes(rel)) {
    throw new Error(`prerender: ${rel} 은 보호 대상입니다. 라우트 경로를 확인하세요.`)
  }

  const seo =
    route.kind === 'city'
      ? seoForCity(route.city, route.lang)
      : seoForAttraction(route.attraction, route.lang)

  let html = template
  for (const [label, re, replacement] of substitutions(seo)) {
    // "바뀌었는지"가 아니라 "찾았는지"로 판정한다. 한국어 페이지의 lang="ko" 처럼
    // 원본과 대체값이 같은 경우가 있어서, 결과 비교로는 멀쩡한 치환을 실패로 읽는다.
    if (!re.test(html)) {
      throw new Error(
        `prerender: "${label}" 치환이 ${route.path} 에서 빗나갔습니다. ` +
          'index.html 머리말이 바뀌었다면 scripts/prerender.mjs 도 함께 고쳐야 합니다.',
      )
    }
    html = html.replace(re, replacement)
  }

  // 페이지별 구조화 데이터. index.html 의 TravelAgency 블록은 그대로 두고 덧붙인다.
  // 한 줄로 — 들여쓴 JSON-LD 는 네이버 진단이 "구조화 데이터 없음"으로 읽는다.
  const ld = JSON.stringify(seo.jsonLd).replace(/</g, '\\u003c')
  html = html.replace(
    '</head>',
    `  <script type="application/ld+json">${ld}</script>\n  </head>`,
  )

  const markup = render(route.path)
  const withBody = html.replace('<div id="root"></div>', `<div id="root">${markup}</div>`)
  if (withBody === html) {
    throw new Error('prerender: dist/index.html 에서 <div id="root"></div> 를 찾지 못했습니다.')
  }

  await mkdir(path.dirname(out), { recursive: true })
  await writeFile(out, withBody, 'utf8')
  written += 1
  console.log(
    `  ${route.path} → ${rel.replace(/\\/g, '/')} (${(withBody.length / 1024).toFixed(0)} KB)`,
  )
}

console.log(`✓ Prerendered ${written} route(s) to static HTML`)
