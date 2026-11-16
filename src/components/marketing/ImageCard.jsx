// title 은 선택. 영문 eyebrow 만으로는 서비스 이름이 안 읽히는 카드(단체여행 섹션)에서 한글 이름을 얹는다.
export function ImageCard({ image, alt, eyebrow, title, description }) {
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
        {title && <h4 className="text-lg font-bold text-white mb-1">{title}</h4>}
        <p className="text-[15px] text-gray-200 leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
