import { cn } from '../../design/cn'

// 제품 화면 캡처를 테두리 액자에 담고 아래에 캡션을 다는 그림. BTMS 소개(/btms/, 홈 #corporate)에서 쓴다.
// 캡처 속 금액·인원은 시험 데이터라 캡션에 '예시'를 밝히는 자리가 꼭 있어야 한다.
//
// tone — 놓이는 배경. light 는 흰/연회색 섹션, dark 는 charcoal 섹션.
// narrow — 세로로 긴 패널(결재 패널 등). 넓은 화면에서도 원본 폭 이상으로 키우지 않는다.

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
  loading = 'lazy',
  className,
}) {
  const t = tones[tone]
  return (
    <figure className={cn(narrow && 'max-w-[336px] mx-auto', className)}>
      <div className={cn('rounded-lg p-2 sm:p-3', t.frame)}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={loading}
          decoding="async"
          className="block w-full h-auto rounded"
        />
      </div>
      {caption && <figcaption className={cn('mt-3 text-xs text-center', t.caption)}>{caption}</figcaption>}
    </figure>
  )
}
