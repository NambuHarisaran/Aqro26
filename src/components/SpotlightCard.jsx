import { useRef, useState } from 'react'

export default function SpotlightCard({ children, className = '' }) {
  const ref = useRef(null)
  const [spot, setSpot] = useState({ x: 0, y: 0, on: false })

  function onMove(e) {
    const rect = ref.current.getBoundingClientRect()
    setSpot({ x: e.clientX - rect.left, y: e.clientY - rect.top, on: true })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => setSpot((s) => ({ ...s, on: false }))}
      className={`relative overflow-hidden rounded-3xl card-glass ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500"
        style={{
          opacity: spot.on ? 1 : 0,
          background: `radial-gradient(420px circle at ${spot.x}px ${spot.y}px, rgba(242,169,59,0.09), transparent 65%)`,
        }}
      />
      {children}
    </div>
  )
}
