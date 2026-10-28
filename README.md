# Mridini Angurana — Portfolio

Single-page portfolio for Mridini Angurana (BSc (Hons) Psychology with Human Resource Management, Middlesex University Dubai). Soft lavender, plum and peach design with rounded cards and a floating navigation, built with Next.js 14, Tailwind, framer-motion and three.js.

All text comes from `public/resume/Mridini-Angurana-Resume.pdf`. Only email is published — no phone number and no photo.

## Run locally

```bash
npm install
npm run dev          # http://localhost:3000
npm run build && npm start
```

## Structure

| Path | What it holds |
| --- | --- |
| `lib/content.ts` | All resume content. Edit here to change the site (for example, to add BMS Solutions responsibilities). |
| `components/hero.tsx` + `network-scene.tsx` | Hero and the illustrative 3D "people & strengths" network; each hub is a strength from the resume. |
| `components/sections.tsx` | About, Education & coursework, Experience, Skills, Beyond the classroom, Contact, Footer. |
| `components/nav.tsx` | Floating pill navigation and mobile menu. |
| `scripts/check.mjs` | Browser checks (three widths, no JS errors, no phone number or photo, resume facts, trait buttons, menu, reduced motion). |

## Deploy

Import the repository in Vercel — no environment variables needed. `?scene-t=<seconds>` pins the hero animation (used for screenshots).
