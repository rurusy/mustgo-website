import PptxGenJS from 'pptxgenjs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OUT = path.join(__dirname, '..', 'dist', 'MustGo_회사소개서.pptx')

const C = {
  ink900: '1A1A1A',
  ink800: '2C2C2C',
  ink700: '3F3F3F',
  soft: 'F8F9FA',
  white: 'FFFFFF',
  blue: '42b2e6',
  blueDark: '3aa8dc',
  green: '6cbd45',
  amber: 'F59E0B',
  amberDark: 'D97706',
  gray100: 'F3F4F6',
  gray200: 'E5E7EB',
  gray300: 'D1D5DB',
  gray400: '9CA3AF',
  gray500: '6B7280',
  gray600: '4B5563',
  gray700: '374151',
  gray800: '1F2937',
  gray900: '111827',
}

const FONT_KO = 'Noto Sans KR'
const FONT_EN = 'Inter'

const pres = new PptxGenJS()
pres.layout = 'LAYOUT_WIDE' // 13.333 x 7.5 inches
const SW = 13.333
const SH = 7.5

const brandText = (size) => [
  { text: 'M', options: { color: C.green, fontFace: FONT_EN, fontSize: size, bold: true } },
  { text: 'ust', options: { color: C.white, fontFace: FONT_EN, fontSize: size, bold: true } },
  { text: 'g', options: { color: C.blue, fontFace: FONT_EN, fontSize: size, bold: true } },
  { text: 'o', options: { color: C.white, fontFace: FONT_EN, fontSize: size, bold: true } },
]
const brandTextDark = (size) => [
  { text: 'M', options: { color: C.green, fontFace: FONT_EN, fontSize: size, bold: true } },
  { text: 'ust', options: { color: C.gray900, fontFace: FONT_EN, fontSize: size, bold: true } },
  { text: 'g', options: { color: C.blue, fontFace: FONT_EN, fontSize: size, bold: true } },
  { text: 'o', options: { color: C.gray900, fontFace: FONT_EN, fontSize: size, bold: true } },
]

const fillBg = (slide, color) => {
  slide.background = { color }
}

const accentBar = (slide, color = C.amber) =>
  slide.addShape(pres.ShapeType.rect, {
    x: 0,
    y: 0,
    w: SW,
    h: 0.08,
    fill: { color },
    line: { type: 'none' },
  })

const pageNum = (slide, n, total, dark = true) => {
  slide.addText(`${String(n).padStart(2, '0')} / ${String(total).padStart(2, '0')}`, {
    x: SW - 1.5,
    y: SH - 0.5,
    w: 1.2,
    h: 0.3,
    align: 'right',
    fontFace: FONT_EN,
    fontSize: 9,
    color: dark ? C.gray500 : C.gray400,
  })
}

const eyebrow = (slide, text, x, y, color = C.amber) => {
  slide.addText(text, {
    x,
    y,
    w: 6,
    h: 0.3,
    fontFace: FONT_EN,
    fontSize: 11,
    bold: true,
    color,
    charSpacing: 4,
  })
}

const TOTAL = 13

// ---------------------------------------------------------------------------
// Slide 1 — Cover
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide()
  fillBg(s, C.ink900)
  // Faint diagonal stripe
  s.addShape(pres.ShapeType.rect, {
    x: 0,
    y: SH - 1.6,
    w: SW,
    h: 0.04,
    fill: { color: C.amber },
    line: { type: 'none' },
  })
  s.addText(brandText(72), {
    x: 0.8,
    y: 2.0,
    w: 12,
    h: 1.4,
    fontFace: FONT_EN,
  })
  s.addText('비즈니스 출장의 모든 길,', {
    x: 0.8,
    y: 3.4,
    w: 12,
    h: 0.7,
    fontFace: FONT_KO,
    fontSize: 32,
    bold: true,
    color: C.white,
  })
  s.addText('함께 걷는 양방향 비즈니스 트래블 파트너', {
    x: 0.8,
    y: 4.05,
    w: 12,
    h: 0.7,
    fontFace: FONT_KO,
    fontSize: 32,
    bold: true,
    color: C.white,
  })
  s.addText('Your Trusted Partner for Business Travel — Outbound & Inbound', {
    x: 0.8,
    y: 4.95,
    w: 12,
    h: 0.5,
    fontFace: FONT_EN,
    fontSize: 18,
    italic: true,
    color: C.amber,
  })
  s.addText('회사소개서  /  Company Profile  ·  2026', {
    x: 0.8,
    y: SH - 1.0,
    w: 12,
    h: 0.4,
    fontFace: FONT_EN,
    fontSize: 12,
    color: C.gray400,
    charSpacing: 4,
  })
}

