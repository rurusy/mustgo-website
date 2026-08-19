# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Mustgo is a Korean-language marketing landing page for a corporate travel agency that handles both **Outbound** (Korean companies traveling abroad) and **Inbound** (foreign VIPs visiting Korea). The repo is named `mustgo-design-system` because the site doubles as a live styleguide of its own components.

The voice is "Trust-First" (차분·신뢰형) — measured, premium, never sensational. Copy decisions and section structure are spec'd in `MustGo_디자인_프롬프트_v2.md`; consult it before changing user-facing text.

## Commands

```bash
npm install          # first-time setup
npm run dev          # Vite dev server on http://localhost:5173 (host: true → reachable on LAN)
npm run build        # production build to dist/ (vite → inline-css → gen-en-html)
npm run preview      # preview the production build
```

There is no test suite, linter, or formatter configured — don't invent commands for them.
`.prettierignore` exists anyway, to shield `index.html` from an editor's
format-on-save (see "index.html head is single-line on purpose" below).

## Architecture

### Routing

`src/main.jsx` wraps `App` in `<BrowserRouter>`. `src/App.jsx` defines 15 routes in four groups:

**Marketing** — the only pages meant to be indexed.
- `/` → `HomePage` — Korean marketing site (one scrollable page composed of section components)
- `/en` → `EnHomePage` — English counterpart, assembled from `sections/en/` + `layout/en/` variants plus the `lang`-aware shared components (`Header`, `Contact`, `FloatingCTA`, `HolidayNotice`)
- `/styleguide` → `StyleguidePage` — live catalog of every UI primitive and marketing card, rendered with the real components

**Payment** — setup notes in `docs/toss-payments-setup.md` and `docs/paypal-sandbox-test.md`.
- `/pay` → overseas customers, USD/EUR via PayPal
- `/pay-kr` → domestic customers, KRW via Toss Payments (domestic cards can't be charged through PayPal under 외국환거래법, hence the split)
- `/pay-kr/success` and `/pay-kr/fail` → both `PayKrResultPage`, distinguished by an `outcome` prop; these are the URLs the Toss checkout redirects back to
- `/how-to-pay` → `PayGuidePage`, illustrated guide for overseas customers

**Legal / support** — `/policy` (English payment & refund), `/privacy` (개인정보처리방침), `/terms` (이용약관), `/checklist` (확인 요청)

**Admin** — `/admin/login`, `/admin` (문의 내역), `/admin/payments` (결제 내역)

Only `/` and `/en` carry head metadata in the served HTML — `index.html` and the `dist/en/index.html` the build emits. Every other page sets its own `document.title` and appends a `<meta name="robots">` from a `useEffect`: `noindex,follow` for payment and legal pages, `noindex,nofollow` for admin and checklist. `/styleguide` has no such effect and is blocked in `public/robots.txt` instead.

When you add a new component, add it to `StyleguidePage.jsx` so designers can review it in isolation. When you add a new page, copy the `useEffect` title + robots pattern from an existing one — there's no head-management library, and a page without it inherits the homepage's title and stays indexable.

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

### `index.html` head is single-line on purpose — don't reformat

Naver's ADVoost (애드부스트) search-ad diagnostic parses HTML **line by line**. A `<meta>` tag whose `content="…"` sits on a different line from its `name="…"` reads to that parser as *absent*, and a pretty-printed JSON-LD block reads as "no structured data" — even though the markup is valid and browsers handle it fine. A 2026-08 diagnostic graded the site **C** for exactly this, with every tag present and correct.

So in `index.html`:

- every `<meta>` / `<link>` stays on **one line**, however long it gets
- the `<script type="application/ld+json">` block stays **minified onto one line**
- **no render-blocking `<link rel="stylesheet">`** — Google Fonts ships as a `rel="preload"` that JS promotes to a stylesheet on load

Wrapping those tags drops the grade back to C with nothing visibly broken. Edit the JSON-LD through `docs/structured-data.json` (the readable source of truth), then run `node scripts/sync-jsonld.mjs` to minify it back into `index.html`.

### Build pipeline

`npm run build` is three steps; both post-steps fail loudly rather than ship something subtly wrong.

1. `vite build` → `dist/`
2. `scripts/inline-css.mjs` — inlines Vite's CSS bundle into `dist/index.html` as a `<style>` block, so the page ships with no render-blocking stylesheet
3. `scripts/gen-en-html.mjs` — writes `dist/en/index.html`, a copy of the built index with English `<head>` metadata, so social scrapers (which don't run JS) see English OG tags at `/en`

Step 3 runs after step 2 so `/en` inherits the inlined CSS. `EN.title` there must stay **15–45 characters** (the diagnostic checks title length) and match `document.title` in `src/pages/EnHomePage.jsx`, which re-applies it once React Router mounts.

## Korean / English mixing

Body copy is Korean; marketing taglines and labels mix in English. Two font families are loaded from Google Fonts via `index.html` and exposed as Tailwind utilities: `font-sans` (Noto Sans KR, the default) and `font-eng` (Inter). Apply `font-eng` to English-only runs of text.
