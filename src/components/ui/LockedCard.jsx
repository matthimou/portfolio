import './LockedCard.css'

const LockedCard = ({ count, onOpenLogin }) => {
  return (
    <div className="locked-card" onClick={onOpenLogin}>
      {/* Stacked card effect */}
      <div className="locked-card__stack">
        <div className="locked-card__layer locked-card__layer--3" />
        <div className="locked-card__layer locked-card__layer--2" />
        <div className="locked-card__layer locked-card__layer--1">
          <div className="locked-card__content">
            <div className="locked-card__icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <p className="locked-card__text">
              {count} Protected {count === 1 ? 'Case Study' : 'Case Studies'}
            </p>
            <button
              className="locked-card__button"
              onClick={(e) => {
                e.stopPropagation()
                onOpenLogin()
              }}
            >
              Enter Access Code
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LockedCard
