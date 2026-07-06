import { useState } from 'react'
import { ArrowUpRight, Clock, Mail, MapPin, Phone } from 'lucide-react'
import PageShell from '../components/PageShell.jsx'
import SectionTag from '../components/SectionTag.jsx'
import Reveal from '../components/Reveal.jsx'
import Sparkle from '../components/Sparkle.jsx'
import ParallaxLayer from '../components/ParallaxLayer.jsx'
import SplitWords from '../components/SplitWords.jsx'

const channels = [
  { icon: Phone, label: 'Call or WhatsApp', value: '+91 97877 21111', href: 'tel:+919787721111' },
  { icon: Mail, label: 'Email', value: 'hello@aqro.in', href: 'mailto:hello@aqro.in' },
  { icon: MapPin, label: 'Based in', value: 'India — working worldwide', href: null },
  { icon: Clock, label: 'Response time', value: 'Within 24 hours', href: null },
]

const budgets = ['Under ₹50k', '₹50k – ₹2L', '₹2L – ₹5L', '₹5L+', 'Not sure yet']

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    type: 'App development',
    budget: 'Not sure yet',
    message: '',
  })

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  function submit(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`Project enquiry — ${form.type} (${form.name})`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nProject type: ${form.type}\nBudget: ${form.budget}\n\n${form.message}`,
    )
    window.location.href = `mailto:hello@aqro.in?subject=${subject}&body=${body}`
  }

  const inputCls =
    'w-full rounded-2xl border border-mist/20 bg-deep/50 px-5 py-4 text-paper placeholder:text-mist/60 outline-none transition-colors focus:border-amber'

  return (
    <PageShell title="Contact">
      <section className="relative overflow-hidden pt-40 pb-16">
        <ParallaxLayer speed={45} className="absolute inset-0 pointer-events-none">
          <Sparkle className="absolute top-8 right-[8%] size-48 text-raise/60 animate-float" />
          <Sparkle className="absolute bottom-0 left-[6%] size-14 text-amber/40" />
        </ParallaxLayer>
        <div className="relative mx-auto max-w-7xl px-5 md:px-10">
          <Reveal>
            <SectionTag>Contact</SectionTag>
            <h1 className="display-tight mt-4 text-6xl md:text-8xl lg:text-9xl">
              <SplitWords>
                Say <span className="text-amber">hello.</span>
              </SplitWords>
            </h1>
            <p className="mt-6 max-w-xl text-mist leading-relaxed">
              Tell us about your app or website idea. First consultation is free — you'll leave with
              honest advice and a rough plan, whether or not we work together.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 md:px-10 pb-28">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <form onSubmit={submit} className="rounded-3xl card-glass p-7 md:p-10 space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-mist">
                    Your name
                  </label>
                  <input id="name" required value={form.name} onChange={set('name')} placeholder="Bart Kolenda" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-mist">
                    Email
                  </label>
                  <input id="email" type="email" required value={form.email} onChange={set('email')} placeholder="you@company.com" className={inputCls} />
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="type" className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-mist">
                    Project type
                  </label>
                  <select id="type" value={form.type} onChange={set('type')} className={inputCls}>
                    <option>App development</option>
                    <option>Website development</option>
                    <option>App + Website</option>
                    <option>UI/UX design</option>
                    <option>Something else</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="budget" className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-mist">
                    Budget
                  </label>
                  <select id="budget" value={form.budget} onChange={set('budget')} className={inputCls}>
                    {budgets.map((b) => (
                      <option key={b}>{b}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-mist">
                  Tell us about it
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={form.message}
                  onChange={set('message')}
                  placeholder="What are you building, who is it for, and when do you want it live?"
                  className={`${inputCls} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="group inline-flex items-center gap-2 rounded-full bg-amber px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-all duration-300 hover:bg-ember hover:-translate-y-0.5 shadow-[0_10px_40px_-10px_rgba(242,169,59,0.5)]"
              >
                Send enquiry
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
              </button>
              <p className="text-xs text-mist/70">Opens your mail app with everything pre-filled. Prefer talking? Call us directly.</p>
            </form>
          </Reveal>

          <div className="grid content-start gap-5">
            {channels.map((c, i) => {
              const body = (
                <div className="flex items-center gap-5 rounded-3xl border border-line p-6 transition-colors hover:border-amber/40">
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-amber/10 text-amber">
                    <c.icon className="size-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.25em] text-mist">{c.label}</p>
                    <p className="mt-1 font-semibold text-paper">{c.value}</p>
                  </div>
                </div>
              )
              return (
                <Reveal key={c.label} delay={i * 0.08}>
                  {c.href ? <a href={c.href}>{body}</a> : body}
                </Reveal>
              )
            })}

            <Reveal delay={0.4}>
              <div className="rounded-3xl card-glass p-6">
                <p className="display-tight text-2xl">
                  No forms<span className="text-amber">?</span> No problem.
                </p>
                <p className="mt-2 text-sm text-mist leading-relaxed">
                  WhatsApp us a voice note describing your idea. We'll reply with questions, a rough
                  timeline and a ballpark — usually same day.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
