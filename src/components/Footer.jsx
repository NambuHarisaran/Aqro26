import { Link } from 'react-router-dom'
import BrandMark from './BrandMark.jsx'
import Marquee from './Marquee.jsx'

const nav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/apps', label: 'Apps' },
  { to: '/timewallet', label: 'TimeWallet' },
  { to: '/webpages', label: 'Webpages' },
  { to: '/contact', label: 'Contact' },
  { to: '/privacy-policy', label: 'Privacy Policy' },
  { to: '/terms', label: 'Terms & Conditions' },
  { to: '/timewallet/delete-account', label: 'Delete Account' },
]

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-line bg-ink/60 backdrop-blur-xl">
      <Marquee
        items={["Let's build your next star", 'Apps', 'Websites', 'Since 2025']}
        className="border-b border-line py-5"
        itemClassName="text-2xl md:text-4xl text-paper"
      />

      <div className="mx-auto max-w-7xl px-5 md:px-10 py-14 grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link to="/" className="inline-flex items-center gap-3">
            <BrandMark showWordmark imageClassName="size-10" />
          </Link>
          <p className="mt-5 max-w-sm text-mist leading-relaxed">
            Digital product studio for startups &amp; business. We design and build the apps and
            websites your customers remember.
          </p>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-amber mb-5">Sitemap</h3>
          <ul className="space-y-3">
            {nav.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-mist hover:text-paper transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-[0.3em] text-amber mb-5">Contact</h3>
          <ul className="space-y-3 text-mist">
            <li>
              <a href="tel:+919787721111" className="hover:text-paper transition-colors">
                +91 97877 21111
              </a>
            </li>
            <li>
              <a href="mailto:aqroindia@gmail.com" className="hover:text-paper transition-colors">
                aqroindia@gmail.com
              </a>
            </li>
            <li>India — working worldwide</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line py-5 text-center text-xs uppercase tracking-[0.25em] text-mist/70">
        © {new Date().getFullYear()} AQRO STUDIO — All rights reserved
      </div>
    </footer>
  )
}
