import { Link } from 'react-router-dom'
import './GoDeeper.css'

/**
 * GoDeeper - Entry point component for linking to detail case study pages
 *
 * @param {Object} props
 * @param {string} props.to - The route to navigate to (e.g., "/work/doordash-doubledash--governance")
 * @param {'inline' | 'chip'} props.variant - Visual style variant
 * @param {string} props.returnTo - Section ID to return to (e.g., "how-i-led")
 * @param {React.ReactNode} props.children - Link text content
 * @param {string} props.className - Additional CSS classes
 */
const GoDeeper = ({
  to,
  variant = 'inline',
  returnTo,
  children,
  className = ''
}) => {
  const baseClass = 'go-deeper'
  const variantClass = `${baseClass}--${variant}`
  const classes = [baseClass, variantClass, className].filter(Boolean).join(' ')

  return (
    <Link to={to} state={{ returnTo }} className={classes}>
      {variant === 'chip' && (
        <svg
          className="go-deeper__icon"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      )}
      <span className="go-deeper__text">{children}</span>
      {variant === 'inline' && (
        <svg
          className="go-deeper__arrow"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      )}
    </Link>
  )
}

export default GoDeeper
