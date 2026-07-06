import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Scroll-linked parallax: speed < 0 drifts up slower than scroll, > 0 drifts down.
export default function ParallaxLayer({ children, speed = 60, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  )
}
