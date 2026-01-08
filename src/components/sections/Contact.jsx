import './Contact.css'

const Contact = () => {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <h2 className="contact__heading">Get in Touch</h2>
        <p className="contact__content">
          Contact information and links will go here.
        </p>
        <div className="contact__links">
          <a href="mailto:your.email@example.com" className="contact__link">
            Email
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="contact__link">
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}

export default Contact
