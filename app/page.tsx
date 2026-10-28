import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { About, Beyond, Contact, Education, Experience, Footer, Skills } from '@/components/sections'

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <About />
        <Education />
        <Experience />
        <Skills />
        <Beyond />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
