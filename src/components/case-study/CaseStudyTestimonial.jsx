import './CaseStudyTestimonial.css'

const CaseStudyTestimonial = ({ testimonial }) => {
  if (!testimonial) return null

  return (
    <blockquote className="case-study-testimonial">
      <p className="case-study-testimonial__quote">"{testimonial.quote}"</p>
      <footer className="case-study-testimonial__footer">
        <cite className="case-study-testimonial__author">
          {testimonial.author}
        </cite>
        <span className="case-study-testimonial__role">{testimonial.role}</span>
      </footer>
    </blockquote>
  )
}

export default CaseStudyTestimonial
