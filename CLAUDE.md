# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Mustgo is a Korean-language marketing landing page for a corporate travel agency that handles both **Outbound** (Korean companies traveling abroad) and **Inbound** (foreign VIPs visiting Korea). The repo is named `mustgo-design-system` because the site doubles as a live styleguide of its own components.

The voice is "Trust-First" (차분·신뢰형) — measured, premium, never sensational. Copy decisions and section structure are spec'd in `MustGo_디자인_프롬프트_v2.md`; consult it before changing user-facing text.

## Commands

```bash
npm install          # first-time setup
npm run dev          # Vite dev server on http://localhost:5173 (host: true → reachable on LAN)
npm run build        # production build to dist/
npm run preview      # preview the production build
```

There is no test suite, linter, or formatter configured — don't invent commands for them.

## Architecture

### Routing (two pages only)

`src/main.jsx` wraps `App` in `<BrowserRouter>`. `src/App.jsx` defines:
- `/` → `HomePage` — the marketing site (single scrollable page composed of section components)
- `/styleguide` → `StyleguidePage` — a live catalog of every UI primitive and marketing card, rendered with the real components

When you add a new component, add it to `StyleguidePage.jsx` so designers can review it in isolation.

### Three-layer component hierarchy

The component folders are not arbitrary — they encode a layering rule:

1. **`components/ui/`** — generic, headless-ish primitives (`Button`, `Card`, `Container`, `Section`, `Fade`, `IconBadge`, `SectionHeading`, `Stat`, `BrandText`, `FormField`). Each accepts variant/tone/size props with a `variants` lookup object inside the file. **Re-export new primitives from `components/ui/index.js`** — that's the public surface that pages and marketing cards import from.
2. **`components/marketing/`** — composed cards built *from* `ui/` primitives (`FeatureCard`, `ServiceCard`, `AudienceCard`, `ImageCard`, `ProcessSteps`, `ContactInfoItem`). These encode marketing-page patterns and should not contain raw Tailwind layout that belongs in a primitive.
3. **`components/sections/`** — full-width page sections (`Hero`, `About`, `Corporate`, `Inbound`, `Contact`). Each is a self-contained `<section>` with its own copy. The page is just an ordered list of these.

`components/layout/` (`Header`, `Footer`, `FloatingCTA`) is the chrome that wraps the page outside `<main>`.

### Design tokens are duplicated by design

Brand colors, fonts, and spacing live in **two synced sources**:
- `tailwind.config.js` — for `className`-driven styling (the default path)
- `src/design/tokens.js` — for JS contexts (hero image array, programmatic styles, the styleguide swatches)

When you change a brand color, **update both files**. The `tokens.js` header explicitly calls this out.

`src/design/cn.js` is a tiny home-grown classnames helper — don't add `clsx` or `classnames` as a dependency.

### Variant prop convention

Primitives expose styling via named lookup objects, not arbitrary class strings. Example from `Button.jsx`:

```js
const variants = { primary: '…', blue: '…', outlineLight: '…', ghost: '…' }
const sizes    = { sm: '…', md: '…', lg: '…', pill: '…' }
```

When extending a primitive, add a new key to the lookup object rather than introducing a one-off `className` override at the call site. `Section.tone`, `Card.variant`, `IconBadge.tone` follow the same pattern.

### Animation is CSS-driven, not JS-driven

Two custom animations are wired up in `src/index.css` and triggered by JS:

- **`.ds-fade` + `useFadeIn` hook** — IntersectionObserver flips an `is-visible` class. Wrap any element that should fade in on scroll with `<Fade>`; pass a `delay` (seconds) for staggered reveals.
- **`.ds-hero-bg` + `@keyframes heroCrossfade`** — the hero background is a stack of 4 absolutely-positioned divs from `heroImages` in `tokens.js`, each with an `animationDelay` of `idx * heroStepSeconds`. The 32s cycle and 8s step in JS must stay in sync with the keyframe timing in CSS. If you change image count or duration, update `heroCycleSeconds`/`heroStepSeconds` and the CSS keyframe together.

`useCounter` (in `hooks/`) animates the "숫자로 보는 MustGo" stat counters with rAF.

### Smooth-scroll anchor navigation

`Header.jsx` intercepts `#`-prefixed nav clicks and scrolls with an offset equal to the header's own `offsetHeight`, so anchored sections aren't hidden under the sticky header. Section IDs (`#about`, `#corporate`, `#inbound`, `#contact`) must match what `Header` and the hero CTAs link to.

### Brand wordmark

Always render the "Mustgo" name through `<BrandText />` — the M is `text-brand-green` and the g is `text-brand-blue`. Don't hardcode the styled spans inline.

## Korean / English mixing

Body copy is Korean; marketing taglines and labels mix in English. Two font families are loaded from Google Fonts via `index.html` and exposed as Tailwind utilities: `font-sans` (Noto Sans KR, the default) and `font-eng` (Inter). Apply `font-eng` to English-only runs of text.
