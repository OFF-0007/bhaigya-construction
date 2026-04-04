export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials section dark-section" aria-labelledby="testimonials-heading">
      <div className="container">
        <div className="section-label reveal-up">Client Stories</div>
        <h2 id="testimonials-heading" className="section-title centered reveal-up">
          What Our <span className="gold-text">Clients Say</span>
        </h2>
        <p className="section-sub centered reveal-up">The trust of 100+ families and businesses across Assam is our greatest achievement.</p>

        <div className="testimonials-grid">

          <div className="testimonial-card reveal-up" id="testimonial-1">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">Bhaigya Construction transformed my vision into an extraordinary reality. The attention to detail, premium materials, and the team's professionalism were truly unmatched. Our Guwahati villa is exactly what we dreamed of — delivered ahead of schedule!</p>
            <div className="testimonial-author">
              <div className="author-avatar" aria-hidden="true">RS</div>
              <div>
                <strong className="author-name">R. Rajesh Sharma</strong>
                <span className="author-role">Homeowner, Guwahati</span>
              </div>
              <div className="star-rating" aria-label="5 out of 5 stars">★★★★★</div>
            </div>
          </div>

          <div className="testimonial-card reveal-up" id="testimonial-2">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">As a business owner, I needed a construction partner I could trust completely. Bhaigya Construction delivered our commercial space on time, within budget, and with finishes that genuinely impressed our clients. An absolute pleasure to work with.</p>
            <div className="testimonial-author">
              <div className="author-avatar" aria-hidden="true">PD</div>
              <div>
                <strong className="author-name">Priya Das</strong>
                <span className="author-role">Business Owner, Bongaigaon</span>
              </div>
              <div className="star-rating" aria-label="5 out of 5 stars">★★★★★</div>
            </div>
          </div>

          <div className="testimonial-card reveal-up" id="testimonial-3">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">I've worked with many contractors across North East India, but Bhaigya Construction stands in a class of their own. Their Ultra Luxury package is genuinely world-class. The quality assurance process gave me complete confidence throughout the project.</p>
            <div className="testimonial-author">
              <div className="author-avatar" aria-hidden="true">AB</div>
              <div>
                <strong className="author-name">Amit Borah</strong>
                <span className="author-role">Property Developer, Dibrugarh</span>
              </div>
              <div className="star-rating" aria-label="5 out of 5 stars">★★★★★</div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
