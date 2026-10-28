'use client'

import { useCallback } from 'react'

/** Adds a pointer-following glow to any `.spot` element inside it. */
export function Spotlight({ children, className }: { children: React.ReactNode; className?: string }) {
  const onMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const card = (e.target as HTMLElement).closest('.spot') as HTMLElement | null
    if (!card) return
    const r = card.getBoundingClientRect()
    card.style.setProperty('--mx', `${e.clientX - r.left}px`)
    card.style.setProperty('--my', `${e.clientY - r.top}px`)
  }, [])
  return (
    <div className={className} onPointerMove={onMove}>
      {children}
    </div>
  )
}

/** Copies the email address and confirms it in place. */
export function CopyEmail({ email }: { email: string }) {
  const onClick = useCallback(
    async (e: React.MouseEvent<HTMLButtonElement>) => {
      const btn = e.currentTarget
      try {
        await navigator.clipboard.writeText(email)
        btn.dataset.copied = 'true'
        setTimeout(() => delete btn.dataset.copied, 1800)
      } catch {
        window.location.href = `mailto:${email}`
      }
    },
    [email],
  )
  return (
    <button
      type="button"
      onClick={onClick}
      className="group btn border border-white/20 text-white hover:-translate-y-0.5 hover:border-white/50"
      aria-label={`Copy email address ${email}`}
    >
      <span className="group-data-[copied=true]:hidden">Copy email</span>
      <span className="hidden group-data-[copied=true]:inline" role="status">
        Copied ✓
      </span>
    </button>
  )
}
