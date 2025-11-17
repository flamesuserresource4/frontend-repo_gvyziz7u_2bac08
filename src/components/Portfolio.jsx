import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { BRAND } from '../brand'

const CATEGORIES = [
  'Interiors',
  'Exteriors',
  'Drone / Aerial',
  'Architectural Details',
  'Commercial Spaces',
  'Short-Let & Airbnb',
]

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const backend = import.meta.env.VITE_BACKEND_URL

  useEffect(()=>{
    setLoading(true)
    const params = new URLSearchParams()
    if(active !== 'All') params.set('category', active)
    params.set('limit', '12')
    fetch(`${backend}/api/portfolio?${params.toString()}`)
      .then(r=>r.json())
      .then(data=> setItems(data.items || []))
      .finally(()=> setLoading(false))
  }, [backend, active])

  return (
    <section id="portfolio" className="relative bg-white">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold heading-font tracking-tight text-[#111111]">Portfolio</h2>
          <div className="flex gap-2 overflow-x-auto py-2">
            <button onClick={() => setActive('All')} className={`px-4 py-2 text-sm rounded-full border ${active==='All'? BRAND.colors.chipActive : BRAND.colors.chip} whitespace-nowrap`}>All</button>
            {CATEGORIES.map((c) => (
              <button key={c} onClick={() => setActive(c)} className={`px-4 py-2 text-sm rounded-full border ${active===c? BRAND.colors.chipActive : BRAND.colors.chip} whitespace-nowrap`}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading && <div className="mt-8 text-neutral-500">Loading…</div>}

        {!loading && (
          <div className="mt-10 columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance] *:mb-6">
            {items.map((img) => (
              <figure key={img.id} className="relative overflow-hidden rounded-lg border border-neutral-200 group cursor-pointer" onClick={() => setLightbox(img)}>
                <img src={img.src} alt={img.caption || 'Portfolio'} className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500" />
                {(img.caption || img.category) && (
                  <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 to-transparent text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">{img.caption || img.category}</figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        <div className="mt-10 flex justify-center">
          <Link to="/portfolio" className={`inline-flex items-center rounded-full border px-6 py-3 ${BRAND.colors.accentBorder} text-[#111111] hover:opacity-90`}>Explore Full Portfolio</Link>
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
