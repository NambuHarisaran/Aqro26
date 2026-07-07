import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Smartphone, Globe, ArrowUpRight, PenTool, Rocket, Search, Wrench, Clock } from 'lucide-react'
import PageShell from '../components/PageShell.jsx'
import StarButton from '../components/StarButton.jsx'
import RotatingBadge from '../components/RotatingBadge.jsx'
import Sparkle from '../components/Sparkle.jsx'
import Marquee from '../components/Marquee.jsx'
import Reveal from '../components/Reveal.jsx'
import ParallaxLayer from '../components/ParallaxLayer.jsx'
import VelocityText from '../components/VelocityText.jsx'
import CountUp from '../components/CountUp.jsx'
import SectionTag from '../components/SectionTag.jsx'
import ProjectCard from '../components/ProjectCard.jsx'
import Magnetic from '../components/Magnetic.jsx'
import SplitWords from '../components/SplitWords.jsx'
import { projects, sectors } from '../data/projects.js'

const StudioFilmPlayer = lazy(() => import('../components/StudioStoryVideo/StudioFilmPlayer.jsx'))

const stats = [
  { end: 6, suffix: '', label: 'Products live' },
  { end: 4, suffix: '', label: 'Industries served' },
  { end: 1, suffix: '', label: 'Apps in the lab' },
  { end: 24, suffix: 'h', label: 'Reply time' },
]

const steps = [
  { icon: Search, title: 'Discover', text: 'We dig into your business, users and goals before a single pixel moves.' },
  { icon: PenTool, title: 'Design', text: 'Bold interfaces prototyped fast, tested with real people, refined until sharp.' },
  { icon: Rocket, title: 'Build & Ship', text: 'Clean code, weekly demos, app-store and production launches handled end to end.' },
  { icon: Wrench, title: 'Grow', text: 'Post-launch analytics, iteration and maintenance so the product keeps earning.' },
]

function LiveClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const time = now.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    timeZone: 'Asia/Kolkata',
  })
  return (
    <span className="inline-flex flex-wrap items-center gap-2 font-mono text-[11px] sm:text-xs tracking-[0.18em] sm:tracking-[0.25em] text-mist">
      <Clock className="size-3.5 shrink-0 text-amber" />
      IST {time} — TIME IS THE CURRENCY
    </span>
  )
}

