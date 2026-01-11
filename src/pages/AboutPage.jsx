import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import aboutContent from '../data/about.md?raw'
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
            <ReactMarkdown>{aboutContent}</ReactMarkdown>
          </div>
        </section>
      </div>
    </div>
  )
}

export default AboutPage
