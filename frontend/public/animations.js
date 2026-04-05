/* ============================================================
   BHAIGYA CONSTRUCTION — PREMIUM ANIMATIONS JS
   v2.0 | Cursor, Preloader, Particles, Tilt, Ripple, Magnetic
   ============================================================ */

(function () {
  'use strict';

  /* =============================================
     1. PAGE TRANSITION OVERLAY
     ============================================= */
  const transitionEl = document.createElement('div');
  transitionEl.className = 'page-transition';
  document.body.prepend(transitionEl);
  setTimeout(() => transitionEl.remove(), 1200);

  /* =============================================
     2. LUXURY PRELOADER
     ============================================= */
  const preloader = document.getElementById('preloader');
  const preloaderBar = document.querySelector('.preloader-bar');

  if (preloader && preloaderBar) {
    // Animate the loading bar
    requestAnimationFrame(() => {
      preloaderBar.style.width = '100%';
    });

    const hidePreloader = () => {
      preloader.classList.add('done');
      setTimeout(() => preloader.remove(), 900);
    };

    if (document.readyState === 'complete') {
      setTimeout(hidePreloader, 1800);
    } else {
      window.addEventListener('load', () => setTimeout(hidePreloader, 1800));
    }
  }

  /* =============================================
     3. CUSTOM LUXURY CURSOR
     ============================================= */
  const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;

  if (!isTouchDevice()) {
    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.className  = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mouseX = 0, mouseY = 0;
    let ringX = 0, ringY = 0;
    let rafId;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    }, { passive: true });

    // Ring follows with smooth lag
    function animateRing() {
      const ease = 0.12;
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;
      ring.style.transform = `translate(${ringX - 18}px, ${ringY - 18}px)`;
      rafId = requestAnimationFrame(animateRing);
    }
    animateRing();

    // Hide when leaving window
    document.addEventListener('mouseleave', () => {
      dot.style.opacity  = '0';
      ring.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity  = '1';
      ring.style.opacity = '1';
    });

    // Scale on clickable elements
    document.querySelectorAll('a, button, .service-card, .portfolio-item, .pillar').forEach(el => {
      el.addEventListener('mouseenter', () => {
        dot.style.transform  += ' scale(1.5)';
        ring.style.width  = '54px';
        ring.style.height = '54px';
        ring.style.borderColor = 'rgba(197,160,89,0.9)';
      });
      el.addEventListener('mouseleave', () => {
        ring.style.width  = '36px';
        ring.style.height = '36px';
        ring.style.borderColor = 'rgba(197,160,89,0.6)';
      });
    });
  }

  /* =============================================
     4. SCROLL PROGRESS BAR
     ============================================= */
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  document.body.prepend(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }, { passive: true });

  /* =============================================
     5. HERO GOLD PARTICLES (Canvas)
     ============================================= */
  function initParticles() {
    const heroSection = document.getElementById('home');
    if (!heroSection) return;

    const canvas = document.createElement('canvas');
    canvas.id = 'hero-particles';
    heroSection.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let particles = [];
    let W, H, animFrame;

    function resize() {
      W = canvas.width  = heroSection.offsetWidth;
      H = canvas.height = heroSection.offsetHeight;
    }

    class Particle {
      constructor() { this.reset(); }
      reset() {
        this.x    = Math.random() * W;
        this.y    = Math.random() * H;
        this.r    = Math.random() * 1.5 + 0.4;
        this.vy   = -(Math.random() * 0.4 + 0.15);
        this.vx   = (Math.random() - 0.5) * 0.3;
        this.life = 0;
        this.maxLife = Math.random() * 180 + 80;
        this.gold = `rgba(197,160,89,${(Math.random() * 0.5 + 0.2).toFixed(2)})`;
      }
      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.life++;
        if (this.life > this.maxLife || this.y < 0) this.reset();
      }
      draw() {
        const alpha = Math.sin((this.life / this.maxLife) * Math.PI);
        ctx.save();
        ctx.globalAlpha = alpha * 0.7;
        ctx.fillStyle   = this.gold;
        ctx.shadowColor = '#D4AF37';
        ctx.shadowBlur  = 6;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }

    function init() {
      resize();
      particles = Array.from({ length: 60 }, () => new Particle());
    }

    function animate() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => { p.update(); p.draw(); });
      animFrame = requestAnimationFrame(animate);
    }

    window.addEventListener('resize', resize, { passive: true });
    init();
    animate();

    // Pause when not in viewport
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) { animFrame = requestAnimationFrame(animate); }
          else { cancelAnimationFrame(animFrame); }
        });
      }, { threshold: 0.1 }).observe(heroSection);
    }
  }

  /* =============================================
     6. RIPPLE EFFECT ON BUTTONS
     ============================================= */
  function addRipple() {
    document.querySelectorAll('.btn-gold, .btn-outline, .service-cta, .btn-header').forEach(btn => {
      btn.addEventListener('click', function (e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = Math.max(rect.width, rect.height) * 1.5;

        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        ripple.style.cssText = `
          width:${size}px; height:${size}px;
          left:${x - size/2}px; top:${y - size/2}px;
        `;
        this.appendChild(ripple);
        setTimeout(() => ripple.remove(), 600);
      });
    });
  }

  /* =============================================
     7. 3D TILT ON SERVICE CARDS
     ============================================= */
  function addCardTilt() {
    document.querySelectorAll('.service-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width  / 2;
        const cy = rect.height / 2;
        const rotY =  ((x - cx) / cx) * 6;
        const rotX = -((y - cy) / cy) * 4;
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* =============================================
     8. MAGNETIC HOVER ON GOLD BUTTONS
     ============================================= */
  function addMagnetic() {
    document.querySelectorAll('.btn-gold, .btn-header').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width  / 2;
        const y = e.clientY - rect.top  - rect.height / 2;
        btn.style.transform = `translateX(${x * 0.18}px) translateY(${y * 0.18 - 3}px) scale(1.02)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
      });
    });
  }

  /* =============================================
     9. PORTFOLIO ITEM TILT
     ============================================= */
  function addPortfolioTilt() {
    document.querySelectorAll('.portfolio-item').forEach(item => {
      item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width  / 2;
        const cy = rect.height / 2;
        const rotY =  ((x - cx) / cx) * 3;
        const rotX = -((y - cy) / cy) * 2;
        item.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px) scale(1.01)`;
      });

      item.addEventListener('mouseleave', () => {
        item.style.transform = '';
      });
    });
  }

  /* =============================================
     10. PROCESS LINE REVEAL TRIGGER
     ============================================= */
  function initProcessLine() {
    const processLine = document.querySelector('.process-line');
    if (!processLine) return;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            processLine.classList.add('revealed');
          }
        });
      }, { threshold: 0.3 }).observe(processLine);
    }
  }

  /* =============================================
     11. TESTIMONIAL CARD TILT
     ============================================= */
  function addTestimonialTilt() {
    document.querySelectorAll('.testimonial-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width  / 2;
        const cy = rect.height / 2;
        const rotY =  ((x - cx) / cx) * 3;
        const rotX = -((y - cy) / cy) * 2;
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-6px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  /* =============================================
     12. SECTION COUNTERS WITH GLOW
     ============================================= */
  function enhanceCounters() {
    document.querySelectorAll('.stat').forEach(stat => {
      const numEl = stat.querySelector('.stat-num');
      if (!numEl) return;
      stat.addEventListener('mouseenter', () => {
        numEl.style.textShadow = '0 0 30px rgba(197,160,89,0.8)';
        numEl.style.transform  = 'scale(1.06)';
        numEl.style.transition = 'all 0.3s ease';
      });
      stat.addEventListener('mouseleave', () => {
        numEl.style.textShadow = '0 0 20px rgba(197,160,89,0.3)';
        numEl.style.transform  = 'scale(1)';
      });
    });
  }

  /* =============================================
     13. SMOOTH SECTION REVEAL WITH STAGGER
     ============================================= */
  function enhanceReveal() {
    const cards = document.querySelectorAll(
      '.service-card, .portfolio-item, .testimonial-card, .qa-item, .pillar'
    );

    if (!('IntersectionObserver' in window)) return;

    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const siblings = Array.from(entry.target.parentElement.children);
          const idx = siblings.indexOf(entry.target);
          entry.target.style.transitionDelay = `${idx * 0.07}s`;
          entry.target.classList.add('reveal-up', 'revealed');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    cards.forEach(card => {
      if (!card.classList.contains('reveal-up')) {
        card.classList.add('reveal-up');
        obs.observe(card);
      }
    });
  }

  /* =============================================
     14. CURSOR TRAIL SPARKLES
     ============================================= */
  function addCursorSparkles() {
    if (isTouchDevice()) return;

    let lastSparkle = 0;

    document.addEventListener('mousemove', (e) => {
      const now = Date.now();
      if (now - lastSparkle < 80) return;
      lastSparkle = now;

      const sparkle = document.createElement('div');
      sparkle.style.cssText = `
        position:fixed;
        left:${e.clientX}px;
        top:${e.clientY}px;
        width:4px; height:4px;
        background:rgba(197,160,89,0.6);
        border-radius:50%;
        pointer-events:none;
        z-index:99996;
        transform:translate(-50%,-50%);
        animation: sparkleOut 0.6s ease forwards;
      `;
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 650);
    }, { passive: true });

    // Inject sparkle keyframe once
    if (!document.getElementById('sparkle-style')) {
      const s = document.createElement('style');
      s.id = 'sparkle-style';
      s.textContent = `
        @keyframes sparkleOut {
          0%   { opacity:0.8; transform:translate(-50%,-50%) scale(1); }
          100% { opacity:0;   transform:translate(-50%,-50%) scale(0) translateY(-12px); }
        }
      `;
      document.head.appendChild(s);
    }
  }

  /* =============================================
     15. SCROLL-TRIGGERED GOLD GLOW ON SECTION LABELS
     ============================================= */
  function initLabelGlow() {
    if (!('IntersectionObserver' in window)) return;
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.textShadow = '0 0 12px rgba(197,160,89,0.5)';
          e.target.style.transition = 'text-shadow 0.6s ease';
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('.section-label').forEach(el => obs.observe(el));
  }

  /* =============================================
     INIT ALL
     ============================================= */
  function init() {
    initParticles();
    addRipple();
    addCardTilt();
    addMagnetic();
    addPortfolioTilt();
    addTestimonialTilt();
    initProcessLine();
    enhanceCounters();
    enhanceReveal();
    addCursorSparkles();
    initLabelGlow();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
