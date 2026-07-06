import PageShell from '../components/PageShell.jsx'
import SectionTag from '../components/SectionTag.jsx'
import Reveal from '../components/Reveal.jsx'
import SplitWords from '../components/SplitWords.jsx'

const sections = [
  {
    title: 'Using the site',
    text: 'You may browse this site and contact us about projects. Do not misuse the site, scrape content, or attempt to access systems you are not authorised to use.',
  },
  {
    title: 'Project work',
    text: 'Any project scope, delivery timeline, price, and ownership details are handled in a separate agreement or proposal for that specific engagement.',
  },
  {
    title: 'External links',
    text: 'Portfolio links may point to third-party websites. We are not responsible for their content, policies, or availability.',
  },
  {
    title: 'Contact',
    text: 'Questions about these terms can be sent to aqroindia@gmail.com.',
  },
]

export default function Terms() {
  return (
    <PageShell title="Terms & Conditions">
      <section className="mx-auto max-w-4xl px-5 md:px-10 pt-40 pb-24">
        <Reveal>
          <SectionTag>Terms & Conditions</SectionTag>
          <h1 className="display-tight mt-4 text-6xl md:text-8xl">
            <SplitWords>Simple rules. Clear work.</SplitWords>
          </h1>
          <p className="mt-6 text-mist leading-relaxed">
            These terms describe how you can use the AQRO Studio website and how project work is handled.
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