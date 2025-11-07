import { useState, useEffect, useRef } from 'react'

function AudioToggle() {
  const [isPlaying, setIsPlaying] = useState(true)
  const audioRef = useRef(null)

  useEffect(() => {
    const key = 'bgmEnabled'
    const enabledPref = localStorage.getItem(key)
    const enabled = enabledPref ? enabledPref === '1' : true
    setIsPlaying(enabled)

    if (enabled && audioRef.current) {
      audioRef.current.play().catch(() => {
        setIsPlaying(false)
        localStorage.setItem(key, '0')
      })
    }
  }, [])

  const toggleAudio = async () => {
    if (!audioRef.current) return

    const newState = !isPlaying
    setIsPlaying(newState)
    localStorage.setItem('bgmEnabled', newState ? '1' : '0')

    if (newState) {
      try {
        await audioRef.current.play()
      } catch (e) {
        setIsPlaying(false)
        localStorage.setItem('bgmEnabled', '0')
      }
    } else {
      audioRef.current.pause()
    }
  }

  return (
    <>
      <button 
        className="audio-toggle" 
        id="audioToggle" 
        aria-pressed={isPlaying}
        aria-label="Putar musik latar"
        onClick={toggleAudio}
      >
        {isPlaying ? '⏸' : '♫'}
      </button>
      <audio 
        ref={audioRef}
        id="bgm" 
        src="/Assets/Good Days.mp3" 
        preload="auto" 
        loop
      />
    </>
  )
}

export default AudioToggle

