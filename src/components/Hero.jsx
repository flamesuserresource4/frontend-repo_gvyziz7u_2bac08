import Spline from '@splinetool/react-spline'

export default function Hero() {
  return (
    <section id="home" className="relative h-[90vh] md:h-[92vh]">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/1VHYoewWfi45VYZ5/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-white/10 pointer-events-none" />
      <div className="relative z-10 h-full flex items-end">
        <div className="mx-auto w-full max-w-7xl px-6 pb-16">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-5xl leading-tight tracking-tight font-semibold text-neutral-900">
              Property Photography for Luxury Real Estate
            </h1>
            <p className="mt-4 text-neutral-600 max-w-xl">
              Capturing clarity, space, and atmosphere.
            </p>
            <div className="mt-8">
              <a href="#portfolio" onClick={(e)=>{e.preventDefault();document.querySelector('#portfolio')?.scrollIntoView({behavior:'smooth'})}} className="inline-flex items-center rounded-full border border-neutral-300 px-6 py-3 text-neutral-900 hover:border-neutral-400">
                View Portfolio
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
