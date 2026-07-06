import { useState } from 'react'
import { ArrowUpRight, CheckCircle, Loader2, AlertTriangle, Trash2, ShieldAlert } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageShell from '../components/PageShell.jsx'
import SectionTag from '../components/SectionTag.jsx'
import Reveal from '../components/Reveal.jsx'
import Sparkle from '../components/Sparkle.jsx'
import ParallaxLayer from '../components/ParallaxLayer.jsx'
import SplitWords from '../components/SplitWords.jsx'
import { submitForm } from '../firebase.js'

const reasons = [
  'No longer using the app',
  'Privacy concerns',
  'Found a better alternative',
  'Too many bugs or issues',
  'Other',
]

const consequences = [
  { title: 'Permanent deletion', desc: 'All your wallet data, transaction history, and profile will be permanently removed from our servers.' },
  { title: 'No recovery', desc: 'Once processed, your data cannot be recovered. Make sure to export anything you need before requesting deletion.' },
  { title: 'Processing time', desc: "Deletion requests are processed within 7 business days. You'll receive a confirmation email once complete." },
]

export default function TimeWalletDeleteAccount() {
  const [form, setForm] = useState({
    email: '',
    reason: '',
    details: '',
    confirmed: false,
  })
  const [status, setStatus] = useState('idle') // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('')

  function set(field) {
    return (e) => setForm((f) => ({ ...f, [field]: e.target.value }))
  }

  async function submit(e) {
    e.preventDefault()
    if (!form.confirmed) return
    setStatus('loading')
    setErrorMsg('')

    try {
      await submitForm('deletionRequests', {
        email: form.email,
        reason: form.reason || 'Not specified',
        details: form.details || '',
        app: 'TimeWallet',
      },
      import.meta.env.VITE_EMAILJS_DELETION_TEMPLATE,
      {
        user_email: form.email,
        reason: form.reason || 'Not specified',
        details: form.details || 'None provided',
        app_name: 'TimeWallet',
      })
      setStatus('success')
    } catch (err) {
      console.error('Deletion request failed:', err)
      setErrorMsg('Something went wrong. Please try again or email us directly at aqroindia@gmail.com.')
      setStatus('error')
    }
  }

  const inputCls =
    'w-full rounded-2xl border border-mist/20 bg-deep/50 px-5 py-4 text-paper placeholder:text-mist/60 outline-none transition-colors focus:border-amber'

  return (
    <PageShell title="Delete Account — TimeWallet">
      {/* ───── Hero ───── */}
      <section className="relative overflow-hidden pt-40 pb-16">
        <ParallaxLayer speed={45} className="absolute inset-0 pointer-events-none">
          <Sparkle className="absolute top-12 right-[10%] size-40 text-raise/60 animate-float" />
          <Sparkle className="absolute bottom-4 left-[5%] size-14 text-red-400/30" />
        </ParallaxLayer>
        <div className="relative mx-auto max-w-4xl px-5 md:px-10">
          <Reveal>
            <SectionTag>TimeWallet</SectionTag>
            <h1 className="display-tight mt-4 text-5xl md:text-7xl lg:text-8xl">
              <SplitWords>
                Delete your <span className="text-red-400">account.</span>
              </SplitWords>
            </h1>
            <p className="mt-6 max-w-xl text-mist leading-relaxed">
              We're sorry to see you go. Submit a deletion request below and we'll permanently
              remove your TimeWallet account and all associated data.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ───── Consequences ───── */}
      <section className="mx-auto max-w-4xl px-5 md:px-10 pb-12">
        <div className="grid gap-4 sm:grid-cols-3">
          {consequences.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08}>
              <div className="h-full rounded-3xl border border-red-500/15 bg-red-500/5 p-6 transition-colors hover:border-red-400/30">
                <ShieldAlert className="size-7 text-red-400/80" />
                <h3 className="display-tight mt-4 text-lg text-paper">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-mist">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ───── Form ───── */}
      <section className="mx-auto max-w-4xl px-5 md:px-10 pb-28">
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.21, 0.65, 0.32, 1] }}
              className="rounded-3xl card-glass p-10 md:p-14 flex flex-col items-center justify-center text-center"
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
                className="display-tight mt-6 text-3xl md:text-4xl"
              >
                Request <span className="text-amber">submitted.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="mt-4 max-w-lg text-mist leading-relaxed"
              >
                Your account deletion request has been received. We'll process it within
                <strong className="text-paper"> 7 business days</strong> and send a confirmation to{' '}
                <strong className="text-paper">{form.email}</strong>.
              </motion.p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <Link
                  to="/"
                  className="text-sm text-amber hover:text-ember transition-colors underline underline-offset-4"
                >
                  Return to homepage
                </Link>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="form-wrapper"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.3 }}
            >
              <Reveal>
                <form onSubmit={submit} className="rounded-3xl card-glass p-7 md:p-10 space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Trash2 className="size-6 text-red-400" />
                    <h2 className="display-tight text-2xl">Deletion request form</h2>
                  </div>

                  <div>
                    <label htmlFor="del-email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-mist">
                      Email address used in TimeWallet
                    </label>
                    <input
                      id="del-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={set('email')}
                      placeholder="your@email.com"
                      className={inputCls}
                      disabled={status === 'loading'}
                    />
                  </div>

                  <div>
                    <label htmlFor="del-reason" className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-mist">
                      Reason for deletion <span className="text-mist/50">(optional)</span>
                    </label>
                    <select
                      id="del-reason"
                      value={form.reason}
                      onChange={set('reason')}
                      className={inputCls}
                      disabled={status === 'loading'}
                    >
                      <option value="">Select a reason…</option>
                      {reasons.map((r) => (
                        <option key={r} value={r}>{r}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="del-details" className="mb-2 block text-xs font-semibold uppercase tracking-[0.25em] text-mist">
                      Additional details <span className="text-mist/50">(optional)</span>
                    </label>
                    <textarea
                      id="del-details"
                      rows={4}
                      value={form.details}
                      onChange={set('details')}
                      placeholder="Any additional information that might help us process your request…"
                      className={`${inputCls} resize-none`}
                      disabled={status === 'loading'}
                    />
                  </div>

                  {/* Confirmation checkbox */}
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      required
                      checked={form.confirmed}
                      onChange={(e) => setForm((f) => ({ ...f, confirmed: e.target.checked }))}
                      className="mt-1 size-5 shrink-0 accent-red-400 rounded cursor-pointer"
                      disabled={status === 'loading'}
                    />
                    <span className="text-sm text-mist leading-relaxed group-hover:text-paper transition-colors">
                      I understand that this action is <strong className="text-red-400">irreversible</strong> and that all my TimeWallet data will be permanently deleted.
                    </span>
                  </label>

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
                    disabled={status === 'loading' || !form.confirmed}
                    className="group inline-flex items-center gap-2 rounded-full bg-red-500 px-8 py-4 text-sm font-semibold uppercase tracking-[0.14em] text-white transition-all duration-300 hover:bg-red-400 hover:-translate-y-0.5 shadow-[0_10px_40px_-10px_rgba(239,68,68,0.4)] disabled:opacity-40 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                  >
                    {status === 'loading' ? (
                      <>
                        <Loader2 className="size-4 animate-spin" />
                        Submitting…
                      </>
                    ) : (
                      <>
                        Submit deletion request
                        <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:rotate-45" />
                      </>
                    )}
                  </button>

                  <p className="text-xs text-mist/70">
                    You can also email us directly at{' '}
                    <a href="mailto:aqroindia@gmail.com" className="text-amber hover:text-ember transition-colors">
                      aqroindia@gmail.com
                    </a>{' '}
                    to request account deletion.
                  </p>
                </form>
              </Reveal>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </PageShell>
  )
}
