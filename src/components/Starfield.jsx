import { useEffect, useRef } from 'react'

// Ambient canvas: slow-drifting dust with a few amber sparks.
// Parallax-shifts against the mouse. Cheap — one rAF, ~110 particles.
export default function Starfield() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let w, h, frame
    const mouse = { x: 0.5, y: 0.5 }
    const target = { x: 0.5, y: 0.5 }

    const stars = Array.from({ length: 110 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: 0.3 + Math.random() * 0.7, // depth → parallax amount + size
      r: 0.4 + Math.random() * 1.3,
      vy: 0.008 + Math.random() * 0.02,
      amber: Math.random() < 0.14,
      tw: Math.random() * Math.PI * 2,
    }))

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    function onMove(e) {
      target.x = e.clientX / w
      target.y = e.clientY / h
    }
    window.addEventListener('mousemove', onMove, { passive: true })

    let t = 0
    function draw() {
      t += 0.016
      mouse.x += (target.x - mouse.x) * 0.04
      mouse.y += (target.y - mouse.y) * 0.04
      ctx.clearRect(0, 0, w, h)

      for (const s of stars) {
        s.y -= s.vy / 100
        if (s.y < -0.02) {
          s.y = 1.02
          s.x = Math.random()
        }
        const px = s.x * w + (mouse.x - 0.5) * -34 * s.z
        const py = s.y * h + (mouse.y - 0.5) * -22 * s.z
        const twinkle = 0.55 + 0.45 * Math.sin(t * 1.6 + s.tw)
        ctx.beginPath()
        ctx.arc(px, py, s.r * s.z, 0, Math.PI * 2)
        ctx.fillStyle = s.amber
          ? `rgba(242, 169, 59, ${0.5 * twinkle * s.z})`
          : `rgba(240, 242, 246, ${0.28 * twinkle * s.z})`
        ctx.fill()
      }
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  )
}
