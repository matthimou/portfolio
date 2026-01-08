import { Link, NavLink } from 'react-router-dom'
import { useScrollProgress } from '../../hooks/useScrollProgress'
import { navigationLinks, brandName } from '../../data/navigation'
import './Navigation.css'

const Navigation = () => {
  const scrollProgress = useScrollProgress()

  return (
    <nav className="navigation" role="navigation" aria-label="Main navigation">
      <div className="navigation__container">
        {/* Brand/Logo */}
        <Link to="/" className="navigation__brand">
          {brandName}
        </Link>

        {/* Navigation Links */}
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
