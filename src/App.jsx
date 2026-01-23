import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ScrollToTop from './components/ScrollToTop'
import Navigation from './components/layout/Navigation'
import LoginModal from './components/auth/LoginModal'
import HomePage from './pages/HomePage'
import WorkPage from './pages/WorkPage'
import CaseStudyPage from './pages/CaseStudyPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import './App.css'

function App() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

  const openLoginModal = () => setIsLoginModalOpen(true)
  const closeLoginModal = () => setIsLoginModalOpen(false)

  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="app">
          {/* Fixed Navigation */}
          <Navigation />

          {/* Main Content with Routes */}
          <main id="main-content">
            <Routes>
              <Route path="/" element={<HomePage onOpenLogin={openLoginModal} />} />
              <Route path="/work" element={<WorkPage onOpenLogin={openLoginModal} />} />
              <Route path="/work/:projectId" element={<CaseStudyPage onOpenLogin={openLoginModal} />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>

          {/* Login Modal */}
          <LoginModal isOpen={isLoginModalOpen} onClose={closeLoginModal} />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
