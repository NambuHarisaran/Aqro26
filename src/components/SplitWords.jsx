import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

// Headline reveal: each word rises out of its own clip mask.
// The IntersectionObserver lives on the UN-clipped container (not on the
// translated words) — observing a word that starts translated 110% down inside
// an overflow-hidden mask makes the browser report it as never visible, so
// whileInView on the word itself never fires. useInView on the wrapper is safe.
export default function SplitWords({ children, delay = 0, stagger = 0.06, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const nodes = Array.isArray(children) ? children : [children]
  const words = []
  for (const node of nodes) {
    if (typeof node === 'string') {
      for (const word of node.split(/\s+/).filter(Boolean)) words.push(word)
    } else if (node) {
      words.push(node)
    }
  }

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] -mb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: '110%' }}
            animate={inView ? { y: 0 } : { y: '110%' }}
            transition={{ duration: 0.7, delay: delay + i * stagger, ease: [0.21, 0.65, 0.32, 1] }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && ' '}
        </span>
      ))}
    </span>
  )
}
