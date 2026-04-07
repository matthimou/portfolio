import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Hero from '../components/sections/Hero'
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
  const [activeCompany, setActiveCompany] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTimelineHovered, setIsTimelineHovered] = useState(null)
  const [pulsingNodes, setPulsingNodes] = useState({})
  const [travelingPulseX, setTravelingPulseX] = useState(70)
  const [isPulseVisible, setIsPulseVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [showAllMobile, setShowAllMobile] = useState(false)
  const [pulseColor, setPulseColor] = useState('#FF3008')
  const animationRef = useRef(null)
  const pulseAnimationRef = useRef(null)
  const { theme } = useTheme()

  // Read timeline pulse color from CSS variables
  useEffect(() => {
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue('--color-timeline-pulse').trim()
    setPulseColor(color || '#FF3008')
  }, [theme])

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Randomized traveling pulse animation
  useEffect(() => {
    if (isExpanded) return

    const startX = 70
    const endX = 830
    const totalDistance = endX - startX
    const nodePositions = [70, 222, 374, 526, 678, 830] // x positions of each node

    const runPulseCycle = () => {
      // Randomize the travel speed: 1.5s to 2.5s for the pulse to cross
      const travelDuration = 1500 + Math.random() * 1000
      const startTime = performance.now()

      setIsPulseVisible(true)
      setTravelingPulseX(startX)

      // Track which nodes have been triggered this cycle
      const triggeredNodes = new Set()

      const animate = (currentTime) => {
        const elapsed = currentTime - startTime
        const progress = Math.min(elapsed / travelDuration, 1)
        const currentX = startX + (totalDistance * progress)

        setTravelingPulseX(currentX)

        // Check if pulse has passed each node and trigger effects
        nodePositions.forEach((nodeX, index) => {
          if (currentX >= nodeX && !triggeredNodes.has(index)) {
            triggeredNodes.add(index)
            setPulsingNodes(prev => ({ ...prev, [index]: true }))

            // Reset after animation completes
            setTimeout(() => {
              setPulsingNodes(prev => ({ ...prev, [index]: false }))
            }, 400)
          }
        })

        if (progress < 1) {
          pulseAnimationRef.current = requestAnimationFrame(animate)
        } else {
          // Pulse reached the end, fade out
          setIsPulseVisible(false)

          // Schedule next cycle with random pause (4-8 seconds)
          const pauseDuration = 4000 + Math.random() * 4000
          animationRef.current = setTimeout(runPulseCycle, pauseDuration)
        }
      }

      pulseAnimationRef.current = requestAnimationFrame(animate)
    }

    // Start the animation cycle after initial delay
    const initialDelay = setTimeout(runPulseCycle, 1000)

    return () => {
      clearTimeout(initialDelay)
      if (animationRef.current) clearTimeout(animationRef.current)
      if (pulseAnimationRef.current) cancelAnimationFrame(pulseAnimationRef.current)
    }
  }, [isExpanded])

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
      // Desktop: expand view behavior
      if (!isExpanded) {
        playAccordionOpen(1.0) // Always highest pitch for initial expand
        setIsExpanded(true)
        // Always start with most recent company (DoorDash)
        setActiveCompany(companies.length - 1)
      } else {
        playAccordionOpen(pitchMultiplier)
        setActiveCompany(index)
      }
    }
  }

  const handleClose = () => {
    // Use active company's pitch for close sound
    const pitchMultiplier = activeCompany !== null
      ? 0.65 + (activeCompany / (companies.length - 1)) * 0.35
      : 1.0
    playAccordionClose(pitchMultiplier)
    setIsExpanded(false)
    setActiveCompany(null)
  }

  const handleTabClick = (index) => {
    if (index === activeCompany) return // Already active, no sound
    const pitchMultiplier = 0.65 + (index / (companies.length - 1)) * 0.35
    playAccordionOpen(pitchMultiplier)
    setActiveCompany(index)
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

      {/* Desktop: Timeline View - hidden when expanded */}
      {!isMobile && !isExpanded && (
        <div
          className="career-path__timeline"
          onMouseEnter={() => setIsTimelineHovered(true)}
          onMouseLeave={() => setIsTimelineHovered(false)}
        >
          <svg
            viewBox="0 0 900 220"
            className={`experience__illustration ${isTimelineHovered ? 'experience__illustration--hovered' : ''}`}
            preserveAspectRatio="xMidYMid meet"
            onClick={() => handleCompanyClick(0)}
            style={{ cursor: 'pointer' }}
          >
            {/* Inset shadow filter for logo band */}
            <defs>
              <filter id="inset-shadow" x="-50%" y="-50%" width="200%" height="200%">
                <feComponentTransfer in="SourceAlpha">
                  <feFuncA type="table" tableValues="1 0" />
                </feComponentTransfer>
                <feGaussianBlur stdDeviation="10" />
                <feOffset dx="0" dy="6" result="offsetblur" />
                <feFlood floodColor="rgba(0,0,0,0.45)" result="color" />
                <feComposite in2="offsetblur" operator="in" />
                <feComposite in2="SourceAlpha" operator="in" />
                <feMerge>
                  <feMergeNode in="SourceGraphic" />
                  <feMergeNode />
                </feMerge>
              </filter>
            </defs>
            {/* Logo area background - visible in dark mode */}
            <rect x="0" y="0" width="900" height="70" className="experience__logo-band" rx="4" filter="url(#inset-shadow)" />

            {/* Background track */}
            <line x1="70" y1="100" x2="830" y2="100" stroke="var(--color-border-light)" strokeWidth="1" />

            {/* Traveling pulse along timeline - dot with fading trail */}
            {isPulseVisible && (
              <g>
                {/* Trail dots - fading behind */}
                {[...Array(8)].map((_, i) => (
                  <circle
                    key={i}
                    cx={travelingPulseX - (i + 1) * 6}
                    cy="100"
                    r={3 - i * 0.3}
                    fill={pulseColor}
                    opacity={0.5 - i * 0.06}
                  />
                ))}
                {/* Outer glow */}
                <circle
                  cx={travelingPulseX}
                  cy="100"
                  r="7"
                  fill={pulseColor}
                  opacity="0.25"
                />
                {/* Main dot at front */}
                <circle
                  cx={travelingPulseX}
                  cy="100"
                  r="4"
                  fill={pulseColor}
                  className="experience__traveling-dot"
                />
              </g>
            )}

            {/* Company nodes */}
            {companies.map((company, index) => {
              const x = 70 + index * 152
              const delay = 300 + index * 400
              const isPulsing = pulsingNodes[index]
              const dotColor = isDark && company.darkColor ? company.darkColor : company.color
              return (
                <g
                  key={index}
                  className={`experience__node ${isPulsing ? 'experience__node--pulsing' : ''}`}
                  style={{ '--delay': `${delay}ms`, '--company-color': dotColor }}
                >
                  {/* Logo above timeline */}
                  <image
                    href={company.logo}
                    x={x - company.size / 2}
                    y={35 - company.size / 2}
                    width={company.size}
                    height={company.size}
                    className={`experience__logo ${isPulsing ? 'experience__logo--pulsing' : ''}`}
                    preserveAspectRatio="xMidYMid meet"
                  />
                  {/* Timeline dot and pulse - centered */}
                  <circle cx={x} cy="100" r="4" fill={dotColor} className="experience__dot" />
                  <circle cx={x} cy="100" r="4" fill="none" stroke={dotColor} strokeWidth="1" className={`experience__pulse ${isPulsing ? 'experience__pulse--active' : ''}`} />
                  {/* Timeline endpoint labels */}
                  {index === 0 && (
                    <text x={x - 20} y="104" textAnchor="end" className="experience__endpoint-year">1995</text>
                  )}
                  {index === companies.length - 1 && (
                    <text x={x + 20} y="104" textAnchor="start" className="experience__endpoint-year">2025</text>
                  )}
                  {/* Company name below timeline */}
                  <text x={x} y="145" textAnchor="middle" className="experience__company-name">{company.name}</text>
                  {/* Titles below company name */}
                  <g className="experience__titles">
                    {company.title.map((line, i) => (
                      <text key={i} x={x} y={177 + i * 14} textAnchor="middle" className="experience__title-label">{line}</text>
                    ))}
                  </g>
                </g>
              )
            })}

          </svg>

          {/* Toggle button - visible on hover (desktop) or always (touch) */}
          <button
            className={`career-path__toggle ${isTimelineHovered ? 'career-path__toggle--visible' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              handleCompanyClick(0)
            }}
          >
            <span className="career-path__toggle-label">More</span>
            <svg viewBox="0 0 16 12" className="career-path__toggle-arrows">
              <path d="M3 1 L8 6 L13 1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="career-path__toggle-arrow career-path__toggle-arrow--1" />
              <path d="M3 5 L8 10 L13 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="career-path__toggle-arrow career-path__toggle-arrow--2" />
            </svg>
          </button>
        </div>
      )}

      {/* Desktop: Expanded View - replaces timeline */}
      {!isMobile && isExpanded && (
        <div className="career-path__expanded">
          <div className="career-path__tabs">
            {[...companies].reverse().map((company, reverseIndex) => {
              const index = companies.length - 1 - reverseIndex
              const tabColor = isDark && company.darkColor ? company.darkColor : company.color
              return (
                <button
                  key={index}
                  className={`career-path__tab ${activeCompany === index ? 'career-path__tab--active' : ''}`}
                  onClick={() => handleTabClick(index)}
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
          <button className="career-path__collapse" onClick={handleClose}>
            <svg viewBox="0 0 16 12" className="career-path__collapse-arrows">
              <path d="M3 9 L8 4 L13 9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M3 6 L8 1 L13 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="career-path__collapse-label">Less</span>
          </button>
        </div>
      )}
    </div>
  )
}

const HomePage = ({ onOpenLogin }) => {
  const [cardsVisible, setCardsVisible] = useState(false)
  const [experienceVisible, setExperienceVisible] = useState(false)
  const [introVisible, setIntroVisible] = useState(false)
  const gridRef = useRef(null)
  const experienceRef = useRef(null)
  const introRef = useRef(null)
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

    if (gridRef.current) cardObserver.observe(gridRef.current)
    if (experienceRef.current) experienceObserver.observe(experienceRef.current)
    if (introRef.current) introObserver.observe(introRef.current)

    return () => {
      cardObserver.disconnect()
      experienceObserver.disconnect()
      introObserver.disconnect()
    }
  }, [])

  return (
    <div className="home-page">
      {/* Hero Section */}
      <div className="hero-experience-wrapper">
        <VideoBackground />
        <Hero name="Matthew Hanson" title="Design Leadership" hideBackground />
      </div>

      {/* About/Intro Section */}
      <section className="home-intro" ref={introRef}>
        <div className="container">
          <div className={`home-intro__content ${introVisible ? 'home-intro__content--visible' : ''}`}>
            <div className="home-intro__text">
              <p>I'm a product design leader with a rich history of building high-performing design teams inside fast-moving companies. I help design teams grow, build agency, and reduce ambiguity while improving their ability to make high-quality decisions.</p>
              <p>Across my leadership roles, I've managed the entire lifecycle of design orgs from recruiting to retaining, and have transformed how teams communicate, align, and work. I love working with cross-functional partners to refine what matters, why it matters, and how to act on it.</p>
              <p>I am based in Chicago.</p>
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
            <h2 className="home-work__heading">Leadership Case Studies</h2>
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
                    {project.introduction?.content?.substring(0, 150)}...
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

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
