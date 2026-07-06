import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import BrandMark from './BrandMark.jsx'
import StarButton from './StarButton.jsx'
import Magnetic from './Magnetic.jsx'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/apps', label: 'Apps' },
  { to: '/webpages', label: 'Webpages' },
  { to: '/timewallet', label: 'TimeWallet' },
  { to: '/contact', label: 'Contact' },
]

const desktopLinks = links.filter((l) => l.to !== '/' && l.to !== '/contact')

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled ? 'bg-ink/80 backdrop-blur-xl border-b border-line' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10 py-4">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setOpen(false)}>
          <BrandMark showWordmark imageClassName="size-9" className="transition-transform duration-500 group-hover:scale-105" />
        </Link>

        <div className="hidden lg:flex items-center gap-8">
          {desktopLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `text-xs font-semibold uppercase tracking-[0.22em] transition-colors ${
                  isActive ? 'text-amber' : 'text-mist hover:text-paper'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Magnetic strength={0.25}>
            <StarButton to="/contact" className="!px-5 !py-2.5">
              Get a free consultation
            </StarButton>
          </Magnetic>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="lg:hidden grid size-10 place-items-center rounded-full border border-mist/25 text-paper"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 top-[68px] z-40 bg-ink/95 backdrop-blur-2xl"
          >
            <div className="flex h-full flex-col justify-between overflow-y-auto px-6 pt-10 pb-24">
              <div className="flex flex-col gap-2">
                {links.map((l, i) => (
                  <motion.div
                    key={l.to}
                    initial={{ opacity: 0, x: -28 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.06 * i, duration: 0.4 }}
                  >
                    <NavLink
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `display-tight block text-4xl sm:text-5xl py-2 transition-colors ${
                          isActive ? 'text-amber' : 'text-paper hover:text-amber'
                        }`
                      }
                    >
                      {l.label}
                    </NavLink>
                  </motion.div>
                ))}
              </div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-3 text-mist text-sm"
              >
                <a href="tel:+919787721111" className="hover:text-amber">+91 97877 21111</a>
                <a href="mailto:aqroindia@gmail.com" className="hover:text-amber">aqroindia@gmail.com</a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
