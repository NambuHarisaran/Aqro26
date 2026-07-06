import Sparkle from './Sparkle.jsx'

export default function SectionTag({ children }) {
  return (
    <span className="inline-flex items-center gap-2 text-amber text-xs font-semibold uppercase tracking-[0.3em]">
      <Sparkle className="size-3.5" />
      {children}
    </span>
  )
}
