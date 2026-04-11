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
  const [mvpLightboxOpen, setMvpLightboxOpen] = useState(false)
  const [mvpLightboxIndex, setMvpLightboxIndex] = useState(0)

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

  // Combine MVP images for lightbox (entry points + shopping flow)
  const mvpImages = [
    ...(solution?.timeline?.[0]?.sectionImages?.images || []),
    ...(solution?.timeline?.[0]?.sectionImageFlow?.images || [])
  ]

  const openMvpLightbox = useCallback((index) => {
    setMvpLightboxIndex(index)
    setMvpLightboxOpen(true)
  }, [])

  const closeMvpLightbox = useCallback(() => {
    setMvpLightboxOpen(false)
  }, [])

  const goToMvpPrev = useCallback(() => {
    setMvpLightboxIndex((prev) =>
      prev === 0 ? mvpImages.length - 1 : prev - 1
    )
  }, [mvpImages.length])

  const goToMvpNext = useCallback(() => {
    setMvpLightboxIndex((prev) =>
      prev === mvpImages.length - 1 ? 0 : prev + 1
    )
  }, [mvpImages.length])

  // Video row lightbox state
  const [videoLightboxOpen, setVideoLightboxOpen] = useState(false)
  const [videoLightboxIndex, setVideoLightboxIndex] = useState(0)

  const phoneVideosRow = solution?.timeline?.[1]?.phoneVideosRow || []

  const openVideoLightbox = useCallback((index) => {
    setVideoLightboxIndex(index)
    setVideoLightboxOpen(true)
  }, [])

  const closeVideoLightbox = useCallback(() => {
    setVideoLightboxOpen(false)
  }, [])

  const goToVideoPrev = useCallback(() => {
    setVideoLightboxIndex((prev) =>
      prev === 0 ? phoneVideosRow.length - 1 : prev - 1
    )
  }, [phoneVideosRow.length])

  const goToVideoNext = useCallback(() => {
    setVideoLightboxIndex((prev) =>
      prev === phoneVideosRow.length - 1 ? 0 : prev + 1
    )
  }, [phoneVideosRow.length])

  // Platform section lightbox state
  const [platformLightboxOpen, setPlatformLightboxOpen] = useState(false)
  const [platformLightboxIndex, setPlatformLightboxIndex] = useState(0)

  // Combine all platform images for lightbox
  const platformAllImages = [
    ...(impact?.platformImages || []),
    ...(impact?.imageAfterFirstPara ? [impact.imageAfterFirstPara] : []),
    ...(impact?.imageAfterNarrative ? [impact.imageAfterNarrative] : []),
    ...(impact?.platformThreeUp || []),
    ...(impact?.platformTwoUpThird || [])
  ]

  const openPlatformLightbox = useCallback((index) => {
    setPlatformLightboxIndex(index)
    setPlatformLightboxOpen(true)
  }, [])

  const closePlatformLightbox = useCallback(() => {
    setPlatformLightboxOpen(false)
  }, [])

  const goToPlatformPrev = useCallback(() => {
    setPlatformLightboxIndex((prev) =>
      prev === 0 ? platformAllImages.length - 1 : prev - 1
    )
  }, [platformAllImages.length])

  const goToPlatformNext = useCallback(() => {
    setPlatformLightboxIndex((prev) =>
      prev === platformAllImages.length - 1 ? 0 : prev + 1
    )
  }, [platformAllImages.length])

  // Lessons media row lightbox state
  const [lessonsLightboxOpen, setLessonsLightboxOpen] = useState(false)
  const [lessonsLightboxIndex, setLessonsLightboxIndex] = useState(0)

  const lessonsMediaRow = impact?.lessonsMediaRow || []

  const openLessonsLightbox = useCallback((index) => {
    setLessonsLightboxIndex(index)
    setLessonsLightboxOpen(true)
  }, [])

  const closeLessonsLightbox = useCallback(() => {
    setLessonsLightboxOpen(false)
  }, [])

  const goToLessonsPrev = useCallback(() => {
    setLessonsLightboxIndex((prev) =>
      prev === 0 ? lessonsMediaRow.length - 1 : prev - 1
    )
  }, [lessonsMediaRow.length])

  const goToLessonsNext = useCallback(() => {
    setLessonsLightboxIndex((prev) =>
      prev === lessonsMediaRow.length - 1 ? 0 : prev + 1
    )
  }, [lessonsMediaRow.length])

  return (
    <div className="case-study-content">
      {/* Introduction Section */}
      {introduction && (
        <section className="case-study-content__section">
          <h4 className="case-study-content__heading">{introduction.heading}</h4>
          {introduction.content && introduction.content.split('\n\n').map((para, index) => (
            <p key={index} className="case-study-content__text">{para}</p>
          ))}
          {introduction.contentSecondary && (
            <p className="case-study-content__text">{introduction.contentSecondary}</p>
          )}
          {introduction.introHighlights && introduction.introHighlights.length > 0 && (
            <div className="case-study-content__intro-highlights">
              {introduction.introHighlights.map((highlight, index) => (
                <div key={index} className="case-study-content__intro-highlight">
                  <h5 className="case-study-content__intro-highlight-heading">{highlight.heading}</h5>
                  <p className="case-study-content__intro-highlight-content">{highlight.content}</p>
                </div>
              ))}
            </div>
          )}
          {introduction.beforeAfterHeading && (
            <h4 className="case-study-content__heading">{introduction.beforeAfterHeading}</h4>
          )}
          {introduction.beforeAfterContent && (
            <p className="case-study-content__text">{introduction.beforeAfterContent}</p>
          )}
          {introduction.beforeAfterImages && introduction.beforeAfterImages.length > 0 && (
            <div className="case-study-content__platform-two-up case-study-content__platform-two-up--small">
              {introduction.beforeAfterImages.map((item, index) => (
                <figure key={index} className="case-study-content__platform-two-up-item">
                  {item.label && <figcaption className="case-study-content__platform-two-up-label case-study-content__platform-two-up-label--above">{item.label}</figcaption>}
                  <img
                    src={item.src}
                    alt={item.alt}
                    style={item.scale ? { transform: `scale(${item.scale})` } : undefined}
                  />
                </figure>
              ))}
            </div>
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
                <figure className="case-study-content__image-pair">
                  <div className="case-study-content__image-pair-row">
                    {solution.timeline[0].sectionImages.images.map((image, index) => (
                      <div
                        key={index}
                        className="case-study-content__image-pair-item case-study-content__image-clickable"
                        onClick={() => openMvpLightbox(index)}
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === 'Enter' && openMvpLightbox(index)}
                      >
                        <img
                          src={image.src}
                          alt={image.alt}
                          className="case-study-content__image-pair-img"
                        />
                        <div className="case-study-content__image-zoom">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                          </svg>
                        </div>
                      </div>
                    ))}
                  </div>
                  {solution.timeline[0].sectionImages.label && (
                    <figcaption className="case-study-content__image-pair-label">
                      {solution.timeline[0].sectionImages.label}
                    </figcaption>
                  )}
                </figure>
              )}
              {solution.timeline[0].sectionContentAfterImages && (
                <p className="case-study-content__text">{solution.timeline[0].sectionContentAfterImages}</p>
              )}
              {solution.timeline[0].sectionImageFlow && (
                <figure className="case-study-content__image-flow">
                  <div className="case-study-content__image-flow-row">
                    {solution.timeline[0].sectionImageFlow.images.map((image, index) => {
                      const entryPointCount = solution.timeline[0].sectionImages?.images?.length || 0
                      return (
                        <div
                          key={index}
                          className="case-study-content__image-flow-item case-study-content__image-clickable"
                          onClick={() => openMvpLightbox(entryPointCount + index)}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => e.key === 'Enter' && openMvpLightbox(entryPointCount + index)}
                        >
                          <img
                            src={image.src}
                            alt={image.alt}
                            className="case-study-content__image-flow-img"
                          />
                          <div className="case-study-content__image-zoom">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <circle cx="11" cy="11" r="8" />
                              <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                            </svg>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                  {solution.timeline[0].sectionImageFlow.label && (
                    <figcaption className="case-study-content__image-flow-label">
                      {solution.timeline[0].sectionImageFlow.label}
                    </figcaption>
                  )}
                </figure>
              )}
              {solution.timeline[0].sectionHeadingAfterFlow && (
                <h5 className={`case-study-content__subheading ${solution.neutralHeadings ? 'case-study-content__subheading--neutral' : ''}`}>{solution.timeline[0].sectionHeadingAfterFlow}</h5>
              )}
              {solution.timeline[0].sectionContentAfterFlow && (
                <p className="case-study-content__text">{solution.timeline[0].sectionContentAfterFlow}</p>
              )}
              {solution.timeline[0].sectionContentAfterFlowSecondary && (
                <p className="case-study-content__text">{solution.timeline[0].sectionContentAfterFlowSecondary}</p>
              )}
              {solution.timeline[0].sectionContentAfterFlowTertiary && (
                <p className="case-study-content__text">{solution.timeline[0].sectionContentAfterFlowTertiary}</p>
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
                  {solution.timeline[1].successMetrics.intro && (
                    <p className="case-study-content__text">{solution.timeline[1].successMetrics.intro}</p>
                  )}
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
                            {solution.timeline[1]?.sectionContentAfterPlanning && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentAfterPlanning}</p>
              )}
              {solution.timeline[1]?.planningHighlight && (
                <div className="case-study-content__key-learning">
                  <h5 className="case-study-content__key-learning-heading">
                    {solution.timeline[1].planningHighlight.heading}
                  </h5>
                  <p className="case-study-content__key-learning-content">
                    {solution.timeline[1].planningHighlight.content}
                  </p>
                </div>
              )}
              {solution.timeline[1]?.sectionHeadingCrossOrg && (
                <h5 className="case-study-content__subheading case-study-content__subheading--neutral">{solution.timeline[1].sectionHeadingCrossOrg}</h5>
              )}
              {solution.timeline[1]?.sectionContentCrossOrg && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentCrossOrg}</p>
              )}
              {solution.timeline[1]?.priorityTiers && (
                <div className="case-study-content__priority-tiers">
                  {solution.timeline[1].priorityTiers.map((tier) => (
                    <div key={tier.tier} className={`case-study-content__priority-tier case-study-content__priority-tier--${tier.tier}`}>
                      <div className="case-study-content__priority-tier-number">{tier.tier}</div>
                      <div className="case-study-content__priority-tier-content">
                        <h6 className="case-study-content__priority-tier-title">{tier.title}</h6>
                        <p className="case-study-content__priority-tier-examples">{tier.examples}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {solution.timeline[1]?.sectionContentAfterTiers && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentAfterTiers}</p>
              )}
              {solution.timeline[1]?.governanceHighlight && (
                <div className="case-study-content__key-learning">
                  <h5 className="case-study-content__key-learning-heading">
                    {solution.timeline[1].governanceHighlight.heading}
                  </h5>
                  <p className="case-study-content__key-learning-content">
                    {solution.timeline[1].governanceHighlight.content}
                  </p>
                </div>
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
              {solution.timeline[1]?.sectionHeadingFirstSprint && (
                <h5 className="case-study-content__subheading case-study-content__subheading--neutral">{solution.timeline[1].sectionHeadingFirstSprint}</h5>
              )}
              {solution.timeline[1]?.sectionContentQuaternarySecondary && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentQuaternarySecondary}</p>
              )}
              {solution.timeline[1]?.sprintBriefHighlight && (
                <div className="case-study-content__my-contributions">
                  <h5 className="case-study-content__my-contributions-heading">
                    {solution.timeline[1].sprintBriefHighlight.heading}
                  </h5>
                  <ul className="case-study-content__my-contributions-list">
                    {solution.timeline[1].sprintBriefHighlight.items.map((item, index) => (
                      <li key={index} className="case-study-content__my-contributions-item">
                        <svg className="case-study-content__my-contributions-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {solution.timeline[1]?.sectionContentAfterBrief && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentAfterBrief}</p>
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
              {solution.timeline[1]?.sectionHeadingAfterTimeline && (
                <h5 className="case-study-content__subheading case-study-content__subheading--neutral">{solution.timeline[1].sectionHeadingAfterTimeline}</h5>
              )}
              {solution.timeline[1]?.sectionContentAfterTimeline && (
                solution.timeline[1].sectionContentAfterTimeline.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="case-study-content__text">{paragraph}</p>
                ))
              )}
              {solution.timeline[1]?.sectionImageMapInsight && (
                <figure
                  className="case-study-content__section-image case-study-content__section-image--clickable"
                  onClick={() => setSingleImageLightbox(solution.timeline[1].sectionImageMapInsight)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setSingleImageLightbox(solution.timeline[1].sectionImageMapInsight)}
                >
                  <img
                    src={solution.timeline[1].sectionImageMapInsight.src}
                    alt={solution.timeline[1].sectionImageMapInsight.alt}
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
              {solution.timeline[1]?.sectionContentBeforeVideo && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentBeforeVideo}</p>
              )}
              {solution.timeline[1]?.phoneVideosRow && (
                <div className="case-study-content__phone-videos-row">
                  {solution.timeline[1].phoneVideosRow.map((videoItem, index) => (
                    <figure
                      key={index}
                      className="case-study-content__phone-video-row-item case-study-content__phone-video-row-item--clickable"
                      onClick={() => openVideoLightbox(index)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && openVideoLightbox(index)}
                    >
                      <div className="case-study-content__phone-video-container">
                        <video
                          src={videoItem.video}
                          autoPlay
                          muted
                          loop
                          playsInline
                          className="case-study-content__phone-video-player"
                        />
                        <div className="case-study-content__video-zoom">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                          </svg>
                        </div>
                      </div>
                      {videoItem.caption && (
                        <figcaption className="case-study-content__phone-video-caption">
                          {videoItem.caption}
                        </figcaption>
                      )}
                    </figure>
                  ))}
                </div>
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
              {solution.timeline[1]?.sprintInsightHighlight && (
                <div className="case-study-content__key-learning">
                  <h4 className="case-study-content__key-learning-heading">{solution.timeline[1].sprintInsightHighlight.heading}</h4>
                  <p className="case-study-content__key-learning-content">{solution.timeline[1].sprintInsightHighlight.content}</p>
                </div>
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
              {solution.timeline[1]?.conceptTestingHighlight && (
                <div className="case-study-content__key-learning">
                  <h4 className="case-study-content__key-learning-heading">{solution.timeline[1].conceptTestingHighlight.heading}</h4>
                  <p className="case-study-content__key-learning-content">{solution.timeline[1].conceptTestingHighlight.content}</p>
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
              {/* Milestones Grid */}
              {solution.timeline[1]?.sectionHeadingMilestone1 && (
                <div className="case-study-content__milestones-grid">
                  {[1, 2, 3].map((num) => {
                    const heading = solution.timeline[1][`sectionHeadingMilestone${num}`];
                    const content = solution.timeline[1][`sectionContentMilestone${num}`];
                    const image = solution.timeline[1][`sectionImageMilestone${num}`];
                    if (!heading) return null;
                    return (
                      <div key={num} className="case-study-content__milestone-card">
                        <h5 className="case-study-content__milestone-title">{heading}</h5>
                        {content && <p className="case-study-content__milestone-desc">{content}</p>}
                        {image && (
                          <figure
                            className="case-study-content__milestone-image"
                            onClick={() => setSingleImageLightbox(image)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => e.key === 'Enter' && setSingleImageLightbox(image)}
                          >
                            <img src={image.src} alt={image.alt} />
                            <div className="case-study-content__section-image-zoom">
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                              </svg>
                            </div>
                          </figure>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
              {solution.timeline[1]?.sectionContentCrossPlatform && (
                <p className="case-study-content__text">{solution.timeline[1].sectionContentCrossPlatform}</p>
              )}
              {solution.timeline[1]?.sectionImageCrossPlatform && (
                <figure className="case-study-content__section-image case-study-content__section-image--tight-top">
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
              {solution.timeline[1]?.myContributions && (
                <div className="case-study-content__my-contributions">
                  <h6 className="case-study-content__my-contributions-heading">
                    {solution.timeline[1].myContributions.heading}
                  </h6>
                  <ul className="case-study-content__my-contributions-list">
                    {solution.timeline[1].myContributions.items.map((item, index) => (
                      <li key={index} className="case-study-content__my-contributions-item">
                        <svg className="case-study-content__my-contributions-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
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

      {/* MVP Images Lightbox */}
      {mvpLightboxOpen && mvpImages.length > 0 && (
        <div className="lightbox" onClick={closeMvpLightbox}>
          <button className="lightbox__close" onClick={closeMvpLightbox} aria-label="Close lightbox">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img
              src={mvpImages[mvpLightboxIndex]?.src}
              alt={mvpImages[mvpLightboxIndex]?.alt}
              className="lightbox__image"
            />
          </div>

          {mvpImages.length > 1 && (
            <>
              <button
                className="lightbox__nav lightbox__nav--prev"
                onClick={(e) => { e.stopPropagation(); goToMvpPrev() }}
                aria-label="Previous image"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                className="lightbox__nav lightbox__nav--next"
                onClick={(e) => { e.stopPropagation(); goToMvpNext() }}
                aria-label="Next image"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              <div className="lightbox__counter">
                {mvpLightboxIndex + 1} / {mvpImages.length}
              </div>
            </>
          )}
        </div>
      )}

      {/* Video Row Lightbox */}
      {videoLightboxOpen && phoneVideosRow.length > 0 && (
        <div className="lightbox" onClick={closeVideoLightbox}>
          <button className="lightbox__close" onClick={closeVideoLightbox} aria-label="Close lightbox">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="lightbox__content lightbox__content--video" onClick={(e) => e.stopPropagation()}>
            <video
              key={videoLightboxIndex}
              src={phoneVideosRow[videoLightboxIndex]?.video}
              autoPlay
              muted
              loop
              playsInline
              className="lightbox__video"
            />
            {phoneVideosRow[videoLightboxIndex]?.caption && (
              <div className="lightbox__caption">
                <h4 className="lightbox__title">{phoneVideosRow[videoLightboxIndex].caption}</h4>
              </div>
            )}
          </div>

          {phoneVideosRow.length > 1 && (
            <>
              <button
                className="lightbox__nav lightbox__nav--prev"
                onClick={(e) => { e.stopPropagation(); goToVideoPrev() }}
                aria-label="Previous video"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                className="lightbox__nav lightbox__nav--next"
                onClick={(e) => { e.stopPropagation(); goToVideoNext() }}
                aria-label="Next video"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              <div className="lightbox__counter">
                {videoLightboxIndex + 1} / {phoneVideosRow.length}
              </div>
            </>
          )}
        </div>
      )}

      {/* Platform Images Lightbox */}
      {platformLightboxOpen && platformAllImages.length > 0 && (
        <div className="lightbox" onClick={closePlatformLightbox}>
          <button className="lightbox__close" onClick={closePlatformLightbox} aria-label="Close lightbox">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img
              src={platformAllImages[platformLightboxIndex]?.src}
              alt={platformAllImages[platformLightboxIndex]?.alt}
              className="lightbox__image"
            />
            {platformAllImages[platformLightboxIndex]?.label && (
              <div className="lightbox__caption">
                <h4 className="lightbox__title">{platformAllImages[platformLightboxIndex].label}</h4>
              </div>
            )}
          </div>

          {platformAllImages.length > 1 && (
            <>
              <button
                className="lightbox__nav lightbox__nav--prev"
                onClick={(e) => { e.stopPropagation(); goToPlatformPrev() }}
                aria-label="Previous image"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                className="lightbox__nav lightbox__nav--next"
                onClick={(e) => { e.stopPropagation(); goToPlatformNext() }}
                aria-label="Next image"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              <div className="lightbox__counter">
                {platformLightboxIndex + 1} / {platformAllImages.length}
              </div>
            </>
          )}
        </div>
      )}

      {/* Impact Section */}
      {impact?.fullBleedImage && (
        <figure className="case-study-content__full-bleed">
          <img
            src={impact.fullBleedImage.src}
            alt={impact.fullBleedImage.alt}
          />
          {impact.fullBleedImage.caption && (
            <figcaption className="case-study-content__full-bleed-caption">
              {impact.fullBleedImage.caption}
            </figcaption>
          )}
        </figure>
      )}
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
                <div
                  key={index}
                  className="case-study-content__platform-grid-item case-study-content__platform-grid-item--clickable"
                  onClick={() => openPlatformLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openPlatformLightbox(index)}
                >
                  <img src={image.src} alt={image.alt} />
                  {image.label && <span className="case-study-content__platform-grid-label">{image.label}</span>}
                  <div className="case-study-content__platform-grid-zoom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                    </svg>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Scaling Myself Highlight */}
          {impact.scalingMyselfHighlight && (
            <div className="case-study-content__key-learning">
              <h4 className="case-study-content__key-learning-heading">{impact.scalingMyselfHighlight.heading}</h4>
              <p className="case-study-content__key-learning-content">{impact.scalingMyselfHighlight.content}</p>
            </div>
          )}

          {/* Heading After Images */}
          {impact.headingAfterImages && (
            <h5 className="case-study-content__subheading case-study-content__subheading--neutral">{impact.headingAfterImages}</h5>
          )}

          {/* Narrative After Images */}
          {impact.narrativeAfterImages && (
            impact.narrativeAfterImages.split('\n\n').map((paragraph, index) => (
              <p key={index} className="case-study-content__text">{paragraph}</p>
            ))
          )}

          {/* Image After First Para (Combined UI) */}
          {impact.imageAfterFirstPara && (
            <div className="case-study-content__platform-two-up">
              <figure
                className="case-study-content__platform-two-up-item case-study-content__platform-two-up-item--clickable"
                onClick={() => openPlatformLightbox((impact.platformImages?.length || 0))}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openPlatformLightbox((impact.platformImages?.length || 0))}
              >
                <img src={impact.imageAfterFirstPara.src} alt={impact.imageAfterFirstPara.alt} />
                <div className="case-study-content__platform-two-up-zoom">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                  </svg>
                </div>
                {impact.imageAfterFirstPara.label && (
                  <figcaption className="case-study-content__platform-two-up-label">
                    {impact.imageAfterFirstPara.label}
                  </figcaption>
                )}
              </figure>
            </div>
          )}

          {/* Narrative After Combined UI */}
          {impact.narrativeAfterCombinedUI && (
            <p className="case-study-content__text">{impact.narrativeAfterCombinedUI}</p>
          )}

          {/* Image After Narrative */}
          {impact.imageAfterNarrative && (
            <figure
              className="case-study-content__section-image case-study-content__section-image--clickable"
              onClick={() => openPlatformLightbox((impact.platformImages?.length || 0) + (impact.imageAfterFirstPara ? 1 : 0))}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && openPlatformLightbox((impact.platformImages?.length || 0) + (impact.imageAfterFirstPara ? 1 : 0))}
            >
              <img
                src={impact.imageAfterNarrative.src}
                alt={impact.imageAfterNarrative.alt}
                className="case-study-content__section-image-img"
              />
              <div className="case-study-content__section-image-zoom">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                </svg>
              </div>
              {impact.imageAfterNarrative.label && (
                <figcaption className="case-study-content__section-image-label">
                  {impact.imageAfterNarrative.label}
                </figcaption>
              )}
            </figure>
          )}

          {/* Principal Designer Highlight */}
          {impact.principalDesignerHighlight && (
            <div className="case-study-content__key-learning">
              <h4 className="case-study-content__key-learning-heading">{impact.principalDesignerHighlight.heading}</h4>
              <p className="case-study-content__key-learning-content">{impact.principalDesignerHighlight.content}</p>
            </div>
          )}

          {/* Expanding Use Cases Heading */}
          {impact.headingExpandingUseCases && (
            <h5 className="case-study-content__subheading case-study-content__subheading--neutral">{impact.headingExpandingUseCases}</h5>
          )}

          {/* Expanding Use Cases Narrative */}
          {impact.narrativeExpandingUseCases && (
            <p className="case-study-content__text">{impact.narrativeExpandingUseCases}</p>
          )}

          {/* Platform Three-Up Images */}
          {impact.platformThreeUp && impact.platformThreeUp.length > 0 && (
            <div className="case-study-content__platform-two-up">
              {impact.platformThreeUp.map((image, index) => {
                const baseIndex = (impact.platformImages?.length || 0) + (impact.imageAfterFirstPara ? 1 : 0) + (impact.imageAfterNarrative ? 1 : 0)
                return (
                  <figure
                    key={index}
                    className="case-study-content__platform-two-up-item case-study-content__platform-two-up-item--clickable"
                    onClick={() => openPlatformLightbox(baseIndex + index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openPlatformLightbox(baseIndex + index)}
                  >
                    <img src={image.src} alt={image.alt} />
                    {image.label && <figcaption className="case-study-content__platform-two-up-label">{image.label}</figcaption>}
                    <div className="case-study-content__platform-two-up-zoom">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                      </svg>
                    </div>
                  </figure>
                )
              })}
            </div>
          )}

          {/* Final Narrative */}
          {impact.narrativeFinal && impact.narrativeFinal.split('\n\n').map((para, index) => (
            <p key={index} className="case-study-content__text">{para}</p>
          ))}

          {/* Platform Two-Up Third (or 4-up when 4 items) */}
          {impact.platformTwoUpThird && impact.platformTwoUpThird.length > 0 && (() => {
            const baseIndex = (impact.platformImages?.length || 0) + (impact.imageAfterFirstPara ? 1 : 0) + (impact.imageAfterNarrative ? 1 : 0) + (impact.platformThreeUp?.length || 0)
            return impact.platformTwoUpThird.length === 4 ? (
              <div className="case-study-content__platform-grid">
                {impact.platformTwoUpThird.map((image, index) => (
                  <div
                    key={index}
                    className="case-study-content__platform-grid-item case-study-content__platform-grid-item--clickable"
                    onClick={() => openPlatformLightbox(baseIndex + index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openPlatformLightbox(baseIndex + index)}
                  >
                    <img src={image.src} alt={image.alt} />
                    {image.label && <span className="case-study-content__platform-grid-label">{image.label}</span>}
                    <div className="case-study-content__platform-grid-zoom">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="case-study-content__platform-two-up">
                {impact.platformTwoUpThird.map((image, index) => (
                  <figure
                    key={index}
                    className="case-study-content__platform-two-up-item case-study-content__platform-two-up-item--clickable"
                    onClick={() => openPlatformLightbox(baseIndex + index)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openPlatformLightbox(baseIndex + index)}
                  >
                    <img src={image.src} alt={image.alt} />
                    {image.label && <figcaption className="case-study-content__platform-two-up-label">{image.label}</figcaption>}
                    <div className="case-study-content__platform-two-up-zoom">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                      </svg>
                    </div>
                  </figure>
                ))}
              </div>
            )
          })()}

          {/* Scaling Product Highlight */}
          {impact.scalingProductHighlight && (
            <div className="case-study-content__key-learning">
              <h4 className="case-study-content__key-learning-heading">{impact.scalingProductHighlight.heading}</h4>
              <p className="case-study-content__key-learning-content">{impact.scalingProductHighlight.content}</p>
            </div>
          )}

          {/* Lessons from Failure */}
          {impact.lessonsHeading && (
            <h4 className="case-study-content__heading">{impact.lessonsHeading}</h4>
          )}
          {impact.lessonsNarrative && impact.lessonsNarrative.split('\n\n').map((para, index) => (
            <p key={index} className="case-study-content__text">{para}</p>
          ))}

          {/* Lessons Media Row (image + videos in horizontal layout with lightbox) */}
          {impact.lessonsMediaRow && impact.lessonsMediaRow.length > 0 && (
            <div className="case-study-content__lessons-media-row">
              {impact.lessonsMediaRow.map((item, index) => (
                <figure
                  key={index}
                  className="case-study-content__lessons-media-item case-study-content__lessons-media-item--clickable"
                  onClick={() => openLessonsLightbox(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && openLessonsLightbox(index)}
                >
                  <div className="case-study-content__lessons-media-container">
                    {item.type === 'video' ? (
                      <video
                        src={item.src}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="case-study-content__lessons-media-video"
                      />
                    ) : (
                      <img
                        src={item.src}
                        alt={item.alt}
                        className="case-study-content__lessons-media-image"
                      />
                    )}
                    <div className="case-study-content__lessons-media-zoom">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                      </svg>
                    </div>
                  </div>
                  {item.caption && (
                    <figcaption className="case-study-content__lessons-media-caption">
                      {item.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          )}

          {/* Lessons Narrative After Media Row */}
          {impact.lessonsNarrativeAfterVideo02 && (
            <div className="case-study-content__lessons-conclusion-text">
              {impact.lessonsNarrativeAfterVideo02.split('\n\n').map((para, index) => (
                <p key={index} className="case-study-content__text">{para}</p>
              ))}
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

          {/* Lessons Key Learning */}
          {impact.lessonsKeyLearning && (
            <div className="case-study-content__key-learning">
              <h5 className="case-study-content__key-learning-heading">
                {impact.lessonsKeyLearning.heading}
              </h5>
              <p className="case-study-content__key-learning-content">
                {impact.lessonsKeyLearning.content}
              </p>
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

          {/* Impact My Contributions */}
          {impact.impactMyContributions && (
            <div className="case-study-content__my-contributions">
              <h5 className="case-study-content__my-contributions-heading">
                {impact.impactMyContributions.heading}
              </h5>
              {impact.impactMyContributions.categories ? (
                <div className="case-study-content__my-contributions-categories">
                  {/* Untitled categories first */}
                  {impact.impactMyContributions.categories.filter(cat => !cat.title).map((category, catIndex) => (
                    <div key={catIndex} className="case-study-content__my-contributions-category">
                      <ul className="case-study-content__my-contributions-list">
                        {category.items.map((item, index) => (
                          <li key={index} className="case-study-content__my-contributions-item">
                            <svg className="case-study-content__my-contributions-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20 6L9 17l-5-5" />
                            </svg>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                  {/* Titled categories in 3-up grid */}
                  {impact.impactMyContributions.categories.some(cat => cat.title) && (
                    <div className="case-study-content__my-contributions-categories-grid">
                      {impact.impactMyContributions.categories.filter(cat => cat.title).map((category, catIndex) => (
                        <div key={catIndex} className="case-study-content__my-contributions-category">
                          <h6 className="case-study-content__my-contributions-category-title">{category.title}</h6>
                          <ul className="case-study-content__my-contributions-list">
                            {category.items.map((item, index) => (
                              <li key={index} className="case-study-content__my-contributions-item">
                                <svg className="case-study-content__my-contributions-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                  <path d="M20 6L9 17l-5-5" />
                                </svg>
                                {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <ul className="case-study-content__my-contributions-list">
                  {impact.impactMyContributions.items.map((item, index) => (
                    <li key={index} className="case-study-content__my-contributions-item">
                      <svg className="case-study-content__my-contributions-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
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
            <div className="case-study-content__platform-two-up case-study-content__platform-two-up--small">
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

          {/* Leading with Design Highlight */}
          {impact.leadingWithDesignHighlight && (
            <div className="case-study-content__key-learning">
              <h4 className="case-study-content__key-learning-heading">{impact.leadingWithDesignHighlight.heading}</h4>
              <p className="case-study-content__key-learning-content">{impact.leadingWithDesignHighlight.content}</p>
            </div>
          )}

          {/* Before and After */}
          {impact.futureBeforeAfterHeading && (
            <h4 className="case-study-content__heading">{impact.futureBeforeAfterHeading}</h4>
          )}
          {impact.futureBeforeAfterContent && (
            <p className="case-study-content__text">{impact.futureBeforeAfterContent}</p>
          )}
          {impact.futureBeforeAfterImages && impact.futureBeforeAfterImages.length > 0 && (
            <div className="case-study-content__platform-two-up">
              {impact.futureBeforeAfterImages.map((item, index) => (
                <figure key={index} className="case-study-content__platform-two-up-item">
                  <img
                    src={item.src}
                    alt={item.alt}
                    style={item.scale ? { transform: `scale(${item.scale})` } : undefined}
                  />
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

          {/* Reflection / What I'd Do Differently */}
          {impact.reflectionHeading && (
            <h4 className="case-study-content__heading">{impact.reflectionHeading}</h4>
          )}
          {impact.reflectionContent && (
            impact.reflectionContent.split('\n\n').map((para, index) => (
              <p key={index} className="case-study-content__text">{para}</p>
            ))
          )}
        </section>
      )}

      {/* Lessons Media Lightbox */}
      {lessonsLightboxOpen && lessonsMediaRow.length > 0 && (
        <div className="lightbox" onClick={closeLessonsLightbox}>
          <button className="lightbox__close" onClick={closeLessonsLightbox} aria-label="Close lightbox">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className={`lightbox__content ${lessonsMediaRow[lessonsLightboxIndex]?.type === 'video' ? 'lightbox__content--video' : ''}`} onClick={(e) => e.stopPropagation()}>
            {lessonsMediaRow[lessonsLightboxIndex]?.type === 'video' ? (
              <video
                key={lessonsLightboxIndex}
                src={lessonsMediaRow[lessonsLightboxIndex]?.src}
                autoPlay
                muted
                loop
                playsInline
                className="lightbox__video"
              />
            ) : (
              <img
                src={lessonsMediaRow[lessonsLightboxIndex]?.src}
                alt={lessonsMediaRow[lessonsLightboxIndex]?.alt}
                className="lightbox__image"
              />
            )}
            {lessonsMediaRow[lessonsLightboxIndex]?.caption && (
              <div className="lightbox__caption">
                <h4 className="lightbox__title">{lessonsMediaRow[lessonsLightboxIndex].caption}</h4>
              </div>
            )}
          </div>

          {lessonsMediaRow.length > 1 && (
            <>
              <button
                className="lightbox__nav lightbox__nav--prev"
                onClick={(e) => { e.stopPropagation(); goToLessonsPrev() }}
                aria-label="Previous item"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                className="lightbox__nav lightbox__nav--next"
                onClick={(e) => { e.stopPropagation(); goToLessonsNext() }}
                aria-label="Next item"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              <div className="lightbox__counter">
                {lessonsLightboxIndex + 1} / {lessonsMediaRow.length}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default CaseStudyContent
