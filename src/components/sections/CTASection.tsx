import { motion } from 'framer-motion'
import { DOWNLOADS } from '../../config/downloads'

export function CTASection({ onDownloadClick }: { onDownloadClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void }) {
  return (
    <section id="download" className="relative py-16 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.06]"
        style={{ background: 'radial-gradient(circle, #4a9eff, transparent 65%)' }} />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #00e68a, transparent 70%)' }} />

      <div className="absolute inset-0 opacity-[0.025]" style={{
        backgroundImage: 'linear-gradient(rgba(74,158,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,255,0.6) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
      }} />

      <div className="relative z-10 max-w-3xl mx-auto px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.7 }}>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            Ready to<br /><span className="text-cyan text-glow">Break Free?</span>
          </h2>
          <p className="text-lg text-text-mid mb-14 max-w-md mx-auto leading-relaxed">
            Stop fighting with tabs and rigid panes. Your workflow deserves an infinite canvas.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-5 mb-10">
          <a href={DOWNLOADS.windows} onClick={onDownloadClick} className="flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-lg text-void bg-cyan hover:brightness-110 transition-all glow-box">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
            </svg>
            Download for Windows
          </a>
          <a href={DOWNLOADS.windowsGuide} target="_blank" rel="noopener noreferrer" onClick={onDownloadClick} className="flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-lg text-text-mid border border-border hover:border-cyan/30 hover:text-text transition-all">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
            </svg>
            Windows — Build Guide
          </a>
          <a href={DOWNLOADS.macos} target="_blank" rel="noopener noreferrer" onClick={onDownloadClick} className="flex items-center gap-3 px-10 py-4 rounded-xl font-semibold text-lg text-text-mid border border-border hover:border-cyan/30 hover:text-text transition-all">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            macOS — Build Guide
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="inline-grid grid-cols-4 gap-16">
          {[
            { v: '∞', l: 'Canvas Size' },
            { v: '5', l: 'Themes' },
            { v: '2', l: 'Platforms' },
            { v: '24', l: 'Project Colors' },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-bold font-mono text-cyan">{s.v}</div>
              <div className="text-xs text-text-dim mt-1.5">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
