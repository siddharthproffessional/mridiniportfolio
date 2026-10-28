import type { Metadata, Viewport } from 'next'
import '@fontsource-variable/fraunces/full.css'
import '@fontsource-variable/fraunces/full-italic.css'
import '@fontsource-variable/figtree'
import './globals.css'
import { person } from '@/lib/content'

const description = `${person.name} — ${person.intro}`

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3000')),
  title: `${person.name} — Psychology & HR`,
  description,
  openGraph: { title: person.name, description, type: 'profile' },
  twitter: { card: 'summary_large_image', title: person.name, description },
  icons: { icon: '/favicon.svg' },
}

export const viewport: Viewport = { themeColor: '#140D1D', colorScheme: 'light' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-plum focus:px-4 focus:py-2 focus:text-white">
          Skip to content
        </a>
        <div id="top" />
        {children}
      </body>
    </html>
  )
}
