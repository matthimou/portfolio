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
          {introduction.closingFinal && introduction.closingFinalBelowVideo && (
            <p className="case-study-content__text">{introduction.closingFinal}</p>
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
          {introduction.closingFinalSecondary && (
            <p className="case-study-content__text">{introduction.closingFinalSecondary}</p>
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
              {solution.timeline[0].sectionHeading && (
                <h5 className="case-study-content__subheading">{solution.timeline[0].sectionHeading}</h5>
              )}
              {solution.timeline[0].sectionContent && (
                <p className="case-study-content__text">{solution.timeline[0].sectionContent}</p>
              )}
              {solution.timeline[0].sectionContentSecondary && (
                <p className="case-study-content__text">{solution.timeline[0].sectionContentSecondary}</p>
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
                <h5 className="case-study-content__subheading">{solution.timeline[1].sectionHeading}</h5>
              )}
              {solution.timeline[1]?.sectionContent && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContent}</p>
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
                <p className="case-study-content__text">{solution.timeline[1].sectionContentTertiary}</p>
              )}
              {solution.timeline[1]?.sectionContentAfterPlanning && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentAfterPlanning}</p>
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
              {solution.timeline[1]?.sectionContentAfterVideoSecondary && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentAfterVideoSecondary}</p>
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
              {solution.timeline[1]?.sectionContentAfterVideoTertiary && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentAfterVideoTertiary}</p>
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
