import { caseStudies } from '../data/caseStudies'
import ProjectCard from '../components/ui/ProjectCard'
import './WorkPage.css'

const WorkPage = () => {
  return (
    <div className="work-page">
      <div className="container">
        {/* Page Header */}
        <header className="work-page__header">
          <h1 className="work-page__heading">Selected Work</h1>
          <p className="work-page__intro">
            Flagship projects showcasing design leadership, customer obsession, and measurable impact.
          </p>
        </header>

        {/* Projects Grid */}
        <div className="work-page__grid">
          {caseStudies.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={index === 0}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WorkPage
