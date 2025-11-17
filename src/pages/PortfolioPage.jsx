import { useEffect, useMemo, useState } from 'react'
import { Link, useParams, useSearchParams, useNavigate } from 'react-router-dom'

const CATEGORIES = [
  'Interiors',
  'Exteriors',
  'Drone / Aerial',
  'Architectural Details',
  'Commercial Spaces',
  'Short-Let & Airbnb',
]

const PAGE_SIZE = 18

export default function PortfolioPage(){
  const { category: routeCategory } = useParams()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const pageParam = parseInt(searchParams.get('page') || '1', 10)

  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [lightbox, setLightbox] = useState(null)

  const backend = import.meta.env.VITE_BACKEND_URL

  const activeCategory = useMemo(()=>{
    if(!routeCategory) return 'All'
    const decoded = decodeURIComponent(routeCategory)
    return CATEGORIES.includes(decoded) ? decoded : 'All'
  }, [routeCategory])

  useEffect(()=>{
    setLoading(true)
    setError(null)
    const params = new URLSearchParams()
    if(activeCategory !== 'All') params.set('category', activeCategory)
    params.set('page', String(pageParam))
    params.set('limit', String(PAGE_SIZE))
    fetch(`${backend}/api/portfolio?${params.toString()}`)
      .then(r=>{
        if(!r.ok) throw new Error('Failed to load portfolio')
        return r.json()
      })
      .then(data=>{
        setItems(data.items || [])
        setTotal(data.total || 0)
      })
      .catch(err=> setError(err.message))
      .finally(()=> setLoading(false))
  }, [backend, activeCategory, pageParam])

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE))

  const goToPage = (p)=>{
    const np = Math.min(totalPages, Math.max(1, p))
    setSearchParams(prev=>{
      const n = new URLSearchParams(prev)
      if(np === 1) n.delete('page'); else n.set('page', String(np))
      return n
    })
  }

  const setCategory = (cat)=>{
    const path = cat && cat !== 'All' ? `/portfolio/${encodeURIComponent(cat)}` : '/portfolio'
    navigate(path)
    setSearchParams(prev=>{
      const n = new URLSearchParams(prev)
      n.delete('page')
      return n
    })
  }

  return (
    <div className="pt-20 bg-white min-h-screen">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-end justify-between gap-4">
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">Portfolio</h1>
          <Link to="/" className="text-sm text-neutral-600 hover:text-neutral-900">Home</Link>
        </div>

        <div className="mt-6 flex gap-2 overflow-x-auto py-2">
          <button onClick={()=>setCategory('All')} className={`px-4 py-2 text-sm rounded-full border ${activeCategory==='All'?'border-neutral-900 text-neutral-900':'border-neutral-300 text-neutral-600'} whitespace-nowrap`}>All</button>
          {CATEGORIES.map(c=> (
            <button key={c} onClick={()=>setCategory(c)} className={`px-4 py-2 text-sm rounded-full border ${activeCategory===c?'border-neutral-900 text-neutral-900':'border-neutral-300 text-neutral-600'} whitespace-nowrap`}>
              {c}
            </button>
          ))}
        </div>

        {loading && (
          <div className="mt-16 text-neutral-500">Loading…</div>
        )}
        {error && (
          <div className="mt-16 text-red-600">{error}</div>
        )}

        {!loading && !error && (
          <div className="mt-8">
            {items.length === 0 ? (
              <div className="text-neutral-500">No work added yet. Use the admin upload to add your portfolio.</div>
            ) : (
              <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 [column-fill:_balance] *:mb-6">
                {items.map(img => (
                  <figure key={img.id} className="relative overflow-hidden rounded-lg border border-neutral-200 group cursor-pointer" onClick={() => setLightbox(img)}>
                    <img src={img.src} alt={img.caption || img.title || 'Portfolio'} className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500" />
                    {(img.caption || img.category) && (
                      <figcaption className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/50 to-transparent text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        {img.caption || img.category}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            )}

            {totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-2">
                <button onClick={()=>goToPage(pageParam-1)} disabled={pageParam<=1} className="px-3 py-1 rounded-full border border-neutral-300 disabled:opacity-40">Prev</button>
                <div className="text-sm text-neutral-600">Page {pageParam} of {totalPages}</div>
                <button onClick={()=>goToPage(pageParam+1)} disabled={pageParam>=totalPages} className="px-3 py-1 rounded-full border border-neutral-300 disabled:opacity-40">Next</button>
              </div>
            )}
          </div>
        )}
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
    </div>
  )
}
