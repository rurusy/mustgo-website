import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import StyleguidePage from './pages/StyleguidePage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/styleguide" element={<StyleguidePage />} />
    </Routes>
  )
}
