import { BellRing, CloudOff, Gauge, ShieldCheck, Smartphone, Store } from 'lucide-react'
import { Link } from 'react-router-dom'
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
  { icon: Smartphone, title: 'Cross-platform, native feel', text: 'One Flutter or React Native codebase, both stores, zero "web app in a wrapper" jank.' },
  { icon: CloudOff, title: 'Offline-first', text: 'Local storage and sync engines so the app works in a lift, a basement or a village.' },
  { icon: BellRing, title: 'Push & engagement', text: 'Notifications, deep links and analytics wired for retention from day one.' },
  { icon: ShieldCheck, title: 'Secure by default', text: 'Encrypted storage, safe auth flows and code that passes store review first time.' },
  { icon: Gauge, title: '60fps everywhere', text: 'Profiled animations and lazy loading — smooth even on budget Android phones.' },
  { icon: Store, title: 'Store launch handled', text: 'Listings, screenshots, signing, review back-and-forth — we ship it, not just build it.' },
]

function PhoneMock() {
  return (
    <div className="relative mx-auto w-64 md:w-72">
      <div className="rounded-[2.6rem] border border-mist/25 bg-deep/80 p-3 shadow-[0_40px_80px_-30px_rgba(242,169,59,0.25)]">
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-b from-raise to-deep aspect-[9/19]">
          <div className="absolute top-3 left-1/2 -translate-x-1/2 h-5 w-24 rounded-full bg-ink" />
          <div className="p-5 pt-12">
            <p className="display-tight text-2xl text-paper">
              TIME<span className="text-amber">WALLET</span>
            </p>
            <p className="mt-1 font-mono text-[10px] text-mist">₹ 1,499 = 6h 12m of your life</p>
            <div className="mt-4 space-y-3">
              <div className="rounded-xl bg-denim/25 h-20" />
              <div className="rounded-xl bg-raise h-12" />
              <div className="rounded-xl bg-raise/70 h-12" />
              <div className="rounded-xl bg-amber h-11 grid place-items-center">
                <span className="text-ink text-xs font-bold uppercase tracking-[0.2em]">Get started</span>
              </div>
            </div>
          </div>
          <Sparkle className="absolute -bottom-8 -right-8 size-32 text-amber/15" />
        </div>
      </div>
      <Sparkle className="absolute -top-6 -left-8 size-14 text-amber/60 animate-float" />
    </div>
  )
}

export default function Apps() {
  const appProjects = projects.filter((p) => p.type === 'app')

  return (
    <PageShell title="Apps">
      <section className="relative overflow-hidden pt-40 pb-20">
        <ParallaxLayer speed={50} className="absolute inset-0 pointer-events-none">
          <Sparkle className="absolute top-16 left-[4%] size-40 text-raise/60 animate-float" />
        </ParallaxLayer>
        <div className="relative mx-auto max-w-7xl px-5 md:px-10 grid items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <SectionTag>App development</SectionTag>
            <h1 className="display-tight mt-4 text-6xl md:text-8xl">
              <SplitWords>
                Apps people <span className="text-amber">keep.</span>
              </SplitWords>
            </h1>
            <p className="mt-6 max-w-xl text-mist leading-relaxed">
              We build mobile apps for iOS and Android from one codebase — designed for retention,
              engineered for low-end devices, and shipped to both stores. <Link to="/timewallet" className="text-amber hover:underline">TimeWallet</Link> is live; three
              more are in the lab.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Magnetic>
                <StarButton to="/contact">Plan your app</StarButton>
              </Magnetic>
              <StarButton to="/projects" variant="ghost">
                See app work
              </StarButton>
            </div>
          </Reveal>
          <ParallaxLayer speed={-35}>
            <Reveal delay={0.2}>
              <PhoneMock />
            </Reveal>
          </ParallaxLayer>
        </div>
      </section>

      <Marquee
        items={['Flutter', 'React Native', 'Firebase', 'Supabase', 'App Store', 'Play Store']}
        className="border-y border-line bg-deep/40 py-5"
        itemClassName="text-2xl md:text-4xl text-paper"
        fast
      />

      <section className="mx-auto max-w-7xl px-5 md:px-10 py-24">
        <Reveal>
          <SectionTag>Capabilities</SectionTag>
          <h2 className="display-tight mt-4 text-5xl md:text-7xl">
            <SplitWords>Built in as standard</SplitWords>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

      <VelocityText text="iOS · Android" />

      <section className="mx-auto max-w-7xl px-5 md:px-10 py-20 pb-28">
        <Reveal>
          <SectionTag>App projects</SectionTag>
          <h2 className="display-tight mt-4 text-5xl md:text-7xl">
            <SplitWords>
              One live. <span className="text-amber">More loading.</span>
            </SplitWords>
          </h2>
          <p className="mt-4 max-w-xl text-mist">
            <Link to="/timewallet" className="text-amber hover:underline">TimeWallet</Link> is in the wild. The blurred ones are real builds in progress — watch this
            space.
          </p>
        </Reveal>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {appProjects.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Magnetic>
            <StarButton to="/contact">Get a free app consultation</StarButton>
          </Magnetic>
        </div>
      </section>
    </PageShell>
  )
}
