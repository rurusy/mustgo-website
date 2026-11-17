import { Link } from 'react-router-dom'
import { Section, Fade, Button, SectionLabel } from '../ui'
import { GROUP_TRAVEL_PATH } from '../../data/groupTravel'
import { ImageCard } from '../marketing/ImageCard'
import { ProcessSteps } from '../marketing/ProcessSteps'

// 아웃바운드 기업 인센티브·단체여행. 기업 출장(어두운 배경)과 방한 VIP(어두운 배경) 사이에
// 밝은 배경으로 놓여 두 섹션을 갈라 준다. 한국어 홈에만 있다 — 국내 기업 대상 서비스라
// 영문 홈(/en)에는 넣지 않는다.
//
// 문안의 사실(골프·특수지역 주력 지역, 인솔 여부, 박람회·세미나 가능)은 2026-11-17 사장님 확인을
// 받은 것만 쓴다. 실적 숫자·최소 인원·실제 행사 사진은 쓰지 않기로 했다. 골프는 어느 지역이든
// 가능해서 카드 문구에 지역을 적지 않는다(주력 지역은 상세 페이지에). 사진은 무료 사진(Unsplash)만 쓴다(참가자 얼굴 노출 불가).

const photo = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1200`

// 카드 설명은 쉼표에서 줄을 나눈다. 앞 구절이 폰 한 줄(390px)에 들어가는 길이라 어느 너비에서나
// 두 줄로 맞고, 나누지 않으면 폰에서 '되도록'처럼 한 어절만 다음 줄에 남는다.
const lines = (first, second) => (
  <>
    {first}
    <br />
    {second}
  </>
)

const services = [
  {
    image: photo('1511795409834-ef04bbd61622'),
    alt: 'Long banquet table set with glassware and flowers for a gala dinner',
    eyebrow: 'Incentive Travel',
    anchor: 'incentive',
    title: '기업 인센티브',
    description: lines('성과에 대한 보답이,', '오래 기억되는 여행이 되도록'),
  },
  {
    image: photo('1436491865332-7a61a109cc05'),
    alt: 'Airplane wing above the clouds at sunset',
    eyebrow: 'Group Travel',
    anchor: 'group',
    title: '단체여행',
    description: lines('인원이 많아도,', '한 사람처럼 세심하게'),
  },
  {
    image: photo('1500932334442-8761ee4810a7'),
    alt: 'Aerial view of a golf course green with bunkers',
    eyebrow: 'Golf Tour',
    anchor: 'golf',
    title: '해외골프여행',
    description: lines('티타임부터 골프백 운송까지,', '라운딩에만 집중하실 수 있도록'),
  },
  {
    image: photo('1516426122078-c23e76319801'),
    alt: 'Safari vehicle on the savanna at sunset',
    eyebrow: 'Special Destinations',
    anchor: 'special',
    title: '특수지역여행',
    description: lines('아프리카·남미처럼 먼 곳일수록,', '준비가 여행의 절반입니다'),
  },
]

const INTRO = [
  '포상 여행과 임직원 연수, 해외 골프, 아프리카·남미 같은 특수 지역까지.',
  '기획 상담부터 귀국 후 정산까지 전담 직원 한 명이 맡아 진행합니다.',
  '담당자가 바뀌지 않으니, 처음 말씀하신 요청이 마지막 날까지 그대로 이어집니다.',
]

const steps = ['상담', '기획·제안', '확정·준비', '현지 진행', '정산·보고']

const prefillGroup = () =>
  window.dispatchEvent(new CustomEvent('mustgo:prefill-inquiry', { detail: { type: 'group' } }))

export function GroupTravel() {
  return (
    <Section id="group" tone="light">
      <Fade className="max-w-4xl mx-auto text-left sm:text-center">
        <SectionLabel>Group &amp; Incentive</SectionLabel>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
          기업 인센티브·단체여행,
          <br /> 한 명의 전담 직원이 처음부터 끝까지
        </h2>
        <h3 className="font-eng font-medium text-amber-600 text-lg lg:text-xl mb-8">
          Dedicated Management for Corporate Incentive &amp; Group Travel.
        </h3>
        {/* 한 문장에 한 줄. 문장이 이어 붙으면 줄 끝이 문장 중간에서 갈려 읽기 어렵다. */}
        <p className="text-gray-600 text-base lg:text-lg leading-[1.8]">
          {INTRO.map((sentence) => (
            // 폰에서는 한 문장이 두 줄로 접히므로 문장 사이를 살짝 띄워 경계를 보이게 한다.
            <span key={sentence} className="block mb-2 last:mb-0 sm:mb-0">
              {sentence}
            </span>
          ))}
        </p>
      </Fade>

      <div className="grid sm:grid-cols-2 gap-4 lg:gap-6 mt-16 max-w-5xl mx-auto">
        {/* 카드마다 상세 페이지의 해당 서비스 글로 보낸다(anchor = GroupTravelPage 의 article id). */}
        {services.map(({ anchor, ...s }, idx) => (
          <Fade key={s.eyebrow} delay={idx * 0.1}>
            <ImageCard {...s} to={`${GROUP_TRAVEL_PATH}#${anchor}`} />
          </Fade>
        ))}
      </div>

      <Fade className="mt-24 pt-16 border-t border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 text-center mb-16">단체여행 1건이 진행되는 5단계</h3>
        <ProcessSteps steps={steps} tone="light" />
        <p className="mt-12 max-w-2xl mx-auto text-left sm:text-center text-gray-600 text-[15px] leading-relaxed">
          현지 일정에는 전담 직원이 직접 동행(인솔)하거나, 국내에서 원격으로 지원합니다.
          <br className="hidden sm:block" /> 일정과 인원에 맞춰 상담 때 함께 정합니다.
        </p>
      </Fade>

      <Fade className="mt-24 text-center">
        <p className="text-gray-600 mb-6 text-sm sm:text-lg">
          인원과 목적만 알려 주시면,
          <br className="sm:hidden" /> 전담 직원이 일정안과 견적을 준비합니다.
        </p>
        {/*
          '자세히 보기'는 상세 페이지(/group-travel/)로 가는 홈의 유일한 링크다. 빠지면 그 페이지는
          sitemap 에만 있고 사이트 안에서는 고립된다 — Inbound 섹션의 도시 버튼과 같은 이유.
        */}
        <div className="flex flex-col sm:flex-row justify-center gap-3">
          <Button as="a" href="#contact" variant="blue" onClick={prefillGroup}>
            단체여행 견적 문의하기 →
          </Button>
          <Button as={Link} to={GROUP_TRAVEL_PATH} variant="outlineDark">
            서비스 자세히 보기
          </Button>
        </div>
      </Fade>
    </Section>
  )
}
