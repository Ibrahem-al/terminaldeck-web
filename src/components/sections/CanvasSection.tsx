import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

const COLORS = ['#4a9eff', '#00e68a', '#ffc857', '#a78bfa', '#ff5c6a', '#06b6d4']

const TERMINALS = [
  { id: 0, x: 3, y: 5, w: 29, h: 27, label: 'api-server' },
  { id: 1, x: 35, y: 3, w: 30, h: 30, label: 'next-dev' },
  { id: 2, x: 68, y: 6, w: 29, h: 26, label: 'postgres' },
  { id: 3, x: 2, y: 38, w: 31, h: 28, label: 'docker-logs' },
  { id: 4, x: 36, y: 36, w: 28, h: 30, label: 'test-runner' },
  { id: 5, x: 67, y: 37, w: 30, h: 29, label: 'redis-cli' },
  { id: 6, x: 4, y: 70, w: 28, h: 26, label: 'storybook' },
  { id: 7, x: 35, y: 69, w: 30, h: 27, label: 'ci-pipeline' },
  { id: 8, x: 68, y: 70, w: 29, h: 26, label: 'monitoring' },
]

export function CanvasSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.85, 1, 1, 0.95])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  return (
    <section ref={ref} id="features" className="relative py-16 overflow-hidden">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full opacity-[0.05]"
        style={{ background: 'radial-gradient(circle, #4a9eff, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-8">
        <motion.div style={{ opacity }} className="text-center mb-10">
          <p className="text-xs font-mono text-cyan tracking-widest uppercase mb-5">Infinite Canvas</p>
          <h2 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
            No Walls. <span className="text-cyan text-glow">No Limits.</span>
          </h2>
          <p className="text-lg text-text-mid max-w-xl mx-auto leading-relaxed">
            Every terminal lives on a boundless 2D canvas you control. Pan, zoom, snap, and arrange freely in all directions.
          </p>
        </motion.div>

        {/* Canvas mockup */}
        <motion.div style={{ scale, opacity }}
          className="mx-auto rounded-2xl border border-border bg-void-light overflow-hidden shadow-2xl shadow-black/50">

          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: 'linear-gradient(rgba(74,158,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,255,0.6) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />

          {/* Title bar */}
          <div className="relative flex items-center gap-2.5 px-5 py-3 border-b border-border bg-surface/80">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red/60" />
              <div className="w-3 h-3 rounded-full bg-amber/60" />
              <div className="w-3 h-3 rounded-full bg-green/60" />
            </div>
            <span className="text-[11px] font-mono text-text-dim ml-3">TerminalDeck — Workspace: Development</span>
            <div className="ml-auto flex items-center gap-4 text-[10px] font-mono text-text-dim">
              <span>Zoom: 100%</span>
              <span>9 instances</span>
            </div>
          </div>

          {/* Canvas area */}
          <div className="relative" style={{ height: 'clamp(420px, 48vw, 580px)' }}>
            {TERMINALS.map((t, i) => (
              <motion.div key={t.id}
                initial={{ opacity: 0, scale: 0.6, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.06 * i, duration: 0.5, ease: 'easeOut' }}
                className="absolute rounded-lg border scanlines overflow-hidden"
                style={{
                  left: `${t.x}%`, top: `${t.y}%`, width: `${t.w}%`, height: `${t.h}%`,
                  borderColor: COLORS[i % 6] + '40',
                  background: 'rgba(14, 14, 34, 0.95)',
                  boxShadow: `0 2px 20px ${COLORS[i % 6]}08`,
                }}>
                <div className="flex items-center gap-2 px-3 py-1.5 border-b"
                  style={{ borderColor: COLORS[i % 6] + '18', background: COLORS[i % 6] + '06' }}>
                  <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i % 6] }} />
                  <span className="text-[10px] font-mono text-text-mid truncate">{t.label}</span>
                  <span className="ml-auto text-[9px] font-mono text-text-dim">~$</span>
                </div>
                <div className="p-2.5 space-y-1.5">
                  {[0.75, 0.5, 0.6, 0.35].map((w, j) => (
                    <div key={j} className="h-[3px] rounded-full" style={{
                      width: `${w * 100}%`,
                      background: j === 0 ? COLORS[i % 6] + '50' : '#2a2a50',
                    }} />
                  ))}
                </div>
              </motion.div>
            ))}

            {/* Snap guides */}
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.8 }}
              className="absolute inset-0 pointer-events-none">
              <div className="absolute left-[34%] top-[3%] bottom-[3%] w-px border-l border-dashed border-cyan/15" />
              <div className="absolute left-[67%] top-[3%] bottom-[3%] w-px border-l border-dashed border-cyan/15" />
              <div className="absolute top-[35%] left-[2%] right-[2%] h-px border-t border-dashed border-cyan/15" />
              <div className="absolute top-[68%] left-[2%] right-[2%] h-px border-t border-dashed border-cyan/15" />
            </motion.div>
          </div>
        </motion.div>

        {/* Feature pills */}
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mt-14">
          {['Pan & Zoom 25–200%', 'Magnetic Snap Alignment', 'Collision Control', 'Infinite in All Directions'].map(f => (
            <span key={f} className="px-4 py-1.5 rounded-full text-xs font-mono text-text-mid border border-border bg-surface/50">
              {f}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
