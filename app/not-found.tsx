import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-6 text-center">
      <div>
        <p className="kicker">404</p>
        <h1 className="mt-3 text-6xl">Page not found</h1>
        <Link href="/" className="btn-plum mt-8">
          Back to the portfolio
        </Link>
      </div>
    </main>
  )
}
