'use client';

const partners = [
  { 
    name: 'Tata Tiscon', 
    type: 'Premium Steel', 
    logo: (
      <svg viewBox="0 0 100 40" className="brand-svg">
        <text x="0" y="30" fontStyle="italic" fontWeight="900" fontSize="24" fill="#004a99">TATA</text>
        <text x="60" y="30" fontWeight="400" fontSize="18" fill="#555">TISCON</text>
        <path d="M0 35 H100" stroke="#f26522" strokeWidth="2" />
      </svg>
    )
  },
  { 
    name: 'UltraTech', 
    type: 'The Engineer\'s Choice', 
    logo: (
      <svg viewBox="0 0 100 40" className="brand-svg">
        <rect width="100" height="40" fill="#000" rx="4" />
        <text x="50" y="27" textAnchor="middle" fontWeight="900" fontSize="16" fill="#ffcc00">UltraTech</text>
      </svg>
    )
  },
  { 
    name: 'Asian Paints', 
    type: 'Premium Finishes', 
    logo: (
      <svg viewBox="0 0 100 40" className="brand-svg">
        <path d="M10 10 Q30 5, 50 20 T90 30" stroke="#e31e24" strokeWidth="4" fill="none" />
        <text x="50" y="35" textAnchor="middle" fontWeight="700" fontSize="14" fill="#333">asianpaints</text>
      </svg>
    )
  },
  { 
    name: 'Shyam Steel', 
    type: 'High Strength TMT', 
    logo: (
      <svg viewBox="0 0 100 40" className="brand-svg">
        <text x="0" y="25" fontWeight="900" fontSize="18" fill="#ed1c24">SHYAM</text>
        <text x="0" y="38" fontWeight="400" fontSize="12" fill="#004a99" letterSpacing="2">STEEL</text>
      </svg>
    )
  },
  { 
    name: 'Star Cement', 
    type: 'North East\'s Own', 
    logo: (
      <svg viewBox="0 0 100 40" className="brand-svg">
        <path d="M50 5 L60 15 H40 Z" fill="#f7941d" />
        <text x="50" y="32" textAnchor="middle" fontWeight="900" fontSize="18" fill="#ed1c24">STAR</text>
        <text x="50" y="39" textAnchor="middle" fontSize="8" fill="#555">CEMENT</text>
      </svg>
    )
  },
  { 
    name: 'Berger', 
    type: 'Protective Coatings', 
    logo: (
      <svg viewBox="0 0 100 40" className="brand-svg">
        <text x="50" y="25" textAnchor="middle" fontWeight="800" fontSize="22" fill="#0072bc">Berger</text>
        <rect x="10" y="28" width="80" height="2" fill="#ed1c24" />
      </svg>
    )
  }
];

export default function Partners() {
  return (
    <section className="partners-section section dark-section">
      <div className="container">
        <div className="section-header centered">
          <span className="section-subtitle">Global Standards</span>
          <h2 className="section-title">Powerhouse <span className="gold-text">Partners</span></h2>
          <p className="section-sub">We build with the strongest materials from India&apos;s leading manufacturers.</p>
        </div>

        <div className="partners-grid">
          {partners.map((partner) => (
            <div key={partner.name} className="partner-card reveal-up">
              <div className="partner-logo-wrapper">
                <div className="partner-logo-box">
                  {partner.logo}
                </div>
                <div className="partner-glow"></div>
              </div>
              <span className="partner-hover-name">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .partners-section {
          padding: 80px 0;
          background-color: var(--black);
        }

        .partners-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 40px;
          margin-top: 4rem;
        }

        .partner-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
          cursor: pointer;
        }

        .partner-logo-wrapper {
          position: relative;
          width: 120px;
          height: 120px;
        }

        .partner-logo-box {
          width: 100%;
          height: 100%;
          background: white;
          border-radius: 50%;
          padding: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
          transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          filter: grayscale(100%);
          opacity: 0.8;
          border: 2px solid rgba(197, 160, 89, 0.1);
        }

        .partner-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          background: var(--gold);
          border-radius: 50%;
          filter: blur(35px);
          opacity: 0;
          transition: opacity 0.5s ease;
          z-index: 1;
        }

        .partner-hover-name {
          font-family: var(--font-sans);
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          color: var(--gold);
          font-weight: 700;
          opacity: 0;
          transform: translateY(5px);
          transition: all 0.4s ease;
        }

        /* Hover States */
        .partner-card:hover .partner-logo-box {
          filter: grayscale(0%);
          opacity: 1;
          transform: scale(1.15) rotate(5deg);
          border-color: var(--gold);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.6);
        }

        .partner-card:hover .partner-glow {
          opacity: 0.3;
        }

        .partner-card:hover .partner-hover-name {
          opacity: 1;
          transform: translateY(0);
        }

        .brand-svg {
          width: 100%;
          height: auto;
        }

        @media (max-width: 768px) {
          .partners-grid {
            gap: 25px;
          }
          .partner-logo-wrapper {
            width: 90px;
            height: 90px;
          }
          .partner-logo-box {
            padding: 18px;
          }
        }
      `}</style>
    </section>
  );
}

