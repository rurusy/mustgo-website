---
name: Single shared IntersectionObserver for Fade/Stat
description: useFadeIn was refactored from per-instance IO to one module-scoped observer with a WeakMap callback registry — the homepage has 30+ Fade nodes and the per-instance pattern created 30+ observers.
type: project
---

`src/hooks/useFadeIn.js` uses a **single module-scoped IntersectionObserver** shared across every consumer (currently `<Fade>` and `<Stat>`). Targets are tracked via a `WeakMap` of node → callback. When a node intersects, its callback runs, then the observer unobserves it and the WeakMap entry is deleted.

**Why:** the homepage renders 30+ `<Fade>` instances (every section heading, card, paragraph). The pre-refactor code created one IO per instance — wasteful and a measurable memory hit on low-end devices. One shared observer with threshold 0.15 and rootMargin '0px' is sufficient because every consumer wants the same trigger semantics.

**How to apply:**
- Do not re-introduce a `threshold` / `rootMargin` argument to `useFadeIn` without thinking through it. Adding per-call options means either spinning up a second observer (defeats the purpose) or keying observers by option-shape (complexity not yet justified). Both current consumers want the default — keep it.
- If a future consumer truly needs different thresholds, add a second hook (e.g. `useFadeInDeep`) with its own shared observer rather than parameterizing the existing one.
- SSR/no-IO fallback: the hook immediately sets `visible = true` so content isn't permanently hidden when IntersectionObserver is unavailable.
