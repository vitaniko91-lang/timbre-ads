export function Footer() {
  return (
    <footer className="border-t border-ink/10 px-[6vw] py-14">
      <div className="mx-auto flex max-w-[1280px] flex-wrap items-end justify-between gap-8">
        <div>
          <p className="font-display text-2xl font-semibold tracking-[-0.01em]">Vitalina Nikulina</p>
          <p className="mt-2 max-w-[46ch] text-[15px] leading-relaxed text-muted">
            Designer & front-end engineer. I design the system and write the code that ships it —
            brand site, campaign layer and the tool that produces it.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
          <a className="text-ink underline-offset-4 hover:underline" href="https://vitaniko91-lang.github.io">
            Portfolio
          </a>
          <a className="text-ink underline-offset-4 hover:underline" href="https://timbre-ruby.vercel.app">
            TIMBRE site
          </a>
          <a
            className="text-ink underline-offset-4 hover:underline"
            href="https://github.com/vitaniko91-lang"
          >
            GitHub
          </a>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-[1280px] text-xs leading-relaxed text-muted">
        TIMBRE is a fictional brand created for this portfolio. Every specification, price and claim
        in the campaign comes from that project’s own product pages — nothing here is a real
        endorsement, review or customer.
      </p>
    </footer>
  )
}
