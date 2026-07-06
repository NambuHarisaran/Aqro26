import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import BrandMark from './BrandMark.jsx'

export default function Preloader() {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDone(true)
      return
    }
    const start = performance.now()
    const total = 1100
    let frame
    const tick = (now) => {
      const t = Math.min((now - start) / total, 1)
      setCount(Math.round(t * 100))
      if (t < 1) frame = requestAnimationFrame(tick)
      else setTimeout(() => setDone(true), 250)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ y: '-100%' }}
          transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3"
          >
            <BrandMark showWordmark imageClassName="size-12" />
          </motion.div>
          <div className="mt-8 h-px w-48 overflow-hidden bg-line">
            <div className="h-full bg-amber transition-[width] duration-100" style={{ width: `${count}%` }} />
          </div>
          <p className="mt-4 font-mono text-xs tracking-[0.3em] text-mist">{count}%</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
