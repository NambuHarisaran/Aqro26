import { Compass, Gem, HeartHandshake, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell.jsx'
import SectionTag from '../components/SectionTag.jsx'
import Reveal from '../components/Reveal.jsx'
import Sparkle from '../components/Sparkle.jsx'
import StarButton from '../components/StarButton.jsx'
import VelocityText from '../components/VelocityText.jsx'
import ParallaxLayer from '../components/ParallaxLayer.jsx'
import CountUp from '../components/CountUp.jsx'
import SplitWords from '../components/SplitWords.jsx'
import Magnetic from '../components/Magnetic.jsx'

const values = [
  {
    icon: Zap,
    title: 'Ship fast, ship right',
    text: 'Weekly demos, working software over slideware. Momentum is a feature.',
  },
  {
    icon: Gem,
    title: 'Craft over volume',
    text: 'We take fewer projects and go deeper. Every screen earns its place.',
  },
  {
    icon: HeartHandshake,
    title: 'Straight talk',
    text: 'Honest estimates, plain language, no jargon walls. You always know where the build stands.',
  },
  {
    icon: Compass,
    title: 'Business first',
    text: 'Design decisions map to metrics — conversion, retention, revenue — not trends.',
  },
]

const milestones = [
  { year: '2025', title: 'The spark', text: 'AQRO STUDIO starts as a two-person crew shipping landing pages from India.' },
  { year: '2025', title: 'First sites live', text: 'OnPitch, SkyLoan and Pandam Store launch — real products, real users.' },
  { year: '2026', title: 'First app in the wild', text: <span><Link to="/timewallet" className="text-amber hover:underline">TimeWallet</Link> ships: money, priced in hours. One more app in the lab.</span> },
  { year: 'Next', title: 'Your project?', text: 'The next milestone on this wall could be the thing you are about to build.' },
]

export default function About() {
  return (
    <PageShell title="About">
      <section className="relative overflow-hidden pt-40 pb-20">
        <ParallaxLayer speed={50} className="absolute inset-0 pointer-events-none">
          <Sparkle className="absolute top-10 right-[6%] size-52 text-raise/60 animate-float" />
          <Sparkle className="absolute bottom-0 left-[8%] size-16 text-amber/40" />
        </ParallaxLayer>
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <Reveal>
            <SectionTag>About us</SectionTag>
            <h1 className="display-tight mt-4 text-6xl md:text-8xl lg:text-9xl max-w-5xl">
              <SplitWords>
                Small studio. <span className="text-amber">Serious products.</span>
              </SplitWords>
            </h1>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-mist">
              AQRO STUDIO is a digital product studio focused on two things: mobile apps and
              websites. No bloated retainers, no hand-offs between six departments — the people you
              talk to are the people who design and build your product.
            </p>
          </Reveal>
        </div>
      </section>

      <VelocityText text="Design · Code · Ship" />

      <section className="mx-auto max-w-7xl px-5 md:px-10 py-20">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr]">
          <Reveal>
            <SectionTag>The story</SectionTag>
            <h2 className="display-tight mt-4 text-4xl md:text-6xl">Why AQRO exists</h2>
            <div className="mt-6 space-y-5 text-mist leading-relaxed">
              <p>
                Most startups don't fail because the idea was bad. They fail because the first
                version took too long, cost too much, or shipped looking like everyone else. We
                started AQRO to fix that: a studio where a founder can go from napkin sketch to a
                product in stores in weeks, not quarters.
              </p>
              <p>
                We work across apps and websites for brands like <Link to="/timewallet" className="text-amber hover:underline">TimeWallet</Link>, OnPitch, Number One
                Ads, zeMaps and InnoLite Technologies — spaces where a clunky interface directly
                costs money. Our stack is deliberately boring where it should be (proven
                frameworks, typed code, CI from day one) and bold where it counts: the part your
                customers actually see.
              </p>
              <p>
                Based in India, working worldwide. Async-friendly, demo-driven, and allergic to
                surprise invoices.
              </p>
            </div>
          </Reveal>

          <div className="grid content-start gap-5 sm:grid-cols-2">
            {[
              { end: 6, suffix: '', label: 'Products live' },
              { end: 2, suffix: '', label: 'Years running' },
              { end: 1, suffix: '', label: 'Apps in the lab' },
              { end: 24, suffix: 'h', label: 'Reply time' },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="rounded-3xl card-glass p-7 text-center">
                  <p className="display-tight text-5xl text-amber">
                    <CountUp end={s.end} suffix={s.suffix} />
                  </p>
                  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-mist">{s.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-deep/30 py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal>
            <SectionTag>Values</SectionTag>
            <h2 className="display-tight mt-4 text-5xl md:text-7xl">
              <SplitWords>What we won't compromise</SplitWords>
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-line p-7 transition-colors hover:border-amber/40">
                  <v.icon className="size-8 text-amber" />
                  <h3 className="display-tight mt-5 text-2xl">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 md:px-10 py-24">
        <Reveal>
          <SectionTag>Timeline</SectionTag>
          <h2 className="display-tight mt-4 text-5xl md:text-7xl">
            <SplitWords>Short history, steep curve</SplitWords>
          </h2>
        </Reveal>
        <div className="mt-14 grid gap-6 md:grid-cols-4">
          {milestones.map((m, i) => (
            <Reveal key={m.title} delay={i * 0.1}>
              <div className="h-full rounded-3xl card-glass p-7">
                <p className="display-tight text-4xl text-stroke-faint">{m.year}</p>
                <h3 className="display-tight mt-4 text-2xl text-amber">{m.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{m.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-28 text-center">
        <Reveal>
          <h2 className="display-tight text-5xl md:text-7xl">
            Sound like your kind of <span className="text-amber">team?</span>
          </h2>
          <div className="mt-10">
            <Magnetic>
              <StarButton to="/contact">Work with us</StarButton>
            </Magnetic>
          </div>
        </Reveal>
      </section>
    </PageShell>
  )
}
