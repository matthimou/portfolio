import { Link } from 'react-router-dom'
import Hero from '../components/sections/Hero'
import { caseStudies } from '../data/caseStudies'
import './HomePage.css'

const HomePage = () => {
  return (
    <div className="home-page">
      <Hero name="Matthew Hanson" title="Design Director" />

      {/* Featured Work Section */}
      <section className="home-work">
        <div className="container">
          <div className="home-work__header">
            <h2 className="home-work__heading">Featured Work</h2>
            <Link to="/work" className="home-work__view-all">
              View All Projects →
            </Link>
          </div>

          <div className="home-work__grid">
            {caseStudies.map((project) => (
              <Link
                key={project.id}
                to={`/work/${project.id}`}
                className="home-work__card"
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
    </div>
  )
}

export default HomePage
