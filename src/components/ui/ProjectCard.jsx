import { Link } from 'react-router-dom'
import './ProjectCard.css'

const ProjectCard = ({ project, featured = false }) => {
  return (
    <Link
      to={`/work/${project.id}`}
      className={`project-card ${featured ? 'project-card--featured' : ''}`}
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
