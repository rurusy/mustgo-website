// 사이트 절대 URL. canonical·hreflang·OG·sitemap 이 모두 이 값을 쓴다.
//
// index.html 의 canonical 과 scripts/gen-en-html.mjs 의 BASE 와 같은 값이어야 한다.
// 프리렌더는 localhost 에서 페이지를 렌더하므로, 주소를 window.location 에서 끌어오면
// 정적 HTML 에 localhost 가 박힌다 — 그래서 상수로 둔다.
export const SITE = 'https://mustgokorea.co.kr'
