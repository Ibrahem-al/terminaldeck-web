import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

const COLORS = ['#4a9eff', '#00e68a', '#ffc857', '#a78bfa']
const LAYOUTS = [
  {
    name: 'Grid', desc: 'Equal-sized tiles in a square grid',
    pos: [{ x: 2, y: 2, w: 47, h: 47 }, { x: 51, y: 2, w: 47, h: 47 }, { x: 2, y: 51, w: 47, h: 47 }, { x: 51, y: 51, w: 47, h: 47 }],
  },
  {
    name: 'Columns', desc: 'Side-by-side vertical columns',
    pos: [{ x: 1, y: 2, w: 23.5, h: 96 }, { x: 26, y: 2, w: 23.5, h: 96 }, { x: 51, y: 2, w: 23.5, h: 96 }, { x: 76, y: 2, w: 23.5, h: 96 }],
  },
  {
    name: 'Rows', desc: 'Stacked horizontal rows',
    pos: [{ x: 2, y: 1, w: 96, h: 23 }, { x: 2, y: 26, w: 96, h: 23 }, { x: 2, y: 51, w: 96, h: 23 }, { x: 2, y: 76, w: 96, h: 23 }],
  },
  {
    name: 'Focus', desc: 'One terminal fills the entire viewport',
    pos: [{ x: 2, y: 2, w: 96, h: 96 }, { x: -30, y: -30, w: 20, h: 20 }, { x: 110, y: -30, w: 20, h: 20 }, { x: 110, y: 110, w: 20, h: 20 }],
  },
]

export function LayoutsSection() {
  const [active, setActive] = useState(0)
  const layout = LAYOUTS[active]
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [60, 0, 0, -30])

  return (
    <section ref={ref} className="relative py-16 overflow-hidden" id="showcase">
      <motion.div style={{ opacity, y }} className="max-w-6xl mx-auto px-8">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-10%' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-mono text-cyan tracking-widest uppercase mb-5">Canvas Layouts</p>
          <h2 className="text-5xl sm:text-6xl font-bold leading-tight mb-6">
            One Click. <span className="text-cyan text-glow">Perfect.</span>
          </h2>
          <p className="text-lg text-text-mid max-w-xl mx-auto leading-relaxed">
            Instantly rearrange all terminals with layout presets. Save your own custom arrangements and recall them anytime.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Preview */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.95 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="w-full rounded-2xl border border-border bg-void-light overflow-hidden shadow-2xl shadow-black/50"
            style={{ aspectRatio: '4/3' }}
          >
            <div className="relative w-full h-full">
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(rgba(74,158,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,255,0.5) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }} />

              {layout.pos.map((p, i) => (
                <motion.div key={i} layout
                  animate={{
                    left: `${p.x}%`, top: `${p.y}%`, width: `${p.w}%`, height: `${p.h}%`,
                    opacity: p.x < -5 || p.x > 100 || p.y < -5 || p.y > 100 ? 0 : 1,
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 26, mass: 0.7 }}
                  className="absolute rounded-lg border scanlines overflow-hidden"
                  style={{ borderColor: COLORS[i] + '45', background: 'rgba(16,16,38,0.95)' }}>
                  <div className="flex items-center gap-2 px-3 py-1.5 border-b"
                    style={{ borderColor: COLORS[i] + '18', background: COLORS[i] + '06' }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: COLORS[i] }} />
                    <span className="text-[10px] font-mono text-text-mid">terminal-{i + 1}</span>
                  </div>
                  <div className="p-2.5 space-y-1.5">
                    <div className="h-[3px] rounded-full" style={{ width: '65%', background: COLORS[i] + '50' }} />
                    <div className="h-[3px] rounded-full bg-border" style={{ width: '45%' }} />
                    <div className="h-[3px] rounded-full bg-border" style={{ width: '55%' }} />
                  </div>
                </motion.div>
              ))}

              <motion.div key={active} animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 0.5 }} className="absolute inset-0 pointer-events-none">
                <div className="absolute left-1/2 top-0 bottom-0 w-px border-l border-dashed border-cyan/20" />
                <div className="absolute top-1/2 left-0 right-0 h-px border-t border-dashed border-cyan/20" />
              </motion.div>
            </div>
          </motion.div>

          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <h3 className="text-sm font-mono text-text-dim uppercase tracking-widest mb-6">Layout Presets</h3>
            <div className="space-y-3 mb-8">
              {LAYOUTS.map((l, i) => (
                <motion.button key={i} onClick={() => setActive(i)}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className={`w-full text-left px-6 py-4 rounded-xl text-sm font-medium transition-all ${
                    i === active
                      ? 'bg-cyan/12 text-cyan border border-cyan/25 shadow-lg shadow-cyan/5'
                      : 'bg-surface/50 text-text-mid border border-border hover:border-cyan/15 hover:bg-surface'
                  }`}>
                  <div className="font-semibold">{l.name}</div>
                  <div className="text-[11px] text-text-dim mt-1">{l.desc}</div>
                </motion.button>
              ))}
            </div>

            <p className="text-xs text-text-dim leading-relaxed px-1">
              Save your current arrangement as a custom preset. Reapply it anytime to restore exact positions and sizes.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
