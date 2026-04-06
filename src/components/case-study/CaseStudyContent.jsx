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

const AutoPlayVideo = ({ src, caption, noShadow, noBorderRadius }) => {
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
        className={`case-study-content__video-player ${noShadow ? 'case-study-content__video-player--no-shadow' : ''} ${noBorderRadius ? 'case-study-content__video-player--no-radius' : ''}`}
      />
      {caption && (
        <figcaption className="case-study-content__video-caption">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}

const CaseStudyContent = ({ introduction, problem, solution, impact, features }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [singleImageLightbox, setSingleImageLightbox] = useState(null)

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
      {/* Introduction Section */}
      {introduction && (
        <section className="case-study-content__section">
          <h4 className="case-study-content__heading">{introduction.heading}</h4>
          <p className="case-study-content__text">{introduction.content}</p>
          {introduction.contentSecondary && (
            <p className="case-study-content__text">{introduction.contentSecondary}</p>
          )}
          {introduction.contentTertiary && (
            <p className="case-study-content__text">{introduction.contentTertiary}</p>
          )}
          {introduction.contentQuaternary && (
            <p className="case-study-content__text">{introduction.contentQuaternary}</p>
          )}
          {introduction.videoHeading && (
            <h4 className="case-study-content__heading">{introduction.videoHeading}</h4>
          )}
          {introduction.video && (
            <div className="case-study-content__intro-video">
              <AutoPlayVideo
                src={introduction.video.src}
                caption={introduction.video.caption}
              />
            </div>
          )}
          {introduction.closing && (
            <p className="case-study-content__text">{introduction.closing}</p>
          )}
          {(introduction.videoAfterClosing || introduction.closingAfterVideo || (introduction.closingFinal && !introduction.closingFinalBelowVideo)) && (
            <div className="case-study-content__two-column case-study-content__two-column--video">
              {introduction.videoAfterClosing && (
                <div className="case-study-content__two-column-video">
                  <AutoPlayVideo
                    src={introduction.videoAfterClosing.src}
                    caption={introduction.videoAfterClosing.caption}
                    noShadow={introduction.videoAfterClosing.noShadow}
                  />
                </div>
              )}
              <div className="case-study-content__two-column-content">
                {introduction.closingAfterVideo && introduction.closingAfterVideo.split('\n\n').map((para, index) => (
                  <p key={index} className="case-study-content__text">{para}</p>
                ))}
                {introduction.closingFinal && !introduction.closingFinalBelowVideo && (
                  <p className="case-study-content__text">{introduction.closingFinal}</p>
                )}
              </div>
            </div>
          )}
          {introduction.closingFinalHeading && introduction.closingFinalBelowVideo && (
            <h4 className="case-study-content__heading">{introduction.closingFinalHeading}</h4>
          )}
          {introduction.closingFinal && introduction.closingFinalBelowVideo && introduction.closingFinalImage && (
            <div className="case-study-content__two-column case-study-content__two-column--text-heavy">
              <div className="case-study-content__two-column-content">
                {introduction.closingFinal.split('\n\n').map((para, index) => (
                  <p key={index} className="case-study-content__text">{para}</p>
                ))}
              </div>
              <figure className="case-study-content__two-column-image">
                <img
                  src={introduction.closingFinalImage.src}
                  alt={introduction.closingFinalImage.alt}
                />
              </figure>
            </div>
          )}
          {introduction.closingFinal && introduction.closingFinalBelowVideo && !introduction.closingFinalImage && (
            <p className="case-study-content__text">{introduction.closingFinal}</p>
          )}
          {introduction.closingFinalSecondary && (
            <p className="case-study-content__text">{introduction.closingFinalSecondary}</p>
          )}
          {introduction.imageFinal && (
            <figure className="case-study-content__section-image">
              <img
                src={introduction.imageFinal.src}
                alt={introduction.imageFinal.alt}
                className="case-study-content__section-image-img"
              />
            </figure>
          )}
          {introduction.opportunity && (
            <div className={`case-study-content__opportunity ${introduction.opportunityCallout ? 'case-study-content__opportunity--callout' : ''}`}>
              <strong>{introduction.opportunityCallout ? 'The Opportunity' : 'Hypothesis'}:</strong> {introduction.opportunity}
            </div>
          )}
        </section>
      )}

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

          {solution.strategy && (
            <p className="case-study-content__text">{solution.strategy}</p>
          )}

          {/* Timeline - appears after strategy text */}
          {solution.timeline && solution.timeline.length > 0 && (
            <>
              {/* Only show timeline visualization if phases have dates */}
              {solution.timeline.some(phase => phase.date) && (
                <div className="case-study-content__timeline">
                  {solution.timeline.map((phase, index) => (
                    <div
                      key={index}
                      className="case-study-content__timeline-phase"
                      style={{ '--phase-index': index }}
                    >
                      <span className="case-study-content__timeline-date">{phase.date}</span>
                      <h5 className="case-study-content__timeline-title">{phase.title}</h5>
                      <p className="case-study-content__timeline-description">{phase.description}</p>
                    </div>
                  ))}
                </div>
              )}
              {solution.timeline[0].sectionHeading && (
                <h5 className={`case-study-content__subheading ${solution.neutralHeadings ? 'case-study-content__subheading--neutral' : ''}`}>{solution.timeline[0].sectionHeading}</h5>
              )}
              {solution.timeline[0].sectionContent && (
                solution.timeline[0].sectionContent.split('\n\n').map((para, index) => (
                  <p key={index} className="case-study-content__text">{para}</p>
                ))
              )}
              {solution.timeline[0].sectionImagesThreeUp && (
                <div className="case-study-content__image-three-up">
                  {solution.timeline[0].sectionImagesThreeUp.map((image, index) => (
                    <figure key={index} className="case-study-content__image-three-up-item">
                      <img src={image.src} alt={image.alt} />
                      {image.label && (
                        <figcaption className="case-study-content__image-three-up-label">{image.label}</figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}
              {solution.timeline[0].sectionContentSecondary && (
                solution.timeline[0].sectionContentSecondary.split('\n\n').map((para, index) => (
                  <p key={index} className="case-study-content__text">{para}</p>
                ))
              )}
              {solution.timeline[0].sectionImages && (
                <div className="case-study-content__image-pair">
                  {solution.timeline[0].sectionImages.map((image, index) => (
                    <figure key={index} className="case-study-content__image-pair-item">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="case-study-content__image-pair-img"
                      />
                      {image.label && (
                        <figcaption className="case-study-content__image-pair-label">{image.label}</figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}
              {solution.timeline[0].sectionContentAfterImages && (
                <p className="case-study-content__text">{solution.timeline[0].sectionContentAfterImages}</p>
              )}
              {solution.timeline[0].sectionImageFlow && (
                <figure className="case-study-content__image-flow">
                  <div className="case-study-content__image-flow-row">
                    {solution.timeline[0].sectionImageFlow.images.map((image, index) => (
                      <img
                        key={index}
                        src={image.src}
                        alt={image.alt}
                        className="case-study-content__image-flow-img"
                      />
                    ))}
                  </div>
                  {solution.timeline[0].sectionImageFlow.label && (
                    <figcaption className="case-study-content__image-flow-label">
                      {solution.timeline[0].sectionImageFlow.label}
                    </figcaption>
                  )}
                </figure>
              )}
              {solution.timeline[0].sectionContentAfterFlow && (
                <p className="case-study-content__text">{solution.timeline[0].sectionContentAfterFlow}</p>
              )}
              {solution.timeline[0].concerns && (
                <div className="case-study-content__concerns">
                  <h5 className="case-study-content__concerns-heading">{solution.timeline[0].concerns.heading}</h5>
                  <div className="case-study-content__concerns-grid">
                    {solution.timeline[0].concerns.items.map((item, index) => (
                      <div key={index} className="case-study-content__concerns-card">
                        <span className="case-study-content__concerns-badge">
                          {item.category} ({item.percentage})
                        </span>
                        <ul className="case-study-content__concerns-quotes">
                          {item.quotes.map((quote, qIndex) => (
                            <li key={qIndex}>{quote}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {solution.timeline[0].concernsLearnings && (
                <div className="case-study-content__learnings">
                  {solution.timeline[0].concernsLearnings.map((learning, index) => (
                    <div key={index} className="case-study-content__learning">
                      <h6 className="case-study-content__learning-title">{learning.title}</h6>
                      <p className="case-study-content__learning-description">{learning.description}</p>
                    </div>
                  ))}
                </div>
              )}
              {solution.timeline[0].customerQuotes && (
                <div className="case-study-content__customer-quotes">
                  {solution.timeline[0].customerQuotes.map((item, index) => (
                    <blockquote key={index} className="case-study-content__quote-card">
                      <span className="case-study-content__quote-mark case-study-content__quote-mark--open">"</span>
                      <p className="case-study-content__quote-text">{item.quote}</p>
                      <span className="case-study-content__quote-mark case-study-content__quote-mark--close">"</span>
                      <cite className="case-study-content__quote-author">- {item.author}</cite>
                    </blockquote>
                  ))}
                </div>
              )}
              {solution.timeline[0].challenges && (
                <div className="case-study-content__challenges">
                  {solution.timeline[0].challenges.heading && (
                    <h5 className="case-study-content__challenges-heading">{solution.timeline[0].challenges.heading}</h5>
                  )}
                  {solution.timeline[0].challenges.description && (
                    <p className="case-study-content__text">{solution.timeline[0].challenges.description}</p>
                  )}
                  <div className="case-study-content__challenges-grid">
                    {solution.timeline[0].challenges.items.map((item, index) => (
                      <div key={index} className="case-study-content__challenge-item">
                        <div className="case-study-content__challenge-icon">
                          <img src={item.icon} alt="" />
                        </div>
                        <span className="case-study-content__challenge-label">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {solution.timeline[0].challengesLearnings && (
                <div className="case-study-content__learnings">
                  {solution.timeline[0].challengesLearnings.map((learning, index) => (
                    <div key={index} className="case-study-content__learning">
                      <h6 className="case-study-content__learning-title">{learning.title}</h6>
                      <p className="case-study-content__learning-description">{learning.description}</p>
                    </div>
                  ))}
                </div>
              )}
              {solution.timeline[0].sectionClosing && (
                <p className="case-study-content__text case-study-content__section-closing">{solution.timeline[0].sectionClosing}</p>
              )}
              {solution.timeline[1]?.sectionHeading && (
                <h5 className={`case-study-content__subheading ${solution.neutralHeadings ? 'case-study-content__subheading--neutral' : ''}`}>{solution.timeline[1].sectionHeading}</h5>
              )}
              {solution.timeline[1]?.sectionContent && (
                solution.timeline[1].sectionContent.split('\n\n').map((para, index) => (
                  <p key={index} className="case-study-content__text">{para}</p>
                ))
              )}
              {solution.timeline[1]?.sectionImagesTwoUp && (
                <div className="case-study-content__image-two-up">
                  {solution.timeline[1].sectionImagesTwoUp.map((image, index) => (
                    <figure key={index} className="case-study-content__image-two-up-item">
                      <img src={image.src} alt={image.alt} />
                      {image.label && (
                        <figcaption className="case-study-content__image-two-up-label">{image.label}</figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}
              {solution.timeline[1]?.sectionContentAfterImages && (
                solution.timeline[1].sectionContentAfterImages.split('\n\n').map((para, index) => (
                  <p key={index} className="case-study-content__text">{para}</p>
                ))
              )}
              {solution.timeline[1]?.sectionImagesThreeUp && (
                <div className="case-study-content__image-three-up">
                  {solution.timeline[1].sectionImagesThreeUp.map((image, index) => (
                    <figure key={index} className="case-study-content__image-three-up-item">
                      <img src={image.src} alt={image.alt} />
                      {image.label && (
                        <figcaption className="case-study-content__image-three-up-label">{image.label}</figcaption>
                      )}
                    </figure>
                  ))}
                </div>
              )}
              {solution.timeline[1]?.sectionContentAfterThreeUp && (
                solution.timeline[1].sectionContentAfterThreeUp.split('\n\n').map((para, index) => (
                  <p key={index} className="case-study-content__text">{para}</p>
                ))
              )}
              {solution.timeline[1]?.sectionOpportunity && (
                <div className="case-study-content__opportunity case-study-content__opportunity--callout">
                  <strong>The Opportunity:</strong> {solution.timeline[1].sectionOpportunity}
                </div>
              )}
              {solution.timeline[1]?.fullBleedImage && (
                <figure className={`case-study-content__full-bleed ${solution.timeline[1].fullBleedImage.ratio ? `case-study-content__full-bleed--ratio-${solution.timeline[1].fullBleedImage.ratio}` : ''}`}>
                  <img
                    src={solution.timeline[1].fullBleedImage.src}
                    alt={solution.timeline[1].fullBleedImage.alt}
                  />
                  {solution.timeline[1].fullBleedImage.caption && (
                    <figcaption className="case-study-content__full-bleed-caption">
                      {solution.timeline[1].fullBleedImage.caption}
                    </figcaption>
                  )}
                </figure>
              )}
              {solution.timeline[1]?.successMetrics && (
                <div className="case-study-content__success-metrics">
                  <h5 className="case-study-content__success-metrics-heading">{solution.timeline[1].successMetrics.heading}</h5>
                  <div className="case-study-content__success-metrics-grid">
                    {solution.timeline[1].successMetrics.items.map((item, index) => (
                      <div key={index} className="case-study-content__success-metric-card">
                        <span className={`case-study-content__success-metric-badge ${item.type === 'Primary Metric' ? 'case-study-content__success-metric-badge--primary' : ''}`}>
                          {item.type}
                        </span>
                        <h6 className="case-study-content__success-metric-title">{item.title}</h6>
                        {item.description && (
                          <p className="case-study-content__success-metric-description">{item.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {solution.timeline[1]?.sectionContentAfterMetrics && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentAfterMetrics}</p>
              )}
              {solution.timeline[1]?.sectionHeadingSecondary && (
                <h4 className="case-study-content__heading">{solution.timeline[1].sectionHeadingSecondary}</h4>
              )}
              {solution.timeline[1]?.sectionImageSecondary && (
                <figure className="case-study-content__section-image">
                  <img
                    src={solution.timeline[1].sectionImageSecondary.src}
                    alt={solution.timeline[1].sectionImageSecondary.alt}
                    className="case-study-content__section-image-img"
                  />
                </figure>
              )}
              {solution.timeline[1]?.sectionContentTertiary && (
                solution.timeline[1].sectionContentTertiary.split('\n\n').map((para, index) => (
                  <p key={index} className="case-study-content__text">{para}</p>
                ))
              )}
              {solution.timeline[1]?.sectionHeadingTeam && (
                <h5 className={`case-study-content__subheading ${solution.neutralHeadings ? 'case-study-content__subheading--neutral' : ''}`}>{solution.timeline[1].sectionHeadingTeam}</h5>
              )}
              {solution.timeline[1]?.sectionTeamImage && (
                <figure className="case-study-content__section-image">
                  <img
                    src={solution.timeline[1].sectionTeamImage.src}
                    alt={solution.timeline[1].sectionTeamImage.alt}
                    className="case-study-content__section-image-img"
                  />
                  {solution.timeline[1].sectionTeamImage.caption && (
                    <figcaption className="case-study-content__section-image-caption">
                      {solution.timeline[1].sectionTeamImage.caption}
                    </figcaption>
                  )}
                </figure>
              )}
              {solution.timeline[1]?.sectionContentAfterTeam && (
                solution.timeline[1].sectionContentAfterTeam.split('\n\n').map((para, index) => (
                  <p key={index} className="case-study-content__text">{para}</p>
                ))
              )}
              {solution.timeline[1]?.sectionImageAfterTeam && (
                <figure className="case-study-content__section-image">
                  <img
                    src={solution.timeline[1].sectionImageAfterTeam.src}
                    alt={solution.timeline[1].sectionImageAfterTeam.alt}
                    className="case-study-content__section-image-img"
                  />
                </figure>
              )}
              {solution.timeline[1]?.sectionContentAfterBrainstorm && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentAfterBrainstorm}</p>
              )}
              {solution.timeline[1]?.designPrinciples && (
                <div className="case-study-content__principles">
                  {solution.timeline[1].designPrinciples.map((principle, index) => (
                    <div key={index} className="case-study-content__principle">
                      <div className="case-study-content__principle-image-wrapper">
                        <img
                          src={principle.image}
                          alt={principle.title}
                          className="case-study-content__principle-image"
                        />
                      </div>
                      <div className="case-study-content__principle-content">
                        <h6 className="case-study-content__principle-title">{principle.title}</h6>
                        <p className="case-study-content__principle-description">{principle.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* Measuring Success Section */}
              {solution.timeline[1]?.measuringSuccessHeading && (
                <h4 className="case-study-content__heading">{solution.timeline[1].measuringSuccessHeading}</h4>
              )}
              {solution.timeline[1]?.measuringSuccessContent && (
                <p className="case-study-content__text">{solution.timeline[1].measuringSuccessContent}</p>
              )}
              {solution.timeline[1]?.measuringSuccessMetrics && (
                <div className="case-study-content__success-metrics">
                  <div className="case-study-content__success-metrics-grid">
                    {solution.timeline[1].measuringSuccessMetrics.map((item, index) => (
                      <div key={index} className="case-study-content__success-metric-card">
                        <span className={`case-study-content__success-metric-badge ${item.type === 'Primary Metric' ? 'case-study-content__success-metric-badge--primary' : ''}`}>
                          {item.type}
                        </span>
                        <h6 className="case-study-content__success-metric-title">{item.title}</h6>
                        {item.description && (
                          <p className="case-study-content__success-metric-description">{item.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Sprint Section */}
              {solution.timeline[1]?.sprintFullBleedImage && (
                <figure className="case-study-content__full-bleed">
                  <img
                    src={solution.timeline[1].sprintFullBleedImage.src}
                    alt={solution.timeline[1].sprintFullBleedImage.alt}
                  />
                </figure>
              )}
              {solution.timeline[1]?.sprintHeading && (
                <h4 className="case-study-content__heading">{solution.timeline[1].sprintHeading}</h4>
              )}
              {solution.timeline[1]?.sprintDay01Subheading && (
                <h5 className={`case-study-content__subheading ${solution.neutralHeadings ? 'case-study-content__subheading--neutral' : ''}`}>{solution.timeline[1].sprintDay01Subheading}</h5>
              )}
              {solution.timeline[1]?.sprintDay01Content && (
                solution.timeline[1].sprintDay01Content.split('\n\n').map((para, index) => (
                  <p key={index} className="case-study-content__text">{para}</p>
                ))
              )}
              {solution.timeline[1]?.sprintDay01Image && (
                <figure className={`case-study-content__section-image ${solution.timeline[1].sprintDay01Image.small ? 'case-study-content__section-image--small' : ''}`}>
                  <img src={solution.timeline[1].sprintDay01Image.src} alt={solution.timeline[1].sprintDay01Image.alt} className="case-study-content__section-image-img" />
                </figure>
              )}
              {solution.timeline[1]?.sprintDay01ContentAfterImage && (
                solution.timeline[1].sprintDay01ContentAfterImage.split('\n\n').map((para, index) => (
                  <p key={index} className="case-study-content__text">{para}</p>
                ))
              )}
              {(solution.timeline[1]?.sprintDay01TwoColumnText || solution.timeline[1]?.sprintDay01TwoColumnImage) && (
                <div className="case-study-content__two-column case-study-content__two-column--text-heavy">
                  <div className="case-study-content__two-column-content">
                    {solution.timeline[1]?.sprintDay01TwoColumnText && solution.timeline[1].sprintDay01TwoColumnText.split('\n\n').map((para, index) => (
                      <p key={index} className="case-study-content__text">{para}</p>
                    ))}
                  </div>
                  {solution.timeline[1]?.sprintDay01TwoColumnImage && (
                    <figure className="case-study-content__two-column-image">
                      <img src={solution.timeline[1].sprintDay01TwoColumnImage.src} alt={solution.timeline[1].sprintDay01TwoColumnImage.alt} />
                    </figure>
                  )}
                </div>
              )}
              {solution.timeline[1]?.sprintDay01Summary && (
                <p className="case-study-content__text">{solution.timeline[1].sprintDay01Summary}</p>
              )}
              {solution.timeline[1]?.sprintDay02Subheading && (
                <h5 className={`case-study-content__subheading ${solution.neutralHeadings ? 'case-study-content__subheading--neutral' : ''}`}>{solution.timeline[1].sprintDay02Subheading}</h5>
              )}
              {solution.timeline[1]?.sprintDay02Content && (
                solution.timeline[1].sprintDay02Content.split('\n\n').map((para, index) => (
                  <p key={index} className="case-study-content__text">{para}</p>
                ))
              )}
              {solution.timeline[1]?.sprintDay02Image && (
                <figure className="case-study-content__section-image">
                  <img src={solution.timeline[1].sprintDay02Image.src} alt={solution.timeline[1].sprintDay02Image.alt} className="case-study-content__section-image-img" />
                </figure>
              )}
              {solution.timeline[1]?.sprintDay02ContentAfterImage && (
                solution.timeline[1].sprintDay02ContentAfterImage.split('\n\n').map((para, index) => (
                  <p key={index} className="case-study-content__text">{para}</p>
                ))
              )}
              {solution.timeline[1]?.sprintDay02ProblemOpportunity && (
                <div className="case-study-content__problem-opportunity">
                  <div className="case-study-content__problem-opportunity-item">
                    <span className="case-study-content__problem-opportunity-label">Problem</span>
                    <p className="case-study-content__problem-opportunity-text">{solution.timeline[1].sprintDay02ProblemOpportunity.problem}</p>
                    {solution.timeline[1].sprintDay02ProblemOpportunity.problemImage && (
                      <img src={solution.timeline[1].sprintDay02ProblemOpportunity.problemImage} alt="Problem" className="case-study-content__problem-opportunity-image" />
                    )}
                  </div>
                  <div className="case-study-content__problem-opportunity-item">
                    <span className="case-study-content__problem-opportunity-label">Opportunity</span>
                    <p className="case-study-content__problem-opportunity-text">{solution.timeline[1].sprintDay02ProblemOpportunity.opportunity}</p>
                    {solution.timeline[1].sprintDay02ProblemOpportunity.opportunityImage && (
                      <img src={solution.timeline[1].sprintDay02ProblemOpportunity.opportunityImage} alt="Opportunity" className={`case-study-content__problem-opportunity-image ${solution.timeline[1].sprintDay02ProblemOpportunity.opportunityImageHalf ? 'case-study-content__problem-opportunity-image--half' : ''}`} />
                    )}
                  </div>
                </div>
              )}
              {solution.timeline[1]?.sprintDay02ProblemOpportunity02 && (
                <div className="case-study-content__problem-opportunity">
                  <div className="case-study-content__problem-opportunity-item">
                    <span className="case-study-content__problem-opportunity-label">Problem</span>
                    <p className="case-study-content__problem-opportunity-text">{solution.timeline[1].sprintDay02ProblemOpportunity02.problem}</p>
                    {solution.timeline[1].sprintDay02ProblemOpportunity02.problemImage && (
                      <img src={solution.timeline[1].sprintDay02ProblemOpportunity02.problemImage} alt="Problem" className="case-study-content__problem-opportunity-image" />
                    )}
                  </div>
                  <div className="case-study-content__problem-opportunity-item">
                    <span className="case-study-content__problem-opportunity-label">Opportunity</span>
                    <p className="case-study-content__problem-opportunity-text">{solution.timeline[1].sprintDay02ProblemOpportunity02.opportunity}</p>
                    {solution.timeline[1].sprintDay02ProblemOpportunity02.opportunityImage && (
                      <img src={solution.timeline[1].sprintDay02ProblemOpportunity02.opportunityImage} alt="Opportunity" className={`case-study-content__problem-opportunity-image ${solution.timeline[1].sprintDay02ProblemOpportunity02.opportunityImageHalf ? 'case-study-content__problem-opportunity-image--half' : ''}`} />
                    )}
                  </div>
                </div>
              )}
              {solution.timeline[1]?.sprintDay02ProblemOpportunity03 && (
                <div className="case-study-content__problem-opportunity">
                  <div className="case-study-content__problem-opportunity-item">
                    <span className="case-study-content__problem-opportunity-label">Problem</span>
                    <p className="case-study-content__problem-opportunity-text">{solution.timeline[1].sprintDay02ProblemOpportunity03.problem}</p>
                    {solution.timeline[1].sprintDay02ProblemOpportunity03.problemImage && (
                      <img src={solution.timeline[1].sprintDay02ProblemOpportunity03.problemImage} alt="Problem" className={`case-study-content__problem-opportunity-image ${solution.timeline[1].sprintDay02ProblemOpportunity03.problemImageSmall ? 'case-study-content__problem-opportunity-image--small' : ''}`} />
                    )}
                  </div>
                  <div className="case-study-content__problem-opportunity-item">
                    <span className="case-study-content__problem-opportunity-label">Opportunity</span>
                    <p className="case-study-content__problem-opportunity-text">{solution.timeline[1].sprintDay02ProblemOpportunity03.opportunity}</p>
                    {solution.timeline[1].sprintDay02ProblemOpportunity03.opportunityImage && (
                      <img src={solution.timeline[1].sprintDay02ProblemOpportunity03.opportunityImage} alt="Opportunity" className={`case-study-content__problem-opportunity-image ${solution.timeline[1].sprintDay02ProblemOpportunity03.opportunityImageHalf ? 'case-study-content__problem-opportunity-image--half' : ''}`} />
                    )}
                  </div>
                </div>
              )}
              {solution.timeline[1]?.sprintDay02ImageSecondary && (
                <figure className="case-study-content__section-image">
                  <img src={solution.timeline[1].sprintDay02ImageSecondary.src} alt={solution.timeline[1].sprintDay02ImageSecondary.alt} className="case-study-content__section-image-img" />
                </figure>
              )}
              {solution.timeline[1]?.sprintDay02ContentAfterImageSecondary && (
                solution.timeline[1].sprintDay02ContentAfterImageSecondary.split('\n\n').map((para, index) => (
                  <p key={index} className="case-study-content__text">{para}</p>
                ))
              )}
              {/* Leadership Section */}
              {solution.timeline[1]?.leadershipHeading && (
                <h4 className="case-study-content__heading">{solution.timeline[1].leadershipHeading}</h4>
              )}
              {solution.timeline[1]?.leadershipContent && (
                solution.timeline[1].leadershipContent.split('\n\n').map((para, index) => (
                  <p key={index} className="case-study-content__text">{para}</p>
                ))
              )}
              {/* Sprint Day 03 */}
              {solution.timeline[1]?.sprintDay03Subheading && (
                <h5 className={`case-study-content__subheading ${solution.neutralHeadings ? 'case-study-content__subheading--neutral' : ''}`}>{solution.timeline[1].sprintDay03Subheading}</h5>
              )}
              {solution.timeline[1]?.sprintDay03Content && (
                solution.timeline[1].sprintDay03Content.split('\n\n').map((para, index) => (
                  <p key={index} className="case-study-content__text">{para}</p>
                ))
              )}
              {solution.timeline[1]?.sprintDay03Image && (
                <figure className={`case-study-content__section-image ${solution.timeline[1].sprintDay03Image.small ? 'case-study-content__section-image--small' : ''}`}>
                  <img src={solution.timeline[1].sprintDay03Image.src} alt={solution.timeline[1].sprintDay03Image.alt} className="case-study-content__section-image-img" />
                </figure>
              )}
              {solution.timeline[1]?.sprintDay03ContentAfterImage && (
                solution.timeline[1].sprintDay03ContentAfterImage.split('\n\n').map((para, index) => (
                  <p key={index} className="case-study-content__text">{para}</p>
                ))
              )}
              {/* Customer Feedback Section */}
              {solution.timeline[1]?.customerFeedbackHeading && (
                <h4 className="case-study-content__heading">{solution.timeline[1].customerFeedbackHeading}</h4>
              )}
              {solution.timeline[1]?.customerFeedbackContent && (
                <p className="case-study-content__text">{solution.timeline[1].customerFeedbackContent}</p>
              )}
              {solution.timeline[1]?.customerFeedbackQuotes && (
                <div className="case-study-content__customer-quotes">
                  {solution.timeline[1].customerFeedbackQuotes.map((item, index) => (
                    <blockquote key={index} className="case-study-content__quote-card">
                      <span className="case-study-content__quote-mark case-study-content__quote-mark--open">"</span>
                      <p className="case-study-content__quote-text">{item.quote}</p>
                      <span className="case-study-content__quote-mark case-study-content__quote-mark--close">"</span>
                      <cite className="case-study-content__quote-author">- {item.author}</cite>
                    </blockquote>
                  ))}
                </div>
              )}
              {solution.timeline[1]?.customerFeedbackClosing && (
                <p className="case-study-content__text">{solution.timeline[1].customerFeedbackClosing}</p>
              )}
              {/* What We Released Section */}
              {solution.timeline[1]?.whatWeReleasedHeading && (
                <h4 className="case-study-content__heading">{solution.timeline[1].whatWeReleasedHeading}</h4>
              )}
              {solution.timeline[1]?.whatWeReleasedImage && (
                <figure
                  className="case-study-content__section-image case-study-content__section-image--clickable"
                  onClick={() => setSingleImageLightbox(solution.timeline[1].whatWeReleasedImage)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSingleImageLightbox(solution.timeline[1].whatWeReleasedImage)}
                >
                  <img src={solution.timeline[1].whatWeReleasedImage.src} alt={solution.timeline[1].whatWeReleasedImage.alt} className="case-study-content__section-image-img" />
                  <div className="case-study-content__section-image-zoom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                    </svg>
                  </div>
                </figure>
              )}
              {solution.timeline[1]?.whatWeReleasedContent && (
                <p className="case-study-content__text">{solution.timeline[1].whatWeReleasedContent}</p>
              )}
              {solution.timeline[1]?.whatWeReleasedArchitectureImage && (
                <figure className="case-study-content__section-image">
                  <img src={solution.timeline[1].whatWeReleasedArchitectureImage.src} alt={solution.timeline[1].whatWeReleasedArchitectureImage.alt} className="case-study-content__section-image-img" />
                </figure>
              )}
              {solution.timeline[1]?.whatWeReleasedPrinciple1Heading && (
                <h5 className={`case-study-content__subheading ${solution.neutralHeadings ? 'case-study-content__subheading--neutral' : ''}`}>{solution.timeline[1].whatWeReleasedPrinciple1Heading}</h5>
              )}
              {solution.timeline[1]?.whatWeReleasedPrinciple1Image && (
                <figure
                  className="case-study-content__section-image case-study-content__section-image--clickable"
                  onClick={() => setSingleImageLightbox(solution.timeline[1].whatWeReleasedPrinciple1Image)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSingleImageLightbox(solution.timeline[1].whatWeReleasedPrinciple1Image)}
                >
                  <img src={solution.timeline[1].whatWeReleasedPrinciple1Image.src} alt={solution.timeline[1].whatWeReleasedPrinciple1Image.alt} className="case-study-content__section-image-img" />
                  <div className="case-study-content__section-image-zoom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                    </svg>
                  </div>
                </figure>
              )}
              {solution.timeline[1]?.whatWeReleasedPrinciple1Content && (
                <p className="case-study-content__text">{solution.timeline[1].whatWeReleasedPrinciple1Content}</p>
              )}
              {solution.timeline[1]?.whatWeReleasedPrinciple2Heading && (
                <h5 className={`case-study-content__subheading ${solution.neutralHeadings ? 'case-study-content__subheading--neutral' : ''}`}>{solution.timeline[1].whatWeReleasedPrinciple2Heading}</h5>
              )}
              {solution.timeline[1]?.whatWeReleasedPrinciple2Image && (
                <figure
                  className="case-study-content__section-image case-study-content__section-image--clickable"
                  onClick={() => setSingleImageLightbox(solution.timeline[1].whatWeReleasedPrinciple2Image)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSingleImageLightbox(solution.timeline[1].whatWeReleasedPrinciple2Image)}
                >
                  <img src={solution.timeline[1].whatWeReleasedPrinciple2Image.src} alt={solution.timeline[1].whatWeReleasedPrinciple2Image.alt} className="case-study-content__section-image-img" />
                  <div className="case-study-content__section-image-zoom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                    </svg>
                  </div>
                </figure>
              )}
              {solution.timeline[1]?.whatWeReleasedPrinciple2Content && (
                <p className="case-study-content__text">{solution.timeline[1].whatWeReleasedPrinciple2Content}</p>
              )}
              {solution.timeline[1]?.whatWeReleasedPrinciple3Heading && (
                <h5 className={`case-study-content__subheading ${solution.neutralHeadings ? 'case-study-content__subheading--neutral' : ''}`}>{solution.timeline[1].whatWeReleasedPrinciple3Heading}</h5>
              )}
              {solution.timeline[1]?.whatWeReleasedPrinciple3Image && (
                <figure
                  className="case-study-content__section-image case-study-content__section-image--clickable"
                  onClick={() => setSingleImageLightbox(solution.timeline[1].whatWeReleasedPrinciple3Image)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSingleImageLightbox(solution.timeline[1].whatWeReleasedPrinciple3Image)}
                >
                  <img src={solution.timeline[1].whatWeReleasedPrinciple3Image.src} alt={solution.timeline[1].whatWeReleasedPrinciple3Image.alt} className="case-study-content__section-image-img" />
                  <div className="case-study-content__section-image-zoom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                    </svg>
                  </div>
                </figure>
              )}
              {solution.timeline[1]?.whatWeReleasedPrinciple3Content && (
                <p className="case-study-content__text">{solution.timeline[1].whatWeReleasedPrinciple3Content}</p>
              )}
              {/* Operational Framework Section */}
              {solution.timeline[1]?.operationalFrameworkHeading && (
                <h4 className="case-study-content__heading">{solution.timeline[1].operationalFrameworkHeading}</h4>
              )}
              {solution.timeline[1]?.operationalFrameworkContent && (
                solution.timeline[1].operationalFrameworkContent.split('\n\n').map((para, index) => (
                  <p key={index} className="case-study-content__text">{para}</p>
                ))
              )}
              {solution.timeline[1]?.operationalFrameworkImage && (
                <figure className="case-study-content__section-image">
                  <img src={solution.timeline[1].operationalFrameworkImage.src} alt={solution.timeline[1].operationalFrameworkImage.alt} className="case-study-content__section-image-img" />
                </figure>
              )}
              {solution.timeline[1]?.reflectionHeading && (
                <h4 className="case-study-content__heading">{solution.timeline[1].reflectionHeading}</h4>
              )}
              {solution.timeline[1]?.reflectionContent && (
                solution.timeline[1].reflectionContent.split('\n\n').map((para, index) => (
                  <p key={index} className="case-study-content__text">{para}</p>
                ))
              )}
              {solution.timeline[1]?.sectionContentAfterPlanning && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentAfterPlanning}</p>
              )}
              {solution.timeline[1]?.sectionContentCrossOrg && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentCrossOrg}</p>
              )}
              {solution.timeline[1]?.sectionContentTeamBuilding && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentTeamBuilding}</p>
              )}
              {solution.timeline[1]?.sectionHeadingTertiary && (
                <h4 className="case-study-content__heading">{solution.timeline[1].sectionHeadingTertiary}</h4>
              )}
              {solution.timeline[1]?.sectionContentQuaternary && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentQuaternary}</p>
              )}
              {solution.timeline[1]?.visionQuestions && (
                <div className="case-study-content__vision-questions">
                  <div className="case-study-content__vision-questions-grid">
                    {solution.timeline[1].visionQuestions.items.map((item, index) => (
                      <div key={index} className="case-study-content__vision-question-card">
                        <span className="case-study-content__vision-question-badge">
                          {item.category}
                        </span>
                        <p className="case-study-content__vision-question-text">{item.question}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {solution.timeline[1]?.sectionContentAfterVision && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentAfterVision}</p>
              )}
              {solution.timeline[1]?.sectionImageAfterVision && (
                <figure
                  className="case-study-content__section-image case-study-content__section-image--clickable"
                  onClick={() => setSingleImageLightbox(solution.timeline[1].sectionImageAfterVision)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSingleImageLightbox(solution.timeline[1].sectionImageAfterVision)}
                >
                  <img
                    src={solution.timeline[1].sectionImageAfterVision.src}
                    alt={solution.timeline[1].sectionImageAfterVision.alt}
                    className="case-study-content__section-image-img"
                  />
                  <div className="case-study-content__section-image-zoom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                    </svg>
                  </div>
                </figure>
              )}
              {solution.timeline[1]?.sectionContentAfterTimeline && (
                solution.timeline[1].sectionContentAfterTimeline.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="case-study-content__text">{paragraph}</p>
                ))
              )}
              {solution.timeline[1]?.sectionImageMapInsight && (
                <figure className="case-study-content__section-image">
                  <img
                    src={solution.timeline[1].sectionImageMapInsight.src}
                    alt={solution.timeline[1].sectionImageMapInsight.alt}
                    className="case-study-content__section-image-img"
                  />
                </figure>
              )}
              {solution.timeline[1]?.sectionContentBeforeVideo && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentBeforeVideo}</p>
              )}
              {solution.timeline[1]?.phoneVideo && (
                <figure className="case-study-content__phone-video">
                  <div className="case-study-content__phone-video-container">
                    <video
                      src={solution.timeline[1].phoneVideo.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="case-study-content__phone-video-player"
                    />
                    {solution.timeline[1].phoneVideo.frame && (
                      <img
                        src={solution.timeline[1].phoneVideo.frame}
                        alt=""
                        className="case-study-content__phone-video-frame"
                      />
                    )}
                  </div>
                  {solution.timeline[1].phoneVideo.caption && (
                    <figcaption className="case-study-content__phone-video-caption">
                      {solution.timeline[1].phoneVideo.caption}
                    </figcaption>
                  )}
                </figure>
              )}
              {solution.timeline[1]?.sectionContentAfterVideo && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentAfterVideo}</p>
              )}
              {solution.timeline[1]?.sectionContentAfterVideoSecondary && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentAfterVideoSecondary}</p>
              )}
              {solution.timeline[1]?.phoneVideoSecondary && (
                <figure className="case-study-content__phone-video">
                  <div className="case-study-content__phone-video-container">
                    <video
                      src={solution.timeline[1].phoneVideoSecondary.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="case-study-content__phone-video-player"
                    />
                  </div>
                  {solution.timeline[1].phoneVideoSecondary.caption && (
                    <figcaption className="case-study-content__phone-video-caption">
                      {solution.timeline[1].phoneVideoSecondary.caption}
                    </figcaption>
                  )}
                </figure>
              )}
              {solution.timeline[1]?.sectionContentAfterVideoTertiary && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentAfterVideoTertiary}</p>
              )}
              {solution.timeline[1]?.phoneVideoTertiary && (
                <figure className="case-study-content__phone-video">
                  <div className="case-study-content__phone-video-container">
                    <video
                      src={solution.timeline[1].phoneVideoTertiary.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="case-study-content__phone-video-player"
                    />
                  </div>
                  {solution.timeline[1].phoneVideoTertiary.caption && (
                    <figcaption className="case-study-content__phone-video-caption">
                      {solution.timeline[1].phoneVideoTertiary.caption}
                    </figcaption>
                  )}
                </figure>
              )}
              {solution.timeline[1]?.sectionHeadingQuaternary && (
                <h4 className="case-study-content__heading">{solution.timeline[1].sectionHeadingQuaternary}</h4>
              )}
              {solution.timeline[1]?.sectionContentQuinary && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentQuinary}</p>
              )}
              {solution.timeline[1]?.customerQuotesSecondary && (
                <div className="case-study-content__customer-quotes-labeled">
                  {solution.timeline[1].customerQuotesSecondary.map((item, index) => (
                    <blockquote key={index} className="case-study-content__quote-card-labeled">
                      <span className="case-study-content__quote-category">{item.category}</span>
                      <span className="case-study-content__quote-mark case-study-content__quote-mark--open">"</span>
                      <p className="case-study-content__quote-text">{item.quote}</p>
                      <span className="case-study-content__quote-mark case-study-content__quote-mark--close">"</span>
                      <cite className="case-study-content__quote-author">- {item.author}</cite>
                    </blockquote>
                  ))}
                </div>
              )}
              {solution.timeline[1]?.sectionHeadingScoping && (
                <h4 className="case-study-content__heading">{solution.timeline[1].sectionHeadingScoping}</h4>
              )}
              {solution.timeline[1]?.sectionContentScoping && (
                solution.timeline[1].sectionContentScoping.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="case-study-content__text">{paragraph}</p>
                ))
              )}
              {solution.timeline[1]?.sectionHeadingMilestone1 && (
                <h4 className="case-study-content__heading">{solution.timeline[1].sectionHeadingMilestone1}</h4>
              )}
              {solution.timeline[1]?.sectionContentMilestone1 && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentMilestone1}</p>
              )}
              {solution.timeline[1]?.sectionImageMilestone1 && (
                <figure
                  className="case-study-content__section-image case-study-content__section-image--clickable"
                  onClick={() => setSingleImageLightbox(solution.timeline[1].sectionImageMilestone1)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSingleImageLightbox(solution.timeline[1].sectionImageMilestone1)}
                >
                  <img
                    src={solution.timeline[1].sectionImageMilestone1.src}
                    alt={solution.timeline[1].sectionImageMilestone1.alt}
                    className="case-study-content__section-image-img"
                  />
                  <div className="case-study-content__section-image-zoom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                    </svg>
                  </div>
                </figure>
              )}
              {solution.timeline[1]?.sectionHeadingMilestone2 && (
                <h4 className="case-study-content__heading">{solution.timeline[1].sectionHeadingMilestone2}</h4>
              )}
              {(solution.timeline[1]?.sectionImageMilestone2 || solution.timeline[1]?.sectionContentMilestone2) && (
                <div className="case-study-content__two-column">
                  {solution.timeline[1]?.sectionImageMilestone2 && (
                    <figure className="case-study-content__two-column-image">
                      <img
                        src={solution.timeline[1].sectionImageMilestone2.src}
                        alt={solution.timeline[1].sectionImageMilestone2.alt}
                      />
                    </figure>
                  )}
                  {solution.timeline[1]?.sectionContentMilestone2 && (
                    <div className="case-study-content__two-column-content">
                      {solution.timeline[1].sectionContentMilestone2.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="case-study-content__text">{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>
              )}
              {solution.timeline[1]?.sectionHeadingMilestone3 && (
                <h4 className="case-study-content__heading">{solution.timeline[1].sectionHeadingMilestone3}</h4>
              )}
              {(solution.timeline[1]?.sectionImageMilestone3 || solution.timeline[1]?.sectionContentMilestone3) && (
                <div className="case-study-content__two-column case-study-content__two-column--reverse">
                  {solution.timeline[1]?.sectionContentMilestone3 && (
                    <div className="case-study-content__two-column-content">
                      {solution.timeline[1].sectionContentMilestone3.split('\n\n').map((paragraph, index) => (
                        <p key={index} className="case-study-content__text">{paragraph}</p>
                      ))}
                    </div>
                  )}
                  {solution.timeline[1]?.sectionImageMilestone3 && (
                    <figure className="case-study-content__two-column-image">
                      <img
                        src={solution.timeline[1].sectionImageMilestone3.src}
                        alt={solution.timeline[1].sectionImageMilestone3.alt}
                      />
                    </figure>
                  )}
                </div>
              )}
              {solution.timeline[1]?.sectionImageCrossPlatform && (
                <figure className="case-study-content__section-image">
                  <img
                    src={solution.timeline[1].sectionImageCrossPlatform.src}
                    alt={solution.timeline[1].sectionImageCrossPlatform.alt}
                    className="case-study-content__section-image-img"
                  />
                  {solution.timeline[1].sectionImageCrossPlatform.caption && (
                    <figcaption className="case-study-content__section-image-caption">
                      {solution.timeline[1].sectionImageCrossPlatform.caption}
                    </figcaption>
                  )}
                </figure>
              )}
              {solution.timeline[1]?.sectionContentCrossPlatform && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentCrossPlatform}</p>
              )}
              {solution.timeline[1]?.desktopVideo && (
                <figure className="case-study-content__desktop-video">
                  <video
                    src={solution.timeline[1].desktopVideo.src}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="case-study-content__desktop-video-player"
                  />
                  {solution.timeline[1].desktopVideo.caption && (
                    <figcaption className="case-study-content__desktop-video-caption">
                      {solution.timeline[1].desktopVideo.caption}
                    </figcaption>
                  )}
                </figure>
              )}

              {solution.timeline[1]?.sectionHeadingImpact && (
                <h3 className="case-study-content__heading">{solution.timeline[1].sectionHeadingImpact}</h3>
              )}

              {solution.timeline[1]?.sectionContentImpact && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentImpact}</p>
              )}

              {(solution.timeline[1]?.impactImage || solution.timeline[1]?.impactMetrics) && (
                <div className="case-study-content__impact-row">
                  {solution.timeline[1]?.impactImage && (
                    <div className="case-study-content__impact-image">
                      <img
                        src={solution.timeline[1].impactImage.src}
                        alt={solution.timeline[1].impactImage.alt}
                      />
                    </div>
                  )}
                  {solution.timeline[1]?.impactMetrics && (
                    <div className="case-study-content__impact-metrics">
                      {solution.timeline[1].impactMetrics.map((metric, index) => (
                        <div key={index} className="case-study-content__impact-metric">
                          <span className="case-study-content__impact-value">{metric.value}</span>
                          <span className="case-study-content__impact-label">{metric.label}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}

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

      {/* Single Image Lightbox */}
      {singleImageLightbox && (
        <div className="lightbox" onClick={() => setSingleImageLightbox(null)}>
          <button className="lightbox__close" onClick={() => setSingleImageLightbox(null)} aria-label="Close lightbox">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img
              src={singleImageLightbox.src}
              alt={singleImageLightbox.alt}
              className="lightbox__image"
            />
          </div>
        </div>
      )}

      {/* Impact Section */}
      {impact && (
        <section className="case-study-content__section">
          <h4 className={impact.headingAccent ? "case-study-content__subheading" : "case-study-content__heading"}>{impact.heading}</h4>

          {/* Narrative */}
          {impact.narrative && impact.narrative.split('\n\n').map((para, index) => (
            <p key={index} className="case-study-content__text">{para}</p>
          ))}

          {/* Platform Images 4-up */}
          {impact.platformImages && impact.platformImages.length > 0 && (
            <div className="case-study-content__platform-grid">
              {impact.platformImages.map((image, index) => (
                <div key={index} className="case-study-content__platform-grid-item">
                  <img src={image.src} alt={image.alt} />
                  {image.label && <span className="case-study-content__platform-grid-label">{image.label}</span>}
                </div>
              ))}
            </div>
          )}

          {/* Narrative After Images */}
          {impact.narrativeAfterImages && (
            <p className="case-study-content__text">{impact.narrativeAfterImages}</p>
          )}

          {/* Narrative Before Two-Up */}
          {impact.narrativeBeforeTwoUp && (
            <p className="case-study-content__text">{impact.narrativeBeforeTwoUp}</p>
          )}

          {/* Platform Two-Up Images */}
          {impact.platformTwoUp && impact.platformTwoUp.length > 0 && (
            <div className="case-study-content__platform-two-up">
              {impact.platformTwoUp.map((image, index) => (
                <figure key={index} className="case-study-content__platform-two-up-item">
                  <img src={image.src} alt={image.alt} />
                  {image.label && <figcaption className="case-study-content__platform-two-up-label">{image.label}</figcaption>}
                </figure>
              ))}
            </div>
          )}

          {/* Narrative After Two-Up */}
          {impact.narrativeAfterTwoUp && (
            <p className="case-study-content__text">{impact.narrativeAfterTwoUp}</p>
          )}

          {/* Platform Two-Up Second */}
          {impact.platformTwoUpSecond && impact.platformTwoUpSecond.length > 0 && (
            <div className="case-study-content__platform-two-up">
              {impact.platformTwoUpSecond.map((image, index) => (
                <figure key={index} className="case-study-content__platform-two-up-item">
                  <img src={image.src} alt={image.alt} />
                  {image.label && <figcaption className="case-study-content__platform-two-up-label">{image.label}</figcaption>}
                </figure>
              ))}
            </div>
          )}

          {/* Final Narrative */}
          {impact.narrativeFinal && impact.narrativeFinal.split('\n\n').map((para, index) => (
            <p key={index} className="case-study-content__text">{para}</p>
          ))}

          {/* Platform Two-Up Third */}
          {impact.platformTwoUpThird && impact.platformTwoUpThird.length > 0 && (
            <div className="case-study-content__platform-two-up">
              {impact.platformTwoUpThird.map((image, index) => (
                <figure key={index} className="case-study-content__platform-two-up-item">
                  <img src={image.src} alt={image.alt} />
                  {image.label && <figcaption className="case-study-content__platform-two-up-label">{image.label}</figcaption>}
                </figure>
              ))}
            </div>
          )}

          {/* Lessons from Failure */}
          {impact.lessonsHeading && (
            <h4 className="case-study-content__heading">{impact.lessonsHeading}</h4>
          )}
          {impact.lessonsNarrative && impact.lessonsNarrative.split('\n\n').map((para, index) => (
            <p key={index} className="case-study-content__text">{para}</p>
          ))}

          {/* Lessons Image */}
          {impact.lessonsImage && (
            <figure className="case-study-content__lessons-image">
              <img
                src={impact.lessonsImage.src}
                alt={impact.lessonsImage.alt}
              />
              {impact.lessonsImage.caption && (
                <figcaption className="case-study-content__caption">
                  {impact.lessonsImage.caption}
                </figcaption>
              )}
            </figure>
          )}

          {/* Lessons Narrative After Image */}
          {impact.lessonsNarrativeAfterImage && impact.lessonsNarrativeAfterImage.split('\n\n').map((para, index) => (
            <p key={index} className="case-study-content__text">{para}</p>
          ))}

          {/* Lessons Video */}
          {impact.lessonsVideo && (
            <figure className="case-study-content__lessons-image">
              <video
                src={impact.lessonsVideo.src}
                autoPlay
                loop
                muted
                playsInline
              />
              {impact.lessonsVideo.caption && (
                <figcaption className="case-study-content__caption">
                  {impact.lessonsVideo.caption}
                </figcaption>
              )}
            </figure>
          )}

          {/* Lessons Narrative After Video */}
          {impact.lessonsNarrativeAfterVideo && (
            <p className="case-study-content__text">{impact.lessonsNarrativeAfterVideo}</p>
          )}

          {/* Lessons Video 02 - Two Column Layout */}
          {(impact.lessonsVideo02 || impact.lessonsNarrativeAfterVideo02) && (
            <div className="case-study-content__lessons-conclusion">
              {impact.lessonsVideo02 && (
                <figure className="case-study-content__lessons-conclusion-image">
                  <video
                    src={impact.lessonsVideo02.src}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  {impact.lessonsVideo02.caption && (
                    <figcaption className="case-study-content__caption">
                      {impact.lessonsVideo02.caption}
                    </figcaption>
                  )}
                </figure>
              )}
              {impact.lessonsNarrativeAfterVideo02 && (
                <div className="case-study-content__lessons-conclusion-text">
                  {impact.lessonsNarrativeAfterVideo02.split('\n\n').map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Lessons Conclusion - Two Column Layout (text left, image right) */}
          {(impact.lessonsNarrativeConclusion || impact.lessonsImageConclusion) && (
            <div className="case-study-content__lessons-conclusion">
              {impact.lessonsNarrativeConclusion && (
                <div className="case-study-content__lessons-conclusion-text">
                  {impact.lessonsNarrativeConclusion.split('\n\n').map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
                </div>
              )}
              {impact.lessonsImageConclusion && (
                <figure className="case-study-content__lessons-conclusion-image">
                  <img
                    src={impact.lessonsImageConclusion.src}
                    alt={impact.lessonsImageConclusion.alt}
                  />
                  {impact.lessonsImageConclusion.caption && (
                    <figcaption className="case-study-content__caption">
                      {impact.lessonsImageConclusion.caption}
                    </figcaption>
                  )}
                </figure>
              )}
            </div>
          )}

          {/* Impact Heading */}
          {impact.impactHeading && (
            <h4 className="case-study-content__heading">{impact.impactHeading}</h4>
          )}

          {/* Impact Narrative */}
          {impact.impactNarrative && (
            <p className="case-study-content__text">{impact.impactNarrative}</p>
          )}

          {/* Impact Image 02 with Metrics */}
          {(impact.impactImage02 || impact.impactMetrics02) && (
            <div className="case-study-content__impact-row">
              {impact.impactImage02 && (
                <div className="case-study-content__impact-image">
                  <img
                    src={impact.impactImage02.src}
                    alt={impact.impactImage02.alt}
                  />
                </div>
              )}
              {impact.impactMetrics02 && (
                <div className="case-study-content__impact-metrics">
                  {impact.impactMetrics02.map((metric, index) => (
                    <div key={index} className="case-study-content__impact-metric">
                      <span className="case-study-content__impact-value">{metric.value}</span>
                      <span className="case-study-content__impact-label">{metric.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Future Explorations */}
          {impact.futureExplorationsHeading && (
            <h3 className="case-study-content__heading">{impact.futureExplorationsHeading}</h3>
          )}
          {impact.futureExplorationsNarrative && (
            <p className="case-study-content__text">{impact.futureExplorationsNarrative}</p>
          )}
          {impact.futureExplorationsImages && impact.futureExplorationsImages.length > 0 && (
            <figure className="case-study-content__future-grid-wrapper">
              <div className="case-study-content__platform-grid">
                {impact.futureExplorationsImages.map((image, index) => (
                  <div
                    key={index}
                    className="case-study-content__platform-grid-item case-study-content__platform-grid-item--clickable"
                    onClick={() => setSingleImageLightbox(image)}
                  >
                    <img src={image.src} alt={image.alt} />
                    <div className="case-study-content__platform-grid-zoom">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
              {impact.futureExplorationsImagesLabel && (
                <figcaption className="case-study-content__grid-label">{impact.futureExplorationsImagesLabel}</figcaption>
              )}
            </figure>
          )}
          {impact.futureTwoUpNarrative && (
            <p className="case-study-content__text">{impact.futureTwoUpNarrative}</p>
          )}
          {impact.futureTwoUp && impact.futureTwoUp.length > 0 && (
            <div className="case-study-content__platform-two-up">
              {impact.futureTwoUp.map((item, index) => (
                <figure key={index} className="case-study-content__platform-two-up-item">
                  {item.type === 'video' ? (
                    <div className="case-study-content__platform-two-up-video-container">
                      <video
                        src={item.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="case-study-content__platform-two-up-video"
                      />
                    </div>
                  ) : (
                    <img src={item.src} alt={item.alt} />
                  )}
                  {item.label && <figcaption className="case-study-content__platform-two-up-label">{item.label}</figcaption>}
                </figure>
              ))}
            </div>
          )}

          {/* Metrics */}
          {impact.metrics && <CaseStudyMetrics metrics={impact.metrics} />}

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
