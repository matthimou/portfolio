import { useEffect, useRef, useState } from 'react'
import './VideoPlayer.css'

/**
 * VideoPlayer - Shared video component with IntersectionObserver for Safari mobile support
 *
 * Features:
 * - IntersectionObserver-based autoplay (plays when 50% visible)
 * - Pauses when scrolled out of view
 * - Play icon overlay when paused
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
 * @param {boolean} showPlayIcon - Show play icon overlay when paused (default: true)
 */
const VideoPlayer = ({
  src,
  poster,
  className = '',
  onClick,
  caption,
  noShadow = false,
  noBorderRadius = false,
  autoPlay = false,
  showPlayIcon = true
}) => {
  const videoRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Track play/pause state for play icon visibility
    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    // If autoPlay is forced (e.g., in lightbox), just play immediately
    if (autoPlay) {
      video.play().catch(() => {})
      return () => {
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
      }
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Don't autoplay for users who prefer reduced motion
      return () => {
        video.removeEventListener('play', handlePlay)
        video.removeEventListener('pause', handlePause)
      }
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
    return () => {
      observer.disconnect()
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
    }
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

  const playIcon = showPlayIcon && !isPlaying && (
    <div className="video-player__play-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="currentColor">
        <path d="M8 5v14l11-7z" />
      </svg>
    </div>
  )

  const videoWithIcon = (
    <div className="video-player__container">
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
      {playIcon}
    </div>
  )

  if (caption) {
    return (
      <figure className="video-player">
        {videoWithIcon}
        <figcaption className="video-player__caption">
          {caption}
        </figcaption>
      </figure>
    )
  }

  return videoWithIcon
}

export default VideoPlayer
