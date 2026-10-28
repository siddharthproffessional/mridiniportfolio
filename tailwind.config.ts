import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: 'hsl(var(--cream))',
        card: 'hsl(var(--card))',
        ink: 'hsl(var(--ink))',
        muted: 'hsl(var(--muted))',
        line: 'hsl(var(--line))',
        plum: 'hsl(var(--plum))',
        lilac: 'hsl(var(--lilac))',
        peach: 'hsl(var(--peach))',
        sage: 'hsl(var(--sage))',
        night: 'hsl(var(--night))',
        dusk: 'hsl(var(--dusk))',
        champagne: 'hsl(var(--champagne))',
      },
      fontFamily: {
        display: ['var(--font-display)'],
        sans: ['var(--font-sans)'],
      },
      borderRadius: { '4xl': '2rem', '5xl': '2.75rem' },
      letterSpacing: { tightest: '-0.035em' },
      boxShadow: {
        soft: '0 1px 2px hsl(270 30% 20% / 0.04), 0 12px 32px -12px hsl(270 40% 30% / 0.14)',
        lift: '0 2px 4px hsl(270 30% 20% / 0.05), 0 24px 48px -16px hsl(270 45% 30% / 0.22)',
      },
      opacity: { 15: '0.15', 35: '0.35', 45: '0.45', 55: '0.55', 65: '0.65', 85: '0.85' },
    },
  },
  plugins: [],
}
export default config
