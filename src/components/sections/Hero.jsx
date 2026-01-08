import { useEffect, useState } from 'react'
import VideoBackground from '../ui/VideoBackground'
import './Hero.css'

const Hero = ({ name = 'Your Name', title = 'Design Director' }) => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Trigger entrance animation after mount
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  return (
    <section
      className={`hero ${isVisible ? 'hero--visible' : ''}`}
      aria-label="Introduction"
    >
      <VideoBackground />
      <div className="hero__content">
        <div className="hero__avatar">
          <img
            src="/images/avatar-placeholder.svg"
            alt={`${name} avatar`}
            className="hero__avatar-image"
          />
        </div>
        <h1 className="hero__name">{name}</h1>
        <p className="hero__title">{title}</p>
      </div>
    </section>
  )
}

export default Hero
