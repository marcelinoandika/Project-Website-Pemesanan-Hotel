import { useEffect } from 'react'

function Footer() {
  useEffect(() => {
    const year = new Date().getFullYear()
    const yearEl = document.getElementById('year')
    if (yearEl) {
      yearEl.textContent = year
    }
  }, [])

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <a className="brand" href="#top">
            <span className="brand-mark">S</span>
            <span className="brand-name">Serenity Hotel</span>
          </a>
          <p className="muted">Pengalaman menginap premium sejak 2010.</p>
        </div>
        <nav aria-label="Footer">
          <ul>
            <li><a href="#about">Tentang</a></li>
            <li><a href="#rooms">Kamar</a></li>
            <li><a href="#amenities">Fasilitas</a></li>
            <li><a href="#gallery">Galeri</a></li>
            <li><a href="#reviews">Ulasan</a></li>
          </ul>
        </nav>
        <div className="social">
          <a href="#" aria-label="Instagram">📸</a>
          <a href="#" aria-label="Facebook">📘</a>
          <a href="#" aria-label="X">𝕏</a>
        </div>
      </div>
      <div className="container legal">
        <small>© <span id="year"></span> Serenity Hotel & Spa. All rights reserved.</small>
      </div>
    </footer>
  )
}

export default Footer

