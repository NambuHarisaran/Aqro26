import { useState } from 'react'
import { Player } from '@remotion/player'
import { Coins, ShieldCheck, Clock } from 'lucide-react'
import PageShell from '../components/PageShell.jsx'
import SectionTag from '../components/SectionTag.jsx'
import Reveal from '../components/Reveal.jsx'
import Sparkle from '../components/Sparkle.jsx'
import ParallaxLayer from '../components/ParallaxLayer.jsx'
import TimeWalletVideo, { TOTAL_FRAMES } from '../components/TimeWalletVideo/TimeWalletVideo.jsx'
import TimeWalletLogo from '../components/TimeWalletLogo.jsx'

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
  const [monthlyIncome, setMonthlyIncome] = useState(50000)
  const [itemName, setItemName] = useState('')
  const [calcInput, setCalcInput] = useState('')
  const [calcResult, setCalcResult] = useState(null)

  function handleCalculate(priceVal, incomeVal, itemVal) {
    const price = parseFloat(priceVal)
    const income = parseFloat(incomeVal !== undefined ? incomeVal : monthlyIncome)
    const name = itemVal !== undefined ? itemVal : itemName

    if (isNaN(price) || price <= 0 || isNaN(income) || income <= 0) {
      setCalcResult(null)
      return
    }

    // Standard 176 working hours per month (22 working days * 8 hours)
    const calculatedHourlyWage = income / 176
    const totalHours = price / calculatedHourlyWage
    const days = Math.floor(totalHours / 8) // Assuming 8-hour workday
    const remainingHours = totalHours % 8
    const hours = Math.floor(remainingHours)
    const minutes = Math.round((remainingHours - hours) * 60)

    setCalcResult({
      days,
      hours,
      minutes,
      totalHours: totalHours.toFixed(1),
      hourlyWage: Math.round(calculatedHourlyWage),
      itemName: name || 'this item'
    })
  }

  const inputCls =
    'w-full rounded-2xl border border-mist/20 bg-deep/50 px-5 py-4 text-paper placeholder:text-mist/60 outline-none transition-colors focus:border-amber text-center font-bold text-2xl'
  const textInputCls =
    'w-full rounded-2xl border border-mist/20 bg-deep/50 px-5 py-4 text-paper placeholder:text-mist/60 outline-none transition-colors focus:border-amber text-center text-lg'

  return (
    <PageShell title="TimeWallet — Save Your Time">
      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden pt-32 md:pt-40 pb-14 md:pb-20">
        <ParallaxLayer speed={45} className="absolute inset-0 pointer-events-none">
          <Sparkle className="absolute top-12 left-[5%] size-36 text-raise/50 animate-float" />
          <Sparkle className="absolute bottom-8 right-[8%] size-20 text-amber/20" />
        </ParallaxLayer>

        <div className="relative mx-auto max-w-7xl px-5 md:px-10 grid gap-12 lg:grid-cols-[1.2fr_1fr] items-center">
          <Reveal>
            <SectionTag>Featured App</SectionTag>
            <div className="mt-4 flex items-center gap-4">
              <TimeWalletLogo className="size-16 sm:size-20 shrink-0 text-paper md:size-24 drop-shadow-[0_0_18px_rgba(255,255,255,0.15)]" />
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-mist/70">TimeWallet</p>
                <p className="mt-2 text-sm font-medium uppercase tracking-[0.28em] text-amber">Save Your Time</p>
              </div>
            </div>
            <h1 className="display-tight mt-4 text-[2.7rem] leading-[0.92] sm:text-6xl md:text-8xl">
              TIME<span className="text-amber">WALLET.</span>
            </h1>
            <p className="mt-6 max-w-xl text-mist leading-relaxed text-base md:text-lg">
              Save your time the way you save your money. TimeWallet re-prices your life-decisions in 
              <strong> hours worked</strong> instead of abstract currency. A ₹1,500 buy isn't just money — it's half a work-day.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              {/* Google Play Store button - Active */}
              <a href="https://play.google.com/store/apps/details?id=in.no1ads.timewallet" target="_blank" rel="noopener noreferrer" className="group">
                <div className="inline-flex items-center gap-3 rounded-2xl border border-line bg-ink px-5 py-3.5 transition-all duration-300 hover:border-amber hover:bg-raise shadow-[0_10px_40px_-10px_rgba(242,169,59,0.2)]">
                  <svg viewBox="0 0 24 24" className="size-5 shrink-0 fill-current text-amber">
                    <path d="M3 22.0003V2.00032C3 1.54732 3.25 1.13432 3.656 0.922316L14.77 12.0003L3.656 23.0783C3.25 22.8663 3 22.4533 3 22.0003ZM16.184 13.4143L20.344 15.8143C21.219 16.3193 21.219 17.6813 20.344 18.1863L16.184 20.5863L12.77 17.1723L16.184 13.4143ZM12.77 6.82832L16.184 10.2423L20.344 7.84232C21.219 7.33732 21.219 5.97532 20.344 5.47032L16.184 7.87032L12.77 6.82832ZM15.77 12.0003L4.656 23.0783L12.77 14.9643L15.77 12.0003Z"/>
                  </svg>
                  <div className="text-left leading-none">
                    <span className="text-[8px] uppercase tracking-[0.1em] text-mist font-semibold">Get it on</span>
                    <span className="block text-xs font-bold text-paper mt-0.5">Google Play</span>
                  </div>
                </div>
              </a>

              {/* App Store button - Coming Soon */}
              <div className="relative group">
                <div className="inline-flex items-center gap-3 rounded-2xl border border-line bg-ink/40 px-5 py-3.5 opacity-45 cursor-not-allowed select-none">
                  <svg viewBox="0 0 24 24" className="size-5 shrink-0 fill-current text-mist">
                    <path d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.1 22C7.79 22.05 6.8 20.68 5.96 19.48C4.25 17 2.94 12.45 4.7 9.39C5.57 7.87 7.13 6.91 8.82 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.1 16.67C20.08 16.74 19.67 18.11 18.71 19.5ZM15.97 4.17C16.63 3.37 17.07 2.28 16.95 1C16 1.04 14.9 1.6 14.24 2.38C13.68 3.04 13.19 4.14 13.34 5.39C14.39 5.47 15.4 4.88 15.97 4.17Z"/>
                  </svg>
                  <div className="text-left leading-none">
                    <span className="text-[8px] uppercase tracking-[0.1em] text-mist font-semibold">Download on the</span>
                    <span className="block text-xs font-bold text-paper mt-0.5">App Store</span>
                  </div>
                </div>
                <span className="absolute -top-2.5 -right-2.5 rounded-full bg-amber px-2.5 py-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-ink shadow-[0_4px_12px_rgba(242,169,59,0.3)]">
                  Coming Soon
                </span>
              </div>
            </div>
          </Reveal>

          {/* ── Remotion Video Player ── */}
          <Reveal delay={0.2}>
            <div className="relative rounded-[2.5rem] overflow-hidden border border-line bg-ink/80 p-2 shadow-[0_30px_60px_-15px_rgba(242,169,59,0.15)] aspect-[4/5] sm:aspect-square md:aspect-[4/3] lg:aspect-square max-w-md mx-auto">
              <Player
                component={TimeWalletVideo}
                durationInFrames={TOTAL_FRAMES}
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
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <SectionTag>Interactive Calculator</SectionTag>
            <h2 className="display-tight mt-4 text-3xl sm:text-4xl md:text-5xl">
              What is a purchase <span className="text-amber">really costing you?</span>
            </h2>
            <p className="mt-4 text-mist leading-relaxed">
              Don't know your hourly wage? No problem. Enter your monthly income below to convert your earnings to an hourly rate. Then enter the item name and price to calculate your real time-cost.
            </p>

            <div className="mt-8 space-y-4">
              <div className="p-5 rounded-3xl border border-line bg-ink/40">
                <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-mist mb-3">
                  Your Monthly Income (₹)
                </label>
                <input
                  type="number"
                  inputMode="numeric"
                  min="0"
                  aria-label="Your monthly income in rupees"
                  value={monthlyIncome}
                  onChange={(e) => {
                    const inc = Number(e.target.value)
                    setMonthlyIncome(inc)
                    if (calcInput) handleCalculate(calcInput, inc, itemName)
                  }}
                  className={inputCls}
                />
                <span className="block text-[11px] text-mist/70 text-center mt-2">
                  Equals ~₹{Math.round(monthlyIncome / 176)}/hr (based on 22 working days, 8 hrs/day)
                </span>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="p-5 rounded-3xl border border-line bg-ink/40">
                  <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-mist mb-3">
                    What should you buy?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. iPhone 15 Pro"
                    value={itemName}
                    onChange={(e) => {
                      const name = e.target.value
                      setItemName(name)
                      if (calcInput) handleCalculate(calcInput, monthlyIncome, name)
                    }}
                    className={textInputCls}
                  />
                </div>

                <div className="p-5 rounded-3xl border border-line bg-ink/40">
                  <label className="block text-xs font-semibold uppercase tracking-[0.25em] text-mist mb-3">
                    Item Price (₹)
                  </label>
                  <input
                    type="number"
                    inputMode="numeric"
                    min="0"
                    aria-label="Item price in rupees"
                    placeholder="e.g. 130000"
                    value={calcInput}
                    onChange={(e) => {
                      const prc = e.target.value
                      setCalcInput(prc)
                      handleCalculate(prc, monthlyIncome, itemName)
                    }}
                    className={inputCls}
                  />
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div aria-live="polite" className="h-full flex flex-col justify-between rounded-3xl card-glass p-6 sm:p-8 md:p-10 min-h-[380px]">
              {calcResult ? (
                <div className="space-y-6 text-center my-auto">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-amber">Time cost translation</span>
                  <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-paper font-sans tracking-tight">
                    {calcResult.days > 0 && <span>{calcResult.days}d </span>}
                    {calcResult.hours > 0 || calcResult.days > 0 ? <span>{calcResult.hours}h </span> : null}
                    <span>{calcResult.minutes}m</span>
                  </div>
                  <p className="text-mist max-w-md mx-auto text-sm leading-relaxed">
                    To buy <strong className="text-paper">{calcResult.itemName}</strong> (₹{parseFloat(calcInput).toLocaleString('en-IN')}), you must work for a total of <strong className="text-paper">{calcResult.totalHours} hours</strong> (at ~₹{calcResult.hourlyWage}/hr).
                  </p>
                </div>
              ) : (
                <div className="space-y-4 text-center my-auto">
                  <Coins className="size-16 mx-auto text-mist/30 animate-pulse-soft" />
                  <p className="text-lg text-mist">Enter income and item details on the left to calculate your time cost.</p>
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
                        setItemName(item.label)
                        handleCalculate(String(item.value), monthlyIncome, item.label)
                      }}
                      className="flex items-center justify-between p-3 rounded-2xl border border-line bg-deep/30 hover:border-amber/40 hover:bg-deep/70 transition-all text-left group"
                    >
                      <div className="truncate">
                        <div className="text-xs text-mist">{item.category}</div>
                        <div className="text-sm font-semibold text-paper group-hover:text-amber transition-colors mt-0.5 truncate max-w-[150px]">{item.label}</div>
                      </div>
                      <div className="font-bold text-sm text-paper pl-2 shrink-0">₹{item.value.toLocaleString('en-IN')}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───── Features Grid ───── */}
      <section className="mx-auto max-w-7xl px-5 md:px-10 py-14 md:py-20 pb-20 md:pb-28">
        <Reveal>
          <SectionTag>Core Features</SectionTag>
          <h2 className="display-tight mt-4 text-4xl sm:text-5xl md:text-7xl">
            Built to buy back <span className="text-amber">your life.</span>
          </h2>
        </Reveal>

        <div className="mt-10 md:mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
