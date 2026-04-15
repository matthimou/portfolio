import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Hero from '../components/sections/Hero'
import DesignPrinciples from '../components/sections/DesignPrinciples'
import VideoBackground from '../components/ui/VideoBackground'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { caseStudies } from '../data/caseStudies'
import { contactInfo } from '../data/navigation'
import LeapnetLogo from '../assets/LeapnetLogo.png'
import Logo212 from '../assets/212Logo.png'
import OrbitzLogo from '../assets/OrbitzLogo.png'
import DateableLogo from '../assets/DateableLogo.png'
import GrouponLogo from '../assets/GrouponLogo.png'
import DoorDashLogo from '../assets/DoorDashLogo.png'
import ReactMarkdown from 'react-markdown'
import leapnetDesc from '../data/experience/leapnet.md?raw'
import logo212Desc from '../data/experience/212.md?raw'
import orbitzDesc from '../data/experience/orbitz.md?raw'
import dateableDesc from '../data/experience/dateable.md?raw'
import grouponDesc from '../data/experience/groupon.md?raw'
import doordashDesc from '../data/experience/doordash.md?raw'
import { playAccordionOpen, playAccordionClose, playCaseStudySound } from '../utils/audio'
import './HomePage.css'

// Only show published case studies on the home page
const publishedStudies = caseStudies.filter(s => s.status === 'published')

