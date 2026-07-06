export default function Sparkle({ className = '', fill = 'currentColor' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <path
        d="M32 2c2 17.5 12.5 28 30 30-17.5 2-28 12.5-30 30-2-17.5-12.5-28-30-30C19.5 30 30 19.5 32 2z"
        fill={fill}
      />
    </svg>
  )
}
