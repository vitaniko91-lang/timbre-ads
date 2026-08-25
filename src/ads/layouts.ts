/**
 * Composition schemes.
 *
 * Four is deliberate. One layout across a whole account is what creative fatigue
 * looks like; twelve is what an unmanaged folder looks like. Four covers the real
 * jobs — establish, explain, assert, price — and each one puts the drop in a
 * different place so a rotation does not read as the same ad twice.
 */
export interface AdLayout {
  id: string
  label: string
  /** What this composition is for. */
  job: string
}

export const LAYOUTS: AdLayout[] = [
  {
    id: 'bleed',
    label: 'Bleed',
    job: 'Drop fills the frame, type sits under it. Stops the scroll before it explains anything.',
  },
  {
    id: 'split',
    label: 'Split',
    job: 'Type and object share the frame. The workhorse — reads at thumb size and at full size.',
  },
  {
    id: 'type',
    label: 'Type-first',
    job: 'The sentence is the artwork; the drop is a witness in the corner. For claims that need reading.',
  },
  {
    id: 'stat',
    label: 'Stat',
    job: 'One number at display size. For proof and price, where the figure is the whole argument.',
  },
]

export const DEFAULT_LAYOUT = LAYOUTS[1]
