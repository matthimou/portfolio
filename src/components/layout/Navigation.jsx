import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { navigationLinks, brandName } from '../../data/navigation'
import ThemeToggle from '../ui/ThemeToggle'
import avatarImage from '../../assets/MatthewHansonAvatar.jpg'
import './Navigation.css'

const Navigation = () => {
  const scrollProgress = useScrollProgress()
  const location = useLocation()
  const isHomePage = location.pathname === '/'

  const [scrollY, setScrollY] = useState(0)
  const [showBrand, setShowBrand] = useState(!isHomePage)

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Show/hide brand based on scroll (only on homepage)
  useEffect(() => {
    if (!isHomePage) {
      setShowBrand(true)
      return
    }

    const scrollThreshold = 150
    setShowBrand(scrollY > scrollThreshold)
  }, [scrollY, isHomePage])

  // Reset when navigating
  useEffect(() => {
    setShowBrand(isHomePage ? scrollY > 150 : true)
  }, [location.pathname, isHomePage, scrollY])

  return (
    <nav className="navigation" role="navigation" aria-label="Main navigation">
      <div className="navigation__container">
        {/* Brand/Logo */}
        <Link
          to="/"
          className={`navigation__brand ${showBrand ? 'navigation__brand--visible' : ''}`}
          onClick={(e) => {
            if (isHomePage) {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}
        >
          <img src={avatarImage} alt="" className="navigation__avatar" />
          {brandName}
        </Link>

        {/* Navigation Links and Actions */}
        <div className="navigation__actions">
          <ul className="navigation__links">
            {navigationLinks.map((link) => (
              <li key={link.id}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) =>
                    `navigation__link ${isActive ? 'navigation__link--active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </div>

      {/* Scroll Progress Indicator */}
      <div
        className="navigation__progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
    </nav>
  )
}

export default Navigation
