import { useEffect, useState } from 'react'
import './AboutPage.css'

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100)
  }, [])

  return (
    <div className="about-page">
      <div className="container">
        <section className={`about-page__content ${isVisible ? 'about-page__content--visible' : ''}`}>
          <h1 className="about-page__heading">About</h1>
          <div className="about-page__text">
            <p>
              Design director with 12+ years leading teams that create user-centered experiences
              that drive business impact.
            </p>
            <p>
              Specialized in enterprise products, design systems, and customer research.
              I believe great design starts with deep empathy for users and ends with measurable outcomes.
            </p>
            <h2 className="about-page__subheading">Approach</h2>
            <p>
              My work is guided by three principles: customer obsession, cross-functional collaboration,
              and data-driven decision making. Every project begins with understanding the problem deeply
              before jumping to solutions.
            </p>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
