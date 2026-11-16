import { Link } from 'react-router-dom'
import { cn } from '../../design/cn'

// 사진 위에 eyebrow·설명을 얹는 카드.
//   title — 선택. 영문 eyebrow 만으로는 서비스 이름이 안 읽히는 카드(단체여행 섹션)에서 한글 이름을 얹는다.
//   to    — 선택. 주면 카드 전체가 링크가 되고 linkLabel(기본 '자세히 보기 →')을 보여 준다.
//           폰에는 hover 가 없으므로 늘 보이고, sm 이상에서는 hover·키보드 포커스 때만 나타난다.
//           없으면 지금처럼 장식용 카드다(방한 VIP 섹션).
export function ImageCard({ image, alt, eyebrow, title, description, to, linkLabel = '자세히 보기 →' }) {
  const Tag = to ? Link : 'div'

  return (
    <Tag
      {...(to ? { to } : {})}
      className={cn(
        'group relative block overflow-hidden rounded-lg aspect-[4/3] bg-ink-800',
        to && 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-600',
      )}
    >
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/* 가운데(via)를 /35 까지 어둡게 둔다 — 밝은 사진(갈라 디너 테이블)에서 주황 eyebrow 가 안 읽혔다. */}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/35 to-transparent" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <span className="text-amber-500 font-eng font-bold text-sm mb-2 block tracking-wider">
          {eyebrow}
        </span>
        {title && <h4 className="text-lg font-bold text-white mb-1">{title}</h4>}
        <p className="text-[15px] text-gray-200 leading-relaxed">{description}</p>
        {to && (
          <span className="mt-3 text-sm font-semibold text-white transition-opacity sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-visible:opacity-100">
            {linkLabel}
          </span>
        )}
      </div>
    </Tag>
  )
}
