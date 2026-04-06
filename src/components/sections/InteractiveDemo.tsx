import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/* ── types & data ───────────────────────────── */

interface Terminal {
  id: string
  name: string
  project: string
  output: string[]
  indicator: 'idle' | 'active' | 'complete' | 'ai'
  shell: string
}

interface Pos { x: number; y: number; w: number; h: number }

interface Project {
  name: string
  color: string
}

const PROJECTS: Project[] = [
  { name: 'Backend', color: '#4a9eff' },
  { name: 'Frontend', color: '#00e68a' },
  { name: 'Database', color: '#ffc857' },
  { name: 'DevOps', color: '#a78bfa' },
]

const SHELLS = ['bash', 'zsh', 'pwsh', 'node']
const NAMES = ['server', 'client', 'worker', 'watcher', 'runner', 'logger', 'monitor', 'build', 'deploy', 'shell']
const OUTPUTS = [
  ['$ npm run dev', '  Listening on :4000', '  GET /api/users 200 12ms'],
  ['$ node worker.js', '  Processing queue...', '  ✓ 42 jobs complete'],
  ['$ next dev', '  ▲ Ready on localhost:3000', '  ✓ Compiled in 240ms'],
  ['$ storybook dev', '  Storybook 8.0 started', '  → localhost:6006'],
  ['psql (16.1)', 'Type "help" for help.', 'app_db=#'],
  ['$ redis-cli', '127.0.0.1:6379> PING', 'PONG'],
  ['$ docker compose logs -f', '  web-1  | Booting...', '  db-1   | Ready'],
  ['$ claude', '  ● Claude Code v1.0', '  How can I help?'],
]
const INDICATORS: Terminal['indicator'][] = ['idle', 'active', 'complete', 'ai']

const SEED_TERMINALS: Terminal[] = [
  { id: 't0', name: 'api-server', project: 'Backend', shell: 'bash', indicator: 'active',
    output: OUTPUTS[0] },
  { id: 't1', name: 'worker', project: 'Backend', shell: 'bash', indicator: 'idle',
    output: OUTPUTS[1] },
  { id: 't2', name: 'next-dev', project: 'Frontend', shell: 'zsh', indicator: 'active',
    output: OUTPUTS[2] },
  { id: 't3', name: 'storybook', project: 'Frontend', shell: 'zsh', indicator: 'complete',
    output: OUTPUTS[3] },
  { id: 't4', name: 'postgres', project: 'Database', shell: 'psql', indicator: 'idle',
    output: OUTPUTS[4] },
  { id: 't5', name: 'redis-cli', project: 'Database', shell: 'bash', indicator: 'complete',
    output: OUTPUTS[5] },
  { id: 't6', name: 'docker-logs', project: 'DevOps', shell: 'bash', indicator: 'active',
    output: OUTPUTS[6] },
  { id: 't7', name: 'claude', project: 'DevOps', shell: 'bash', indicator: 'ai',
    output: OUTPUTS[7] },
]

const INDICATOR_META: Record<string, { color: string; label: string; pulse: boolean }> = {
  idle:     { color: '#5a5a7a', label: 'Idle', pulse: false },
  active:   { color: '#4a9eff', label: 'Active', pulse: true },
  complete: { color: '#00e68a', label: 'Done', pulse: false },
  ai:       { color: '#ffc857', label: 'AI', pulse: true },
}

type Layout = 'grid' | 'columns' | 'rows' | 'free'

const LAYOUTS: { name: Exclude<Layout, 'free'>; label: string; icon: string }[] = [
  { name: 'grid', label: 'Grid', icon: '⊞' },
  { name: 'columns', label: 'Columns', icon: '⊟' },
  { name: 'rows', label: 'Rows', icon: '☰' },
]

