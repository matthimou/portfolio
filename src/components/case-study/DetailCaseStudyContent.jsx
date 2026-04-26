import { useState, useEffect, useCallback } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { caseStudies } from '../../data/caseStudies'
import InfoIndicator from '../ui/InfoIndicator/InfoIndicator'
import VideoPlayer from '../ui/VideoPlayer'
import './DetailCaseStudyContent.css'

// Lightbox component for detail pages
const DetailLightbox = ({ items, currentIndex, onClose, onPrev, onNext }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onPrev()
      if (e.key === 'ArrowRight') onNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onPrev, onNext])

  const currentItem = items[currentIndex]

  return (
    <div className="detail-lightbox" onClick={onClose}>
      <button className="detail-lightbox__close" onClick={onClose} aria-label="Close lightbox">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>

      <div className="detail-lightbox__content" onClick={(e) => e.stopPropagation()}>
        <img
          src={currentItem.src}
          alt={currentItem.alt || ''}
          className="detail-lightbox__image"
        />
        {currentItem.heading && (
          <div className="detail-lightbox__caption">
            <h4 className="detail-lightbox__title">{currentItem.heading}</h4>
          </div>
        )}
      </div>

      {items.length > 1 && (
        <>
          <button
            className="detail-lightbox__nav detail-lightbox__nav--prev"
            onClick={(e) => { e.stopPropagation(); onPrev() }}
            aria-label="Previous"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          <button
            className="detail-lightbox__nav detail-lightbox__nav--next"
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

// Inline link component that preserves scroll position and passes referrer info
const InlineLink = ({ to, children, className, referrerId, referrerTitle, parentScrollY }) => {
  const navigate = useNavigate()
  const handleClick = (e) => {
    e.preventDefault()
    const scrollY = window.scrollY
    navigate(to, {
      state: {
        scrollY,
        referrerId,
        referrerTitle,
        parentScrollY
      }
    })
  }
  return (
    <Link to={to} onClick={handleClick} className={className}>
      {children}
    </Link>
  )
}

/**
 * DetailCaseStudyContent - Layout for detail sub-pages linked from leadership case studies
 *
 * Features:
 * - Back navigation header (sticky on scroll)
 * - Title + optional subtitle
 * - Flexible content rendering (paragraphs, images, lists)
 * - Reuses existing styling patterns
 */

// Helper to parse **bold**, [[inline links|pageId]], and {{inline popup}} text
const renderWithFormatting = (text, inlinePopups = null, linkContext = null) => {
  if (!text) return null

  const hasBold = text.includes('**')
  const hasPopups = inlinePopups && text.includes('{{')
  const hasLinks = text.includes('[[')

  if (!hasBold && !hasPopups && !hasLinks) return text

  // Handle inline links first if present
  if (hasLinks) {
    const linkPattern = /\[\[([^\]|]+)\|([^\]]+)\]\]/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = linkPattern.exec(text)) !== null) {
      // Add text before the link (recursively process for bold/popups)
      if (match.index > lastIndex) {
        const beforeText = text.slice(lastIndex, match.index)
        const processed = renderWithFormattingNoLinks(beforeText, inlinePopups)
        if (Array.isArray(processed)) {
          parts.push(...processed)
        } else {
          parts.push(processed)
        }
      }
      // Add the link with referrer context for dynamic back navigation
      parts.push(
        <InlineLink
          key={`link-${match.index}`}
          to={`/work/${match[2]}`}
          className="detail-content__inline-link"
          referrerId={linkContext?.referrerId}
          referrerTitle={linkContext?.referrerTitle}
          parentScrollY={linkContext?.parentScrollY}
        >
          {match[1]}
        </InlineLink>
      )
      lastIndex = match.index + match[0].length
    }

    // Add remaining text after last link
    if (lastIndex < text.length) {
      const remainingText = text.slice(lastIndex)
      const processed = renderWithFormattingNoLinks(remainingText, inlinePopups)
      if (Array.isArray(processed)) {
        parts.push(...processed)
      } else {
        parts.push(processed)
      }
    }

    return parts
  }

  return renderWithFormattingNoLinks(text, inlinePopups)
}

