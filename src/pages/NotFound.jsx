import PageShell from '../components/PageShell.jsx'
import Sparkle from '../components/Sparkle.jsx'
import StarButton from '../components/StarButton.jsx'
import Magnetic from '../components/Magnetic.jsx'

export default function NotFound() {
  return (
    <PageShell
      title="Page Not Found"
      description="The page you were looking for does not exist. Head back to the AQRO STUDIO homepage."
    >
      <section className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-5 text-center">
        <Sparkle className="absolute top-[18%] right-[12%] size-40 text-raise/60 animate-float" />
        <Sparkle className="absolute bottom-[16%] left-[10%] size-16 text-amber/30" />
        <p className="display-tight text-[8rem] md:text-[14rem] text-stroke-faint leading-none">404</p>
        <h1 className="display-tight mt-2 text-4xl md:text-6xl">
          Lost in <span className="text-amber">space.</span>
        </h1>
        <p className="mt-5 max-w-md text-mist leading-relaxed">
          This page doesn't exist — or it drifted out of orbit. Let's get you back to something real.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Magnetic>
            <StarButton to="/">Back to home</StarButton>
          </Magnetic>
          <StarButton to="/projects" variant="ghost">
            See our work
          </StarButton>
        </div>
      </section>
    </PageShell>
  )
}
