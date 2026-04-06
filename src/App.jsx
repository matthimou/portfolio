import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import ScrollToTop from './components/ScrollToTop'
import Navigation from './components/layout/Navigation'
import LoginModal from './components/auth/LoginModal'
import HomePage from './pages/HomePage'
import CaseStudyPage from './pages/CaseStudyPage'
import DevCaseStudyPage from './pages/DevCaseStudyPage'
import './App.css'

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const openLoginModal = () => setIsLoginModalOpen(true)
  const closeLoginModal = () => setIsLoginModalOpen(false)

  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <ScrollToTop />
          <div className="app">
            {/* Fixed Navigation */}
            <Navigation />

            {/* Main Content with Routes */}
            <main id="main-content">
              <Routes>
                {/* Main routes */}
                <Route path="/" element={<HomePage onOpenLogin={openLoginModal} />} />
                <Route path="/work/:projectId" element={<CaseStudyPage onOpenLogin={openLoginModal} />} />

                {/* Dev routes for draft case studies (not in navigation) */}
                <Route path="/dev/work/:projectId" element={<DevCaseStudyPage />} />

                {/* Redirects for removed routes */}
                <Route path="/work" element={<Navigate to="/" replace />} />
                <Route path="/about" element={<Navigate to="/" replace />} />
                <Route path="/contact" element={<Navigate to="/" replace />} />
              </Routes>
            </main>

            {/* Login Modal */}
            <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
