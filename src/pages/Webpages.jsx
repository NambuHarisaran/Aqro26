import { Gauge, LineChart, Paintbrush, Search, ShoppingCart, Wrench } from 'lucide-react'
import PageShell from '../components/PageShell.jsx'
import SectionTag from '../components/SectionTag.jsx'
import Reveal from '../components/Reveal.jsx'
import Sparkle from '../components/Sparkle.jsx'
import StarButton from '../components/StarButton.jsx'
import VelocityText from '../components/VelocityText.jsx'
import ParallaxLayer from '../components/ParallaxLayer.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Marquee from '../components/Marquee.jsx'
import SplitWords from '../components/SplitWords.jsx'
import Magnetic from '../components/Magnetic.jsx'
import { projects } from '../data/projects.js'

const capabilities = [
  { icon: Paintbrush, title: 'Design that converts', text: 'Bold typography, one clear CTA, layouts tested against real visitor behaviour.' },
  { icon: Gauge, title: '90+ Lighthouse scores', text: 'Static-first builds, optimised media and zero bloat. Speed is the brand.' },
  { icon: Search, title: 'SEO from the ground up', text: 'Semantic markup, meta, sitemaps and Core Web Vitals handled — not bolted on.' },
  { icon: ShoppingCart, title: 'E-commerce ready', text: 'Storefronts, payment gateways (Stripe, Razorpay) and inventory integrations.' },
  { icon: LineChart, title: 'Analytics wired in', text: 'Events, funnels and dashboards so every redesign decision has numbers behind it.' },
  { icon: Wrench, title: 'Easy to update', text: 'CMS integration or clean component code — your team edits content without calling us.' },
]

function BrowserMock() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="rounded-2xl border border-mist/25 bg-deep/80 shadow-[0_40px_80px_-30px_rgba(242,169,59,0.25)] overflow-hidden">
        <div className="flex items-center gap-2 border-b border-line px-4 py-3">
          <span className="size-2.5 rounded-full bg-amber/70" />
          <span className="size-2.5 rounded-full bg-denim/60" />
          <span className="size-2.5 rounded-full bg-mist/40" />
          <span className="ml-3 flex-1 rounded-full bg-ink/60 px-3 py-1 text-[10px] text-mist">aqro.in</span>
        </div>
        <div className="relative bg-gradient-to-br from-raise to-deep p-6 aspect-[16/11]">
          <p className="display-tight text-3xl text-paper">
            AQRO <span className="text-amber">WEB</span>
          </p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            <div className="col-span-2 h-16 rounded-lg bg-denim/25" />
            <div className="h-16 rounded-lg bg-raise" />
            <div className="h-10 rounded-lg bg-raise/70" />
            <div className="h-10 rounded-lg bg-raise/70" />
            <div className="h-10 rounded-lg bg-amber grid place-items-center">
              <span className="text-ink text-[9px] font-bold uppercase tracking-[0.15em]">Book now</span>
            </div>
            <div className="h-10 rounded-lg bg-raise/60 grid place-items-center text-[9px] font-bold uppercase tracking-[0.15em] text-mist">
              Live
            </div>
          </div>
          <Sparkle className="absolute -bottom-10 -right-10 size-36 text-amber/15" />
        </div>
      </div>
      <Sparkle className="absolute -top-6 -right-6 size-12 text-amber/60 animate-float" />
    </div>
  )
}

export default function Webpages() {
  const webProjects = projects.filter((p) => p.type === 'web')

  return (
    <PageShell title="Webpages">
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-14 md:pb-20">
        <ParallaxLayer speed={50} className="absolute inset-0 pointer-events-none">
          <Sparkle className="absolute top-16 right-[4%] size-40 text-raise/60 animate-float" />
        </ParallaxLayer>
        <div className="relative mx-auto max-w-7xl px-5 md:px-10 grid items-center gap-12 lg:gap-16 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <SectionTag>Web development</SectionTag>
            <h1 className="display-tight mt-4 text-5xl sm:text-6xl md:text-8xl">
              <SplitWords>
                Websites that <span className="text-amber">sell.</span>
              </SplitWords>
            </h1>
            <p className="mt-6 max-w-xl text-mist leading-relaxed">
              Landing pages, company sites, e-commerce and web apps — built with React and Next.js,
              obsessed over for speed, SEO and one job above all: turning visitors into customers.
              Four are live right now; every card below links to the real thing.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Magnetic>
                <StarButton to="/contact">Plan your website</StarButton>
              </Magnetic>
              <StarButton to="/projects" variant="ghost">
                See web work
              </StarButton>
            </div>
          </Reveal>
          <ParallaxLayer speed={-35}>
            <Reveal delay={0.2}>
              <BrowserMock />
            </Reveal>
          </ParallaxLayer>
        </div>
      </section>

      <Marquee
        items={['React', 'Next.js', 'Tailwind', 'Firebase', 'Razorpay', 'Vercel']}
        className="border-y border-line bg-deep/40 py-5"
        itemClassName="text-2xl md:text-4xl text-paper"
        fast
      />

      <section className="mx-auto max-w-7xl px-5 md:px-10 py-16 md:py-24">
        <Reveal>
          <SectionTag>Capabilities</SectionTag>
          <h2 className="display-tight mt-4 text-4xl sm:text-5xl md:text-7xl">
            <SplitWords>Every build includes</SplitWords>
          </h2>
        </Reveal>
        <div className="mt-10 md:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.08}>
              <div className="h-full rounded-3xl border border-line p-7 transition-colors hover:border-amber/40">
                <c.icon className="size-8 text-amber" />
                <h3 className="display-tight mt-5 text-2xl">{c.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <VelocityText text="Fast · Found · Converting" reverse />

      <section className="mx-auto max-w-7xl px-5 md:px-10 py-14 md:py-20 pb-20 md:pb-28">
        <Reveal>
          <SectionTag>Web projects</SectionTag>
          <h2 className="display-tight mt-4 text-4xl sm:text-5xl md:text-7xl">
            <SplitWords>Live on the web</SplitWords>
          </h2>
        </Reveal>
        <div className="mt-10 md:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {webProjects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
        <div className="mt-12 md:mt-16 text-center">
          <Magnetic>
            <StarButton to="/contact">Get a free website consultation</StarButton>
          </Magnetic>
        </div>
      </section>
    </PageShell>
  )
}
