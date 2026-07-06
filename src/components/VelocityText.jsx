import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Huge outlined strip that slides horizontally as you scroll past it.
export default function VelocityText({ text, reverse = false, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const x = useTransform(scrollYProgress, [0, 1], reverse ? ['-14%', '6%'] : ['6%', '-14%'])

  return (
    <div ref={ref} className={`overflow-hidden py-6 select-none ${className}`}>
      <motion.div style={{ x }} className="whitespace-nowrap">
        <span className="display-tight text-stroke-faint text-[18vw] md:text-[11vw] leading-none" data-cursor>
          {Array(4).fill(text).join('  ✦  ')}
        </span>
      </motion.div>
    </div>
  )
}
