import { useState } from 'react'

// Live screenshot of a deployed site via WordPress mShots (free, no key).
// Gradient placeholder stays underneath until the shot loads.
export default function SiteShot({ url, alt, className = '' }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const src = `https://s0.wp.com/mshots/v1/${encodeURIComponent(url)}?w=800&h=560`

  if (failed) return null

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      onError={() => setFailed(true)}
      className={`absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700 ${
        loaded ? 'opacity-100' : 'opacity-0'
      } ${className}`}
    />
  )
}
