import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/sections/Hero'
import VideoBackground from '../components/ui/VideoBackground'
import { caseStudies } from '../data/caseStudies'
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
import './HomePage.css'

const CareerPath = () => {
  const [activeCompany, setActiveCompany] = useState(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isTimelineHovered, setIsTimelineHovered] = useState(null)

  const companies = [
    { name: 'LeapNet', title: ['CTO', 'Dir Travel Practice'], start: '1995', end: '2001', years: '6 yrs', color: '#1a1a1a', logo: LeapnetLogo, size: 50, tabSize: 34, description: leapnetDesc },
    { name: '212°', title: ['Founder', 'CEO'], start: '2001', end: '2004', years: '3 yrs', color: '#E87722', logo: Logo212, size: 32, description: logo212Desc },
    { name: 'Orbitz', title: ['Director', 'Information Architecture'], start: '2004', end: '2012', years: '8 yrs', color: '#0099D8', logo: OrbitzLogo, size: 70, description: orbitzDesc },
    { name: 'Dateable', title: ['Founder', 'Product/Design'], start: '2012', end: '2014', years: '1.5 yrs', color: '#5B4B9E', logo: DateableLogo, size: 28, description: dateableDesc },
    { name: 'Groupon', title: ['Director', 'Consumer & Merchant Experience'], start: '2014', end: '2021', years: '8 yrs', color: '#53A318', logo: GrouponLogo, size: 70, description: grouponDesc },
    { name: 'DoorDash', title: ['Director of Design', 'Core Consumer'], start: '2021', end: '2025', years: '4 yrs', color: '#FF3008', logo: DoorDashLogo, size: 58, description: doordashDesc },
  ]

  const handleCompanyClick = (index) => {
    if (!isExpanded) {
      setIsExpanded(true)
      // Always start with most recent company (DoorDash)
      setActiveCompany(companies.length - 1)
    } else {
      setActiveCompany(index)
    }
  }

  const handleClose = () => {
    setIsExpanded(false)
    setActiveCompany(null)
  }

  return (
    <div className={`career-path ${isExpanded ? 'career-path--expanded' : ''}`}>
      {/* Timeline View */}
      <div
        className="career-path__timeline"
        onMouseEnter={() => !isExpanded && setIsTimelineHovered(true)}
        onMouseLeave={() => setIsTimelineHovered(false)}
      >
        <svg
          viewBox="0 0 900 200"
          className={`experience__illustration ${!isExpanded && isTimelineHovered ? 'experience__illustration--hovered' : ''}`}
          preserveAspectRatio="xMidYMid meet"
          onClick={() => !isExpanded && handleCompanyClick(0)}
          style={{ cursor: isExpanded ? 'default' : 'pointer' }}
        >
          {/* Background track */}
          <line x1="60" y1="90" x2="760" y2="90" stroke="var(--color-border-light)" strokeWidth="1" />
          {/* Animated progress line */}
          <line x1="60" y1="90" x2="760" y2="90" stroke="var(--color-text-tertiary)" strokeWidth="1" className="experience__progress-line" />

          {/* Company nodes */}
          {companies.map((company, index) => {
            const x = 60 + index * 140
            const delay = 300 + index * 400
            return (
              <g
                key={index}
                className="experience__node"
                style={{ '--delay': `${delay}ms`, '--company-color': company.color }}
              >
                <circle cx={x} cy="90" r="4" fill={company.color} className="experience__dot" />
                <circle cx={x} cy="90" r="4" fill="none" stroke={company.color} strokeWidth="1" className="experience__pulse" />
                <image
                  href={company.logo}
                  x={x - company.size / 2}
                  y={28 - company.size / 2}
                  width={company.size}
                  height={company.size}
                  className="experience__logo"
                  preserveAspectRatio="xMidYMid meet"
                />
                <text x={x} y="58" textAnchor="middle" className="experience__years-label">{company.years}</text>
                {/* Timeline endpoint labels */}
                {index === 0 && (
                  <text x={x - 20} y="94" textAnchor="end" className="experience__endpoint-year">1995</text>
                )}
                {index === companies.length - 1 && (
                  <text x={x + 20} y="94" textAnchor="start" className="experience__endpoint-year">2025</text>
                )}
                <text x={x} y="122" textAnchor="middle" className="experience__company-name">{company.name}</text>
                {/* Titles */}
                <g className="experience__titles">
                  {company.title.map((line, i) => (
                    <text key={i} x={x} y={152 + i * 12} textAnchor="middle" className="experience__title-label">{line}</text>
                  ))}
                </g>
              </g>
            )
          })}

        </svg>

        {/* Toggle button - upper right corner */}
        {(isTimelineHovered || isExpanded) && (
          <button
            className={`career-path__toggle ${isExpanded ? 'career-path__toggle--expanded' : ''}`}
            onClick={(e) => {
              e.stopPropagation()
              isExpanded ? handleClose() : handleCompanyClick(0)
            }}
          >
            <span className="career-path__toggle-label">{isExpanded ? 'Less' : 'More'}</span>
            <svg viewBox="0 0 16 12" className="career-path__toggle-arrows">
              {isExpanded ? (
                <>
                  <path d="M3 9 L8 4 L13 9" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="career-path__toggle-arrow career-path__toggle-arrow--1" />
                  <path d="M3 6 L8 1 L13 6" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="career-path__toggle-arrow career-path__toggle-arrow--2" />
                </>
              ) : (
                <>
                  <path d="M3 1 L8 6 L13 1" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="career-path__toggle-arrow career-path__toggle-arrow--1" />
                  <path d="M3 5 L8 10 L13 5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="career-path__toggle-arrow career-path__toggle-arrow--2" />
                </>
              )}
            </svg>
          </button>
        )}
      </div>

      {/* Expanded View */}
      {isExpanded && (
        <div className="career-path__expanded">
          <div className="career-path__tabs">
            {[...companies].reverse().map((company, reverseIndex) => {
              const index = companies.length - 1 - reverseIndex
              return (
                <button
                  key={index}
                  className={`career-path__tab ${activeCompany === index ? 'career-path__tab--active' : ''}`}
                  onClick={() => setActiveCompany(index)}
                  style={{ '--tab-color': company.color }}
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
              <div className="career-path__detail" style={{ '--detail-color': companies[activeCompany].color }}>
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

const HomePage = () => {
  const [cardsVisible, setCardsVisible] = useState(false)
  const [experienceVisible, setExperienceVisible] = useState(false)
  const gridRef = useRef(null)
  const experienceRef = useRef(null)

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

    if (gridRef.current) cardObserver.observe(gridRef.current)
    if (experienceRef.current) experienceObserver.observe(experienceRef.current)

    return () => {
      cardObserver.disconnect()
      experienceObserver.disconnect()
    }
  }, [])

  return (
    <div className="home-page">
      <div className="hero-experience-wrapper">
        <VideoBackground />
        <Hero name="Matthew Hanson" title="Design Leadership" hideBackground />

        {/* Experience Section */}
        <section className="experience" ref={experienceRef}>
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
      </div>

      {/* Featured Work Section */}
      <section className="home-work">
        <div className="container">
          <div className="home-work__header">
            <h2 className="home-work__heading">Featured Work</h2>
            <Link to="/work" className="home-work__view-all">
              View All Projects →
            </Link>
          </div>

          <div className="home-work__grid" ref={gridRef}>
            {caseStudies.map((project, index) => (
              <Link
                key={project.id}
                to={`/work/${project.id}`}
                className={`home-work__card ${cardsVisible ? 'home-work__card--visible' : ''}`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="home-work__image-wrapper">
                  <img
                    src={project.hero.src}
                    alt={project.hero.alt}
                    className="home-work__image"
                    loading="lazy"
                  />
                </div>
                <div className="home-work__content">
                  <h3 className="home-work__title">{project.meta.title}</h3>
                  <p className="home-work__client">{project.meta.client}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="home-footer">
        <div className="container">
          <p className="home-footer__text">I vibecoded this, so please excuse any errors</p>
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
      </footer>
    </div>
  )
}

export default HomePage
