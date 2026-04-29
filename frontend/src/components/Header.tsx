'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const getStyle = (path: string) => {
    return pathname === path ? { color: 'var(--gold)' } : undefined;
  };

  // Close drawer when route changes (Next.js client navigation)
  useEffect(() => {
    const nav = document.getElementById('main-nav');
    const btn = document.getElementById('nav-toggle');
    if (nav) nav.classList.remove('open');
    if (btn) {
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
    }
    document.body.style.overflow = '';
  }, [pathname]);

  // Forceful vanilla JS attachment to guarantee mobile responsiveness
  useEffect(() => {
    const btn = document.getElementById('nav-toggle');
    const nav = document.getElementById('main-nav');
    if (!btn || !nav) return;

    const toggleDrawer = (e: Event) => {
      e.preventDefault();
      e.stopPropagation();
      const isOpen = nav.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
      btn.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    };

    const closeDrawer = () => {
      nav.classList.remove('open');
      btn.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    // Attach to touch and click to ensure it fires on any device
    btn.addEventListener('touchstart', toggleDrawer, { passive: false });
    btn.addEventListener('click', toggleDrawer);

    // Also close drawer if clicking any link inside it
    const links = nav.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    return () => {
      btn.removeEventListener('touchstart', toggleDrawer);
      btn.removeEventListener('click', toggleDrawer);
      links.forEach(link => link.removeEventListener('click', closeDrawer));
    };
  }, []);

  return (
    <header id="main-header" role="banner">
      <div className="header-inner container">
        <a href="/#home" className="logo" aria-label="Bhaigya Construction Home">
          <img
            src="/BGC.jpeg"
            alt="Bhaigya Construction Logo"
            style={{ height: '45px', width: 'auto', borderRadius: '4px' }}
          />
        </a>

        <nav
          id="main-nav"
          role="navigation"
          aria-label="Main Navigation"
        >
          <ul>
            <li><a href="/about"    style={getStyle('/about')}>About</a></li>
            <li><a href="/#services">Services</a></li>
            <li><a href="/#portfolio">Portfolio</a></li>
            <li><a href="/#process">Process</a></li>
            <li><a href="/branches" style={getStyle('/branches')}>Branches</a></li>
            <li><a href="/contact"  style={getStyle('/contact')}>Contact</a></li>
          </ul>
        </nav>

        <a href="/contact" className="btn-header" id="header-cta">Request Quote</a>

        <button
          className="nav-toggle"
          id="nav-toggle"
          aria-label="Toggle Navigation"
          aria-expanded="false"
          style={{ position: 'relative', zIndex: 9999, pointerEvents: 'auto', cursor: 'pointer' }}
        >
          <span style={{ pointerEvents: 'none' }}></span>
          <span style={{ pointerEvents: 'none' }}></span>
          <span style={{ pointerEvents: 'none' }}></span>
        </button>
      </div>
    </header>
  );
}
