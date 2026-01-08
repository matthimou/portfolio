import './ContactPage.css'

const ContactPage = () => {
  return (
    <div className="contact-page">
      <div className="container">
        <section className="contact-page__content">
          <h1 className="contact-page__heading">Get in Touch</h1>
          <p className="contact-page__intro">
            Interested in working together? I'd love to hear about your project.
          </p>
          <div className="contact-page__links">
            <a href="mailto:your.email@example.com" className="contact-page__link contact-page__link--primary">
              Email Me
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact-page__link">
              LinkedIn
            </a>
            <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="contact-page__link">
              Dribbble
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default ContactPage
