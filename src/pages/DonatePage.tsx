import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { DONATION_LINKS } from '../config/donations'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true } as const,
  transition: { duration: 0.6 },
}

export function DonatePage() {
  return (
    <div className="min-h-screen bg-void text-text">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="text-xl font-mono font-bold">
              <span className="text-cyan group-hover:text-glow transition-all">{'>'}</span>
              <span className="text-text">_</span>
            </span>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-text-mid">
              TerminalDeck
            </span>
          </Link>
          <Link to="/" className="text-sm text-text-dim hover:text-cyan transition-colors">
            &larr; Back to Home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <motion.div {...fadeUp} className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Support <span className="text-cyan text-glow">TerminalDeck</span>
          </h1>
          <p className="text-lg text-text-mid max-w-lg mx-auto leading-relaxed">
            TerminalDeck is free, open-source, and built by an independent developer.
            Your support keeps it alive and growing.
          </p>
        </motion.div>

        {/* Donate Button */}
        <motion.div {...fadeUp} className="text-center mb-16">
          <a
            href={DONATION_LINKS.buyMeACoffee}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-lg text-void bg-cyan hover:brightness-110 transition-all glow-box"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.062 2.014.14l.35.049c.199.026.398.057.595.094.19.036.4.074.59.137.29.096.399.231.424.428.017.13.025.262.035.393l.005.068c.01.135.024.27.044.402a.7.7 0 00.105.273c.143.198.39.277.625.267.19-.01.382-.06.554-.157a1.6 1.6 0 00.291-.217c.14-.135.267-.3.353-.49.067-.149.108-.31.123-.475.018-.195.021-.392.021-.589zM7.5 12.5c0 .552-.448 1-1 1s-1-.448-1-1 .448-1 1-1 1 .448 1 1zM4 19h16v1a2 2 0 01-2 2H6a2 2 0 01-2-2v-1zm0-1V9h16v9H4z" />
            </svg>
            Buy Me a Coffee
          </a>
        </motion.div>

        {/* What your support funds */}
        <motion.div {...fadeUp} className="mb-16">
          <h2 className="text-xl font-semibold text-text mb-6 text-center">
            What Your Support Funds
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              { title: 'Active Development', desc: 'New features, performance improvements, and bug fixes shipped regularly.' },
              { title: 'Infrastructure', desc: 'Hosting, CI/CD pipelines, code signing certificates, and build tooling.' },
              { title: 'Open Source', desc: 'Keeping TerminalDeck free and accessible for every developer.' },
              { title: 'Cross-Platform', desc: 'Maintaining and testing on both Windows and macOS.' },
            ].map((item) => (
              <div key={item.title} className="glass rounded-lg p-5 border border-border">
                <h3 className="text-sm font-semibold text-cyan mb-1.5">{item.title}</h3>
                <p className="text-sm text-text-dim leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-void">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex flex-col items-center gap-3">
            <div className="flex flex-wrap justify-center gap-5 text-[12px] text-text-dim">
              <Link to="/privacy" className="hover:text-cyan transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="hover:text-cyan transition-colors">Terms of Service</Link>
              <Link to="/eula" className="hover:text-cyan transition-colors">EULA</Link>
            </div>
            <p className="text-[11px] text-text-dim">
              &copy; {new Date().getFullYear()} TerminalDeck. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
