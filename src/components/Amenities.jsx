const amenities = [
  { icon: '🛏️', text: 'Tempat tidur premium' },
  { icon: '📶', text: 'Wi‑Fi super cepat' },
  { icon: '🏊', text: 'Kolam renang infinity' },
  { icon: '🧖', text: 'Spa & sauna' },
  { icon: '🏋️', text: 'Gym 24 jam' },
  { icon: '🍽️', text: 'Restoran fine dining' },
  { icon: '🚗', text: 'Parkir gratis' },
  { icon: '🧳', text: 'Penitipan bagasi' }
]

function Amenities() {
  return (
    <section id="amenities" className="section">
      <div className="container">
        <header className="section-header">
          <h2>Fasilitas Unggulan</h2>
          <p>Kami merancang setiap detail untuk kenyamanan Anda.</p>
        </header>
        <ul className="amenities-grid">
          {amenities.map((amenity, index) => (
            <li key={index}>
              <span className="ico">{amenity.icon}</span>
              {amenity.text}
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Amenities

