import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import { playLoginOpenSound, playLoginSuccessSound, playLoginErrorSound } from '../../utils/audio'
import './LoginModal.css'

const LoginModal = ({ isOpen, onClose }) => {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, error, success
  const [showUnlockAnimation, setShowUnlockAnimation] = useState(false)
  const inputRef = useRef(null)
  const { login } = useAuth()

  // Focus input and trigger intro animation when modal opens
  useEffect(() => {
    if (isOpen) {
      setShowUnlockAnimation(true)
      playLoginOpenSound()
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCode('')
      setError('')
      setStatus('idle')
      setShowUnlockAnimation(false)
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!code.trim()) {
      setError('Please enter an access code')
      setStatus('error')
      return
    }

    setStatus('loading')
    setError('')

    // Small delay for UX
    await new Promise(resolve => setTimeout(resolve, 300))

    const result = login(code)

    if (result.success) {
      setStatus('success')
      setShowUnlockAnimation(true)
      playLoginSuccessSound()
      setTimeout(() => {
        onClose()
      }, 3000) // Extended to enjoy the celebration
    } else {
      setStatus('error')
      setError('invalid')
      playLoginErrorSound()
    }
  }

  if (!isOpen) return null

  return (
    <div className={`login-modal__overlay ${status === 'success' ? 'login-modal__overlay--success' : ''}`} onClick={onClose}>
      {/* Success celebration background */}
      {status === 'success' && (
        <div className="login-modal__celebration">
          <div className="login-modal__rays" />
          <div className="login-modal__particles">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="login-modal__particle" style={{ '--i': i }} />
            ))}
          </div>
        </div>
      )}

      <div
        className={`login-modal ${status === 'success' ? 'login-modal--success' : ''}`}
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
      >
        <button
          className="login-modal__close"
          onClick={onClose}
          aria-label="Close modal"
          style={{ display: status === 'success' ? 'none' : undefined }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className={`login-modal__icon ${showUnlockAnimation ? 'login-modal__icon--animating' : ''} ${status === 'success' ? 'login-modal__icon--success' : ''} ${status === 'error' ? 'login-modal__icon--error' : ''}`}>
          {/* Glow effect on success */}
          {status === 'success' && <div className="login-modal__glow" />}
          {/* Rainbow burst on open and success */}
          {showUnlockAnimation && status !== 'error' && (
            <div className="login-modal__rainbow" />
          )}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="login-modal__lock">
            {/* Lock body */}
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            {/* Shackle */}
            <path d="M7 11V7a5 5 0 0 1 10 0v4" className="login-modal__shackle" />
          </svg>
        </div>

        <h2 id="login-modal-title" className="login-modal__title">
          {status === 'success' ? 'Access Granted' : 'Protected Content'}
        </h2>

        <p className="login-modal__description">
          {status === 'success'
            ? 'Loading protected case studies...'
            : 'Enter your access code to view protected case studies.'
          }
        </p>

        {status !== 'success' && (
          <form onSubmit={handleSubmit} className="login-modal__form">
            <div className="login-modal__input-wrapper">
              <input
                ref={inputRef}
                type="text"
                value={code}
                onChange={(e) => {
                  setCode(e.target.value)
                  if (error) setError('')
                  if (status === 'error') setStatus('idle')
                }}
                placeholder="Access code"
                className={`login-modal__input ${status === 'error' ? 'login-modal__input--error' : ''}`}
                disabled={status === 'loading'}
                autoComplete="off"
                spellCheck="false"
              />
              {error && (
                <p className="login-modal__error">
                  You need a <span className="login-modal__rainbow-text">proper</span> access code
                </p>
              )}
            </div>

            <button
              type="submit"
              className="login-modal__submit"
              disabled={status === 'loading'}
            >
              {status === 'loading' ? (
                <span className="login-modal__spinner" />
              ) : (
                'Submit'
              )}
            </button>

            {status === 'error' && (
              <a
                href="mailto:matthimou@gmail.com?subject=Portfolio%20Access%20Code%20Request"
                className="login-modal__email-link"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Request an Access Code
              </a>
            )}
          </form>
        )}
      </div>
    </div>
  )
}

export default LoginModal
