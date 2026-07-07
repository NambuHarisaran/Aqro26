import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Huge outlined strip: loops endlessly like a marquee, plus a slight
// scroll-linked drift on top for the velocity feel.
// Two identical halves + translateX(-50%) keyframes = seamless loop.
export default function VelocityText({ text, reverse = false, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // stays <= 0 so the looping strip never exposes a gap at the left edge
  const x = useTransform(scrollYProgress, [0, 1], reverse ? ['-8%', '0%'] : ['0%', '-8%'])

  const half = Array(4).fill(text).join('  ✦  ') + '  ✦  '

  return (
    <div ref={ref} className={`overflow-hidden py-6 select-none ${className}`}>
      <motion.div style={{ x }} className="whitespace-nowrap">
        <div className={`inline-flex animate-marquee ${reverse ? '[animation-direction:reverse]' : ''}`}>
          {[0, 1].map((i) => (
            <span
              key={i}
              className="display-tight text-stroke-faint text-[18vw] md:text-[11vw] leading-none"
              data-cursor
            >
              {half}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
