import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PROJECTS = [
  { name: 'Backend', color: '#4a9eff', instances: ['api-server', 'auth-service', 'worker-queue'] },
  { name: 'Frontend', color: '#00e68a', instances: ['next-dev', 'storybook', 'e2e-tests'] },
  { name: 'Database', color: '#ffc857', instances: ['postgres', 'redis-cli', 'migrations'] },
  { name: 'DevOps', color: '#a78bfa', instances: ['docker-compose', 'k8s-logs', 'ci-runner'] },
]

export function OrganizationSection() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section className="relative py-16 overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-[0.04]"
        style={{ background: 'radial-gradient(circle, #00e68a, transparent 70%)' }} />

      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-mono text-cyan tracking-widest uppercase mb-5">Organization</p>
          <h2 className="text-5xl sm:text-6xl font-bold mb-6">
            From Chaos to <span className="text-cyan text-glow">Clarity.</span>
          </h2>
          <p className="text-lg text-text-mid max-w-xl mx-auto leading-relaxed">
            Color-coded projects group terminals by concern. Workspaces give you entirely separate contexts.
          </p>
        </div>

        {/* Workspace mockup */}
        <div className="mx-auto rounded-2xl border border-border bg-void-light overflow-hidden shadow-2xl shadow-black/50">
          {/* Top bar */}
          <div className="flex items-center gap-2.5 px-5 py-3 border-b border-border bg-surface/80">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red/60" />
              <div className="w-3 h-3 rounded-full bg-amber/60" />
              <div className="w-3 h-3 rounded-full bg-green/60" />
            </div>
            <span className="text-[11px] font-mono text-text-dim ml-3">TerminalDeck</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr]" style={{ minHeight: 500 }}>
            {/* Sidebar */}
            <div className="border-r border-border bg-surface/50 p-5">
              <div className="text-[10px] font-mono text-text-dim uppercase tracking-widest mb-5 px-2">
                Workspace: Development
              </div>

              {PROJECTS.map((proj, i) => (
                <div key={i}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                  className="rounded-lg mb-1.5 transition-all duration-200 cursor-pointer"
                  style={{ background: hovered === i ? proj.color + '0c' : 'transparent' }}>
                  <div className="flex items-center gap-3 px-3 py-3"
                    style={{ borderLeft: `2px solid ${hovered === i ? proj.color : 'transparent'}` }}>
                    <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: proj.color }} />
                    <span className="text-sm font-medium text-text">{proj.name}</span>
                    <span className="ml-auto text-[11px] font-mono text-text-dim bg-void-light px-1.5 py-0.5 rounded">
                      {proj.instances.length}
                    </span>
                  </div>
                  <AnimatePresence>
                    {hovered === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden pl-9 pr-3 pb-3 space-y-1.5">
                        {proj.instances.map(inst => (
                          <div key={inst} className="flex items-center gap-2.5 py-1">
                            <div className="w-1.5 h-1.5 rounded-full" style={{ background: proj.color, opacity: 0.5 }} />
                            <span className="text-[11px] font-mono text-text-dim">{inst}</span>
                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-green/60" />
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <div className="mt-8 text-[10px] font-mono text-text-dim uppercase tracking-widest px-2 mb-3">
                Ungrouped
              </div>
              <div className="flex items-center gap-2.5 px-3 py-2.5 text-[11px] font-mono text-text-dim">
                <div className="w-1.5 h-1.5 rounded-full bg-text-dim" />
                scratch-pad
              </div>
            </div>

            {/* Canvas area */}
            <div className="relative bg-void-light overflow-hidden">
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(rgba(74,158,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,255,0.5) 1px, transparent 1px)',
                backgroundSize: '36px 36px',
              }} />

              {PROJECTS.map((proj, pi) =>
                proj.instances.map((inst, ii) => {
                  const x = 3 + ii * 32
                  const y = 3 + pi * 24
                  const isHighlighted = hovered === pi
                  return (
                    <motion.div key={`${pi}-${ii}`}
                      initial={{ opacity: 0, scale: 0.85 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: pi * 0.06 + ii * 0.03, duration: 0.4 }}
                      className="absolute rounded-lg border scanlines overflow-hidden transition-all duration-300"
                      style={{
                        left: `${x}%`, top: `${y}%`,
                        width: '30%', height: '21%',
                        borderColor: isHighlighted ? proj.color + '70' : proj.color + '35',
                        background: isHighlighted ? 'rgba(18, 18, 40, 0.98)' : 'rgba(14, 14, 34, 0.92)',
                        boxShadow: isHighlighted ? `0 0 30px ${proj.color}15, 0 0 0 1px ${proj.color}20` : 'none',
                        zIndex: isHighlighted ? 10 : 1,
                      }}>
                      <div className="flex items-center gap-2 px-3 py-1.5 border-b"
                        style={{ borderColor: proj.color + '15', background: proj.color + '06' }}>
                        <div className="w-2 h-2 rounded-full" style={{ background: proj.color }} />
                        <span className="text-[10px] font-mono text-text-mid truncate">{inst}</span>
                      </div>
                      <div className="p-2.5 space-y-1.5">
                        {[0.7, 0.45, 0.55].map((w, j) => (
                          <div key={j} className="h-[3px] rounded-full" style={{
                            width: `${w * 100}%`,
                            background: j === 0 ? proj.color + '50' : '#2a2a50',
                          }} />
                        ))}
                      </div>
                    </motion.div>
                  )
                })
              )}
            </div>
          </div>
        </div>

        {/* Feature pills */}
        <div className="flex flex-wrap justify-center gap-3 mt-14">
          {['24 Project Colors', 'Drag Between Projects', 'Per-Project Commands', 'Instant Workspace Switch'].map(f => (
            <span key={f} className="px-4 py-1.5 rounded-full text-xs font-mono text-text-mid border border-border bg-surface/50">
              {f}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
