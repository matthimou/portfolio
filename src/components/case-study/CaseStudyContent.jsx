import CaseStudyMetrics from './CaseStudyMetrics'
import CaseStudyTestimonial from './CaseStudyTestimonial'
import './CaseStudyContent.css'

const CaseStudyContent = ({ problem, solution, impact }) => {
  return (
    <div className="case-study-content">
      {/* Problem Section */}
      {problem && (
        <section className="case-study-content__section">
          <h4 className="case-study-content__heading">{problem.heading}</h4>
          <p className="case-study-content__text">{problem.context}</p>

          {problem.userPainPoints && problem.userPainPoints.length > 0 && (
            <div className="case-study-content__pain-points">
              <h5 className="case-study-content__subheading">User Pain Points</h5>
              <ul className="case-study-content__list">
                {problem.userPainPoints.map((point, index) => (
                  <li key={index} className="case-study-content__list-item">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {problem.businessOpportunity && (
            <p className="case-study-content__opportunity">
              <strong>Opportunity:</strong> {problem.businessOpportunity}
            </p>
          )}
        </section>
      )}

      {/* Solution Section */}
      {solution && (
        <section className="case-study-content__section">
          <h4 className="case-study-content__heading">{solution.heading}</h4>
          <p className="case-study-content__text">{solution.strategy}</p>

          {solution.execution && solution.execution.length > 0 && (
            <div className="case-study-content__execution">
              <h5 className="case-study-content__subheading">Execution</h5>
              {solution.execution.map((phase, index) => (
                <div key={index} className="case-study-content__phase">
                  <div className="case-study-content__phase-header">
                    <span className="case-study-content__phase-name">{phase.phase}</span>
                    {phase.duration && (
                      <span className="case-study-content__phase-duration">
                        {phase.duration}
                      </span>
                    )}
                  </div>
                  <p className="case-study-content__phase-description">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          )}

          {solution.collaboration && (
            <p className="case-study-content__collaboration">
              <strong>Cross-functional Collaboration:</strong> {solution.collaboration}
            </p>
          )}
        </section>
      )}

      {/* Impact Section */}
      {impact && (
        <section className="case-study-content__section">
          <h4 className="case-study-content__heading">{impact.heading}</h4>

          {/* Metrics */}
          {impact.metrics && <CaseStudyMetrics metrics={impact.metrics} />}

          {/* Narrative */}
          {impact.narrative && (
            <p className="case-study-content__text">{impact.narrative}</p>
          )}

          {/* Business Impact */}
          {impact.businessImpact && (
            <p className="case-study-content__business-impact">
              <strong>Business Impact:</strong> {impact.businessImpact}
            </p>
          )}

          {/* Testimonial */}
          {impact.testimonial && <CaseStudyTestimonial testimonial={impact.testimonial} />}
        </section>
      )}
    </div>
  )
}

export default CaseStudyContent
