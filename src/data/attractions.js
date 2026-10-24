// 관광지 콘텐츠의 진입점. 도시별 파일(cities/*.js)을 모아 라우트·페이지·프리렌더·
// sitemap 이 함께 쓰는 목록과 경로 규칙을 제공한다. 도시를 추가하는 작업은
// cities/busan.js 를 만들고 아래 두 배열에 끼워 넣는 것으로 끝난다.
//
// node 스크립트(scripts/prerender.mjs, scripts/gen-sitemap.mjs)도 이 파일을 import
// 하므로 JSX 와 Vite 전용 구문(import.meta.env, ?url import 등)을 쓰지 않는다.
// 같은 이유로 상대 경로에는 확장자를 붙인다 — Node 는 확장자를 보완해주지 않는다.
//
// 경로 규칙 — 기존 사이트 규칙(한국어=루트, 영어=/en)을 그대로 확장한다.
//   한국어  /korea/seoul/            /korea/seoul/gyeongbokgung/
//   영어    /en/korea/seoul/         /en/korea/seoul/gyeongbokgung/
// 슬러그는 두 언어가 같은 영문을 쓴다. hreflang 을 1:1 로 묶고 라우트를 자동
// 생성하려면 경로가 언어 간에 대칭이어야 한다.

import { seoul, seoulAttractions } from './cities/seoul.js'
import { busan, busanAttractions } from './cities/busan.js'
import { jeju, jejuAttractions } from './cities/jeju.js'
import { gangwon, gangwonAttractions } from './cities/gangwon.js'
import { jeonju, jeonjuAttractions } from './cities/jeonju.js'
import { gyeongju, gyeongjuAttractions } from './cities/gyeongju.js'

export { SITE } from './site.js'

export const LANGS = ['ko', 'en']

// 언어별 홈 경로 — 빵부스러기(breadcrumb)와 CTA 링크가 쓴다.
export const homePath = (lang) => (lang === 'en' ? '/en' : '/')

export const cities = [seoul, busan, jeju, gangwon, jeonju, gyeongju]

export const attractions = [
  ...seoulAttractions,
  ...busanAttractions,
  ...jejuAttractions,
  ...gangwonAttractions,
  ...jeonjuAttractions,
  ...gyeongjuAttractions,
]

// 화면에서 도시 버튼을 두 줄로 묶는 단위. 페이지·주소는 도시마다 따로 두고(도시명 검색과
// 도시별 소개글 때문) 홈과 허브의 버튼만 묶는다. 도시 객체에 group 이 없으면 주요 도시다.
export const CITY_GROUPS = [
  { key: 'main', ko: '주요 도시', en: 'Major Cities' },
  { key: 'more', ko: '더 많은 지역', en: 'More Regions' },
]

export const citiesInGroup = (key) => cities.filter((c) => (c.group ?? 'main') === key)

// 카드용 축소본 경로. 원본은 1620px 라서 430px 짜리 카드에 그대로 쓰면 허브 한 장에
// 5.8MB 가 내려간다. scripts/make-thumbs.mjs 가 thumbs/ 에 800px 판을 만들어 둔다.
export const thumbFor = (photo) => photo.replace('/attractions/', '/attractions/thumbs/')

export const cityBySlug = (slug) => cities.find((c) => c.slug === slug)

export const attractionsInCity = (citySlug) => attractions.filter((a) => a.city === citySlug)

export function cityPath(lang, citySlug) {
  return `${lang === 'en' ? '/en' : ''}/korea/${citySlug}/`
}

export function attractionPath(lang, attraction) {
  return `${lang === 'en' ? '/en' : ''}/korea/${attraction.city}/${attraction.slug}/`
}

// 언어쌍 경로. hreflang alternate 와 sitemap 의 xhtml:link 가 쓴다.
export function pathAlternates(kind, arg) {
  const build = kind === 'city' ? cityPath : attractionPath
  return { ko: build('ko', arg), en: build('en', arg) }
}

// 이번에 추가되는 모든 경로. 프리렌더와 sitemap 이 이 목록만 보고 돈다.
// 기존 / 와 /en 은 index.html / gen-en-html.mjs 가 따로 관리하므로 포함하지 않는다.
export function contentRoutes() {
  const routes = []
  for (const city of cities) {
    for (const lang of LANGS) {
      routes.push({
        path: cityPath(lang, city.slug),
        lang,
        kind: 'city',
        // 프리렌더가 이 객체로 head 서술자(seo.js)를 만든다 — 경로에서 다시 찾지 않도록.
        city,
        alternates: pathAlternates('city', city.slug),
        lastmod: attractionsInCity(city.slug)[0]?.checkedOn ?? null,
      })
    }
  }
  for (const a of attractions) {
    for (const lang of LANGS) {
      routes.push({
        path: attractionPath(lang, a),
        lang,
        kind: 'attraction',
        attraction: a,
        alternates: pathAlternates('attraction', a),
        lastmod: a.checkedOn,
      })
    }
  }
  return routes
}
