---
name: Paired constants that must stay synced
description: Source-of-truth pairings (heroImages[0] ↔ index.html preload, hero timing JS ↔ CSS keyframe) that are not enforced by code and will silently drift if edited in only one place.
type: project
---

The codebase has **silent pairings** — values duplicated across files with no runtime check. Edit one without the other and the page degrades subtly.

1. **`heroImages[0].src` (src/design/tokens.js) ↔ `<link rel="preload" as="image">` href in index.html.**
   - Why: the LCP image must be preloaded with the exact same URL the hero `<div style="backgroundImage:url(...)">` will request, or the browser fetches it twice.
   - How to apply: any change to the first entry of `heroImages` requires the `index.html` href to be updated in lockstep. Comment in tokens.js flags this.

2. **`heroCycleSeconds` / `heroStepSeconds` (src/design/tokens.js) ↔ `@keyframes heroCrossfade` percentages + `animation: heroCrossfade Ns` in src/index.css.**
   - Why: Hero.jsx applies `animationDelay = idx * heroStepSeconds`. If JS step doesn't match the CSS keyframe's "visible" window, layers either flash or go black.
   - How to apply: when changing image count or duration, update tokens.js AND index.css together. A previous Tailwind-config copy of these keyframes was deleted because two sources are easier to misalign than one.

3. **Brand colors: tailwind.config.js ↔ src/design/tokens.js.**
   - Why: tokens.js is consumed by the styleguide and any JS-side programmatic styles. Tailwind config drives className utilities.
   - How to apply: documented in CLAUDE.md. The legacy `mustgo` namespace block (which had wrong amber/gray values) was removed from tailwind.config.js — it never existed in tokens.js to begin with, so deleting it just eliminated a footgun.
