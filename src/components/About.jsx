export default function About() {
  return (
    <section id="about" className="bg-white">
      <div className="mx-auto max-w-5xl px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div className="aspect-[3/4] rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=1000&q=80"
            alt="Portrait"
          />
        </div>
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900">About</h2>
          <p className="mt-6 text-neutral-700 leading-relaxed">
            I am a property photographer and videographer working with leading real-estate brands, architects and luxury rental hosts.
            My approach is precise and calm—balancing light, geometry and material to communicate clarity, scale and atmosphere.
          </p>
          <p className="mt-4 text-neutral-700 leading-relaxed">
            With experience across penthouses, heritage buildings and contemporary developments, I deliver consistent, premium visuals that move listings and elevate portfolios.
          </p>
          <div className="mt-6 text-sm text-neutral-600">
            Available for commissions across Malta.
          </div>
        </div>
      </div>
    </section>
  )
}
