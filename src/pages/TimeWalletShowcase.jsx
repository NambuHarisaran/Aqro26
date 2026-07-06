import { useState } from 'react'
import { Player } from '@remotion/player'
import { ArrowUpRight, Play, Coins, ShieldCheck, Trash2, ShieldAlert, Clock, Info } from 'lucide-react'
import PageShell from '../components/PageShell.jsx'
import SectionTag from '../components/SectionTag.jsx'
import Reveal from '../components/Reveal.jsx'
import Sparkle from '../components/Sparkle.jsx'
import ParallaxLayer from '../components/ParallaxLayer.jsx'
import SplitWords from '../components/SplitWords.jsx'
import TimeWalletVideo from '../components/TimeWalletVideo/TimeWalletVideo.jsx'
import StarButton from '../components/StarButton.jsx'
import Magnetic from '../components/Magnetic.jsx'

const featuresList = [
  { icon: Clock, title: 'Live hourly earnings tracker', desc: 'Watch your real wage tick up in real time while you work — overtime and taxes factored in.' },
  { icon: Coins, title: 'UPI & Expense Converter', desc: 'Input any price to see exactly how many hours and minutes of work it actually costs you.' },
  { icon: ShieldCheck, title: '100% On-device Privacy', desc: 'No servers, no third-party tracking. All financial logs are stored fully encrypted on your own device.' },
]

const calculationsExamples = [
  { label: 'Netflix Premium subscription', value: 649, category: 'Subscription' },
  { label: 'Weekly Starbucks orders', value: 1500, category: 'Impulse Want' },
  { label: 'Weekend getaway trip', value: 12000, category: 'Experience' },
  { label: 'New iPhone Pro upgrade', value: 130000, category: 'Tech' },
]

