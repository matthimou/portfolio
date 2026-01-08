import { caseStudies } from '../../data/caseStudies'
import CaseStudyCard from '../case-study/CaseStudyCard'
import './CaseStudies.css'

const CaseStudies = () => {
  return (
    <section id="work" className="case-studies">
      <div className="container">
        <h2 className="case-studies__heading">Selected Work</h2>
        <p className="case-studies__intro">
          Flagship projects showcasing design leadership, customer obsession, and measurable impact.
        </p>
      </div>

      {/* Case Study Cards */}
      <div className="case-studies__list">
        {caseStudies.map((study, index) => (
          <CaseStudyCard key={study.id} study={study} index={index} />
        ))}
      </div>
    </section>
  )
}

export default CaseStudies
