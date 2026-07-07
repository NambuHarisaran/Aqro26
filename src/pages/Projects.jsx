import { useState } from 'react'
import PageShell from '../components/PageShell.jsx'
import SectionTag from '../components/SectionTag.jsx'
import Reveal from '../components/Reveal.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import StarButton from '../components/StarButton.jsx'
import Sparkle from '../components/Sparkle.jsx'
import ParallaxLayer from '../components/ParallaxLayer.jsx'
import SplitWords from '../components/SplitWords.jsx'
import Magnetic from '../components/Magnetic.jsx'
import { projects } from '../data/projects.js'

const filters = [
  { id: 'all', label: 'All' },
  { id: 'app', label: 'Apps' },
  { id: 'web', label: 'Webpages' },
]

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? projects : projects.filter((p) => p.type === filter)

  return (
    <PageShell title="Projects">
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-12 md:pb-16">
        <ParallaxLayer speed={45} className="absolute inset-0 pointer-events-none">
          <Sparkle className="absolute top-6 right-[10%] size-44 text-raise/60 animate-float" />
          <Sparkle className="absolute bottom-0 left-[5%] size-14 text-amber/40" />
        </ParallaxLayer>
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <Reveal>
            <SectionTag>Projects</SectionTag>
            <h1 className="display-tight mt-4 text-5xl sm:text-6xl md:text-8xl lg:text-9xl">
              <SplitWords>
                Work that <span className="text-amber">works.</span>
              </SplitWords>
            </h1>
            <p className="mt-6 max-w-xl text-mist leading-relaxed">
              Real products, live right now — across fintech, edtech, e-commerce and startup
              tooling. Web cards link straight to the live sites.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-10 flex flex-wrap gap-3">
              {filters.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFilter(f.id)}
                  className={`rounded-full px-6 py-3 text-xs font-semibold uppercase tracking-[0.2em] transition-all ${
                    filter === f.id
                      ? 'bg-amber text-ink'
                      : 'border border-mist/25 text-mist hover:border-amber hover:text-amber'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 md:px-10 pb-16 md:pb-24">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 0.08} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 pb-20 md:pb-28 text-center">
        <Reveal>
          <h2 className="display-tight text-4xl sm:text-5xl md:text-7xl">
            Your project belongs <span className="text-amber">up here.</span>
          </h2>
          <div className="mt-10">
            <Magnetic>
              <StarButton to="/contact">Start a project</StarButton>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </PageShell>
  )
}
