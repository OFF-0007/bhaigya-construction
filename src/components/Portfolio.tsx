export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio section" aria-labelledby="portfolio-heading">
      <div className="container">
        <div className="section-label reveal-up">Featured Works</div>
        <h2 id="portfolio-heading" className="section-title centered reveal-up">
          Our <span className="gold-text">Signature Projects</span>
        </h2>
        <p className="section-sub centered reveal-up">Crafted across Assam and North East India — each project a testament to uncompromising quality.</p>

        <div className="portfolio-grid">
          <div className="portfolio-item large reveal-up" id="portfolio-villa">
            <div className="portfolio-img" style={{ backgroundImage: "url('/portfolio_villa.png')" }} role="img" aria-label="Luxury Villa Project Guwahati Assam by Bhaigya Construction"></div>
            <div className="portfolio-overlay">
              <div className="portfolio-tag">ULTRA LUXURY</div>
              <h3 className="portfolio-title">Luxury Villa, Guwahati</h3>
              <p className="portfolio-sub">A magnificent luxury residence with bespoke premium finishes and end-to-end interior styling. The epitome of Assam's modern living.</p>
              <a href="#contact" className="portfolio-link">Enquire →</a>
            </div>
          </div>

          <div className="portfolio-item reveal-up" id="portfolio-office">
            <div className="portfolio-img" style={{ backgroundImage: "url('/portfolio_office.png')" }} role="img" aria-label="Commercial Office Building Construction Assam by Bhaigya Construction"></div>
            <div className="portfolio-overlay">
              <div className="portfolio-tag">LUXURY CLASS</div>
              <h3 className="portfolio-title">Commercial Office Complex</h3>
              <p className="portfolio-sub">Ultra-Luxury class commercial development in North East India's business corridor.</p>
              <a href="#contact" className="portfolio-link">Enquire →</a>
            </div>
          </div>

          <div className="portfolio-item reveal-up" id="portfolio-apartment">
            <div className="portfolio-img" style={{ backgroundImage: "url('/portfolio_apartment.png')" }} role="img" aria-label="Modern Apartment Complex A Class Construction Assam Bhaigya Construction"></div>
            <div className="portfolio-overlay">
              <div className="portfolio-tag">A CLASS</div>
              <h3 className="portfolio-title">Modern Apartment Complex</h3>
              <p className="portfolio-sub">Urban efficiency meets premium finishing — a signature residential development.</p>
              <a href="#contact" className="portfolio-link">Enquire →</a>
            </div>
          </div>

          <div className="portfolio-item reveal-up" id="portfolio-farmhouse">
            <div className="portfolio-img" style={{ backgroundImage: "url('/portfolio_farmhouse.png')" }} role="img" aria-label="Modern Luxury Farmhouse Construction Guwahati Assam"></div>
            <div className="portfolio-overlay">
              <div className="portfolio-tag">ULTRA LUXURY</div>
              <h3 className="portfolio-title">Modern Farmhouse Retreat</h3>
              <p className="portfolio-sub">A bespoke countryside retreat blending modern design with natural elements of Assam.</p>
              <a href="#contact" className="portfolio-link">Enquire →</a>
            </div>
          </div>

          <div className="portfolio-item reveal-up" id="portfolio-institutional">
            <div className="portfolio-img portfolio-img-placeholder" role="img" aria-label="Institutional Educational Building Construction North East India Bhaigya Construction">
              <div className="portfolio-placeholder-icon">🏫</div>
            </div>
            <div className="portfolio-overlay">
              <div className="portfolio-tag">INSTITUTIONAL</div>
              <h3 className="portfolio-title">Educational Facility</h3>
              <p className="portfolio-sub">State-of-the-art academic infrastructure built to inspire and endure.</p>
              <a href="#contact" className="portfolio-link">Enquire →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
