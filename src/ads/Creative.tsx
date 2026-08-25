import { forwardRef, type CSSProperties } from 'react'
import type { AdAngle } from './angles'
import type { AdFormat } from './formats'
import type { AdLayout } from './layouts'
import type { Mood } from './moods'
import { Drop } from './Drop'

export interface CreativeSpec {
  angle: AdAngle
  format: AdFormat
  layout: AdLayout
  mood: Mood
}

/** Fine film grain, same recipe as the brand site's hero surface. */
const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")"

/**
 * One creative, always rendered at its true pixel size (1080×1350 and so on) and
 * scaled down for preview by a transform on the parent. Rendering small and
 * upscaling on export is what produces soft type; this way the exported PNG is
 * the same DOM the browser already laid out at full size.
 *
 * Every dimension is a multiple of `u` — one hundredth of the frame's short side.
 * That is what lets a single layout hold together across a 628 px banner and a
 * 1920 px story without a per-format stylesheet.
 */
export const Creative = forwardRef<HTMLDivElement, { spec: CreativeSpec }>(
  function Creative({ spec }, ref) {
    const { angle, format, layout, mood } = spec
    const u = Math.min(format.width, format.height) / 100
    const seed = ANGLE_SEED[angle.id] ?? 0

    return (
      <div
        ref={ref}
        data-creative
        data-name={`${angle.id}_${format.id}_${layout.id}_${mood.id}`}
        style={{
          width: format.width,
          height: format.height,
          background: 'var(--color-bg)',
          position: 'relative',
          overflow: 'hidden',
          color: 'var(--color-ink)',
          fontFamily: 'var(--font-sans)',
        }}
      >
        {/* Ambient wash — placed per layout so the light source moves with the object */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: washFor(layout.id, mood),
            pointerEvents: 'none',
          }}
        />

        {layout.id === 'bleed' && <Bleed spec={spec} u={u} seed={seed} />}
        {layout.id === 'split' && <Split spec={spec} u={u} seed={seed} />}
        {layout.id === 'type' && <TypeFirst spec={spec} u={u} seed={seed} />}
        {layout.id === 'stat' && <Stat spec={spec} u={u} seed={seed} />}

        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: GRAIN,
            opacity: 0.05,
            mixBlendMode: 'overlay',
            pointerEvents: 'none',
          }}
        />
      </div>
    )
  },
)

/** Stable per-angle variation so a set of six never repeats the same drop. */
const ANGLE_SEED: Record<string, number> = {
  brand: 0,
  latency: 1,
  spatial: 2,
  scarcity: 3,
  offer: 4,
  risk: 5,
}

function washFor(layoutId: string, mood: Mood) {
  const point =
    layoutId === 'bleed'
      ? '50% 34%'
      : layoutId === 'split'
        ? '78% 42%'
        : layoutId === 'type'
          ? '88% 88%'
          : '50% 46%'
  return `radial-gradient(closest-side at ${point}, ${mood.wash}, transparent 72%)`
}

/* ------------------------------------------------------------------ *
 * Shared parts
 * ------------------------------------------------------------------ */

function Eyebrow({ children, u, mood }: { children: string; u: number; mood: Mood }) {
  return (
    <p
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: u * 1.2,
        fontSize: u * 1.85,
        fontWeight: 500,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: 'var(--color-muted)',
        margin: 0,
      }}
    >
      <span
        style={{
          display: 'block',
          width: u * 3.6,
          height: Math.max(1, u * 0.14),
          background: mood.accent,
          opacity: 0.7,
        }}
      />
      {children}
    </p>
  )
}

function Headline({
  text,
  u,
  size,
  max = 16,
}: {
  text: string
  u: number
  size: number
  /** Measure in characters — the ragged-line control, not a width in pixels. */
  max?: number
}) {
  return (
    <h2
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 600,
        fontSize: u * size,
        lineHeight: 0.94,
        letterSpacing: '-0.03em',
        margin: 0,
        maxWidth: `${max}ch`,
        textWrap: 'balance',
      }}
    >
      {text}
    </h2>
  )
}

function Sub({ text, u, max = 34 }: { text: string; u: number; max?: number }) {
  return (
    <p
      style={{
        fontSize: u * 2.6,
        lineHeight: 1.45,
        color: 'var(--color-muted)',
        margin: 0,
        maxWidth: `${max}ch`,
        textWrap: 'pretty',
      }}
    >
      {text}
    </p>
  )
}

function Cta({ label, u }: { label: string; u: number }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: u * 0.9,
        background: 'var(--color-ink)',
        color: '#FFFFFF',
        borderRadius: 999,
        padding: `${u * 1.55}px ${u * 3.4}px`,
        fontSize: u * 2.35,
        fontWeight: 500,
        // A pill on a pale ground needs its own weight or it floats off the page.
        boxShadow: `0 ${u * 1.6}px ${u * 4.4}px rgba(60,50,160,0.22)`,
      }}
    >
      {label}
      <svg width={u * 2} height={u * 2} viewBox="0 0 24 24" fill="none" aria-hidden>
        <path d="M5 12h13M12 5l7 7-7 7" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

function Wordmark({ u, align = 'left' }: { u: number; align?: 'left' | 'right' }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 700,
        fontSize: u * 2.1,
        letterSpacing: '0.2em',
        color: 'var(--color-ink)',
        textAlign: align,
      }}
    >
      TIMBRE
    </span>
  )
}

/** Everything that must be read lives inside the placement's safe region. */
function safeStyle(format: AdFormat): CSSProperties {
  return {
    position: 'absolute',
    top: format.safe.top,
    right: format.safe.right,
    bottom: format.safe.bottom,
    left: format.safe.left,
    display: 'flex',
  }
}

