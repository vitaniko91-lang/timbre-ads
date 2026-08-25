import { toPng } from 'html-to-image'

/**
 * Export a creative node as a production PNG.
 *
 * The node is already laid out at its true size, so `pixelRatio: 1` is correct —
 * asking html-to-image to upscale would resample type that the browser could have
 * rendered sharp. `cacheBust` is off deliberately: it appends a query string to
 * asset URLs, which turns the same-origin font requests into misses.
 */
export async function creativeToDataUrl(node: HTMLElement) {
  if (document.fonts?.ready) await document.fonts.ready
  return toPng(node, { pixelRatio: 1, cacheBust: false, backgroundColor: '#F4F6FF' })
}

export async function creativeToPng(node: HTMLElement, fileName: string) {
  // Fonts must be resolved before the DOM is serialised, or the PNG falls back
  // to system-ui and every headline shifts.
  if (document.fonts?.ready) await document.fonts.ready

  const dataUrl = await toPng(node, {
    pixelRatio: 1,
    cacheBust: false,
    backgroundColor: '#F4F6FF',
  })

  const link = document.createElement('a')
  link.download = fileName
  link.href = dataUrl
  link.click()
  return dataUrl
}

/** `timbre_offer_4x5_split_aurora.png` — readable in an ad account, sorts sanely. */
export function creativeFileName(parts: {
  angle: string
  format: string
  layout: string
  mood: string
}) {
  return `timbre_${parts.angle}_${parts.format}_${parts.layout}_${parts.mood}.png`
}
