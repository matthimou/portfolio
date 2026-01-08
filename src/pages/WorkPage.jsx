import { useEffect, useRef, useState } from 'react'
import { caseStudies } from '../data/caseStudies'
import ProjectCard from '../components/ui/ProjectCard'
import './WorkPage.css'

const WorkPage = () => {
  const [headerVisible, setHeaderVisible] = useState(false)
  const [cardsVisible, setCardsVisible] = useState(false)
  const gridRef = useRef(null)

  useEffect(() => {
    // Trigger header animation on mount
    setTimeout(() => setHeaderVisible(true), 100)

    // Observe grid for card animations
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (gridRef.current) {
      observer.observe(gridRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <div className="work-page">
      <div className="container">
        {/* Page Header */}
        <header className={`work-page__header ${headerVisible ? 'work-page__header--visible' : ''}`}>
          <h1 className="work-page__heading">Selected Work</h1>
          <p className="work-page__intro">
            Flagship projects showcasing design leadership, customer obsession, and measurable impact.
          </p>
        </header>

        {/* Projects Grid */}
        <div className="work-page__grid" ref={gridRef}>
          {caseStudies.map((project, index) => (
            <div
              key={project.id}
              className={`work-page__card-wrapper ${cardsVisible ? 'work-page__card-wrapper--visible' : ''}`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <ProjectCard
                project={project}
                featured={index === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkPage
