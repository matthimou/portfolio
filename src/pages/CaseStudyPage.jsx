import { useParams, Link, Navigate } from 'react-router-dom'
import { caseStudies } from '../data/caseStudies'
import CaseStudyHero from '../components/case-study/CaseStudyHero'
import CaseStudyContent from '../components/case-study/CaseStudyContent'
import './CaseStudyPage.css'

const CaseStudyPage = () => {
  const { projectId } = useParams()
  const study = caseStudies.find(s => s.id === projectId)

  // Redirect to work page if project not found
  if (!study) {
    return <Navigate to="/work" replace />
  }

  // Find current project index for navigation
  const currentIndex = caseStudies.findIndex(s => s.id === projectId)
  const prevProject = currentIndex > 0 ? caseStudies[currentIndex - 1] : null
  const nextProject = currentIndex < caseStudies.length - 1 ? caseStudies[currentIndex + 1] : null

  return (
    <div className="case-study-page">
      <div className="case-study-page__container">
        {/* Back Button */}
        <Link to="/work" className="case-study-page__back">
          ← Back to Work
        </Link>

        {/* Case Study Content */}
        <article className="case-study-page__content">
          <CaseStudyHero
            id={study.id}
            title={study.meta.title}
            hero={study.hero}
            meta={study.meta}
          />

          <div className="case-study-page__body">
            <CaseStudyContent
              problem={study.problem}
              solution={study.solution}
              impact={study.impact}
            />
          </div>
        </article>

        {/* Project Navigation */}
        <nav className="case-study-page__nav" aria-label="Project navigation">
          <div className="container">
            <div className="case-study-page__nav-content">
              {prevProject ? (
                <Link to={`/work/${prevProject.id}`} className="case-study-page__nav-link case-study-page__nav-link--prev">
                  <span className="case-study-page__nav-label">← Previous</span>
                  <span className="case-study-page__nav-title">{prevProject.meta.title}</span>
                </Link>
              ) : (
                <div></div>
              )}

              {nextProject ? (
                <Link to={`/work/${nextProject.id}`} className="case-study-page__nav-link case-study-page__nav-link--next">
                  <span className="case-study-page__nav-label">Next →</span>
                  <span className="case-study-page__nav-title">{nextProject.meta.title}</span>
                </Link>
              ) : (
                <div></div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </div>
  )
}

export default CaseStudyPage