// ---------------------------------------------------------------------------
// Slide 2 — Table of Contents
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide()
  fillBg(s, C.white)
  accentBar(s, C.amber)

  eyebrow(s, 'CONTENTS', 0.8, 0.7)
  s.addText('회사소개서 목차', {
    x: 0.8,
    y: 1.05,
    w: 12,
    h: 0.8,
    fontFace: FONT_KO,
    fontSize: 32,
    bold: true,
    color: C.gray900,
  })

  const items = [
    ['01', 'About Mustgo', '기업 출장의 양방향 전문가'],
    ['02', '3-Pillar', 'Mustgo를 선택하는 세 가지 이유'],
    ['03', 'Numbers', '숫자로 보는 Mustgo'],
    ['04', 'Corporate Travel', '해외출장 — 항공권부터 정산까지'],
    ['05', 'Process', '출장 1건이 처리되는 5단계'],
    ['06', 'Inbound Tour', '한국을 찾는 글로벌 VIP를 위한 의전 투어'],
    ['07', 'Audience', '이런 분들을 위한 서비스입니다'],
    ['08', 'Three Areas', 'VIP Concierge / Business / Cultural'],
    ['09', 'Contact', '가장 빠른 답변을 드립니다'],
  ]
  const colW = 5.8
  const rowH = 0.55
  items.forEach((item, i) => {
    const col = i < 5 ? 0 : 1
    const row = i % 5
    const x = 0.8 + col * (colW + 0.4)
    const y = 2.2 + row * rowH
    s.addText(item[0], {
      x,
      y,
      w: 0.55,
      h: rowH,
      fontFace: FONT_EN,
      fontSize: 16,
      bold: true,
      color: C.amber,
    })
    s.addText(item[1], {
      x: x + 0.55,
      y,
      w: 2.4,
      h: rowH,
      fontFace: FONT_EN,
      fontSize: 13,
      bold: true,
      color: C.gray900,
      valign: 'middle',
    })
    s.addText(item[2], {
      x: x + 2.95,
      y,
      w: colW - 2.95,
      h: rowH,
      fontFace: FONT_KO,
      fontSize: 11,
      color: C.gray500,
      valign: 'middle',
    })
  })

  pageNum(s, 1, TOTAL, false)
}

// ---------------------------------------------------------------------------
// Slide 3 — About — Greeting
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide()
  fillBg(s, C.white)
  accentBar(s, C.amber)
  eyebrow(s, 'ABOUT MUSTGO', 0.8, 0.7)

  s.addText(
    [
      { text: '기업 출장의 양방향 전문가, ', options: { color: C.gray900 } },
      ...brandTextDark(36),
      { text: '입니다.', options: { color: C.gray900 } },
    ],
    {
      x: 0.8,
      y: 1.1,
      w: 12,
      h: 1.0,
      fontFace: FONT_KO,
      fontSize: 36,
      bold: true,
    },
  )

  s.addText(
    [
      {
        text: 'Mustgo는 국내 기업의 해외 출장과, 기업들의 외국 VIP 고객의 한국 방문을 전문적으로 다루는 기업 전문 여행사입니다.\n',
        options: { fontSize: 17 },
      },
      {
        text: '해외출장항공 발권부터 호텔, 의전, Inbound tour까지 비즈니스 여정의 모든 단계에서 가장 신뢰할 수 있는 파트너가 되겠습니다.',
        options: { fontSize: 17 },
      },
    ],
    {
      x: 0.8,
      y: 2.6,
      w: 11.5,
      h: 2.0,
      fontFace: FONT_KO,
      color: C.gray700,
      lineSpacingMultiple: 1.7,
    },
  )

  // Brand keywords row
  const kw = [
    ['Trust', '신뢰', C.blue],
    ['Premium', '프리미엄', C.amber],
    ['Bridge', '연결', C.green],
  ]
  kw.forEach((k, i) => {
    const x = 0.8 + i * 4.0
    s.addShape(pres.ShapeType.line, {
      x,
      y: 5.5,
      w: 0.6,
      h: 0,
      line: { color: k[2], width: 2 },
    })
    s.addText(k[0], {
      x,
      y: 5.6,
      w: 3.5,
      h: 0.5,
      fontFace: FONT_EN,
      fontSize: 22,
      bold: true,
      color: C.gray900,
    })
    s.addText(k[1], {
      x,
      y: 6.1,
      w: 3.5,
      h: 0.4,
      fontFace: FONT_KO,
      fontSize: 12,
      color: C.gray500,
    })
  })

  pageNum(s, 2, TOTAL, false)
}

