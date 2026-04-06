import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { InteractiveDemo } from './InteractiveDemo'

export function ImmersiveDemo() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Entry: 0→0.33 = zoom in (≈50vh of scroll)
  // Middle: 0.33→0.67 = pinned, interactive (≈50vh)
  // Exit: 0.67→1 = zoom back out (≈50vh)
  const scale = useTransform(scrollYProgress, [0, 0.33, 0.67, 1], [0.78, 1, 1, 0.82])
  const borderRadius = useTransform(scrollYProgress, [0, 0.33, 0.67, 1], [32, 0, 0, 32])
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.72, 1], [0.4, 1, 1, 0])

  const labelOpacity = useTransform(scrollYProgress, [0, 0.2, 0.28], [1, 1, 0])
  const labelY = useTransform(scrollYProgress, [0, 0.33], [0, -40])

  const exitOpacity = useTransform(scrollYProgress, [0.62, 0.72, 1], [0, 1, 0])

  return (
    <div ref={containerRef} className="relative" style={{ height: '150vh' }}>
      {/* Floating label before zoom-in */}
      <motion.div
        style={{ opacity: labelOpacity, y: labelY }}
        className="sticky top-8 z-30 text-center pointer-events-none"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono font-medium tracking-widest uppercase text-cyan/60 border border-cyan/10 bg-void/80 backdrop-blur-sm">
          ↓ Scroll to explore the app
        </span>
      </motion.div>

      {/* The sticky demo that pins below the navbar */}
      <div className="sticky top-14 overflow-hidden" style={{ height: 'calc(100vh - 56px)' }}>
        <motion.div
          style={{ scale, borderRadius, opacity }}
          className="w-full h-full origin-center"
        >
          <div className="absolute inset-0 bg-void" />

          <div className="relative h-full">
            <InteractiveDemo embedded />
          </div>
        </motion.div>
      </div>

      {/* Exit hint */}
      <motion.div
        style={{ opacity: exitOpacity }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-30 pointer-events-none"
      >
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-mono text-text-dim border border-border bg-void/80 backdrop-blur-sm">
          ↓ Keep scrolling
        </span>
      </motion.div>
    </div>
  )
}
