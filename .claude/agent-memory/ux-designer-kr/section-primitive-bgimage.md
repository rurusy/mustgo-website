---
name: Section primitive — bgImage/overlay extension
description: Why Corporate.jsx and Inbound.jsx were raw <section> and how Section.jsx now supports background image + overlay
type: project
---

`components/ui/Section.jsx` 는 `bgImage`, `bgImageAlt`, `bgImageClassName`, `overlay` prop을 지원합니다. 이 4개의 prop은 풀블리드 배경 이미지 + dark overlay 패턴을 라이트/다크 섹션 모두에서 일관되게 적용하기 위한 것입니다.

**Why:** Corporate 와 Inbound 섹션이 원래 raw `<section>` 으로 빠져 있었던 유일한 이유가 "배경 이미지 + 오버레이" 처리였음. Section primitive 를 우회하니 padding/container/z-index 일관성이 깨졌고, 다음에 비슷한 패턴이 필요한 섹션이 생기면 또 raw 로 빠질 위험이 있었음.

**How to apply:**
- 섹션에 풀블리드 배경 이미지가 필요하면 `<Section bgImage="..." bgImageAlt="..." />` 사용. `role="img"` + aria-label 자동 처리.
- 단순 장식용(콘텐츠 의미 없음)이면 `bgImageAlt` 생략 → `role="presentation"` 적용.
- `bgImageClassName` 으로 opacity/blend-mode 조정 가능 (예: `"opacity-10 mix-blend-luminosity"`).
- `overlay` 는 Tailwind class string. 예: `"bg-gradient-to-b from-ink-900/95 via-ink-900/80 to-ink-900/95"` 또는 `"bg-black/40"`.
- Hero 섹션은 4-layer crossfade 라 여전히 raw `<section>` 유지 — Section primitive 로 끌어올릴 가치 없음(특수 케이스).
