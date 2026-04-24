import React, { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CaseStudyMetrics from './CaseStudyMetrics'
import GoDeeper from '../ui/GoDeeper'
import InfoIndicator from '../ui/InfoIndicator'
import VideoPlayer from '../ui/VideoPlayer'
import './LeadershipCaseStudyContent.css'

// Inline link that preserves scroll position
const InlineLink = ({ to, children, className }) => {
  const navigate = useNavigate()

  const handleClick = (e) => {
    e.preventDefault()
    // Save current scroll position before navigating
    const scrollY = window.scrollY
    navigate(to, { state: { scrollY } })
  }

  return (
    <Link to={to} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}

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
          <VideoPlayer
            src={currentItem.src}
            poster={currentItem.poster}
            autoPlay={true}
            noShadow={noCard}
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

// Helper to parse **bold** and [[inline links|pageId]] text
const renderWithFormatting = (text) => {
  if (!text) return null

  // Handle inline links [[text|pageId]] and bold **text**
  const hasLinks = text.includes('[[')
  const hasBold = text.includes('**')

  if (!hasLinks && !hasBold) return text

  // Process inline links first, then bold within each segment
  if (hasLinks) {
    const linkPattern = /\[\[([^\]|]+)\|([^\]]+)\]\]/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = linkPattern.exec(text)) !== null) {
      // Add text before the link
      if (match.index > lastIndex) {
        const beforeText = text.slice(lastIndex, match.index)
        if (hasBold && beforeText.includes('**')) {
          const boldParts = beforeText.split(/\*\*(.*?)\*\*/g)
          boldParts.forEach((part, i) => {
            if (i % 2 === 1) {
              parts.push(<strong key={`bold-${lastIndex}-${i}`}>{part}</strong>)
            } else if (part) {
              parts.push(part)
            }
          })
        } else {
          parts.push(beforeText)
        }
      }
      // Add the link
      parts.push(
        <InlineLink
          key={`link-${match.index}`}
          to={`/work/${match[2]}`}
          className="leadership-content__inline-link"
        >
          {match[1]}
        </InlineLink>
      )
      lastIndex = match.index + match[0].length
    }

    // Add remaining text after last link
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex)
      if (hasBold && remainingText.includes('**')) {
        const boldParts = remainingText.split(/\*\*(.*?)\*\*/g)
        boldParts.forEach((part, i) => {
          if (i % 2 === 1) {
            parts.push(<strong key={`bold-end-${i}`}>{part}</strong>)
          } else if (part) {
            parts.push(part)
          }
        })
      } else {
        parts.push(remainingText)
      }
    }

    return parts
  }

  // Handle bold text only (no links)
  if (hasBold) {
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
    fullBleedImage,
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
          {leadershipChallenge.contentAfter && renderParagraphs(leadershipChallenge.contentAfter)}
        </section>
      )}

      {/* Full Bleed Image (between Leadership Challenge and How I Led) */}
      {fullBleedImage && (
        <figure className="leadership-content__full-bleed">
          <img src={fullBleedImage.src} alt={fullBleedImage.alt} loading="lazy" />
        </figure>
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
                    <span className="leadership-content__action-text">
                      {renderWithFormatting(actionText)}
                    </span>
                    {goDeeper && (
                      <div className="leadership-content__action-go-deeper">
                        <GoDeeper
                          to={`/work/${goDeeper.to}`}
                          variant={goDeeper.variant || 'chip'}
                          returnTo={goDeeper.returnTo}
                        >
                          {goDeeper.label}
                        </GoDeeper>
                      </div>
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
              <h4 className="leadership-content__moment-subhead">{keyMoment.stakesLabel || 'The Stakes'}</h4>
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
                      loading="lazy"
                    />
                  ) : (
                    <VideoPlayer
                      src={whatWeShipped.comparison.before.src}
                      poster={whatWeShipped.comparison.before.poster}
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
                      loading="lazy"
                    />
                  ) : (
                    <VideoPlayer
                      src={whatWeShipped.comparison.after.src}
                      poster={whatWeShipped.comparison.after.poster}
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
          {whatWeShipped.comparison?.goDeeper && (
            <div className="leadership-content__comparison-go-deeper">
              <GoDeeper
                to={`/work/${whatWeShipped.comparison.goDeeper.to}`}
                variant={whatWeShipped.comparison.goDeeper.variant || 'chip'}
                returnTo={whatWeShipped.comparison.goDeeper.returnTo}
              >
                {whatWeShipped.comparison.goDeeper.label}
              </GoDeeper>
            </div>
          )}
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
          {whatWeShipped.goDeeper && (
            <GoDeeper
              to={`/work/${whatWeShipped.goDeeper.to}`}
              variant={whatWeShipped.goDeeper.variant || 'chip'}
              returnTo={whatWeShipped.goDeeper.returnTo}
            >
              {whatWeShipped.goDeeper.label}
            </GoDeeper>
          )}
          {whatWeShipped.video && !whatWeShipped.comparison && (
            <figure className="leadership-content__shipped-video">
              <div className="leadership-content__shipped-vid-wrapper">
                <VideoPlayer
                  src={whatWeShipped.video.src}
                  poster={whatWeShipped.video.poster}
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
                loading="lazy"
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

          {/* Combined Layout: Single unified highlight with metrics + 2-column tradeoffs/takeaways */}
          {impactReflection.combinedLayout ? (
            <>
              {impactReflection.impactIntro && (
                <p className="leadership-content__impact-intro">{impactReflection.impactIntro}</p>
              )}
              <div className="leadership-content__highlights">
              {/* Metrics Row */}
              {impactReflection.metrics && (
                <div className="leadership-content__highlights-metrics">
                  {impactReflection.metrics.map((metric, i) => (
                    <div key={i} className="leadership-content__highlights-metric">
                      <div className="leadership-content__highlights-metric-value">{metric.value}</div>
                      <div className="leadership-content__highlights-metric-label">{metric.label}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* Two-column layout for Tradeoffs and Takeaways */}
              <div className="leadership-content__highlights-columns">
                {impactReflection.tradeoffs && (
                  <div className="leadership-content__highlight-group">
                    <h4 className="leadership-content__highlight-label">Key Tradeoffs</h4>
                    <ul className="leadership-content__highlight-list">
                      {impactReflection.tradeoffs.map((item, i) => (
                        <li key={i} className="leadership-content__highlight-item">
                          <span className="leadership-content__highlight-title">
                            {item.title}
                          </span>
                          {item.content && (
                            <InfoIndicator variant="icon" size="sm" position="auto" maxWidth={280}>
                              {item.content}
                            </InfoIndicator>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {impactReflection.reflection && (
                  <div className="leadership-content__highlight-group">
                    <h4 className="leadership-content__highlight-label">{impactReflection.reflectionLabel || 'Leadership Takeaways'}</h4>
                    <ul className="leadership-content__highlight-list">
                      {impactReflection.reflection.map((item, i) => (
                        <li key={i} className="leadership-content__highlight-item">
                          <span className="leadership-content__highlight-title">
                            {item.title}
                          </span>
                          {item.content && (
                            <InfoIndicator variant="icon" size="sm" position="auto" maxWidth={280}>
                              {item.content}
                            </InfoIndicator>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            </>
          ) : (
            /* Standard Layout */
            <>
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
                  <h3 className="leadership-content__reflection-heading">{impactReflection.reflectionLabel || "What I'd Do Differently"}</h3>
                  {impactReflection.reflection.map((item, i) => (
                    <div key={i} className="leadership-content__reflection-item">
                      <h4 className="leadership-content__reflection-title">{item.title}</h4>
                      <p className="leadership-content__reflection-content">{item.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </>
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
