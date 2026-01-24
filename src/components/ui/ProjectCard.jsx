import { Link, useNavigate } from 'react-router-dom'
import './ProjectCard.css'

// Subtle whoosh for navigating to case study
const playWhooshSound = () => {
  try {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)()

    const playTone = (freq, startTime, duration, type = 'sine', volume = 0.1) => {
      const oscillator = audioContext.createOscillator()
      const gainNode = audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(audioContext.destination)

      oscillator.frequency.value = freq
      oscillator.type = type

      gainNode.gain.setValueAtTime(0, audioContext.currentTime + startTime)
      gainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + startTime + 0.015)
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + startTime + duration)

      oscillator.start(audioContext.currentTime + startTime)
      oscillator.stop(audioContext.currentTime + startTime + duration)
    }

    // Quick ascending swoosh
    playTone(200, 0, 0.08, 'sine', 0.05)
    playTone(400, 0.02, 0.1, 'sine', 0.07)
    playTone(600, 0.05, 0.1, 'sine', 0.05)
  } catch (e) {
    // Audio not supported
  }
}

const ProjectCard = ({ project, featured = false }) => {
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    playWhooshSound()
    setTimeout(() => navigate(`/work/${project.id}`), 80)
  }

  return (
    <Link
      to={`/work/${project.id}`}
      className={`project-card ${featured ? 'project-card--featured' : ''}`}
      onClick={handleClick}
    >
      {/* Project Image */}
      <div className="project-card__image-wrapper">
        <img
          src={project.hero.src}
          alt={project.hero.alt}
          className="project-card__image"
          loading="lazy"
        />
        <div className="project-card__overlay">
          <span className="project-card__cta">View Case Study →</span>
        </div>
      </div>

      {/* Project Info */}
      <div className="project-card__content">
        <h3 className="project-card__title">{project.meta.title}</h3>
        <p className="project-card__client">{project.meta.client}</p>
        <p className="project-card__summary">{project.problem.context}</p>
      </div>
    </Link>
  )
}

export default ProjectCard
