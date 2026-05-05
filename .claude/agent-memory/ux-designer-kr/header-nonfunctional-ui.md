---
name: Header non-functional UI hidden until implemented
description: KOR/ENG language toggle and mobile hamburger were visually present but had no onClick handlers — hidden with TODO comments
type: project
---

`components/layout/Header.jsx` 에서 KOR/ENG 토글 버튼과 모바일 햄버거 아이콘이 원래 시각적으로만 존재하고 onClick 핸들러가 없었음. 두 요소 모두 출시 전 페이지에서 제거 (TODO 주석으로 복원 의도 보존).

**Why:** 비기능 UI 노출은 Trust-First 보이스에 직격타. 사용자가 클릭했는데 아무 일도 일어나지 않으면 "이 회사는 디테일을 챙기지 않는다" 라는 시그널이 됨. 특히 B2B 마케팅 사이트의 핵심 가치가 신뢰감인 상황에서 치명적.

**How to apply:**
- 영문 페이지(/en) 라우트 추가 시 KOR/ENG 토글 복원. 토글은 시각적 토글이 아니라 라우트 변경(useNavigate)이어야 함.
- 모바일 nav 메뉴는 단순 햄버거 아이콘이 아니라 실제 sliding drawer/dropdown 으로 구현. 현재 모바일 사용자는 FloatingCTA 와 Hero CTA 로 핵심 액션(견적/문의)에 도달 가능하므로 임시로 햄버거 없이 운영 가능.
- 같은 패턴 (placeholder 링크, dummy button) 이 발견되면 즉시 hidden 또는 disabled 처리. "곧 만들면 되니까" 로 그대로 두지 말 것.
