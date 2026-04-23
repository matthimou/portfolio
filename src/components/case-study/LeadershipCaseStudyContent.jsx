import React, { useState, useEffect, useCallback } from 'react'
import CaseStudyMetrics from './CaseStudyMetrics'
import GoDeeper from '../ui/GoDeeper'
import './LeadershipCaseStudyContent.css'

// Light-themed Lightbox for comparison media
const ComparisonLightbox = ({ items, currentIndex, onClose, onPrev, onNext, noCard }) => {
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

  const currentItem = items[currentIndex]

  return (
    <div className="leadership-lightbox" onClick={onClose}>
      <button className="leadership-lightbox__close" onClick={onClose} aria-label="Close lightbox">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div className="leadership-lightbox__content" onClick={(e) => e.stopPropagation()}>
        {currentItem.type === 'image' ? (
          <img
            src={currentItem.src}
            alt={currentItem.alt || ''}
            className={`leadership-lightbox__image ${noCard ? 'leadership-lightbox__image--no-shadow' : ''}`}
          />
        ) : (
          <video
            src={currentItem.src}
            muted
            loop
            autoPlay
            playsInline
            className={`leadership-lightbox__video ${noCard ? 'leadership-lightbox__video--no-shadow' : ''}`}
          />
        )}
        <div className="leadership-lightbox__caption">
          <span className="leadership-lightbox__label">{currentItem.label}</span>
          <h4 className="leadership-lightbox__title">{currentItem.caption}</h4>
        </div>
      </div>

      {items.length > 1 && (
        <>
          <button
            className="leadership-lightbox__nav leadership-lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="leadership-lightbox__nav leadership-lightbox__nav--next"
            onClick={(e) => { e.stopPropagation(); onNext() }}
            aria-label="Next"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </>
      )}
    </div>
  )
}

/**
 * LeadershipCaseStudyContent - Concise case study format for design leadership roles
 *
 * Structure (7 sections):
 * 1. Impact Hook - Lead with outcomes
 * 2. Strategic Context - Business stakes and strategic read
 * 3. Leadership Challenge - Organizational complexity navigated
 * 4. How I Led - Leadership behaviors, not execution details
 * 5. Key Leadership Moment - One detailed story demonstrating judgment
 * 6. What We Shipped - Tradeoffs lens, not feature tour
 * 7. Impact & Reflection - Outcomes and leadership growth
 */

// Helper to parse **bold** and {{inline popup}} text
const renderWithFormatting = (text) => {
  if (!text) return null

  // Handle bold text
  if (text.includes('**')) {
    const parts = text.split(/\*\*(.*?)\*\*/g)
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    )
  }
  return text
}

// Parse paragraphs from text with double newlines
const renderParagraphs = (text, className = 'leadership-content__text') => {
  if (!text) return null
  const paragraphs = text.split('\n\n').filter(p => p.trim())
  return paragraphs.map((para, i) => (
    <p key={i} className={className}>
      {renderWithFormatting(para.trim())}
    </p>
  ))
}

