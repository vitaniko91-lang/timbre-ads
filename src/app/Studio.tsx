import { useEffect, useMemo, useRef, useState } from 'react'
import { ANGLES, DEFAULT_ANGLE } from '../ads/angles'
import { FORMATS, DEFAULT_FORMAT } from '../ads/formats'
import { LAYOUTS, DEFAULT_LAYOUT } from '../ads/layouts'
import { MOODS, DEFAULT_MOOD } from '../ads/moods'
import { Creative, type CreativeSpec } from '../ads/Creative'
import { creativeFileName, creativeToPng } from '../lib/export'

/** Preview stage height, in px. The creative is scaled to fit inside it. */
const STAGE = 460

export function Studio() {
  const [angle, setAngle] = useState(DEFAULT_ANGLE)
  const [format, setFormat] = useState(DEFAULT_FORMAT)
  const [layout, setLayout] = useState(DEFAULT_LAYOUT)
  const [mood, setMood] = useState(DEFAULT_MOOD)
  const [showSafe, setShowSafe] = useState(false)
  const [busy, setBusy] = useState(false)

  const nodeRef = useRef<HTMLDivElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [avail, setAvail] = useState(0)
  const spec: CreativeSpec = useMemo(() => ({ angle, format, layout, mood }), [angle, format, layout, mood])

  // The stage scales to whatever width it actually gets, not to a constant.
  // A fixed scale is what pushed a 1080-wide creative past a 390 px viewport and
  // gave the page 51 px of horizontal scroll — measured, not guessed.
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setAvail(entry.contentRect.width))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const scale = avail > 0 ? Math.min(avail / format.width, STAGE / format.height) : 0.28
  const combos = ANGLES.length * FORMATS.length * LAYOUTS.length * MOODS.length

  async function handleExport() {
    if (!nodeRef.current || busy) return
    setBusy(true)
    try {
      await creativeToPng(
        nodeRef.current,
        creativeFileName({ angle: angle.id, format: format.id, layout: layout.id, mood: mood.id }),
      )
    } finally {
      setBusy(false)
    }
  }

  return (
    <section id="studio" className="px-[6vw] py-[clamp(64px,9vh,120px)]">
      <div className="mx-auto max-w-[1280px]">
        <p className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.28em] text-muted">
          <span className="h-px w-8 bg-indigo/60" /> 01 · The system, running
        </p>
        <h2 className="mt-6 max-w-[18ch] font-display text-[clamp(30px,4.6vw,58px)] font-semibold leading-[1.02] tracking-[-0.02em]">
          Every combination is a{' '}
          <span className="bg-[linear-gradient(100deg,#5B6CFF,#7EE8FF_45%,#FF4DD2_85%)] bg-clip-text text-transparent">
            real file
          </span>
          .
        </h2>
        <p className="mt-5 max-w-[62ch] text-lg leading-relaxed text-muted">
          Change an axis and the creative recomposes in the browser — then exports as the exact PNG
          an ad account expects. <span className="tabular">{combos}</span> valid combinations, one
          set of rules, no folder of near-duplicates to maintain.
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Stage */}
          <div
            ref={stageRef}
            className="flex min-h-[420px] w-full items-center justify-center overflow-hidden rounded-glass border border-ink/8 bg-panel/60 p-4 sm:min-h-[520px] sm:p-6"
          >
            <div
              style={{
                width: format.width * scale,
                height: format.height * scale,
                position: 'relative',
              }}
            >
              <div
                style={{
                  transform: `scale(${scale})`,
                  transformOrigin: 'top left',
                  width: format.width,
                  height: format.height,
                  boxShadow: '0 30px 70px rgba(60,50,160,0.18)',
                }}
              >
                <Creative ref={nodeRef} spec={spec} />
                {showSafe && (
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      top: format.safe.top,
                      right: format.safe.right,
                      bottom: format.safe.bottom,
                      left: format.safe.left,
                      border: '3px dashed rgba(255,77,210,0.75)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="flex flex-col gap-7">
            <Axis
              title="Angle"
              hint={angle.stage}
              options={ANGLES.map((a) => ({ id: a.id, label: a.label }))}
              value={angle.id}
              onChange={(id) => setAngle(ANGLES.find((a) => a.id === id)!)}
            />
            <Axis
              title="Placement"
              hint={`${format.width}×${format.height} · ${format.surface}`}
              options={FORMATS.map((f) => ({ id: f.id, label: f.label }))}
              value={format.id}
              onChange={(id) => setFormat(FORMATS.find((f) => f.id === id)!)}
            />
            <Axis
              title="Layout"
              hint={layout.job}
              options={LAYOUTS.map((l) => ({ id: l.id, label: l.label }))}
              value={layout.id}
              onChange={(id) => setLayout(LAYOUTS.find((l) => l.id === id)!)}
            />
            <Axis
              title="Mood"
              hint="Which part of the brand spectrum the drop is throwing"
              options={MOODS.map((m) => ({ id: m.id, label: m.label }))}
              value={mood.id}
              onChange={(id) => setMood(MOODS.find((m) => m.id === id)!)}
            />

            <label className="flex items-center gap-3 text-sm text-muted">
              <input
                type="checkbox"
                checked={showSafe}
                onChange={(e) => setShowSafe(e.target.checked)}
                className="h-4 w-4 accent-magenta"
              />
              Show safe area ({format.safe.top}px top / {format.safe.bottom}px bottom)
            </label>

            <button
              type="button"
              onClick={handleExport}
              disabled={busy}
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-ink px-7 py-4 font-medium text-white shadow-[0_18px_50px_rgba(60,50,160,0.25)] transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:-translate-y-0.5 disabled:opacity-60 motion-reduce:transform-none"
            >
              {busy ? 'Rendering…' : `Export PNG · ${format.width}×${format.height}`}
            </button>
            <p className="-mt-3 text-xs leading-relaxed text-muted">
              Downloads {creativeFileName({ angle: angle.id, format: format.id, layout: layout.id, mood: mood.id })}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Axis({
  title,
  hint,
  options,
  value,
  onChange,
}: {
  title: string
  hint: string
  options: { id: string; label: string }[]
  value: string
  onChange: (id: string) => void
}) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="text-xs font-medium uppercase tracking-[0.22em] text-muted">{title}</legend>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((o) => {
          const active = o.id === value
          return (
            <button
              key={o.id}
              type="button"
              onClick={() => onChange(o.id)}
              aria-pressed={active}
              className={[
                'rounded-pill border px-4 py-2 text-sm transition-colors duration-200',
                active
                  ? 'border-ink bg-ink text-white'
                  : 'border-ink/15 bg-white/70 text-ink hover:border-ink/40',
              ].join(' ')}
            >
              {o.label}
            </button>
          )
        })}
      </div>
      <p className="mt-2 text-xs leading-relaxed text-muted">{hint}</p>
    </fieldset>
  )
}