// ---------------------------------------------------------------------------
// Slide 4 — Three Pillars
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide()
  fillBg(s, C.soft)
  accentBar(s, C.amber)
  eyebrow(s, 'THREE PILLARS', 0.8, 0.7)
  s.addText(
    [
      ...brandTextDark(30),
      { text: '를 선택하는 세 가지 이유', options: { color: C.gray900 } },
    ],
    {
      x: 0.8,
      y: 1.05,
      w: 12,
      h: 0.8,
      fontFace: FONT_KO,
      fontSize: 30,
      bold: true,
    },
  )

  const pillars = [
    {
      n: '01',
      tone: C.blue,
      title: '양방향 전문성',
      body:
        'Outbound와 Inbound를 동시에 운영하는 기업 전문 여행사 Mustgo는 고객사의 든든한 파트너입니다.',
    },
    {
      n: '02',
      tone: C.amber,
      title: 'VIP 디테일',
      body:
        "임원 출장과 해외 의전 투어로 다져진 디테일.\n'디테일이 신뢰를 만든다' — Mustgo의 운영 철학입니다.",
    },
    {
      n: '03',
      tone: C.green,
      title: '24/7 컨시어지',
      body:
        '시차에 관계없이 즉시 응답하는 전담 운영팀.\n출장 중 어떤 상황에도, 한 통의 연락이면 충분합니다.',
    },
  ]
  const cardW = 3.95
  const cardH = 4.3
  pillars.forEach((p, i) => {
    const x = 0.8 + i * (cardW + 0.25)
    const y = 2.4
    s.addShape(pres.ShapeType.rect, {
      x,
      y,
      w: cardW,
      h: cardH,
      fill: { color: C.white },
      line: { color: C.gray200, width: 0.75 },
    })
    s.addShape(pres.ShapeType.rect, {
      x,
      y,
      w: cardW,
      h: 0.06,
      fill: { color: p.tone },
      line: { type: 'none' },
    })
    s.addText(p.n, {
      x: x + 0.5,
      y: y + 0.4,
      w: 1.5,
      h: 0.6,
      fontFace: FONT_EN,
      fontSize: 32,
      bold: true,
      color: p.tone,
    })
    s.addText(p.title, {
      x: x + 0.5,
      y: y + 1.3,
      w: cardW - 1,
      h: 0.6,
      fontFace: FONT_KO,
      fontSize: 22,
      bold: true,
      color: C.gray900,
    })
    s.addShape(pres.ShapeType.line, {
      x: x + 0.5,
      y: y + 2.0,
      w: 0.6,
      h: 0,
      line: { color: p.tone, width: 2 },
    })
    s.addText(p.body, {
      x: x + 0.5,
      y: y + 2.2,
      w: cardW - 1,
      h: 1.7,
      fontFace: FONT_KO,
      fontSize: 13,
      color: C.gray600,
      lineSpacingMultiple: 1.6,
    })
  })
  pageNum(s, 3, TOTAL, false)
}

