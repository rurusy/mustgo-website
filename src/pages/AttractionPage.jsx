import { Link } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Footer as EnFooter } from '../components/layout/en/Footer'
import { Section, Button, Fade } from '../components/ui'
import { CheckList } from '../components/marketing/DetailCard'
import { useSeo } from '../hooks/useSeo'
import { breadcrumbHome, seoForAttraction } from '../data/seo'
import { cityBySlug, cityPath, homePath } from '../data/attractions'

// 관광지 상세 페이지. 하나의 컴포넌트가 두 언어를 모두 렌더한다 — 레이아웃은 같고
// 문안만 attraction[lang] 에서 갈라지므로, 언어별 컴포넌트를 따로 두면 레이아웃
// 수정이 두 곳으로 번진다 (sections/en/ 과 달리 이 페이지는 구조가 완전히 동일).
const COPY = {
  ko: {
    about: '명소 소개',
    info: '방문 정보',
    planning: '의전 투어 설계 포인트',
    checkedPrefix: '운영 정보 기준',
    quoteLead: '이 관광지를 포함한 일정을 원하시면, 인원과 날짜만 알려주셔도 됩니다. 영업일 1일 안에 담당자가 초안 일정과 견적을 보내드립니다.',
    quoteTitle: '맞춤 견적 요청',
    backToCity: (city) => `${city} 전체 보기 →`,
    photoPrefix: '사진',
  },
  en: {
    about: 'About',
    info: 'Visitor information',
    planning: 'Private tour planning notes',
    checkedPrefix: 'Information verified',
    quoteLead: 'Tell us the dates and the size of your party — that is enough to start. We reply with a draft itinerary and a quote within one business day.',
    quoteTitle: 'Request a custom quote',
    backToCity: (city) => `See all of ${city} →`,
    photoPrefix: 'Photo',
  },
}

