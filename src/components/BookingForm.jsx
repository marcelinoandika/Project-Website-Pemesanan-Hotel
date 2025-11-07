import { useState, useEffect } from 'react'

const ROOM_PRICES = {
  standard: 850000,
  deluxe: 1350000,
  suite: 2600000
}

function BookingForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    bCheckin: '',
    bCheckout: '',
    bGuests: '2',
    bRoomType: 'deluxe',
    requests: ''
  })

  const [errors, setErrors] = useState({})
  const [totalPrice, setTotalPrice] = useState(0)
  const [nights, setNights] = useState(0)

  // Calculate price whenever dates, room type, or guests change
  useEffect(() => {
    const ci = new Date(formData.bCheckin)
    const co = new Date(formData.bCheckout)
    
    if (!isNaN(ci) && !isNaN(co) && co > ci) {
      const ms = co - ci
      const calculatedNights = Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)))
      setNights(calculatedNights)
      
      const basePrice = ROOM_PRICES[formData.bRoomType] || 0
      const baseTotal = basePrice * calculatedNights
      
      const guests = Math.max(1, parseInt(formData.bGuests || '1', 10))
      const extraGuestFee = Math.max(0, guests - 2) * 150000 * calculatedNights
      
      const tax = 0.1 * (baseTotal + extraGuestFee)
      const finalTotal = baseTotal + extraGuestFee + tax
      
      setTotalPrice(finalTotal)
    } else {
      setNights(0)
      setTotalPrice(0)
    }
  }, [formData.bCheckin, formData.bCheckout, formData.bRoomType, formData.bGuests])

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount)
  }

  const validateEmail = (email) => {
    return /.+@.+\..+/.test(email)
  }

  const setError = (field, message) => {
    setErrors(prev => ({ ...prev, [field]: message }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setError(name, '')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let isValid = true
    const newErrors = {}

    // Validate name
    if (formData.name.trim().length < 3) {
      newErrors.name = 'Nama minimal 3 karakter'
      isValid = false
    }

    // Validate email
    if (!validateEmail(formData.email.trim())) {
      newErrors.email = 'Email tidak valid'
      isValid = false
    }

    // Validate dates
    const ci = new Date(formData.bCheckin)
    const co = new Date(formData.bCheckout)
    if (isNaN(ci) || isNaN(co) || co <= ci) {
      newErrors.bCheckin = 'Periksa tanggal'
      newErrors.bCheckout = 'Periksa tanggal'
      isValid = false
    }

    // Validate guests
    const guests = parseInt(formData.bGuests || '1', 10)
    if (!(guests >= 1 && guests <= 4)) {
      newErrors.bGuests = 'Tamu 1-4'
      isValid = false
    }

    setErrors(newErrors)

    if (!isValid) return

    // Success
    const summary = `Terima kasih, ${formData.name}! Permintaan pemesanan Anda telah diterima. Kami akan menghubungi ${formData.email} untuk konfirmasi.`
    alert(summary)
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      bCheckin: '',
      bCheckout: '',
      bGuests: '2',
      bRoomType: 'deluxe',
      requests: ''
    })
    setErrors({})
  }

  const roomTypeLabel = {
    standard: 'Standard',
    deluxe: 'Deluxe',
    suite: 'Suite'
  }

  return (
    <section id="booking" className="section cta">
      <div className="container grid-2">
        <div>
          <h2>Siap Memesan?</h2>
          <p>Hubungi kami atau isi formulir, tim kami akan konfirmasi dalam 15 menit.</p>
          <ul className="contact-list">
            <li>Telepon: <a href="tel:+62274123456">+62 274 123456</a></li>
            <li>Email: <a href="mailto:reservasi@serenityhotel.id">reservasi@serenityhotel.id</a></li>
            <li>Alamat: Jl. Bunga Anggrek No. 88, Yogyakarta</li>
          </ul>
        </div>
        <form id="bookingForm" className="card form" onSubmit={handleSubmit} noValidate>
          <h3>Formulir Pemesanan</h3>
          
          <div className="field">
            <label htmlFor="name">Nama Lengkap</label>
            <input 
              id="name" 
              name="name" 
              type="text" 
              required 
              placeholder="Nama Anda"
              value={formData.name}
              onChange={handleChange}
            />
            <small className="error">{errors.name || ''}</small>
          </div>
          
          <div className="field">
            <label htmlFor="email">Email</label>
            <input 
              id="email" 
              name="email" 
              type="email" 
              required 
              placeholder="nama@email.com"
              value={formData.email}
              onChange={handleChange}
            />
            <small className="error">{errors.email || ''}</small>
          </div>
          
          <div className="field grid-2c">
            <div>
              <label htmlFor="bCheckin">Check‑in</label>
              <input 
                id="bCheckin" 
                name="bCheckin" 
                type="date" 
                required 
                value={formData.bCheckin}
                onChange={handleChange}
              />
              <small className="error">{errors.bCheckin || ''}</small>
            </div>
            <div>
              <label htmlFor="bCheckout">Check‑out</label>
              <input 
                id="bCheckout" 
                name="bCheckout" 
                type="date" 
                required 
                value={formData.bCheckout}
                onChange={handleChange}
              />
              <small className="error">{errors.bCheckout || ''}</small>
            </div>
          </div>
          
          <div className="field grid-2c">
            <div>
              <label htmlFor="bGuests">Tamu</label>
              <input 
                id="bGuests" 
                name="bGuests" 
                type="number" 
                min="1" 
                max="4" 
                value={formData.bGuests}
                required
                onChange={handleChange}
              />
              <small className="error">{errors.bGuests || ''}</small>
            </div>
            <div>
              <label htmlFor="bRoomType">Tipe Kamar</label>
              <select 
                id="bRoomType" 
                name="bRoomType"
                value={formData.bRoomType}
                onChange={handleChange}
              >
                <option value="standard">Standard</option>
                <option value="deluxe">Deluxe</option>
                <option value="suite">Suite</option>
              </select>
            </div>
          </div>
          
          <div className="field">
            <label htmlFor="requests">Permintaan Khusus</label>
            <textarea 
              id="requests" 
              name="requests" 
              rows="3" 
              placeholder="Misal: kamar non‑smoking, lantai tinggi..."
              value={formData.requests}
              onChange={handleChange}
            />
          </div>
          
          {/* Price Display */}
          <div className="total" id="bookingTotal">
            {totalPrice > 0 ? (
              <div>
                <div style={{ marginBottom: '8px' }}>
                  <strong>Detail Harga:</strong>
                </div>
                <div style={{ fontSize: '14px', marginBottom: '4px', color: 'var(--muted)' }}>
                  Tipe Kamar: {roomTypeLabel[formData.bRoomType]} ({formatRupiah(ROOM_PRICES[formData.bRoomType])}/malam)
                </div>
                <div style={{ fontSize: '14px', marginBottom: '4px', color: 'var(--muted)' }}>
                  Durasi: {nights} malam
                </div>
                <div style={{ fontSize: '16px', marginTop: '8px', borderTop: '1px solid #334155', paddingTop: '8px' }}>
                  <strong>Total: {formatRupiah(totalPrice)}</strong>
                </div>
              </div>
            ) : (
              'Perkiraan: Rp 0'
            )}
          </div>
          
          <button type="submit" className="btn btn-primary">Kirim Pemesanan</button>
          <p className="muted">Dengan mengirim, Anda menyetujui kebijakan privasi kami.</p>
        </form>
      </div>
    </section>
  )
}

export default BookingForm