// ---------------------------------------------------------------------------
// Slide 5 — Numbers
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide()
  fillBg(s, C.white)
  accentBar(s, C.amber)
  eyebrow(s, 'BY THE NUMBERS', 0.8, 0.7)
  s.addText(
    [
      { text: '숫자로 보는 ', options: { color: C.gray900 } },
      ...brandTextDark(30),
    ],
    {
      x: 0.8,
      y: 1.05,
      w: 12,
      h: 0.8,
      fontFace: FONT_KO,
      fontSize: 30,
      bold: true,
    },
  )

  const stats = [
    { val: '15', sfx: '년+', lbl: 'Outbound · Inbound 현장 경험' },
    { val: '50,000', sfx: '+', lbl: '누적 기업 출장 건수' },
    { val: '10,000', sfx: '+', lbl: 'Inbound Tour 이용 해외 VIP 고객수' },
    { val: '24h', sfx: '', lbl: '긴급 대응 체계 가동' },
  ]
  const cellW = 2.95
  stats.forEach((st, i) => {
    const x = 0.8 + i * (cellW + 0.15)
    const y = 2.7
    s.addShape(pres.ShapeType.rect, {
      x,
      y,
      w: cellW,
      h: 3.4,
      fill: { color: C.soft },
      line: { type: 'none' },
    })
    s.addText(
      [
        { text: st.val, options: { color: C.green, fontSize: 56, bold: true } },
        { text: st.sfx, options: { color: C.green, fontSize: 24, bold: true } },
      ],
      {
        x: x + 0.3,
        y: y + 0.6,
        w: cellW - 0.6,
        h: 1.4,
        fontFace: FONT_EN,
      },
    )
    s.addShape(pres.ShapeType.line, {
      x: x + 0.3,
      y: y + 2.1,
      w: 0.5,
      h: 0,
      line: { color: C.amber, width: 2 },
    })
    s.addText(st.lbl, {
      x: x + 0.3,
      y: y + 2.25,
      w: cellW - 0.6,
      h: 0.9,
      fontFace: FONT_KO,
      fontSize: 12,
      color: C.gray600,
      lineSpacingMultiple: 1.5,
    })
  })

  pageNum(s, 4, TOTAL, false)
}

// ---------------------------------------------------------------------------
// Slide 6 — Corporate Travel — Header + Services
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide()
  fillBg(s, C.ink800)
  accentBar(s, C.amber)
  eyebrow(s, 'CORPORATE TRAVEL', 0.8, 0.7, C.amber)
  s.addText('기업 해외출장, 항공권부터 정산까지 한 번에', {
    x: 0.8,
    y: 1.05,
    w: 12,
    h: 0.9,
    fontFace: FONT_KO,
    fontSize: 30,
    bold: true,
    color: C.white,
  })
  s.addText('단순 발권을 넘어, 임직원의 출장 경험과 회사의 비용 효율을 동시에 향상시킵니다.', {
    x: 0.8,
    y: 1.95,
    w: 12,
    h: 0.5,
    fontFace: FONT_KO,
    fontSize: 16,
    color: C.amber,
  })

  const items = [
    {
      title: '최적의 항공권, 가장 빠르게',
      body: '전 세계 GDS · 기업 특가\n비즈니스/퍼스트 컨설팅',
      tone: C.blue,
    },
    {
      title: '도착 후의 모든 것까지',
      body: '호텔 기업요금 · 의전 차량\n비자 · 단체 보험',
      tone: C.white,
    },
    {
      title: '보이지 않던 비용이,\n보이기 시작합니다',
      body: '부서·노선·개인별 비용 자동 분석\n절감안 도출',
      tone: C.blue,
    },
    {
      title: '365일,\n어디서든 한 번의 연락으로',
      body: '긴급 변경 · 위기 대응\n24/7 비상 콜센터',
      tone: C.white,
    },
  ]
  const cardW = 2.95
  const cardH = 3.6
  items.forEach((it, i) => {
    const x = 0.8 + i * (cardW + 0.15)
    const y = 2.95
    s.addShape(pres.ShapeType.rect, {
      x,
      y,
      w: cardW,
      h: cardH,
      fill: { color: C.ink900, transparency: 50 },
      line: { color: C.gray700, width: 0.5 },
    })
    s.addText(`0${i + 1}`, {
      x: x + 0.4,
      y: y + 0.35,
      w: 1.2,
      h: 0.4,
      fontFace: FONT_EN,
      fontSize: 13,
      bold: true,
      color: C.amber,
    })
    s.addText(it.title, {
      x: x + 0.4,
      y: y + 0.85,
      w: cardW - 0.8,
      h: 1.4,
      fontFace: FONT_KO,
      fontSize: 18,
      bold: true,
      color: it.tone,
      lineSpacingMultiple: 1.3,
    })
    s.addShape(pres.ShapeType.line, {
      x: x + 0.4,
      y: y + 2.35,
      w: 0.5,
      h: 0,
      line: { color: C.amber, width: 1.5 },
    })
    s.addText(it.body, {
      x: x + 0.4,
      y: y + 2.5,
      w: cardW - 0.8,
      h: 1.0,
      fontFace: FONT_KO,
      fontSize: 12,
      color: C.gray400,
      lineSpacingMultiple: 1.5,
    })
  })

  pageNum(s, 5, TOTAL, true)
}

