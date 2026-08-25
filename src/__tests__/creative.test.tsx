import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Creative } from '../ads/Creative'
import { ANGLES } from '../ads/angles'
import { FORMATS } from '../ads/formats'
import { LAYOUTS } from '../ads/layouts'
import { MOODS } from '../ads/moods'
import { creativeFileName } from '../lib/export'

const angle = ANGLES[0]
const mood = MOODS[0]

describe('Creative', () => {
  it('renders at the placement’s true pixel size, because the export is the DOM', () => {
    const format = FORMATS.find((f) => f.id === 'story-9x16')!
    const { container } = render(
      <Creative spec={{ angle, format, layout: LAYOUTS[0], mood }} />,
    )
    const frame = container.querySelector('[data-creative]') as HTMLElement
    expect(frame.style.width).toBe('1080px')
    expect(frame.style.height).toBe('1920px')
  })

  it('keeps readable content inside the placement’s safe area', () => {
    // Stories cover the top 250px with the profile row and the bottom 340px with
    // the swipe affordance. A headline outside that box is a headline nobody sees.
    const format = FORMATS.find((f) => f.id === 'story-9x16')!
    const { container } = render(
      <Creative spec={{ angle, format, layout: LAYOUTS[1], mood }} />,
    )
    const copy = container.querySelector('[data-creative] > div:nth-of-type(3)') as HTMLElement
    expect(copy.style.top).toBe('250px')
    expect(copy.style.bottom).toBe('340px')
  })

  it('shows the angle’s hook in every layout', () => {
    for (const layout of LAYOUTS) {
      const { unmount } = render(
        <Creative spec={{ angle, format: FORMATS[0], layout, mood }} />,
      )
      // The stat layout leads with the figure instead of the sentence.
      const expected = layout.id === 'stat' ? angle.figure : angle.headline
      expect(screen.getByText(expected)).toBeInTheDocument()
      unmount()
    }
  })
})

describe('export naming', () => {
  it('encodes the full spec so a file is identifiable inside an ad account', () => {
    expect(
      creativeFileName({ angle: 'offer', format: 'feed-4x5', layout: 'stat', mood: 'aurora' }),
    ).toBe('timbre_offer_feed-4x5_stat_aurora.png')
  })
})

describe('campaign claims', () => {
  it('never ships an angle without a CTA or a funnel stage', () => {
    for (const a of ANGLES) {
      expect(a.cta.length).toBeGreaterThan(0)
      expect(['awareness', 'consideration', 'conversion']).toContain(a.stage)
    }
  })

  it('keeps every hook short enough to survive a feed crop', () => {
    // Past ~48 characters a hook stops being readable at thumbnail size, which is
    // the only size that decides whether the scroll stops.
    for (const a of ANGLES) expect(a.headline.length).toBeLessThanOrEqual(48)
  })
})

describe('zip writer', () => {
  it('writes a readable archive: PK signature, one central entry per file', async () => {
    const { makeZip } = await import('../lib/zip')
    const enc = new TextEncoder()
    const blob = makeZip([
      { name: 'a.png', data: enc.encode('first') as Uint8Array<ArrayBuffer> },
      { name: 'b.png', data: enc.encode('second') as Uint8Array<ArrayBuffer> },
    ])
    const bytes = new Uint8Array(await blob.arrayBuffer())
    const view = new DataView(bytes.buffer)

    expect(view.getUint32(0, true)).toBe(0x04034b50) // local file header

    // End-of-central-directory sits in the last 22 bytes and must report both files.
    const eocd = bytes.length - 22
    expect(view.getUint32(eocd, true)).toBe(0x06054b50)
    expect(view.getUint16(eocd + 8, true)).toBe(2)
  })
})
