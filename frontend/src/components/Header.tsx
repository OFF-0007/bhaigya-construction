'use client';

import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const getStyle = (path: string) => {
    return pathname === path ? { color: 'var(--gold)' } : undefined;
  };

  return (
    <header id="main-header" role="banner">
      <div className="header-inner container">
        <a href="/#home" className="logo" aria-label="Bhaigya Construction Home">
          <img src="/BGC.jpeg" alt="Bhaigya Construction Logo" style={{ height: '45px', width: 'auto', borderRadius: '4px' }} />
        </a>
        <nav id="main-nav" role="navigation" aria-label="Main Navigation">
          <ul>
            <li><a href="/about" style={getStyle('/about')}>About</a></li>
            <li><a href="/#services">Services</a></li>
            <li><a href="/#portfolio">Portfolio</a></li>
            <li><a href="/#process">Process</a></li>
            <li><a href="/branches" style={getStyle('/branches')}>Branches</a></li>
            <li><a href="/contact" style={getStyle('/contact')}>Contact</a></li>
          </ul>
        </nav>
        <a href="/contact" className="btn-header" id="header-cta">Request Quote</a>
        <button className="nav-toggle" id="nav-toggle" aria-label="Toggle Navigation" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
