import { Route, Routes } from 'react-router-dom'
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
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
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
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}
