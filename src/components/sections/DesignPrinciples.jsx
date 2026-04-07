import { useState } from 'react'
import './DesignPrinciples.css'

const principles = [
  {
    title: 'Start With the User',
    description: 'Not opinions. Not hierarchy. Not assumptions. Anchor decisions in real user problems and validated insight.',
    icon: '/images/principle-user.svg'
  },
  {
    title: 'Set the direction, or discover your north star',
    description: 'Work backward from vision then translate it into practical, focused steps. If the solution is ambiguous, then optimize for fast learning to figure out where you need to go.',
    icon: '/images/principle-team.svg'
  },
  {
    title: 'Measure What Matters',
    description: 'Output is easy. Impact is harder. Define success by meaningful outcomes, not shipped artifacts.',
    icon: '/images/principle-bolt.svg'
  },
  {
    title: '1% Better Every Day',
    description: 'Growth compounds through practice, and there is always something new to learn or skills to improve.',
    icon: '/images/principle-growth.svg'
  },
  {
    title: 'Design Is a Team Sport',
    description: 'Design thrives when cross-functions solve problems together - good ideas can come from anywhere, and early alignment replaces handoffs and silos.',
    icon: '/images/principle-star.svg'
  },
  {
    title: 'Resilience & Agency are Superpowers',
    description: 'Self directed teams supercharge what you can accomplish, and adjust more efficiently to change.',
    icon: '/images/principle-metrics.svg'
  }
]

const DesignPrinciples = () => {
  const [activeIndex, setActiveIndex] = useState(null)

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index)
  }

  return (
    <section className="design-principles">
      <div className="container">
        <div className="design-principles__list">
          {principles.map((principle, index) => (
            <div
              key={index}
              className={`design-principles__item ${activeIndex === index ? 'design-principles__item--active' : ''}`}
            >
              <button
                className="design-principles__header"
                onClick={() => handleToggle(index)}
                aria-expanded={activeIndex === index}
              >
                {principle.icon && (
                  <img
                    src={principle.icon}
                    alt=""
                    className="design-principles__icon"
                  />
                )}
                <span className="design-principles__title">{principle.title}</span>
                <svg
                  className={`design-principles__chevron ${activeIndex === index ? 'design-principles__chevron--open' : ''}`}
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
              <div
                className={`design-principles__content ${activeIndex === index ? 'design-principles__content--visible' : ''}`}
              >
                <p className="design-principles__description">{principle.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DesignPrinciples
