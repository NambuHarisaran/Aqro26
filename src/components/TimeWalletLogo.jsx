export default function TimeWalletLogo({ className = '', ...props }) {
  return (
    <svg
      viewBox="0 0 512 512"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="butt" strokeLinejoin="round">
        <circle
          cx="256"
          cy="256"
          r="178"
          strokeWidth="72"
          strokeDasharray="1004 244"
          strokeDashoffset="-28"
        />
        <path d="M 256 156 V 300 H 350" strokeWidth="56" />
      </g>
      <rect x="326" y="58" width="132" height="132" fill="#f2a93b" />
    </svg>
  )
}