// ---------------------------------------------------------------------------
// Slide 7 — 5-step process
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide()
  fillBg(s, C.ink800)
  accentBar(s, C.amber)
  eyebrow(s, 'PROCESS', 0.8, 0.7, C.amber)
  s.addText('출장 1건이 처리되는 5단계', {
    x: 0.8,
    y: 1.05,
    w: 12,
    h: 0.8,
    fontFace: FONT_KO,
    fontSize: 30,
    bold: true,
    color: C.white,
  })
  s.addText('요청부터 정산까지, 정형화된 프로세스로 어떤 출장도 매끄럽게.', {
    x: 0.8,
    y: 1.95,
    w: 12,
    h: 0.4,
    fontFace: FONT_KO,
    fontSize: 14,
    color: C.gray400,
  })

  const steps = [
    { n: '01', label: '요청', desc: '출장 일정·인원·요건 접수' },
    { n: '02', label: '제안', desc: '최적 항공·호텔·의전 제안' },
    { n: '03', label: '확정', desc: '내부 승인 후 발권 확정' },
    { n: '04', label: '진행', desc: '24/7 출장 운영 지원' },
    { n: '05', label: '정산', desc: '비용 자동 분석·리포트' },
  ]
  const cellW = 2.35
  const startX = (SW - (steps.length * cellW + (steps.length - 1) * 0.18)) / 2
  steps.forEach((st, i) => {
    const x = startX + i * (cellW + 0.18)
    const y = 3.2
    s.addShape(pres.ShapeType.ellipse, {
      x: x + cellW / 2 - 0.45,
      y,
      w: 0.9,
      h: 0.9,
      fill: { color: C.amber },
      line: { type: 'none' },
    })
    s.addText(st.n, {
      x: x + cellW / 2 - 0.45,
      y,
      w: 0.9,
      h: 0.9,
      fontFace: FONT_EN,
      fontSize: 16,
      bold: true,
      color: C.ink900,
      align: 'center',
      valign: 'middle',
    })
    s.addText(st.label, {
      x,
      y: y + 1.1,
      w: cellW,
      h: 0.5,
      fontFace: FONT_KO,
      fontSize: 22,
      bold: true,
      color: C.white,
      align: 'center',
    })
    s.addText(st.desc, {
      x,
      y: y + 1.7,
      w: cellW,
      h: 0.7,
      fontFace: FONT_KO,
      fontSize: 11,
      color: C.gray400,
      align: 'center',
      lineSpacingMultiple: 1.5,
    })
    if (i < steps.length - 1) {
      s.addText('›', {
        x: x + cellW - 0.05,
        y: y + 0.2,
        w: 0.4,
        h: 0.5,
        fontFace: FONT_EN,
        fontSize: 28,
        bold: true,
        color: C.amber,
        align: 'center',
        valign: 'middle',
      })
    }
  })

  pageNum(s, 6, TOTAL, true)
}

// ---------------------------------------------------------------------------
// Slide 8 — Inbound Tour — Header
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide()
  fillBg(s, C.ink900)
  accentBar(s, C.amber)
  eyebrow(s, 'INBOUND TOUR', 0.8, 0.7, C.amber)
  s.addText('한국을 찾는 글로벌 VIP를 위한', {
    x: 0.8,
    y: 1.1,
    w: 12,
    h: 0.7,
    fontFace: FONT_KO,
    fontSize: 32,
    bold: true,
    color: C.white,
  })
  s.addText('프리미엄 의전 투어', {
    x: 0.8,
    y: 1.85,
    w: 12,
    h: 0.7,
    fontFace: FONT_KO,
    fontSize: 32,
    bold: true,
    color: C.white,
  })
  s.addText('Premium Inbound Experience for Your Global VIPs in Korea.', {
    x: 0.8,
    y: 2.7,
    w: 12,
    h: 0.5,
    fontFace: FONT_EN,
    fontSize: 18,
    italic: true,
    color: C.amber,
  })

  s.addText(
    '해외 본사·파트너사·바이어가 한국을 방문할 때, 공항 영접부터 비즈니스 미팅, 산업 시찰, 문화 체험까지 모든 디테일을 Mustgo가 책임집니다.',
    {
      x: 0.8,
      y: 3.6,
      w: 11.5,
      h: 1.0,
      fontFace: FONT_KO,
      fontSize: 16,
      color: C.gray300,
      lineSpacingMultiple: 1.7,
    },
  )
  s.addText(
    'When global headquarters, partners, and buyers visit Korea, Mustgo handles every detail from airport arrival to executive meetings, industry tours, and cultural experiences.',
    {
      x: 0.8,
      y: 4.7,
      w: 11.5,
      h: 1.0,
      fontFace: FONT_EN,
      fontSize: 14,
      italic: true,
      color: C.amber,
      lineSpacingMultiple: 1.6,
    },
  )

  pageNum(s, 7, TOTAL, true)
}

