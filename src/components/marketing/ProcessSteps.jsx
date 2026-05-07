export function ProcessSteps({ steps }) {
  // Connector line offsets (top-5/7, left-5/7, right-5/7) are half the circle
  // size so the line meets the centers of the first and last circles.
  // mobile: w-10 (2.5rem) → half = 1.25rem = `5`
  // md+:   w-14 (3.5rem) → half = 1.75rem = `7`
  // If you change the circle size, update all three (top/left/right) at both
  // breakpoints together.
  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="absolute top-5 md:top-7 left-5 right-5 md:left-7 md:right-7 h-px bg-white/10 z-0" />
      <div className="flex flex-row justify-between items-start relative z-10">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center group">
            <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-brand-green border-4 border-ink-800 flex items-center justify-center font-eng font-bold text-sm md:text-lg mb-2 md:mb-4 group-hover:bg-brand-blue transition-colors">
              {idx + 1}
            </div>
            <span className="text-xs md:text-[15px] font-medium text-gray-400">{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
