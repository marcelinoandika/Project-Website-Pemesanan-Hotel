import { useState } from 'react'

function AvailabilityForm() {
  const [result, setResult] = useState('')
  const [formData, setFormData] = useState({
    checkin: '',
    checkout: '',
    guests: '2',
    roomType: 'deluxe'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const ci = new Date(formData.checkin)
    const co = new Date(formData.checkout)
    
    if (!(ci instanceof Date) || !(co instanceof Date) || isNaN(ci) || isNaN(co)) {
      setResult('Tanggal tidak valid.')
      return
    }
    
    if (co <= ci) {
      setResult('Check‑out harus setelah check‑in.')
      return
    }
    
    setResult('Kamar tersedia! Lanjutkan pemesanan di bawah.')
    
    // Scroll to booking form
    document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <form id="availabilityForm" className="availability" aria-label="Cek ketersediaan" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="checkin">Check‑in</label>
        <input 
          id="checkin" 
          name="checkin" 
          type="date" 
          required 
          value={formData.checkin}
          onChange={(e) => setFormData({ ...formData, checkin: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="checkout">Check‑out</label>
        <input 
          id="checkout" 
          name="checkout" 
          type="date" 
          required 
          value={formData.checkout}
          onChange={(e) => setFormData({ ...formData, checkout: e.target.value })}
        />
      </div>
      <div className="field">
        <label htmlFor="guests">Tamu</label>
        <select 
          id="guests" 
          name="guests"
          value={formData.guests}
          onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>
      <div className="field">
        <label htmlFor="roomType">Tipe Kamar</label>
        <select 
          id="roomType" 
          name="roomType"
          value={formData.roomType}
          onChange={(e) => setFormData({ ...formData, roomType: e.target.value })}
        >
          <option value="standard">Standard</option>
          <option value="deluxe">Deluxe</option>
          <option value="suite">Suite</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary">Cek</button>
      {result && (
        <output 
          id="availabilityResult" 
          role="status" 
          aria-live="polite"
          style={{ color: result.includes('tersedia') ? '#10b981' : '#ef4444' }}
        >
          {result}
        </output>
      )}
    </form>
  )
}

export default AvailabilityForm

