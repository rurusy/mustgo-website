import { Link } from 'react-router-dom'
import { cn } from '../design/cn'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Footer as EnFooter } from '../components/layout/en/Footer'
import { Section, Button, Card, Fade } from '../components/ui'
import { AttractionCard } from '../components/marketing/AttractionCard'
import { useSeo } from '../hooks/useSeo'
import { breadcrumbHome, listTitleFor, seoForCity } from '../data/seo'
import { attractionPath, attractionsInCity, homePath, thumbFor } from '../data/attractions'

// 도시 허브. 관광지 상세 페이지들의 입구이고, 홈에서 이 페이지로 링크가 들어온다.
// 색인 경로가 홈 → 도시 허브 → 관광지 상세로 이어져야 새 페이지가 발견된다.
const COPY = {
  ko: {
    eyebrow: '한국 여행',
    quote: '맞춤 견적 요청',
    quoteLead: '보고 계신 관광지를 포함해 일정을 짜드립니다. 날짜와 인원만 알려주셔도 됩니다.',
    quoteButton: '견적 요청하기',
    quoteNote: '영업일 1일 이내 회신',
    closingTitle: (city) => `${city} 일정, 직접 짜드립니다`,
    closingLead:
      '마음에 두신 곳을 알려주시면 동선과 차량, 식사까지 묶어 초안 일정과 견적을 만들어 드립니다. 정해진 상품을 고르는 방식이 아니라, 방문 목적과 일정에 맞춰 처음부터 설계합니다.',
    closingButton: '일정·견적 상담하기',
  },
  en: {
    eyebrow: 'Travel in Korea',
    quote: 'Request a custom quote',
    quoteLead: 'We build the itinerary around the places that interest you. Dates and party size are enough to start.',
    quoteButton: 'Request a quote',
    quoteNote: 'Reply within one business day',
    closingTitle: (city) => `We plan the ${city} itinerary for you`,
    closingLead:
      'Tell us which places interest you. We plan the route, the vehicles and the dining around them, then send a draft itinerary with a quote. Nothing is taken off a fixed package — the schedule is built around the purpose of the visit.',
    closingButton: 'Talk to a consultant',
  },
}

export default function CityPage({ city, lang = 'ko' }) {
  const t = city[lang]
  const c = COPY[lang]
  const list = attractionsInCity(city.slug)

  // head 는 빌드(프리렌더)와 브라우저가 같은 서술자를 쓴다 — src/data/seo.js
  useSeo(seoForCity(city, lang))

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
          <nav aria-label="breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-gray-500">
              <li>
                <Link to={homePath(lang)} className="hover:text-amber-600 transition-colors">
                  {breadcrumbHome(lang)}
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300">
                /
              </li>
              <li className="text-gray-700 font-medium">{t.name}</li>
            </ol>
          </nav>
          <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-10 lg:gap-16 items-start">
            <Fade className="max-w-3xl">
              {/* font-eng(Inter)는 영문 전용. 한국어에 씌우면 폴백 폰트로 떨어진다. */}
              <p
                className={cn(
                  'text-sm font-bold text-gray-400 mb-4',
                  lang === 'en' && 'font-eng uppercase tracking-wide2',
                )}
              >
                {c.eyebrow}
              </p>
              <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-6">
                {t.name}
              </h1>
              <p className="text-base lg:text-lg text-gray-600 leading-[1.8]">{t.lead}</p>
            </Fade>

            <Fade delay={0.1}>
              <Card>
                <h2 className="text-lg font-bold text-gray-900 mb-3">{c.quote}</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">{c.quoteLead}</p>
                <Button as={Link} to={`${homePath(lang)}#contact`} className="w-full">
                  {c.quoteButton}
                </Button>
                <p className="mt-4 text-xs text-gray-400 text-center">{c.quoteNote}</p>
              </Card>
            </Fade>
          </div>
        </Section>

        <Section tone="light" pad="flush" className="pb-20 lg:pb-28">
          <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mb-8">
            {listTitleFor(lang, t.name)}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((a, i) => (
              <Fade key={a.slug} delay={i * 0.05}>
                <AttractionCard
                  to={attractionPath(lang, a)}
                  image={thumbFor(a.photo)}
                  alt={a[lang].imageAlt}
                  name={a[lang].name}
                  tagline={a[lang].tagline}
                  font={lang === 'en' ? 'eng' : 'sans'}
                />
              </Fade>
            ))}
          </div>
        </Section>

        {/*
          상단 견적 카드와 같은 곳으로 보내지만 문구는 겹치지 않게 둔다. 위는 바로
          요청하려는 사람을 받는 창구고, 여기는 관광지를 다 둘러본 뒤 읽는 마무리다.
        */}
        <Section tone="charcoal" pad="tight">
          <Fade className="max-w-2xl">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-4">
              {c.closingTitle(t.name)}
            </h2>
            <p className="text-gray-300 leading-[1.8] mb-8">{c.closingLead}</p>
            <Button as={Link} to={`${homePath(lang)}#contact`} size="lg">
              {c.closingButton}
            </Button>
          </Fade>
        </Section>
      </main>
      <PageFooter />
    </>
  )
}
