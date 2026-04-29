'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Wait for page to be fully interactive, then start the video
    // This maintains the "preload=none" performance benefit
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(err => {
          console.log("Video autoplay prevented or failed:", err);
        });
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="home" className="hero" aria-label="Hero Section">

      {/* Optimized Hero Video Background */}
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          poster="/hero.jpeg"
          className="hero-video"
          id="hero-video"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          {/* Fallback to static image if video isn't supported */}
        </video>
        {/* Gradient overlay */}
        <div className="hero-video-tint"></div>
      </div>

      {/* Fallback static bg */}
      <div className="hero-bg-fallback" aria-hidden="true"></div>

      {/* Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="hero-content container">
        <div className="hero-badge">
          <span className="gold-dot"></span>
          Assam&apos;s Premier Construction Company
          <span className="gold-dot"></span>
        </div>

        <h1 className="hero-title">
          Building the <span className="gold-text">Future of North East India</span>
        </h1>

        <p className="hero-sub">
          10+ Years of Meticulous Craftsmanship &nbsp;|&nbsp;
          50+ Projects Delivered &nbsp;|&nbsp;
          100+ Happy Clients
        </p>

        <div className="hero-actions">
          <a href="#contact" className="btn-gold">Get a Free Consultation</a>
          <a href="#portfolio" className="btn-outline">View Our Work</a>
        </div>

        <div className="hero-stats">
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