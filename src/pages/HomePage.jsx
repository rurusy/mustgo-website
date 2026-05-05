import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { FloatingCTA } from '../components/layout/FloatingCTA'
import { Hero } from '../components/sections/Hero'
import { About } from '../components/sections/About'
import { Corporate } from '../components/sections/Corporate'
import { Inbound } from '../components/sections/Inbound'
import { Contact } from '../components/sections/Contact'

export default function HomePage() {
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
    </>
  )
}