const CareerPath = () => {
  const [activeCompany, setActiveCompany] = useState(5) // Default to DoorDash (most recent)
  const [isMobile, setIsMobile] = useState(false)
  const [showAllMobile, setShowAllMobile] = useState(false)
  const { theme } = useTheme()

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const { isDark } = useTheme()

  const companies = [
    { name: 'LeapNet', title: ['CTO', 'Dir Travel Practice'], start: '1995', end: '2001', years: '6 yrs', color: '#1a1a1a', darkColor: '#4ECDC4', logo: LeapnetLogo, size: 65, tabSize: 34, description: leapnetDesc },
    { name: '212°', title: ['Founder', 'CEO'], start: '2001', end: '2004', years: '3 yrs', color: '#E87722', logo: Logo212, size: 42, description: logo212Desc },
    { name: 'Orbitz', title: ['Director', 'Information Architecture'], start: '2004', end: '2012', years: '8 yrs', color: '#0099D8', logo: OrbitzLogo, size: 90, description: orbitzDesc },
    { name: 'Dateable', title: ['Founder', 'Product/Design'], start: '2012', end: '2014', years: '1.5 yrs', color: '#5B4B9E', logo: DateableLogo, size: 38, description: dateableDesc },
    { name: 'Groupon', title: ['Director', 'Consumer & Merchant Experience'], start: '2014', end: '2021', years: '8 yrs', color: '#53A318', logo: GrouponLogo, size: 90, description: grouponDesc },
    { name: 'DoorDash', title: ['Director of Design', 'Core Consumer'], start: '2021', end: '2025', years: '4 yrs', color: '#FF3008', logo: DoorDashLogo, size: 50, description: doordashDesc },
  ]

  const handleCompanyClick = (index) => {
    // Pitch multiplier: newest job (index 5) = 1.0, oldest (index 0) = 0.65
    const pitchMultiplier = 0.65 + (index / (companies.length - 1)) * 0.35

    if (isMobile) {
      // Mobile: accordion behavior - toggle same company, switch to new
      if (activeCompany === index) {
        playAccordionClose(pitchMultiplier)
        setActiveCompany(null)
      } else {
        playAccordionOpen(pitchMultiplier)
        setActiveCompany(index)
      }
    } else {
      // Desktop: just switch tabs
      if (index !== activeCompany) {
        playAccordionOpen(pitchMultiplier)
        setActiveCompany(index)
      }
    }
  }

  return (
    <div className="career-path">
      {/* Mobile: Vertical accordion list */}
      {isMobile && (
        <div className="career-path__mobile-list">
          {[...companies].reverse()
            .slice(0, showAllMobile ? companies.length : 4)
            .map((company, reverseIndex) => {
              const index = companies.length - 1 - reverseIndex
              const mobileColor = isDark && company.darkColor ? company.darkColor : company.color
              return (
                <div
                  key={index}
                  className={`career-path__mobile-item ${activeCompany === index ? 'career-path__mobile-item--active' : ''}`}
                  style={{ '--company-color': mobileColor }}
                >
                  <button
                    className="career-path__mobile-header"
                    onClick={() => handleCompanyClick(index)}
                  >
                    <div className="career-path__mobile-logo-wrapper">
                      <img src={company.logo} alt={company.name} className="career-path__mobile-logo" />
                    </div>
                    <div className="career-path__mobile-info">
                      <span className="career-path__mobile-name">{company.name}</span>
                      <span className="career-path__mobile-years">{company.start}–{company.end}</span>
                    </div>
                    <span className="career-path__mobile-title">{company.title.join(', ')}</span>
                    <svg
                      className={`career-path__mobile-chevron ${activeCompany === index ? 'career-path__mobile-chevron--open' : ''}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </button>
                  {activeCompany === index && (
                    <div className="career-path__mobile-content">
                      <ReactMarkdown>{company.description}</ReactMarkdown>
                    </div>
                  )}
                </div>
              )
            })}
          {!showAllMobile && (
            <button
              className="career-path__mobile-show-all"
              onClick={() => setShowAllMobile(true)}
            >
              See all experience
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          )}
        </div>
      )}

      {/* Desktop: Tabbed View */}
      {!isMobile && (
        <div className="career-path__expanded">
          <div className="career-path__tabs">
            {[...companies].reverse().map((company, reverseIndex) => {
              const index = companies.length - 1 - reverseIndex
              const tabColor = isDark && company.darkColor ? company.darkColor : company.color
              return (
                <button
                  key={index}
                  className={`career-path__tab ${activeCompany === index ? 'career-path__tab--active' : ''}`}
                  onClick={() => handleCompanyClick(index)}
                  style={{ '--tab-color': tabColor }}
                >
                  <div className="career-path__tab-logo-wrapper">
                    <img src={company.logo} alt={company.name} className="career-path__tab-logo" style={company.tabSize ? { width: company.tabSize, height: company.tabSize } : {}} />
                  </div>
                  <span className="career-path__tab-name">{company.name}</span>
                  <span className="career-path__tab-years">{company.start}-{company.end}</span>
                </button>
              )
            })}
          </div>
          <div className="career-path__content">
            {activeCompany !== null && (
              <div className="career-path__detail" style={{ '--detail-color': isDark && companies[activeCompany].darkColor ? companies[activeCompany].darkColor : companies[activeCompany].color }}>
                <div className="career-path__detail-description">
                  <ReactMarkdown>{companies[activeCompany].description}</ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

const ValuePropsCarousel = () => {
  const [activeSlide, setActiveSlide] = useState(2)
  const [autoPlayComplete, setAutoPlayComplete] = useState(false)
  const [touchStart, setTouchStart] = useState(null)
  const totalSlides = 3

  useEffect(() => {
    if (autoPlayComplete) return

    const timer = setTimeout(() => {
      setActiveSlide(0)
      setAutoPlayComplete(true)
    }, 100)

    return () => clearTimeout(timer)
  }, [autoPlayComplete])

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchEnd = (e) => {
    if (touchStart === null) return

    const touchEnd = e.changedTouches[0].clientX
    const diff = touchStart - touchEnd
    const minSwipeDistance = 50

    if (Math.abs(diff) > minSwipeDistance) {
      if (diff > 0 && activeSlide < totalSlides - 1) {
        setActiveSlide(activeSlide + 1)
      } else if (diff < 0 && activeSlide > 0) {
        setActiveSlide(activeSlide - 1)
      }
      setAutoPlayComplete(true)
    }
    setTouchStart(null)
  }

  return (
    <section className="home-value-props">
      <div className="container">
        <div
          className="home-value-props__carousel"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="home-value-props__track"
            style={{ transform: `translateX(-${activeSlide * 100}%)` }}
          >
            {/* Slide 1: Experienced Leader */}
            <div className="home-value-props__slide">
              <div className="home-value-props__unit">
                <div className="home-value-props__image">
                  <img src="/images/ExperiencedLeader.png" alt="Experienced Leader" />
                </div>
                <div className="home-value-props__text">
                  <div className="home-value-props__item">
                    <h3>Scale</h3>
                    <p>Managed teams of 15 to 100+ in rapidly scaling organizations.</p>
                  </div>
                  <div className="home-value-props__item">
                    <h3>Collaboration</h3>
                    <p>Evolved processes as teams scaled to maintain connection.</p>
                  </div>
                  <div className="home-value-props__item">
                    <h3>Performance</h3>
                    <p>Built top performing teams at multiple industry leading companies.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 2: People First */}
            <div className="home-value-props__slide">
              <div className="home-value-props__unit">
                <div className="home-value-props__image">
                  <img src="/images/PeopleFirst.png" alt="People First" />
                </div>
                <div className="home-value-props__text">
                  <div className="home-value-props__item">
                    <h3>Team Health</h3>
                    <p>High eSAT scores and low attrition rates.</p>
                  </div>
                  <div className="home-value-props__item">
                    <h3>Career Development</h3>
                    <p>Consistently mentored teammates into management and lead IC positions.</p>
                  </div>
                  <div className="home-value-props__item">
                    <h3>Hiring and Recruiting</h3>
                    <p>Top Interviewer at Doordash, Bar Raiser at Groupon. I know what to do when hiring is a P0.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Slide 3: Leadership Style */}
            <div className="home-value-props__slide">
              <div className="home-value-props__unit">
                <div className="home-value-props__image">
                  <img src="/images/LeadershipStyle.png" alt="Leadership Style" />
                </div>
                <div className="home-value-props__text">
                  <div className="home-value-props__item">
                    <h3>Strategic Connection</h3>
                    <p>I help teams understand how their work ladders up.</p>
                  </div>
                  <div className="home-value-props__item">
                    <h3>Transparency</h3>
                    <p>I provide visibility into the why behind decisions, and build systems of communication to elevate impact.</p>
                  </div>
                  <div className="home-value-props__item">
                    <h3>Authenticity</h3>
                    <p>Spending time getting to know teammates unlocks unique opportunities to collaborate and achieve shared goals.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dot Navigation */}
        <div className="home-value-props__dots">
          <button
            className={`home-value-props__dot ${activeSlide === 0 ? 'home-value-props__dot--active' : ''}`}
            onClick={() => setActiveSlide(0)}
            aria-label="Show slide 1"
          />
          <button
            className={`home-value-props__dot ${activeSlide === 1 ? 'home-value-props__dot--active' : ''}`}
            onClick={() => setActiveSlide(1)}
            aria-label="Show slide 2"
          />
          <button
            className={`home-value-props__dot ${activeSlide === 2 ? 'home-value-props__dot--active' : ''}`}
            onClick={() => setActiveSlide(2)}
            aria-label="Show slide 3"
          />
        </div>
      </div>
    </section>
  )
}

const HomePage = ({ onOpenLogin }) => {
  const [cardsVisible, setCardsVisible] = useState(false)
  const [experienceVisible, setExperienceVisible] = useState(false)
  const [introVisible, setIntroVisible] = useState(false)
  const [principlesVisible, setPrinciplesVisible] = useState(false)
  const gridRef = useRef(null)
  const experienceRef = useRef(null)
  const introRef = useRef(null)
  const principlesRef = useRef(null)
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleCardClick = (e, project) => {
    e.preventDefault()
    playCaseStudySound()

    // If protected and not authenticated, open login modal with redirect path
    if (project.protected && !isAuthenticated) {
      setTimeout(() => onOpenLogin(`/work/${project.id}`), 80)
    } else {
      setTimeout(() => navigate(`/work/${project.id}`), 80)
    }
  }

  // Show all published case studies (badges indicate protection)
  const visibleStudies = publishedStudies

  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true)
          cardObserver.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const experienceObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setExperienceVisible(true)
          experienceObserver.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    const introObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntroVisible(true)
          introObserver.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    const principlesObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPrinciplesVisible(true)
          principlesObserver.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (gridRef.current) cardObserver.observe(gridRef.current)
    if (experienceRef.current) experienceObserver.observe(experienceRef.current)
    if (introRef.current) introObserver.observe(introRef.current)
    if (principlesRef.current) principlesObserver.observe(principlesRef.current)

    return () => {
      cardObserver.disconnect()
      experienceObserver.disconnect()
      introObserver.disconnect()
      principlesObserver.disconnect()
    }
  }, [])

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-experience-wrapper surface--dark">
        <VideoBackground />
        <Hero name="Matthew Hanson" title="Design Leader · Investor · Maltipoo Lover" hideBackground />
      </div>

      {/* Value Props Carousel Section */}
      <ValuePropsCarousel />

      {/* About/Intro Section */}
      <section className="home-intro" ref={introRef}>
        <div className="container">
          <div className={`home-intro__content ${introVisible ? 'home-intro__content--visible' : ''}`}>
            <div className="home-intro__text">
              <h2 className="home-intro__headline">I lead design teams that ship products customers love.</h2>
              <p>Across DoorDash, Groupon, and Orbitz, I've scaled design in fast-moving environments. Staying focussed on what makes great products feel human, and building teams that operate with purpose. I've launched 0→1 products, built platforms and systems that serve organizations, and helped teams consistently do their best work.</p>
              <p>Currently based in Chicago, IL.</p>
            </div>
            <div className="home-intro__image-wrapper">
              <img
                src="/images/matthew-hanson-photo.jpg"
                alt="Matthew Hanson"
                className="home-intro__image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Work Section */}
      <section className="home-work">
        <div className="container">
          <div className="home-work__header">
            <h2 className="home-work__heading">Selected Work</h2>
          </div>

          <div className="home-work__grid" ref={gridRef}>
            {visibleStudies.map((project, index) => (
              <Link
                key={project.id}
                to={`/work/${project.id}`}
                className={`home-work__card ${cardsVisible ? 'home-work__card--visible' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={(e) => handleCardClick(e, project)}
              >
                <div className="home-work__image-wrapper">
                  <img
                    src={project.hero.src}
                    alt={project.hero.alt}
                    className="home-work__image"
                    loading="lazy"
                  />
                  {project.protected && !isAuthenticated && (
                    <div className="home-work__protected-badge">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                      </svg>
                      <span>Password Protected</span>
                    </div>
                  )}
                </div>
                <div className="home-work__content">
                  <div className="home-work__meta">
                    <span className="home-work__client">{project.meta.client}</span>
                    <span className="home-work__divider">·</span>
                    <span className="home-work__timeline">{project.meta.timeline}</span>
                  </div>
                  <h3 className="home-work__title">{project.meta.title}</h3>
                  <p className="home-work__description">
                    {project.meta.cardSummary || `${project.introduction?.content?.split(/\.\s/)[0]}.`}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Design Principles Section */}
      <div
        ref={principlesRef}
        className={`design-principles-wrapper ${principlesVisible ? 'design-principles-wrapper--visible' : ''}`}
      >
        <DesignPrinciples />
      </div>

      {/* Experience Section - demoted below work */}
      <section className="experience experience--demoted" ref={experienceRef}>
        <div className="container">
          <div className={`experience__content ${experienceVisible ? 'experience__content--visible' : ''}`}>
            <div className="experience__header">
              <h2 className="experience__heading">Experience</h2>
            </div>
            <div className="experience__illustration-wrapper">
              <CareerPath />
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Contact Info */}
      <footer className="home-footer">
        <div className="container home-footer__content">
          <div className="home-footer__contact">
            <span className="home-footer__contact-label">Get in touch</span>
            <div className="home-footer__contact-links">
              <a
                href={`mailto:${contactInfo.email}`}
                className="home-footer__icon-link"
                aria-label="Email"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
              </a>
              <a
                href={contactInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="home-footer__icon-link"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>
          <div className="home-footer__credits">
            <p className="home-footer__text">I vibecoded this, so any glitches are on Claude</p>
            <a
              href="https://github.com/matthimou/portfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="home-footer__github"
              aria-label="GitHub Profile"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="home-footer__github-icon">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage
