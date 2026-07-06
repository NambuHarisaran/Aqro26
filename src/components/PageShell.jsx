import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'

const siteName = 'AQRO STUDIO'

const routeMeta = {
  '/': {
    title: 'Apps & Websites for Startups and Business',
    description:
      'AQRO STUDIO designs and builds fast apps, websites, and conversion-focused digital products for startups and businesses.',
    keywords: 'app development, website development, startup studio, fintech, e-commerce, edtech, React, Flutter',
  },
  '/about': {
    title: 'About the Studio',
    description:
      'Learn how AQRO STUDIO builds focused mobile apps and websites with a small team, fast delivery, and direct communication.',
    keywords: 'about AQRO STUDIO, digital product studio, app and website agency',
  },
  '/projects': {
    title: 'Projects and Case Studies',
    description:
      'Browse live AQRO STUDIO projects across fintech, advertising, mapping, and education.',
    keywords: 'project portfolio, case studies, live websites, live apps',
  },
  '/apps': {
    title: 'Mobile App Development',
    description:
      'AQRO STUDIO builds mobile apps for iOS and Android with Flutter and modern product thinking.',
    keywords: 'mobile app development, Flutter apps, iOS, Android, product design',
  },
  '/webpages': {
    title: 'Website Development',
    description:
      'AQRO STUDIO builds SEO-ready websites and web apps that convert visitors into customers.',
    keywords: 'website development, SEO websites, React websites, web apps, landing pages',
  },
  '/contact': {
    title: 'Contact the Studio',
    description:
      'Contact AQRO STUDIO to discuss your app or website project and get a fast, honest consultation.',
    keywords: 'contact AQRO STUDIO, request a quote, app consultation, website consultation',
  },
  '/privacy-policy': {
    title: 'Privacy Policy',
    description: 'Read how AQRO STUDIO collects, uses, and protects personal information.',
    keywords: 'privacy policy, data protection, AQRO STUDIO privacy',
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
      sameAs: [],
    })
    upsertJsonLd('website', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: window.location.origin,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${window.location.origin}/projects`,
        'query-input': 'required name=search_term_string',
      },
    })
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
