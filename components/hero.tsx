'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import { ArrowDown, Download } from 'lucide-react'
import { glance, person, traits } from '@/lib/content'
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
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration: 1, delay, ease: EASE },
  })
  const [firstName, lastName] = person.name.split(' ')

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden bg-night text-white">
      {/* Atmosphere */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="drift absolute -left-[20%] -top-[30%] h-[80vh] w-[80vh] rounded-full bg-[hsl(266_45%_32%/0.55)] blur-[120px]" />
        <div className="drift absolute -right-[15%] top-[20%] h-[60vh] w-[60vh] rounded-full bg-[hsl(14_70%_55%/0.22)] blur-[120px] [animation-delay:-6s]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-night" />
        <div className="grain absolute inset-0" />
      </div>

      <div className="wrap grid min-h-[100svh] items-center gap-6 pb-10 pt-28 lg:grid-cols-[1.08fr_1fr] lg:pt-24">
        <div className="relative z-10">
          <motion.p {...rise(0)} className="inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-[0.82rem] text-white/85 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="ping-soft absolute inline-flex h-full w-full rounded-full bg-[hsl(150_55%_60%)]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(150_55%_60%)]" />
            </span>
            Open to part-time HR internships
          </motion.p>
          <h1 id="hero-title" aria-label={person.name} className="mt-7 font-medium tracking-tightest text-white">
            <motion.span {...rise(0.08)} className="block text-[3.6rem] leading-[0.95] sm:text-[5.4rem] lg:text-[6.6rem]">
              {firstName}
            </motion.span>
            <motion.span {...rise(0.16)} className="text-gradient block pb-2 text-[3.6rem] italic leading-[0.95] sm:text-[5.4rem] lg:text-[6.6rem]">
              {lastName}
            </motion.span>
          </h1>
          <motion.p {...rise(0.28)} className="mt-6 max-w-xl text-[1.12rem] leading-relaxed text-white/75">
            Psychology × Human Resources. {person.intro.replace('Second-year Psychology with Human Resource Management student', 'A second-year student')}
          </motion.p>
          <motion.div {...rise(0.38)} className="mt-9 flex flex-wrap gap-3">
            <a href={person.resume} download className="btn bg-white text-night shadow-[0_10px_40px_-10px_hsl(32_60%_78%/0.6)] hover:-translate-y-0.5">
              <Download className="h-4 w-4" aria-hidden />
              Download resume
            </a>
            <a href="#why" className="btn border border-white/20 text-white hover:-translate-y-0.5 hover:border-white/50">
              Why hire me
              <ArrowDown className="h-4 w-4" aria-hidden />
            </a>
          </motion.div>
        </div>

        <motion.figure {...rise(0.2)} className="relative -mx-5 sm:mx-0">
          <div className="relative h-[24rem] sm:h-[30rem] lg:h-[36rem]">
            <NetworkScene className="absolute inset-0" />
          </div>
          <div className="relative z-10 -mt-6 px-5 sm:px-0">
            <ul className="flex flex-wrap justify-center gap-2" aria-label="Strengths — select one to highlight it">
              {traits.map((t, i) => (
                <li key={t.name}>
                  <button
                    type="button"
                    aria-pressed={active === i}
                    onClick={() => window.dispatchEvent(new CustomEvent('net:focus', { detail: i }))}
                    className={cn(
                      'flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[0.85rem] backdrop-blur transition-all duration-300',
                      active === i ? 'border-white/40 bg-white text-night' : 'border-white/15 bg-white/[0.06] text-white/75 hover:border-white/35 hover:text-white',
                    )}
                  >
                    <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: HUB_COLORS[i], boxShadow: `0 0 12px ${HUB_COLORS[i]}` }} />
                    {t.name}
                  </button>
                </li>
              ))}
            </ul>
            <figcaption className="mt-3 text-center text-[0.75rem] text-white/45">Illustration — each glowing hub is a strength from my resume. Select one or drag to rotate.</figcaption>
          </div>
        </motion.figure>
      </div>

      {/* Recruiter snapshot */}
      <div className="wrap relative z-10 pb-14">
        <motion.dl {...rise(0.5)} className="grid grid-cols-2 overflow-hidden rounded-4xl border border-white/10 bg-white/[0.04] backdrop-blur-md lg:grid-cols-4">
          {glance.map((g, i) => (
            <div key={g.label} className={cn('px-6 py-5', i > 0 && 'lg:border-l lg:border-white/10', i % 2 === 1 && 'border-l border-white/10 lg:border-l', i > 1 && 'border-t border-white/10 lg:border-t-0')}>
              <dt className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-white/50">{g.label}</dt>
              <dd className="mt-1.5 font-display text-[1.15rem] leading-snug text-white sm:text-[1.3rem]">{g.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  )
}
