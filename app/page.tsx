import { Nav } from '@/components/nav'
import { Hero } from '@/components/hero'
import { About, Beyond, Contact, Education, Experience, Marquee, Skills, Why } from '@/components/sections'

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Why />
        <Education />
        <Experience />
        <Skills />
        <Beyond />
        <Contact />
      </main>
    </>
  )
}
