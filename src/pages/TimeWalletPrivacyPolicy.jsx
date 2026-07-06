import PageShell from '../components/PageShell.jsx'
import SectionTag from '../components/SectionTag.jsx'
import Reveal from '../components/Reveal.jsx'
import SplitWords from '../components/SplitWords.jsx'

const sections = [
  {
    title: 'Information we collect',
    paragraphs: [
      'TimeWallet collects the information you enter into the app, such as your name, email address, profile details, transaction notes, budget categories, and any other content you choose to save.',
      'We also collect limited device and usage data, including app version, operating system, crash logs, and basic analytics that help us understand how the app performs in real use.',
    ],
  },
  {
    title: 'How we use your data',
    paragraphs: [
      'We use your information to create and maintain your account, store your wallet data, sync your content across devices, and provide the core features of TimeWallet.',
      'We also use data to improve reliability, troubleshoot issues, protect against abuse, and communicate important service updates or account notices.',
    ],
  },
  {
    title: 'Sharing and disclosure',
    paragraphs: [
      'We do not sell your personal information. We only share information when it is necessary to operate the app, comply with the law, or protect our rights and users.',
      'Trusted service providers may process data on our behalf for hosting, analytics, authentication, backups, and crash reporting. They are expected to handle your data securely and only for the services we request.',
    ],
  },
  {
    title: 'Storage and retention',
    paragraphs: [
      'We keep your data only as long as needed to provide the app and support your account. When you delete your account, we will remove or anonymize personal data within a reasonable period, unless we must keep it for legal, tax, or security reasons.',
      'Backups and logs may persist for a short time after deletion, but they are not used for active product features and are cleared on a rolling schedule.',
    ],
  },
  {
    title: 'Your choices and rights',
    paragraphs: [
      'You can request access to, correction of, or deletion of your personal data. Depending on your location, you may also have the right to object to certain processing or request a copy of your data in a portable format.',
      'If you want to manage your account data or exercise any privacy rights, contact us and we will respond within a reasonable timeframe.',
    ],
  },
  {
    title: 'Security',
    paragraphs: [
      'We use reasonable administrative, technical, and organizational safeguards to protect your information. No system is perfectly secure, so we cannot guarantee absolute protection, but we work to reduce risk and limit access to sensitive data.',
    ],
  },
  {
    title: 'Children and changes',
    paragraphs: [
      'TimeWallet is not intended for children under 13, and we do not knowingly collect personal information from them.',
      'We may update this policy as the app evolves. If we make material changes, we will post the revised version here and update the effective date below.',
    ],
  },
]

export default function TimeWalletPrivacyPolicy() {
  return (
    <PageShell title="TimeWallet Privacy Policy">
      <section className="mx-auto max-w-4xl px-5 md:px-10 pt-40 pb-24">
        <Reveal>
          <SectionTag>TimeWallet</SectionTag>
          <h1 className="display-tight mt-4 text-6xl md:text-8xl">
            <SplitWords>Your wallet data stays yours.</SplitWords>
          </h1>
          <div className="mt-6 space-y-4 text-mist leading-relaxed max-w-3xl">
            <p>
              This privacy policy explains what TimeWallet collects, how the data is used, and the choices you have over your information.
            </p>
            <p>
              Effective date: July 6, 2026. If you have questions about this policy, contact support@timewallet.app.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-6">
          {sections.map((section, index) => (
            <Reveal key={section.title} delay={index * 0.08}>
              <div className="rounded-3xl border border-line bg-ink/40 p-7 md:p-8">
                <h2 className="display-tight text-2xl text-amber">{section.title}</h2>
                <div className="mt-4 space-y-4 text-sm leading-relaxed text-mist">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  )
}