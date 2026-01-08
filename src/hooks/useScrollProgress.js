import { useState, useEffect } from 'react'

/**
 * Hook to track scroll progress as a percentage (0-100)
 * Useful for scroll indicators and progress bars
 */
export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.scrollY

      // Calculate how far we've scrolled as a percentage
      const scrollableHeight = documentHeight - windowHeight
      const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0

      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    // Calculate on mount
    calculateScrollProgress()

    // Recalculate on scroll
    window.addEventListener('scroll', calculateScrollProgress, { passive: true })

    // Recalculate on resize (content height might change)
    window.addEventListener('resize', calculateScrollProgress, { passive: true })

    // Cleanup
    return () => {
      window.removeEventListener('scroll', calculateScrollProgress)
      window.removeEventListener('resize', calculateScrollProgress)
    }
  }, [])

  return scrollProgress
}
