import { DOWNLOADS } from '../../config/downloads'

export function Footer() {
  return (
    <footer className="border-t border-border bg-void">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5">
          <div className="flex items-center gap-2.5">
            <span className="text-xl font-mono font-bold">
              <span className="text-cyan">{'>'}</span><span className="text-text">_</span>
            </span>
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-text-mid">TerminalDeck</span>
              <p className="text-[10px] text-text-dim">Spatial terminal workspace</p>
            </div>
          </div>
          <div className="flex items-center gap-5 text-[13px] text-text-mid">
            {[
              { label: 'GitHub', href: DOWNLOADS.github },
              { label: 'Releases', href: DOWNLOADS.releases },
              { label: 'Changelog', href: DOWNLOADS.github + '/releases' },
            ].map(l => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="hover:text-cyan transition-colors">{l.label}</a>
            ))}
          </div>
        </div>
        <div className="mt-7 pt-5 border-t border-border text-center text-[11px] text-text-dim">
          <p>Built for developers who refuse to be limited by tabs.</p>
          <p className="mt-0.5">Windows & macOS — Free & Open Source</p>
        </div>
      </div>
    </footer>
  )
}
