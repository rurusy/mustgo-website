import { Link } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Section, Button, Card, Fade } from '../components/ui'
import { ScreenshotFrame } from '../components/marketing/ScreenshotFrame'
import { useSeo } from '../hooks/useSeo'
import { breadcrumbHome, seoForBtms } from '../data/seo'
import { homePath } from '../data/attractions'
import {
  BTMS,
  BTMS_FAQ,
  BTMS_FEATURES,
  BTMS_FLOW,
  BTMS_HERO_SHOT,
  BTMS_LAUNCH,
  BTMS_OPS,
  BTMS_ROLES,
  BTMS_ROLLOUT,
  BTMS_SETTINGS,
} from '../data/btms'

// MUSTGO BTMS(AI 기업출장 관리시스템) 소개(/btms/). 한국어 전용.
//
// 홈 #corporate 의 BTMS 블록이 요약이고, 이 페이지가 역할별 기능과 도입 방법을 펼친다.
// 검색과 파워링크 광고의 착지 주소로 쓰려는 페이지라 본문이 정적 HTML 에 들어 있어야 한다
// (scripts/prerender.mjs 가 떠낸다). 문안과 사실은 src/data/btms.js 한 곳에 있다.

// 상담 버튼은 홈의 문의 폼으로 보낸다. GroupTravelPage 와 같은 이유로 라우터 state 로 유형을 싣는다.
const CONSULT_LINK = { to: `${homePath('ko')}#contact`, state: { inquiryType: 'btms' } }

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4 mt-1 shrink-0 text-brand-green"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  )
}

function SectionTitle({ eyebrow, title, lead }) {
  return (
    <Fade className="text-left sm:text-center mb-12">
      {eyebrow && (
        <p className="text-sm font-eng font-bold text-amber-600 tracking-wider mb-2">{eyebrow}</p>
      )}
      <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900">{title}</h2>
      {lead && <p className="mt-3 text-gray-600">{lead}</p>}
    </Fade>
  )
}

