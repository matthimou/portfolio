import { useState, useRef, useEffect, useCallback } from 'react'
import './InfoIndicator.css'

/**
 * InfoIndicator - A reusable "i" indicator that reveals content on hover/tap
 *
 * @param {Object} props
 * @param {'icon' | 'accent' | 'minimal' | 'subtle'} props.variant - Visual style variant (default: 'icon')
 * @param {'auto' | 'top' | 'bottom' | 'left' | 'right'} props.position - Popup position
 * @param {'sm' | 'md' | 'lg'} props.size - Trigger size
 * @param {number} props.hoverDelay - Delay before showing on hover (ms)
 * @param {number} props.maxWidth - Max popup width in px
 * @param {string} props.label - Accessible label for the trigger
 * @param {React.ReactNode} props.children - Popup content
 */
const InfoIndicator = ({
  variant = 'icon',
  position = 'auto',
  size = 'md',
  hoverDelay = 150,
  maxWidth = 320,
  label = 'More information',
  children
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isAnimatingOut, setIsAnimatingOut] = useState(false)
  const [computedPosition, setComputedPosition] = useState(position === 'auto' ? 'bottom' : position)
  const [horizontalShift, setHorizontalShift] = useState(0)

  const triggerRef = useRef(null)
  const popupRef = useRef(null)
  const hoverTimeoutRef = useRef(null)
  const leaveTimeoutRef = useRef(null)
  const uniqueId = useRef(`info-indicator-${Math.random().toString(36).substr(2, 9)}`)

  // Calculate best position based on available viewport space
  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || position !== 'auto') {
      setComputedPosition(position === 'auto' ? 'bottom' : position)
      return
    }

    const trigger = triggerRef.current.getBoundingClientRect()
    const viewportHeight = window.innerHeight
    const viewportWidth = window.innerWidth
    const popupHeight = 150 // Estimated height
    const popupWidth = Math.min(maxWidth, viewportWidth - 32)
    const margin = 8

    // Check available space in each direction
    const spaceAbove = trigger.top
    const spaceBelow = viewportHeight - trigger.bottom
    const spaceLeft = trigger.left
    const spaceRight = viewportWidth - trigger.right

    // Prefer bottom, then top, then right, then left
    let bestPosition = 'bottom'
    if (spaceBelow >= popupHeight + margin) {
      bestPosition = 'bottom'
    } else if (spaceAbove >= popupHeight + margin) {
      bestPosition = 'top'
    } else if (spaceRight >= popupWidth + margin) {
      bestPosition = 'right'
    } else if (spaceLeft >= popupWidth + margin) {
      bestPosition = 'left'
    }

    setComputedPosition(bestPosition)

    // Calculate horizontal shift to keep popup in viewport
    if (bestPosition === 'top' || bestPosition === 'bottom') {
      const triggerCenter = trigger.left + trigger.width / 2
      const halfPopupWidth = popupWidth / 2

      if (triggerCenter - halfPopupWidth < margin) {
        // Too close to left edge
        setHorizontalShift(halfPopupWidth - triggerCenter + margin)
      } else if (triggerCenter + halfPopupWidth > viewportWidth - margin) {
        // Too close to right edge
        setHorizontalShift(viewportWidth - margin - triggerCenter - halfPopupWidth)
      } else {
        setHorizontalShift(0)
      }
    } else {
      setHorizontalShift(0)
    }
  }, [position, maxWidth])

  // Handle opening with animation
  const openPopup = useCallback(() => {
    calculatePosition()
    setIsAnimatingOut(false)
    setIsOpen(true)
  }, [calculatePosition])

  // Handle closing with animation
  const closePopup = useCallback(() => {
    setIsAnimatingOut(true)
    setTimeout(() => {
      setIsOpen(false)
      setIsAnimatingOut(false)
    }, 150) // Match exit animation duration
  }, [])

  // Desktop hover handlers
  const handleMouseEnter = useCallback(() => {
    clearTimeout(leaveTimeoutRef.current)
    hoverTimeoutRef.current = setTimeout(openPopup, hoverDelay)
  }, [hoverDelay, openPopup])

  const handleMouseLeave = useCallback(() => {
    clearTimeout(hoverTimeoutRef.current)
    leaveTimeoutRef.current = setTimeout(closePopup, 100) // Grace period
  }, [closePopup])

  // Mobile tap/click handler
  const handleClick = useCallback((e) => {
    e.preventDefault()
    e.stopPropagation()

    if (isOpen) {
      closePopup()
    } else {
      openPopup()
    }
  }, [isOpen, openPopup, closePopup])

  // Keyboard handlers
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      if (isOpen) {
        closePopup()
      } else {
        openPopup()
      }
    } else if (e.key === 'Escape' && isOpen) {
      closePopup()
      triggerRef.current?.focus()
    }
  }, [isOpen, openPopup, closePopup])

  // Close on click outside (mobile)
  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (e) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target) &&
        popupRef.current &&
        !popupRef.current.contains(e.target)
      ) {
        closePopup()
      }
    }

    // Small delay to prevent immediate close on the opening click
    const timeoutId = setTimeout(() => {
      document.addEventListener('click', handleClickOutside)
    }, 10)

    return () => {
      clearTimeout(timeoutId)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isOpen, closePopup])

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      clearTimeout(hoverTimeoutRef.current)
      clearTimeout(leaveTimeoutRef.current)
    }
  }, [])

  const popupStyles = {
    maxWidth: `${maxWidth}px`,
    '--horizontal-shift': `${horizontalShift}px`
  }

  return (
    <span
      className="info-indicator"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        ref={triggerRef}
        type="button"
        className={`info-indicator__trigger info-indicator__trigger--${variant} info-indicator__trigger--${size}`}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-describedby={isOpen ? uniqueId.current : undefined}
        aria-label={label}
      >
        {variant === 'icon' ? (
          <svg className="info-indicator__svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="currentColor"/>
            <path d="M11 10H13V17H11V10Z" fill="currentColor"/>
            <path d="M13.25 7.75C13.25 8.44036 12.6904 9 12 9C11.3096 9 10.75 8.44036 10.75 7.75C10.75 7.05964 11.3096 6.5 12 6.5C12.6904 6.5 13.25 7.05964 13.25 7.75Z" fill="currentColor"/>
          </svg>
        ) : (
          <span className="info-indicator__icon" aria-hidden="true">i</span>
        )}
      </button>

      {isOpen && (
        <span
          ref={popupRef}
          id={uniqueId.current}
          role="tooltip"
          className={`info-indicator__popup info-indicator__popup--${computedPosition} ${isAnimatingOut ? 'info-indicator__popup--exit' : ''}`}
          style={popupStyles}
          aria-hidden={!isOpen}
        >
          <span className="info-indicator__arrow" />
          <span className="info-indicator__content">
            {children}
          </span>
        </span>
      )}
    </span>
  )
}

export default InfoIndicator
