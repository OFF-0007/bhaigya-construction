export default function About() {
  return (
    <section id="about" className="about section" aria-labelledby="about-heading">
      <div className="container">
        <div className="section-label reveal-up">Who We Are</div>
        <div className="about-grid">
          <div className="about-text">
            <h2 id="about-heading" className="section-title reveal-up">
              A Decade of <span className="gold-text">Meticulous<br />Craftsmanship</span>
            </h2>
            <p className="about-body reveal-up">
              Founded in Bongaigaon, Assam, Bhaigya Construction has grown to become North East India's most trusted name in premium residential and commercial construction. Under the visionary leadership of <strong>Mofidul Rahman (CEO &amp; Director)</strong>, we have redefined construction standards across Assam.
            </p>
            <p className="about-body reveal-up">
              Our philosophy is simple: every project is a masterpiece. We combine cutting-edge engineering, globally sourced materials, and traditional craftsmanship to deliver structures that stand the test of time — on schedule, every time.
            </p>
            <div className="about-pillars reveal-up">
              <div className="pillar">
                <div className="pillar-icon">◈</div>
                <div>
                  <strong>On-Time Delivery</strong>
                  <p>Every project milestone met, guaranteed.</p>
                </div>
              </div>
              <div className="pillar">
                <div className="pillar-icon">◈</div>
                <div>
                  <strong>Premium Materials</strong>
                  <p>Global sourcing for lasting excellence.</p>
                </div>
              </div>
              <div className="pillar">
                <div className="pillar-icon">◈</div>
                <div>
                  <strong>Quality Assurance</strong>
                  <p>10-step monitoring on every build.</p>
                </div>
              </div>
              <div className="pillar">
                <div className="pillar-icon">◈</div>
                <div>
                  <strong>Final Handover Guarantee</strong>
                  <p>Complete satisfaction before handover.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="about-visual reveal-right">
            <div className="about-card-stack">
              <div className="about-card-img" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1589939705384-5185137a7f0f?q=80&w=2670&auto=format&fit=crop')" }} role="img" aria-label="Luxury Villa Construction Guwahati Assam"></div>
              <div className="about-badge-card">
                <span className="badge-num">10+</span>
                <span className="badge-label">Years of<br />Excellence</span>
              </div>
              <div className="about-cert-badge">
                <span>✦</span> ISO Certified Quality
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
