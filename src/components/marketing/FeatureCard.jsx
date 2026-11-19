import { Fade, IconBadge } from '../ui'
import { cn } from '../../design/cn'

// layout
//   stacked — 아이콘 위, 제목 아래(기본값)
//   inline  — 아이콘 옆에 제목. 홈 About 의 '세 가지 이유'가 쓴다: 메뉴로 About 에 왔을 때
//             아이콘(약 64px)이 제목을 첫 화면 아래로 밀어내 제목이 안 보였다(2026-11-20 지적).
const layouts = {
  stacked: { head: '', badge: 'mb-6', title: 'mb-4' },
  inline: { head: 'flex items-center gap-4 mb-4', badge: '', title: '' },
}

export function FeatureCard({ icon, title, description, delay = 0, badgeTone = 'blueSoft', layout = 'stacked' }) {
  const l = layouts[layout]
  return (
    <Fade delay={delay}>
      <div className={l.head}>
        <IconBadge tone={badgeTone} className={l.badge}>
          {icon}
        </IconBadge>
        <h4 className={cn('text-xl font-bold text-gray-900', l.title)}>{title}</h4>
      </div>
      <p className="text-gray-600 leading-relaxed text-[15px]">{description}</p>
    </Fade>
  )
}