/* ------------------------------------------------------------------ *
 * Layouts
 * ------------------------------------------------------------------ */

function Bleed({ spec, u, seed }: { spec: CreativeSpec; u: number; seed: number }) {
  const { angle, format, mood } = spec
  const wide = format.width > format.height
  return (
    <>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          top: wide ? '40%' : '34%',
          transform: 'translate(-50%, -50%)',
          width: wide ? format.height * 1.18 : format.width * 1.0,
          height: wide ? format.height * 1.18 : format.width * 1.0,
        }}
      >
        <Drop mood={mood} seed={seed} className="h-full w-full" />
      </div>

      <div style={{ ...safeStyle(format), flexDirection: 'column', justifyContent: 'flex-end', gap: u * 2.8 }}>
        <Eyebrow u={u} mood={mood}>{angle.eyebrow}</Eyebrow>
        {/* The hook carries this layout alone — no sub-line competing with it.
            At feed thumbnail size anything under ~9u stops being a hook and
            becomes a caption nobody reads. */}
        <Headline text={angle.headline} u={u} size={wide ? 8 : 10.2} max={wide ? 18 : 11} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: u * 3 }}>
          <Cta label={angle.cta} u={u} />
          <Wordmark u={u} align="right" />
        </div>
      </div>
    </>
  )
}

function Split({ spec, u, seed }: { spec: CreativeSpec; u: number; seed: number }) {
  const { angle, format, mood } = spec
  const wide = format.width > format.height
  return (
    <>
      {/* Cropped by the edge on purpose: a circle fully inside the frame reads as
          a sticker, one that runs off it reads as an object that continues. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: wide ? -format.height * 0.2 : -format.width * 0.24,
          // Sized and placed so its lower limb lands just above the eyebrow. A gap
          // between object and copy splits the frame into two unrelated halves —
          // the most common way a competent ad still reads as unfinished.
          top: wide ? '50%' : '31%',
          transform: 'translateY(-50%)',
          width: wide ? format.height * 0.98 : format.width * 0.95,
          height: wide ? format.height * 0.98 : format.width * 0.95,
        }}
      >
        <Drop mood={mood} seed={seed} className="h-full w-full" />
      </div>

      <div
        style={{
          ...safeStyle(format),
          flexDirection: 'column',
          justifyContent: wide ? 'center' : 'flex-end',
          gap: u * 2.2,
          width: wide ? '54%' : undefined,
          right: wide ? undefined : format.safe.right,
        }}
      >
        <Eyebrow u={u} mood={mood}>{angle.eyebrow}</Eyebrow>
        <Headline text={angle.headline} u={u} size={wide ? 7.6 : 8.6} max={wide ? 15 : 12} />
        <Sub text={angle.sub} u={u} max={wide ? 38 : 30} />
        <div style={{ display: 'flex', alignItems: 'center', gap: u * 2.4, marginTop: u * 1 }}>
          <Cta label={angle.cta} u={u} />
          <Wordmark u={u} />
        </div>
      </div>
    </>
  )
}

function TypeFirst({ spec, u, seed }: { spec: CreativeSpec; u: number; seed: number }) {
  const { angle, format, mood } = spec
  const wide = format.width > format.height
  return (
    <>
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: -format.width * 0.08,
          bottom: -format.width * 0.1,
          width: format.width * (wide ? 0.32 : 0.46),
          height: format.width * (wide ? 0.32 : 0.46),
        }}
      >
        <Drop mood={mood} seed={seed} className="h-full w-full" />
      </div>

      <div style={{ ...safeStyle(format), flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: u * 3 }}>
          <Eyebrow u={u} mood={mood}>{angle.eyebrow}</Eyebrow>
          <Headline text={angle.headline} u={u} size={wide ? 8.4 : 10.4} max={wide ? 15 : 10} />
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: u * 3 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: u * 2.2, maxWidth: '58%' }}>
            <Sub text={angle.sub} u={u} max={28} />
            <Cta label={angle.cta} u={u} />
          </div>
          <Wordmark u={u} align="right" />
        </div>
      </div>
    </>
  )
}

function Stat({ spec, u, seed }: { spec: CreativeSpec; u: number; seed: number }) {
  const { angle, format, mood } = spec
  const wide = format.width > format.height
  return (
    <>
      {/* Sits behind and slightly above the figure: the number needs the pale part
          of the frame under it, not the bright core of the object. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          top: wide ? '46%' : '38%',
          transform: 'translate(-50%, -50%)',
          width: wide ? format.height * 0.86 : format.width * 0.68,
          height: wide ? format.height * 0.86 : format.width * 0.68,
          opacity: 0.92,
        }}
      >
        <Drop mood={mood} seed={seed} className="h-full w-full" />
      </div>

      <div style={{ ...safeStyle(format), flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center', textAlign: 'center' }}>
        <Eyebrow u={u} mood={mood}>{angle.eyebrow}</Eyebrow>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: u * 1.4 }}>
          <span
            className="tabular"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 600,
              fontSize: u * (wide ? 24 : 30),
              lineHeight: 0.84,
              letterSpacing: '-0.05em',
              // The figure is the argument; it gets a hard edge against the glass.
              textShadow: '0 2px 26px rgba(244,246,255,0.85)',
            }}
          >
            {angle.figure}
          </span>
          <span
            style={{
              fontSize: u * 2.2,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--color-muted)',
            }}
          >
            {angle.figureLabel}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: u * 2.2 }}>
          <Sub text={angle.sub} u={u} max={wide ? 44 : 28} />
          <Cta label={angle.cta} u={u} />
          <Wordmark u={u} />
        </div>
      </div>
    </>
  )
}
