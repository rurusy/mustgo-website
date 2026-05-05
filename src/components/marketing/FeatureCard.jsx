import { Fade, IconBadge } from '../ui'

export function FeatureCard({ icon, title, description, delay = 0, badgeTone = 'blueSoft' }) {
  return (
    <Fade delay={delay}>
      <IconBadge tone={badgeTone} className="mb-6">
        {icon}
      </IconBadge>
      <h4 className="text-xl font-bold text-gray-900 mb-4">{title}</h4>
      <p className="text-gray-600 leading-relaxed text-[15px]">{description}</p>
    </Fade>
  )
}
