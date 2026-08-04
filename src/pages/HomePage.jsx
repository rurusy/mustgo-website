import { useEffect } from 'react'
import { useHtmlLang } from '../hooks/useHtmlLang'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { FloatingCTA } from '../components/layout/FloatingCTA'
import { HolidayNotice } from '../components/layout/HolidayNotice'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Corporate } from '../components/sections/Corporate'
import { Inbound } from '../components/sections/Inbound'
import { Contact } from '../components/sections/Contact'

export default function HomePage() {
  // SPA 네비게이션(/en → /)으로 진입해도 문서 언어/제목이 한국어로 복원되도록.
  useHtmlLang('ko')
  useEffect(() => {
    document.title = 'Mustgo — 비즈니스 출장의 양방향 전문가'
  }, [])

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Corporate />
        <Inbound />
        <Contact />
      </main>
      <Footer />
      <FloatingCTA />
      <HolidayNotice />
    </>
  )
}
