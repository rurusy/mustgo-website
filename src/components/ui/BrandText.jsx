// Renders the "Mustgo" wordmark with the M (green) and g (blue) accents.
// Used inside headings and prose throughout the marketing site.
export function BrandText({ className }) {
  return (
    <span className={className}>
      <span className="text-brand-green">M</span>
      ust
      <span className="text-brand-blue">g</span>
      o
    </span>
  )
}