export default function TimeWalletShowcase() {
  const [hourlyWage, setHourlyWage] = useState(300)
  const [calcInput, setCalcInput] = useState('')
  const [calcResult, setCalcResult] = useState(null)

  function handleCalculate(value) {
    const num = parseFloat(value)
    if (isNaN(num) || num <= 0 || hourlyWage <= 0) {
      setCalcResult(null)
      return
    }
    const totalHours = num / hourlyWage
    const days = Math.floor(totalHours / 8) // Assuming 8-hour workday
    const remainingHours = totalHours % 8
    const hours = Math.floor(remainingHours)
    const minutes = Math.round((remainingHours - hours) * 60)

    setCalcResult({ days, hours, minutes, totalHours: totalHours.toFixed(1) })
  }

  const inputCls =
    'w-full rounded-2xl border border-mist/20 bg-deep/50 px-5 py-4 text-paper placeholder:text-mist/60 outline-none transition-colors focus:border-amber text-center font-bold text-2xl'

  return (
    <PageShell title="TimeWallet — Save Your Time">
      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden pt-40 pb-20">
        <ParallaxLayer speed={45} className="absolute inset-0 pointer-events-none">
          <Sparkle className="absolute top-12 left-[5%] size-36 text-raise/50 animate-float" />
          <Sparkle className="absolute bottom-8 right-[8%] size-20 text-amber/20" />
        </ParallaxLayer>

        <div className="relative mx-auto max-w-7xl px-5 md:px-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
          <Reveal>
            <SectionTag>Featured App</SectionTag>
            <h1 className="display-tight mt-4 text-6xl md:text-8xl">
              TIME<span className="text-amber">WALLET.</span>
            </h1>
            <p className="mt-6 max-w-xl text-mist leading-relaxed text-lg">
              Save your time the way you save your money. TimeWallet re-prices your life-decisions in 
              <strong> hours worked</strong> instead of abstract currency. A ₹1,500 buy isn't just money — it's half a work-day.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Magnetic>
                <StarButton to="/contact">Get the app</StarButton>
              </Magnetic>
              <StarButton to="/timewallet/delete-account" variant="ghost">
                Account Deletion Request
              </StarButton>
            </div>
          </Reveal>

          {/* ── Remotion Video Player ── */}
          <Reveal delay={0.2}>
            <div className="relative rounded-[2.5rem] overflow-hidden border border-line bg-ink/80 p-2 shadow-[0_30px_60px_-15px_rgba(242,169,59,0.15)] aspect-[4/5] sm:aspect-square md:aspect-[4/3] lg:aspect-square max-w-md mx-auto">
              <Player
                component={TimeWalletVideo}
                durationInFrames={300}
                fps={30}
                compositionWidth={1080}
                compositionHeight={1350}
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: '2rem',
                }}
                controls
                loop
                autoPlay
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───── Calculator Interactive Section ───── */}
      <section className="mx-auto max-w-7xl px-5 md:px-10 py-16 border-t border-line">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
          <Reveal>
            <SectionTag>Interactive Calculator</SectionTag>
            <h2 className="display-tight mt-4 text-4xl md:text-5xl">
              What is a purchase <span className="text-amber">really costing you?</span>
            </h2>
            <p className="mt-4 text-mist leading-relaxed">
              Enter your real hourly wage and the price of an item you want to buy. Our converter will 
              instantly translate that price into the exact amount of work-time required to earn it.
            </p>

            <div className="mt-8 space-y-4">
              <div className="p-5 rounded-3xl border border-line bg-ink/40">
                <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-mist mb-3">
                  Your Hourly Wage (₹ / hr)
                </label>
                <input
                  type="number"
                  value={hourlyWage}
                  onChange={(e) => {
                    setHourlyWage(Number(e.target.value))
                    if (calcInput) handleCalculate(calcInput)
                  }}
                  className={inputCls}
                />
              </div>

              <div className="p-5 rounded-3xl border border-line bg-ink/40">
                <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-mist mb-3">
                  Item Price (₹)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={calcInput}
                  onChange={(e) => {
                    setCalcInput(e.target.value)
                    handleCalculate(e.target.value)
                  }}
                  className={inputCls}
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="h-full flex flex-col justify-between rounded-3xl card-glass p-8 md:p-10 min-h-[380px]">
              {calcResult ? (
                <div className="space-y-6 text-center my-auto">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber">Time cost translation</span>
                  <div className="text-5xl md:text-6xl font-bold text-paper font-sans tracking-tight">
                    {calcResult.days > 0 && <span>{calcResult.days}d </span>}
                    {calcResult.hours > 0 || calcResult.days > 0 ? <span>{calcResult.hours}h </span> : null}
                    <span>{calcResult.minutes}m</span>
                  </div>
                  <p className="text-mist max-w-md mx-auto text-sm leading-relaxed">
                    At ₹{hourlyWage}/hr, you must work for a total of <strong className="text-paper">{calcResult.totalHours} hours</strong> (assuming 8-hour working days) just to afford this item.
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-center my-auto">
                  <Coins className="size-16 mx-auto text-mist/30 animate-pulse-soft" />
                  <p className="text-lg text-mist">Enter price details on the left to calculate your time cost.</p>
                </div>
              )}

              <div className="border-t border-line/50 pt-6 mt-6">
                <span className="text-xs font-semibold uppercase tracking-[0.25em] text-mist block mb-4">Or try these examples:</span>
                <div className="grid gap-3 sm:grid-cols-2">
                  {calculationsExamples.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => {
                        setCalcInput(String(item.value))
                        handleCalculate(String(item.value))
                      }}
                      className="flex items-center justify-between p-3 rounded-2xl border border-line bg-deep/30 hover:border-amber/40 hover:bg-deep/70 transition-all text-left group"
                    >
                      <div>
                        <div className="text-xs text-mist">{item.category}</div>
                        <div className="text-sm font-semibold text-paper group-hover:text-amber transition-colors mt-0.5">{item.label}</div>
                      </div>
                      <div className="font-bold text-sm text-paper pl-2">₹{item.value}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───── Features Grid ───── */}
      <section className="mx-auto max-w-7xl px-5 md:px-10 py-20 pb-28">
        <Reveal>
          <SectionTag>Core Features</SectionTag>
          <h2 className="display-tight mt-4 text-5xl md:text-7xl">
            Built to buy back <span className="text-amber">your life.</span>
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuresList.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-line p-8 transition-all duration-300 hover:border-amber/35 hover:-translate-y-1 hover:bg-surface/10">
                <f.icon className="size-8 text-amber" />
                <h3 className="display-tight mt-6 text-2xl">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mist">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  )
}
