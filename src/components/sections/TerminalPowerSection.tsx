import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const LINES = [
  { text: '$ npm run dev', c: '#e4e4f0' },
  { text: '  Starting development server...', c: '#5a5a7a' },
  { text: '  ✓ Ready on http://localhost:3000', c: '#00e68a' },
  { text: '', c: '' },
  { text: '$ claude', c: '#e4e4f0' },
  { text: '  ● AI instance detected — Claude Code', c: '#ffc857' },
  { text: '  How can I help you today?', c: '#4a9eff' },
]

const INDICATORS = [
  { color: '#5a5a7a', label: 'Idle', desc: 'Shell at prompt', pulse: false },
  { color: '#4a9eff', label: 'Active', desc: 'Command running', pulse: true },
  { color: '#00e68a', label: 'Complete', desc: 'Task finished', pulse: false },
  { color: '#ffc857', label: 'AI Waiting', desc: 'Awaiting input', pulse: true },
]

export function TerminalPowerSection() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: false, margin: '-10%' })
  const [visibleLines, setVisibleLines] = useState(0)
  const [indicator, setIndicator] = useState(0)

  useEffect(() => {
    if (!inView) { setVisibleLines(0); setIndicator(0); return }
    let i = 0
    const interval = setInterval(() => {
      i++
      setVisibleLines(i)
      if (i <= 2) setIndicator(1)
      else if (i <= 4) setIndicator(2)
      else setIndicator(3)
      if (i >= LINES.length + 1) clearInterval(interval)
    }, 500)
    return () => clearInterval(interval)
  }, [inView])

  const ind = INDICATORS[indicator]

  return (
    <section ref={ref} className="relative py-16 overflow-hidden">
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #ffc857, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-mono text-cyan tracking-widest uppercase mb-5">Terminal Power</p>
          <h2 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
            Every Shell. <span className="text-cyan text-glow">Every Tool.</span>
          </h2>
          <p className="text-lg text-text-mid max-w-xl mx-auto leading-relaxed">
            Create terminals with any shell. Automate setup with three-level startup commands.
            AI instances get detected automatically.
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Terminal */}
          <div className="relative">
            <div className="rounded-xl border border-border overflow-hidden shadow-2xl shadow-black/50">
              <div className="flex items-center gap-2.5 px-5 py-3 bg-surface-raised border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red/60" />
                  <div className="w-3 h-3 rounded-full bg-amber/60" />
                  <div className="w-3 h-3 rounded-full bg-green/60" />
                </div>
                <span className="text-[11px] font-mono text-text-dim ml-3">PowerShell — TerminalDeck</span>
                <div className="ml-auto flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full transition-all duration-500"
                    style={{
                      background: ind.color,
                      boxShadow: `0 0 10px ${ind.color}60`,
                      animation: ind.pulse ? 'pulse-dot 1.8s ease-in-out infinite' : 'none',
                    }} />
                  <span className="text-[10px] font-mono text-text-dim">{ind.label}</span>
                </div>
              </div>

              <div className="relative bg-[#0c0c20] p-6 font-mono text-sm leading-7 scanlines" style={{ minHeight: 340 }}>
                {LINES.map((line, i) => (
                  <div key={i} className="transition-all duration-300" style={{
                    opacity: i < visibleLines ? 1 : 0,
                    transform: `translateY(${i < visibleLines ? 0 : 8}px)`,
                  }}>
                    {line.text ? <span style={{ color: line.c }}>{line.text}</span> : <br />}
                  </div>
                ))}
                {visibleLines > LINES.length && (
                  <div className="mt-2">
                    <span className="text-text">$ </span>
                    <span className="inline-block w-2 h-4 bg-cyan animate-blink align-text-bottom" />
                  </div>
                )}
              </div>
            </div>

            <div className="absolute -inset-8 -z-10 rounded-3xl transition-all duration-700"
              style={{ background: `radial-gradient(ellipse, ${ind.color}0c, transparent 70%)` }} />
          </div>

          {/* Status indicators */}
          <div className="pt-4">
            <h3 className="text-sm font-mono text-text-dim uppercase tracking-widest mb-6">Status Indicators</h3>
            <div className="space-y-4">
              {INDICATORS.map((item, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                  className="flex items-center gap-5 px-5 py-4 rounded-xl border transition-all duration-300"
                  style={{
                    borderColor: indicator === i ? item.color + '40' : 'var(--color-border)',
                    background: indicator === i ? item.color + '08' : 'transparent',
                  }}>
                  <div className="w-3.5 h-3.5 rounded-full shrink-0" style={{
                    background: item.color,
                    boxShadow: indicator === i ? `0 0 8px ${item.color}50` : 'none',
                    animation: item.pulse ? 'pulse-dot 1.8s ease-in-out infinite' : 'none',
                  }} />
                  <div>
                    <div className="text-sm font-semibold text-text">{item.label}</div>
                    <div className="text-xs text-text-dim mt-0.5">{item.desc}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
