# TIMBRE Ad System

A paid-social creative system for [TIMBRE](https://timbre-ruby.vercel.app) — the fictional
premium-audio brand whose site I designed and built. This is its campaign layer: the creative
composes in the browser and exports as the exact PNG a media buyer uploads.

**Live:** _(deployed URL)_

## What it is

Four axes, composed live:

| Axis | Count | What it changes |
|---|---|---|
| Angle | 6 | The argument — brand, two proof points, scarcity, price, risk reversal |
| Placement | 4 | 1:1 and 4:5 feed, 9:16 story, 1.91:1 display — with each one's safe area |
| Layout | 4 | Bleed, split, type-first, stat |
| Mood | 3 | Which part of the brand spectrum the drop refracts |

288 valid combinations from one set of rules.

## Decisions worth knowing

**Every claim comes from the product.** $349, 500 units, 0 ms, 48 h, 30 days — all of it is on the
TIMBRE product page. No invented reviews, no star ratings, no borrowed logos. A creative system
that *can* manufacture proof will eventually be asked to.

**The preview is the file.** Thumbnails, the studio stage and the export all render the same
component at true pixel size and scale it down with a transform. What gets approved is what gets
uploaded — there is no second "production" pass to drift out of sync.

**The drop is vector, not a screenshot.** The brand site renders it with WebGL and live audio.
A still can't ship a canvas, and a screenshot resamples badly at 1920 px, so it is redrawn in SVG
with the three cues that make the eye read glass instead of a gradient ball: a bent horizon,
caustics pooling at the base, and a chromatic split at the limb.

**Fonts are self-hosted.** `html-to-image` can only inline `@font-face` rules it is allowed to
read; a cross-origin stylesheet throws, and the PNG silently exports in a fallback face. Four
local woff2 files, 75 KB total.

**Bulk export writes its own ZIP.** PNG is already deflated, so entries are stored verbatim —
that keeps the whole writer at about sixty lines and the bundle free of a zip dependency. The
archive unpacks with system `unzip`; verified.

**Type scales with the short side.** Every size is a multiple of `u` — one hundredth of the frame's
short edge. That is what holds a 628 px banner and a 1920 px story together as one campaign.

## Verified

- PNG export produces exactly 1080×1350 and 1080×1920, with Clash Display and General Sans
  embedded — checked by exporting and reading the files, not by trusting the button.
- No horizontal overflow at 1920 / 1440 / 768 / 390, measured with
  `documentElement.scrollWidth` against `clientWidth` (an earlier fixed-scale stage produced
  51 px of scroll at 390 — the responsive stage fixed it).
- "Export all 8" produces a valid archive: 8 PNGs at 1080×1350, 1080×1920, 1080×1080 and
  1200×628, unpacked and measured with system `unzip`.
- 7 tests, oxlint clean, 344 KB built.
- Screenshots of every section in `docs/shots/`.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build
```

## Stack

React 19 · TypeScript · Tailwind 4 · Vite · html-to-image. No component library.

---

TIMBRE is a fictional brand created for this portfolio. Nothing in the campaign is a real
endorsement, review or customer.
