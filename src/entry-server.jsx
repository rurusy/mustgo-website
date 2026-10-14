// 빌드 전용 진입점. 브라우저 번들(main.jsx)에는 들어가지 않는다.
//
// scripts/prerender.mjs 가 이 모듈을 Node 에서 불러 콘텐츠 경로의 HTML 을 얻는다.
// 예전에는 헤드리스 크롬으로 실제 페이지를 띄워 DOM 을 떠냈는데, 베르셀 빌드
// 컨테이너에서 크롬이 뜨지 않아 배포가 통째로 막혔다. React 를 Node 에서 직접
// 렌더하면 브라우저도 시스템 라이브러리도 필요 없다.
//
// hydrate 하지 않고 클라이언트가 createRoot 로 다시 그리므로 renderToStaticMarkup
// 으로 충분하다 (data-react* 속성이 붙지 않아 결과물이 깔끔하다).

import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import App from './App.jsx'

export function render(path) {
  const markup = renderToStaticMarkup(
    <StaticRouter location={path}>
      <App />
    </StaticRouter>,
  )

  // .ds-fade 는 IntersectionObserver 가 is-visible 을 붙이기 전까지 opacity:0 이다.
  // 서버 렌더에는 effect 가 돌지 않으므로 여기서 직접 붙인다 — 안 그러면 본문이
  // 투명한 상태로 배포되어 크롤러가 "숨겨진 콘텐츠"로 읽는다.
  return markup.replace(/class="([^"]*\bds-fade\b[^"]*)"/g, (whole, classes) =>
    classes.includes('is-visible') ? whole : `class="${classes} is-visible"`,
  )
}
