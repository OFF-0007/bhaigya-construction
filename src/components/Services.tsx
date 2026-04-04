export default function Services() {
  return (
    <section id="services" className="services section dark-section" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-label reveal-up">What We Build</div>
        <h2 id="services-heading" className="section-title centered reveal-up">
          Our <span className="gold-text">Service Packages</span>
        </h2>
        <p className="section-sub centered reveal-up">Four distinct construction tiers — each engineered for a different vision of excellence.</p>

        <div className="services-grid">
          <div className="service-card reveal-up" id="service-a-class">
            <div className="service-tier">A CLASS</div>
            <div className="service-icon">🏠</div>
            <h3 className="service-name">Standard Excellence</h3>
            <p className="service-desc">Solid construction with quality materials — perfect for value-conscious homeowners who refuse to compromise on standards.</p>
            <ul className="service-features">
              <li><span className="feat-check">✦</span> Standard Electrical &amp; Plumbing Systems</li>
              <li><span className="feat-check">✦</span> Premium Paint Finishes</li>
              <li><span className="feat-check">✦</span> Tiles up to ₹50 / sq.ft</li>
              <li><span className="feat-check">✦</span> Partial False Ceiling (Living Room)</li>
              <li><span className="feat-check">✦</span> Quality Sanitary Fixtures</li>
              <li><span className="feat-check">✦</span> Structural Warranty</li>
            </ul>
            <a href="#contact" className="service-cta">Get Quote →</a>
          </div>

          <div className="service-card featured reveal-up" id="service-luxury">
            <div className="service-badge-top">Most Popular</div>
            <div className="service-tier">LUXURY CLASS</div>
            <div className="service-icon">🏛️</div>
            <h3 className="service-name">Premium Finishes</h3>
            <p className="service-desc">Elevated interiors with luxury finishes — a harmonious blend of comfort, aesthetics, and sophistication.</p>
            <ul className="service-features">
              <li><span className="feat-check">✦</span> Premium Electrical &amp; Plumbing</li>
              <li><span className="feat-check">✦</span> Luxury Paint (Asian Paints / Berger)</li>
              <li><span className="feat-check">✦</span> Tiles up to ₹65 / sq.ft</li>
              <li><span className="feat-check">✦</span> Full False Ceiling (Drawing &amp; Master)</li>
              <li><span className="feat-check">✦</span> Premium Sanitary &amp; CP Fittings</li>
              <li><span className="feat-check">✦</span> Modular Kitchen Provision</li>
            </ul>
            <a href="#contact" className="service-cta gold-cta">Get Quote →</a>
          </div>

          <div className="service-card reveal-up" id="service-ultra-luxury">
            <div className="service-tier">ULTRA LUXURY</div>
            <div className="service-icon">💎</div>
            <h3 className="service-name">Bespoke High-End</h3>
            <p className="service-desc">A completely bespoke experience — globally sourced materials, end-to-end interior styling, and uncompromising attention to every detail.</p>
            <ul className="service-features">
              <li><span className="feat-check">✦</span> Bespoke High-End Finishes</li>
              <li><span className="feat-check">✦</span> Global Material Sourcing</li>
              <li><span className="feat-check">✦</span> End-to-End Interior Styling</li>
              <li><span className="feat-check">✦</span> Smart Home Integration</li>
              <li><span className="feat-check">✦</span> Dedicated Project Manager</li>
              <li><span className="feat-check">✦</span> Lifetime Structural Support</li>
            </ul>
            <a href="#contact" className="service-cta">Get Quote →</a>
          </div>

          <div className="service-card reveal-up" id="service-b-class">
            <div className="service-tier">B CLASS</div>
            <div className="service-icon">🏗️</div>
            <h3 className="service-name">Core Civil Work</h3>
            <p className="service-desc">Structural excellence without compromise — robust civil engineering forming the backbone of every great build.</p>
            <ul className="service-features">
              <li><span className="feat-check">✦</span> Foundation &amp; Structural Work</li>
              <li><span className="feat-check">✦</span> RCC Framework &amp; Slab</li>
              <li><span className="feat-check">✦</span> Brick &amp; Block Masonry</li>
              <li><span className="feat-check">✦</span> Waterproofing Treatment</li>
              <li><span className="feat-check">✦</span> Plastering &amp; Pointing</li>
              <li><span className="feat-check">✦</span> BIS Certified Materials</li>
            </ul>
            <a href="#contact" className="service-cta">Get Quote →</a>
          </div>
        </div>
      </div>
    </section>
  );
}
