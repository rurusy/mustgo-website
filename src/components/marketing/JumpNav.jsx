import { Button } from '../ui'
import { cn } from '../../design/cn'
import { ArrowIcon } from './DetailCard'

// 같은 페이지 아래 글로 내려가는 바로가기 줄. /group-travel/ 의 서비스, /btms/ 의 기능이 쓴다.
// 위에 이름('서비스별 자세히 보기')을 달고 버튼마다 ↓ 를 붙인다 — 이름만 있으면 눌리는 버튼인지
// 그냥 상자인지 구분이 안 됐다(2026-11-20 지적).
//
// id — DetailCard 의 '↑ 목록으로' 링크가 돌아오는 자리. scroll-mt 가 있어야 헤더 밑으로 여유를 두고
//      멈춘다(lib/anchorScroll.js).
// items — [{ href: '#golf', label: '해외골프여행' }]
export function JumpNav({ id, label, items, className }) {
  const labelId = `${id}-label`
  return (
    <nav id={id} aria-labelledby={labelId} className={cn('scroll-mt-28', className)}>
      <p id={labelId} className="text-sm font-bold text-gray-500 mb-3">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((it) => (
          <Button key={it.href} as="a" href={it.href} variant="jump" size="pillSm">
            {it.label}
            <ArrowIcon />
          </Button>
        ))}
      </div>
    </nav>
  )
}