// ---------------------------------------------------------------------------
// Slide 9 — Audience
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide()
  fillBg(s, C.ink900)
  accentBar(s, C.amber)
  eyebrow(s, 'AUDIENCE', 0.8, 0.7, C.amber)
  s.addText('이런 분들을 위한 서비스입니다', {
    x: 0.8,
    y: 1.05,
    w: 12,
    h: 0.8,
    fontFace: FONT_KO,
    fontSize: 30,
    bold: true,
    color: C.white,
  })

  const audience = [
    {
      title: '본사 경영진의 한국 방문 책임자',
      en: 'For HQ travel coordinators arranging executive visits',
      quote: 'CEO·임원·이사회 멤버의 일정을, 단 한 번의 미스도 없이.',
    },
    {
      title: '해외 연사·VIP 게스트의\n한국 체류 담당자',
      en: 'For staff coordinating international speakers and VIP guests in Korea',
      quote: '참가자 만족도가 행사의 성공을 결정합니다.',
    },
    {
      title: 'B2B 미팅·공장 시찰을\n동행하시는 분',
      en: 'For partners coordinating buyer or vendor visits',
      quote: '비즈니스의 첫인상이, 거래의 결과를 바꿉니다.',
    },
  ]
  const cardW = 3.95
  const cardH = 4.3
  audience.forEach((a, i) => {
    const x = 0.8 + i * (cardW + 0.25)
    const y = 2.4
    s.addShape(pres.ShapeType.rect, {
      x,
      y,
      w: cardW,
      h: cardH,
      fill: { color: C.ink800 },
      line: { type: 'none' },
    })
    s.addShape(pres.ShapeType.rect, {
      x,
      y,
      w: cardW,
      h: 0.06,
      fill: { color: C.green },
      line: { type: 'none' },
    })
    s.addText(a.title, {
      x: x + 0.5,
      y: y + 0.5,
      w: cardW - 1,
      h: 1.3,
      fontFace: FONT_KO,
      fontSize: 18,
      bold: true,
      color: C.white,
      lineSpacingMultiple: 1.3,
    })
    s.addText(a.en, {
      x: x + 0.5,
      y: y + 1.95,
      w: cardW - 1,
      h: 0.8,
      fontFace: FONT_EN,
      fontSize: 11,
      italic: true,
      color: C.amber,
      lineSpacingMultiple: 1.4,
    })
    s.addShape(pres.ShapeType.line, {
      x: x + 0.5,
      y: y + 2.95,
      w: 0.6,
      h: 0,
      line: { color: C.amber, width: 1.5 },
    })
    s.addText(a.quote, {
      x: x + 0.5,
      y: y + 3.05,
      w: cardW - 1,
      h: 1.1,
      fontFace: FONT_KO,
      fontSize: 13,
      color: C.gray300,
      lineSpacingMultiple: 1.6,
    })
  })

  pageNum(s, 8, TOTAL, true)
}

