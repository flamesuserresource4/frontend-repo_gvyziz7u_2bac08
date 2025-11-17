export default function Services() {
  const services = [
    {
      title: 'Photography',
      desc: 'Precision-captured interiors and exteriors with natural light balance and architectural accuracy.',
      price: 'From €250',
    },
    {
      title: 'Videography',
      desc: 'Smooth walkthroughs, lifestyle cuts and cinematic edits to present properties with movement and mood.',
      price: 'From €400',
    },
    {
      title: 'Drone / Aerial',
      desc: 'Licensed aerial capture for establishing shots, context and premium perspectives.',
      price: 'From €180',
    },
    {
      title: 'Floorplans',
      desc: 'Accurate measured floorplans for listings and marketing materials.',
      price: 'From €120',
    },
    {
      title: 'Retouching',
      desc: 'Meticulous color work, perspective control, window pulls and sky replacements.',
      price: 'Included / On request',
    },
    {
      title: 'Agent & Airbnb Packages',
      desc: 'Bundled content for high-volume agents and hosts: photo, video, reels and floorplans.',
      price: 'Custom — Get a quote',
    },
  ]

  return (
    <section id="services" className="bg-neutral-50">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">Services</h2>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="rounded-xl border border-neutral-200 bg-white p-6 hover:shadow-sm transition-shadow">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-neutral-900">{s.title}</h3>
                <span className="text-[11px] tracking-wider uppercase text-amber-600/80">{s.price}</span>
              </div>
              <p className="mt-3 text-sm text-neutral-600 leading-relaxed">{s.desc}</p>
              <div className="mt-6">
                <a href="#contact" onClick={(e)=>{e.preventDefault();document.querySelector('#contact')?.scrollIntoView({behavior:'smooth'})}} className="inline-flex items-center rounded-full border border-neutral-300 px-4 py-2 text-neutral-900 hover:border-neutral-400 text-sm">Get a Quote</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
