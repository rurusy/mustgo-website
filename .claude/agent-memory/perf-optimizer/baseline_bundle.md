---
name: Bundle baseline (post 2026-05-06 cleanup)
description: Build output sizes after dead-code removal in tailwind.config + IO sharing + LCP preload, used as the starting point for future bundle comparisons.
type: project
---

After the 2026-05-06 cleanup pass (single shared IntersectionObserver, removed dead `mustgo` color block + `hero-crossfade` keyframes from tailwind.config, hero LCP preload added):

- `dist/index.html` — 1.27 kB (gzip 0.73 kB)
- `dist/assets/index-*.css` — 29.20 kB (gzip 5.56 kB)
- `dist/assets/index-*.js` — 421.33 kB (gzip 124.59 kB)

**Why:** Future bundle-size diffs need a known reference point. The CSS shrinkage from removing the unused `heroCrossfade` Tailwind keyframes was negligible because Tailwind's JIT was already only emitting used utilities — the value was correctness (eliminating misleading dead code), not bytes.

**How to apply:** When recommending bundle optimizations, compare against these numbers. Anything that meaningfully moves the JS gzip below ~120 kB without splitting React out is worth flagging.
