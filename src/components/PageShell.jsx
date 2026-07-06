import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const siteName = 'AQRO STUDIO'

const routeMeta = {
  '/': {
    title: 'App & Website Development Company in India',
    description:
      'AQRO STUDIO is an app & website development company in India building fast Flutter mobile apps, React websites, and conversion-focused digital products for startups and businesses.',
    keywords:
      'app development company India, website development company India, mobile app development, Flutter app development, React website development, hire app developers India, startup app development, UI UX design studio, AQRO STUDIO',
  },
  '/about': {
    title: 'About the Studio',
    description:
      'Learn how AQRO STUDIO builds focused mobile apps and websites with a small team, fast delivery, and direct communication. Based in India, working worldwide.',
    keywords:
      'about AQRO STUDIO, digital product studio India, app and website agency, small development team, app studio India',
  },
  '/projects': {
    title: 'Projects and Case Studies',
    description:
      'Browse live AQRO STUDIO projects across fintech, e-commerce, advertising, mapping, and education — real apps and websites in production.',
    keywords:
      'app development portfolio, website development portfolio, case studies, live websites, live apps, fintech app examples, e-commerce website examples',
  },
  '/apps': {
    title: 'Mobile App Development — Flutter, iOS & Android',
    description:
      'AQRO STUDIO builds cross-platform mobile apps for iOS and Android with Flutter — offline-first, secure, 60fps, and launched to both app stores for you.',
    keywords:
      'mobile app development India, Flutter app development company, iOS app development, Android app development, cross-platform apps, hire Flutter developers, app store launch, MVP app development',
  },
  '/webpages': {
    title: 'Website Development — Fast, SEO-Ready & Converting',
    description:
      'AQRO STUDIO builds SEO-ready websites and web apps with React and Next.js — 90+ Lighthouse scores, e-commerce with Razorpay/Stripe, and designs that convert visitors into customers.',
    keywords:
      'website development India, React website development, Next.js development company, SEO website design, e-commerce website development, landing page design, business website India, Razorpay integration',
  },
  '/contact': {
    title: 'Contact the Studio — Free Consultation',
    description:
      'Contact AQRO STUDIO to discuss your app or website project. Free first consultation, honest advice, and a reply within 24 hours — call, WhatsApp, or email aqroindia@gmail.com.',
    keywords:
      'contact AQRO STUDIO, hire app developer India, request a quote, free app consultation, free website consultation, WhatsApp app developer',
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    description: 'Read how AQRO STUDIO collects, uses, and protects personal information.',
    keywords: 'privacy policy, data protection, AQRO STUDIO privacy',
  },
  '/timewallet/privacy-policy': {
    title: 'TimeWallet Privacy Policy',
    description: 'Read how TimeWallet collects, uses, and protects your wallet data.',
    keywords: 'timewallet privacy policy, wallet app privacy, app data protection',
  },
  '/timewallet/delete-account': {
    title: 'Delete Account — TimeWallet',
    description: 'Request permanent deletion of your TimeWallet account and all associated data.',
    keywords: 'timewallet delete account, account deletion request, remove data',
  },
  '/timewallet': {
    title: 'TimeWallet — Save Your Time',
    description:
      'TimeWallet converts every rupee you spend into the work-time it actually cost you. Live hourly earnings, expense-to-hours converter, and 100% on-device privacy. Free on Google Play.',
    keywords:
      'TimeWallet app, money to time converter, time cost calculator, hourly wage calculator, expense tracker India, personal finance app India, budgeting app, stop impulse spending, UPI expense tracker, download TimeWallet Android',
  },
  '/terms': {
    title: 'Terms and Conditions',
    description: 'Review the terms for using the AQRO STUDIO website and working with the studio.',
    keywords: 'terms and conditions, website terms, AQRO STUDIO terms',
  },
}

function upsertMeta(name, content) {
  if (!content) return
  const selector = `meta[name="${name}"]`
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('name', name)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertPropertyMeta(property, content) {
  if (!content) return
  const selector = `meta[property="${property}"]`
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

function upsertLink(rel, href) {
  if (!href) return
  const selector = `link[rel="${rel}"]`
  let tag = document.head.querySelector(selector)
  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }
  tag.setAttribute('href', href)
}

function upsertJsonLd(id, data) {
  let tag = document.head.querySelector(`script[data-seo-id="${id}"]`)
  if (!tag) {
    tag = document.createElement('script')
    tag.type = 'application/ld+json'
    tag.setAttribute('data-seo-id', id)
    document.head.appendChild(tag)
  }
  tag.textContent = JSON.stringify(data)
}

export default function PageShell({ title, description, children, className = '' }) {
  const { pathname } = useLocation()

  useEffect(() => {
    const route = routeMeta[pathname] || {}
    const pageTitle = title
      ? `${title} — ${siteName}`
      : route.title
        ? `${route.title} — ${siteName}`
        : `${siteName} — Apps & Websites`

    const fallbackDescription =
      'AQRO STUDIO builds fast, conversion-focused apps and websites for startups and businesses.'
    const pageDescription = description || route.description || fallbackDescription
    const pageKeywords = route.keywords
    const canonical = `${window.location.origin}${pathname === '/' ? '/' : pathname}`

    document.title = pageTitle
    upsertMeta('description', pageDescription)
    upsertMeta('keywords', pageKeywords)
    upsertMeta('author', siteName)
    upsertMeta('application-name', siteName)
    upsertMeta('robots', 'index,follow')
    upsertLink('canonical', canonical)
    upsertPropertyMeta('og:title', pageTitle)
    upsertPropertyMeta('og:description', pageDescription)
    upsertPropertyMeta('og:type', 'website')
    upsertPropertyMeta('og:url', canonical)
    upsertPropertyMeta('og:site_name', siteName)
    upsertPropertyMeta('og:image', `${window.location.origin}/og-image.svg`)
    upsertPropertyMeta('og:image:width', '1200')
    upsertPropertyMeta('og:image:height', '630')
    upsertPropertyMeta('twitter:title', pageTitle)
    upsertPropertyMeta('twitter:description', pageDescription)
    upsertPropertyMeta('twitter:card', 'summary_large_image')
    upsertPropertyMeta('twitter:image', `${window.location.origin}/og-image.svg`)
    upsertJsonLd('organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: siteName,
      url: window.location.origin,
      logo: `${window.location.origin}/transparent.png`,
      email: 'aqroindia@gmail.com',
      telephone: '+91-97877-21111',
      address: { '@type': 'PostalAddress', addressCountry: 'IN' },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-97877-21111',
        email: 'aqroindia@gmail.com',
        contactType: 'customer service',
      },
    })
    upsertJsonLd('website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: window.location.origin,
    })
    if (pathname === '/timewallet') {
      upsertJsonLd('app', {
        '@context': 'https://schema.org',
        '@type': 'MobileApplication',
        name: 'TimeWallet',
        operatingSystem: 'Android',
        applicationCategory: 'FinanceApplication',
        description:
          'TimeWallet converts every rupee you spend into the work-time it actually cost you — live hourly earnings, expense-to-hours conversion, and on-device privacy.',
        installUrl: 'https://play.google.com/store/apps/details?id=in.no1ads.timewallet',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
        author: { '@type': 'Organization', name: siteName, url: window.location.origin },
      })
    } else {
      const stale = document.head.querySelector('script[data-seo-id="app"]')
      if (stale) stale.remove()
    }
  }, [description, pathname, title])

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: [0.21, 0.65, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
