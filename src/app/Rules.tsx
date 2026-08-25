const RULES = [
  {
    n: '01',
    title: 'Nothing readable outside the safe area',
    body: 'Stories hand 250 px at the top to the profile row and 340 px at the bottom to the swipe affordance. Headline, price and CTA are laid out inside that box in every placement, so nothing important is ever covered at runtime.',
  },
  {
    n: '02',
    title: 'One accent per frame',
    body: 'The brand owns a whole spectrum, which is exactly why a single frame gets one part of it. The mood picks the refraction; the type stays ink. Colour never chases the artwork.',
  },
  {
    n: '03',
    title: 'Type scales with the short side, not the width',
    body: 'Every size is a multiple of one hundredth of the frame’s short side. That is what keeps a 628 px banner and a 1920 px story looking like the same campaign instead of two crops of it.',
  },
  {
    n: '04',
    title: 'The object is always cropped or bled',
    body: 'A circle fully contained in the frame reads as a sticker. Bleeding it off an edge reads as something that continues past the ad — which is the difference between a stock composition and a brand one.',
  },
  {
    n: '05',
    title: 'Claims come from the product, not the copywriter',
    body: '$349, 500 units, 0 ms, 48 h, 30 days — every number in the campaign exists on the product page. No invented reviews, no star ratings, no borrowed logos. A creative system that can manufacture proof will eventually be asked to.',
  },
  {
    n: '06',
    title: 'The preview is the file',
    body: 'Thumbnails, stage and export all render the same component at true size and scale it down. What gets approved is byte-for-byte what gets uploaded — no separate “production” pass to drift out of sync.',
  },
]

export function Rules() {
  return (
    <section id="rules" className="bg-panel/50 px-[6vw] py-[clamp(64px,9vh,120px)]">
      <div className="mx-auto max-w-[1280px]">
        <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-muted">
          <span className="h-px w-8 bg-indigo/60" /> 03 · What the system enforces
        </p>
        <h2 className="mt-6 max-w-[22ch] font-display text-[clamp(30px,4.6vw,58px)] font-semibold leading-[1.02] tracking-[-0.02em]">
          A system is its rules, not its output.
        </h2>
        <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted">
          Anyone can make forty variations. The reason these forty stay on brand is that six
          constraints are built into the composition rather than left to whoever opens the file.
        </p>

        <ol className="mt-12 grid list-none gap-x-8 gap-y-9 p-0 md:grid-cols-2 lg:grid-cols-3">
          {RULES.map((r) => (
            <li key={r.n} className="border-t border-ink/12 pt-5">
              <span className="font-display text-sm font-semibold tracking-[0.2em] text-indigo">{r.n}</span>
              <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-[-0.01em]">{r.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-muted">{r.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
