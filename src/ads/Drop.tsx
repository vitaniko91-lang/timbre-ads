import type { Mood } from './moods'

/**
 * The TIMBRE drop, rebuilt as vector.
 *
 * The brand site renders this with WebGL and live audio. A still cannot ship a
 * canvas, and a screenshot of one resamples badly at 1920 px — so the object is
 * redrawn in SVG: resolution independent, and exportable by html-to-image with no
 * rasterisation step.
 *
 * The thing that makes it read as glass rather than as a gradient ball is that it
 * refracts. Real glass bends whatever is behind it; a sphere filled with a radial
 * gradient bends nothing, which is exactly why that shape reads as clip-art. So
 * the interior carries a bent horizon, caustics pooling at the bottom where the
 * light collects, and a thin chromatic split at the rim — the three cues the eye
 * uses to decide something is a lens.
 *
 * `seed` shifts those internals so a rotation of six angles never shows the same
 * frozen object six times.
 */
export function Drop({
  mood,
  seed = 0,
  className,
}: {
  mood: Mood
  seed?: number
  className?: string
}) {
  const uid = `drop-${mood.id}-${seed}`
  const drift = ((seed % 3) - 1) * 3.5
  const bend = ((seed % 4) - 1.5) * 5

  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id={`${uid}-glow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={mood.rim} stopOpacity="0.34" />
          <stop offset="58%" stopColor={mood.mid} stopOpacity="0.13" />
          <stop offset="100%" stopColor={mood.mid} stopOpacity="0" />
        </radialGradient>

        {/* Body: light enters top-left, so the core sits there and the mass of
            colour collects on the far side. Symmetry would flatten it. */}
        <radialGradient id={`${uid}-body`} cx={`${36 + drift}%`} cy={`${30 + drift}%`} r="82%">
          <stop offset="0%" stopColor={mood.core} />
          <stop offset="22%" stopColor={mood.core} stopOpacity="0.86" />
          <stop offset="46%" stopColor={mood.mid} stopOpacity="0.82" />
          <stop offset="74%" stopColor={mood.rim} stopOpacity="0.9" />
          <stop offset="100%" stopColor={mood.rim} />
        </radialGradient>

        {/* Glass is darker where you look through the most material — the limb.
            Without this the sphere has no thickness. */}
        <radialGradient id={`${uid}-limb`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0E1130" stopOpacity="0" />
          <stop offset="72%" stopColor="#0E1130" stopOpacity="0" />
          <stop offset="93%" stopColor="#0E1130" stopOpacity="0.16" />
          <stop offset="100%" stopColor="#0E1130" stopOpacity="0.05" />
        </radialGradient>

        <linearGradient id={`${uid}-rim`} x1="14%" y1="4%" x2="86%" y2="98%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.98" />
          <stop offset="34%" stopColor={mood.mid} stopOpacity="0.42" />
          <stop offset="70%" stopColor={mood.rim} stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.5" />
        </linearGradient>

        <radialGradient id={`${uid}-shadow`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#241C4A" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#241C4A" stopOpacity="0" />
        </radialGradient>

        <filter id={`${uid}-soft`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.6" />
        </filter>
        <filter id={`${uid}-blur`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5.5" />
        </filter>
        <filter id={`${uid}-wide`} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="10" />
        </filter>

        <clipPath id={`${uid}-clip`}>
          <circle cx="100" cy="98" r="64" />
        </clipPath>
      </defs>

      <circle cx="100" cy="98" r="98" fill={`url(#${uid}-glow)`} />
      <ellipse cx="100" cy="170" rx="50" ry="11" fill={`url(#${uid}-shadow)`} filter={`url(#${uid}-wide)`} />

      <circle cx="100" cy="98" r="64" fill={`url(#${uid}-body)`} />

      <g clipPath={`url(#${uid}-clip)`}>
        {/* Refracted horizon. A lens inverts and compresses what is behind it, so
            the lines crowd towards the bottom of the sphere and bow the wrong way
            — that wrongness is the entire tell that you are looking through glass. */}
        <g opacity="0.5" filter={`url(#${uid}-soft)`}>
          <path d={`M 36 ${118 + bend} Q 100 ${96 + bend} 164 ${118 + bend}`} stroke={mood.core} strokeWidth="3.4" fill="none" opacity="0.75" />
          <path d={`M 36 ${130 + bend} Q 100 ${104 + bend} 164 ${130 + bend}`} stroke={mood.core} strokeWidth="2.4" fill="none" opacity="0.55" />
          <path d={`M 38 ${140 + bend} Q 100 ${112 + bend} 162 ${140 + bend}`} stroke={mood.mid} strokeWidth="2" fill="none" opacity="0.5" />
          <path d={`M 42 ${148 + bend} Q 100 ${122 + bend} 158 ${148 + bend}`} stroke={mood.mid} strokeWidth="1.4" fill="none" opacity="0.4" />
        </g>

        {/* Caustic: light that passed through the body and pooled at the base. */}
        <ellipse
          cx={100 + bend * 0.6}
          cy="150"
          rx="40"
          ry="13"
          fill={mood.core}
          opacity="0.55"
          filter={`url(#${uid}-blur)`}
        />
        <ellipse cx={96 - bend * 0.4} cy="156" rx="22" ry="6" fill="#FFFFFF" opacity="0.6" filter={`url(#${uid}-soft)`} />

        {/* Chromatic split where the limb bends light hardest. Two strokes, offset
            by a pixel and a half — enough to see, not enough to name. */}
        <circle cx="98.6" cy="97" r="62" fill="none" stroke={mood.mid} strokeWidth="2.4" opacity="0.5" filter={`url(#${uid}-soft)`} />
        <circle cx="101.4" cy="99" r="62" fill="none" stroke="#FF4DD2" strokeWidth="1.8" opacity="0.28" filter={`url(#${uid}-soft)`} />

        <circle cx="100" cy="98" r="64" fill={`url(#${uid}-limb)`} />
      </g>

      <circle cx="100" cy="98" r="63.2" fill="none" stroke={`url(#${uid}-rim)`} strokeWidth="1.5" />

      {/* One specular, small and off-centre. Two highlights read as plastic. */}
      <ellipse
        cx={74 + drift}
        cy={60 + drift}
        rx="15"
        ry="9"
        fill="#FFFFFF"
        opacity="0.82"
        filter={`url(#${uid}-soft)`}
        transform={`rotate(-26 ${74 + drift} ${60 + drift})`}
      />
      <circle cx={67 + drift} cy={53 + drift} r="3.6" fill="#FFFFFF" opacity="0.95" />
    </svg>
  )
}
