import { ArrowUpRight, Brain, Download, FileText, Leaf, Mail, MapPin, Medal, Music, Trophy, Users } from 'lucide-react'
import { activities, coursework, degree, experience, highlights, person, pillars, skills } from '@/lib/content'
import { cn } from '@/lib/cn'
import { Reveal } from './motion'
import { CopyEmail, Spotlight } from './spotlight'

const TONE = {
  plum: { dot: 'bg-plum', soft: 'bg-lilac text-plum', text: 'text-plum' },
  peach: { dot: 'bg-peach', soft: 'bg-peach/15 text-[hsl(14_60%_40%)]', text: 'text-[hsl(14_60%_45%)]' },
  sage: { dot: 'bg-sage', soft: 'bg-sage/15 text-[hsl(150_25%_30%)]', text: 'text-[hsl(150_25%_32%)]' },
} as const

function Head({ id, n, kicker, title, intro, light }: { id: string; n: string; kicker: string; title: string; intro?: string; light?: boolean }) {
  return (
    <Reveal className="max-w-3xl">
      <p className={cn('flex items-center gap-3 text-[0.78rem] font-semibold uppercase tracking-[0.18em]', light ? 'text-white/60' : 'text-plum')}>
        <span className="font-display text-[1rem] normal-case tracking-normal">{n}</span>
        <span aria-hidden className={cn('h-px w-10', light ? 'bg-white/30' : 'bg-plum/40')} />
        {kicker}
      </p>
      <h2 id={id} className={cn('mt-5 text-[2.7rem] font-medium tracking-tightest sm:text-[3.8rem]', light && 'text-white')}>
        {title}
      </h2>
      {intro && <p className={cn('mt-4 text-[1.05rem]', light ? 'text-white/70' : 'text-muted')}>{intro}</p>}
    </Reveal>
  )
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24">
      <div className="wrap py-24 md:py-32">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.4fr]">
          <Head id="about-title" n="01" kicker="About me" title="People first, always." />
          <Reveal delay={0.1}>
            <p className="font-display text-[1.55rem] leading-[1.42] tracking-[-0.01em] text-ink sm:text-[1.95rem]">{person.summary}</p>
            <div className="hairline mt-10" />
            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Areas of interest">
              {person.interests.map((x) => (
                <li key={x} className="pill">
                  {x}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Why() {
  return (
    <section id="why" aria-labelledby="why-title" className="scroll-mt-24 bg-card">
      <div className="wrap py-24 md:py-32">
        <Head id="why-title" n="02" kicker="Why hire me" title="What I bring to an HR team" intro="Four strengths, each backed by something on my resume." />
        <Spotlight className="mt-14 grid gap-5 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.07}>
              <article className="spot flex h-full flex-col rounded-4xl border border-line bg-cream/60 p-8 transition-all duration-500 hover:-translate-y-1 hover:border-plum/25 hover:shadow-lift sm:p-9">
                <div className="flex items-center justify-between">
                  <span className={cn('grid h-11 w-11 place-items-center rounded-2xl font-display text-lg', TONE[p.tone].soft)}>{String(i + 1).padStart(2, '0')}</span>
                  <span aria-hidden className={cn('h-2 w-2 rounded-full', TONE[p.tone].dot)} />
                </div>
                <h3 className="mt-7 text-[1.9rem] font-medium tracking-[-0.02em]">{p.title}</h3>
                <p className="mt-2.5 text-ink/75">{p.text}</p>
                <div className="mt-auto pt-7">
                  <p className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-muted">Evidence</p>
                  <ul className="mt-2.5 flex flex-wrap gap-1.5">
                    {p.evidence.map((x) => (
                      <li key={x} className="rounded-full border border-line bg-card px-3 py-1 text-[0.82rem] text-ink/80">
                        {x}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </Reveal>
          ))}
        </Spotlight>
      </div>
    </section>
  )
}

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="scroll-mt-24">
      <div className="wrap py-24 md:py-32">
        <Head id="education-title" n="03" kicker="Education" title="What I’m studying" />
        <Reveal className="mt-14 overflow-hidden rounded-5xl bg-card shadow-soft">
          <div className="relative overflow-hidden bg-dusk p-8 text-white sm:p-12">
            <div aria-hidden className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-plum/50 blur-3xl" />
            <div className="relative flex flex-wrap items-end justify-between gap-6">
              <div className="max-w-2xl">
                <p className="text-[0.78rem] font-semibold uppercase tracking-[0.16em] text-white/55">{degree.org}</p>
                <h3 className="mt-3 text-[2rem] font-medium leading-[1.08] tracking-[-0.02em] text-white sm:text-[2.7rem]">{degree.title}</h3>
                <p className="mt-3 text-white/65">{degree.note}</p>
              </div>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.9rem] font-semibold backdrop-blur">{degree.date}</span>
            </div>
          </div>
          <div className="grid gap-px bg-line md:grid-cols-3">
            {coursework.map((c) => (
              <div key={c.group} className="bg-card p-8">
                <p className={cn('flex items-center gap-2 text-[0.78rem] font-semibold uppercase tracking-[0.14em]', TONE[c.tone].text)}>
                  <span aria-hidden className={cn('h-2 w-2 rounded-full', TONE[c.tone].dot)} />
                  {c.group}
                </p>
                <ul className="mt-5 space-y-3">
                  {c.items.map((x) => (
                    <li key={x} className="font-display text-[1.2rem] leading-snug">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="border-t border-line px-8 py-3.5 text-[0.8rem] text-muted">Relevant coursework, as listed on my resume.</p>
        </Reveal>
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-24 bg-card">
      <div className="wrap py-24 md:py-32">
        <Head id="experience-title" n="04" kicker="Experience" title="Where I’ve worked" />
        <ol className="mt-14 border-t border-line">
          {experience.map((e, i) => (
            <li key={e.org} className="group border-b border-line">
              <Reveal delay={i * 0.06} className="grid gap-6 py-10 md:grid-cols-[10rem_1fr_1.4fr] md:gap-10 md:py-12">
                <p className="font-display text-[2.6rem] leading-none tracking-[-0.03em] text-plum/80 transition-colors group-hover:text-plum">{e.date}</p>
                <div>
                  <h3 className="text-[2rem] font-medium tracking-[-0.02em]">{e.org}</h3>
                  <p className="mt-1.5 font-semibold text-ink/80">{e.role}</p>
                  <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.92rem] text-muted">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-peach" aria-hidden />
                      {e.place}
                    </span>
                    <span aria-hidden className="h-1 w-1 rounded-full bg-line" />
                    <span>{e.sector}</span>
                  </p>
                </div>
                <ul className="space-y-3">
                  {e.points.map((p) => (
                    <li key={p} className="flex gap-3 text-[1.02rem] text-ink/85">
                      <span aria-hidden className="mt-[0.62em] h-1.5 w-1.5 shrink-0 rounded-full bg-plum" />
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="scroll-mt-24">
      <div className="wrap py-24 md:py-32">
        <Head id="skills-title" n="05" kicker="Skills" title="Toolkit" />
        <Spotlight className="mt-14 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="spot rounded-4xl bg-card p-8 shadow-soft sm:p-10">
            <h3 className="text-[1.7rem] font-medium">HR & interpersonal</h3>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {skills.interpersonal.map((s, i) => (
                <li key={s} className={cn('rounded-full px-4 py-2 text-[1rem] font-medium', [TONE.plum.soft, TONE.peach.soft, TONE.sage.soft][i % 3])}>
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="spot rounded-4xl bg-card p-8 shadow-soft sm:p-10">
            <h3 className="text-[1.7rem] font-medium">Technical</h3>
            <ul className="mt-6 flex flex-wrap gap-2">
              {skills.technical.map((s) => (
                <li key={s} className="pill font-medium">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </Spotlight>
      </div>
    </section>
  )
}

const ICONS = [Users, Music, Brain, Leaf]

export function Beyond() {
  return (
    <section id="beyond" aria-labelledby="beyond-title" className="scroll-mt-24 bg-card">
      <div className="wrap py-24 md:py-32">
        <Head id="beyond-title" n="06" kicker="Leadership & activities" title="Beyond the classroom" />
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.08}>
              <article className={cn('relative flex h-full flex-col overflow-hidden rounded-5xl p-9 sm:p-11', i === 0 ? 'bg-dusk text-white' : 'border border-line bg-cream')}>
                {i === 0 && <div aria-hidden className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-plum/60 blur-3xl" />}
                <span className={cn('relative grid h-12 w-12 place-items-center rounded-2xl', i === 0 ? 'bg-white/10 text-champagne' : 'bg-peach/15 text-[hsl(14_60%_45%)]')}>
                  {i === 0 ? <Medal className="h-6 w-6" aria-hidden /> : <Trophy className="h-6 w-6" aria-hidden />}
                </span>
                <p className={cn('relative mt-8 text-[0.78rem] font-semibold uppercase tracking-[0.16em]', i === 0 ? 'text-white/55' : 'text-muted')}>{h.label}</p>
                <h3 className={cn('relative mt-2 text-[2.6rem] font-medium tracking-[-0.025em]', i === 0 && 'text-white')}>{h.title}</h3>
                <p className={cn('relative mt-3', i === 0 ? 'text-white/75' : 'text-ink/75')}>{h.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((a, i) => {
            const Icon = ICONS[i]
            return (
              <li key={a.title} className="rounded-4xl border border-line bg-cream/60">
                <Reveal delay={i * 0.06} kind="fade" className="h-full p-7">
                  <Icon className="h-5 w-5 text-plum" aria-hidden />
                  <h3 className="mt-5 text-[1.4rem] font-medium">{a.title}</h3>
                  <p className="mt-1.5 text-[0.95rem] text-muted">{a.detail}</p>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

export function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 relative isolate overflow-hidden bg-night text-white">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="drift absolute left-1/2 top-0 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-[hsl(266_45%_32%/0.6)] blur-[120px]" />
        <div className="grain absolute inset-0" />
      </div>
      <div className="wrap py-28 text-center md:py-40">
        <Reveal>
          <p className="text-[0.78rem] font-semibold uppercase tracking-[0.18em] text-white/55">07 — Contact</p>
          <h2 id="contact-title" className="mx-auto mt-6 max-w-4xl text-[3.2rem] font-medium leading-[0.98] tracking-tightest text-white sm:text-[5.5rem]">
            Let’s build better <span className="text-gradient italic">workplaces</span> together.
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-[1.08rem] text-white/70">
            I’m looking for a part-time internship in recruitment, employee engagement or HR operations. Email is the best way to reach me.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${person.email}`} className="btn bg-white text-night shadow-[0_10px_40px_-10px_hsl(32_60%_78%/0.6)] hover:-translate-y-0.5">
              <Mail className="h-4 w-4" aria-hidden />
              {person.email}
            </a>
            <CopyEmail email={person.email} />
            <a href={person.resume} download className="btn border border-white/20 text-white hover:-translate-y-0.5 hover:border-white/50">
              <Download className="h-4 w-4" aria-hidden />
              Download resume
            </a>
            <a href={person.resume} target="_blank" rel="noopener noreferrer" className="btn text-white/70 hover:text-white">
              <FileText className="h-4 w-4" aria-hidden />
              View PDF
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
      <footer className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-8 text-[0.88rem] text-white/50 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {person.name}
          </p>
          <a href="#top" className="hover:text-white">
            Back to top ↑
          </a>
        </div>
      </footer>
    </section>
  )
}

/** Slow marquee of strengths and coursework between sections. */
export function Marquee() {
  const items = ['Recruitment', 'Employee engagement', 'HR operations', 'Psychological science', 'Talent management', 'Active listening', 'Communication', 'Teamwork']
  const row = [...items, ...items]
  return (
    <div aria-hidden className="overflow-hidden border-y border-line bg-cream py-6">
      <div className="marquee flex w-max gap-10 whitespace-nowrap">
        {row.map((x, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-[1.7rem] italic text-ink/30">
            {x}
            <span className="h-1.5 w-1.5 rounded-full bg-peach/70" />
          </span>
        ))}
      </div>
    </div>
  )
}
