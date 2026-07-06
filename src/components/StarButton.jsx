import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'

const styles = {
  solid:
    'bg-amber text-ink hover:bg-ember hover:-translate-y-0.5 shadow-[0_10px_40px_-10px_rgba(242,169,59,0.5)]',
  ghost:
    'border border-mist/30 text-paper hover:border-amber hover:text-amber hover:-translate-y-0.5',
}

export default function StarButton({ to, href, variant = 'solid', children, className = '' }) {
  const cls = `group inline-flex items-center gap-2 rounded-full px-7 py-3.5 font-semibold text-sm uppercase tracking-[0.14em] transition-all duration-300 ${styles[variant]} ${className}`
  const inner = (
    <>
      {children}
      <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
    </>
  )
  if (to) {
    return (
      <Link to={to} className={cls}>
        {inner}
      </Link>
    )
  }
  return (
    <a href={href} className={cls}>
      {inner}
    </a>
  )
}
