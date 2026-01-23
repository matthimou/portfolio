import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

const trackLogin = async (code) => {
  const webhookUrl = import.meta.env.VITE_LOGIN_WEBHOOK
  if (!webhookUrl) return

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        referrer: document.referrer
      })
    })
  } catch (e) {
    // Silent fail - don't block login
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

  const login = (code) => {
    const validCodes = (import.meta.env.VITE_AUTH_CODES || '')
      .split(',')
      .map(c => c.trim().toUpperCase())
      .filter(c => c.length > 0)

    const normalizedCode = code.trim().toUpperCase()

    if (validCodes.includes(normalizedCode)) {
      sessionStorage.setItem('portfolio_auth', 'true')
      sessionStorage.setItem('portfolio_auth_code', normalizedCode)
      setIsAuthenticated(true)
      trackLogin(normalizedCode)
      return { success: true }
    }

    return { success: false, error: 'Invalid access code' }
  }

  const logout = () => {
    sessionStorage.removeItem('portfolio_auth')
    sessionStorage.removeItem('portfolio_auth_code')
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
