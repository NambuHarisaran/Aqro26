import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [active, setActive] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 300, damping: 28, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 300, damping: 28, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isMobile = window.innerWidth <= 768 || isTouch

    if (!fine || reduced || isMobile) return
    setEnabled(true)
    document.body.classList.add('custom-cursor')

    function onMove(e) {
      x.set(e.clientX)
      y.set(e.clientY)
      const t = e.target.closest('a, button, [data-cursor]')
      setActive(!!t)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.body.classList.remove('custom-cursor')
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber"
        style={{ x, y }}
        aria-hidden="true"
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full border transition-[width,height,background-color,border-color] duration-300"
        style={{
          x: ringX,
          y: ringY,
          width: active ? 52 : 32,
          height: active ? 52 : 32,
          borderColor: active ? 'rgba(242,169,59,0.9)' : 'rgba(240,242,246,0.35)',
          backgroundColor: active ? 'rgba(242,169,59,0.08)' : 'transparent',
        }}
        aria-hidden="true"
      />
    </>
  )
}
