export function ImageCard({ image, alt, eyebrow, description }) {
  return (
    <div className="group relative overflow-hidden rounded-lg aspect-[4/3] bg-ink-800">
      <img
        src={image}
        alt={alt}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/15 to-transparent" />
      <div className="absolute inset-0 p-6 flex flex-col justify-end">
        <span className="text-amber-500 font-eng font-bold text-sm mb-2 block tracking-wider">
          {eyebrow}
        </span>
        <p className="text-[15px] text-gray-200 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