const LeadershipCaseStudyContent = ({ study }) => {
  const { meta, leadership } = study

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openLightbox = useCallback((index) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  if (!leadership) {
    return <div className="leadership-content">Leadership content not available.</div>
  }

  const {
    impactHook,
    strategicContext,
    leadershipChallenge,
    howILed,
    keyMoment,
    whatWeShipped,
    impactReflection
  } = leadership

  // Build lightbox items array from comparison
  const lightboxItems = whatWeShipped?.comparison ? [
    whatWeShipped.comparison.before,
    whatWeShipped.comparison.after
  ] : []

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) => prev === 0 ? lightboxItems.length - 1 : prev - 1)
  }, [lightboxItems.length])

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => prev === lightboxItems.length - 1 ? 0 : prev + 1)
  }, [lightboxItems.length])

  return (
    <div className="leadership-content">
      {/* Section 1: Impact Hook */}
      {impactHook && (
        <section className="leadership-content__section leadership-content__section--hook">
          <p className="leadership-content__hook">
            {renderWithFormatting(impactHook)}
          </p>
        </section>
      )}

      {/* Section 2: Strategic Context */}
      {strategicContext && (
        <section className="leadership-content__section">
          <h2 className="leadership-content__heading">Strategic Context</h2>
          {renderParagraphs(strategicContext.content)}
          {strategicContext.insight && (
            <blockquote className="leadership-content__insight">
              <p>{renderWithFormatting(strategicContext.insight)}</p>
            </blockquote>
          )}
        </section>
      )}

      {/* Section 3: Leadership Challenge */}
      {leadershipChallenge && (
        <section className="leadership-content__section">
          <h2 className="leadership-content__heading">The Leadership Challenge</h2>
          {renderParagraphs(leadershipChallenge.content)}
          {leadershipChallenge.stakeholders && (
            <div className="leadership-content__stakeholders">
              {leadershipChallenge.stakeholders.map((stakeholder, i) => (
                <div key={i} className="leadership-content__stakeholder">
                  <h4 className="leadership-content__stakeholder-title">{stakeholder.title}</h4>
                  <p className="leadership-content__stakeholder-desc">{stakeholder.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Section 4: How I Led */}
      {howILed && (
        <section id="how-i-led" className="leadership-content__section">
          <h2 className="leadership-content__heading">How I Led</h2>
          {howILed.intro && renderParagraphs(howILed.intro)}
          {howILed.actions && (
            <ul className="leadership-content__actions">
              {howILed.actions.map((action, i) => {
                // Support both string actions and object actions with goDeeper
                const actionText = typeof action === 'string' ? action : action.text
                const goDeeper = typeof action === 'object' ? action.goDeeper : null

                return (
                  <li key={i} className="leadership-content__action">
                    {renderWithFormatting(actionText)}
                    {goDeeper && (
                      <>
                        {' '}
                        <GoDeeper
                          to={`/work/${goDeeper.to}`}
                          variant={goDeeper.variant || 'inline'}
                          returnTo={goDeeper.returnTo}
                        >
                          {goDeeper.label}
                        </GoDeeper>
                      </>
                    )}
                  </li>
                )
              })}
            </ul>
          )}
          {howILed.closing && renderParagraphs(howILed.closing)}
        </section>
      )}

      {/* Section 5: Key Leadership Moment */}
      {keyMoment && (
        <section id="key-moment" className="leadership-content__section leadership-content__section--moment">
          <div className="leadership-content__moment-header">
            <span className="leadership-content__moment-label">Key Moment</span>
            <h2 className="leadership-content__heading">{keyMoment.title}</h2>
          </div>
          {keyMoment.situation && (
            <div className="leadership-content__moment-block">
              <h4 className="leadership-content__moment-subhead">The Situation</h4>
              {renderParagraphs(keyMoment.situation)}
            </div>
          )}
          {keyMoment.stakes && (
            <div className="leadership-content__moment-block">
              <h4 className="leadership-content__moment-subhead">The Stakes</h4>
              {renderParagraphs(keyMoment.stakes)}
            </div>
          )}
          {keyMoment.myRead && (
            <div className="leadership-content__moment-block">
              <h4 className="leadership-content__moment-subhead">My Read</h4>
              {renderParagraphs(keyMoment.myRead)}
            </div>
          )}
          {keyMoment.action && (
            <div className="leadership-content__moment-block">
              <h4 className="leadership-content__moment-subhead">What I Did</h4>
              {renderParagraphs(keyMoment.action)}
            </div>
          )}
          {keyMoment.outcome && (
            <div className="leadership-content__moment-block">
              <h4 className="leadership-content__moment-subhead">The Outcome</h4>
              {renderParagraphs(keyMoment.outcome)}
            </div>
          )}
          {keyMoment.goDeeper && (
            <div className="leadership-content__moment-go-deeper">
              <GoDeeper
                to={`/work/${keyMoment.goDeeper.to}`}
                variant={keyMoment.goDeeper.variant || 'chip'}
                returnTo={keyMoment.goDeeper.returnTo}
              >
                {keyMoment.goDeeper.label}
              </GoDeeper>
            </div>
          )}
        </section>
      )}

      {/* Section 6: What We Shipped */}
      {whatWeShipped && (
        <section className="leadership-content__section">
          <h2 className="leadership-content__heading">What We Shipped</h2>
          {renderParagraphs(whatWeShipped.content)}
          {whatWeShipped.tradeoffs && (
            <div className="leadership-content__tradeoffs">
              <h4 className="leadership-content__tradeoffs-heading">Key Tradeoffs</h4>
              <ul className="leadership-content__tradeoffs-list">
                {whatWeShipped.tradeoffs.map((tradeoff, i) => (
                  <li key={i} className="leadership-content__tradeoff">
                    {renderWithFormatting(tradeoff)}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {whatWeShipped.comparison && (
            <div className="leadership-content__comparison">
              {/* Before */}
              <div
                className="leadership-content__comparison-item leadership-content__comparison-item--clickable"
                onClick={() => openLightbox(0)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(0)}
              >
                <span className="leadership-content__comparison-label">
                  {whatWeShipped.comparison.before.label}
                </span>
                <div className="leadership-content__comparison-media">
                  {whatWeShipped.comparison.before.type === 'image' ? (
                    <img
                      src={whatWeShipped.comparison.before.src}
                      alt={whatWeShipped.comparison.before.alt || ''}
                      className="leadership-content__comparison-img"
                    />
                  ) : (
                    <video
                      src={whatWeShipped.comparison.before.src}
                      muted
                      loop
                      autoPlay
                      playsInline
                      className="leadership-content__comparison-vid"
                    />
                  )}
                  <div className="leadership-content__comparison-zoom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                      <path d="M11 8v6M8 11h6" />
                    </svg>
                  </div>
                </div>
                {whatWeShipped.comparison.before.caption && (
                  <span className="leadership-content__comparison-caption">
                    {whatWeShipped.comparison.before.caption}
                  </span>
                )}
              </div>
              {/* After */}
              <div
                className="leadership-content__comparison-item leadership-content__comparison-item--clickable"
                onClick={() => openLightbox(1)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(1)}
              >
                <span className="leadership-content__comparison-label">
                  {whatWeShipped.comparison.after.label}
                </span>
                <div className="leadership-content__comparison-media">
                  {whatWeShipped.comparison.after.type === 'image' ? (
                    <img
                      src={whatWeShipped.comparison.after.src}
                      alt={whatWeShipped.comparison.after.alt || ''}
                      className="leadership-content__comparison-img"
                    />
                  ) : (
                    <video
                      src={whatWeShipped.comparison.after.src}
                      muted
                      loop
                      autoPlay
                      playsInline
                      className="leadership-content__comparison-vid"
                    />
                  )}
                  <div className="leadership-content__comparison-zoom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                      <path d="M11 8v6M8 11h6" />
                    </svg>
                  </div>
                </div>
                {whatWeShipped.comparison.after.caption && (
                  <span className="leadership-content__comparison-caption">
                    {whatWeShipped.comparison.after.caption}
                  </span>
                )}
              </div>
            </div>
          )}
          {whatWeShipped.video && !whatWeShipped.comparison && (
            <figure className="leadership-content__shipped-video">
              <div className="leadership-content__shipped-vid-wrapper">
                <video
                  src={whatWeShipped.video.src}
                  poster={whatWeShipped.video.poster}
                  muted
                  loop
                  autoPlay
                  playsInline
                  className="leadership-content__shipped-vid"
                />
              </div>
              {whatWeShipped.video.caption && (
                <figcaption className="leadership-content__shipped-caption">
                  {whatWeShipped.video.caption}
                </figcaption>
              )}
            </figure>
          )}
          {whatWeShipped.image && !whatWeShipped.video && (
            <figure className="leadership-content__shipped-image">
              <img
                src={whatWeShipped.image.src}
                alt={whatWeShipped.image.alt}
                className="leadership-content__shipped-img"
              />
              {whatWeShipped.image.caption && (
                <figcaption className="leadership-content__shipped-caption">
                  {whatWeShipped.image.caption}
                </figcaption>
              )}
            </figure>
          )}
        </section>
      )}

      {/* Section 7: Impact & Reflection */}
      {impactReflection && (
        <section className="leadership-content__section leadership-content__section--impact">
          <h2 className="leadership-content__heading">Impact</h2>

          {impactReflection.metrics && (
            <CaseStudyMetrics metrics={impactReflection.metrics} />
          )}

          {impactReflection.narrative && renderParagraphs(impactReflection.narrative)}

          {impactReflection.organizationalImpact && (
            <div className="leadership-content__org-impact">
              <h4 className="leadership-content__org-impact-heading">Organizational Impact</h4>
              {renderParagraphs(impactReflection.organizationalImpact)}
            </div>
          )}

          {impactReflection.reflection && (
            <div className="leadership-content__reflection">
              <h3 className="leadership-content__reflection-heading">What I'd Do Differently</h3>
              {impactReflection.reflection.map((item, i) => (
                <div key={i} className="leadership-content__reflection-item">
                  <h4 className="leadership-content__reflection-title">{item.title}</h4>
                  <p className="leadership-content__reflection-content">{item.content}</p>
                </div>
              ))}
            </div>
          )}

          {impactReflection.closing && (
            <p className="leadership-content__closing">
              {renderWithFormatting(impactReflection.closing)}
            </p>
          )}
        </section>
      )}

      {/* Lightbox */}
      {lightboxOpen && lightboxItems.length > 0 && (
        <ComparisonLightbox
          items={lightboxItems}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
          noCard={whatWeShipped?.comparison?.noCard}
        />
      )}
    </div>
  )
}

export default LeadershipCaseStudyContent
