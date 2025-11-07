import { useState, useEffect } from 'react'

function ScrollToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 600)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button 
      className={`to-top ${show ? 'show' : ''}`}
      aria-label="Kembali ke atas"
      onClick={scrollToTop}
    >
      ↑
    </button>
  )
}

export default ScrollToTop

