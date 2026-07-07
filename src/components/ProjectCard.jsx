import { ArrowUpRight, Smartphone, Globe, Lock } from 'lucide-react'
import SpotlightCard from './SpotlightCard.jsx'
import Sparkle from './Sparkle.jsx'
import SiteShot from './SiteShot.jsx'
import TiltCard from './TiltCard.jsx'

import { Link } from 'react-router-dom'

function CardMedia({ project }) {
  const Icon = project.type === 'app' ? Smartphone : Globe
  return (
    <div className={`relative mb-6 h-44 overflow-hidden rounded-2xl bg-gradient-to-br ${project.hue}`}>
      <Sparkle className="absolute -bottom-8 -right-8 size-36 text-ink/40 transition-transform duration-700 group-hover:rotate-45 group-hover:scale-110" />
      {project.url && <SiteShot url={project.url} alt={`${project.name} — live site`} />}
      <span className="absolute top-4 left-4 inline-flex items-center gap-1.5 rounded-full bg-ink/60 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-paper backdrop-blur">
        <Icon className="size-3.5" />
        {project.type === 'app' ? 'Mobile app' : 'Live site'}
      </span>
      <span className="absolute bottom-4 right-4 rounded-full bg-ink/60 px-2.5 py-1 text-xs font-semibold text-paper/80 backdrop-blur">
        {project.year}
      </span>
    </div>
  )
}

function CardBody({ project, linked }) {
  return (
    <>
      <div className="flex items-start justify-between gap-3">
        <h3 className="display-tight text-3xl">{project.name}</h3>
        {linked && (
          <ArrowUpRight className="size-5 shrink-0 text-mist transition-all duration-300 group-hover:text-amber group-hover:rotate-45" />
        )}
      </div>
      <p className="mt-1 text-xs font-semibold uppercase tracking-[0.25em] text-amber">{project.sector}</p>
      <p className="mt-3 text-sm leading-relaxed text-mist">{project.blurb}</p>
      <div className="mt-auto flex flex-wrap gap-2 pt-5">
        {project.stack.map((s) => (
          <span key={s} className="rounded-full border border-mist/20 px-3 py-1 text-[11px] text-mist">
            {s}
          </span>
        ))}
      </div>
    </>
  )
}

export default function ProjectCard({ project }) {
  const soon = project.status === 'soon'

  if (soon) {
    return (
      <TiltCard max={4} className="h-full">
        <SpotlightCard className="h-full">
          <div className="relative flex h-full flex-col p-5 sm:p-7" aria-label={`${project.name} — coming soon`}>
            <CardMedia project={project} />
            <CardBody project={project} linked={false} />

            {/* progressive left→right blur + stamp */}
            <div className="absolute inset-0 blur-sweep" aria-hidden="true" />
            <div className="absolute inset-0 blur-sweep-heavy" aria-hidden="true" />
            <div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-ink/30 to-ink/70"
              aria-hidden="true"
            />
            <div className="absolute inset-0 grid place-items-center">
              <span className="flex -rotate-6 items-center gap-2 rounded-full border-2 border-amber/80 bg-ink/70 px-6 py-3 text-sm font-bold uppercase tracking-[0.3em] text-amber backdrop-blur-sm shadow-[0_0_40px_-6px_rgba(242,169,59,0.35)]">
                <Lock className="size-4" />
                Coming soon
              </span>
            </div>
          </div>
        </SpotlightCard>
      </TiltCard>
    )
  }

  const card = (
    <TiltCard max={6} className="h-full">
      <SpotlightCard className="group h-full">
        <div className="flex h-full flex-col p-5 sm:p-7">
          <CardMedia project={project} />
          <CardBody project={project} linked />
        </div>
      </SpotlightCard>
    </TiltCard>
  )

  if (project.url) {
    const isInternal = project.url.startsWith('/')
    if (isInternal) {
      return (
        <Link to={project.url} className="block h-full">
          {card}
        </Link>
      )
    }
    return (
      <a href={project.url} target="_blank" rel="noopener noreferrer" className="block h-full">
        {card}
      </a>
    )
  }
  return card
}
