'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Attempt explicit play() — needed even with autoPlay on some browsers
    const tryPlay = () => {
      video.play().catch(() => {
        // Autoplay blocked (e.g. some Android browsers) — poster image (hero.jpeg) shows
      });
    };

    // Short delay to allow the DOM to settle before playing
    const timer = setTimeout(tryPlay, 300);

    // iOS Safari: resume after first user touch (autoPlay alone isn't enough)
    const onTouch = () => {
      video.play().catch(() => {});
    };
    document.addEventListener('touchstart', onTouch, { once: true, passive: true });

    return () => {
      clearTimeout(timer);
      document.removeEventListener('touchstart', onTouch);
    };
  }, []);

  return (
    <section id="home" className="hero" aria-label="Hero Section">

      {/* Hero Video Background */}
      <div className="hero-video-wrap">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/hero.jpeg"
          className="hero-video"
          id="hero-video"
          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
        >
          <source src="/hero-video.mp4" type="video/mp4" />
          {/* Fallback poster shown if video is unsupported */}
        </video>
        {/* Gradient overlay */}
        <div className="hero-video-tint"></div>
      </div>

      {/* Static fallback bg (shown behind video while it loads) */}
      <div className="hero-bg-fallback" aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: -2 }}>
        <Image 
          src="/hero.jpeg"
          alt="Bhaigya Construction Luxury Background"
          fill
          priority
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
      </div>

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
          <span className="gold-text">Bhaigya Construction:</span> Premier Building Firm in Assam
        </h1>

        <p className="hero-sub">
          10+ Years of Meticulous Craftsmanship &nbsp;|&nbsp;
          50+ Projects Delivered &nbsp;|&nbsp;
          100+ Happy Clients
        </p>

        <div className="hero-actions">
          <a href="#contact"   className="btn-gold">Get a Free Consultation</a>
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