export default function BtmsPage() {
  useSeo(seoForBtms())

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
              <li className="text-gray-700 font-medium">{BTMS.name}</li>
            </ol>
          </nav>

          <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-10 lg:gap-14 items-center">
            <Fade>
              <p className="text-sm font-eng font-bold uppercase tracking-wide2 text-gray-400 mb-4">
                {BTMS.eyebrow}
              </p>
              <h1 className="text-3xl lg:text-5xl font-bold tracking-tight text-gray-900 mb-3">
                <span className="block text-lg lg:text-2xl text-gray-500 font-bold mb-2">{BTMS.fullName}</span>
                <span className="font-eng">{BTMS.name}</span>
              </h1>
              <p className="inline-block rounded-sm bg-sky-50 text-sky-800 text-sm font-bold px-3 py-1 mb-6">
                {BTMS_LAUNCH}
              </p>
              <p className="text-xl lg:text-2xl font-bold text-gray-900 mb-6">
                {BTMS.headline.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </p>
              {/* 한 문장에 한 줄. 폰에서는 문장이 접히므로 문장 사이를 살짝 띄운다. */}
              <p className="text-base lg:text-lg text-gray-600 leading-[1.8] [text-wrap:pretty]">
                {BTMS.intro.map((sentence) => (
                  <span key={sentence} className="block mb-2 last:mb-0 sm:mb-0">
                    {sentence}
                  </span>
                ))}
              </p>

              <dl className="grid grid-cols-3 gap-3 mt-8">
                {BTMS.facts.map((f) => (
                  <div key={f.k} className="rounded-sm border border-gray-200 bg-surface-soft px-3 py-3">
                    <dt className="text-xs text-gray-500 mb-1">{f.k}</dt>
                    <dd className="text-sm font-bold text-gray-900">{f.v}</dd>
                  </div>
                ))}
              </dl>

              <div className="flex flex-wrap gap-3 mt-8">
                <Button as={Link} {...CONSULT_LINK}>
                  도입 상담 요청하기
                </Button>
                <Button as="a" href="#features" variant="outlineDark">
                  기능 살펴보기
                </Button>
              </div>
            </Fade>

            <Fade delay={0.1}>
              <ScreenshotFrame {...BTMS_HERO_SHOT} loading="eager" />
            </Fade>
          </div>
        </Section>

        <Section tone="soft">
          <SectionTitle eyebrow="Users" title="세 역할이 각자의 화면에서" lead="출장자·출장관리자·머스트고 발권팀이 한 시스템을 함께 씁니다." />
          <div className="grid md:grid-cols-3 gap-6">
            {BTMS_ROLES.map((r, idx) => (
              <Fade key={r.name} delay={idx * 0.05}>
                <Card className="h-full">
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{r.name}</h3>
                  <p className="text-xs font-medium text-sky-800 mb-4">{r.env}</p>
                  <p className="text-[15px] text-gray-600 leading-relaxed">{r.does}</p>
                </Card>
              </Fade>
            ))}
          </div>
        </Section>

        <Section tone="light">
          <SectionTitle eyebrow="Workflow" title="검색부터 정산까지 하나로 이어지는 출장 업무" />
          <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {BTMS_FLOW.map((step, idx) => (
              <Fade as="li" key={step.name} delay={idx * 0.05}>
                <Card pad="none" className="h-full p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-green text-white font-eng font-bold">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-medium text-gray-500">{step.who}</span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{step.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.detail}</p>
                </Card>
              </Fade>
            ))}
          </ol>
        </Section>

        {/* 역할별 기능. 화면과 글을 번갈아 좌우에 둔다(폰에서는 화면이 위). */}
        <Section tone="soft" id="features" className="scroll-mt-20">
          <div className="space-y-20 lg:space-y-28">
            {BTMS_FEATURES.map((f, idx) => (
              <article
                key={f.id}
                id={f.id}
                className="scroll-mt-28 grid lg:grid-cols-2 gap-8 lg:gap-16 items-center"
              >
                <Fade className={idx % 2 === 1 ? 'lg:order-last' : undefined}>
                  <ScreenshotFrame {...f.shot} />
                </Fade>
                <Fade delay={0.1}>
                  <p className="text-sm font-bold text-amber-600 mb-2">{f.role}</p>
                  <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mb-3">{f.name}</h2>
                  <p className="text-lg text-gray-600 mb-8">{f.lead}</p>
                  <ul className="space-y-4">
                    {f.points.map((p) => (
                      <li key={p.name} className="flex gap-2">
                        <CheckIcon />
                        <span>
                          <span className="block text-[15px] font-bold text-gray-900">{p.name}</span>
                          <span className="block text-[15px] text-gray-600 leading-relaxed">{p.detail}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </Fade>
              </article>
            ))}
          </div>
        </Section>

        <Section tone="charcoal">
          <Fade className="text-left sm:text-center mb-12">
            <p className="text-sm font-eng font-bold text-amber-500 tracking-wider mb-2">Mustgo Ticketing</p>
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-white">
              결재가 끝나면 머스트고가 바로 이어받습니다
            </h2>
          </Fade>
          <div className="grid md:grid-cols-3 gap-6">
            {BTMS_OPS.map((o, idx) => (
              <Fade key={o.name} delay={idx * 0.05} className="bg-white/5 border border-white/10 rounded-lg p-8">
                <h3 className="text-lg font-bold text-white mb-3">{o.name}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{o.detail}</p>
              </Fade>
            ))}
          </div>
        </Section>

        <Section tone="light">
          <SectionTitle eyebrow="Setup" title="공통 시스템 위에 우리 회사 기준을 그대로" />
          <Fade className="mb-16">
            <h3 className="text-sm font-bold text-gray-500 text-left sm:text-center mb-4">회사마다 따로 설정하는 항목</h3>
            <ul className="flex flex-wrap sm:justify-center gap-2">
              {BTMS_SETTINGS.map((s) => (
                <li key={s} className="rounded-full bg-sky-50 text-sky-800 text-sm font-bold px-4 py-2">
                  {s}
                </li>
              ))}
            </ul>
          </Fade>
          <h3 className="text-sm font-bold text-gray-500 text-left sm:text-center mb-4">도입 절차</h3>
          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {BTMS_ROLLOUT.map((step, idx) => (
              <Fade as="li" key={step.name} delay={idx * 0.05}>
                <Card pad="none" className="h-full p-6">
                  <p className="text-xs font-eng font-bold text-sky-800 mb-2">STEP {idx + 1}</p>
                  <h4 className="text-lg font-bold text-gray-900 mb-2">{step.name}</h4>
                  <p className="text-sm text-gray-600 leading-relaxed">{step.detail}</p>
                </Card>
              </Fade>
            ))}
          </ol>
        </Section>

        <Section tone="soft" pad="tight">
          <Fade className="max-w-3xl mx-auto">
            <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-gray-900 mb-8">자주 묻는 질문</h2>
            <dl className="divide-y divide-gray-200 border-y border-gray-200">
              {BTMS_FAQ.map((f) => (
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
              {BTMS_LAUNCH}, 도입 상담은 지금부터
            </h2>
            <p className="text-gray-300 leading-[1.8] mb-8">
              회사의 출장 규모와 결재 방식을 알려 주시면,
              <br className="hidden sm:inline" /> 우리 회사에 맞는 설정과 도입 일정을 함께 정리해 드립니다.
            </p>
            <Button as={Link} {...CONSULT_LINK} size="lg">
              도입 상담 요청하기 →
            </Button>
          </Fade>
        </Section>
      </main>
      <Footer />
    </>
  )
}
