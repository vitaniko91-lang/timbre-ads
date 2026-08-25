const SPLIT = [
  {
    kind: 'Model' as const,
    title: 'What the model is good for',
    items: [
      'Twenty headline variants per angle in a minute, so the weak ones die on a page instead of in a review.',
      'Fast direction probes — what a mood looks like before committing a day to it.',
      'Stripping a spec sheet down to the one number a frame can carry.',
      'Reading the finished set back and naming which two frames are competing for the same job.',
    ],
  },
  {
    kind: 'Human' as const,
    title: 'What stays a decision',
    items: [
      'Which claim earns the headline slot — that comes from the product, not from a generator.',
      'The palette, the type ramp, the crop. Inherited from the brand and held.',
      'Where the safe area is and what may never cross it.',
      'Whether a frame is honest. A model will happily invent a five-star review.',
    ],
  },
]

export function Method() {
  return (
    <section id="method" className="px-[6vw] py-[clamp(64px,9vh,120px)]">
      <div className="mx-auto max-w-[1280px]">
        <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-muted">
          <span className="h-px w-8 bg-indigo/60" /> 04 · Where AI sits
        </p>
        <h2 className="mt-6 max-w-[24ch] font-display text-[clamp(30px,4.6vw,58px)] font-semibold leading-[1.02] tracking-[-0.02em]">
          AI multiplies the drafts. It does not get to hold the{' '}
          <span className="bg-[linear-gradient(100deg,#5B6CFF,#7EE8FF_45%,#FF4DD2_85%)] bg-clip-text text-transparent">
            brand
          </span>
          .
        </h2>
        <p className="mt-5 max-w-[64ch] text-lg leading-relaxed text-muted">
          I build with models daily and the split is always the same: generation is cheap, judgement
          is not. The output only stays usable because it is measured against rules written before
          the first prompt — hierarchy, one accent, a type ramp with no near-duplicate sizes, and a
          hard line at inventing proof.
        </p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {SPLIT.map((col) => (
            <div
              key={col.kind}
              className={[
                'rounded-glass border p-8',
                col.kind === 'Model' ? 'border-indigo/25 bg-indigo/[0.05]' : 'border-ink/12 bg-white/60',
              ].join(' ')}
            >
              <h3 className="font-display text-xl font-semibold tracking-[-0.01em]">{col.title}</h3>
              <ul className="mt-5 flex list-none flex-col gap-4 p-0">
                {col.items.map((it) => (
                  <li key={it} className="flex gap-3 text-[15px] leading-relaxed text-muted">
                    <span
                      aria-hidden
                      className={[
                        'mt-[9px] h-1.5 w-1.5 shrink-0 rounded-full',
                        col.kind === 'Model' ? 'bg-indigo' : 'bg-ink/40',
                      ].join(' ')}
                    />
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
