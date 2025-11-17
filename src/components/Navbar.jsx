import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { BRAND } from '../brand'

const navItems = [
  { label: 'Home', href: '#home', type: 'hash' },
  { label: 'Portfolio', href: '/portfolio', type: 'route' },
  { label: 'Services', href: '#services', type: 'hash' },
  { label: 'About', href: '#about', type: 'hash' },
  { label: 'Contact', href: '#contact', type: 'hash' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  const handleNav = (href) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const onHome = location.pathname === '/'

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-16 flex items-center justify-between">
          <Link to="/" className="text-xl tracking-wide font-semibold text-neutral-900">
            {BRAND.logoUrl ? (
              <img src={BRAND.logoUrl} alt={BRAND.name} className="h-6" />
            ) : (
              <span className="uppercase">{BRAND.name}</span>
            )}
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-700">
            {navItems.map((item) => (
              item.type === 'route' ? (
                <Link
                  key={item.label}
                  to={item.href}
                  className="hover:text-neutral-900 transition-colors"
                >
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e)=>{ if(!onHome){ return } e.preventDefault(); handleNav(item.href) }}
                  className={`hover:text-neutral-900 transition-colors ${!onHome ? 'pointer-events-none opacity-50' : ''}`}
                >
                  {item.label}
                </a>
              )
            ))}
            <Link
              to="/portfolio"
              className="ml-2 inline-flex items-center rounded-full border border-neutral-300 px-4 py-2 text-neutral-900 hover:border-neutral-400"
            >
              View Work
            </Link>
          </nav>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-neutral-200 bg-white">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              item.type === 'route' ? (
                <Link key={item.label} to={item.href} onClick={()=>setOpen(false)} className="block text-neutral-800">
                  {item.label}
                </Link>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e)=>{ if(!onHome){ return } e.preventDefault(); handleNav(item.href) }}
                  className={`block text-neutral-800 ${!onHome ? 'pointer-events-none opacity-50' : ''}`}
                >
                  {item.label}
                </a>
              )
            ))}
            <Link
              to="/portfolio"
              onClick={()=>setOpen(false)}
              className="inline-flex items-center rounded-full border border-neutral-300 px-4 py-2 text-neutral-900"
            >
              View Work
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
