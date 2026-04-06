import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'

export function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const barRef = useRef<HTMLDivElement>(null)
  const [pct, setPct] = useState(0)

  useEffect(() => {
    const breathe = gsap.to(logoRef.current, {
      scale: 1.08,
      duration: 1.2,
      ease: 'sine.inOut',
      yoyo: true,
      repeat: -1,
    })

    const obj = { v: 0 }
    const tl = gsap.timeline()

    tl.to(obj, {
      v: 100,
      duration: 2.2,
      ease: 'power2.inOut',
      onUpdate() {
        const val = Math.round(obj.v)
        setPct(val)
        if (barRef.current) barRef.current.style.width = val + '%'
      },
      onComplete() {
        breathe.kill()
        gsap.timeline({ onComplete })
          .to(logoRef.current, { scale: 1.3, opacity: 0, duration: 0.35, ease: 'power2.in' })
          .to(containerRef.current, { opacity: 0, duration: 0.5, ease: 'power2.inOut' }, '-=0.15')
          .set(containerRef.current, { display: 'none' })
      },
    })

    return () => { tl.kill(); breathe.kill() }
  }, [onComplete])

  return (
    <div ref={containerRef} className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-void">
      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(rgba(74,158,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(74,158,255,0.5) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      <div ref={logoRef} className="relative mb-10">
        <div className="text-7xl font-mono font-bold tracking-tight select-none">
          <span className="text-cyan">{'>'}</span>
          <span className="text-text">_</span>
        </div>
        <p className="mt-3 text-center text-sm font-semibold tracking-[0.35em] uppercase text-text-mid">
          TerminalDeck
        </p>
        {/* Glow */}
        <div className="absolute -inset-12 rounded-full" style={{
          background: 'radial-gradient(circle, rgba(74,158,255,0.2) 0%, transparent 70%)',
        }} />
      </div>

      <div className="w-56 h-[2px] rounded-full bg-border overflow-hidden">
        <div ref={barRef} className="h-full rounded-full" style={{
          width: '0%',
          background: 'linear-gradient(90deg, #4a9eff, #00e68a)',
          boxShadow: '0 0 12px rgba(74,158,255,0.6)',
        }} />
      </div>
      <p className="mt-3 text-xs font-mono text-text-dim tabular-nums">{pct}%</p>
    </div>
  )
}
