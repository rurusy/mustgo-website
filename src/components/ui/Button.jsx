import { cn } from '../../design/cn'

const base =
  'inline-flex items-center justify-center font-semibold transition-colors shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-600 active:scale-[0.98] ' +
  // 비활성 상태는 눌리지 않는다는 걸 눈으로도 알 수 있어야 한다 (제출 중 / 입력 미완).
  'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100'

const variants = {
  primary: 'bg-amber-600 text-white hover:bg-amber-700',
  blue: 'bg-brand-blue text-white hover:bg-brand-green',
  // Solid blue CTA that darkens on hover (used for the header "Pay Online" entry).
  blueSolid: 'bg-brand-blue text-white hover:bg-brand-blue-dark shadow-none',
  green: 'bg-brand-green text-white hover:bg-brand-green-light',
  // 보조 버튼 두 가지. 예전엔 투명 바탕에 옅은 테두리 한 줄이라 '그냥 상자'로 보였다(2026-11-20 지적) —
  // 바탕을 살짝 채우고 테두리를 진하게 해서 눌리는 것으로 읽히게 했다. 링크 문구 끝에는 → (페이지 안
  // 아래로 내려가는 것은 ↓)를 붙인다.
  outlineLight:
    'bg-white/10 border-2 border-white text-white hover:bg-white hover:text-ink-900 backdrop-blur-sm shadow-none',
  // outlineLight 의 밝은 배경용 짝. 주 버튼 옆의 보조 동작(예: 홈 단체여행 섹션의 '자세히 보기').
  outlineDark:
    'bg-white border-2 border-ink-900 text-ink-900 shadow-none hover:bg-ink-900 hover:text-white',
  ghost: 'bg-transparent text-gray-700 hover:text-amber-600 shadow-none',
  // 같은 페이지 아래 내용으로 내려가는 바로가기(예: /group-travel/ 의 서비스 바로가기).
  // pillFilter 와 생김새가 비슷하면 '그냥 이름표'로 읽혀서(2026-11-20 지적) 테두리를 진하게 하고
  // 아래 화살표를 붙이며, 마우스를 올리면 파랗게 바뀐다. 화살표는 호출하는 쪽에서 넣는다.
  jump:
    'gap-1.5 bg-white text-gray-800 border border-gray-300 hover:border-brand-blue hover:text-brand-blue hover:bg-brand-blue/5 shadow-sm font-medium',
  // Admin/utility variants — flat, no shadow, used in tab strips and inline filters.
  pillFilter:
    'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 shadow-none font-medium',
  pillFilterActive:
    'bg-gray-900 text-white border border-gray-900 shadow-none font-medium',
  // Inline action chip used inside cards (e.g. 처리완료 표시).
  chipPrimary: 'bg-amber-600 text-white hover:bg-amber-700 shadow-none font-medium',
  chipNeutral: 'bg-gray-100 text-gray-600 hover:bg-gray-200 shadow-none font-medium',
}

const sizes = {
  sm: 'h-10 px-5 text-sm rounded-sm',
  md: 'px-8 py-4 text-[15px] rounded-sm',
  lg: 'px-10 py-5 text-base rounded-sm',
  pill: 'h-14 px-6 rounded-full text-[15px]',
  // 같은 폭 칸으로 나란히 놓는 버튼(홈의 도시 버튼). 폰에서 세 개가 한 줄에 들어가도록 좌우 여백만 줄인다.
  cell: 'px-3 sm:px-8 py-4 text-[15px] rounded-sm',
  // Compact sizes for utility/chip buttons.
  xs: 'h-8 px-3 text-xs rounded-sm',
  pillSm: 'px-4 py-2 text-sm rounded-sm',
  iconSm: 'h-10 w-10 text-sm rounded-sm',
}

export function Button({
  as: Tag = 'button',
  variant = 'primary',
  size = 'md',
  className,
  font = 'sans',
  children,
  ...rest
}) {
  return (
    <Tag
      className={cn(
        base,
        variants[variant],
        sizes[size],
        font === 'eng' && 'font-eng',
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  )
}
