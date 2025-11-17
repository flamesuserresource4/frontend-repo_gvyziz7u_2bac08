export default function Footer(){
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-7xl px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-600">
        <p>© {new Date().getFullYear()} Studio Property</p>
        <p className="tracking-wide uppercase text-[11px] text-amber-700/70">Refined imagery for real estate</p>
      </div>
    </footer>
  )
}
