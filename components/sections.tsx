import { ArrowUpRight, Brain, Briefcase, Download, FileText, Leaf, Mail, MapPin, Medal, Music, Trophy, Users } from 'lucide-react'
import { activities, coursework, degree, experience, highlights, person, skills } from '@/lib/content'
import { cn } from '@/lib/cn'
import { Reveal } from './motion'

const TONE = {
  plum: { dot: 'bg-plum', soft: 'bg-lilac', text: 'text-plum' },
  peach: { dot: 'bg-peach', soft: 'bg-peach/15', text: 'text-[hsl(14_60%_45%)]' },
  sage: { dot: 'bg-sage', soft: 'bg-sage/15', text: 'text-[hsl(150_25%_32%)]' },
} as const

function Head({ id, kicker, title, intro }: { id: string; kicker: string; title: string; intro?: string }) {
  return (
    <Reveal className="max-w-2xl">
      <p className="kicker">{kicker}</p>
      <h2 id={id} className="mt-4 text-[2.6rem] font-medium sm:text-[3.4rem]">
        {title}
      </h2>
      {intro && <p className="mt-3 text-muted">{intro}</p>}
    </Reveal>
  )
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="scroll-mt-24">
      <div className="wrap py-20 md:py-24">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.35fr] lg:items-end">
          <Head id="about-title" kicker="About me" title="People, psychology and how teams work." />
          <Reveal delay={0.1}>
            <p className="font-display text-[1.45rem] leading-[1.45] text-ink/90 sm:text-[1.7rem]">{person.summary}</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="scroll-mt-24">
      <div className="wrap py-20 md:py-24">
        <Head id="education-title" kicker="Education" title="What I’m studying" />
        <Reveal className="panel mt-10 overflow-hidden">
          <div className="flex flex-wrap items-start justify-between gap-4 bg-gradient-to-r from-lilac to-card p-7 sm:p-9">
            <div>
              <h3 className="text-[1.9rem] font-medium sm:text-[2.2rem]">{degree.title}</h3>
              <p className="mt-2 text-muted">
                {degree.org} · {degree.note}
              </p>
            </div>
            <span className="rounded-full bg-plum px-4 py-1.5 text-[0.85rem] font-semibold text-white">{degree.date}</span>
          </div>
          <div className="grid gap-px bg-line md:grid-cols-3">
            {coursework.map((c) => (
              <div key={c.group} className="bg-card p-7">
                <p className={cn('flex items-center gap-2 text-[0.8rem] font-semibold uppercase tracking-[0.12em]', TONE[c.tone].text)}>
                  <span aria-hidden className={cn('h-2 w-2 rounded-full', TONE[c.tone].dot)} />
                  {c.group}
                </p>
                <ul className="mt-4 space-y-2.5">
                  {c.items.map((x) => (
                    <li key={x} className="text-[1.02rem]">
                      {x}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="border-t border-line px-7 py-3 text-[0.8rem] text-muted">Relevant coursework, as listed on my resume.</p>
        </Reveal>
      </div>
    </section>
  )
}

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="scroll-mt-24">
      <div className="wrap py-20 md:py-24">
        <Head id="experience-title" kicker="Experience" title="Internships so far" />
        <ol className="mt-10 grid gap-5 md:grid-cols-2 md:items-start">
          {experience.map((e, i) => (
            <li key={e.org} className="panel transition-shadow duration-300 hover:shadow-lift">
              <Reveal delay={i * 0.08} className="flex h-full flex-col p-7 sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-lilac text-plum">
                    <Briefcase className="h-5 w-5" aria-hidden />
                  </span>
                  <span className="pill !py-1 font-semibold">{e.date}</span>
                </div>
                <h3 className="mt-6 text-[1.9rem] font-medium">{e.org}</h3>
                <p className="mt-1 text-muted">{e.role}</p>
                <p className="mt-1 flex items-center gap-1.5 text-[0.9rem] text-muted">
                  <MapPin className="h-4 w-4 text-peach" aria-hidden />
                  {e.place}
                </p>
                {e.points.length > 0 && (
                  <ul className="mt-5 space-y-2.5 border-t border-line pt-5">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-3 text-[0.98rem] text-ink/85">
                        <span aria-hidden className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-plum" />
                        {p}
                      </li>
                    ))}
                  </ul>
                )}
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
      <div className="wrap py-20 md:py-24">
        <Head id="skills-title" kicker="Skills" title="What I bring to a team" />
        <div className="mt-10 grid gap-5 lg:grid-cols-[1.4fr_1fr]">
          <Reveal className="panel p-7 sm:p-8">
            <h3 className="text-[1.6rem] font-medium">HR & interpersonal</h3>
            <ul className="mt-5 flex flex-wrap gap-2.5">
              {skills.interpersonal.map((s, i) => (
                <li key={s} className={cn('rounded-full px-4 py-2 text-[0.98rem] font-medium', i % 3 === 0 ? 'bg-lilac text-plum' : i % 3 === 1 ? 'bg-peach/15 text-[hsl(14_60%_40%)]' : 'bg-sage/15 text-[hsl(150_25%_30%)]')}>
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.08} className="panel p-7 sm:p-8">
            <h3 className="text-[1.6rem] font-medium">Technical</h3>
            <ul className="mt-5 flex flex-wrap gap-2">
              {skills.technical.map((s) => (
                <li key={s} className="pill font-medium">
                  {s}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

const ICONS = [Users, Music, Brain, Leaf]

export function Beyond() {
  return (
    <section id="beyond" aria-labelledby="beyond-title" className="scroll-mt-24">
      <div className="wrap py-20 md:py-24">
        <Head id="beyond-title" kicker="Leadership & activities" title="Beyond the classroom" />
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {highlights.map((h, i) => (
            <Reveal key={h.title} delay={i * 0.08}>
              <article className={cn('flex h-full flex-col rounded-4xl p-8 shadow-soft', i === 0 ? 'bg-plum text-white' : 'bg-card')}>
                <span className={cn('grid h-12 w-12 place-items-center rounded-2xl', i === 0 ? 'bg-white/15' : 'bg-peach/15 text-[hsl(14_60%_45%)]')}>
                  {i === 0 ? <Medal className="h-6 w-6" aria-hidden /> : <Trophy className="h-6 w-6" aria-hidden />}
                </span>
                <p className={cn('mt-6 text-[0.8rem] font-semibold uppercase tracking-[0.14em]', i === 0 ? 'text-white/75' : 'text-muted')}>{h.label}</p>
                <h3 className={cn('mt-2 text-[2.2rem] font-medium', i === 0 && 'text-white')}>{h.title}</h3>
                <p className={cn('mt-3', i === 0 ? 'text-white/85' : 'text-ink/80')}>{h.detail}</p>
              </article>
            </Reveal>
          ))}
        </div>
        <ul className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {activities.map((a, i) => {
            const Icon = ICONS[i]
            return (
              <li key={a.title} className="panel">
                <Reveal delay={i * 0.06} kind="fade" className="h-full p-6">
                  <Icon className="h-5 w-5 text-plum" aria-hidden />
                  <h3 className="mt-4 text-[1.35rem] font-medium">{a.title}</h3>
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
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24">
      <div className="wrap pb-20 pt-10 md:pb-28">
        <Reveal className="relative overflow-hidden rounded-[2.5rem] bg-ink px-7 py-16 text-center text-white sm:px-12 sm:py-20">
          <div aria-hidden className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-plum/60 blur-3xl" />
          <p className="relative text-[0.8rem] font-semibold uppercase tracking-[0.16em] text-white/70">Contact</p>
          <h2 id="contact-title" className="relative mt-4 text-5xl font-medium text-white sm:text-7xl">
            Let’s <span className="italic text-peach">talk</span>.
          </h2>
          <p className="relative mx-auto mt-5 max-w-lg text-white/80">I’m looking for a part-time internship in recruitment, employee engagement or HR operations. Email is the best way to reach me.</p>
          <div className="relative mt-9 flex flex-wrap justify-center gap-3">
            <a href={`mailto:${person.email}`} className="btn bg-white text-ink hover:-translate-y-0.5">
              <Mail className="h-4 w-4" aria-hidden />
              {person.email}
            </a>
            <a href={person.resume} download className="btn border border-white/30 text-white hover:-translate-y-0.5 hover:border-white">
              <Download className="h-4 w-4" aria-hidden />
              Download resume
            </a>
            <a href={person.resume} target="_blank" rel="noopener noreferrer" className="btn text-white/75 hover:text-white">
              <FileText className="h-4 w-4" aria-hidden />
              View PDF
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer>
      <div className="wrap flex flex-col gap-3 pb-10 text-[0.88rem] text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {person.name}
        </p>
        <a href="#top" className="hover:text-plum">
          Back to top ↑
        </a>
      </div>
    </footer>
  )
}
