import BrandMark from './BrandMark.jsx'

export default function RotatingBadge({ className = '', text = 'AQRO STUDIO • SINCE 2025 • ' }) {
  return (
    <div className={`relative grid place-items-center ${className}`}>
      <svg viewBox="0 0 120 120" className="size-full animate-spin-slow">
        <defs>
          <path id="badge-circle" d="M 60,60 m -44,0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0" />
        </defs>
        <circle cx="60" cy="60" r="56" fill="none" stroke="rgba(124,133,151,0.3)" strokeWidth="1" strokeDasharray="3 5" />
        <text className="fill-paper" style={{ fontSize: '10.5px', letterSpacing: '2.5px', fontWeight: 600 }}>
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <div className="absolute inset-0 grid place-items-center">
        <BrandMark imageClassName="size-10" />
      </div>
    </div>
  )
}
