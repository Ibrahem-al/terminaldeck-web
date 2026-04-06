import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const RESULTS = [
  { text: 'New Terminal', key: 'Ctrl+N', active: true },
  { text: 'New Project', key: '', active: false },
  { text: 'Toggle Focus Mode', key: 'F11', active: false },
  { text: 'Switch Theme: Dark', key: '', active: false },
  { text: 'Apply Layout: Grid', key: '', active: false },
]

const MINI = [
  { label: 'Backend', color: '#4a9eff', focused: false },
  { label: 'Frontend', color: '#00e68a', focused: true },
  { label: 'Database', color: '#ffc857', focused: false },
  { label: 'Monitor', color: '#a78bfa', focused: false },
]

export function FocusModeSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-10%' })

  return (
    <section ref={ref} className="relative py-16 overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #a78bfa, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-mono text-cyan tracking-widest uppercase mb-5">Focus & Search</p>
          <h2 className="text-5xl sm:text-6xl font-bold mb-6">
            Find Anything. <span className="text-cyan text-glow">Focus Instantly.</span>
          </h2>
          <p className="text-lg text-text-mid max-w-xl mx-auto leading-relaxed">
            Zoom into any terminal with Focus Mode. Find anything with the Command Palette and Global Search.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Focus Mode */}
          <motion.div initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}>
            <h3 className="text-xl font-semibold mb-3">Focus Mode</h3>
            <p className="text-sm text-text-mid mb-8 leading-relaxed">
              Press F11 — one terminal fills the canvas, everything else dims to 30% opacity.
              Your previous position restores on exit.
            </p>

            <div className="relative rounded-xl border border-border bg-void-light p-6 overflow-hidden" style={{ minHeight: 300 }}>
              <div className="grid grid-cols-2 gap-4">
                {MINI.map((t, i) => (
                  <motion.div key={i}
                    animate={inView ? {
                      opacity: t.focused ? 1 : 0.2,
                      scale: t.focused ? 1.03 : 0.95,
                    } : { opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 + i * 0.08 }}
                    className="rounded-lg border p-4"
                    style={{
                      borderColor: t.focused ? t.color + '60' : '#2a2a4e',
                      background: t.focused ? '#141430' : '#0e0e22',
                      boxShadow: t.focused ? `0 0 30px ${t.color}18` : 'none',
                    }}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full" style={{ background: t.color }} />
                      <span className="text-[11px] font-mono text-text-mid">{t.label}</span>
                    </div>
                    <div className="space-y-2">
                      {[0.65, 0.45, 0.55, 0.35].map((w, j) => (
                        <div key={j} className="h-[3px] rounded-full bg-border-light" style={{ width: `${w * 100}%` }} />
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Command Palette */}
          <motion.div initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.15 }}>
            <h3 className="text-xl font-semibold mb-3">Command Palette</h3>
            <p className="text-sm text-text-mid mb-8 leading-relaxed">
              Ctrl+Shift+P — fuzzy search across every action, terminal, project, and theme.
            </p>

            <div className="rounded-xl border border-border bg-surface-raised overflow-hidden shadow-2xl shadow-black/40" style={{ minHeight: 300 }}>
              <div className="px-5 py-4 border-b border-border flex items-center gap-3">
                <svg className="w-4 h-4 text-text-dim" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <motion.span className="text-sm font-mono text-text"
                  initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.6 }}>
                  new<span className="inline-block w-[7px] h-[14px] bg-cyan animate-blink align-text-bottom ml-0.5" />
                </motion.span>
              </div>

              <div className="p-2.5">
                {RESULTS.map((r, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.9 + i * 0.06 }}
                    className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm ${
                      r.active ? 'bg-cyan/10 text-cyan' : 'text-text-mid'
                    }`}>
                    <span className="font-mono">{r.text}</span>
                    {r.key && <span className="text-[10px] text-text-dim bg-void-light px-2 py-0.5 rounded font-mono">{r.key}</span>}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
