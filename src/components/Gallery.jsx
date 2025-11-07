import { useState, useRef, useEffect } from 'react'

const galleryImages = [
  { src: '/Assets/pexels-pixabay-271643.jpg', alt: 'Area lobi hotel' },
  { src: '/Assets/pexels-michael-block-1691617-3225531.jpg', alt: 'Kolam renang hotel malam' },
  { src: '/Assets/pexels-pixabay-271619.jpg', alt: 'Restoran hotel' },
  { src: '/Assets/pexels-pixabay-277572.jpg', alt: 'Kamar suite hotel' },
  { src: '/Assets/pexels-pixabay-260922.jpg', alt: 'Area lounge hotel' },
  { src: '/Assets/pexels-pixabay-261102.jpg', alt: 'Koridor hotel elegan' }
]

function Gallery() {
  const [activeIndex, setActiveIndex] = useState(0)
  const trackRef = useRef(null)
  const [isDown, setIsDown] = useState(false)
  const [startX, setStartX] = useState(0)
  const [startScroll, setStartScroll] = useState(0)
  const [hasMoved, setHasMoved] = useState(false)

  const scrollBy = () => trackRef.current?.clientWidth * 0.9 || 0

  const scrollToIndex = (index) => {
    const items = trackRef.current?.querySelectorAll('img')
    if (!items || !items[index]) return
    items[index].scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
  }

  const handlePrev = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: -scrollBy(), behavior: 'smooth' })
    }
  }

  const handleNext = () => {
    if (trackRef.current) {
      trackRef.current.scrollBy({ left: scrollBy(), behavior: 'smooth' })
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      handlePrev()
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      handleNext()
    }
  }

  const onPointerDown = (e) => {
    setIsDown(true)
    setHasMoved(false)
    setStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0)
    setStartScroll(trackRef.current?.scrollLeft || 0)
    if (trackRef.current?.setPointerCapture) {
      trackRef.current.setPointerCapture(e.pointerId || 0)
    }
  }

  const onPointerMove = (e) => {
    if (!isDown || !trackRef.current) return
    const x = e.clientX || (e.touches && e.touches[0].clientX) || 0
    const dx = x - startX
    if (Math.abs(dx) > 2) setHasMoved(true)
    trackRef.current.scrollLeft = startScroll - dx
  }

  const onPointerUp = () => {
    if (!isDown) return
    setIsDown(false)
    if (hasMoved && trackRef.current) {
      const items = Array.from(trackRef.current.querySelectorAll('img'))
      const left = trackRef.current.scrollLeft
      let bestIdx = 0
      let bestDist = Infinity
      items.forEach((el, i) => {
        const dist = Math.abs(el.offsetLeft - left)
        if (dist < bestDist) {
          bestDist = dist
          bestIdx = i
        }
      })
      scrollToIndex(bestIdx)
    }
  }

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    track.addEventListener('pointerdown', onPointerDown)
    track.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerup', onPointerUp)
    track.addEventListener('touchstart', onPointerDown, { passive: true })
    track.addEventListener('touchmove', onPointerMove, { passive: true })
    track.addEventListener('touchend', onPointerUp)

    const updateActiveIndex = () => {
      const items = Array.from(track.querySelectorAll('img'))
      const center = track.scrollLeft + track.clientWidth / 2
      let bestIdx = 0
      let bestDist = Infinity
      items.forEach((el, i) => {
        const elCenter = el.offsetLeft + el.clientWidth / 2
        const dist = Math.abs(elCenter - center)
        if (dist < bestDist) {
          bestDist = dist
          bestIdx = i
        }
      })
      setActiveIndex(bestIdx)
    }

    track.addEventListener('scroll', updateActiveIndex)
    updateActiveIndex()

    return () => {
      track.removeEventListener('pointerdown', onPointerDown)
      track.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerup', onPointerUp)
      track.removeEventListener('touchstart', onPointerDown)
      track.removeEventListener('touchmove', onPointerMove)
      track.removeEventListener('touchend', onPointerUp)
      track.removeEventListener('scroll', updateActiveIndex)
    }
  }, [isDown, startX, startScroll, hasMoved])

  return (
    <section id="gallery" className="section alt">
      <div className="container">
        <header className="section-header">
          <h2>Galeri</h2>
          <p>Sekilas suasana di Serenity Hotel & Spa.</p>
        </header>
        <div 
          className="carousel" 
          data-carousel
          tabIndex={0}
          onKeyDown={handleKeyDown}
        >
          <button 
            className="car-btn prev" 
            aria-label="Sebelumnya"
            onClick={handlePrev}
          >
            ❮
          </button>
          <div className="car-track" ref={trackRef}>
            {galleryImages.map((img, index) => (
              <img 
                key={index}
                loading="lazy" 
                decoding="async" 
                src={img.src} 
                alt={img.alt} 
              />
            ))}
          </div>
          <button 
            className="car-btn next" 
            aria-label="Berikutnya"
            onClick={handleNext}
          >
            ❯
          </button>
          <div className="car-dots" role="tablist">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                className="car-dot"
                type="button"
                role="tab"
                aria-label={`Slide ${index + 1}`}
                aria-selected={index === activeIndex}
                onClick={() => scrollToIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Gallery