// ---------------------------------------------------------------------------
// Slide 10 — Three Areas
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide()
  fillBg(s, C.ink900)
  accentBar(s, C.amber)
  eyebrow(s, 'THREE AREAS', 0.8, 0.7, C.amber)
  s.addText('3가지 영역에서 모든 것을 준비합니다', {
    x: 0.8,
    y: 1.05,
    w: 12,
    h: 0.8,
    fontFace: FONT_KO,
    fontSize: 30,
    bold: true,
    color: C.white,
  })

  const areas = [
    {
      eyebrow: 'VIP CONCIERGE',
      tone: C.blue,
      body: '공항 영접 · 프리미엄 차량\n통역 · 일정 매니지먼트',
    },
    {
      eyebrow: 'BUSINESS PROGRAM',
      tone: C.amber,
      body: 'B2B 미팅 · 산업 시찰\n정부 방문 · MOU 운영',
    },
    {
      eyebrow: 'CULTURAL TOUR',
      tone: C.green,
      body: '한국의 멋과 맛을 동시에 즐기는\nK-컬처 체험',
    },
  ]
  const cardW = 3.95
  const cardH = 4.3
  areas.forEach((a, i) => {
    const x = 0.8 + i * (cardW + 0.25)
    const y = 2.4
    s.addShape(pres.ShapeType.rect, {
      x,
      y,
      w: cardW,
      h: cardH,
      fill: { color: C.ink800 },
      line: { type: 'none' },
    })
    s.addShape(pres.ShapeType.rect, {
      x,
      y: y + cardH - 0.06,
      w: cardW,
      h: 0.06,
      fill: { color: a.tone },
      line: { type: 'none' },
    })
    s.addText(`0${i + 1}`, {
      x: x + 0.5,
      y: y + 0.5,
      w: 1.5,
      h: 0.6,
      fontFace: FONT_EN,
      fontSize: 36,
      bold: true,
      color: a.tone,
    })
    s.addText(a.eyebrow, {
      x: x + 0.5,
      y: y + 1.7,
      w: cardW - 1,
      h: 0.5,
      fontFace: FONT_EN,
      fontSize: 14,
      bold: true,
      color: a.tone,
      charSpacing: 4,
    })
    s.addShape(pres.ShapeType.line, {
      x: x + 0.5,
      y: y + 2.3,
      w: 0.6,
      h: 0,
      line: { color: C.amber, width: 1.5 },
    })
    s.addText(a.body, {
      x: x + 0.5,
      y: y + 2.45,
      w: cardW - 1,
      h: 1.7,
      fontFace: FONT_KO,
      fontSize: 14,
      color: C.gray300,
      lineSpacingMultiple: 1.7,
    })
  })

  pageNum(s, 9, TOTAL, true)
}

// ---------------------------------------------------------------------------
// Slide 11 — Why Mustgo (recap)
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide()
  fillBg(s, C.white)
  accentBar(s, C.amber)
  eyebrow(s, 'WHY MUSTGO', 0.8, 0.7)
  s.addText(
    [
      { text: '왜 ', options: { color: C.gray900 } },
      ...brandTextDark(30),
      { text: '인가?', options: { color: C.gray900 } },
    ],
    {
      x: 0.8,
      y: 1.05,
      w: 12,
      h: 0.8,
      fontFace: FONT_KO,
      fontSize: 30,
      bold: true,
    },
  )

  const rows = [
    { tag: 'OUTBOUND', tone: C.blue, body: '국내 기업의 해외 출장 — 항공·호텔·의전·정산 원스톱' },
    { tag: 'INBOUND', tone: C.green, body: '해외 VIP의 한국 방문 — 공항 영접·통역·문화 체험까지' },
    { tag: 'DETAIL', tone: C.amber, body: '임원 출장과 의전 투어로 다져진 운영 디테일' },
    { tag: '24 / 7', tone: C.blueDark, body: '시차에 관계없이 즉시 응답하는 전담 운영팀' },
  ]
  rows.forEach((r, i) => {
    const y = 2.3 + i * 1.05
    s.addShape(pres.ShapeType.rect, {
      x: 0.8,
      y,
      w: 1.7,
      h: 0.8,
      fill: { color: r.tone },
      line: { type: 'none' },
    })
    s.addText(r.tag, {
      x: 0.8,
      y,
      w: 1.7,
      h: 0.8,
      fontFace: FONT_EN,
      fontSize: 13,
      bold: true,
      color: C.white,
      align: 'center',
      valign: 'middle',
      charSpacing: 4,
    })
    s.addShape(pres.ShapeType.line, {
      x: 2.7,
      y: y + 0.4,
      w: 9.4,
      h: 0,
      line: { color: C.gray200, width: 0.75 },
    })
    s.addText(r.body, {
      x: 2.85,
      y,
      w: 9.5,
      h: 0.8,
      fontFace: FONT_KO,
      fontSize: 16,
      color: C.gray800,
      valign: 'middle',
    })
  })

  pageNum(s, 10, TOTAL, false)
}

