import { useState, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import About from './components/About'
import Rooms from './components/Rooms'
import Amenities from './components/Amenities'
import Gallery from './components/Gallery'
import Reviews from './components/Reviews'
import BookingForm from './components/BookingForm'
import Footer from './components/Footer'
import RoomModal from './components/RoomModal'
import AudioToggle from './components/AudioToggle'
import ScrollToTop from './components/ScrollToTop'

function App() {
  const [roomModal, setRoomModal] = useState({ isOpen: false, data: null })

  const openRoomModal = (data) => {
    setRoomModal({ isOpen: true, data })
  }

  const closeRoomModal = () => {
    setRoomModal({ isOpen: false, data: null })
  }

  return (
    <>
      <a className="skip-link" href="#main">Lewati ke konten utama</a>
      
      <Header />
      
      <main id="main">
        <Hero />
        <About />
        <Rooms onRoomDetail={openRoomModal} />
        <Amenities />
        <Gallery />
        <Reviews />
        <BookingForm />
      </main>

      <Footer />
      
      <RoomModal 
        isOpen={roomModal.isOpen} 
        data={roomModal.data} 
        onClose={closeRoomModal} 
      />
      
      <AudioToggle />
      <ScrollToTop />
    </>
  )
}

export default App

