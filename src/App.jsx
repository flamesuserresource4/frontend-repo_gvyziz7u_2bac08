import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Portfolio from './components/Portfolio'
import Services from './components/Services'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BrandProvider from './components/BrandProvider'
import { Link } from 'react-router-dom'

function App() {
  return (
    <BrandProvider>
      <Navbar />
      <main>
        <Hero />
        <Portfolio />
        <div className="mx-auto max-w-7xl px-6 -mt-6 mb-10">
          <Link to="/portfolio" className="inline-flex items-center rounded-full border border-neutral-300 px-6 py-3 text-neutral-900 hover:border-neutral-400">Explore Full Portfolio</Link>
        </div>
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </BrandProvider>
  )
}

export default App
