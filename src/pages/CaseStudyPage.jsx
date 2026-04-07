import { useParams, Link, Navigate } from 'react-router-dom'
import { caseStudies } from '../data/caseStudies'
import { useAuth } from '../context/AuthContext'
import CaseStudyHero from '../components/case-study/CaseStudyHero'
import CaseStudyContent from '../components/case-study/CaseStudyContent'
import './CaseStudyPage.css'

// Only published case studies are shown on the main site
const publishedStudies = caseStudies.filter(s => s.status === 'published')

const CaseStudyPage = ({ onOpenLogin }) => {
  const { projectId } = useParams()
  const { isAuthenticated, isAuthLoading } = useAuth()

  // Only allow published case studies
  const study = publishedStudies.find(s => s.id === projectId)

  // Redirect to home if project not found or not published
  if (!study) {
    return <Navigate to="/" replace />
  }

  // Wait for auth to initialize before checking protected access
  if (isAuthLoading) {
    return null
  }

  // Redirect to home if trying to access protected study without auth
  if (study.protected && !isAuthenticated) {
    return <Navigate to="/" replace />
  }

  // Navigation only shows published studies the user can access
  const visibleStudies = isAuthenticated
    ? publishedStudies
    : publishedStudies.filter(s => !s.protected)

  // Find current project index for navigation (within visible studies)
  const currentIndex = visibleStudies.findIndex(s => s.id === projectId)
  const prevProject = currentIndex > 0 ? visibleStudies[currentIndex - 1] : null
  const nextProject = currentIndex < visibleStudies.length - 1 ? visibleStudies[currentIndex + 1] : null

  const hasFullBleedHero = !!study.hero.video || !!study.hero.fullBleed

  return (
    <div className={`case-study-page ${hasFullBleedHero ? 'case-study-page--video-hero' : ''}`}>
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
            <CaseStudyContent
              introduction={study.introduction}
              problem={study.problem}
              solution={study.solution}
              impact={study.impact}
              features={study.features}
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
