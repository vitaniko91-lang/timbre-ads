/**
 * Paid-social placements this system ships to.
 *
 * `safe` is the region a placement's own UI can cover at runtime — Stories put a
 * profile row over the top and a swipe-up affordance over the bottom, so anything
 * that must be read (headline, price, CTA) has to live inside it. The numbers are
 * Meta's published Stories guidance (250 px top / 340 px bottom at 1080×1920),
 * carried over proportionally where a placement has no published figure.
 */
export interface AdFormat {
  id: string
  /** Shown in the UI and used in the exported file name. */
  label: string
  /** Where this size actually runs. */
  surface: string
  width: number
  height: number
  safe: { top: number; right: number; bottom: number; left: number }
}

export const FORMATS: AdFormat[] = [
  {
    id: 'feed-1x1',
    label: '1:1 Feed',
    surface: 'Instagram · Facebook feed',
    width: 1080,
    height: 1080,
    safe: { top: 64, right: 64, bottom: 64, left: 64 },
  },
  {
    id: 'feed-4x5',
    label: '4:5 Feed',
    surface: 'Instagram feed — tallest allowed',
    width: 1080,
    height: 1350,
    safe: { top: 72, right: 72, bottom: 72, left: 72 },
  },
  {
    id: 'story-9x16',
    label: '9:16 Story',
    surface: 'Stories · Reels',
    width: 1080,
    height: 1920,
    safe: { top: 250, right: 72, bottom: 340, left: 72 },
  },
  {
    id: 'display-191x1',
    label: '1.91:1 Display',
    surface: 'LinkedIn single image · display',
    width: 1200,
    height: 628,
    safe: { top: 48, right: 56, bottom: 48, left: 56 },
  },
]

export const DEFAULT_FORMAT = FORMATS[1]
