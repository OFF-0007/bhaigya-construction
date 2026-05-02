'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <>
      <footer id="site-footer" role="contentinfo">
        <div className="footer-top container">
          <div className="footer-brand">
            <Link href="#home" className="logo" aria-label="Bhaigya Construction">
              <Image 
                src="/BGC.jpeg" 
                alt="Bhaigya Construction Logo" 
                width={150} 
                height={45} 
                priority
                style={{ height: '45px', width: 'auto', borderRadius: '4px' }} 
              />
            </Link>
            <p className="footer-tagline">Assam&apos;s Premier Construction Company. Building legacies across North East India since 2014.</p>
          </div>
          <div className="footer-links">
            <h4>Explore Bhaigya</h4>
            <ul>
              <li><Link href="#about">About Us</Link></li>
              <li><Link href="#services">Service Packages</Link></li>
              <li><Link href="#portfolio">Portfolio</Link></li>
              <li><Link href="#contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-links">
            <h4>Expert Services</h4>
            <ul>
              <li><Link href="#services">Ultra Luxury Construction</Link></li>
              <li><Link href="#services">Luxury Class Finishing</Link></li>
              <li><Link href="#services">A Class Construction</Link></li>
              <li><Link href="#services">Commercial Projects</Link></li>
            </ul>
          </div>
          <div className="footer-contact">
            <h4>Direct Contact</h4>
            <p>Ground Floor, PRAG MAHAL RESIDENCY, opp. Durga mandir, Bhetapara Chariali, Bhetapara, Guwahati, Assam 781038<br /></p>
            <a href="tel:+919678279817">+91 96782 79817</a>
            <a href="mailto:bhaigyaconstruction@gmail.com">bhaigyaconstruction@gmail.com</a>
            <div className="footer-social">
              <a href="https://wa.me/919678279817" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
              </a>
              <a href="https://www.facebook.com/p/Bhaigya-construction-61563510370827/" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24h11.495v-9.294H9.691v-3.622h3.129V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z"/></svg>
              </a>
              <a href="https://www.instagram.com/bhaigya_construction" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
              <a href="https://www.threads.net/@bhaigya_construction" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="Threads">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10c2.4 0 4.6-.84 6.32-2.24l-1.4-1.4C15.4 19.5 13.8 20 12 20c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8v1.5c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5V12c0-2.757-2.243-5-5-5s-5 2.243-5 5 2.243 5 5 5c1.236 0 2.371-.461 3.235-1.218A3.491 3.491 0 0 0 20.5 13.5V12c0-4.694-3.806-8.5-8.5-8.5zm0 13c-1.654 0-3-1.346-3-3s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3z"/></svg>
              </a>
              <a href="https://www.youtube.com/@Bhaigyaconstruction" className="social-link" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-locations-row container" style={{ marginTop: '2rem', paddingTop: '2rem', paddingBottom: '1rem', borderTop: '1px solid rgba(255, 255, 255, 0.05)' }}>
          <h4 style={{ color: 'var(--gold)', marginBottom: '1.5rem', fontSize: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>Service Areas & Locations Across Assam</h4>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {/* Upper Assam */}
            <div>
              <h5 style={{ color: '#fff', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.9 }}>Upper Assam</h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 8px' }}>
                {['Charaideo', 'Charaideo Maidam', 'Dilighat', 'Sivasagar Tank', 'Borhat Bazar', 'Borpatra Pukhuri', 'Namrup', 'Dhemaji', 'Gerukamukh', 'Malini Than', 'Simen Chapori', 'Jiadhal River', 'Bordoloni', 'Poba Reserve', 'Akashi Ganga', 'Dibrugarh', 'Bogibeel Bridge', 'Jeypore Rainforest', 'Jokai Botanical', 'Namphake', 'Dinjoy Satra', 'Chabua', 'Dehing Patkai', 'Mancotta', 'Golaghat', 'Kaziranga', 'Garampani', 'Deopahar', 'Nambor', 'Kakochang', 'Negheriting', 'Numaligarh', 'Dhansiri', 'Jorhat', 'Majuli', 'Tocklai', 'Hoollongapar', 'Dhekiakhowa', 'Nimati Ghat', 'Auniati Satra', 'Kamalabari Satra', 'Sivasagar', 'Rang Ghar', 'Talatal Ghar', 'Kareng Ghar', 'Sivadol', 'Joysagar', 'Tinsukia', 'Dibru-Saikhowa', 'Digboi', 'Margherita', 'Dhola-Sadiya'].map(city => (
                  <Link key={city} href={`/locations/${city.toLowerCase().replace(/ /g, '-')}`} style={{ color: 'var(--grey-light)', fontSize: '0.75rem', textDecoration: 'none', transition: 'color 0.3s ease', opacity: 0.7 }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--grey-light)')}>{city}</Link>
                ))}
              </div>
            </div>

            {/* North Assam */}
            <div>
              <h5 style={{ color: '#fff', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.9 }}>North Assam</h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 8px' }}>
                {['Biswanath', 'Biswanath Ghat', 'Monabarie', 'Nagsankar', 'Maa Kalyani', 'Gangmau Than', 'Borgang', 'Darrang', 'Orang National Park', 'Patharughat', 'Mangaldai', 'Khoirabari', 'Bhergaon', 'Sonitpur', 'Agnigarh', 'Mahabhairav', 'Chitralekha Udyan', 'Da-Parbatia', 'Bamuni Hills', 'Nameri', 'Bhalukpung', 'Kalia Bhomora', 'Tezpur', 'Udalguri', 'Bhairabkunda', 'Bornadi', 'Gethsemane'].map(city => (
                  <Link key={city} href={`/locations/${city.toLowerCase().replace(/ /g, '-')}`} style={{ color: 'var(--grey-light)', fontSize: '0.75rem', textDecoration: 'none', transition: 'color 0.3s ease', opacity: 0.7 }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--grey-light)')}>{city}</Link>
                ))}
              </div>
            </div>

            {/* Lower Assam */}
            <div>
              <h5 style={{ color: '#fff', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.9 }}>Lower Assam</h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 8px' }}>
                {['Bajali', 'Pathsala', 'Bhabanipur', 'Baksa', 'Mushalpur', 'Bogamati', 'Daragaon', 'Barpeta', 'Sundaridiya', 'Beki River', 'Bongaigaon', 'Kakoijana', 'Jogighopa', 'Abhayapuri', 'Chirang', 'Bijni', 'Dhubri', 'Asharikandi', 'Mahamaya Dham', 'Chakrashila', 'Goalpara', 'Sri Surya Pahar', 'Urpod Beel', 'Kamrup', 'Madan Kamdev', 'Hajo', 'Sualkuchi', 'Chhaygaon', 'Chandubi Lake', 'Deepor Beel', 'Guwahati', 'Kamakhya Temple', 'Umananda', 'Basistha', 'Kokrajhar', 'Gossaigaon', 'Raimona', 'Nalbari', 'Billeshwar', 'Daulashal', 'South Salmara-Mankachar', 'Mankachar', 'Tamulpur'].map(city => (
                  <Link key={city} href={`/locations/${city.toLowerCase().replace(/ /g, '-')}`} style={{ color: 'var(--grey-light)', fontSize: '0.75rem', textDecoration: 'none', transition: 'color 0.3s ease', opacity: 0.7 }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--grey-light)')}>{city}</Link>
                ))}
              </div>
            </div>

            {/* Central & Barak Valley */}
            <div>
              <h5 style={{ color: '#fff', fontSize: '0.85rem', marginBottom: '0.5rem', opacity: 0.9 }}>Central Assam & Barak Valley</h5>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 8px' }}>
                {['Hojai', 'Akashiganga', 'Lumding', 'Morigaon', 'Pobitora', 'Mayong', 'Jagiroad', 'Nagaon', 'Maha Mrityunjay Temple', 'Batadrawa', 'Laokhowa', 'Kaliabor', 'Karbi Anglong', 'Diphu', 'Taralangso', 'West Karbi Anglong', 'Panimur Falls', 'Hamren', 'Cachar', 'Silchar', 'Khaspur', 'Barak River', 'Dolu Lake', 'Dima Hasao', 'Haflong', 'Jatinga', 'Umrangso', 'Maibong', 'Hailakandi', 'Badarpur Fort', 'Karimganj', 'Sribhumi', 'Son Beel'].map(city => (
                  <Link key={city} href={`/locations/${city.toLowerCase().replace(/ /g, '-')}`} style={{ color: 'var(--grey-light)', fontSize: '0.75rem', textDecoration: 'none', transition: 'color 0.3s ease', opacity: 0.7 }} onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--gold)')} onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--grey-light)')}>{city}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom container">
          <p>© 2024 Bhaigya Construction. All rights reserved.</p>
        </div>
      </footer>

      {/* =========== FLOATING WHATSAPP =========== */}
      <a href="https://wa.me/919678279817?text=Hello%20Bhaigya%20Construction%2C%20I%20would%20like%20to%20enquire%20about%20your%20services." className="whatsapp-float" id="whatsapp-float" target="_blank" rel="noopener noreferrer" aria-label="Contact Bhaigya Construction on WhatsApp">
        <div className="wa-icon-wrap">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
        </div>
        <div className="wa-text">
          <span className="wa-title">Need Help?</span>
          <span className="wa-sub">Chat with us</span>
        </div>
      </a>

      {/* =========== BACK TO TOP =========== */}
      <button className="back-to-top" id="back-to-top" aria-label="Back to top">↑</button>
    </>
  );
}
