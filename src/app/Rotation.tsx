import { useRef, useState } from 'react'
import { ANGLES } from '../ads/angles'
import { FORMATS } from '../ads/formats'
import { LAYOUTS } from '../ads/layouts'
import { MOODS } from '../ads/moods'
import { Creative, type CreativeSpec } from '../ads/Creative'
import { creativeToDataUrl } from '../lib/export'
import { dataUrlToBytes, makeZip } from '../lib/zip'

/**
 * A launch rotation: what actually goes live on day one.
 *
 * Not a gallery of everything the system can make — a media buyer needs a set
 * that covers the funnel without two frames competing for the same job. Six
 * angles, each in the placement and layout that suits it, moods alternating so
 * the feed never shows the same colour twice in a row.
 */
const ROTATION: { angle: string; format: string; layout: string; mood: string; note: string }[] = [
  { angle: 'brand', format: 'feed-4x5', layout: 'bleed', mood: 'aurora', note: 'Prospecting · the object does the work' },
  { angle: 'brand', format: 'story-9x16', layout: 'bleed', mood: 'flare', note: 'Stories · same hook, native height' },
  { angle: 'latency', format: 'feed-1x1', layout: 'stat', mood: 'aurora', note: 'Proof · one number, no adjectives' },
  { angle: 'spatial', format: 'feed-4x5', layout: 'split', mood: 'prism', note: 'Proof · rotation partner for 0 ms' },
  { angle: 'scarcity', format: 'feed-4x5', layout: 'type', mood: 'flare', note: 'Urgency · a real constraint, stated' },
  { angle: 'offer', format: 'feed-1x1', layout: 'stat', mood: 'aurora', note: 'Warm traffic · price qualifies' },
  { angle: 'offer', format: 'display-191x1', layout: 'split', mood: 'aurora', note: 'LinkedIn · the wide crop, redrawn' },
  { angle: 'risk', format: 'feed-4x5', layout: 'split', mood: 'prism', note: 'Retargeting · answers the hesitation' },
]

function resolve(row: (typeof ROTATION)[number]): CreativeSpec {
  return {
    angle: ANGLES.find((a) => a.id === row.angle)!,
    format: FORMATS.find((f) => f.id === row.format)!,
    layout: LAYOUTS.find((l) => l.id === row.layout)!,
    mood: MOODS.find((m) => m.id === row.mood)!,
  }
}

export function Rotation() {
  const gridRef = useRef<HTMLDivElement>(null)
  const [done, setDone] = useState(0)
  const [busy, setBusy] = useState(false)

  /**
   * Export the whole rotation in one pass.
   *
   * The thumbnails already hold the creatives at their true pixel size — the grid
   * only scales them with a transform, which does not touch `offsetWidth`. So the
   * same nodes a buyer just approved are the nodes that get rasterised; there is
   * no second offscreen render that could drift from what is on screen.
   */
  async function exportAll() {
    const grid = gridRef.current
    if (!grid || busy) return
    setBusy(true)
    setDone(0)
    try {
      const nodes = [...grid.querySelectorAll<HTMLElement>('[data-creative]')]
      const entries = []
      for (const node of nodes) {
        const dataUrl = await creativeToDataUrl(node)
        entries.push({ name: `timbre_${node.dataset.name}.png`, data: dataUrlToBytes(dataUrl) })
        setDone((n) => n + 1)
      }
      const url = URL.createObjectURL(makeZip(entries))
      const link = document.createElement('a')
      link.download = 'timbre_launch_rotation.zip'
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    } finally {
      setBusy(false)
    }
  }

  return (
    <section id="rotation" className="px-[6vw] py-[clamp(64px,9vh,120px)]">
      <div className="mx-auto max-w-[1280px]">
        <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-muted">
          <span className="h-px w-8 bg-indigo/60" /> 02 · Launch rotation
        </p>
        <h2 className="mt-6 max-w-[20ch] font-display text-[clamp(30px,4.6vw,58px)] font-semibold leading-[1.02] tracking-[-0.02em]">
          Eight frames that cover the whole funnel.
        </h2>
        <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted">
          The system can build hundreds. A launch does not need hundreds — it needs one frame per job,
          with no two competing for the same moment.
        </p>

        <button
          type="button"
          onClick={exportAll}
          disabled={busy}
          className="mt-9 inline-flex items-center gap-2 rounded-pill border border-ink/20 px-7 py-3.5 font-medium text-ink transition-colors duration-200 hover:border-ink/50 disabled:opacity-60"
        >
          {busy ? (
            <>
              Rendering <span className="tabular">{done}</span>/8…
            </>
          ) : (
            'Export all 8 as ZIP'
          )}
        </button>

        <div ref={gridRef} className="mt-12 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {ROTATION.map((row, i) => {
            const spec = resolve(row)
            // Thumbnails render the same component the export does, scaled down —
            // so what a buyer approves here is literally the file they receive.
            const w = 260
            const scale = w / spec.format.width
            return (
              <figure key={`${row.angle}-${row.format}-${i}`} className="m-0">
                <div
                  className="overflow-hidden rounded-[14px] border border-ink/8"
                  style={{ width: w, height: spec.format.height * scale }}
                >
                  <div
                    style={{
                      transform: `scale(${scale})`,
                      transformOrigin: 'top left',
                      width: spec.format.width,
                      height: spec.format.height,
                    }}
                  >
                    <Creative spec={spec} />
                  </div>
                </div>
                <figcaption className="mt-3 text-xs leading-relaxed text-muted">
                  <span className="font-medium text-ink">{spec.format.label}</span> · {spec.layout.label}
                  <br />
                  {row.note}
                </figcaption>
              </figure>
            )
          })}
        </div>
      </div>
    </section>
  )
}
