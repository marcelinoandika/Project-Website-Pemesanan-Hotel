function About() {
  return (
    <section id="about" className="section">
      <div className="container grid-2">
        <div>
          <h2>Tentang Serenity</h2>
          <p>Serenity Hotel & Spa menghadirkan kombinasi desain modern dan keramahan khas Indonesia. Dengan lokasi strategis, Anda mudah menjangkau pusat bisnis, hiburan, dan budaya.</p>
          <ul className="checklist">
            <li>150+ kamar elegan dengan pemandangan kota</li>
            <li>Restoran fine dining & bar kopi artisan</li>
            <li>Spa, gym, dan kolam renang infinity</li>
            <li>Ruang pertemuan hingga 400 tamu</li>
          </ul>
        </div>
        <div className="about-media">
          <div className="media-card">
            <img src="/Assets/pexels-quark-studio-1159039-2507007.jpg" alt="Lobi hotel mewah" loading="lazy" decoding="async" />
          </div>
          <div className="media-card">
            <img src="/Assets/pexels-kelly-2869215.jpg" alt="Restoran fine dining" loading="lazy" decoding="async" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default About

