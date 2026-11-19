import { Link } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Section, Button, Card, Fade } from '../components/ui'
import { cn } from '../design/cn'
import { DetailCard, DetailLabel, CheckList } from '../components/marketing/DetailCard'
import { JumpNav } from '../components/marketing/JumpNav'
import { useSeo } from '../hooks/useSeo'
import { breadcrumbHome, seoForGroupTravel } from '../data/seo'
import { homePath } from '../data/attractions'
import {
  GROUP_FAQ,
  GROUP_SERVICES,
  GROUP_STEPS,
  GROUP_SUPPORT,
  GROUP_TRAVEL,
} from '../data/groupTravel'

// 기업 인센티브·단체여행 상세(/group-travel/). 한국어 전용.
//
// 홈의 #group 섹션이 요약이고, 이 페이지는 서비스마다 '이런 분께'와 '준비하는 것'을
// 펼쳐 둔다 — 검색(네이버·구글)과 파워링크 광고의 착지 주소로 쓰려는 페이지라 본문이
// 정적 HTML 에 들어 있어야 한다(scripts/prerender.mjs 가 떠낸다).
//
// 문안과 사실은 src/data/groupTravel.js 한 곳에 있다. 여기서는 배치만 한다.

// 견적 버튼은 홈의 문의 폼으로 보낸다. 이 페이지에서는 Contact 가 아직 없어 prefill
// 이벤트를 쏠 수 없으므로, 라우터 state 로 문의 유형을 실어 보낸다(Contact.jsx 참고).
const QUOTE_LINK = { to: `${homePath('ko')}#contact`, state: { inquiryType: 'group' } }

// 서비스 글 카드. 모양은 marketing/DetailCard(/btms/ 와 같은 카드), 여기서는 내용만 채운다.
function ServiceText({ s }) {
  return (
    <DetailCard
      eyebrow={s.eyebrow}
      title={s.name}
      lead={s.tagline}
      back={{ href: '#service-jump', label: '서비스 목록으로' }}
    >
      <DetailLabel className="mb-1.5">이런 분께</DetailLabel>
      <p className="text-[15px] text-gray-800 leading-relaxed mb-6">{s.forWhom}</p>
      <DetailLabel className="mb-2.5">준비해 드리는 것</DetailLabel>
      <CheckList items={s.prepares} />
      {s.note && (
        // note 는 [모든 지역 가능, 주력 지역] — 주력 쪽만 주황으로 짚는다.
        <div className="flex flex-wrap gap-2 mt-7">
          {s.note.map((part, i) => (
            <span
              key={part}
              className={cn('rounded-full px-3 py-1 text-[13px]', i === 0 ? 'bg-gray-100 text-gray-700' : 'bg-amber-50 text-amber-700')}
            >
              {part}
            </span>
          ))}
        </div>
      )}
    </DetailCard>
  )
}

