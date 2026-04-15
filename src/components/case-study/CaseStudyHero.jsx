import './CaseStudyHero.css'

const CaseStudyHero = ({ id, title, hero, meta, hideHeader = false }) => {
  return (
    <div className={`case-study-hero ${hideHeader ? 'case-study-hero--no-header' : ''}`}>
      {/* Project Meta */}
      {!hideHeader && (
        <div className="case-study-hero__meta surface--dark">
          <h3 id={id} className="case-study-hero__title">
            {title}
          </h3>
          <div className="case-study-hero__details">
            <span className="case-study-hero__client">{meta.client}</span>
            <span className="case-study-hero__separator">•</span>
            <span className="case-study-hero__timeline">{meta.timeline}</span>
          </div>
          {meta.role && (
            <div className="case-study-hero__role-line">
              <span className="case-study-hero__role">{meta.role}</span>
            </div>
          )}
          {(meta.team?.composition || meta.team?.size) && (
            <div className="case-study-hero__team">
              {meta.team.size && (
                <span className="case-study-hero__team-info">{meta.team.size}</span>
              )}
              {meta.team.composition && (
                <span className="case-study-hero__team-composition">{meta.team.composition}</span>
              )}
            </div>
          )}
          {meta.impact && (
            <div className="case-study-hero__impact">
              <span className="case-study-hero__impact-heading">{meta.impact.heading}</span>
              <ul className="case-study-hero__impact-list">
                {meta.impact.items.map((item, index) => (
                  <li key={index} className="case-study-hero__impact-item">{item}</li>
                ))}
              </ul>
              {meta.impact.closing && (
                <p className="case-study-hero__impact-closing">{meta.impact.closing}</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Hero Media - Video or Image */}
      <div className="case-study-hero__image-wrapper">
        {hero.video ? (
          <video
            src={hero.video}
            poster={hero.videoPoster}
            autoPlay
            muted
            loop
            playsInline
            className="case-study-hero__video"
          />
        ) : (
          <img
            src={hero.src}
            alt={hero.alt}
            className="case-study-hero__image"
            style={hero.aspectRatio ? { aspectRatio: hero.aspectRatio, objectFit: 'contain' } : {}}
            loading="lazy"
          />
        )}
        {hero.overlay && (
          <div className="case-study-hero__overlay">
            <h2 className="case-study-hero__overlay-title">{hero.overlay.title}</h2>
            <p className="case-study-hero__overlay-text">{hero.overlay.text}</p>
          </div>
        )}
        {hero.caption && (
          <p className="case-study-hero__caption">{hero.caption}</p>
        )}
      </div>
    </div>
  )
}

export default CaseStudyHero