// ---------------------------------------------------------------------------
// Slide 12 — Contact
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide()
  fillBg(s, C.soft)
  accentBar(s, C.amber)
  eyebrow(s, 'CONTACT', 0.8, 0.7)
  s.addText(
    [
      { text: '가장 빠른 답변, ', options: { color: C.gray900 } },
      ...brandTextDark(30),
      { text: '가 드립니다.', options: { color: C.gray900 } },
    ],
    {
      x: 0.8,
      y: 1.05,
      w: 12,
      h: 0.8,
      fontFace: FONT_KO,
      fontSize: 30,
      bold: true,
    },
  )
  s.addText('영업일 기준 1일 이내, 담당 컨설턴트가 직접 회신해 드립니다.', {
    x: 0.8,
    y: 1.85,
    w: 12,
    h: 0.5,
    fontFace: FONT_KO,
    fontSize: 14,
    color: C.gray500,
  })

  const items = [
    { eyebrow: 'PHONE', label: '053-255-5992', helper: '평일 09:00 – 18:00', tone: C.blue },
    {
      eyebrow: '24/7 EMERGENCY LINE',
      label: '계약 기업 전용 핫라인 제공',
      helper: '시차에 관계없이 즉시 응답',
      tone: C.amber,
    },
    { eyebrow: 'EMAIL', label: 'jhlee@mustgokorea.com', helper: '', tone: C.green, eng: true },
    {
      eyebrow: 'ADDRESS',
      label: '(42250) 대구광역시 수성구 알파시티 1로 31길 19, 5F',
      helper: 'MG 뉴턴 알파시티',
      tone: C.blueDark,
    },
  ]
  items.forEach((it, i) => {
    const col = i % 2
    const row = Math.floor(i / 2)
    const x = 0.8 + col * 6.05
    const y = 2.7 + row * 1.85
    s.addShape(pres.ShapeType.rect, {
      x,
      y,
      w: 5.85,
      h: 1.6,
      fill: { color: C.white },
      line: { color: C.gray200, width: 0.75 },
    })
    s.addShape(pres.ShapeType.rect, {
      x,
      y,
      w: 0.08,
      h: 1.6,
      fill: { color: it.tone },
      line: { type: 'none' },
    })
    s.addText(it.eyebrow, {
      x: x + 0.4,
      y: y + 0.2,
      w: 5.2,
      h: 0.35,
      fontFace: FONT_EN,
      fontSize: 11,
      bold: true,
      color: it.tone,
      charSpacing: 4,
    })
    s.addText(it.label, {
      x: x + 0.4,
      y: y + 0.6,
      w: 5.2,
      h: 0.5,
      fontFace: it.eng ? FONT_EN : FONT_KO,
      fontSize: 17,
      bold: true,
      color: C.gray900,
    })
    if (it.helper) {
      s.addText(it.helper, {
        x: x + 0.4,
        y: y + 1.15,
        w: 5.2,
        h: 0.35,
        fontFace: FONT_KO,
        fontSize: 11,
        color: C.gray500,
      })
    }
  })

  pageNum(s, 11, TOTAL, false)
}

// ---------------------------------------------------------------------------
// Slide 13 — Closing
// ---------------------------------------------------------------------------
{
  const s = pres.addSlide()
  fillBg(s, C.ink900)
  s.addShape(pres.ShapeType.rect, {
    x: 0,
    y: SH - 0.04,
    w: SW,
    h: 0.04,
    fill: { color: C.amber },
    line: { type: 'none' },
  })
  s.addText('Thank You.', {
    x: 0.8,
    y: 2.2,
    w: 12,
    h: 1.3,
    fontFace: FONT_EN,
    fontSize: 88,
    bold: true,
    color: C.white,
    italic: false,
  })
  s.addText(
    [
      { text: '비즈니스 출장의 모든 길, ', options: { color: C.white } },
      ...brandText(28),
      { text: '가 함께합니다.', options: { color: C.white } },
    ],
    {
      x: 0.8,
      y: 3.7,
      w: 12,
      h: 0.7,
      fontFace: FONT_KO,
      fontSize: 28,
      bold: true,
    },
  )
  s.addText('Your Trusted Partner for Business Travel — Outbound & Inbound', {
    x: 0.8,
    y: 4.5,
    w: 12,
    h: 0.5,
    fontFace: FONT_EN,
    fontSize: 16,
    italic: true,
    color: C.amber,
  })

  s.addText('(주)머스트고  ·  대표이사 이종화  ·  053-255-5992  ·  jhlee@mustgokorea.com', {
    x: 0.8,
    y: SH - 1.0,
    w: 12,
    h: 0.4,
    fontFace: FONT_KO,
    fontSize: 11,
    color: C.gray400,
  })
  s.addText('© 2026 Mustgo Co., Ltd. All Rights Reserved.', {
    x: 0.8,
    y: SH - 0.6,
    w: 12,
    h: 0.3,
    fontFace: FONT_EN,
    fontSize: 9,
    color: C.gray500,
  })
}

await pres.writeFile({ fileName: OUT })
console.log('PPT generated:', OUT)