function Breadcrumb({ items }) {
  return (
    <nav aria-label="breadcrumb" className="mb-6">
      <ol className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
        {items.map((item, i) => (
          <li key={item.href ?? item.label} className="flex items-center gap-2">
            {i > 0 && (
              <span aria-hidden="true" className="text-gray-300">
                /
              </span>
            )}
            {item.href ? (
              <Link to={item.href} className="hover:text-amber-600 transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-700 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default function AttractionPage({ attraction, lang = 'ko' }) {
  const t = attraction[lang]
  const c = COPY[lang]
  const city = cityBySlug(attraction.city)
  const cityName = city[lang].name

  const crumbs = [
    { label: breadcrumbHome(lang), href: homePath(lang) },
    { label: cityName, href: cityPath(lang, attraction.city) },
    { label: t.name },
  ]

  // head 는 빌드(프리렌더)와 브라우저가 같은 서술자를 쓴다 — src/data/seo.js
  useSeo(seoForAttraction(attraction, lang))

  const PageFooter = lang === 'en' ? EnFooter : Footer

  return (
    <>
      <Header lang={lang} />
      {/*
        break-keep(word-break: keep-all) — 한국어는 기본값이면 글자 단위로 줄을 끊어
        "15 / 분", "경복 / 궁" 처럼 갈라진다. 어절 단위로만 끊도록 바꾼다.
        word-break 는 상속되므로 여기 한 번만 건다.
      */}
      <main className="break-keep">
        <Section tone="light" pad="flush" className="pt-32 pb-12 lg:pt-36 lg:pb-16">
          <Breadcrumb items={crumbs} />
          {/*
            제목 줄은 /group-travel/·/btms/ 의 상세 카드(DetailCard)와 같은 짜임으로 맞췄다(2026-11-20):
            주황 영문 라벨(도시) → 제목 → 작은 회색 부제 + 주황 세로선. 부제를 크게 두면 제목과 다퉜다.
          */}
          <Fade className="max-w-3xl">
            <p className="text-xs font-eng font-semibold text-amber-600 uppercase tracking-wide2 mb-3">
              {city.en.name}
            </p>
            <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              {t.name}
            </h1>
            <p className="text-[15px] lg:text-base text-gray-500 leading-relaxed border-l-2 border-amber-500 pl-3">
              {t.tagline}
            </p>
          </Fade>
        </Section>

        <Section tone="light" pad="flush">
          <Fade>
            <figure>
              {/*
                배경 이미지(CSS)가 아니라 <img> 로 둔다 — alt 가 색인되고, 프리렌더된
                HTML 만 읽는 크롤러도 이 사진을 페이지의 대표 이미지로 인식한다.
              */}
              <img
                src={attraction.photo}
                alt={t.imageAlt}
                fetchPriority="high"
                decoding="async"
                width="1620"
                height="1080"
                className="w-full h-[320px] lg:h-[520px] object-cover rounded-lg"
              />
              <figcaption className="mt-3 text-[11px] text-gray-400">
                {c.photoPrefix} {attraction.photoCredit} · {attraction.photoLicense}
              </figcaption>
            </figure>
          </Fade>
        </Section>

        <Section tone="light" pad="tight">
          {/*
            본문과 방문 정보를 같은 흰 카드 두 장으로 나란히 두고 높이를 맞춘다(grid 기본값 stretch + h-full).
            예전엔 본문이 맨살 글이라 카드와 윗선(카드 안 제목만큼)·아랫선(본문이 짧음)이 어긋났고,
            본문 폭을 max-w-2xl 로 묶어 두 칸 사이가 크게 비었다(2026-11-20 지적).
          */}
          <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-6 lg:gap-8">
            <Fade as="div">
              <div className="h-full bg-white rounded-lg border border-gray-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-5">{c.about}</h2>
                {t.body.map((para) => (
                  <p key={para.slice(0, 24)} className="text-[15px] lg:text-base text-gray-600 leading-[1.9] mb-5 last:mb-0">
                    {para}
                  </p>
                ))}
              </div>
            </Fade>

            <Fade as="aside" delay={0.1}>
              {/* 상세 카드와 같은 흰 카드. 항목 이름은 진한 파랑(marketing/DetailCard 의 DetailLabel 과 같은 글씨) — 연회색은 안 읽혔다. */}
              <div className="h-full flex flex-col bg-white rounded-lg border border-gray-100 shadow-sm p-6 sm:p-8">
                <h2 className="text-lg font-bold text-gray-900 mb-5">{c.info}</h2>
                <dl className="space-y-4 mb-6">
                  {t.facts.map(([label, value]) => (
                    <div key={label}>
                      <dt className="text-[13px] font-bold text-brand-blue-ink mb-1">{label}</dt>
                      <dd className="text-[15px] text-gray-800 leading-relaxed">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-auto pt-4 border-t border-gray-100 text-xs text-gray-400">
                  {c.checkedPrefix} {attraction.checkedOn}
                </p>
              </div>
            </Fade>
          </div>
        </Section>

        <Section tone="soft" pad="tight">
          <Fade className="max-w-3xl">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mb-8">
              {c.planning}
            </h2>
            {/* 흰 카드 안 파란 체크 목록(CheckList) — /group-travel/ '준비해 드리는 것'과 같은 모양. */}
            <div className="bg-white rounded-lg border border-gray-100 shadow-sm p-6 sm:p-8">
              <CheckList items={t.planning} />
            </div>
          </Fade>
        </Section>

        <Section tone="charcoal" pad="tight">
          <Fade className="max-w-2xl">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-4">
              {c.quoteTitle}
            </h2>
            <p className="text-gray-300 leading-[1.8] mb-8">{c.quoteLead}</p>
            <div className="flex flex-wrap gap-4">
              {/*
                전용 견적 페이지(/en/plan-my-trip/)가 생기기 전까지는 홈의 문의
                섹션으로 보낸다. 관광지 자동 입력은 그 페이지와 함께 붙인다.
              */}
              <Button as={Link} to={`${homePath(lang)}#contact`} size="lg">
                {t.cta}
              </Button>
              <Button
                as={Link}
                to={cityPath(lang, attraction.city)}
                variant="outlineLight"
                size="lg"
              >
                {c.backToCity(cityName)}
              </Button>
            </div>
          </Fade>
        </Section>
      </main>
      <PageFooter />
    </>
  )
}
