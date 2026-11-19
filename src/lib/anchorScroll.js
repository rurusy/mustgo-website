// 앵커(#about, #golf 등)로 스크롤할 때 멈출 위치. 헤더 메뉴 클릭(Header.jsx)과
// 해시 주소로 들어오거나 다른 페이지에서 넘어올 때(App.jsx 의 ScrollToTop)가 같은 계산을 쓴다.
//
// 헤더는 fixed 라 그 높이만큼은 늘 빼야 한다. 거기에 더해:
//  - 목적지에 scroll-mt 가 있으면(서비스 글, 홈 골프 배너 등 위 여백이 없는 덩어리)
//    헤더 밑으로 32px 띄운다 — 안 띄우면 사진이 헤더 선에 딱 붙었다(2026-11-20).
//  - 그 밖(홈 섹션)은 섹션 자체의 위 여백(py-24/lg:py-32 = 96/128px)이 남으면
//    제목이 화면 한참 아래에서 시작한다(2026-11-20 지적). 여백 중 48px 만 남기고 지나친다.
//    섹션 디자인(여백)은 그대로 두고 멈추는 자리만 바꾸는 것이다.
const GAP_FOR_SCROLL_MARGIN = 32
const KEEP_OF_PADDING = 48

export function anchorScrollTop(target) {
  const headerEl = document.getElementById('main-header')
  const header = headerEl ? headerEl.offsetHeight : 0
  const style = getComputedStyle(target)
  const top = target.getBoundingClientRect().top + window.scrollY - header

  if ((parseFloat(style.scrollMarginTop) || 0) > 0) return top - GAP_FOR_SCROLL_MARGIN
  const pad = parseFloat(style.paddingTop) || 0
  return top + Math.max(0, pad - KEEP_OF_PADDING)
}
