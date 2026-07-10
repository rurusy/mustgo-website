import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { BrandText } from '../components/ui'
import { cn } from '../design/cn'

// =============================================================================
// 사장님 확인 요청 체크리스트 — 비공개 내부 페이지.
// noindex + 어디에서도 링크하지 않음(footer/nav 등록 금지). URL(/checklist)을
// 아는 사람만 접근하는 "URL 비공개" 페이지 — 인증은 없으므로 민감정보는 두지 않음
// (초안 정책값과 확인 질문만 담김). 사장님이 각 법적 문서의 확정값을 빠르게
// 검토·회신하도록 돕는 용도.
// =============================================================================

const CHIP = {
  need: { label: '답 필요', cls: 'bg-amber-50 text-amber-700 ring-1 ring-amber-600/20' },
  ok: { label: '확인만', cls: 'bg-green-50 text-green-700 ring-1 ring-green-600/20' },
  opt: { label: '선택', cls: 'bg-blue-50 text-blue-700 ring-1 ring-blue-600/20' },
}

const DOCS = [
  {
    title: '결제·환불 정책',
    href: '/policy#ko',
    items: [
      { n: 1, name: '시행일', chip: 'need', now: '미정 (to be confirmed)', decide: '언제부터 시행할까요?', hint: '제안: 게시일 2026-07-11 (3개 문서 동일)' },
      { n: 2, name: '견적 유효기간', chip: 'ok', now: '7일', decide: '이대로 괜찮으신가요? 다르면 며칠로?' },
      { n: 3, name: '환불 처리 기간', chip: 'ok', now: '영업일 5~10일', decide: '이대로 괜찮으신가요?' },
      { n: 4, name: '최저 행사인원 통보 기한', chip: 'need', now: '견적서에 개별 명시', decide: '단체 최저인원 미달 시, 며칠 전까지 통보로 못박을까요?', hint: '지금처럼 견적서에 개별 명시로 둬도 무방합니다.' },
      { n: 5, name: '여행자 보험', chip: 'need', now: '“가입 권장, 당사 수배 시 견적서에 명시”', decide: '실제로 보험을 제공/수배하시나요? 그렇다면 보장 내용은?' },
      { n: 6, name: '취소 수수료율', chip: 'ok', now: '0 / 10 / 15 / 20 / 30 / 50% (공정위 국외여행 표준)', decide: '이대로 OK? (인바운드·B2B는 개별 견적이 우선)' },
    ],
  },
  {
    title: '개인정보처리방침',
    href: '/privacy#ko',
    items: [
      { n: 7, name: '시행일', chip: 'ok', now: '2026년 7월 11일', decide: '이대로 OK? (결제 정책과 날짜 통일 권장)' },
      { n: 8, name: '개인정보 보호책임자', chip: 'need', now: '이종화 (대표)', decide: '대표님 본인으로 할까요, 아니면 별도 담당자를 지정하실까요?' },
      { n: 9, name: '문의 정보 보유기간', chip: 'ok', now: '최대 3년', decide: '이대로 OK?', hint: '결제 기록은 전자상거래법상 5년 등 법정기간이라 고정입니다.' },
    ],
  },
  {
    title: '이용약관',
    href: '/terms#ko',
    items: [
      { n: 10, name: '시행일', chip: 'ok', now: '2026년 7월 11일', decide: '이대로 OK?' },
    ],
  },
  {
    title: '공통 — 법률 검토',
    href: null,
    countLabel: '선택 사항',
    items: [
      { n: 11, name: '준거법·관할 / 면책 / 지식재산권 문구', chip: 'opt', now: '표준 기반 초안 (대한민국 준거법 등)', hint: '지금 그대로도 문제 없지만, 원하시면 변호사·KATA 검토를 한 번 받는 것을 권장드립니다. (필수 아님)' },
    ],
  },
]

function Chip({ kind }) {
  const c = CHIP[kind]
  return (
    <span className={cn('shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold', c.cls)}>
      {c.label}
    </span>
  )
}

function Row({ label, children, tone = 'muted' }) {
  return (
    <div className="flex gap-3">
      <span className="w-11 shrink-0 text-gray-400 font-medium">{label}</span>
      <span
        className={cn(
          tone === 'decide' && 'text-gray-800 font-medium',
          tone === 'muted' && 'text-gray-500',
          tone === 'hint' && 'text-gray-400 text-[13px]',
        )}
      >
        {children}
      </span>
    </div>
  )
}

