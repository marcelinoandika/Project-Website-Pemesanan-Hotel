import { useEffect, useRef } from 'react'

function RoomModal({ isOpen, data, onClose }) {
  const modalRef = useRef(null)
  const lastFocusedRef = useRef(null)

  useEffect(() => {
    if (isOpen && modalRef.current) {
      lastFocusedRef.current = document.activeElement
      const focusable = modalRef.current.querySelectorAll(
        'a, button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
      if (focusable.length > 0) {
        focusable[0].focus()
      }
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      if (lastFocusedRef.current && typeof lastFocusedRef.current.focus === 'function') {
        lastFocusedRef.current.focus()
      }
    }
  }, [isOpen])

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    const handleClickOutside = (e) => {
      if (modalRef.current && e.target === modalRef.current.querySelector('.modal-backdrop')) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen, onClose])

  if (!isOpen || !data) return null

  return (
    <div 
      className="modal" 
      id="roomModal" 
      role="dialog" 
      aria-modal="true" 
      aria-labelledby="roomTitle"
      ref={modalRef}
    >
      <div className="modal-backdrop" onClick={onClose}></div>
      <div className="modal-dialog">
        <button 
          className="modal-close" 
          aria-label="Tutup" 
          onClick={onClose}
        >
          ✕
        </button>
        <h3 id="roomTitle">Detail Kamar</h3>
        <div id="roomContent" className="modal-content">
          <div className="stack">
            <p><strong>Tipe:</strong> {data.type}</p>
            <p><strong>Ukuran:</strong> {data.size}</p>
            <p><strong>Ranjang:</strong> {data.bed}</p>
            <p><strong>Fasilitas:</strong></p>
            <ul>
              {data.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomModal

