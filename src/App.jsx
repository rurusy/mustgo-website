import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate, useNavigationType } from 'react-router-dom'
import { hasPendingRecovery, PASSWORD_RESET_PATH } from './lib/supabase'
import HomePage from './pages/HomePage'
import EnHomePage from './pages/EnHomePage'
import StyleguidePage from './pages/StyleguidePage'
import PayPage from './pages/PayPage'
import PayKrPage from './pages/PayKrPage'
import PayKrResultPage from './pages/PayKrResultPage'
import PayGuidePage from './pages/PayGuidePage'
import PolicyPage from './pages/PolicyPage'
import PrivacyPage from './pages/PrivacyPage'
import TermsPage from './pages/TermsPage'
import ChecklistPage from './pages/ChecklistPage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminResetPasswordPage from './pages/AdminResetPasswordPage'
import AdminPage from './pages/AdminPage'
import AdminPaymentsPage from './pages/AdminPaymentsPage'
import CityPage from './pages/CityPage'
import AttractionPage from './pages/AttractionPage'
import { LANGS, attractionPath, attractions, cities, cityPath } from './data/attractions'

// 경로 상수는 canonical·sitemap 과 맞추려고 뒤에 슬래시를 붙여 둔다. 라우트 정의에는
// 슬래시를 떼어 넘긴다 — React Router 는 슬래시 없는 패턴이면 양쪽 다 매칭한다.
const routePath = (p) => p.replace(/\/$/, '')

// 라우트가 바뀌어도 브라우저는 스크롤 위치를 그대로 들고 간다. 홈 중간에서 관광지
// 허브로 넘어가면 허브의 "한참 아래"가 보이는 이유다 — 페이지가 바뀌었는데 눈에는
// 안 바뀐 것처럼 보이므로 반드시 맨 위로 올려야 한다.
//
//  - 해시가 붙어 있으면(/#contact) 그 섹션으로 보낸다. 고정 헤더 높이만큼 빼는 건
//    Header 의 앵커 처리와 같은 계산이다.
//  - 뒤로/앞으로 이동(POP)은 건드리지 않는다. 브라우저가 복원한 위치를 덮어쓰면
//    "뒤로 갔더니 맨 위"가 되어 더 불편하다. 첫 로드도 POP 이라 해시 앵커는
//    브라우저 기본 동작에 맡겨진다.
function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    if (navigationType === 'POP') return

    const apply = () => {
      // behavior 를 반드시 명시한다. index.html 의 <html class="scroll-smooth"> 때문에
      // 생략하면 페이지를 넘길 때마다 화면이 길게 미끄러진다.
      if (hash) {
        const target = document.querySelector(hash)
        if (target) {
          const headerEl = document.getElementById('main-header')
          const offset = headerEl ? headerEl.offsetHeight : 0
          window.scrollTo({
            top: target.getBoundingClientRect().top + window.scrollY - offset,
            behavior: 'instant',
          })
          return
        }
      }
      window.scrollTo({ top: 0, behavior: 'instant' })
    }

    apply()
    // 한 번으로는 부족하다. 이 effect 가 끝난 뒤에도 (1) 브라우저가 줄어든 문서 높이에
    // 맞춰 스크롤을 다시 잡고, (2) 새 페이지의 이미지가 뒤늦게 자리를 잡으면서 위치가
    // 밀린다. 실제로 홈(높이 6400)에서 허브(1400)로 넘어가면 리셋 직후 스크롤이
    // 페이지 맨 아래로 끌려갔다 — "눌렀더니 맞춤 견적 버튼이 보인다"가 그 증상이다.
    const raf = requestAnimationFrame(() => requestAnimationFrame(apply))
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash, navigationType])

  return null
}

// 비밀번호 재설정 메일의 링크가 항상 재설정 화면으로 떨어지지는 않는다.
// Supabase 대시보드에서 직접 보낸 메일은 redirectTo 를 지정할 수 없어 프로젝트의
// Site URL(= 홈)로 돌아오고, 그러면 복구 토큰만 실린 채 홈페이지가 렌더되고 끝난다.
// 복구 토큰을 들고 들어왔으면 어느 경로로 떨어졌든 재설정 화면으로 넘긴다.
function RecoveryRedirect() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    if (pathname === PASSWORD_RESET_PATH) return
    if (!hasPendingRecovery()) return
    navigate(PASSWORD_RESET_PATH, { replace: true })
  }, [navigate, pathname])

  return null
}

export default function App() {
  return (
    <>
      <RecoveryRedirect />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/en" element={<EnHomePage />} />
        <Route path="/styleguide" element={<StyleguidePage />} />
        <Route path="/pay" element={<PayPage />} />
        {/* 국내 원화 결제(토스페이먼츠). 결제창이 아래 두 URL 로 되돌려보냅니다. */}
        <Route path="/pay-kr" element={<PayKrPage />} />
        <Route path="/pay-kr/success" element={<PayKrResultPage outcome="success" />} />
        <Route path="/pay-kr/fail" element={<PayKrResultPage outcome="fail" />} />
        <Route path="/how-to-pay" element={<PayGuidePage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/checklist" element={<ChecklistPage />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        {/* 복구 메일 링크의 착지점. Supabase Redirect URLs 에 등록되어 있어야 합니다. */}
        <Route path={PASSWORD_RESET_PATH} element={<AdminResetPasswordPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/payments" element={<AdminPaymentsPage />} />

        {/*
          방한 VIP 의전 투어 콘텐츠. 라우트는 src/data/attractions.js 하나에서
          한국어(루트)·영어(/en) 양쪽으로 생성된다 — 관광지를 늘릴 때 이 파일은
          건드리지 않는다. 같은 목록을 scripts/prerender.mjs 와
          scripts/gen-sitemap.mjs 도 읽는다.
        */}
        {cities.flatMap((city) =>
          LANGS.map((lang) => (
            <Route
              key={`city-${lang}-${city.slug}`}
              path={routePath(cityPath(lang, city.slug))}
              element={<CityPage city={city} lang={lang} />}
            />
          )),
        )}
        {attractions.flatMap((attraction) =>
          LANGS.map((lang) => (
            <Route
              key={`spot-${lang}-${attraction.slug}`}
              path={routePath(attractionPath(lang, attraction))}
              element={<AttractionPage attraction={attraction} lang={lang} />}
            />
          )),
        )}
      </Routes>
    </>
  )
}
