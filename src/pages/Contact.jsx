import { useState } from 'react'
import { ArrowUpRight, CheckCircle, Clock, Loader2, Mail, MapPin, MessageCircle, Phone, AlertTriangle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import PageShell from '../components/PageShell.jsx'
import SectionTag from '../components/SectionTag.jsx'
import Reveal from '../components/Reveal.jsx'
import Sparkle from '../components/Sparkle.jsx'
import ParallaxLayer from '../components/ParallaxLayer.jsx'
import SplitWords from '../components/SplitWords.jsx'
import { submitForm } from '../firebase.js'

const channels = [
  { icon: Phone, label: 'Call us', value: '+91 97877 21111', href: 'tel:+919787721111' },
  { icon: MessageCircle, label: 'WhatsApp', value: '+91 97877 21111', href: 'https://wa.me/919787721111?text=Hi%20AQRO%20STUDIO%2C%20I%20have%20a%20project%20idea.' },
  { icon: Mail, label: 'Email', value: 'aqroindia@gmail.com', href: 'mailto:aqroindia@gmail.com' },
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
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function submit(e) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      await submitForm('contactSubmissions', {
        name: form.name,
        email: form.email,
        projectType: form.type,
        budget: form.budget,
        message: form.message,
      },
      import.meta.env.VITE_EMAILJS_CONTACT_TEMPLATE,
      {
        from_name: form.name,
        from_email: form.email,
        project_type: form.type,
        budget: form.budget,
        message: form.message,
      })
      setStatus('success')
    } catch (err) {
      console.error('Contact form submission failed:', err)
      setErrorMsg('Something went wrong. Please try again or contact us directly.')
      setStatus('error')
    }
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
            <AnimatePresence mode="wait">
              {status === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.21, 0.65, 0.32, 1] }}
                  className="rounded-3xl card-glass p-10 md:p-14 flex flex-col items-center justify-center text-center min-h-[460px]"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 200, damping: 12 }}
                  >
                    <CheckCircle className="size-20 text-mint" strokeWidth={1.5} />
                  </motion.div>
                  <motion.h2
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="display-tight mt-6 text-4xl md:text-5xl"
                  >
                    Message <span className="text-amber">sent!</span>
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.45 }}
                    className="mt-4 max-w-md text-mist leading-relaxed"
                  >
                    Thanks for reaching out, {form.name.split(' ')[0] || 'friend'}! We'll get back
                    to you within 24 hours. Keep an eye on <strong className="text-paper">{form.email}</strong>.
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => {
                      setStatus('idle')
                      setForm({ name: '', email: '', type: 'App development', budget: 'Not sure yet', message: '' })
                    }}
                    className="mt-8 text-sm text-amber hover:text-ember transition-colors underline underline-offset-4"
                  >
                    Send another message
                  </motion.button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={submit}
                  className="rounded-3xl card-glass p-7 md:p-10 space-y-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-mist">
                        Your name
                      </label>
                      <input id="name" required autoComplete="name" value={form.name} onChange={set('name')} placeholder="Bart Kolenda" className={inputCls} disabled={status === 'loading'} />
                    </div>
                    <div>
                      <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-mist">
                        Email
                      </label>
                      <input id="email" type="email" required autoComplete="email" value={form.email} onChange={set('email')} placeholder="you@company.com" className={inputCls} disabled={status === 'loading'} />
                    </div>
                  </div>

                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="type" className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-mist">
                        Project type
                      </label>
                      <select id="type" value={form.type} onChange={set('type')} className={inputCls} disabled={status === 'loading'}>
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
                      <select id="budget" value={form.budget} onChange={set('budget')} className={inputCls} disabled={status === 'loading'}>
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
                      disabled={status === 'loading'}
                    />
                  </div>

                  {/* Error message */}
                  <AnimatePresence>
                    {status === 'error' && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        className="flex items-center gap-3 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4"
                      >
                        <AlertTriangle className="size-5 shrink-0 text-red-400" />
                        <p className="text-sm text-red-300">{errorMsg}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group inline-flex items-center gap-2 rounded-full bg-amber px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-ink transition-all duration-300 hover:bg-ember hover:-translate-y-0.5 shadow-[0_10px_40px_-10px_rgba(242,169,59,0.5)] disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send enquiry
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                      </>
                    )}
                  </button>
                  <p className="text-xs text-mist/70">Your message goes directly to our team. We respond within 24 hours.</p>
                </motion.form>
              )}
            </AnimatePresence>
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
              const external = c.href && c.href.startsWith('http')
              return (
                <Reveal key={c.label} delay={i * 0.08}>
                  {c.href ? (
                    <a href={c.href} target={external ? '_blank' : undefined} rel={external ? 'noopener noreferrer' : undefined}>
                      {body}
                    </a>
                  ) : (
                    body
                  )}
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
                <a
                  href="https://wa.me/919787721111?text=Hi%20AQRO%20STUDIO%2C%20here%27s%20my%20idea%3A"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-amber hover:text-ember transition-colors"
                >
                  <MessageCircle className="size-4" />
                  Open WhatsApp chat
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </PageShell>
  )
}
