import { Drop } from '../ads/Drop'
import { MOODS } from '../ads/moods'

export function Hero() {
  return (
    <header className="relative overflow-hidden px-[6vw] pb-[clamp(48px,7vh,90px)] pt-[clamp(56px,9vh,120px)]">
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-[-14%] h-[70vh] w-[70vh] opacity-90"
      >
        <Drop mood={MOODS[0]} seed={2} className="h-full w-full" />
      </div>
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-[5vw] left-[-2vw] select-none font-display text-[22vw] font-semibold leading-none tracking-[-0.05em] text-ink/[0.045]"
      >
        PAID
      </span>

      <div className="relative z-10 mx-auto max-w-[1280px]">
        <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-muted">
          <span className="h-px w-8 bg-indigo/60" /> TIMBRE · paid social · self-initiated
        </p>
        <h1 className="mt-8 max-w-[15ch] font-display text-[clamp(40px,7vw,104px)] font-semibold leading-[0.92] tracking-[-0.04em]">
          Ad creative, built as a{' '}
          <span className="bg-[linear-gradient(100deg,#5B6CFF,#7EE8FF_40%,#FF4DD2_80%)] bg-clip-text text-transparent">
            system
          </span>
          .
        </h1>
        <p className="mt-7 max-w-[54ch] text-lg leading-relaxed text-muted">
          I designed and built the TIMBRE brand site. This is its paid-social layer: six angles, four
          placements, four layouts and three spectral moods — composed live in the browser and exported
          as the exact PNGs a media buyer uploads.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <a
            href="#studio"
            className="inline-flex items-center gap-2 rounded-pill bg-ink px-8 py-4 font-medium text-white shadow-[0_18px_50px_rgba(60,50,160,0.25)] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 motion-reduce:transform-none"
          >
            Build a creative
          </a>
          <a
            href="https://timbre-ruby.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-pill border border-ink/20 px-8 py-4 font-medium text-ink transition-colors duration-200 hover:border-ink/50"
          >
            The brand site
          </a>
        </div>
      </div>
    </header>
  )
}
