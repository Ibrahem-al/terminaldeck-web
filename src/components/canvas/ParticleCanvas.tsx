import { useEffect, useRef } from 'react'

interface Particle {
  x: number; y: number; vx: number; vy: number; size: number; alpha: number
}

interface FloatingPanel {
  x: number; y: number; w: number; h: number; vy: number; color: string; phase: number
}

const COLORS = ['#4a9eff', '#00e68a', '#ffc857', '#a78bfa', '#ff5c6a', '#06b6d4']

export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current!
    const ctx = canvas.getContext('2d')!
    let raf: number
    let w = 0, h = 0

    const particles: Particle[] = []
    const panels: FloatingPanel[] = []

    function resize() {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    function init() {
      resize()
      particles.length = 0
      panels.length = 0

      const count = Math.min(120, Math.floor(w * h / 8000))
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.2,
          size: Math.random() * 1.8 + 0.4,
          alpha: Math.random() * 0.5 + 0.1,
        })
      }

      for (let i = 0; i < 7; i++) {
        panels.push({
          x: Math.random() * w * 0.8 + w * 0.1,
          y: Math.random() * h * 0.7 + h * 0.15,
          w: 140 + Math.random() * 100,
          h: 80 + Math.random() * 50,
          vy: (Math.random() - 0.5) * 0.15,
          color: COLORS[i % COLORS.length],
          phase: Math.random() * Math.PI * 2,
        })
      }
    }

    function drawGrid(time: number) {
      const spacing = 60
      const offset = (time * 8) % spacing
      ctx.strokeStyle = 'rgba(74, 158, 255, 0.04)'
      ctx.lineWidth = 0.5
      ctx.beginPath()
      for (let x = -spacing + offset; x < w + spacing; x += spacing) {
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
      }
      for (let y = -spacing + offset; y < h + spacing; y += spacing) {
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
      }
      ctx.stroke()
    }

    function drawPanels(time: number) {
      for (const p of panels) {
        const floatY = Math.sin(time * 0.5 + p.phase) * 15
        const px = p.x + (mouse.current.x - w / 2) * 0.02
        const py = p.y + floatY + (mouse.current.y - h / 2) * 0.01

        // Panel shadow
        ctx.fillStyle = `rgba(0, 0, 0, 0.3)`
        ctx.fillRect(px + 4, py + 4, p.w, p.h)

        // Panel body
        ctx.fillStyle = 'rgba(14, 14, 36, 0.9)'
        ctx.strokeStyle = p.color + '45'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.roundRect(px, py, p.w, p.h, 6)
        ctx.fill()
        ctx.stroke()

        // Top bar
        ctx.fillStyle = p.color + '18'
        ctx.fillRect(px + 0.5, py + 0.5, p.w - 1, 18)

        // Top bar accent line
        ctx.fillStyle = p.color + '60'
        ctx.fillRect(px, py, p.w, 1.5)

        // Indicator dot
        ctx.beginPath()
        ctx.arc(px + 12, py + 9, 3, 0, Math.PI * 2)
        ctx.fillStyle = p.color
        ctx.fill()

        // Fake text lines
        const lineY = py + 26
        for (let l = 0; l < 3; l++) {
          const lineW = (0.3 + Math.random() * 0.5) * (p.w - 20)
          ctx.fillStyle = l === 0 ? p.color + '50' : 'rgba(48, 48, 90, 0.6)'
          ctx.fillRect(px + 10, lineY + l * 12, lineW, 4)
        }
      }
    }

    function drawParticles() {
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(74, 158, 255, ${p.alpha})`
        ctx.fill()
      }

      // Draw connections
      ctx.strokeStyle = 'rgba(74, 158, 255, 0.06)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = dx * dx + dy * dy
          if (dist < 12000) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    function draw(time: number) {
      ctx.clearRect(0, 0, w, h)
      const t = time / 1000

      drawGrid(t)
      drawPanels(t)
      drawParticles()

      // Radial glow at center
      const grd = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.5)
      grd.addColorStop(0, 'rgba(74, 158, 255, 0.04)')
      grd.addColorStop(1, 'transparent')
      ctx.fillStyle = grd
      ctx.fillRect(0, 0, w, h)

      raf = requestAnimationFrame(draw)
    }

    const onMouse = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
    }

    init()
    window.addEventListener('resize', init)
    window.addEventListener('mousemove', onMouse)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', init)
      window.removeEventListener('mousemove', onMouse)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.7 }}
    />
  )
}
