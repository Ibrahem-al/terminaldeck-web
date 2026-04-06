import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

export function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-void text-text">
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <span className="text-xl font-mono font-bold">
              <span className="text-cyan">{'>'}</span><span className="text-text">_</span>
            </span>
            <span className="text-sm font-semibold tracking-[0.15em] uppercase text-text-mid">TerminalDeck</span>
          </Link>
          <Link to="/" className="text-sm text-text-mid hover:text-cyan transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {children}
      </main>

      <footer className="border-t border-border">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-wrap justify-center gap-6 text-[13px] text-text-mid mb-4">
            <Link to="/privacy" className="hover:text-cyan transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-cyan transition-colors">Terms of Service</Link>
            <Link to="/eula" className="hover:text-cyan transition-colors">EULA</Link>
          </div>
          <p className="text-center text-[11px] text-text-dim">
            &copy; {new Date().getFullYear()} TerminalDeck. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
