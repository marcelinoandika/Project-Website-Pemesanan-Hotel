import { useState } from 'react'

function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false)

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen)
  }

  return (
    <header className="site-header" id="top">
      <div className="container header-inner">
        <a className="brand" href="#" aria-label="Beranda Serenity Hotel">
          <span className="brand-mark" aria-hidden="true">S</span>
          <span className="brand-name">Serenity Hotel</span>
        </a>
        <button 
          className="nav-toggle" 
          aria-label="Buka menu" 
          aria-expanded={isNavOpen}
          aria-controls="primary-nav"
          onClick={toggleNav}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
        <nav 
          id="primary-nav" 
          className={`nav ${isNavOpen ? 'open' : ''}`}
          aria-label="Navigasi utama"
        >
          <ul>
            <li><a href="#about" onClick={() => setIsNavOpen(false)}>Tentang</a></li>
            <li><a href="#rooms" onClick={() => setIsNavOpen(false)}>Kamar</a></li>
            <li><a href="#amenities" onClick={() => setIsNavOpen(false)}>Fasilitas</a></li>
            <li><a href="#gallery" onClick={() => setIsNavOpen(false)}>Galeri</a></li>
            <li><a href="#reviews" onClick={() => setIsNavOpen(false)}>Ulasan</a></li>
            <li><a className="btn btn-primary" href="#booking" onClick={() => setIsNavOpen(false)}>Pesan</a></li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header

