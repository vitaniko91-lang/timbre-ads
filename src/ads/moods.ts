/**
 * Spectral moods.
 *
 * TIMBRE's brand is one drop refracting a whole spectrum, so a mood is not a new
 * palette — it is which part of the existing spectrum the drop is throwing in this
 * frame. Every stop below already exists in the brand tokens
 * (indigo / cyan / magenta / gold / mint); nothing new is introduced.
 *
 * `ink` stays constant across all three: the type never changes color to chase the
 * artwork, which is what keeps a rotating creative set looking like one brand.
 */
export interface Mood {
  id: string
  label: string
  /** Core of the drop → rim. Ordered from center outward. */
  core: string
  mid: string
  rim: string
  /** The single accent this frame is allowed to use for the CTA and rules. */
  accent: string
  /** Ambient wash behind the drop. */
  wash: string
}

export const MOODS: Mood[] = [
  {
    id: 'aurora',
    label: 'Aurora',
    core: '#FFFFFF',
    mid: '#7EE8FF',
    rim: '#5B6CFF',
    accent: '#5B6CFF',
    wash: 'rgba(91,108,255,0.30)',
  },
  {
    id: 'flare',
    label: 'Flare',
    core: '#FFFFFF',
    mid: '#FF4DD2',
    rim: '#5B6CFF',
    accent: '#FF4DD2',
    wash: 'rgba(255,77,210,0.26)',
  },
  {
    id: 'prism',
    label: 'Prism',
    core: '#FFFFFF',
    mid: '#78FFC8',
    rim: '#FFD23D',
    accent: '#5B6CFF',
    wash: 'rgba(120,255,200,0.26)',
  },
]

export const DEFAULT_MOOD = MOODS[0]
