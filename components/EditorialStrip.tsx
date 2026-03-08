'use client'

export function EditorialStrip() {
  const categories = [
    { label: 'SS26 TEASER', index: 1 },
    { label: 'LOOKBOOK 01', index: 2 },
    { label: 'BEHIND', index: 3 },
    { label: 'ARCHIVE', index: 4 },
  ]

  return (
    <section className="relative w-full bg-charcoal py-12">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" />

      <div className="relative">
        {/* Horizontal scrollable images */}
        <div className="overflow-x-auto scrollbar-hide">
          <div className="flex gap-0.5 px-6 md:px-8 min-w-min">
            {categories.map((cat, i) => (
              <div key={i} className="flex flex-col gap-3 flex-shrink-0">
                {/* Image Placeholder */}
                <div className="w-72 h-72 bg-dark-grey flex items-center justify-center border border-charcoal cursor-pointer hover:bg-mid-grey/10 transition-colors">
                  <p className="text-mid-grey text-13 font-mono font-bold">IMAGE {cat.index}</p>
                </div>

                {/* Category Label */}
                <p className="text-10 font-mono font-bold tracking-widest text-light-grey">
                  {cat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  )
}