// Helper to process bold and popups (no links)
const renderWithFormattingNoLinks = (text, inlinePopups = null) => {
  if (!text) return null

  const hasBold = text.includes('**')
  const hasPopups = inlinePopups && text.includes('{{')

  if (!hasBold && !hasPopups) return text

  // Process the text character by character to handle nested formatting
  const result = []
  let i = 0
  let inBold = false
  let currentText = ''

  const flushText = (key) => {
    if (currentText) {
      result.push(currentText)
      currentText = ''
    }
  }

  const renderPopup = (triggerText, key) => {
    const popupData = inlinePopups?.[triggerText]
    if (popupData) {
      return (
        <InfoIndicator
          key={key}
          variant="custom"
          size="md"
          label={`Customer quote on ${triggerText}`}
          maxWidth={320}
          customTrigger={
            <span className="detail-content__inline-popup-trigger">{triggerText}</span>
          }
        >
          <p className="detail-content__popup-content">{popupData.content}</p>
        </InfoIndicator>
      )
    }
    return triggerText
  }

  while (i < text.length) {
    // Check for bold marker
    if (text.slice(i, i + 2) === '**') {
      if (inBold) {
        // End bold - wrap accumulated content
        result.push(<strong key={`bold-${i}`}>{currentText}</strong>)
        currentText = ''
      } else {
        // Start bold - flush any plain text first
        flushText(`text-${i}`)
      }
      inBold = !inBold
      i += 2
      continue
    }

    // Check for popup marker
    if (text.slice(i, i + 2) === '{{') {
      const endIndex = text.indexOf('}}', i)
      if (endIndex !== -1) {
        flushText(`text-${i}`)
        const triggerText = text.slice(i + 2, endIndex)
        const popup = renderPopup(triggerText, `popup-${i}`)
        if (inBold) {
          result.push(<strong key={`bold-popup-${i}`}>{popup}</strong>)
        } else {
          result.push(popup)
        }
        i = endIndex + 2
        continue
      }
    }

    currentText += text[i]
    i++
  }

  // Flush remaining text
  if (currentText) {
    if (inBold) {
      result.push(<strong key="bold-end">{currentText}</strong>)
    } else {
      result.push(currentText)
    }
  }

  return result
}

// Parse paragraphs from text with double newlines
const renderParagraphs = (text, className = 'detail-content__text', inlinePopups = null, linkContext = null) => {
  if (!text) return null
  const paragraphs = text.split('\n\n').filter(p => p.trim())
  return paragraphs.map((para, i) => (
    <p key={i} className={className}>
      {renderWithFormatting(para.trim(), inlinePopups, linkContext)}
    </p>
  ))
}

