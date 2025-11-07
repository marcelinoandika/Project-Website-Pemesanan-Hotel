const reviews = [
  {
    quote: 'Pelayanan terbaik yang pernah saya rasakan. Kamar bersih, sarapan enak!',
    author: 'Rani, ⭐⭐⭐⭐⭐'
  },
  {
    quote: 'Lokasi strategis, fasilitas lengkap. Bakal balik lagi kalau ke kota ini.',
    author: 'Andi, ⭐⭐⭐⭐⭐'
  },
  {
    quote: 'Spa dan kolamnya juara. Cocok buat liburan santai.',
    author: 'Mei, ⭐⭐⭐⭐⭐'
  }
]

function Reviews() {
  return (
    <section id="reviews" className="section">
      <div className="container">
        <header className="section-header">
          <h2>Ulasan Tamu</h2>
          <p>Suara jujur dari mereka yang sudah menginap.</p>
        </header>
        <div className="reviews">
          {reviews.map((review, index) => (
            <figure key={index} className="review">
              <blockquote>{review.quote}</blockquote>
              <figcaption>— {review.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Reviews

