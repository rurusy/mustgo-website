// 콘텐츠 페이지의 <head> 를 만드는 단일 출처.
//
// 같은 값을 두 곳이 쓴다:
//   - 브라우저: 페이지 컴포넌트가 useSeo() 에 그대로 넘겨 SPA 이동 때 head 를 갱신
//   - 빌드: scripts/prerender.mjs 가 이 서술자로 정적 HTML 의 head 를 찍는다
// 그래서 이 파일에는 React 도 DOM 도 들어오면 안 된다 — Node 가 그냥 import 한다.

import { SITE } from './site.js'
import {
  attractionPath,
  attractionsInCity,
  cityBySlug,
  cityPath,
  homePath,
  pathAlternates,
} from './attractions.js'

const abs = (p) => `${SITE}${p}`

// 빵부스러기의 첫 항목. 화면(페이지 컴포넌트)과 구조화 데이터가 같은 말을 써야 해서
// 여기 둔다.
export const breadcrumbHome = (lang) => (lang === 'en' ? 'Home' : '홈')

// 도시 허브의 목록 제목. 화면 제목과 ItemList 의 name 이 어긋나지 않도록 공유한다.
export const listTitleFor = (lang, cityName) =>
  lang === 'en' ? `Highlights of ${cityName}` : `${cityName} 주요 관광지`

export function seoForCity(city, lang) {
  const t = city[lang]
  const path = cityPath(lang, city.slug)
  const list = attractionsInCity(city.slug)

  return {
    lang,
    title: t.title,
    description: t.description,
    path,
    alternates: pathAlternates('city', city.slug),
    image: list[0]?.photo,
    imageAlt: list[0]?.[lang].imageAlt,
    type: 'website',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: breadcrumbHome(lang),
            item: abs(homePath(lang)),
          },
          { '@type': 'ListItem', position: 2, name: t.name, item: abs(path) },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: listTitleFor(lang, t.name),
        itemListElement: list.map((a, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: a[lang].name,
          url: abs(attractionPath(lang, a)),
        })),
      },
    ],
  }
}

export function seoForAttraction(attraction, lang) {
  const t = attraction[lang]
  const city = cityBySlug(attraction.city)
  const cityName = city[lang].name
  const path = attractionPath(lang, attraction)

  const crumbs = [
    { name: breadcrumbHome(lang), path: homePath(lang) },
    { name: cityName, path: cityPath(lang, attraction.city) },
    { name: t.name, path },
  ]

  return {
    lang,
    title: t.title,
    description: t.description,
    path,
    alternates: pathAlternates('attraction', attraction),
    image: attraction.photo,
    imageAlt: t.imageAlt,
    // 관광지 페이지는 읽을거리라 article. 허브와 홈은 website 로 둔다.
    type: 'article',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'TouristAttraction',
        name: t.name,
        description: t.description,
        url: abs(path),
        image: abs(attraction.photo),
        address: {
          '@type': 'PostalAddress',
          addressLocality: cityName,
          addressCountry: 'KR',
        },
        touristType: lang === 'en' ? 'VIP and corporate visitors' : '기업·VIP 방한객',
      },
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((crumb, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: crumb.name,
          item: abs(crumb.path),
        })),
      },
    ],
  }
}
