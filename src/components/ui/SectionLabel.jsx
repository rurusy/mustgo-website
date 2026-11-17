import { cn } from '../../design/cn'

// 섹션 큰 제목 위에 다는 작은 라벨. 문구는 헤더 메뉴 이름과 같게 둔다 — 폰에서 메뉴를 눌러
// 내려온 사람이 같은 글자를 보고 제대로 왔음을 바로 안다(PC 는 헤더에 메뉴가 늘 보이지만 폰은 숨는다).
// 카드 안의 회색 영문 라벨(Incentive Travel 등)보다 한 단계 위라는 게 보이도록 브랜드 색과 앞의 짧은 선을 쓴다.
const tones = {
  light: { text: 'text-brand-blue', line: 'bg-brand-blue' },
  dark: { text: 'text-amber-500', line: 'bg-amber-500' },
}

// 섹션 머리는 폰에서 왼쪽, sm 이상에서 가운데 정렬이라 기본값(responsive)이 그것을 따른다.
const aligns = {
  responsive: 'justify-start sm:justify-center',
  left: 'justify-start',
  center: 'justify-center',
}

export function SectionLabel({ children, tone = 'light', align = 'responsive', className }) {
  const t = tones[tone]
  return (
    <p
      className={cn(
        'flex items-center gap-3 mb-4 font-eng text-xs sm:text-[13px] font-bold uppercase tracking-wide2',
        t.text,
        aligns[align],
        className,
      )}
    >
      <span className={cn('h-px w-6 shrink-0', t.line)} aria-hidden="true" />
      {children}
    </p>
  )
}
