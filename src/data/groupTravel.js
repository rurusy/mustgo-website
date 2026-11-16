// 기업 인센티브·단체여행 상세 페이지(/group-travel/)의 내용과 경로.
//
// 이 파일은 Node 에서도 읽힌다(scripts/prerender.mjs, gen-sitemap.mjs 가 seo.js 를 거쳐
// import). 그래서 JSX 를 쓰지 않고 문자열만 둔다 — 줄 나눔 같은 화면 처리는 페이지가 한다.
//
// 사실은 2026-11-17 사장님 확인을 받은 것만 쓴다(MustGo_디자인_프롬프트_v2.md Section 3-1):
//   - 실적 숫자, 최소 인원, 실제 진행한 전시회 이름은 쓰지 않는다
//   - 골프 주력 지역 일본·동남아, 특수지역 진행 국가 탄자니아·페루
//   - 전담 직원 현지 동행(인솔)·국내 원격 지원 모두 가능
//   - 실제 행사 사진은 쓰지 않는다(무료 사진만). 박람회 참가는 서비스에서 뺐다
// 새 사실을 넣으려면 사장님 확인부터 받는다.
//
// 한국어 전용 페이지다. 국내 기업 대상 서비스라 영문 짝이 없고, 그래서 hreflang 도
// ko(와 x-default)만 단다.

export const GROUP_TRAVEL_PATH = '/group-travel/'

// 콘텐츠가 실제로 바뀐 날. sitemap 의 lastmod 로 나간다 — 빌드일로 덮어쓰지 않는다.
export const GROUP_TRAVEL_UPDATED = '2026-11-17'

