import Sparkle from './Sparkle.jsx'

export default function Marquee({ items, className = '', itemClassName = '', fast = false }) {
  const row = [...items, ...items]
  return (
    <div className={`overflow-hidden whitespace-nowrap select-none ${className}`}>
      <div className={`inline-flex items-center ${fast ? 'animate-marquee-fast' : 'animate-marquee'}`}>
        {row.map((item, i) => (
          <span key={i} className="inline-flex items-center">
            <span className={`display-tight px-6 md:px-10 ${itemClassName}`}>{item}</span>
            <Sparkle className="size-5 md:size-7 shrink-0 text-amber" />
          </span>
        ))}
      </div>
    </div>
  )
}
