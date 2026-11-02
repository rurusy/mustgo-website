import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useHtmlLang } from '../hooks/useHtmlLang'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { Button } from '../components/ui'
import { sampleProduct as p } from '../data/sampleProduct'

// 토스페이먼츠 심사용 (샘플) 상품 상세 — 심사 통과 후 삭제. 자세한 사정은 data/sampleProduct.js.
// "결제하기"는 /pay-kr 로 금액과 상품명을 넘겨 기존 결제 흐름을 그대로 탄다.

const MAX_QTY = 99
const won = (n) => `${n.toLocaleString('ko-KR')}원`

function SectionTitle({ children }) {
  return <h2 className="text-lg font-bold text-gray-900 mb-4">{children}</h2>
}

export default function ProductPage() {
  useHtmlLang('ko')
  const navigate = useNavigate()
  const [qty, setQty] = useState(1)

  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex,follow'
    document.head.appendChild(meta)
    const prevTitle = document.title
    document.title = `${p.name} · Mustgo`
    return () => {
      document.head.removeChild(meta)
      document.title = prevTitle
    }
  }, [])

  const priced = Number.isSafeInteger(p.pricePerPerson) && p.pricePerPerson > 0
  const total = priced ? p.pricePerPerson * qty : 0
  const setQtySafe = (n) => setQty(Math.min(MAX_QTY, Math.max(1, n)))

  const onBuy = () => {
    const params = new URLSearchParams({ amount: String(total), ref: `${p.name} ${qty}인` })
    navigate(`/pay-kr?${params}`)
  }

  return (
    <>
      <Header />
      <main className="pt-20 bg-white">
        {/* 상단: 상품명 + 가격·구매 */}
        <section className="bg-ink-900 text-white">
          <div className="max-w-layout mx-auto px-6 lg:px-12 py-14 lg:py-20 grid gap-10 lg:grid-cols-[1fr_380px] lg:items-center">
            <div>
              <p className="text-xs font-eng font-bold uppercase tracking-wide2 text-amber-500">
                Seoul · Busan
              </p>
              <h1 className="mt-3 text-3xl sm:text-4xl font-bold tracking-tight">
                {p.name} 여행상품
              </h1>
              <p className="mt-2 font-eng text-sm text-gray-400">{p.nameEn}</p>
              <p className="mt-6 text-gray-300 leading-relaxed">{p.tagline}</p>
              <ul className="mt-6 flex flex-wrap gap-2 text-sm text-gray-200">
                {['4박 5일', '서울 · 남이섬 · 부산', `최소 ${p.minGroup}인 출발`, '전용 버스 · 가이드 포함'].map((t) => (
                  <li key={t} className="rounded-full border border-white/20 px-3 py-1">
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-lg bg-white text-gray-900 p-6 shadow-xl">
              <p className="text-sm text-gray-500">상품 가격 (1인 기준)</p>
              <p className="mt-1 text-3xl font-bold">
                {priced ? won(p.pricePerPerson) : '가격 확정 전'}
              </p>

              <div className="mt-6 flex items-center justify-between">
                <label htmlFor="qty" className="text-sm font-medium text-gray-700">
                  인원
                </label>
                <div className="flex items-center rounded border border-gray-200">
                  <button
                    type="button"
                    onClick={() => setQtySafe(qty - 1)}
                    className="w-10 h-10 text-lg text-gray-600 hover:text-brand-blue disabled:text-gray-300"
                    disabled={qty <= 1}
                    aria-label="인원 줄이기"
                  >
                    −
                  </button>
                  <input
                    id="qty"
                    inputMode="numeric"
                    value={qty}
                    onChange={(e) => setQtySafe(Number(e.target.value.replace(/\D/g, '')) || 1)}
                    className="w-12 h-10 text-center font-semibold border-x border-gray-200 focus:outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setQtySafe(qty + 1)}
                    className="w-10 h-10 text-lg text-gray-600 hover:text-brand-blue disabled:text-gray-300"
                    disabled={qty >= MAX_QTY}
                    aria-label="인원 늘리기"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-5 pt-5 border-t border-gray-100 flex items-baseline justify-between">
                <span className="text-sm text-gray-500">총 결제 금액</span>
                <span className="text-2xl font-bold text-brand-blue">
                  {priced ? won(total) : '-'}
                </span>
              </div>

              <Button
                type="button"
                variant="blueSolid"
                size="md"
                className="w-full mt-5"
                onClick={onBuy}
                disabled={!priced}
              >
                결제하기
              </Button>
              <p className="mt-3 text-xs text-gray-400 leading-relaxed">
                결제 전{' '}
                <Link to="/policy" className="underline hover:text-brand-blue">
                  결제·환불 정책
                </Link>
                을 확인해 주세요.
              </p>
            </div>
          </div>
        </section>

        <div className="max-w-layout mx-auto px-6 lg:px-12 py-14 space-y-14">
          {/* 가격 안내 */}
          <section>
            <ul className="space-y-1 text-sm text-gray-600 leading-relaxed">
              {p.priceNotes.map((t) => (
                <li key={t}>* {t}</li>
              ))}
            </ul>
          </section>

          {/* 포함 / 불포함 */}
          <section className="grid gap-6 md:grid-cols-2">
            {[
              ['포함사항', p.included, 'border-brand-blue'],
              ['불포함사항', p.excluded, 'border-gray-300'],
            ].map(([title, items, accent]) => (
              <div key={title} className={`rounded-lg border border-gray-200 border-t-4 ${accent} p-6`}>
                <SectionTitle>{title}</SectionTitle>
                <ul className="list-disc pl-5 space-y-1.5 text-[15px] text-gray-700">
                  {items.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* 일정표 */}
          <section>
            <SectionTitle>일정표</SectionTitle>
            <p className="-mt-2 mb-6 text-sm text-gray-500">* {p.itineraryNote}</p>
            <ol className="space-y-5">
              {p.itinerary.map((d) => (
                <li key={d.day} className="rounded-lg border border-gray-200 p-6">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-eng text-sm font-bold text-brand-blue">DAY {d.day}</span>
                    <h3 className="text-lg font-bold text-gray-900">{d.region}</h3>
                  </div>
                  <p className="mt-3 text-[15px] font-medium text-gray-800 leading-relaxed">
                    {d.route.join(' → ')}
                  </p>
                  {d.routeNote && <p className="mt-1 text-sm text-gray-500">* {d.routeNote}</p>}
                  <p className="mt-3 text-[15px] text-gray-600 leading-relaxed">{d.desc}</p>
                  <p className="mt-4 text-sm text-gray-700">
                    <span className="font-semibold">식사</span> · {d.meals.join(' / ')}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          {/* 서비스 제공 · 취소/환불 요약 */}
          <section className="rounded-lg bg-surface-soft p-6 sm:p-8">
            <SectionTitle>서비스 제공 및 취소·환불 안내</SectionTitle>
            <ul className="list-disc pl-5 space-y-1.5 text-[15px] text-gray-700 leading-relaxed">
              <li>실물 상품의 배송은 없습니다. 결제 확인 후 담당자가 예약 확정서와 일정표를 이메일로 보내드립니다.</li>
              <li>여행 개시일 30일 전까지 취소하시면 전액 환불되며, 이후에는 통보 시점에 따라 취소수수료가 부과됩니다.</li>
              <li>환불은 결제하신 수단으로 처리되며, 자세한 기준은 결제·환불 정책을 따릅니다.</li>
            </ul>
            <Link
              to="/policy"
              className="inline-block mt-4 text-sm font-semibold text-brand-blue hover:underline"
            >
              결제·환불 정책 전문 보기 →
            </Link>
          </section>
        </div>
      </main>
      <Footer />
    </>
  )
}
