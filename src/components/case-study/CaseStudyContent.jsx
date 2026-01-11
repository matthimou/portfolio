import { useEffect, useRef, useState, useCallback } from 'react'
import CaseStudyMetrics from './CaseStudyMetrics'
import CaseStudyTestimonial from './CaseStudyTestimonial'
import './CaseStudyContent.css'

const ImageLightbox = ({ images, currentIndex, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  const currentImage = images[currentIndex]

  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="Close lightbox">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
        <img
          src={currentImage.image}
          alt={currentImage.title}
          className="lightbox__image"
        />
        <div className="lightbox__caption">
          <h4 className="lightbox__title">{currentImage.title}</h4>
          {currentImage.description && (
            <p className="lightbox__description">{currentImage.description}</p>
          )}
        </div>
      </div>

      {images.length > 1 && (
        <>
          <button
            className="lightbox__nav lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            aria-label="Previous image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="lightbox__nav lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); onNext() }}
            aria-label="Next image"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
          <div className="lightbox__counter">
            {currentIndex + 1} / {images.length}
          </div>
        </>
      )}
    </div>
  )
}

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

const CaseStudyContent = ({ problem, solution, impact, features }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Filter features that have images for the lightbox
  const featuresWithImages = features?.filter(f => f.image) || []

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === 0 ? featuresWithImages.length - 1 : prev - 1
    )
  }, [featuresWithImages.length])

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === featuresWithImages.length - 1 ? 0 : prev + 1
    )
  }, [featuresWithImages.length])

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
          {problem.contextTertiary && (
            <p className="case-study-content__text">{problem.contextTertiary}</p>
          )}

          {problem.contextImage && (
            <figure className="case-study-content__context-image">
              <img
                src={problem.contextImage.src}
                alt={problem.contextImage.alt}
                className="case-study-content__context-image-img"
              />
              {problem.contextImage.caption && (
                <figcaption className="case-study-content__context-image-caption">
                  {problem.contextImage.caption}
                </figcaption>
              )}
            </figure>
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

      {/* Features Section - Deep-dive into specific features */}
      {features && features.length > 0 && (
        <section className="case-study-content__section case-study-content__features">
          <h4 className="case-study-content__heading">Feature Highlights</h4>
          <div className="case-study-content__features-grid">
            {features.map((feature, index) => {
              const imageIndex = featuresWithImages.findIndex(f => f === feature)
              return (
                <div
                  key={index}
                  className={`case-study-content__feature ${feature.image ? 'case-study-content__feature--clickable' : ''}`}
                  onClick={() => feature.image && openLightbox(imageIndex)}
                  role={feature.image ? 'button' : undefined}
                  tabIndex={feature.image ? 0 : undefined}
                  onKeyDown={(e) => feature.image && e.key === 'Enter' && openLightbox(imageIndex)}
                >
                  {(feature.image || feature.thumbnail) && (
                    <figure className="case-study-content__feature-image-wrapper">
                      <img
                        src={feature.thumbnail || feature.image}
                        alt={feature.title}
                        className="case-study-content__feature-image"
                      />
                      <div className="case-study-content__feature-zoom-hint">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="11" cy="11" r="8" />
                          <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                        </svg>
                      </div>
                    </figure>
                  )}
                  <div className="case-study-content__feature-content">
                    <h5 className="case-study-content__feature-title">{feature.title}</h5>
                    <p className="case-study-content__feature-description">{feature.description}</p>
                    {feature.details && (
                      <p className="case-study-content__feature-details">{feature.details}</p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      )}

      {/* Lightbox */}
      {lightboxOpen && featuresWithImages.length > 0 && (
        <ImageLightbox
          images={featuresWithImages}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
        />
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
