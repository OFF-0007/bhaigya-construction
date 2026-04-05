import Link from 'next/link';

export default function Footer() {
  return (
    <>
      <footer id="site-footer" role="contentinfo">
        <div className="footer-top container">
          <div className="footer-brand">
            <Link href="#home" className="logo" aria-label="Bhaigya Construction">
              <span className="logo-icon">⬡</span>
              <div className="logo-text">
                <span className="logo-name">BHAIGYA</span>
                <span className="logo-sub">CONSTRUCTION</span>
              </div>
            </Link>
            <p className="footer-tagline">Assam's Premier Construction Company. Building legacies across North East India since 2014.</p>
          </div>
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="#about">About Us</Link></li>
              <li><Link href="#services">Service Packages</Link></li>
              <li><Link href="#portfolio">Portfolio</Link></li>
              <li><Link href="#process">Our Process</Link></li>
              <li><Link href="#testimonials">Testimonials</Link></li>
              <li><Link href="#contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Services</h4>
            <ul>
              <li><Link href="#services">Ultra Luxury Construction</Link></li>
              <li><Link href="#services">Luxury Class Finishing</Link></li>
              <li><Link href="#services">A Class Construction</Link></li>
              <li><Link href="#services">Civil Works (B Class)</Link></li>
              <li><Link href="#services">Commercial Projects</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Contact</h4>
            <p>Near Lower Assam Hospital,<br />Bongaigaon, Assam — 783380</p>
            <a href="tel:+919678279817">+91 96782 79817</a>
            <a href="mailto:bhaigyaconstruction@gmail.com">bhaigyaconstruction@gmail.com</a>
            <div className="footer-social">
              <a href="https://wa.me/919678279817" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              </a>
            </div>
          </div>
        </div>
        <div className="footer-bottom container">
          <p>© 2024 Bhaigya Construction. All rights reserved. &nbsp;|&nbsp; GST Reg: Manikpur, Moukhowa, Bongaigaon</p>
          <p>Designed with ✦ for North East India's finest construction experience.</p>
        </div>
      </footer>

      {/* =========== FLOATING WHATSAPP =========== */}
      <a href="https://wa.me/919678279817?text=Hello%20Bhaigya%20Construction%2C%20I%20would%20like%20to%20enquire%20about%20your%20services." className="whatsapp-float" id="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Contact Bhaigya Construction on WhatsApp">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
        <span className="whatsapp-tooltip">Chat with us</span>
      </a>

      {/* =========== BACK TO TOP =========== */}
      <button className="back-to-top" id="back-to-top" aria-label="Back to top">↑</button>
    </>
  );
}
