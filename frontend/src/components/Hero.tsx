export default function Hero() {
  return (
    <section id="home" className="hero" aria-label="Hero Section">

      {/* Hero Video Background (YouTube) */}
      <div className="hero-video-wrap" id="hero-video-wrap">
        <iframe
          id="hero-video"
          className="hero-video"
          src="https://www.youtube-nocookie.com/embed/4jXpElp8MsM?autoplay=1&mute=1&loop=1&playlist=4jXpElp8MsM&controls=0&modestbranding=1&rel=0&enablejsapi=1"
          title="Hero Background Video"
          frameBorder="0"
          allow="autoplay; fullscreen"
        ></iframe>
        {/* Gradient overlay */}
        <div className="hero-video-tint"></div>
      </div>

      {/* Fallback static bg */}
      <div className="hero-bg-fallback" aria-hidden="true"></div>

      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="hero-content container">
        <div className="hero-badge reveal-up">
          <span className="gold-dot"></span>
          Assam&apos;s Premier Construction Company
          <span className="gold-dot"></span>
        </div>

        <h1 className="hero-title reveal-up">
          Building the<br />
          <span className="gold-text">
            Future of North<br />East India
          </span>
        </h1>

        <p className="hero-sub reveal-up">
          10+ Years of Meticulous Craftsmanship &nbsp;|&nbsp;
          50+ Projects Delivered &nbsp;|&nbsp;
          100+ Happy Clients
        </p>

        <div className="hero-actions reveal-up">
          <a href="#contact" className="btn-gold">Get a Free Consultation</a>
          <a href="#portfolio" className="btn-outline">View Our Work</a>
        </div>

        <div className="hero-stats reveal-up">
          <div className="stat">
            <span className="stat-num" data-target="10">10</span><span className="stat-plus">+</span>
            <span className="stat-label">Years Experience</span>
          </div>

          <div className="stat-divider"></div>

          <div className="stat">
            <span className="stat-num" data-target="50">50</span><span className="stat-plus">+</span>
            <span className="stat-label">Projects Completed</span>
          </div>

          <div className="stat-divider"></div>

          <div className="stat">
            <span className="stat-num" data-target="100">100</span><span className="stat-plus">+</span>
            <span className="stat-label">Happy Clients</span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}