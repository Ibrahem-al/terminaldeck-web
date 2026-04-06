import { motion } from 'framer-motion'
import { features } from '../../config/features'

const ICONS: Record<string, string> = {
  canvas: '◎', organization: '⬡', terminal: '>_', layouts: '⊞',
  focus: '◉', embedding: '⧉', themes: '◐', platform: '⌘',
}

export function FeaturesGrid() {
  return (
    <section id="all-features" className="py-16 relative overflow-hidden">
      <div className="absolute top-1/2 right-0 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #00e68a, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-mono text-cyan tracking-widest uppercase mb-5">Everything You Need</p>
          <h2 className="text-5xl sm:text-6xl font-bold mb-6">
            Built for <span className="text-cyan text-glow">Power Users</span>
          </h2>
          <p className="text-lg text-text-mid max-w-xl mx-auto leading-relaxed">
            Every feature designed for developers who demand more from their terminal.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {features.map((f, i) => (
            <motion.div key={f.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-5%' }}
              transition={{ delay: i * 0.06, duration: 0.45 }}
              className="group relative p-7 rounded-xl border border-border bg-surface/40 hover:border-cyan/20 hover:bg-surface transition-all duration-300">

              <div className="w-12 h-12 rounded-lg bg-cyan/8 flex items-center justify-center mb-5 font-mono text-cyan text-lg group-hover:bg-cyan/15 transition-colors">
                {ICONS[f.id]}
              </div>

              <h3 className="text-base font-semibold text-text mb-2.5">{f.title}</h3>
              <p className="text-[13px] text-text-mid leading-relaxed mb-5">{f.description}</p>

              <ul className="space-y-2.5">
                {f.highlights.slice(0, 3).map((h, j) => (
                  <li key={j} className="flex items-start gap-2 text-[11px] text-text-dim leading-relaxed">
                    <span className="text-cyan mt-0.5 shrink-0">→</span>{h}
                  </li>
                ))}
              </ul>

              <div className="absolute -inset-px rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(74,158,255,0.06), transparent 60%)' }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
