import { useEffect, useRef } from 'react'
import CaseStudyMetrics from './CaseStudyMetrics'
import CaseStudyTestimonial from './CaseStudyTestimonial'
import './CaseStudyContent.css'

const AutoPlayVideo = ({ src, caption }) => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <figure className="case-study-content__video-wrapper">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className="case-study-content__video-player"
      />
      {caption && (
        <figcaption className="case-study-content__video-caption">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

const CaseStudyContent = ({ problem, solution, impact }) => {
  return (
    <div className="case-study-content">
      {/* Problem Section */}
      {problem && (
        <section className="case-study-content__section">
          <h4 className="case-study-content__heading">{problem.heading}</h4>
          <p className="case-study-content__text">{problem.context}</p>
          {problem.contextSecondary && (
            <p className="case-study-content__text">{problem.contextSecondary}</p>
          )}

          {problem.userPainPoints && problem.userPainPoints.length > 0 && (
            <div className="case-study-content__pain-points">
              <h5 className="case-study-content__subheading">User Pain Points</h5>
              {problem.userPainPointsDescription && (
                <p className="case-study-content__text">{problem.userPainPointsDescription}</p>
              )}
              <ul className="case-study-content__list">
                {problem.userPainPoints.map((point, index) => (
                  <li key={index} className="case-study-content__list-item">
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          )}

        </section>
      )}

      {/* Solution Section */}
      {solution && (
        <section className="case-study-content__section">
          <h4 className="case-study-content__heading">{solution.heading}</h4>

          {problem && problem.businessOpportunity && (
            <p className="case-study-content__opportunity">
              <strong>Opportunity:</strong> {problem.businessOpportunity}
            </p>
          )}

          <p className="case-study-content__text">{solution.strategy}</p>

          {/* Solution Video - appears right after strategy text */}
          {solution.video && (
            <div className="case-study-content__video">
              <AutoPlayVideo
                src={solution.video.src}
                caption={solution.video.caption}
              />
            </div>
          )}

          {/* Solution Media Gallery - Design Vision */}
          {solution.media && solution.media.length > 0 && (
            <div className="case-study-content__media">
              <h5 className="case-study-content__subheading">{solution.mediaHeading || 'The Final Design'}</h5>
              {solution.mediaDescription && (
                <p className="case-study-content__text">{solution.mediaDescription}</p>
              )}
              <div className="case-study-content__media-grid">
                {solution.media.map((item, index) => (
                  <figure key={index} className="case-study-content__media-item">
                    <img
                      src={item.src}
                      alt={item.alt}
                      className="case-study-content__media-image"
                    />
                    {item.caption && (
                      <figcaption className="case-study-content__media-caption">
                        {item.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
              {solution.mediaFooterHeading && (
                <div className="case-study-content__media-footer">
                  <h5 className="case-study-content__subheading">{solution.mediaFooterHeading}</h5>
                  {solution.mediaFooterDescription && (
                    <p className="case-study-content__text">{solution.mediaFooterDescription}</p>
                  )}
                  {solution.mediaFooterDescriptionSecondary && (
                    <p className="case-study-content__text">{solution.mediaFooterDescriptionSecondary}</p>
                  )}
                  {solution.mediaFooterMedia && (
                    <figure className="case-study-content__media-footer-figure">
                      <video
                        src={solution.mediaFooterMedia.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="case-study-content__media-footer-video"
                      />
                      {solution.mediaFooterMedia.caption && (
                        <figcaption className="case-study-content__media-caption">
                          {solution.mediaFooterMedia.caption}
                        </figcaption>
                      )}
                    </figure>
                  )}
                </div>
              )}
            </div>
          )}

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
