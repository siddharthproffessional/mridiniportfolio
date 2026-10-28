'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
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
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24)
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
          'mx-auto flex max-w-4xl items-center justify-between gap-3 rounded-full border px-2.5 py-2 transition-all duration-500',
          scrolled ? 'border-line bg-card/85 shadow-soft backdrop-blur-md' : 'border-transparent bg-card/50 backdrop-blur-sm',
        )}
      >
        <a href="#top" className="flex items-center gap-2.5 rounded-full pr-2">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-plum font-display text-[0.95rem] text-white">{person.initials}</span>
          <span className="text-[0.95rem] font-semibold">{person.name}</span>
        </a>
        <ul className="hidden items-center gap-0.5 md:flex">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? 'true' : undefined}
                className={cn('rounded-full px-3.5 py-2 text-[0.88rem] transition-colors duration-300', active === n.id ? 'bg-lilac font-semibold text-plum' : 'text-ink/70 hover:text-ink')}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
          className="grid h-10 w-10 place-items-center rounded-full bg-lilac text-plum md:hidden"
        >
          {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
        </button>
      </nav>
      {open && (
        <div id="menu" className="panel mx-auto mt-2 max-w-4xl p-3 md:hidden">
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