function computePositions(ids: string[], layout: Exclude<Layout, 'free'>): Record<string, Pos> {
  const n = ids.length
  if (n === 0) return {}
  const out: Record<string, Pos> = {}

  if (layout === 'columns') {
    const w = 100 / n
    ids.forEach((id, i) => { out[id] = { x: i * w + 0.5, y: 0.5, w: w - 1, h: 99 } })
  } else if (layout === 'rows') {
    const h = 100 / n
    ids.forEach((id, i) => { out[id] = { x: 0.5, y: i * h + 0.5, w: 99, h: h - 1 } })
  } else {
    const cols = Math.ceil(Math.sqrt(n))
    const rows = Math.ceil(n / cols)
    const cw = 100 / cols
    const rh = 100 / rows
    ids.forEach((id, i) => {
      const c = i % cols; const r = Math.floor(i / cols)
      out[id] = { x: c * cw + 0.8, y: r * rh + 0.8, w: cw - 1.6, h: rh - 1.6 }
    })
  }
  return out
}

/* ── component ──────────────────────────────── */

let nextId = 100

export function InteractiveDemo({ embedded }: { embedded?: boolean } = {}) {
  const [terminals, setTerminals] = useState<Terminal[]>(SEED_TERMINALS)
  const [positions, setPositions] = useState<Record<string, Pos>>(() =>
    computePositions(SEED_TERMINALS.map(t => t.id), 'grid')
  )
  const [activeProject, setActiveProject] = useState<string | null>(null)
  const [focusedTerminal, setFocusedTerminal] = useState<string | null>(null)
  const [layout, setLayout] = useState<Layout>('grid')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const canvasRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<{ id: string; startX: number; startY: number; origX: number; origY: number } | null>(null)

  const visibleTerminals = activeProject
    ? terminals.filter(t => t.project === activeProject)
    : terminals

  /* ── layout switching ────────────────────── */
  const applyLayout = useCallback((l: Exclude<Layout, 'free'>) => {
    setLayout(l)
    const ids = activeProject
      ? terminals.filter(t => t.project === activeProject).map(t => t.id)
      : terminals.map(t => t.id)
    setPositions(prev => ({ ...prev, ...computePositions(ids, l) }))
  }, [terminals, activeProject])

  /* ── drag handling ───────────────────────── */
  const onPointerDown = useCallback((e: React.PointerEvent, id: string) => {
    if ((e.target as HTMLElement).closest('[data-close]')) return
    e.preventDefault()
    e.stopPropagation()
    const pos = positions[id]
    if (!pos) return
    dragRef.current = { id, startX: e.clientX, startY: e.clientY, origX: pos.x, origY: pos.y }
    ;(e.target as HTMLElement).closest('[data-terminal]')?.setPointerCapture(e.pointerId)
    setLayout('free')
  }, [positions])

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    const d = dragRef.current
    if (!d || !canvasRef.current) return
    const rect = canvasRef.current.getBoundingClientRect()
    const dx = ((e.clientX - d.startX) / rect.width) * 100
    const dy = ((e.clientY - d.startY) / rect.height) * 100
    setPositions(prev => ({
      ...prev,
      [d.id]: { ...prev[d.id], x: Math.max(0, Math.min(90, d.origX + dx)), y: Math.max(0, Math.min(90, d.origY + dy)) }
    }))
  }, [])

  const onPointerUp = useCallback(() => { dragRef.current = null }, [])

  /* ── add / remove ────────────────────────── */
  const addTerminal = useCallback((project: string) => {
    const id = `t${nextId++}`
    const name = NAMES[Math.floor(Math.random() * NAMES.length)] + '-' + (nextId % 100)
    const shell = SHELLS[Math.floor(Math.random() * SHELLS.length)]
    const indicator = INDICATORS[Math.floor(Math.random() * INDICATORS.length)]
    const output = OUTPUTS[Math.floor(Math.random() * OUTPUTS.length)]
    const t: Terminal = { id, name, project, shell, indicator, output }

    setTerminals(prev => [...prev, t])
    // Place new terminal in a random open spot
    const x = 5 + Math.random() * 60
    const y = 5 + Math.random() * 60
    setPositions(prev => ({ ...prev, [id]: { x, y, w: 30, h: 30 } }))
    setLayout('free')
  }, [])

  const removeTerminal = useCallback((id: string) => {
    setTerminals(prev => prev.filter(t => t.id !== id))
    setPositions(prev => { const next = { ...prev }; delete next[id]; return next })
    if (focusedTerminal === id) setFocusedTerminal(null)
  }, [focusedTerminal])

  /* ── filter project ──────────────────────── */
  const toggleProject = useCallback((name: string) => {
    setActiveProject(prev => prev === name ? null : name)
    setFocusedTerminal(null)
  }, [])

  /* ── helpers ─────────────────────────────── */
  const projOf = (t: Terminal) => PROJECTS.find(p => p.name === t.project)!

  const mockupContent = (
    <>
        {/* ── App mockup ─────────────────────── */}
        <div className={embedded ? "h-full flex flex-col bg-void-light overflow-hidden" : "rounded-2xl border border-border bg-void-light overflow-hidden shadow-2xl shadow-black/60"}>

          {/* ── Title bar ────────────────────── */}
          <div className="flex items-center gap-3 px-4 py-2.5 border-b border-border bg-surface/80 select-none">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red/60" />
              <div className="w-3 h-3 rounded-full bg-amber/60" />
              <div className="w-3 h-3 rounded-full bg-green/60" />
            </div>
            <button onClick={() => setSidebarOpen(p => !p)}
              className="ml-1 p-1 rounded hover:bg-surface-bright transition-colors text-text-dim hover:text-text">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="1" y="2" width="4" height="12" rx="1" opacity={sidebarOpen ? 1 : 0.3}/><rect x="7" y="2" width="8" height="12" rx="1" opacity="0.3"/></svg>
            </button>
            <div className="flex-1 flex justify-center">
              <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-void-light border border-border text-[10px] font-mono text-text-dim w-56 justify-center">
                <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" opacity="0.4"><circle cx="7" cy="7" r="5" fill="none" stroke="currentColor" strokeWidth="2"/><line x1="11" y1="11" x2="15" y2="15" stroke="currentColor" strokeWidth="2"/></svg>
                Search terminals & output
              </div>
            </div>
            <div className="flex items-center gap-1">
              {LAYOUTS.map(l => (
                <button key={l.name} onClick={() => applyLayout(l.name)}
                  className={`px-2 py-1 rounded text-[11px] font-mono transition-all ${
                    layout === l.name ? 'bg-cyan/15 text-cyan' : 'text-text-dim hover:text-text hover:bg-surface-bright'
                  }`} title={l.label}>
                  {l.icon}
                </button>
              ))}
            </div>
          </div>

          {/* ── Main area ────────────────────── */}
          <div className={embedded ? "flex flex-1 min-h-0" : "flex"} style={embedded ? undefined : { height: 'clamp(400px, 45vw, 520px)' }}>

            {/* ── Sidebar ────────────────────── */}
            <AnimatePresence initial={false}>
              {sidebarOpen && (
                <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: 220, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.25 }}
                  className="shrink-0 border-r border-border bg-surface/40 overflow-hidden overflow-y-auto">
                  <div className="w-[220px] p-3">
                    <div className="flex items-center gap-2 px-2 py-2 rounded-lg bg-void-light border border-border mb-3 cursor-pointer">
                      <span className="text-[11px] font-mono text-text-mid flex-1 truncate">Development</span>
                      <svg width="10" height="10" viewBox="0 0 16 16" fill="currentColor" className="text-text-dim shrink-0"><path d="M4 6l4 4 4-4"/></svg>
                    </div>

                    {PROJECTS.map(proj => {
                      const projTerminals = terminals.filter(t => t.project === proj.name)
                      const isActive = activeProject === proj.name
                      return (
                        <div key={proj.name} className="mb-0.5">
                          <button onClick={() => toggleProject(proj.name)}
                            className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-all"
                            style={{
                              background: isActive ? proj.color + '12' : 'transparent',
                              borderLeft: `2px solid ${isActive ? proj.color : 'transparent'}`,
                            }}>
                            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: proj.color }} />
                            <span className={`text-[12px] font-medium flex-1 ${isActive ? 'text-text' : 'text-text-mid'}`}>{proj.name}</span>
                            <span className="text-[10px] font-mono text-text-dim">{projTerminals.length}</span>
                          </button>

                          <AnimatePresence>
                            {isActive && (
                              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                                {projTerminals.map(t => {
                                  const ind = INDICATOR_META[t.indicator]
                                  return (
                                    <div key={t.id} className="flex items-center gap-2 pl-7 pr-1 py-1.5">
                                      <button onClick={() => setFocusedTerminal(focusedTerminal === t.id ? null : t.id)}
                                        className="flex items-center gap-2 flex-1 text-left hover:bg-surface-bright/50 rounded px-1 transition-colors truncate">
                                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{
                                          background: ind.color,
                                          animation: ind.pulse ? 'pulse-dot 1.8s ease-in-out infinite' : 'none',
                                        }} />
                                        <span className="text-[11px] font-mono text-text-dim truncate">{t.name}</span>
                                      </button>
                                      <button onClick={() => removeTerminal(t.id)}
                                        className="shrink-0 w-4 h-4 flex items-center justify-center rounded text-text-dim hover:text-red hover:bg-red/10 transition-colors text-[10px]">
                                        ×
                                      </button>
                                    </div>
                                  )
                                })}
                                {/* Add to this project */}
                                <button onClick={() => addTerminal(proj.name)}
                                  className="w-full flex items-center gap-1.5 pl-7 pr-2.5 py-1.5 text-[10px] font-mono text-text-dim hover:text-cyan transition-colors">
                                  <span>+</span> Add instance
                                </button>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    })}

                    <button onClick={() => addTerminal(PROJECTS[Math.floor(Math.random() * PROJECTS.length)].name)}
                      className="w-full mt-3 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-dashed border-border text-[11px] font-mono text-text-dim hover:border-cyan/30 hover:text-cyan transition-all">
                      <span>+</span> New Instance
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* ── Canvas ─────────────────────── */}
            <div ref={canvasRef}
              className="flex-1 relative bg-void overflow-hidden cursor-default"
              onPointerMove={onPointerMove}
              onPointerUp={onPointerUp}
              onPointerLeave={onPointerUp}>
              {/* Grid bg */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'linear-gradient(rgba(74,158,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,255,0.5) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
              }} />

              {/* Terminals */}
              <AnimatePresence>
                {visibleTerminals.map(t => {
                  const pos = positions[t.id]
                  if (!pos) return null
                  const proj = projOf(t)
                  const ind = INDICATOR_META[t.indicator]
                  const isFocused = focusedTerminal === t.id
                  const isDimmed = focusedTerminal !== null && !isFocused

                  return (
                    <motion.div
                      key={t.id}
                      data-terminal
                      layout={layout !== 'free'}
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{
                        left: `${pos.x}%`, top: `${pos.y}%`, width: `${pos.w}%`, height: `${pos.h}%`,
                        opacity: isDimmed ? 0.15 : 1,
                        scale: isFocused ? 1.02 : 1,
                      }}
                      exit={{ opacity: 0, scale: 0.7, transition: { duration: 0.2 } }}
                      transition={{ type: 'spring', stiffness: 250, damping: 28, mass: 0.6 }}
                      onPointerDown={e => onPointerDown(e, t.id)}
                      className="absolute rounded-lg border overflow-hidden select-none touch-none scanlines"
                      style={{
                        borderColor: isFocused ? proj.color + '80' : proj.color + '35',
                        background: 'rgba(12, 12, 28, 0.95)',
                        boxShadow: isFocused ? `0 0 30px ${proj.color}20, 0 0 0 1px ${proj.color}30` : 'none',
                        zIndex: isFocused ? 20 : dragRef.current?.id === t.id ? 30 : 1,
                        cursor: 'grab',
                      }}>
                      {/* Title bar */}
                      <div className="flex items-center gap-2 px-3 py-1.5 border-b"
                        style={{ borderColor: proj.color + '18', background: proj.color + '08' }}>
                        <div className="w-2 h-2 rounded-full shrink-0" style={{
                          background: ind.color, boxShadow: `0 0 6px ${ind.color}40`,
                          animation: ind.pulse ? 'pulse-dot 1.8s ease-in-out infinite' : 'none',
                        }} />
                        <span className="text-[10px] font-mono text-text-mid truncate flex-1">{t.name}</span>
                        <span className="text-[9px] font-mono text-text-dim mr-1">{t.shell}</span>
                        <button data-close onClick={(e) => { e.stopPropagation(); removeTerminal(t.id) }}
                          className="w-4 h-4 flex items-center justify-center rounded text-text-dim hover:text-red hover:bg-red/10 transition-colors text-[10px]">
                          ×
                        </button>
                      </div>
                      {/* Content */}
                      <div className="p-2.5 font-mono text-[10px] leading-[1.6] overflow-hidden" style={{ color: '#8888aa' }}
                        onClick={() => setFocusedTerminal(isFocused ? null : t.id)}>
                        {t.output.map((line, j) => (
                          <div key={j} style={{
                            color: line.startsWith('$') || line.startsWith('psql') ? '#e4e4f0'
                              : line.includes('✓') || line.includes('Ready') || line.includes('PONG') ? '#00e68a'
                              : line.includes('●') || line.includes('How can') ? proj.color
                              : '#6a6a8a',
                          }}>{line}</div>
                        ))}
                        <div className="mt-1">
                          <span style={{ color: '#e4e4f0' }}>{t.indicator === 'ai' ? '> ' : '$ '}</span>
                          <span className="inline-block w-[6px] h-[11px] bg-cyan animate-blink align-text-bottom" />
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </AnimatePresence>

              {/* Snap guides */}
              <motion.div key={layout + (activeProject || '')}
                animate={{ opacity: [0, 0.4, 0] }} transition={{ duration: 0.6 }}
                className="absolute inset-0 pointer-events-none z-30">
                <div className="absolute left-1/2 top-[2%] bottom-[2%] w-px border-l border-dashed border-cyan/20" />
                <div className="absolute top-1/2 left-[2%] right-[2%] h-px border-t border-dashed border-cyan/20" />
              </motion.div>

              {/* Focus badge */}
              <AnimatePresence>
                {focusedTerminal && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    onClick={() => setFocusedTerminal(null)}
                    className="absolute top-2 right-2 z-40 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-surface-raised/90 border border-border text-[10px] font-mono text-text-dim cursor-pointer hover:bg-surface-bright transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber" />
                    Focus Mode — click to exit
                  </motion.div>
                )}
              </AnimatePresence>

              {visibleTerminals.length === 0 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-text-dim text-sm font-mono">
                  <span>No terminals yet</span>
                  <button onClick={() => addTerminal(activeProject || 'Backend')}
                    className="px-4 py-1.5 rounded-lg border border-dashed border-border hover:border-cyan/30 hover:text-cyan transition-all text-xs">
                    + Add one
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* ── Status bar ───────────────────── */}
          <div className="flex items-center justify-between px-4 py-1.5 border-t border-border bg-surface/60 text-[10px] font-mono text-text-dim select-none">
            <div className="flex items-center gap-4">
              <span>{visibleTerminals.length} instances</span>
              <span>Layout: {layout}</span>
              {activeProject && <span className="text-cyan">Filtered: {activeProject}</span>}
            </div>
            <div className="flex items-center gap-4">
              <span>Drag to move</span>
              <span>Snap: On</span>
            </div>
          </div>
        </div>

    </>
  )

  // Embedded mode: fill the parent container, no section wrapper
  if (embedded) {
    return <div className="w-full h-full">{mockupContent}</div>
  }

  // Standalone mode: section with heading and hints
  return (
    <section id="demo" className="relative py-16 overflow-hidden">
      <div className="max-w-6xl mx-auto px-8">
        <div className="text-center mb-10">
          <p className="text-xs font-mono text-cyan tracking-widest uppercase mb-5">Interactive Preview</p>
          <h2 className="text-5xl sm:text-6xl font-bold mb-6">
            See It in <span className="text-cyan text-glow">Action.</span>
          </h2>
          <p className="text-lg text-text-mid max-w-xl mx-auto leading-relaxed">
            Drag terminals, add new ones, close them, switch layouts — this is how TerminalDeck works.
          </p>
        </div>
        {mockupContent}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {['Drag to move', 'Click × to close', 'Click + to add', 'Layout presets ⊞ ⊟ ☰', 'Focus Mode'].map(hint => (
            <span key={hint} className="flex items-center gap-1.5 text-[11px] font-mono text-text-dim">
              <span className="text-cyan">→</span> {hint}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
