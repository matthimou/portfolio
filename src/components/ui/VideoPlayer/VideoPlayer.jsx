import { useEffect, useRef } from 'react'
import './VideoPlayer.css'

/**
 * VideoPlayer - Shared video component with IntersectionObserver for Safari mobile support
 *
 * Features:
 * - IntersectionObserver-based autoplay (plays when 50% visible)
 * - Pauses when scrolled out of view
 * - preload="metadata" for performance
 * - Error handling for play() promise rejection
 * - Respects prefers-reduced-motion
 * - playsInline + muted + loop for mobile compatibility
 *
 * @param {string} src - Video source URL
 * @param {string} poster - Poster image URL (shown before video loads)
 * @param {string} className - Additional CSS classes
 * @param {function} onClick - Optional click handler (e.g., for lightbox)
 * @param {string} caption - Optional caption text
 * @param {boolean} noShadow - Disable box-shadow
 * @param {boolean} noBorderRadius - Disable border-radius
 * @param {boolean} autoPlay - Force autoplay without IntersectionObserver (for lightbox)
 */
const VideoPlayer = ({
  src,
  poster,
  className = '',
  onClick,
  caption,
  noShadow = false,
  noBorderRadius = false,
  autoPlay = false
}) => {
  const videoRef = useRef(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // If autoPlay is forced (e.g., in lightbox), just play immediately
    if (autoPlay) {
      video.play().catch(() => {})
      return
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Don't autoplay for users who prefer reduced motion
      return
    }

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
  }, [autoPlay])

  const videoClasses = [
    'video-player__video',
    noShadow && 'video-player__video--no-shadow',
    noBorderRadius && 'video-player__video--no-radius',
    onClick && 'video-player__video--clickable',
    className
  ].filter(Boolean).join(' ')

  const handleClick = onClick ? (e) => {
    e.stopPropagation()
    onClick()
  } : undefined

  const handleKeyDown = onClick ? (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  } : undefined

  const videoElement = (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      className={videoClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={onClick ? 0 : undefined}
      role={onClick ? 'button' : undefined}
      aria-label={onClick ? 'Click to view larger' : undefined}
    />
  )

  if (caption) {
    return (
      <figure className="video-player">
        {videoElement}
        <figcaption className="video-player__caption">
          {caption}
        </figcaption>
      </figure>
    )
  }

  return videoElement
}

export default VideoPlayer
