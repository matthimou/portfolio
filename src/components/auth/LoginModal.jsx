import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../../context/AuthContext'
import './LoginModal.css'

const LoginModal = ({ isOpen, onClose }) => {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // idle, loading, error, success
  const inputRef = useRef(null)
  const { login } = useAuth()

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setCode('')
      setError('')
      setStatus('idle')
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
      setTimeout(() => {
        onClose()
      }, 500)
    } else {
      setStatus('error')
      setError(result.error)
    }
  }

  if (!isOpen) return null

  return (
    <div className="login-modal__overlay" onClick={onClose}>
      <div
        className="login-modal"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-modal-title"
      >
        <button
          className="login-modal__close"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        <div className="login-modal__icon">
          {status === 'success' ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="login-modal__icon-check">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          )}
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
                <p className="login-modal__error">{error}</p>
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
          </form>
        )}
      </div>
    </div>
  )
}

export default LoginModal
