import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/sections/Hero'
import { caseStudies } from '../data/caseStudies'
import './HomePage.css'

const CareerPath = () => (
  <svg viewBox="0 0 800 120" className="experience__illustration" preserveAspectRatio="xMidYMid meet">
    {/* Path line */}
    <path
      d="M 0 60 Q 100 60 150 40 T 300 60 T 450 35 T 600 55 T 800 30"
      fill="none"
      stroke="rgba(194, 65, 12, 0.15)"
      strokeWidth="2"
      strokeDasharray="8 4"
      className="experience__path-line"
    />

    {/* Milestone nodes */}
    {[
      { x: 80, y: 55, label: '2012', sublabel: 'Designer' },
      { x: 230, y: 50, label: '2016', sublabel: 'Senior' },
      { x: 400, y: 45, label: '2019', sublabel: 'Lead' },
      { x: 580, y: 50, label: '2022', sublabel: 'Director' },
      { x: 720, y: 35, label: 'Now', sublabel: 'Leadership' },
    ].map((node, i) => (
      <g key={i} className="experience__node" style={{ animationDelay: `${i * 150}ms` }}>
        {/* Pulse ring */}
        <circle cx={node.x} cy={node.y} r="8" fill="none" stroke="rgba(194, 65, 12, 0.3)" strokeWidth="1" className="experience__pulse" />
        {/* Node dot */}
        <circle cx={node.x} cy={node.y} r="5" fill="var(--color-accent-primary)" />
        {/* Year label */}
        <text x={node.x} y={node.y - 18} textAnchor="middle" className="experience__label">{node.label}</text>
        {/* Role label */}
        <text x={node.x} y={node.y + 28} textAnchor="middle" className="experience__sublabel">{node.sublabel}</text>
      </g>
    ))}
  </svg>
)

const HomePage = () => {
  const [cardsVisible, setCardsVisible] = useState(false)
  const [experienceVisible, setExperienceVisible] = useState(false)
  const gridRef = useRef(null)
  const experienceRef = useRef(null)

  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true)
          cardObserver.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const experienceObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setExperienceVisible(true)
          experienceObserver.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (gridRef.current) cardObserver.observe(gridRef.current)
    if (experienceRef.current) experienceObserver.observe(experienceRef.current)

    return () => {
      cardObserver.disconnect()
      experienceObserver.disconnect()
    }
  }, [])

  return (
    <div className="home-page">
      <Hero name="Matthew Hanson" title="Design Leadership" />

      {/* Experience Section */}
      <section className="experience" ref={experienceRef}>
        <div className="container">
          <div className={`experience__content ${experienceVisible ? 'experience__content--visible' : ''}`}>
            <div className="experience__header">
              <h2 className="experience__heading">Experience</h2>
            </div>
            <div className="experience__illustration-wrapper">
              <CareerPath />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="home-work">
        <div className="container">
          <div className="home-work__header">
            <h2 className="home-work__heading">Featured Work</h2>
            <Link to="/work" className="home-work__view-all">
              View All Projects →
            </Link>
          </div>

          <div className="home-work__grid" ref={gridRef}>
            {caseStudies.map((project, index) => (
              <Link
                key={project.id}
                to={`/work/${project.id}`}
                className={`home-work__card ${cardsVisible ? 'home-work__card--visible' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="home-work__image-wrapper">
                  <img
                    src={project.hero.src}
                    alt={project.hero.alt}
                    className="home-work__image"
                    loading="lazy"
                  />
                </div>
                <div className="home-work__content">
                  <h3 className="home-work__title">{project.meta.title}</h3>
                  <p className="home-work__client">{project.meta.client}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
