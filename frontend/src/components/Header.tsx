import Link from 'next/link';

export default function Header() {
  return (
    <header id="main-header" role="banner">
      <div className="header-inner container">
        <Link href="#home" className="logo" aria-label="Bhaigya Construction Home">
          <span className="logo-icon">⬡</span>
          <div className="logo-text">
            <span className="logo-name">BHAIGYA</span>
            <span className="logo-sub">CONSTRUCTION</span>
          </div>
        </Link>
        <nav id="main-nav" role="navigation" aria-label="Main Navigation">
          <ul>
            <li><Link href="#about">About</Link></li>
            <li><Link href="#services">Services</Link></li>
            <li><Link href="#portfolio">Portfolio</Link></li>
            <li><Link href="#process">Process</Link></li>
            <li><Link href="#testimonials">Testimonials</Link></li>
            <li><Link href="#contact">Contact</Link></li>
          </ul>
        </nav>
        <Link href="#contact" className="btn-header" id="header-cta">Request Quote</Link>
        <button className="nav-toggle" id="nav-toggle" aria-label="Toggle Navigation" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>
  );
}
