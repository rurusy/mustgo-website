import { Link } from 'react-router-dom'
import { cn } from '../../design/cn'

// 도시 허브에서 관광지 상세로 들어가는 카드.
//
// ImageCard 와 겹쳐 보이지만 쓰임이 다르다 — ImageCard 는 홈 섹션용(링크는 선택)이고,
// 이 카드는 카드 전체가 하나의 내부 링크다. 허브 → 상세로 이어지는 내부 링크가
// 신규 페이지의 색인 경로라서, 링크 영역을 카드 전체로 넓게 잡는다.
//
// 제목 폰트는 font 로 고른다. 한국어 이름에 font-eng(Inter)를 씌우면 글자가
// 폴백 폰트로 떨어지므로 언어에 맞춰 넘겨야 한다.
export function AttractionCard({ to, image, alt, name, tagline, font = 'sans' }) {
  // 상세로 들어간다는 힌트. 홈 단체여행 카드(ImageCard)와 같은 '자세히 보기 →'로 통일했다
  // (2026-11-20 사용자 선택 — 화살표 아이콘보다 뜻이 분명하다). 영문 페이지는 font='eng' 로 구분한다.
  const more = font === 'eng' ? 'View details →' : '자세히 보기 →'
  return (
    <Link
      to={to}
      className="group relative block overflow-hidden rounded-lg aspect-[4/3] bg-ink-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-amber-600"
    >
      {/*
        카드는 화면 아래쪽에 15장이 깔린다. lazy 를 빼면 허브에 들어서자마자 15장이
        한꺼번에 내려간다 — 썸네일을 쓰더라도 반드시 지연 로딩을 건다.
      */}
      <img
        src={image}
        alt={alt}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      {/*
        가운데(via)를 /40 까지 어둡게 둔다 — '자세히 보기 →' 한 줄이 늘며 제목이 위로 올라가,
        밝은 사진(광화문광장·전쟁기념관)에서 제목이 안 읽혔다(2026-11-20). ImageCard 와 같은 이유.
      */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-ink-900/90 via-ink-900/40 to-transparent"
        aria-hidden="true"
      />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <h3
          className={cn(
            'text-white text-lg lg:text-xl font-bold mb-1.5',
            font === 'eng' && 'font-eng',
          )}
        >
          {name}
        </h3>
        <p className="text-[13px] text-gray-300 leading-relaxed line-clamp-2">{tagline}</p>
        <span className="mt-3 self-start text-sm font-semibold text-white border-b border-white/50 pb-0.5 transition-colors group-hover:text-amber-500 group-hover:border-amber-500">
          {more}
        </span>
      </div>
    </Link>
  )
}
