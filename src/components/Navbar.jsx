import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Link } from 'react-router-dom'

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Portfolio', href: '#portfolio' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const handleNav = (href) => {
    setOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="h-16 flex items-center justify-between">
          <a href="#home" className="text-xl tracking-wide font-semibold text-neutral-900" onClick={(e)=>{e.preventDefault();handleNav('#home')}}>
            <span className="uppercase">Studio</span>
            <span className="mx-2 w-px h-4 inline-block align-middle bg-neutral-300" />
            <span className="text-neutral-500">Property</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-neutral-700">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e)=>{e.preventDefault();handleNav(item.href)}}
                className="hover:text-neutral-900 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <Link
              to="#portfolio"
              onClick={(e)=>{e.preventDefault();handleNav('#portfolio')}}
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
              <a
                key={item.label}
                href={item.href}
                onClick={(e)=>{e.preventDefault();handleNav(item.href)}}
                className="block text-neutral-800"
              >
                {item.label}
              </a>
            ))}
            <a
              href="#portfolio"
              onClick={(e)=>{e.preventDefault();handleNav('#portfolio')}}
              className="inline-flex items-center rounded-full border border-neutral-300 px-4 py-2 text-neutral-900"
            >
              View Work
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
