import { cn } from '../../design/cn'
import { Container } from './Container'

// 세로 여백. className 으로 py-* 를 덮어쓸 수 없으므로(같은 유틸리티끼리는
// 클래스 나열 순서가 아니라 CSS 출력 순서가 이긴다) 변형을 키로 고른다.
//   flush  — 패딩 없음. 위아래 섹션이 바로 붙거나 pt-*/pb-* 로 직접 지정할 때.
//   tight  — 본문/정보 섹션. 마케팅 섹션보다 한 단계 촘촘하게.
//   default— 홈페이지 마케팅 섹션의 기본 리듬.
const paddings = {
  default: 'py-24 lg:py-32',
  tight: 'py-16 lg:py-20',
  flush: 'py-0',
}

const tones = {
  light: 'bg-white text-gray-800',
  soft: 'bg-surface-soft text-gray-800',
  charcoal: 'bg-ink-800 text-white',
  ink: 'bg-ink-900 text-white',
}

export function Section({
  id,
  tone = 'light',
  pad = 'default',
  className,
  containerClassName,
  children,
  bleed = false,
  bgImage,
  bgImageAlt,
  bgImageClassName,
  overlay,
}) {
  return (
    <section
      id={id}
      className={cn('relative overflow-hidden', paddings[pad], tones[tone], className)}
    >
      {bgImage && (
        <div
          className={cn('absolute inset-0 bg-cover bg-center', bgImageClassName)}
          style={{ backgroundImage: `url(${bgImage})` }}
          role={bgImageAlt ? 'img' : 'presentation'}
          aria-label={bgImageAlt || undefined}
        />
      )}
      {overlay && <div className={cn('absolute inset-0', overlay)} aria-hidden="true" />}
      <div className="relative z-10">
        {bleed ? children : <Container className={containerClassName}>{children}</Container>}
      </div>
    </section>
  )
}
