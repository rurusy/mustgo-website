import { useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
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
      </Routes>
    </>
  )
}
