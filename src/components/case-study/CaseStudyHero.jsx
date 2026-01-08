import './CaseStudyHero.css'

const CaseStudyHero = ({ id, title, hero, meta }) => {
  return (
    <div className="case-study-hero">
      {/* Project Meta */}
      <div className="case-study-hero__meta">
        <h3 id={id} className="case-study-hero__title">
          {title}
        </h3>
        <div className="case-study-hero__details">
          <span className="case-study-hero__client">{meta.client}</span>
          <span className="case-study-hero__separator">•</span>
          <span className="case-study-hero__timeline">{meta.timeline}</span>
        </div>
        <div className="case-study-hero__team">
          <span className="case-study-hero__role">{meta.role}</span>
          <span className="case-study-hero__separator">•</span>
          <span className="case-study-hero__team-info">
            Led team of {meta.team.size}: {meta.team.composition}
          </span>
        </div>
      </div>

      {/* Hero Image */}
      <div className="case-study-hero__image-wrapper">
        <img
          src={hero.src}
          alt={hero.alt}
          className="case-study-hero__image"
          loading="lazy"
        />
        {hero.caption && (
          <p className="case-study-hero__caption">{hero.caption}</p>
        )}
      </div>
    </div>
  )
}

export default CaseStudyHero
