import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const ScrollToTop = () => {
  const { pathname } = useLocation()
  const location = useLocation()

  useEffect(() => {
    // Don't reset scroll if we have scroll restoration state
    // The restoration will be handled by CaseStudyPage or DetailCaseStudyContent
    if (location.state?.restoreScrollY === undefined) {
      window.scrollTo(0, 0)
    }
  }, [pathname, location.state?.restoreScrollY])

  return null
}

export default ScrollToTop
