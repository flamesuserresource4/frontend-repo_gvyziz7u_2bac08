import { useState } from 'react'

const categories = [
  'Interiors',
  'Exteriors',
  'Drone / Aerial',
  'Architectural Details',
  'Commercial Spaces',
  'Short-Let & Airbnb',
]

const sampleImages = Array.from({ length: 18 }).map((_, i) => ({
  id: i + 1,
  src: `https://images.unsplash.com/photo-${
    [
      '1505691723518-36a5ac3b2c5a',
      '1494526585095-c41746248156',
      '1493809842364-78817add7ffb',
      '1501183638710-841dd1904471',
      '1522708323590-d24dbb6b0267',
      '1499951360447-b19be8fe80f5',
      '1502672023488-70e25813eb80',
      '1507086182422-97bd7ca241d3',
      '1496307042754-b4aa456c4a2d',
      '1494526585095-c41746248156',
      '1554995207-c18c203602cb',
      '1522708323590-d24dbb6b0267',
      '1554995207-4e76ffe9b223',
      '1505691723518-36a5ac3b2c5a',
      '1501183638710-841dd1904471',
      '1554995207-84cb69c5266b',
      '1554995207-1e17c5d79b71',
      '1493809842364-78817add7ffb',
    ][i % 18]
  }?auto=format&fit=crop&w=1600&q=80`,
  category: categories[i % categories.length],
  caption: 'Elegant space and clean lines',
}))

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null)

  const filtered = active === 'All' ? sampleImages : sampleImages.filter((img) => img.category === active)

  return (
    <section id="portfolio" className="relative bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">Portfolio</h2>
          <div className="flex gap-2 overflow-x-auto py-2">
            <button onClick={() => setActive('All')} className={`px-4 py-2 text-sm rounded-full border ${active==='All'?'border-neutral-800 text-neutral-900':'border-neutral-300 text-neutral-600'} whitespace-nowrap`}>All</button>
            {categories.map((c) => (
              <button key={c} onClick={() => setActive(c)} className={`px-4 py-2 text-sm rounded-full border ${active===c?'border-neutral-800 text-neutral-900':'border-neutral-300 text-neutral-600'} whitespace-nowrap`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance]
        *:mb-6">
          {filtered.map((img) => (
            <figure key={img.id} className="relative overflow-hidden rounded-lg border border-neutral-200 group cursor-pointer" onClick={() => setLightbox(img)}>
              <img src={img.src} alt="Portfolio" className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500" />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 to-transparent text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>

      {lightbox && (
        <div className="fixed inset-0 z-[60] bg-black/80 flex items-center justify-center p-6" onClick={() => setLightbox(null)}>
          <div className="max-w-5xl w-full" onClick={(e)=>e.stopPropagation()}>
            <img src={lightbox.src} alt="Large view" className="w-full h-auto rounded-md" />
            <div className="mt-3 flex items-center justify-between text-white/90 text-sm">
              <span>{lightbox.category}</span>
              <span>{lightbox.caption}</span>
              <button className="px-3 py-1 rounded-full border border-white/40" onClick={() => setLightbox(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
