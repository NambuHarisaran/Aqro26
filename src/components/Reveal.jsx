import { motion } from 'framer-motion'

export default function Reveal({ children, delay = 0, y = 40, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.65, 0.32, 1] }}
    >
      {children}
    </motion.div>
  )
}
