import PageShell from '../components/PageShell.jsx'
import SectionTag from '../components/SectionTag.jsx'
import Reveal from '../components/Reveal.jsx'
import SplitWords from '../components/SplitWords.jsx'

const sections = [
  {
    title: 'Information we collect',
    text: 'We may collect the details you submit through the contact form, email, phone, and basic analytics data such as page visits and device information.',
  },
  {
    title: 'How we use it',
    text: 'We use that information to respond to enquiries, plan projects, improve the site, and keep communications relevant to your request.',
  },
  {
    title: 'Sharing',
    text: 'We do not sell your personal information. We only share data with service providers when needed to run the website or deliver a project.',
  },
  {
    title: 'Your choices',
    text: 'You can ask us to review, update, or delete the information you shared with us by contacting aqroindia@gmail.com.',
  },
]

export default function PrivacyPolicy() {
  return (
    <PageShell title="Privacy Policy">
      <section className="mx-auto max-w-4xl px-5 md:px-10 pt-40 pb-24">
        <Reveal>
          <SectionTag>Privacy Policy</SectionTag>
          <h1 className="display-tight mt-4 text-6xl md:text-8xl">
            <SplitWords>Your privacy matters.</SplitWords>
          </h1>
          <p className="mt-6 text-mist leading-relaxed">
            This page explains what we collect, why we collect it, and how you can reach us if you want changes made to your data.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6">
          {sections.map((section, index) => (
            <Reveal key={section.title} delay={index * 0.08}>
              <div className="rounded-3xl border border-line p-7">
                <h2 className="display-tight text-2xl text-amber">{section.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-mist">{section.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </PageShell>
  )
}