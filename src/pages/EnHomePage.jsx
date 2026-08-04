import { useEffect } from 'react'
import { useHtmlLang } from '../hooks/useHtmlLang'
import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/en/Footer'
import { FloatingCTA } from '../components/layout/FloatingCTA'
import { HolidayNotice } from '../components/layout/HolidayNotice'
import { Hero } from '../components/sections/en/Hero'
import { About } from '../components/sections/en/About'
import { Corporate } from '../components/sections/en/Corporate'
import { Inbound } from '../components/sections/en/Inbound'
import { Contact } from '../components/sections/Contact'

export default function EnHomePage() {
  useHtmlLang('en')
  useEffect(() => {
    document.title = 'Mustgo — Your Trusted Partner in Business Travel'
  }, [])

  return (
    <>
      <Header lang="en" />
      <main>
        <Hero />
        <About />
        <Corporate />
        <Inbound />
        <Contact lang="en" />
      </main>
      <Footer />
      <FloatingCTA lang="en" />
      <HolidayNotice lang="en" />
    </>
  )
}
