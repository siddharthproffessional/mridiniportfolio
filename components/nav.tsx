'use client'

import { useEffect, useState } from 'react'
import { Download, Menu, X } from 'lucide-react'
import { nav, person } from '@/lib/content'
import { cn } from '@/lib/cn'

function useActive() {
  const [active, setActive] = useState('')
  useEffect(() => {
    const els = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[]
    let raf = 0
    const pick = () => {
      raf = 0
      const line = window.innerHeight * 0.35
      let id = ''
      for (const e of els) if (e.getBoundingClientRect().top <= line) id = e.id
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) id = els[els.length - 1]?.id ?? id
      setActive(id)
    }
    const on = () => {
      if (!raf) raf = requestAnimationFrame(pick)
    }
    pick()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => {
      window.removeEventListener('scroll', on)
      window.removeEventListener('resize', on)
      cancelAnimationFrame(raf)
    }
  }, [])
  return active
}

export function Nav() {
  const active = useActive()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [onDark, setOnDark] = useState(true)
  useEffect(() => {
    const on = () => {
      setScrolled(window.scrollY > 24)
      // Light text while over the dark hero or the dark contact section
      const hero = document.querySelector('section[aria-labelledby="hero-title"]') as HTMLElement | null
      const contact = document.getElementById('contact')
      const overHero = hero ? hero.getBoundingClientRect().bottom > 64 : false
      const overContact = contact ? contact.getBoundingClientRect().top < 40 : false
      setOnDark(overHero || overContact)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => {
    if (!open) return
    const k = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [open])

  return (
    <header className="fixed inset-x-0 top-3 z-40 px-3 sm:top-4">
      <nav
        aria-label="Main"
        className={cn(
          'mx-auto flex max-w-5xl items-center justify-between gap-3 rounded-full border px-2.5 py-2 transition-all duration-500',
          onDark
            ? cn('border-white/10 text-white backdrop-blur-md', scrolled ? 'bg-night/60' : 'bg-white/[0.04]')
            : 'border-line bg-card/85 text-ink shadow-soft backdrop-blur-md',
        )}
      >
        <a href="#top" className="flex items-center gap-2.5 rounded-full pr-2">
          <span className={cn('grid h-9 w-9 place-items-center rounded-full font-display text-[0.95rem]', onDark ? 'bg-white text-night' : 'bg-plum text-white')}>{person.initials}</span>
          <span className="text-[0.95rem] font-semibold">{person.name}</span>
        </a>
        <ul className="hidden items-center gap-0.5 lg:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? 'true' : undefined}
                className={cn(
                  'rounded-full px-3 py-2 text-[0.86rem] transition-colors duration-300',
                  active === n.id ? (onDark ? 'bg-white/15 font-semibold text-white' : 'bg-lilac font-semibold text-plum') : onDark ? 'text-white/70 hover:text-white' : 'text-ink/70 hover:text-ink',
                )}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a href={person.resume} download className={cn('hidden items-center gap-1.5 rounded-full px-4 py-2 text-[0.86rem] font-semibold transition-all duration-300 hover:-translate-y-0.5 lg:inline-flex', onDark ? 'bg-white text-night' : 'bg-plum text-white')}>
          <Download className="h-4 w-4" aria-hidden />
          Resume
        </a>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
          className={cn('grid h-10 w-10 place-items-center rounded-full lg:hidden', onDark ? 'bg-white/10 text-white' : 'bg-lilac text-plum')}
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </nav>
      {open && (
        <div id="menu" className="panel mx-auto mt-2 max-w-5xl p-3 text-ink lg:hidden">
          <ul>
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className={cn('block rounded-2xl px-4 py-3 text-[1.05rem]', active === n.id ? 'bg-lilac font-semibold text-plum' : 'text-ink/80')}
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
