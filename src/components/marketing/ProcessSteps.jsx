export function ProcessSteps({ steps }) {
  return (
    <div className="relative max-w-4xl mx-auto">
      <div className="hidden md:block absolute top-[28px] left-7 right-7 h-px bg-white/10 z-0" />
      <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0 relative z-10">
        {steps.map((step, idx) => (
          <div key={idx} className="flex flex-col items-center group">
            <div className="w-14 h-14 rounded-full bg-brand-green border-4 border-ink-800 flex items-center justify-center font-eng font-bold text-lg mb-4 group-hover:bg-brand-blue transition-colors">
              {idx + 1}
            </div>
            <span className="text-[15px] font-medium text-gray-400">{step}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