// Render a content section based on its type
const renderSection = (section, index, { onMilestoneClick, onImageClick, linkContext } = {}) => {
  switch (section.type) {
    case 'section-heading':
      return (
        <h2 key={index} className="detail-content__section-heading">{section.content}</h2>
      )

    case 'text':
      return (
        <div key={index} className="detail-content__section">
          {section.heading && (
            <h2 className="detail-content__heading">{section.heading}</h2>
          )}
          {renderParagraphs(section.content, 'detail-content__text', section.inlinePopups, linkContext)}
        </div>
      )

    case 'image':
      const figureClasses = [
        'detail-content__figure',
        section.small && 'detail-content__figure--small',
        section.phoneMockup && 'detail-content__figure--phone-mockup',
        section.clickable && 'detail-content__figure--clickable',
        section.align === 'left' && 'detail-content__figure--left'
      ].filter(Boolean).join(' ')

      const zoomIcon = (
        <div className="detail-content__zoom-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
            <path d="M11 8v6M8 11h6" />
          </svg>
        </div>
      )

      const imageContent = section.phoneMockup ? (
        <div className="detail-content__phone-container">
          <img
            src={section.src}
            alt={section.alt || ''}
            className="detail-content__phone-image"
            loading="lazy"
          />
          {section.clickable && zoomIcon}
        </div>
      ) : (
        <>
          <img
            src={section.src}
            alt={section.alt || ''}
            className="detail-content__image"
            loading="lazy"
          />
          {section.clickable && zoomIcon}
        </>
      )

      return (
        <figure key={index} className={figureClasses}>
          {section.clickable ? (
            <div
              className="detail-content__image-clickable"
              onClick={() => onImageClick?.([{ src: section.src, alt: section.alt, heading: section.caption }], 0)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onImageClick?.([{ src: section.src, alt: section.alt, heading: section.caption }], 0)}
            >
              {imageContent}
            </div>
          ) : (
            imageContent
          )}
          {section.caption && (
            <figcaption className="detail-content__caption">
              {section.caption}
            </figcaption>
          )}
        </figure>
      )

    case 'list':
      return (
        <div key={index} className="detail-content__section">
          {section.heading && (
            <h2 className="detail-content__heading">{section.heading}</h2>
          )}
          <ul className="detail-content__list">
            {section.items.map((item, i) => (
              <li key={i} className="detail-content__list-item">
                {renderWithFormatting(item, null, linkContext)}
              </li>
            ))}
          </ul>
        </div>
      )

    case 'callout':
      return (
        <blockquote key={index} className="detail-content__callout">
          <p>{renderWithFormatting(section.content, null, linkContext)}</p>
        </blockquote>
      )

    case 'media-row':
      // Transform items for lightbox (only images, not videos)
      const mediaRowItems = section.items
        .filter(item => item.type !== 'video')
        .map(item => ({
          src: item.src,
          alt: item.alt,
          heading: item.caption
        }))

      const mediaRowClasses = [
        'detail-content__media-row',
        section.constrain && 'detail-content__media-row--constrained'
      ].filter(Boolean).join(' ')

      return (
        <div key={index} className={mediaRowClasses}>
          <div className="detail-content__media-row-items">
            {section.items.map((item, i) => {
              const isClickable = item.type !== 'video'
              const lightboxIndex = isClickable
                ? section.items.slice(0, i).filter(it => it.type !== 'video').length
                : 0

              return (
                <figure key={i} className="detail-content__media-item">
                  <div
                    className={`detail-content__media-container ${isClickable ? 'detail-content__media-container--clickable' : ''}`}
                    onClick={isClickable ? () => onImageClick?.(mediaRowItems, lightboxIndex) : undefined}
                    role={isClickable ? 'button' : undefined}
                    tabIndex={isClickable ? 0 : undefined}
                    onKeyDown={isClickable ? (e) => e.key === 'Enter' && onImageClick?.(mediaRowItems, lightboxIndex) : undefined}
                  >
                    {item.type === 'video' ? (
                      <VideoPlayer
                        src={item.src}
                        poster={item.poster}
                        className="detail-content__media-video"
                      />
                    ) : (
                      <>
                        <img
                          src={item.src}
                          alt={item.alt || ''}
                          className="detail-content__media-image"
                          loading="lazy"
                        />
                        <div className="detail-content__zoom-icon">
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                            <path d="M11 8v6M8 11h6" />
                          </svg>
                        </div>
                      </>
                    )}
                  </div>
                  {item.caption && (
                    <figcaption className="detail-content__media-caption">
                      {item.caption}
                      {item.myTake && (
                        <InfoIndicator
                          variant="icon"
                          size="sm"
                          label={`My take on ${item.caption}`}
                          maxWidth={280}
                        >
                          <p className="detail-content__popup-content">{item.myTake}</p>
                        </InfoIndicator>
                      )}
                    </figcaption>
                  )}
                </figure>
              )
            })}
          </div>
          {section.caption && (
            <figcaption className="detail-content__media-row-caption">
              {section.caption}
            </figcaption>
          )}
        </div>
      )

    case 'milestone-row':
      return (
        <div key={index} className="detail-content__milestone-row">
          {section.items.map((item, i) => (
            <div key={i} className="detail-content__milestone">
              {item.image && (
                <div
                  className="detail-content__milestone-image-container detail-content__milestone-image-container--clickable"
                  onClick={() => onMilestoneClick?.(section.items, i)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onMilestoneClick?.(section.items, i)}
                >
                  <img
                    src={item.image.src}
                    alt={item.image.alt || ''}
                    className="detail-content__milestone-image"
                    loading="lazy"
                  />
                  <div className="detail-content__zoom-icon">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                      <path d="M11 8v6M8 11h6" />
                    </svg>
                  </div>
                </div>
              )}
              <h3 className="detail-content__milestone-heading">{item.heading}</h3>
              <p className="detail-content__milestone-content">{item.content}</p>
            </div>
          ))}
        </div>
      )

    case 'principles-row':
      return (
        <div key={index} className="detail-content__principles-row">
          {section.items.map((item, i) => (
            <div key={i} className="detail-content__principle">
              {item.image && (
                <div className="detail-content__principle-icon">
                  <img
                    src={item.image}
                    alt={item.title || ''}
                    loading="lazy"
                  />
                </div>
              )}
              {item.microHeader && (
                <span className="detail-content__principle-micro">{item.microHeader}</span>
              )}
              <h3 className="detail-content__principle-title">{item.title}</h3>
              <p className="detail-content__principle-desc">{item.description}</p>
            </div>
          ))}
        </div>
      )

    default:
      return null
  }
}

