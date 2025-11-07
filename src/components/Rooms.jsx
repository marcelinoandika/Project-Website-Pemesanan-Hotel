import { useState } from 'react'

const rooms = [
  {
    type: 'standard',
    title: 'Standard Room',
    description: 'Kenyamanan esensial dengan desain bersih dan hangat.',
    price: 'Rp 850.000 / malam',
    meta: '18 m² • 1 Queen • Kota',
    image: '/Assets/pexels-ashleyelena-705773.jpg',
    imageAlt: 'Kamar standard queen minimalis',
    details: {
      type: 'Standard',
      amenities: ['Wi‑Fi', 'Smart TV', 'Breakfast'],
      size: '18 m²',
      bed: 'Queen'
    }
  },
  {
    type: 'deluxe',
    title: 'Deluxe Room',
    description: 'Lebih lega dengan balkon pribadi dan pemandangan menawan.',
    price: 'Rp 1.350.000 / malam',
    meta: '26 m² • 1 King • Kota/Taman',
    image: '/Assets/pexels-anasjawed-1697076.jpg',
    imageAlt: 'Kamar deluxe king dengan balkon',
    details: {
      type: 'Deluxe',
      amenities: ['Wi‑Fi', 'Smart TV', 'Breakfast', 'Balkon'],
      size: '26 m²',
      bed: 'King'
    }
  },
  {
    type: 'suite',
    title: 'Executive Suite',
    description: 'Ruang tamu terpisah, bathtub marmer, dan layanan istimewa.',
    price: 'Rp 2.600.000 / malam',
    meta: '45 m² • 1 King • Kota',
    image: '/Assets/pexels-thelazyartist-1488515.jpg',
    imageAlt: 'Executive suite dengan ruang tamu',
    details: {
      type: 'Suite',
      amenities: ['Wi‑Fi', 'Smart TV', 'Breakfast', 'Bathtub'],
      size: '45 m²',
      bed: 'King'
    }
  }
]

function Rooms({ onRoomDetail }) {
  const [activeFilter, setActiveFilter] = useState('all')

  const filteredRooms = activeFilter === 'all' 
    ? rooms 
    : rooms.filter(room => room.type === activeFilter)

  return (
    <section id="rooms" className="section alt">
      <div className="container">
        <header className="section-header">
          <h2>Pilihan Kamar</h2>
          <p>Pilih ruang yang paling cocok untuk perjalanan Anda.</p>
        </header>
        <div className="filters">
          <button 
            className={`chip ${activeFilter === 'all' ? 'active' : ''}`}
            onClick={() => setActiveFilter('all')}
            aria-pressed={activeFilter === 'all'}
          >
            Semua
          </button>
          <button 
            className={`chip ${activeFilter === 'standard' ? 'active' : ''}`}
            onClick={() => setActiveFilter('standard')}
            aria-pressed={activeFilter === 'standard'}
          >
            Standard
          </button>
          <button 
            className={`chip ${activeFilter === 'deluxe' ? 'active' : ''}`}
            onClick={() => setActiveFilter('deluxe')}
            aria-pressed={activeFilter === 'deluxe'}
          >
            Deluxe
          </button>
          <button 
            className={`chip ${activeFilter === 'suite' ? 'active' : ''}`}
            onClick={() => setActiveFilter('suite')}
            aria-pressed={activeFilter === 'suite'}
          >
            Suite
          </button>
        </div>
        <div className="cards">
          {filteredRooms.map((room, index) => (
            <article key={index} className="card" data-type={room.type}>
              <div className="card-media">
                <img 
                  src={room.image} 
                  alt={room.imageAlt} 
                  loading="lazy" 
                  decoding="async" 
                />
              </div>
              <div className="card-body">
                <h3>{room.title}</h3>
                <p>{room.description}</p>
                <div className="price">{room.price}</div>
                <div className="meta">{room.meta}</div>
                <div className="actions">
                  <button 
                    className="btn btn-outline" 
                    onClick={() => onRoomDetail(room.details)}
                  >
                    Detail
                  </button>
                  <a href="#booking" className="btn btn-primary">Pesan</a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Rooms

