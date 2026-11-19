import { cn } from '../../design/cn'

// 제품 화면 캡처를 테두리 액자에 담고 아래에 캡션을 다는 그림. BTMS 소개(/btms/, 홈 #corporate)에서 쓴다.
// 캡처 속 금액·인원은 시험 데이터라 캡션에 '예시'를 밝히는 자리가 꼭 있어야 한다.
//
// tone — 놓이는 배경. light 는 흰/연회색 섹션, dark 는 charcoal 섹션.
// narrow — 세로로 긴 패널(결재 패널 등). 넓은 화면에서도 원본 폭 이상으로 키우지 않는다.
// fill — 액자를 부모 높이만큼 늘인다(/btms/ 기능 글에서 옆 카드와 위아래 선을 맞출 때).
//        캡처는 줄이거나 자르지 않고 원래 크기로 액자 가운데에 두며, 캡션은 액자 안 맨 아래로 들어간다
//        (밖에 두면 그만큼 액자와 카드의 아랫선이 어긋난다). 2026-11-20 요청.

const tones = {
  light: {
    frame: 'bg-white border border-gray-200 shadow-sm',
    caption: 'text-gray-500',
  },
  dark: {
    frame: 'bg-white/5 border border-white/10',
    caption: 'text-gray-400',
  },
}

export function ScreenshotFrame({
  src,
  alt,
  width,
  height,
  caption,
  tone = 'light',
  narrow = false,
  fill = false,
  loading = 'lazy',
  className,
}) {
  const t = tones[tone]
  const img = (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={loading}
      decoding="async"
      className={cn('block w-full h-auto rounded', fill && narrow && 'max-w-[312px]')}
    />
  )

  if (fill) {
    return (
      <figure className={cn('h-full', className)}>
        <div className={cn('h-full rounded-lg p-2 sm:p-3 flex flex-col', t.frame)}>
          <div className="flex-1 flex items-center justify-center">{img}</div>
          {caption && <figcaption className={cn('mt-3 mb-1 text-xs text-center', t.caption)}>{caption}</figcaption>}
        </div>
      </figure>
    )
  }

  return (
    <figure className={cn(narrow && 'max-w-[336px] mx-auto', className)}>
      <div className={cn('rounded-lg p-2 sm:p-3', t.frame)}>{img}</div>
      {caption && <figcaption className={cn('mt-3 text-xs text-center', t.caption)}>{caption}</figcaption>}
    </figure>
  )
}
