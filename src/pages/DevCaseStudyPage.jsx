import { useParams, Link, Navigate } from 'react-router-dom'
import { caseStudies } from '../data/caseStudies'
import CaseStudyHero from '../components/case-study/CaseStudyHero'
import CaseStudyContent from '../components/case-study/CaseStudyContent'
import LeadershipCaseStudyContent from '../components/case-study/LeadershipCaseStudyContent'
import DetailCaseStudyContent from '../components/case-study/DetailCaseStudyContent'
import './CaseStudyPage.css'

/**
 * DevCaseStudyPage - For viewing draft case studies during development
 * This page is not linked in navigation and is only accessible via direct URL
 */
const DevCaseStudyPage = () => {
  const { projectId } = useParams()

  // Find the study - allow both published and draft
  const study = caseStudies.find(s => s.id === projectId)

  // Redirect to home if project not found
  if (!study) {
    return <Navigate to="/" replace />
  }

  // Get all draft studies for navigation
  const draftStudies = caseStudies.filter(s => s.status === 'draft')
  const currentIndex = draftStudies.findIndex(s => s.id === projectId)
  const prevProject = currentIndex > 0 ? draftStudies[currentIndex - 1] : null
  const nextProject = currentIndex < draftStudies.length - 1 ? draftStudies[currentIndex + 1] : null

  const hasFullBleedHero = !!study.hero.video || !!study.hero.fullBleed

  return (
    <div className={`case-study-page ${hasFullBleedHero ? 'case-study-page--video-hero' : ''}`}>
      {/* Dev mode indicator */}
      <div style={{
        position: 'fixed',
        top: '80px',
        right: '20px',
        padding: '8px 16px',
        backgroundColor: '#FF3008',
        color: 'white',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: '600',
        zIndex: 1000,
        opacity: 0.9
      }}>
        DEV MODE
      </div>

      <div className="case-study-page__container">
        {/* Case Study Content */}
        <article className="case-study-page__content">
          <CaseStudyHero
            id={study.id}
            title={study.meta.title}
            hero={study.hero}
            meta={study.meta}
            hideHeader={hasFullBleedHero}
          />

          <div className="case-study-page__body">
            {study.variant === 'leadership' ? (
              <LeadershipCaseStudyContent study={study} />
            ) : study.variant === 'detail' ? (
              <DetailCaseStudyContent study={study} />
            ) : (
              <CaseStudyContent
                introduction={study.introduction}
                problem={study.problem}
                solution={study.solution}
                impact={study.impact}
                features={study.features}
              />
            )}
          </div>
        </article>

        {/* Project Navigation - only shows other draft projects */}
        {draftStudies.length > 1 && (
          <nav className="case-study-page__nav" aria-label="Project navigation">
            <div className="container">
              <div className="case-study-page__nav-content">
                {prevProject ? (
                  <Link to={`/dev/work/${prevProject.id}`} className="case-study-page__nav-link case-study-page__nav-link--prev">
                    <span className="case-study-page__nav-label">← Previous</span>
                    <span className="case-study-page__nav-title">{prevProject.meta.title}</span>
                  </Link>
                ) : (
                  <div></div>
                )}

                {nextProject ? (
                  <Link to={`/dev/work/${nextProject.id}`} className="case-study-page__nav-link case-study-page__nav-link--next">
                    <span className="case-study-page__nav-label">Next →</span>
                    <span className="case-study-page__nav-title">{nextProject.meta.title}</span>
                  </Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </nav>
        )}
      </div>
    </div>
  )
}

export default DevCaseStudyPage