export default function GroupTravelPage() {
  useSeo(seoForGroupTravel())

  return (
    <>
      <Header lang="ko" />
      {/* break-keep — 한국어를 어절 단위로만 줄바꿈한다(CLAUDE.md "Korean / English mixing"). */}
      <main className="break-keep">
        <Section tone="light" pad="flush" className="pt-32 pb-16 lg:pt-36 lg:pb-24">
          <nav aria-label="breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-gray-500">
              <li>
                <Link to={homePath('ko')} className="hover:text-amber-600 transition-colors">
                  {breadcrumbHome('ko')}
                </Link>
              </li>
              <li aria-hidden="true" className="text-gray-300">
                /
              </li>
              <li className="text-gray-700 font-medium">{GROUP_TRAVEL.name}</li>
            </ol>
          </nav>

          {/* 폰에서는 견적 카드를 서비스 바로가기 뒤로 보낸다 — CityPage 와 같은 이유(첫 화면을 카드가 다 차지). */}
          <div className="flex flex-col gap-10 lg:grid lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-x-16 lg:items-start">
            <Fade className="lg:col-start-1 lg:row-start-1">
              <p className="text-sm font-eng font-bold uppercase tracking-wide2 text-gray-400 mb-4">
                {GROUP_TRAVEL.eyebrow}
              </p>
              <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-4">
                {GROUP_TRAVEL.name}
              </h1>
              <p className="text-xl lg:text-2xl font-bold text-brand-blue mb-8">{GROUP_TRAVEL.headline}</p>
              {/* 한 문장에 한 줄. 폰에서는 문장이 접히므로 문장 사이를 살짝 띄운다. */}
              <p className="text-base lg:text-lg text-gray-600 leading-[1.8]">
                {GROUP_TRAVEL.intro.map((sentence) => (
                  <span key={sentence} className="block mb-2 last:mb-0 sm:mb-0">
                    {sentence}
                  </span>
                ))}
              </p>

              {/* 서비스 바로가기. 각 서비스 글 끝의 '서비스 목록으로'가 이 줄(#service-jump)로 돌아온다. */}
              <JumpNav
                id="service-jump"
                label="서비스별 자세히 보기"
                items={GROUP_SERVICES.map((s) => ({ href: `#${s.id}`, label: s.name }))}
                className="mt-10"
              />
            </Fade>

            <Fade delay={0.1} className="order-last lg:order-none lg:col-start-2 lg:row-start-1">
              <Card>
                <h2 className="text-lg font-bold text-gray-900 mb-3">견적 문의</h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  인원과 목적만 알려 주시면, 전담 직원이 일정안과 견적을 준비합니다.
                </p>
                <Button as={Link} {...QUOTE_LINK} className="w-full">
                  단체여행 견적 문의하기
                </Button>
                <p className="mt-4 text-xs text-gray-400 text-center">영업일 기준 1일 이내 회신</p>
              </Card>
            </Fade>
          </div>
        </Section>

        {/*
          서비스 4개. 사진과 글을 번갈아 좌우에 둔다(폰에서는 사진이 위).
          넓은 화면에서는 사진 칸을 글 높이에 맞춰 늘이고 줄인다(grid 기본값 stretch + lg:h-full).
          예전엔 사진을 4:3 고정에 세로 가운데 정렬이라, 글이 짧거나(인센티브) 사진이 길면(골프 3장)
          글이 어중간한 높이에서 시작했다(2026-11-20 지적). 이제 사진과 글의 위·아래 선이 늘 맞는다.
        */}
        <Section tone="soft">
          <div className="space-y-20 lg:space-y-28">
            {GROUP_SERVICES.map((s, idx) => (
              <article
                key={s.id}
                id={s.id}
                // 바로가기로 들어올 때 고정 헤더(높이 80px)에 제목이 가리지 않도록.
                className="scroll-mt-28 grid lg:grid-cols-2 gap-8 lg:gap-16"
              >
                <Fade className={idx % 2 === 1 ? 'lg:order-last' : undefined}>
                  {s.gallery ? (
                    // 사진 여러 장은 한 상자 안에 모은다 — 큰 사진 1장 + 오른쪽 작은 사진 2장(위아래).
                    // 아래로 쌓으면 이 칸만 길어져 다른 서비스와 크기가 어긋난다.
                    <div className="grid grid-cols-3 grid-rows-2 gap-2 sm:gap-3 aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[340px]">
                      {[{ image: s.image, alt: s.imageAlt }, ...s.gallery].map((g, i) => (
                        <div
                          key={g.image}
                          className={cn(
                            'relative overflow-hidden rounded-lg bg-ink-800',
                            i === 0 && 'col-span-2 row-span-2',
                          )}
                        >
                          <img
                            src={g.image}
                            alt={g.alt}
                            loading={idx === 0 && i === 0 ? 'eager' : 'lazy'}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="relative overflow-hidden rounded-lg aspect-[4/3] lg:aspect-auto lg:h-full lg:min-h-[340px] bg-ink-800">
                      <img
                        src={s.image}
                        alt={s.imageAlt}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    </div>
                  )}
                </Fade>
                <Fade delay={0.1}>
                  <ServiceText s={s} />
                </Fade>
              </article>
            ))}
          </div>
        </Section>

        <Section tone="light">
          <Fade className="text-left sm:text-center mb-12">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">
              단체여행 1건이 진행되는 5단계
            </h2>
          </Fade>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {GROUP_STEPS.map((step, idx) => (
              <Fade as="li" key={step.name} delay={idx * 0.05}>
                <Card pad="none" className="h-full p-6">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-green text-white font-eng font-bold mb-4">
                    {idx + 1}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.detail}</p>
                </Card>
              </Fade>
            ))}
          </ol>

          <Fade className="mt-20">
            <h2 className="text-xl lg:text-2xl font-bold tracking-tight text-gray-900 text-left sm:text-center mb-3">
              현지 진행은 두 가지 방식으로
            </h2>
            <p className="text-gray-600 text-left sm:text-center mb-10">일정과 인원에 맞춰 상담 때 함께 정합니다.</p>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {GROUP_SUPPORT.map((item) => (
                <Card key={item.name}>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{item.name}</h3>
                  <p className="text-[15px] text-gray-600 leading-relaxed">{item.detail}</p>
                </Card>
              ))}
            </div>
          </Fade>
        </Section>

        <Section tone="soft" pad="tight">
          <Fade className="max-w-3xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mb-8">자주 묻는 질문</h2>
            <dl className="divide-y divide-gray-200 border-y border-gray-200">
              {GROUP_FAQ.map((f) => (
                <div key={f.q} className="py-6">
                  <dt className="text-base lg:text-lg font-bold text-gray-900 mb-2">{f.q}</dt>
                  <dd className="text-[15px] text-gray-600 leading-relaxed">{f.a}</dd>
                </div>
              ))}
            </dl>
          </Fade>
        </Section>

        <Section tone="charcoal" pad="tight">
          <Fade className="max-w-2xl">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white mb-4">
              인원과 목적만 알려 주세요
            </h2>
            <p className="text-gray-300 leading-[1.8] mb-8">
              영업일 기준 1일 이내에 전담 직원이 연락드리고,
              <br className="hidden sm:inline" /> 상담 내용을 바탕으로 일정안과 견적을 준비합니다.
            </p>
            <Button as={Link} {...QUOTE_LINK} size="lg">
              단체여행 견적 문의하기 →
            </Button>
          </Fade>
        </Section>
      </main>
      <Footer />
    </>
  )
}
