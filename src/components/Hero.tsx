export default function Hero() {
  return (
    <section id="home" className="hero" aria-label="Hero Section">
      {/* Hero Video Background */}
      <div className="hero-video-wrap" id="hero-video-wrap">
        <video
          id="hero-video"
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/hero_bg.png"
          aria-hidden="true"
        >
          {/* Primary: construction / luxury architecture timelapse */}
          <source src="https://videos.pexels.com/video-files/1409899/1409899-hd_1920_1080_25fps.mp4" type="video/mp4" />
          {/* Fallback source */}
          <source src="https://videos.pexels.com/video-files/1370970/1370970-hd_1280_720_30fps.mp4" type="video/mp4" />
        </video>
        {/* Gradient overlays for text legibility */}
        <div className="hero-video-tint"></div>
      </div>
      {/* Fallback static bg (mobile / no-video) */}
      <div className="hero-bg-fallback" aria-hidden="true"></div>
      <div className="hero-overlay"></div>
      <div className="hero-content container">
        <div className="hero-badge reveal-up">
          <span className="gold-dot"></span>
          Assam's Premier Construction Company
          <span className="gold-dot"></span>
        </div>
        <h1 className="hero-title reveal-up">
          Building the<br />
          <span className="gold-text">Future of North<br />East India</span>
        </h1>
        <p className="hero-sub reveal-up">
          10+ Years of Meticulous Craftsmanship &nbsp;|&nbsp; 50+ Projects Delivered &nbsp;|&nbsp; 100+ Happy Clients
        </p>
        <div className="hero-actions reveal-up">
          <a href="#contact" className="btn-gold" id="hero-cta-primary">Get a Free Consultation</a>
          <a href="#portfolio" className="btn-outline" id="hero-cta-secondary">View Our Work</a>
        </div>
        <div className="hero-stats reveal-up">
          <div className="stat">
            <span className="stat-num" data-target="10">0</span><span className="stat-plus">+</span>
            <span className="stat-label">Years Experience</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-num" data-target="50">0</span><span className="stat-plus">+</span>
            <span className="stat-label">Projects Completed</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-num" data-target="100">0</span><span className="stat-plus">+</span>
            <span className="stat-label">Happy Clients</span>
          </div>
        </div>
      </div>
      <div className="hero-scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-line"></div>
      </div>
    </section>
  );
}
