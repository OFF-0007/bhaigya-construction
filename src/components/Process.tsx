export default function Process() {
  return (
    <section id="process" className="process section" aria-labelledby="process-heading">
      <div className="container">
        <div className="section-label reveal-up">How We Work</div>
        <h2 id="process-heading" className="section-title centered reveal-up">
          Our <span className="gold-text">Proven Process</span>
        </h2>
        <p className="section-sub centered reveal-up">From first conversation to final keys — a seamless journey built on transparency.</p>

        <div className="process-timeline">
          <div className="process-line"></div>
          <div className="process-steps">

            <div className="process-step reveal-up" id="step-consultation">
              <div className="step-num">01</div>
              <div className="step-icon">💬</div>
              <h3 className="step-title">Consultation</h3>
              <p className="step-desc">We listen to your vision, assess requirements, and provide an honest feasibility assessment with budget guidance.</p>
            </div>

            <div className="process-step reveal-up" id="step-planning">
              <div className="step-num">02</div>
              <div className="step-icon">📐</div>
              <h3 className="step-title">Planning &amp; Design</h3>
              <p className="step-desc">Our architects craft detailed blueprints and 3D visualizations, ensuring every element aligns with your dream.</p>
            </div>

            <div className="process-step reveal-up" id="step-construction">
              <div className="step-num">03</div>
              <div className="step-icon">🏗️</div>
              <h3 className="step-title">Construction</h3>
              <p className="step-desc">Expert teams execute with precision under our 10-step quality assurance protocol. Regular updates keep you informed.</p>
            </div>

            <div className="process-step reveal-up" id="step-handover">
              <div className="step-num">04</div>
              <div className="step-icon">🔑</div>
              <h3 className="step-title">Final Handover</h3>
              <p className="step-desc">A thorough walk-through, punch-list completion, and ceremonial handover — with post-completion support.</p>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