export default function ChecklistPage() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex,nofollow'
    document.head.appendChild(meta)
    const prevTitle = document.title
    document.title = '확인 요청 · Mustgo'
    return () => {
      document.head.removeChild(meta)
      document.title = prevTitle
    }
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-surface-soft">
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-layout mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
          <Link to="/" className="flex items-center" aria-label="Mustgo home">
            <img src="/logo.gif" alt="Mustgo" className="h-10 w-auto object-contain" />
          </Link>
          <span className="text-xs font-eng font-semibold tracking-widest uppercase text-gray-400">
            Internal · Confidential
          </span>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-6 py-12">
          <p className="text-xs font-bold tracking-[0.14em] uppercase text-brand-green mb-3">
            법적 문서 확인 요청
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-3">
            사장님, 이것만 정해주시면 됩니다
          </h1>
          <p className="text-[15px] text-gray-600 leading-relaxed max-w-2xl">
            <BrandText /> 홈페이지의 법적 문서 4종 — 결제·환불 정책, 통신판매업 신고, 개인정보처리방침,
            이용약관 — 을 모두 작성해 게시했습니다. 아래 값만 확정해 주시면 바로 반영합니다. 각 문서의{' '}
            <span className="font-semibold text-gray-800">[페이지에서 보기]</span>를 누르면 실제
            화면(한국어)이 새 탭으로 열립니다.
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-gray-400 border-t border-gray-200 pt-4">
            <span>2026-07-11 기준</span>
            <span className="text-gray-300">·</span>
            <span>(주)머스트고</span>
            <span className="text-gray-300">·</span>
            <span>총 11개 항목 · 대부분 “네/아니오”</span>
          </div>

          {/* 빠른 답 */}
          <div className="mt-8 rounded-xl bg-white border border-gray-200 border-l-4 border-l-brand-green shadow-sm p-6">
            <h2 className="text-[17px] font-bold text-gray-900 mb-1">⚡ 가장 빠른 방법</h2>
            <p className="text-sm text-gray-600 mb-4">
              아래 <span className="text-brand-green font-bold">기본값</span>이 괜찮으시면{' '}
              <b>“전부 OK”</b> 한 마디만 주셔도 그대로 반영합니다.
            </p>
            <ul className="space-y-1.5 text-sm text-gray-700">
              {[
                <><b>시행일</b> — 3개 문서 모두 <b>2026년 7월 11일</b>로 통일</>,
                <><b>개인정보 보호책임자</b> — 대표님(이종화)</>,
                <><b>문의 정보 보유기간</b> — 3년</>,
                <><b>취소수수료 · 견적 유효기간(7일) · 환불 처리(영업일 5~10일)</b> — 업계 표준값</>,
              ].map((t, i) => (
                <li key={i} className="relative pl-5">
                  <span className="absolute left-0 text-brand-green font-bold">✓</span>
                  {t}
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-dashed border-gray-200 text-sm text-gray-700">
              <span className="text-amber-700 font-bold">사장님만 아시는 2가지</span>만 따로 확인 부탁드립니다:
              <ul className="mt-2 pl-5 list-disc space-y-1 marker:text-gray-300">
                <li>여행자 보험을 <b>실제로 제공/수배</b>하시나요? (보장 내용)</li>
                <li>단체 <b>최저 행사인원 통보 기한</b>을 구체적으로 정할까요? <span className="text-gray-400">(안 정해도 무방)</span></li>
              </ul>
            </div>
          </div>

          <p className="text-xs font-bold tracking-[0.1em] uppercase text-gray-400 mt-10 mb-3">
            문서별 상세 — 항목 번호로 답해주셔도 됩니다
          </p>

          <div className="space-y-4">
            {DOCS.map((doc) => (
              <section key={doc.title} className="rounded-xl bg-white border border-gray-200 shadow-sm overflow-hidden">
                <div className="flex items-center justify-between gap-3 flex-wrap px-5 py-4 bg-gray-50/70 border-b border-gray-200">
                  <h3 className="text-[16px] font-bold text-gray-900 flex items-baseline gap-2 flex-wrap">
                    {doc.title}
                    <span className="text-[12px] font-semibold text-gray-400">
                      {doc.countLabel ?? `${doc.items.length}개 항목`}
                    </span>
                  </h3>
                  {doc.href && (
                    <a
                      href={doc.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[13px] font-bold text-brand-blue bg-brand-blue/10 hover:bg-brand-blue/20 rounded-full px-3.5 py-1.5 transition-colors whitespace-nowrap"
                    >
                      페이지에서 보기 <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>
                <div className="px-5">
                  {doc.items.map((it) => (
                    <div key={it.n} className="py-4 border-b border-gray-100 last:border-b-0">
                      <div className="flex items-center gap-2.5 mb-2 flex-wrap">
                        <span className="w-6 h-6 shrink-0 rounded-md border border-gray-200 text-[12px] font-bold text-gray-400 inline-flex items-center justify-center tabular-nums">
                          {it.n}
                        </span>
                        <span className="font-bold text-[15px] text-gray-900">{it.name}</span>
                        <Chip kind={it.chip} />
                      </div>
                      <div className="pl-8 space-y-1 text-sm">
                        <Row label="현재" tone="muted">
                          <span className="inline-block bg-gray-100 text-gray-600 rounded px-2 py-0.5 text-[13px]">
                            {it.now}
                          </span>
                        </Row>
                        {it.decide && (
                          <Row label={it.chip === 'need' ? '결정' : '확인'} tone="decide">
                            {it.decide}
                          </Row>
                        )}
                        {it.hint && (
                          <Row label="참고" tone="hint">
                            {it.hint}
                          </Row>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>

          {/* 답변 방법 */}
          <div className="mt-8 rounded-xl bg-green-50 p-6">
            <h2 className="text-[16px] font-bold text-gray-900 mb-2">답변 방법</h2>
            <p className="text-sm text-gray-700">
              항목 <b>번호별</b>로 “OK” 또는 수정값만 알려주시면 그대로 반영하겠습니다.
            </p>
            <p className="text-[13px] text-gray-500 mt-2.5">
              예시:{' '}
              <code className="bg-white rounded px-2 py-0.5 text-[12.5px] text-gray-700">
                전부 OK, 5번 보험은 제공 안 함, 8번 담당자는 김OO 과장
              </code>
            </p>
          </div>

          <p className="mt-6 text-center text-[12.5px] text-gray-400">
            각 문서 하단에는 “표준 기반 초안이며 법률 자문이 아님” 안내가 포함되어 있습니다.
          </p>
        </div>
      </main>
    </div>
  )
}
