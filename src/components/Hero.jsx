import { useState, useEffect, useRef } from 'react'
import AvailabilityForm from './AvailabilityForm'

function Hero() {
  const [slideIndex, setSlideIndex] = useState(0)
  const slides = [
    { video: '/Assets/3554219-hd_1920_1080_24fps.mp4', label: 'Video suasana hotel 1' },
    { video: '/Assets/4185240-hd_1920_1080_25fps.mp4', label: 'Video suasana hotel 2' }
  ]
  const videoRefs = useRef([])

  useEffect(() => {
    const prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced || slides.length <= 1) return

    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length)
    }, 7000)

    return () => clearInterval(interval)
  }, [slides.length])

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video) {
        if (index === slideIndex) {
          video.play().catch(() => {})
        } else {
          video.pause()
          video.currentTime = 0
        }
      }
    })
  }, [slideIndex])

  return (
    <section className="hero" aria-label="Sorotan">
      <div className="hero-slider">
        {slides.map((slide, index) => (
          <div 
            key={index}
            className={`slide ${index === slideIndex ? 'active' : ''}`}
          >
            <video 
              ref={(el) => videoRefs.current[index] = el}
              className="hero-video" 
              src={slide.video} 
              muted 
              loop 
              playsInline 
              preload="metadata" 
              aria-label={slide.label}
            />
          </div>
        ))}
      </div>
      <div className="container hero-content">
        <h1>Elegan, Nyaman, dan Tak Terlupakan</h1>
        <p>Rasakan pengalaman menginap yang sempurna di jantung kota. Pelayanan hangat, fasilitas lengkap, dan suasana menenangkan.</p>
        <a className="btn btn-light" href="#rooms">Jelajahi Kamar</a>
      </div>
      <AvailabilityForm />
    </section>
  )
}

export default Hero

