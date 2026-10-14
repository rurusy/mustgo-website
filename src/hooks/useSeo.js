import { useEffect } from 'react'
import { SITE } from '../data/site'

// 페이지별 <head> 를 런타임에 세팅한다.
//
// 이 사이트는 SPA 라서 /en 과 / 를 제외한 모든 경로의 <head> 가 index.html 의 것을
// 물려받는다. 빌드 때 scripts/prerender.mjs 가 렌더가 끝난 DOM 을 그대로 HTML 로
// 떠내므로, 이 훅이 넣은 태그가 정적 HTML 에 실린다 — 크롤러·광고 심사·소셜
// 스크래퍼는 JS 를 돌리지 않으니 그 HTML 이 사실상 페이지의 전부다.
//
// 규칙 두 가지:
//  1. 태그는 upsert — 같은 name/property 가 이미 있으면 content 만 갈아끼운다.
//     append 만 하면 index.html 의 한국어 메타와 중복돼 크롤러가 둘 중 무엇을
//     쓸지 알 수 없다.
//  2. JSON-LD 는 JSON.stringify 그대로(=한 줄) 넣는다. 네이버 ADVoost 진단이
//     줄 단위로 파싱해서, 들여쓴 JSON-LD 를 "구조화 데이터 없음"으로 읽는다
//     (CLAUDE.md "index.html head is single-line on purpose").
//
// 프리렌더는 html[data-seo="ready"] 가 뜰 때까지 기다린다. 이 훅이 끝나야 스냅샷을
// 찍는다는 신호라서, 메타가 비어 있는 HTML 이 떠지는 일이 없다.

const abs = (url) => (url?.startsWith('http') ? url : `${SITE}${url ?? ''}`)

function upsertMeta(attr, key, content) {
  if (!content) return
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function upsertLink(rel, href, hreflang) {
  const sel = hreflang ? `link[rel="${rel}"][hreflang="${hreflang}"]` : `link[rel="${rel}"]`
  let el = document.head.querySelector(sel)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    if (hreflang) el.setAttribute('hreflang', hreflang)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

export function useSeo({
  lang = 'ko',
  title,
  description,
  path,
  alternates,
  image,
  imageAlt,
  type = 'website',
  jsonLd,
}) {
  // 객체 리터럴을 매 렌더 새로 받으므로, 의존성은 직렬화한 값으로 비교한다.
  const key = JSON.stringify({ lang, title, description, path, alternates, image, imageAlt, type, jsonLd })

  useEffect(() => {
    const url = abs(path)

    document.documentElement.lang = lang
    if (title) document.title = title

    upsertMeta('name', 'description', description)
    upsertLink('canonical', url)

    if (alternates) {
      if (alternates.ko) upsertLink('alternate', abs(alternates.ko), 'ko')
      if (alternates.en) upsertLink('alternate', abs(alternates.en), 'en')
      // x-default 는 언어를 특정하지 못한 사용자가 받을 기본 페이지. 사이트의
      // 기본 언어가 한국어(루트)라서 한국어 경로를 가리킨다.
      if (alternates.ko) upsertLink('alternate', abs(alternates.ko), 'x-default')
    }

    upsertMeta('property', 'og:type', type)
    upsertMeta('property', 'og:locale', lang === 'en' ? 'en_US' : 'ko_KR')
    upsertMeta('property', 'og:url', url)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    if (image) {
      upsertMeta('property', 'og:image', abs(image))
      upsertMeta('property', 'og:image:alt', imageAlt)
      upsertMeta('name', 'twitter:image', abs(image))
    }
    upsertMeta('name', 'twitter:title', title)
    upsertMeta('name', 'twitter:description', description)

    let script = null
    if (jsonLd) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.seo = 'page'
      // 들여쓰기 없이 — 한 줄로 유지해야 한다 (위 주석 2번).
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }

    // 프리렌더 신호. 여기까지 왔으면 head 가 이 페이지의 것으로 채워져 있다.
    document.documentElement.setAttribute('data-seo', 'ready')

    return () => {
      // 다른 페이지로 넘어갈 때 이 페이지의 구조화 데이터는 반드시 걷어낸다.
      // 메타 태그는 다음 페이지의 useSeo 가 덮어쓰지만, JSON-LD 는 append 라서
      // 남겨두면 홈(index.html 의 Organization)과 섞여 두 개가 된다.
      script?.remove()
      document.documentElement.removeAttribute('data-seo')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])
}
