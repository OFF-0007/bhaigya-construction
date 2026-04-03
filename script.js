/* ============================================================
   BHAIGYA CONSTRUCTION — JavaScript
   Features: Sticky Header, Parallax, Scroll Reveal,
             Counter Animation, Mobile Nav, Form Handler,
             Back To Top, Active Nav Link Highlight
   ============================================================ */

(function () {
  'use strict';

  /* -------- CACHED ELEMENTS -------- */
  const header      = document.getElementById('main-header');
  const navToggle   = document.getElementById('nav-toggle');
  const mainNav     = document.getElementById('main-nav');
  const heroVideo   = document.getElementById('hero-video');
  const backToTop   = document.getElementById('back-to-top');
  const contactForm = document.getElementById('contact-form');
  const statNums    = document.querySelectorAll('.stat-num');
  const reveals     = document.querySelectorAll('.reveal-up, .reveal-right');
  const navLinks    = document.querySelectorAll('#main-nav a');
  const sections    = document.querySelectorAll('section[id]');

  /* -------- STICKY HEADER -------- */
  function handleHeaderScroll() {
    if (window.scrollY > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  /* -------- VIDEO BACKGROUND MANAGEMENT -------- */
  function initHeroVideo() {
    if (!heroVideo) return;

    // Attempt autoplay; on failure, unmute and show poster
    const playPromise = heroVideo.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Browsers that block autoplay — video stays on poster
        heroVideo.load();
      });
    }

    // Pause video when scrolled well past hero (saves CPU)
    const heroSection = document.getElementById('home');
    if ('IntersectionObserver' in window && heroSection) {
      const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            heroVideo.play().catch(() => {});
          } else {
            heroVideo.pause();
          }
        });
      }, { threshold: 0.1 });
      videoObserver.observe(heroSection);
    }

    // Re-trigger autoplay on first user interaction (iOS Safari)
    const resumeVideo = () => {
      heroVideo.play().catch(() => {});
      document.removeEventListener('touchstart', resumeVideo);
      document.removeEventListener('click', resumeVideo);
    };
    document.addEventListener('touchstart', resumeVideo, { once: true, passive: true });
    document.addEventListener('click', resumeVideo, { once: true });
  }

  /* -------- BACK TO TOP -------- */
  function handleBackToTop() {
    if (window.scrollY > 500) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop && backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* -------- MOBILE NAV TOGGLE -------- */
  navToggle && navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.classList.toggle('open', isOpen);   // ← hamburger→X animation
    navToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close nav on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle && navToggle.classList.remove('open');
      navToggle && navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* -------- ACTIVE NAV LINK -------- */
  function updateActiveNavLink() {
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.style.color = '';
      const href = link.getAttribute('href');
      if (href === `#${currentSection}`) {
        link.style.color = 'var(--gold)';
      }
    });
  }

  /* -------- SCROLL REVEAL -------- */
  let revealObserver;
  if ('IntersectionObserver' in window) {
    revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${(i % 5) * 0.07}s`;
      revealObserver.observe(el);
    });
  } else {
    // Fallback: show all
    reveals.forEach(el => el.classList.add('revealed'));
  }

  /* -------- COUNTER ANIMATION -------- */
  let countersStarted = false;

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 1800;
    const step = 16;
    const increment = target / (duration / step);
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        el.textContent = target;
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, step);
  }

  function startCountersIfVisible() {
    if (countersStarted) return;
    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;
    const rect = heroStats.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      countersStarted = true;
      statNums.forEach(el => animateCounter(el));
    }
  }

  /* -------- SCROLL HANDLER (throttled) -------- */
  let scrollTicking = false;
  function onScroll() {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        handleHeaderScroll();
        handleBackToTop();
        updateActiveNavLink();
        startCountersIfVisible();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });

  /* -------- CONTACT FORM HANDLER -------- */
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('#form-submit');
      const name    = contactForm.querySelector('#name').value.trim();
      const phone   = contactForm.querySelector('#phone').value.trim();
      const email   = contactForm.querySelector('#email').value.trim();
      const service = contactForm.querySelector('#service').value;
      const message = contactForm.querySelector('#message').value.trim();

      if (!name || !phone || !email || !service) {
        showFormError('Please fill in all required fields.');
        return;
      }

      if (!isValidEmail(email)) {
        showFormError('Please enter a valid email address.');
        return;
      }

      btn.textContent = 'Sending…';
      btn.disabled = true;

      // Build WhatsApp URL as fallback / primary channel
      const waMessage = encodeURIComponent(
        `Hello Bhaigya Construction!\n\nNew Quote Request from your website:\n\n` +
        `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nService: ${service}\n` +
        (message ? `Message: ${message}` : '')
      );

      // Simulate processing
      await delay(600);

      btn.textContent = 'Send Request →';
      btn.disabled = false;

      // Show success and open WhatsApp
      const formWrap = contactForm.closest('.contact-form-wrap');
      formWrap.innerHTML = `
        <div class="form-success">
          <div style="font-size:3rem;margin-bottom:16px;">✅</div>
          <h3>Request Received!</h3>
          <p>Thank you, <strong style="color:var(--gold)">${name}</strong>. We'll contact you within 24 hours.</p>
          <br />
          <a href="https://wa.me/919678279817?text=${waMessage}" target="_blank" rel="noopener noreferrer" class="btn-gold" style="margin-top:8px;">
            Continue on WhatsApp →
          </a>
        </div>
      `;
    });
  }

  function showFormError(msg) {
    const existing = document.querySelector('.form-error-msg');
    if (existing) existing.remove();
    const err = document.createElement('p');
    err.className = 'form-error-msg';
    err.style.cssText = 'color:#ff6b6b;font-size:0.82rem;padding:10px 0;text-align:center;';
    err.textContent = msg;
    contactForm.appendChild(err);
    setTimeout(() => err.remove(), 4000);
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  /* -------- SMOOTH SCROLL FOR ANCHOR LINKS -------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const headerH = parseInt(
          getComputedStyle(document.documentElement).getPropertyValue('--header-h'),
          10
        ) || 80;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* -------- INIT -------- */
  handleHeaderScroll();
  handleBackToTop();
  updateActiveNavLink();
  startCountersIfVisible();
  initHeroVideo();

  /* -------- PORTFOLIO ITEM HOVER (touch fallback) -------- */
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  portfolioItems.forEach(item => {
    item.addEventListener('touchstart', () => {
      item.querySelector('.portfolio-overlay').style.opacity = '1';
    }, { passive: true });
    item.addEventListener('touchend', () => {
      setTimeout(() => {
        if (item.querySelector('.portfolio-overlay')) {
          item.querySelector('.portfolio-overlay').style.opacity = '0';
        }
      }, 2000);
    }, { passive: true });
  });

})();