const photo = (id) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&q=80&w=1600`

export const GROUP_TRAVEL = {
  name: '기업 인센티브·단체여행',
  eyebrow: 'Group & Incentive',
  headline: '한 명의 전담 직원이 처음부터 끝까지',
  // 한 문장에 한 줄 — 홈 섹션 소개와 같은 문장이다.
  intro: [
    '포상 여행과 임직원 연수, 해외 골프, 아프리카·남미 같은 특수 지역까지.',
    '기획 상담부터 귀국 후 정산까지 전담 직원 한 명이 맡아 진행합니다.',
    '담당자가 바뀌지 않으니, 처음 말씀하신 요청이 마지막 날까지 그대로 이어집니다.',
  ],
  title: '기업 인센티브·단체여행 — 전담 직원이 처음부터 끝까지 | Mustgo',
  description:
    '포상 여행, 임직원 연수, 일본·동남아 해외 골프, 아프리카·남미 특수지역 단체여행. 기획 상담부터 귀국 후 정산까지 Mustgo 전담 직원 한 명이 맡아 진행합니다.',
}

// 서비스 4개. id 는 페이지 안 앵커(#incentive 등)로도 쓴다.
export const GROUP_SERVICES = [
  {
    id: 'incentive',
    eyebrow: 'Incentive Travel',
    name: '기업 인센티브',
    tagline: '성과에 대한 보답이, 오래 기억되는 여행이 되도록',
    image: photo('1511795409834-ef04bbd61622'),
    imageAlt: '갈라 디너를 위해 꽃과 잔으로 차려진 긴 연회 테이블',
    forWhom: '우수 임직원·대리점·판매 우수자의 포상 여행을 기획하는 인사·영업 담당자',
    prepares: [
      '포상 취지에 맞는 목적지 제안',
      '시상식·만찬(갈라 디너) 장소 섭외',
      '우리 회사만을 위한 단독 일정 구성',
      '현수막·기념품 등 행사 준비물',
    ],
  },
  {
    id: 'group',
    eyebrow: 'Group Travel',
    name: '단체여행',
    tagline: '인원이 많아도, 한 사람처럼 세심하게',
    image: photo('1436491865332-7a61a109cc05'),
    imageAlt: '노을 진 구름 위를 나는 비행기 날개',
    forWhom: '임직원 워크숍·해외 연수, 협회·단체 시찰을 준비하는 총무·교육 담당자',
    prepares: [
      '단체 항공 좌석과 호텔 객실 일괄 확보',
      '전용 차량·현지 가이드',
      '기관 방문 섭외',
      '단체 여행자 보험',
      '참가자 명단·방 배정 관리',
    ],
  },
  {
    id: 'golf',
    eyebrow: 'Golf Tour',
    name: '해외골프여행',
    tagline: '티타임부터 골프백 운송까지, 라운딩에만 집중하실 수 있도록',
    image: photo('1500932334442-8761ee4810a7'),
    imageAlt: '위에서 내려다본 골프장 그린과 벙커',
    forWhom: '거래처 접대 골프, 임원 라운딩, 사내 동호회 골프 여행을 준비하는 분',
    prepares: [
      '희망 날짜 티타임 확보',
      '골프장·숙소·이동 차량 묶음 구성',
      '골프백 항공 위탁 안내',
    ],
    note: '주력 지역: 일본·동남아',
  },
  {
    id: 'special',
    eyebrow: 'Special Destinations',
    name: '특수지역여행',
    tagline: '아프리카·남미처럼 먼 곳일수록, 준비가 여행의 절반입니다',
    image: photo('1516426122078-c23e76319801'),
    imageAlt: '해 질 녘 초원 위의 사파리 차량',
    forWhom: '직항이 없거나 정보가 적은 지역을 단체로 방문하려는 기업·단체',
    prepares: [
      '경유 항공 설계',
      '비자와 예방접종(황열 등) 사전 안내',
      '안전 정보와 비상 연락 체계',
    ],
    note: '진행해 본 지역: 탄자니아·페루',
  },
]

export const GROUP_STEPS = [
  { name: '상담', detail: '목적·인원·예산·희망 시기를 확인합니다.' },
  { name: '기획·제안', detail: '맞춤 일정안과 견적서를 드립니다.' },
  { name: '확정·준비', detail: '항공 좌석과 객실을 확보하고, 비자·보험과 참가자 사전 안내를 챙깁니다.' },
  { name: '현지 진행', detail: '일정을 운영하고 현장 변경에 대응합니다. 여행 중에는 24시간 연락할 수 있습니다.' },
  { name: '정산·보고', detail: '비용 정산서와 증빙 서류를 정리하고 결과를 보고합니다.' },
]

// 현지 진행 방식. 사장님 확인: 인솔과 원격 지원 모두 가능.
export const GROUP_SUPPORT = [
  {
    name: '현지 동행(인솔)',
    detail: '전담 직원이 함께 출국해 현장에서 일정을 운영하고, 변경 사항을 그 자리에서 처리합니다.',
  },
  {
    name: '국내 원격 지원',
    detail: '출발 전 준비를 모두 마치고, 여행 중에는 국내에서 연락을 받아 일정 변경과 문제 상황에 대응합니다.',
  },
]

// 자주 묻는 질문. 확인된 사실만으로 답한다.
export const GROUP_FAQ = [
  {
    q: '최소 인원 기준이 있나요?',
    a: '상품에 따라 다릅니다. 인원과 목적을 알려 주시면 가능한 구성을 안내해 드립니다.',
  },
  {
    q: '전담 직원이 현지까지 함께 가나요?',
    a: '현지 동행(인솔)과 국내 원격 지원 모두 가능합니다. 일정과 인원에 맞춰 상담 때 함께 정합니다.',
  },
  {
    q: '견적은 어떻게 받나요?',
    a: '문의 폼에 인원·목적·희망 시기를 남겨 주세요. 영업일 기준 1일 이내에 전담 직원이 연락드리고, 상담 내용을 바탕으로 일정안과 견적을 준비합니다.',
  },
]

// 프리렌더·사이트맵이 읽는 경로 항목. 관광지 경로(attractions.js 의 contentRoutes)와
// 같은 모양으로 맞춘다.
export function groupTravelRoutes() {
  return [
    {
      path: GROUP_TRAVEL_PATH,
      lang: 'ko',
      kind: 'group',
      alternates: { ko: GROUP_TRAVEL_PATH },
      lastmod: GROUP_TRAVEL_UPDATED,
    },
  ]
}
