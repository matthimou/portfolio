import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

/**
 * Validates code against Google Sheets backend via Apps Script
 * The API handles validation and logs the login attempt
 */
const validateCode = async (code) => {
  const apiUrl = import.meta.env.VITE_AUTH_API_URL

  if (!apiUrl) {
    console.error('VITE_AUTH_API_URL not configured')
    return { success: false, error: 'Authentication not configured' }
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' }, // Apps Script requires text/plain for CORS
      body: JSON.stringify({
        action: 'validate',
        code: code.trim().toUpperCase(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
      })
    })

    const data = await response.json()
    return data
  } catch (e) {
    console.error('Auth API error:', e)
    return { success: false, error: 'Unable to verify code. Please try again.' }
  }
}

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Check sessionStorage on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('portfolio_auth')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const login = async (code) => {
    const result = await validateCode(code)

    if (result.success) {
      sessionStorage.setItem('portfolio_auth', 'true')
      sessionStorage.setItem('portfolio_auth_code', code.trim().toUpperCase())
      if (result.partyName) {
        sessionStorage.setItem('portfolio_auth_party', result.partyName)
      }
      setIsAuthenticated(true)
      return { success: true, partyName: result.partyName }
    }

    return { success: false, error: result.error || 'Invalid access code' }
  }

  const logout = () => {
    sessionStorage.removeItem('portfolio_auth')
    sessionStorage.removeItem('portfolio_auth_code')
    sessionStorage.removeItem('portfolio_auth_party')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default AuthContext
