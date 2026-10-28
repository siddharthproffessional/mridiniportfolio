'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowDown, Download, GraduationCap } from 'lucide-react'
import { degree, person, traits } from '@/lib/content'
import { HUB_COLORS } from '@/lib/scene'
import { cn } from '@/lib/cn'
import { EASE, useReduced } from './motion'

const NetworkScene = dynamic(() => import('./network-scene'), { ssr: false })

export function Hero() {
  const reduce = useReduced()
  const [active, setActive] = useState(0)
  useEffect(() => {
    const on = (e: Event) => setActive((e as CustomEvent<number>).detail)
    window.addEventListener('net:active', on)
    return () => window.removeEventListener('net:active', on)
  }, [])
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration: 0.9, delay, ease: EASE },
  })

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden pb-16 pt-28 sm:pt-32">
      <div aria-hidden className="pointer-events-none absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full bg-lilac blur-3xl" />
      <div aria-hidden className="pointer-events-none absolute -right-32 top-48 h-[22rem] w-[22rem] rounded-full bg-peach/20 blur-3xl" />
      <div className="wrap relative grid items-center gap-10 lg:grid-cols-[1.05fr_1fr]">
        <div>
          <motion.p {...rise(0)} className="kicker">
            <GraduationCap className="h-4 w-4" aria-hidden />
            {degree.org}
          </motion.p>
          <motion.h1 {...rise(0.08)} id="hero-title" className="mt-6 text-[3.3rem] font-medium sm:text-7xl lg:text-[5.2rem]">
            Hi, I’m <span className="italic text-plum">{person.first}</span>.
          </motion.h1>
          <motion.p {...rise(0.2)} className="mt-6 max-w-xl text-[1.15rem] text-ink/80">
            {person.intro}
          </motion.p>
          <motion.ul {...rise(0.3)} className="mt-6 flex flex-wrap gap-2" aria-label="Areas of interest">
            {person.interests.map((x) => (
              <li key={x} className="pill">
                {x}
              </li>
            ))}
          </motion.ul>
          <motion.div {...rise(0.4)} className="mt-8 flex flex-wrap gap-3">
            <a href="#about" className="btn-plum">
              Get to know me
              <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
            <a href={person.resume} download className="btn-soft">
              <Download className="h-4 w-4" aria-hidden />
              Download resume
            </a>
          </motion.div>
        </div>

        <motion.figure {...rise(0.25)} className="panel relative overflow-hidden">
          <div className="relative h-[22rem] bg-gradient-to-b from-lilac/60 to-card sm:h-[27rem]">
            <NetworkScene className="absolute inset-0" />
            <p className="pointer-events-none absolute left-5 top-5 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-plum/80">People & strengths</p>
          </div>
          <div className="border-t border-line px-5 py-4">
            <ul className="flex flex-wrap gap-2" aria-label="Strengths — select one to highlight it">
              {traits.map((t, i) => (
                <li key={t.name}>
                  <button
                    type="button"
                    aria-pressed={active === i}
                    onClick={() => window.dispatchEvent(new CustomEvent('net:focus', { detail: i }))}
                    className={cn(
                      'flex items-center gap-2 rounded-full border px-3 py-1.5 text-[0.85rem] transition-all duration-300',
                      active === i ? 'border-transparent bg-ink text-white shadow-soft' : 'border-line bg-card text-ink/75 hover:border-plum/40',
                    )}
                  >
                    <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: HUB_COLORS[i] }} />
                    {t.name}
                  </button>
                </li>
              ))}
            </ul>
            <figcaption className="mt-3 text-[0.78rem] text-muted">Illustration: each hub is a strength from my resume. Select one, or drag to rotate.</figcaption>
          </div>
        </motion.figure>
      </div>
    </section>
  )
}
