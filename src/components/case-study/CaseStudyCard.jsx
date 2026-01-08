import CaseStudyHero from './CaseStudyHero'
import CaseStudyContent from './CaseStudyContent'
import './CaseStudyCard.css'

const CaseStudyCard = ({ study, index }) => {
  return (
    <article
      id={study.id}
      className="case-study-card"
      aria-labelledby={study.id}
    >
      <div className="case-study-card__container">
        {/* Study Number */}
        <div className="case-study-card__number">
          {String(index + 1).padStart(2, '0')}
        </div>

        {/* Hero Section */}
        <CaseStudyHero
          id={study.id}
          title={study.meta.title}
          hero={study.hero}
          meta={study.meta}
        />

        {/* Content: Problem → Solution → Impact */}
        <CaseStudyContent
          problem={study.problem}
          solution={study.solution}
          impact={study.impact}
        />
      </div>
    </article>
  )
}

export default CaseStudyCard
