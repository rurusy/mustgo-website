---
name: BrandText usage policy
description: When to use <BrandText /> vs plain "Mustgo" string, including the Korean "머스트고" exception
type: feedback
---

CLAUDE.md 의 규칙: 모든 prose 안의 "Mustgo" wordmark 는 `<BrandText />` 컴포넌트로 렌더해야 함 (M = brand-green, g = brand-blue 강조).

**Why:** 인라인 평문 "Mustgo" 와 `<BrandText />` 가 섞이면 브랜드 컬러 일관성이 깨지고, 같은 단락 안에서도 색상 처리가 들쑥날쑥해짐. 한 번 컴포넌트로 통일하면 향후 wordmark 색상/타입 변경 시 한 군데만 수정.

**How to apply:**

**Use `<BrandText />`:**
- 본문 prose 안의 영문 "Mustgo" (heading, paragraph, list item, button label 등 모든 visible 텍스트)
- About/Inbound/Corporate/Contact 의 강조 카피 ("...의 운영 철학입니다" 등)

**Keep plain text:**
- `alt="Mustgo"` (이미지 alt 속성) — 스크린리더에 색상 구분 의미 없음
- Footer 의 `© 2026 Mustgo Co., Ltd.` — 법인 표기는 plain text 관례
- `<title>`, `<meta>` 태그 안 — DOM 렌더링되지 않음
- 한글 표기 "머스트고" (Hero.jsx:34 등) — `<BrandText />` 는 영문 M/g 색상 적용 컴포넌트라 한글에 의미 없음. 한글 wordmark 처리가 필요해지면 BrandText 에 `lang="ko"` prop 으로 분기 추가 검토.

미적용 발견 위치 (이번 작업으로 모두 처리):
- About.jsx:10, 20, 47
- Inbound.jsx:71, 74, 104
- Footer.jsx:12
- StyleguidePage.jsx:70, 136