function Hero() {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  function onMove(e) {
    const rect = ref.current.getBoundingClientRect()
    setTilt({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    })
  }

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-svh overflow-hidden flex flex-col justify-center pt-28 pb-16"
    >
      {/* mouse-parallax decorative layers */}
      <motion.div
        animate={{ x: tilt.x * -40, y: tilt.y * -30 }}
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <Sparkle className="absolute top-[12%] right-[8%] size-64 md:size-[26rem] text-raise/60 animate-float" />
        <Sparkle className="absolute top-[38%] right-[30%] size-24 md:size-40 text-surface" />
      </motion.div>
      <motion.div
        animate={{ x: tilt.x * 25, y: tilt.y * 20 }}
        transition={{ type: 'spring', stiffness: 60, damping: 20 }}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <Sparkle className="absolute bottom-[18%] left-[4%] size-16 text-amber/50" />
        <Sparkle className="absolute top-[20%] left-[38%] size-8 text-ember/50" />
      </motion.div>

      <div className="relative mx-auto w-full max-w-7xl px-5 md:px-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="mb-6"
        >
          <LiveClock />
        </motion.div>

        <div className="flex items-start justify-between gap-6">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.21, 0.65, 0.32, 1] }}
              className="display-tight text-[19vw] md:text-[9.5rem] lg:text-[11rem]"
            >
              AQRO
              <br />
              STUDIO
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.8 }}
              className="mt-6 max-w-md text-sm md:text-base font-medium uppercase tracking-[0.2em] md:tracking-[0.28em] text-mist"
            >
              App &amp; web development studio
              <br />
              for startups &amp; business
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="mt-10"
            >
              <Magnetic>
                <StarButton to="/contact">Get a free consultation</StarButton>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, rotate: -30 }}
            animate={{ opacity: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="hidden md:block shrink-0"
          >
            <RotatingBadge className="size-36 lg:size-44" />
          </motion.div>
        </div>

        <div className="mt-12 md:mt-20 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <Reveal delay={0.55} className="w-full md:max-w-sm">
            <Link to="/timewallet" className="group block overflow-hidden rounded-2xl card-glass">
              <div className="relative h-40 bg-gradient-to-br from-raise to-deep overflow-hidden">
                <Sparkle className="absolute -right-6 -bottom-6 size-32 text-amber/15 transition-transform duration-700 group-hover:rotate-45" />
                <span className="absolute top-4 left-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-paper/80">
                  (01) Featured case study
                </span>
                <span className="absolute bottom-4 left-4 font-mono text-[11px] text-amber">
                  ₹ → hours
                </span>
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <div>
                  <p className="font-semibold">TimeWallet</p>
                  <p className="text-xs text-mist">Fintech app — money, priced in hours</p>
                </div>
                <ArrowUpRight className="size-5 text-mist transition-all duration-300 group-hover:text-amber group-hover:rotate-45" />
              </div>
            </Link>
          </Reveal>

          <div className="flex flex-col items-start md:items-end gap-8">
            <Reveal delay={0.65}>
              <div className="flex flex-wrap gap-x-8 gap-y-3">
                {sectors.map((s) => (
                  <Link
                    key={s}
                    to="/projects"
                    className="display-tight text-lg md:text-xl text-mist hover:text-amber transition-colors"
                  >
                    {s}
                  </Link>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.75}>
              <p className="display-tight text-3xl md:text-4xl text-left md:text-right">
                Create your
                <br />
                next star <span className="text-amber">together.</span>
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const featured = ['timewallet', 'numberoneads', 'zemaps', 'innolite-tech']
    .map((id) => projects.find((p) => p.id === id))

  return (
    <PageShell title="Home">
      <Hero />

      <Marquee
        items={['App development', 'Web development', 'UI/UX design', 'E-commerce', 'Maintenance']}
        className="border-y border-line bg-deep/40 py-6"
        itemClassName="text-3xl md:text-5xl text-paper"
      />

      {/* What we do */}
      <section className="mx-auto max-w-7xl px-5 md:px-10 py-16 md:py-24 lg:py-32">
        <Reveal>
          <SectionTag>What we do</SectionTag>
          <h2 className="display-tight mt-4 text-4xl sm:text-5xl md:text-7xl max-w-3xl">
            <SplitWords>
              Two crafts. <span className="text-amber">One obsession.</span>
            </SplitWords>
          </h2>
        </Reveal>

        <div className="mt-10 md:mt-14 grid gap-6 md:grid-cols-2">
          {[
            {
              to: '/apps',
              icon: Smartphone,
              title: 'Apps',
              text: 'Flutter & React Native apps that feel native, work offline and ship to both stores. From MVP to scale.',
              tags: ['Flutter', 'React Native', 'iOS & Android', 'MVP sprints'],
            },
            {
              to: '/webpages',
              icon: Globe,
              title: 'Webpages',
              text: 'Fast, SEO-ready websites and web apps — landing pages, e-commerce, portals — built to convert visitors.',
              tags: ['React / Next.js', 'E-commerce', 'SEO', '90+ Lighthouse'],
            },
          ].map((card, i) => (
            <Reveal key={card.to} delay={i * 0.12}>
              <Link to={card.to} className="group block h-full">
                <div className="relative h-full overflow-hidden rounded-3xl card-glass p-8 md:p-10 transition-transform duration-500 hover:-translate-y-1.5">
                  <Sparkle className="absolute -top-10 -right-10 size-40 text-raise transition-transform duration-700 group-hover:rotate-90" />
                  <card.icon className="size-10 text-amber" />
                  <h3 className="display-tight mt-6 text-4xl md:text-5xl flex items-center gap-3">
                    {card.title}
                    <ArrowUpRight className="size-8 text-mist transition-all duration-300 group-hover:text-amber group-hover:rotate-45" />
                  </h3>
                  <p className="mt-4 max-w-md text-mist leading-relaxed">{card.text}</p>
                  <div className="mt-8 flex flex-wrap gap-2">
                    {card.tags.map((t) => (
                      <span key={t} className="rounded-full border border-mist/20 px-3.5 py-1.5 text-xs text-mist">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <VelocityText text="Apps · Websites" />

      {/* Stats */}
      <section className="mx-auto max-w-7xl px-5 md:px-10 py-12 md:py-20">
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:gap-y-12 md:grid-cols-4 rounded-3xl card-glass px-6 py-10 md:py-16 text-center">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.08}>
              <p className="display-tight text-5xl md:text-6xl text-amber">
                <CountUp end={s.end} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.25em] text-mist">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Studio story film */}
      <section className="mx-auto max-w-7xl px-5 md:px-10 py-16 md:py-24">
        <Reveal>
          <SectionTag>The story</SectionTag>
          <h2 className="display-tight mt-4 text-4xl sm:text-5xl md:text-7xl">
            <SplitWords>
              Spark to <span className="text-amber">orbit</span>
            </SplitWords>
          </h2>
          <p className="mt-4 max-w-xl text-mist leading-relaxed">
            The AQRO story in 25 seconds — how an idea becomes a product people can download.
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-10 md:mt-14 aspect-video overflow-hidden rounded-3xl card-glass">
            <Suspense
              fallback={
                <div className="flex h-full items-center justify-center text-xs uppercase tracking-[0.3em] text-mist">
                  Loading film…
                </div>
              }
            >
              <StudioFilmPlayer />
            </Suspense>
          </div>
        </Reveal>
      </section>

      {/* Selected work */}
      <section className="mx-auto max-w-7xl px-5 md:px-10 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Reveal>
            <SectionTag>Selected work</SectionTag>
            <h2 className="display-tight mt-4 text-4xl sm:text-5xl md:text-7xl">
              <SplitWords>Live right now</SplitWords>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <StarButton to="/projects" variant="ghost">
              All projects
            </StarButton>
          </Reveal>
        </div>

        <div className="mt-10 md:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="h-full">
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="border-y border-line bg-deep/30">
        <div className="mx-auto max-w-7xl px-5 md:px-10 py-16 md:py-24">
          <Reveal>
            <SectionTag>How we work</SectionTag>
            <h2 className="display-tight mt-4 text-4xl sm:text-5xl md:text-7xl">
              <SplitWords>
                From idea to <span className="text-amber">orbit</span>
              </SplitWords>
            </h2>
          </Reveal>

          <div className="mt-10 md:mt-14 grid gap-6 md:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="h-full rounded-3xl border border-line p-7 transition-colors hover:border-amber/40">
                  <div className="flex items-center justify-between">
                    <s.icon className="size-7 text-amber" />
                    <span className="display-tight text-4xl text-stroke-faint">0{i + 1}</span>
                  </div>
                  <h3 className="display-tight mt-6 text-2xl">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-20 sm:py-28 md:py-36">
        <ParallaxLayer speed={40} className="absolute inset-0 pointer-events-none">
          <Sparkle className="absolute top-8 left-[10%] size-24 text-raise" />
          <Sparkle className="absolute bottom-10 right-[12%] size-40 text-amber/15" />
        </ParallaxLayer>
        <div className="relative mx-auto max-w-4xl px-5 text-center">
          <Reveal>
            <h2 className="display-tight text-5xl sm:text-6xl md:text-8xl leading-[0.92] tracking-[-0.03em]">
              <SplitWords>Got an idea?</SplitWords>
              <br />
              <span className="mt-4 block text-amber">
                <SplitWords delay={0.2}>Let's make it shine.</SplitWords>
              </span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-mist">
              Tell us what you're building. We'll reply within 24 hours with honest advice — free,
              no strings.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Magnetic>
                <StarButton to="/contact">Start your project</StarButton>
              </Magnetic>
              <StarButton href="tel:+919787721111" variant="ghost">
                Call +91 97877 21111
              </StarButton>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  )
}
