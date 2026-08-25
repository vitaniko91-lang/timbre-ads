/**
 * The six angles the campaign runs.
 *
 * Every claim here is lifted from the TIMBRE product itself
 * (cases/timbre — Specs, PreorderCTA): 40 mm planar driver, 24-bit lossless DAC,
 * 360° spatial, 48 h battery, 0 ms wired latency, titanium frame, $349 pre-order,
 * a first run of 500 units shipping this winter, free shipping and 30-day returns.
 *
 * Nothing is invented for the ad — no review quotes, no star ratings, no "as seen
 * in" logos, no fabricated user counts. A creative system that manufactures proof
 * is the fastest way to get an account shut down, and house rules forbid it
 * outright (design.md → Generated Imagery / Never generate).
 */
export type FunnelStage = 'awareness' | 'consideration' | 'conversion'

export interface AdAngle {
  id: string
  /** Short name in the UI. */
  label: string
  stage: FunnelStage
  /** Small caps line above the headline. */
  eyebrow: string
  /** The hook. Kept short enough to survive a 4:5 crop at thumb size. */
  headline: string
  /** The hero number/word for stat-led layouts. */
  figure: string
  /** What the figure is. */
  figureLabel: string
  /** One supporting line. Never more than ~90 characters. */
  sub: string
  cta: string
  /** Why this angle exists — shown in the case study, not in the creative. */
  rationale: string
}

export const ANGLES: AdAngle[] = [
  {
    id: 'brand',
    label: 'See the sound',
    stage: 'awareness',
    eyebrow: 'TIMBRE · premium audio',
    headline: 'See the sound.',
    figure: 'See',
    figureLabel: 'the sound',
    sub: 'A drop of liquid glass that ripples and re-colors to whatever you play.',
    cta: 'Hear it',
    rationale:
      'Cold audience. Leads with the thing nobody else has — the object — and asks for attention, not a card.',
  },
  {
    id: 'latency',
    label: '0 ms latency',
    stage: 'consideration',
    eyebrow: 'Wired mode',
    headline: 'Zero milliseconds between you and it.',
    figure: '0 ms',
    figureLabel: 'wired latency',
    sub: 'Planar drivers, 24-bit lossless path, no wireless guesswork in the way.',
    cta: 'See the specs',
    rationale:
      'For the audience that already owns headphones. One measurable number beats three adjectives.',
  },
  {
    id: 'spatial',
    label: '360° spatial',
    stage: 'consideration',
    eyebrow: 'Spatial audio',
    headline: 'The room is the instrument.',
    figure: '360°',
    figureLabel: 'spatial audio',
    sub: 'Sound placed around you, not pushed at you. 48 hours on one charge.',
    cta: 'See the specs',
    rationale:
      'Second proof angle so the mid-funnel has something to rotate to before fatigue sets in.',
  },
  {
    id: 'scarcity',
    label: '500 units',
    stage: 'conversion',
    eyebrow: 'First run',
    headline: 'Five hundred. Then the winter run is gone.',
    figure: '500',
    figureLabel: 'units, first run',
    sub: 'The first TIMBRE run is limited to 500 units and ships this winter.',
    cta: 'Pre-order',
    rationale:
      'Real constraint, stated plainly — it is in the product page, so the ad is not inventing pressure.',
  },
  {
    id: 'offer',
    label: '$349 pre-order',
    stage: 'conversion',
    eyebrow: 'Pre-order',
    headline: 'Hear it. See it. $349.',
    figure: '$349',
    figureLabel: 'pre-order, shipping winter',
    sub: 'Free shipping. Titanium frame, 40 mm planar drivers, 48 h battery.',
    cta: 'Pre-order',
    rationale:
      'Price-forward. Runs to warm traffic only — the number does the qualifying.',
  },
  {
    id: 'risk',
    label: '30-day returns',
    stage: 'conversion',
    eyebrow: 'No risk',
    headline: 'Thirty days to decide with your own ears.',
    figure: '30',
    figureLabel: 'days to return it',
    sub: 'Free shipping both ways. If it does not move you, send it back.',
    cta: 'Pre-order',
    rationale:
      'Objection handler for retargeting — the people who clicked, hesitated, and left.',
  },
]

export const DEFAULT_ANGLE = ANGLES[0]
