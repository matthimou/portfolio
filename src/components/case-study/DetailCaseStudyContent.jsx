import { Link, useLocation } from 'react-router-dom'
import { caseStudies } from '../../data/caseStudies'
import InfoIndicator from '../ui/InfoIndicator/InfoIndicator'
import './DetailCaseStudyContent.css'

/**
 * DetailCaseStudyContent - Layout for detail sub-pages linked from leadership case studies
 *
 * Features:
 * - Back navigation header (sticky on scroll)
 * - Title + optional subtitle
 * - Flexible content rendering (paragraphs, images, lists)
 * - Reuses existing styling patterns
 */

// Helper to parse **bold** and {{inline popup}} text
const renderWithFormatting = (text, inlinePopups = null) => {
  if (!text) return null

  // First handle inline popups if present
  if (inlinePopups && text.includes('{{')) {
    return text.split(/(\{\{[^}]+\}\})/).map((part, index) => {
      const match = part.match(/\{\{([^}]+)\}\}/)
      if (match) {
        const triggerText = match[1]
        const popupData = inlinePopups[triggerText]
        if (popupData) {
          return (
            <InfoIndicator
              key={index}
              variant="custom"
              size="md"
              label={`My take on ${triggerText}`}
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
      // Handle bold within non-popup parts
      if (part.includes('**')) {
        const boldParts = part.split(/\*\*(.*?)\*\*/g)
        return boldParts.map((boldPart, i) =>
          i % 2 === 1 ? <strong key={`${index}-${i}`}>{boldPart}</strong> : boldPart
        )
      }
      return part
    })
  }

  // Just handle bold
  if (text.includes('**')) {
    const parts = text.split(/\*\*(.*?)\*\*/g)
    return parts.map((part, i) =>
      i % 2 === 1 ? <strong key={i}>{part}</strong> : part
    )
  }
  return text
}

// Parse paragraphs from text with double newlines
const renderParagraphs = (text, className = 'detail-content__text', inlinePopups = null) => {
  if (!text) return null
  const paragraphs = text.split('\n\n').filter(p => p.trim())
  return paragraphs.map((para, i) => (
    <p key={i} className={className}>
      {renderWithFormatting(para.trim(), inlinePopups)}
    </p>
  ))
}

// Render a content section based on its type
const renderSection = (section, index) => {
  switch (section.type) {
    case 'text':
      return (
        <div key={index} className="detail-content__section">
          {section.heading && (
            <h2 className="detail-content__heading">{section.heading}</h2>
          )}
          {renderParagraphs(section.content, 'detail-content__text', section.inlinePopups)}
        </div>
      )

    case 'image':
      return (
        <figure key={index} className={`detail-content__figure ${section.small ? 'detail-content__figure--small' : ''}`}>
          <img
            src={section.src}
            alt={section.alt || ''}
            className="detail-content__image"
          />
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
                {renderWithFormatting(item)}
              </li>
            ))}
          </ul>
        </div>
      )

    case 'callout':
      return (
        <blockquote key={index} className="detail-content__callout">
          <p>{renderWithFormatting(section.content)}</p>
        </blockquote>
      )

    case 'media-row':
      return (
        <div key={index} className="detail-content__media-row">
          {section.items.map((item, i) => (
            <figure key={i} className="detail-content__media-item">
              <div className="detail-content__media-container">
                {item.type === 'video' ? (
                  <video
                    src={item.src}
                    poster={item.poster}
                    muted
                    loop
                    autoPlay
                    playsInline
                    className="detail-content__media-video"
                  />
                ) : (
                  <img
                    src={item.src}
                    alt={item.alt || ''}
                    className="detail-content__media-image"
                  />
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
  const returnTo = location.state?.returnTo

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

  return (
    <div className="detail-content">
      {/* Sticky back navigation */}
      <nav className="detail-content__back-nav">
        <Link
          to={`/work/${parentId}${returnTo ? `#${returnTo}` : ''}`}
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
          <span>Back to {parentTitle}</span>
        </Link>
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
        {content?.sections?.map((section, index) => renderSection(section, index))}
      </div>
    </div>
  )
}

export default DetailCaseStudyContent
