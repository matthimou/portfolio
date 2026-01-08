import { useEffect } from 'react'

/**
 * Hook to enable smooth scrolling to anchor links
 * Handles navigation and accounts for fixed header offset
 */
export const useSmoothScroll = () => {
  useEffect(() => {
    // Enable smooth scrolling globally
    document.documentElement.style.scrollBehavior = 'smooth'

    // Handle anchor link clicks
    const handleAnchorClick = (e) => {
      const target = e.target.closest('a[href^="#"]')
      if (!target) return

      const href = target.getAttribute('href')

      // Ignore if it's just "#"
      if (href === '#') {
        e.preventDefault()
        return
      }

      e.preventDefault()
      const id = href.slice(1)
      const element = document.getElementById(id)

      if (element) {
        // Account for fixed navigation height
        const navHeight = 60 // var(--nav-height)
        const targetPosition = element.getBoundingClientRect().top + window.scrollY - navHeight

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        })

        // Update URL without triggering scroll
        history.pushState(null, '', href)

        // Set focus for accessibility
        element.setAttribute('tabindex', '-1')
        element.focus()
      }
    }

    document.addEventListener('click', handleAnchorClick)

    // Cleanup
    return () => {
      document.removeEventListener('click', handleAnchorClick)
    }
  }, [])
}
