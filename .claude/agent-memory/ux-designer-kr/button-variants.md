---
name: Button variant catalog (Admin/utility additions)
description: New variants/sizes added to Button.jsx for Admin pages and inline filter chips
type: project
---

`components/ui/Button.jsx` variant lookup 에 다음 키들이 추가됨 (Admin 페이지의 raw 버튼들을 primitive 로 흡수하면서):

**Variants:**
- `pillFilter` — 흰 배경 + 회색 테두리, 비활성 탭/필터 칩용. shadow 없음.
- `pillFilterActive` — 다크(gray-900) 배경 + 흰 텍스트, 활성 탭용.
- `chipPrimary` — amber-600 배경, 카드 안 inline 액션 chip 용 (예: "처리완료 표시"). shadow 없음.
- `chipNeutral` — gray-100 배경, inline 토글 해제 액션용 (예: "미처리로 되돌리기"). shadow 없음.

**Sizes:**
- `xs` — `h-8 px-3 text-xs` (chip 사이즈).
- `pillSm` — `px-4 py-2 text-sm` (탭 사이즈).
- `iconSm` — `h-10 w-10 text-sm` (정사각형 아이콘 버튼, 예: ↻ 새로고침).

**Why:** Admin 페이지가 모두 raw `<button className="...">` 로 작성되어 있어 spacing/색상 토큰이 페이지마다 drift 했음. Button primitive 에 흡수하면 향후 토큰 변경 시 한 곳만 수정.

**How to apply:** 새로운 페이지에서 비표준 버튼이 필요하면 먼저 위 variant 로 해결되는지 확인. 정 없으면 새 variant key 를 Button.jsx 에 추가하는 게 원칙(call-site 의 className 오버라이드 금지). 색상이 정말 일회성이면 Tailwind 유틸리티로 보강하되, 패턴이 2회 이상 반복되면 즉시 variant 화.
