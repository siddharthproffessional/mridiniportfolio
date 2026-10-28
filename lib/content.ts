/**
 * Every fact here comes from Mridini Angurana's resume (public/resume/Mridini-Angurana-Resume.pdf),
 * which was rebuilt from her original CV without adding new claims.
 * Only email is published — no phone number.
 */

export const person = {
  name: 'Mridini Angurana',
  first: 'Mridini',
  initials: 'MA',
  role: 'Psychology & Human Resource Management student',
  email: 'mridiniangurana@gmail.com',
  resume: '/resume/Mridini-Angurana-Resume.pdf',
  intro:
    'Second-year Psychology with Human Resource Management student at Middlesex University Dubai, seeking a part-time internship in recruitment, employee engagement or HR operations.',
  summary:
    'I combine coursework in psychological science and resource and talent management with internships in marketing and sales outreach in Dubai and software development support in India, plus working knowledge of SQL and Python. My strengths are active listening, clear communication, adaptability and dependable teamwork.',
  interests: ['Recruitment', 'Employee engagement', 'HR operations'],
}

export const degree = {
  title: 'BSc (Hons) Psychology with Human Resource Management',
  org: 'Middlesex University Dubai',
  date: 'Expected 2028',
  note: 'Second-year student',
}

export const coursework = [
  { group: 'HR & Management', tone: 'plum', items: ['Resource and Talent Management', 'Management in Global Environment'] },
  { group: 'Psychology', tone: 'peach', items: ['Psychological Science', 'Brain, Body & Mind'] },
  { group: 'Computing', tone: 'sage', items: ['Database Systems', 'Computer Networks', 'Digital Design'] },
] as const

export type Role = { role: string; org: string; sector: string; place: string; date: string; points: string[] }

/** Newest first. */
export const experience: Role[] = [
  {
    role: 'Intern',
    org: 'BMS Solutions',
    sector: 'IT and technology services',
    place: 'Dubai, UAE',
    date: '2024',
    points: [
      'Supported the marketing and sales team at an IT and technology services company.',
      'Made outbound cold calls to prospective clients to introduce the company’s services.',
    ],
  },
  {
    role: 'Intern',
    org: 'GTIS Cyber Security',
    sector: 'Cyber security',
    place: 'Gurgaon, Haryana, India',
    date: '2023',
    points: [
      'Assisted senior developers in developing and debugging software applications.',
      'Contributed ideas for improving project efficiency during team meetings.',
      'Completed assigned tasks within deadlines and communicated progress to supervisors.',
    ],
  },
]

/** Traits shown in the hero network and the skills section. */
export const traits = [
  { name: 'Active listening', tone: 'plum' },
  { name: 'Communication', tone: 'peach' },
  { name: 'Problem-solving', tone: 'sage' },
  { name: 'Teamwork', tone: 'plum' },
  { name: 'Adaptability', tone: 'peach' },
] as const

export const skills = {
  interpersonal: ['Active listening', 'Communication', 'Cold calling', 'Problem-solving', 'Teamwork and collaboration', 'Adaptability'],
  technical: ['Java', 'Python', 'C', 'HTML', 'CSS', 'SQL'],
}

export const highlights = [
  { label: 'Debate & MUN', title: '3rd Best Speaker', detail: 'Awarded at BEHES 2020, alongside competing in Model United Nations and debate competitions.', tone: 'plum' },
  { label: 'JASHN 2024', title: 'First position', detail: 'Secured first position at JASHN 2024.', tone: 'peach' },
] as const

export const activities = [
  { title: 'Basketball', detail: 'Member of the basketball team.' },
  { title: 'Clubs', detail: 'Active member of the fashion, dance and music clubs.' },
  { title: 'Mental health', detail: 'Committed advocate for mental health awareness.' },
  { title: 'Environment', detail: 'Committed advocate for environmental sustainability.' },
]

/** Recruiter snapshot — every value is on the resume. */
export const glance = [
  { label: 'Studying', value: 'BSc (Hons) Psychology with HRM' },
  { label: 'University', value: 'Middlesex University Dubai' },
  { label: 'Graduating', value: 'Expected 2028' },
  { label: 'Looking for', value: 'Part-time HR internship' },
]

/** Why she fits HR roles — each point is backed by items from the resume. */
export const pillars = [
  {
    title: 'Understands people',
    text: 'A psychology foundation for how people think, feel and work together.',
    evidence: ['Psychological Science', 'Brain, Body & Mind', 'Active listening'],
    tone: 'plum',
  },
  {
    title: 'Grounded in HR',
    text: 'Coursework in how organisations attract, develop and manage talent.',
    evidence: ['Resource and Talent Management', 'Management in Global Environment'],
    tone: 'peach',
  },
  {
    title: 'Confident communicator',
    text: 'Comfortable on the phone and in front of a room — from cold calls to debate stages.',
    evidence: ['Cold calling at BMS Solutions', '3rd Best Speaker, BEHES 2020'],
    tone: 'sage',
  },
  {
    title: 'Comfortable with data',
    text: 'Technical skills that carry over to HR systems, trackers and reporting.',
    evidence: ['SQL', 'Python', 'Database Systems'],
    tone: 'plum',
  },
] as const

export const nav = [
  { id: 'about', label: 'About' },
  { id: 'why', label: 'Why me' },
  { id: 'education', label: 'Education' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'beyond', label: 'Beyond class' },
  { id: 'contact', label: 'Contact' },
]