const DetailCaseStudyContent = ({ study }) => {
  const { meta, parentId, content } = study
  const location = useLocation()
  const navigate = useNavigate()

  // Read referrer info for dynamic back navigation
  const referrerId = location.state?.referrerId
  const referrerTitle = location.state?.referrerTitle

  // Preserve parent scroll position through navigation chain
  // This is the scroll position to restore when going back to the parent case study
  // Handle both new naming (parentScrollY) and legacy naming (scrollY from older GoDeeper)
  const parentScrollY = location.state?.parentScrollY ?? location.state?.scrollY

  // The scroll position of the page that linked to us (used for back navigation to another sub-page)
  // InlineLink passes this as scrollY - it's where the PREVIOUS page was scrolled to when they clicked
  const previousPageScrollY = location.state?.scrollY

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxItems, setLightboxItems] = useState([])
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Scroll restoration when returning to this detail page from another detail page
  useEffect(() => {
    const restoreScrollY = location.state?.restoreScrollY
    if (restoreScrollY !== undefined) {
      setTimeout(() => {
        window.scrollTo(0, restoreScrollY)
      }, 0)
    }
  }, [location.state?.restoreScrollY])

  const openLightbox = useCallback((items, index) => {
    // Transform items to lightbox format (handle both milestone and regular image formats)
    const transformedItems = items.map(item => {
      // Regular image format: { src, alt, heading }
      if (item.src) {
        return {
          src: item.src,
          alt: item.alt,
          heading: item.heading
        }
      }
      // Milestone format: { image: { src, alt }, heading }
      return {
        src: item.image.src,
        alt: item.image.alt,
        heading: item.heading
      }
    })
    setLightboxItems(transformedItems)
    setLightboxIndex(index)
    setLightboxOpen(true)
  }, [])

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false)
  }, [])

  const goToPrev = useCallback(() => {
    setLightboxIndex((prev) => prev === 0 ? lightboxItems.length - 1 : prev - 1)
  }, [lightboxItems.length])

  const goToNext = useCallback(() => {
    setLightboxIndex((prev) => prev === lightboxItems.length - 1 ? 0 : prev + 1)
  }, [lightboxItems.length])

  // Find the parent case study for back navigation
  const parentStudy = caseStudies.find(s => s.id === parentId)

  if (!parentStudy) {
    console.error(`DetailCaseStudyContent: Parent study "${parentId}" not found`)
    return (
      <div className="detail-content">
        <p className="detail-content__error">
          Error: Parent case study not found. This detail page may be orphaned.
        </p>
      </div>
    )
  }

  const parentTitle = parentStudy.meta.title

  // Determine back navigation target - either the referring sub-page or the parent
  const backTarget = referrerId ? `/work/${referrerId}` : `/work/${parentId}`
  const backLabel = referrerTitle ? `Back to ${referrerTitle}` : `Back to ${parentTitle}`

  // Handle back navigation with scroll restoration
  const handleBack = (e) => {
    e.preventDefault()
    if (referrerId) {
      // Going back to another detail page
      // Restore to where that page was scrolled when they clicked the link to us
      navigate(backTarget, { state: { restoreScrollY: previousPageScrollY, parentScrollY } })
    } else {
      // Going back to parent case study
      navigate(backTarget, { state: { restoreScrollY: parentScrollY } })
    }
  }

  // Context for inline links - pass current page info as referrer
  // Also pass parentScrollY so it survives navigation between detail pages
  const linkContext = {
    referrerId: study.id,
    referrerTitle: meta.title,
    parentScrollY
  }

  return (
    <div className="detail-content">
      {/* Sticky back navigation */}
      <nav className="detail-content__back-nav">
        <a
          href={backTarget}
          onClick={handleBack}
          className="detail-content__back-link"
        >
          <svg
            className="detail-content__back-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5" />
            <path d="M12 19l-7-7 7-7" />
          </svg>
          <span>{backLabel}</span>
        </a>
      </nav>

      {/* Header */}
      <header className="detail-content__header">
        <h1 className="detail-content__title">{meta.title}</h1>
        {meta.subtitle && (
          <p className="detail-content__subtitle">{meta.subtitle}</p>
        )}
      </header>

      {/* Content body */}
      <div className="detail-content__body">
        {content?.sections?.map((section, index) =>
          renderSection(section, index, { onMilestoneClick: openLightbox, onImageClick: openLightbox, linkContext })
        )}
      </div>

      {/* Lightbox */}
      {lightboxOpen && lightboxItems.length > 0 && (
        <DetailLightbox
          items={lightboxItems}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={goToPrev}
          onNext={goToNext}
        />
      )}
    </div>
  )
}

export default DetailCaseStudyContent
