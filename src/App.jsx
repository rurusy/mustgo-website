import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StyleguidePage from './pages/StyleguidePage'
import AdminLoginPage from './pages/AdminLoginPage'
import AdminPage from './pages/AdminPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/styleguide" element={<StyleguidePage />} />
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}
