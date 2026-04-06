import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ParticleCanvas } from '../canvas/ParticleCanvas'
import { DOWNLOADS } from '../../config/downloads'

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 2.6 } },
}
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
}

export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92])
  const y = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleCanvas />

      <div className="absolute inset-0 bg-gradient-to-b from-void/60 via-transparent to-void pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-void/30 via-transparent to-void/30 pointer-events-none" />

      <motion.div variants={stagger} initial="hidden" animate="visible"
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-6 max-w-4xl">

        <motion.div variants={fadeUp} className="mb-5">
          <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[11px] font-mono font-medium tracking-widest uppercase text-cyan/80 border border-cyan/15 bg-cyan/[0.04]">
            <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse-dot" />
            Spatial Terminal Workspace
          </span>
        </motion.div>

        <motion.h1 variants={fadeUp}
          className="text-[clamp(2.8rem,7vw,5.5rem)] font-extrabold leading-[1.05] tracking-tight mb-5">
          Your Terminals.
          <br />
          <span className="text-cyan text-glow">Unchained.</span>
        </motion.h1>

        <motion.p variants={fadeUp}
          className="text-base sm:text-lg text-text-mid max-w-xl mx-auto mb-9 leading-relaxed">
          Arrange terminals freely on an infinite canvas. Organize with projects
          and workspaces. Automate everything. Built for power users who refuse
          to be boxed in.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap justify-center gap-3">
          <a href={DOWNLOADS.windows}
            className="px-7 py-3 rounded-lg font-semibold text-white bg-cyan hover:brightness-110 transition-all glow-box">
            Download for Windows
          </a>
          <a href={DOWNLOADS.windowsGuide} target="_blank" rel="noopener noreferrer"
            className="px-7 py-3 rounded-lg font-semibold text-text-mid border border-border hover:border-cyan/30 hover:text-text transition-all">
            Windows — Build Guide
          </a>
          <a href={DOWNLOADS.macos} target="_blank" rel="noopener noreferrer"
            className="px-7 py-3 rounded-lg font-semibold text-text-mid border border-border hover:border-cyan/30 hover:text-text transition-all">
            macOS — Build Guide
          </a>
        </motion.div>

        <motion.div variants={fadeUp}
          className="mt-7 flex items-center justify-center gap-5 text-[13px] text-text-dim">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-green" /> Free
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan" /> Win & Mac
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-amber" /> AI-Aware
          </span>
        </motion.div>
      </motion.div>
    </section>
  )
}
