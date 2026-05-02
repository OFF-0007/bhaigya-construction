import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Luxury Class Construction Package | Bhaigya Construction',
  description: "Ultimate luxury construction specifications. Full modular kitchen, designer false ceilings, premium branded finishes and architectural perfection in Assam.",
  alternates: { canonical: '/services/luxury-class' },
};

// ── Components ──────────────────────────────────────────────

function Section({ title, children, id, bg }: { title: string; children: React.ReactNode; id: string, bg?: string }) {
  return (
    <section id={id} style={{ 
      padding: 'clamp(60px, 10vw, 100px) 0', 
      backgroundColor: bg || 'transparent',
      borderBottom: '1px solid rgba(197, 160, 89, 0.1)'
    }}>
      <div className="container">
        <div className="section-grid">
          <div className="section-title-box">
            <span className="category-tag">Category</span>
            <h2 className="section-h2">{title}</h2>
          </div>
          <div className="section-content">
            <div className="specs-list">
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Spec({ label, value, note }: { label: string; value: string; note?: string | React.ReactNode }) {
  return (
    <div className="spec-entry">
      <div className="spec-header">
        <span className="spec-label">{label}</span>
        <span className="spec-value">{value}</span>
      </div>
      {note && <div className="spec-note">{note}</div>}
    </div>
  );
}

function SubTitle({ text }: { text: string }) {
  return (
    <h3 className="sub-title-text">{text}</h3>
  );
}

// ── Main Page ───────────────────────────────────────────────

export default function LuxuryClassPage() {
  return (
    <>
      <style>{`
        body { background-color: #0c1211 !important; margin: 0; padding: 0; }
        
        .sticky-nav {
          position: sticky;
          top: var(--header-h);
          background: rgba(12, 18, 17, 0.95);
          backdrop-filter: blur(15px);
          z-index: 100;
          border-bottom: 1px solid rgba(197, 160, 89, 0.15);
        }
        
        .nav-inner {
          display: flex;
          gap: 30px;
          padding: 18px 0;
          overflow-x: auto;
          scrollbar-width: none;
          justify-content: center;
        }
        .nav-inner::-webkit-scrollbar { display: none; }
        
        .nav-inner a {
          color: #888;
          text-decoration: none;
          font-size: 0.7rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          transition: all 0.3s;
          white-space: nowrap;
        }
        .nav-inner a:hover { color: var(--gold); }

        .hero-section {
          padding: clamp(80px, 15vw, 160px) 0 clamp(40px, 10vw, 100px);
          background: linear-gradient(to bottom, #0a1412 0%, #0c1211 100%);
          position: relative;
          overflow: hidden;
        }
        
        .hero-bg-text {
          position: absolute;
          top: 50%;
          right: -5%;
          transform: translateY(-50%);
          font-size: clamp(8rem, 25vw, 30rem);
          font-weight: 900;
          color: rgba(255,255,255,0.015);
          pointer-events: none;
          line-height: 1;
          white-space: nowrap;
          z-index: 0;
        }

        .section-grid {
          display: grid;
          grid-template-columns: 1fr 1.8fr;
          gap: 60px;
        }

        section[id] {
          scroll-margin-top: calc(var(--header-h) + 60px);
        }

        .category-tag {
          color: var(--gold);
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.4em;
          text-transform: uppercase;
          display: block;
          margin-bottom: 12px;
        }

        .section-h2 {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 5vw, 4rem);
          font-weight: 300;
          color: var(--off-white);
          margin: 0;
          line-height: 1.1;
        }

        .specs-list {
          display: flex;
          flex-direction: column;
        }

        .spec-entry {
          margin-bottom: clamp(30px, 5vw, 45px);
        }

        .spec-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 20px;
          border-bottom: 1px solid rgba(255,255,255,0.05);
          padding-bottom: 12px;
          flex-wrap: wrap;
        }

        .spec-label {
          color: #777;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          padding-top: 4px;
          min-width: 120px;
        }

        .spec-value {
          color: var(--off-white);
          font-size: clamp(1rem, 2.5vw, 1.4rem);
          font-weight: 500;
          text-align: right;
          flex: 1;
          min-width: 200px;
        }

        .spec-note {
          color: var(--gold);
          font-size: 0.85rem;
          margin-top: 10px;
          line-height: 1.6;
          opacity: 0.8;
          font-style: italic;
        }

        .sub-title-text {
          font-size: 0.85rem;
          color: var(--gold);
          text-transform: uppercase;
          letter-spacing: 0.25em;
          margin-bottom: 30px;
          margin-top: 60px;
          border-bottom: 1px solid rgba(197, 160, 89, 0.2);
          padding-bottom: 10px;
        }

        .cta-box {
          background: #111a18;
          border: 1px solid rgba(197, 160, 89, 0.2);
          padding: clamp(40px, 10vw, 100px) 24px;
          text-align: center;
          margin-top: 40px;
        }

        .work-tag-container {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 20px;
        }
        .work-tag {
          padding: 6px 12px;
          background: rgba(197, 160, 89, 0.1);
          border: 1px solid rgba(197, 160, 89, 0.3);
          border-radius: 4px;
          font-size: 0.75rem;
          color: var(--gold);
          font-weight: 600;
        }

        .caution-box {
          background: rgba(197, 160, 89, 0.05);
          border: 1px solid rgba(197, 160, 89, 0.2);
          padding: 25px;
          margin-top: 40px;
          border-radius: 4px;
        }
        .caution-box h4 {
          color: var(--gold);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 12px;
        }
        .caution-box p {
          color: #999;
          font-size: 0.9rem;
          margin: 0;
          line-height: 1.6;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 991px) {
          .section-grid { grid-template-columns: 1fr; gap: 40px; }
          .nav-inner { justify-content: flex-start; padding: 15px 24px; }
        }

        @media (max-width: 768px) {
          .spec-value { text-align: left; min-width: 100%; }
          .spec-label { min-width: 100%; }
        }

        @media (max-width: 600px) {
          .spec-header { flex-direction: column; gap: 8px; align-items: flex-start; }
          .spec-value { text-align: left; font-size: 1.15rem; }
          .spec-label { padding-top: 0; letter-spacing: 0.1em; }
          .hero-section { padding-top: 120px; padding-bottom: 40px; }
          .hero-bg-text { display: none; }
        }
      `}</style>

      <Header />
      
      <main style={{ minHeight: '100vh', paddingTop: 'var(--header-h)' }}>
        
        {/* Hero */}
        <section className="hero-section">
          <div className="hero-bg-text">LUXURY</div>
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ width: '60px', height: '2px', background: 'var(--gold)', marginBottom: '30px' }} />
            <h1 style={{ 
              fontFamily: 'var(--font-serif)', 
              fontSize: 'clamp(3.5rem, 10vw, 8rem)', 
              fontWeight: 200, 
              color: 'var(--off-white)', 
              lineHeight: 0.85,
              letterSpacing: '-0.03em',
              margin: 0
            }}>
              Luxury Class<br /><span style={{ color: 'var(--gold)' }}>Elite Specifications.</span>
            </h1>
            <div className="work-tag-container">
              {['Elite Construction','Full Modular Kitchen','TV Cabinet','Basin with Cabinet','Steel Railing Balcony','False Ceiling (All Rooms)','Designer Electricals','Premium Sanitary','Smart Finishing'].map(w => <span key={w} className="work-tag">{w}</span>)}
            </div>
            <p style={{ 
              color: '#999', 
              fontSize: 'clamp(1rem, 2vw, 1.25rem)', 
              maxWidth: '550px', 
              marginTop: '40px', 
              lineHeight: 1.7,
              fontWeight: 300
            }}>
              Our flagship Luxury Class package — where industrial-grade strength meets bespoke architectural refinement. Built for the most discerning homeowners.
            </p>
            <div style={{ marginTop: '30px' }}>
              <a href="/LUXURY-CLASS.pdf" download style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '10px', 
                color: 'var(--gold)', 
                textDecoration: 'none', 
                fontSize: '0.8rem', 
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                padding: '12px 24px',
                border: '1px solid rgba(197, 160, 89, 0.3)',
                borderRadius: '4px',
                transition: 'all 0.3s'
              }} className="btn-hero-download">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download Agreement
              </a>
            </div>

            {/* In-Hero Scope Summary */}
            <div style={{ 
              marginTop: '40px', 
              paddingTop: '30px', 
              borderTop: '1px solid rgba(255,255,255,0.05)',
              maxWidth: '800px'
            }}>
              <div style={{ marginBottom: '15px' }}>
                <span style={{ color: 'var(--gold)', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Work Type</span>
                <p style={{ color: '#fff', fontSize: '0.95rem', margin: '5px 0 0', fontWeight: 500 }}>Full Finished Luxury Construction (RCC G+ / Assam Type)</p>
              </div>
              <div>
                <span style={{ color: 'var(--gold)', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Included Works</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                  {[
                    'Construction Work', 'Electrical', 'Plumbing', 'Sanitary Fittings', 
                    'Putty Colour', 'Tiles', 'False Ceiling (Gypsum / PVC)', 'Door', 
                    'Window', 'Ventilation', 'Grill', 'Full Modular Kitchen', 
                    'TV Cabinet', 'Basin with Cabinet', 'Steel Railing Veranda'
                  ].map(item => (
                    <span key={item} style={{ 
                      fontSize: '0.7rem', 
                      background: 'rgba(255,255,255,0.03)', 
                      padding: '5px 12px', 
                      borderRadius: '2px',
                      color: 'rgba(255,255,255,0.7)',
                      border: '1px solid rgba(255,255,255,0.05)',
                      whiteSpace: 'nowrap'
                    }}>{item}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <div className="sticky-nav">
          <div className="container">
            <div className="nav-inner">
              <a href="#structural">Structural</a>
              <a href="#electrical">Electrical</a>
              <a href="#interior">Interior</a>
              <a href="#modular">Kitchen & Modular</a>
              <a href="#finishing">Doors & Finishing</a>
              <a href="#sanitary">Sanitary</a>
            </div>
          </div>
        </div>

        {/* ── 01 STRUCTURAL ── */}
        <Section title="Structural & Materials" id="structural" bg="#0d1413">
          <Spec 
            label="Reinforcement (ROD)" 
            value="Durgapur Branded TMT" 
            note="All Durgapur brand as per availability. Note: In case of Tata/Any other branded TMT bars, Extra charge will be levied Rs.150/- and above per sq.ft. cost." 
          />
          <Spec 
            label="Cement Selection" 
            value="Dalmia / UltraTech / Ambuja / DSP" 
            note="Brands: Dalmia, Ultra Tech, Star, Ambuja, Surya gold, Max, Taj. Note: In casting work (foundation & slab) we use Dhalai Master or DSP; in other works we use normal cement." 
          />
          <Spec label="Brickwork" value="1st Class Red Bricks / AAC Block" />
          <Spec label="Plinth Engineering" value="Maximum 4 Feet Height" note="10-inch Plinth for RCC structures | 5-inch Plinth for Assam Type." />
          <SubTitle text="Slab & Framework" />
          <Spec label="Slab Specification" value="8x10 MM Bar Double Zali" note="Thickness: 5 inch | Bar binding gap: 4 inch | Concrete: M20 Grade." />
          <Spec label="Septic System" value="7' x 7' x 12' (L x H x B)" note="Constructed using C/C method for maximum longevity." />
          <Spec label="Water Storage" value="1000 Litre (Syntax)" />
        </Section>

        {/* ── 02 ELECTRICAL ── */}
        <Section title="Electrical & Systems" id="electrical">
          <Spec 
            label="Circuit Engineering" 
            value="Havells / Finolex / Polycab" 
            note={
              <ul style={{ paddingLeft: '18px', margin: '5px 0' }}>
                <li>Main Circuit: 4.0 mm Copper</li>
                <li>DV to Board: 2.5 mm</li>
                <li>Board to Board: 1.5 mm</li>
                <li>Switch & Light: 0.75 mm</li>
                <li>Other: 1.0 mm</li>
              </ul>
            } 
          />
          <Spec label="Switch Systems" value="Gold Model / Kolors / Syska" note="Full modular designer switchboards." />
          <Spec label="Lighting Brands" value="Havells / Crompton" note="Chain lights and other fancy lights are available from any standard brands." />
          <Spec 
            label="Electrical Scope" 
            value="Full Designer Integration" 
            note="Front Elevation wall/profile lights included. Meter box connection provided. AC point included in Master Bedroom only. Note: Earthing not included." 
          />
        </Section>

        {/* ── 03 INTERIOR ARCHITECTURE ── */}
        <Section title="Interior Layouts" id="interior" bg="#0d1413">
          <SubTitle text="Drawing & Dining Grand Hall" />
          <Spec label="Ceiling Art" value="Full False Ceiling + Chain Light" note="Includes Twelve (12) Nos. 6+3 color lights." />
          <Spec label="Entertainment" value="8x6 ft Premium TV Cabinet" note="Designer unit with integrated spotlight." />
          <Spec label="Vanity Station" value="Basin with Cabinet + Lighting Mirror" note="Mirror Size: 2' x 2.5'." />
          <Spec label="Flooring" value="2 x 4 Luxury Floor Tiles" note="Four (4) nos. Electrical Plug Points included." />

          <SubTitle text="Master Bedroom" />
          <Spec label="Ambience" value="False Ceiling + Chain Light" note="Includes Four (4) Nos. 6+3 Watt Colour lights." />
          <Spec label="Connectivity" value="AC Point + 4 Electrical Points" />
          <Spec label="Surface" value="2 x 4 Premium Floor Tiles" />

          <SubTitle text="Other Bedrooms" />
          <Spec label="Comfort" value="False Ceiling + Chain Light" note="Includes Three (3) Nos. 6+3 Watt Colour lights." />
          <Spec label="Electrical" value="Four (4) nos. Electrical Points" />
          <Spec label="Surface" value="2 x 2 Branded Floor Tiles" />
        </Section>

        {/* ── 04 KITCHEN & MODULAR ── */}
        <Section title="Kitchen & Modular" id="modular">
          <Spec label="Kitchen Layout" value="Full Modular L-Shape (72 SQFT)" note="Floor to slab: 2.5 ft | Slab Breadth: 1.5ft to 2ft." />
          <Spec label="Cabinetry" value="BOB Brand Ply (25 Year Guarantee)" note="Top level box: 2ft height. Fittings & accessories: Stainless Steel (S/S)." />
          <Spec label="Modular Finishes" value="Maika (0.80mm Outer / 0.70mm Inner)" />
          <SubTitle text="Fixtures & Appliances" />
          <Spec label="Surface" value="Polished Granite Slab" />
          <Spec label="Lighting" value="False Ceiling + 4 Nos. 6+3 Watt Color Lights" />
          <Spec label="Utility" value="Exhaust Fan + Sink (25x22) + 1 Tap" note="All necessary electrical points for appliances included." />
        </Section>

        {/* ── 05 DOORS & WINDOWS ── */}
        <Section title="Portals & Finishing" id="finishing" bg="#0d1413">
          <Spec label="Main Entrance" value="Genuine Segun Wood (4' x 7')" note="High-end solid timber door." />
          <Spec label="Internal Portals" value="Designer Ply Doors (3' x 7')" />
          <Spec label="Wet Areas" value="Fiber / Plastic Doors (2'6' x 7')" note="Extra Exit Door: 2' x 6'." />
          <Spec label="Frame System" value="Hardwood / Tata Ezy Fit (5x3 inch)" />
          <SubTitle text="Windows & Steel Work" />
          <Spec label="Glazing" value="Aluminium (Silver/Wood) / Hardwood" note="Front: As per elevation. Others: 5x4 ft, 5x3 ft, 1.5x5 ft." />
          <Spec label="Security" value="10mm Solid Square Bar Grills" note="Provided for all windows and ventilations." />
          <Spec label="Staircase Railing" value="Premium Stainless Steel Railing" note="Provided only in the main staircase." />
        </Section>

        {/* ── 06 SANITARY & TILING ── */}
        <Section title="Sanitary & Surface" id="sanitary">
          <Spec label="Sanitaryware" value="Cera / Parryware" note="Basins provided in Drawing/Dining Hall, Kitchen, and Bathroom." />
          <Spec label="Plumbing Pipes" value="Prince / Supreme / Ashirvad" />
          <SubTitle text="Luxury Bathroom Specs" />
          <Spec label="Wall Art" value="7 Feet Full-Height Wall Tiling" note="Premium Orbit / Iton brands." />
          <Spec label="Fixtures" value="Basin + Cabinet + Lighting Mirror (2x2 ft)" note="Tap, Faucet Pipe, Kumud / WC, Soap stand, Towel Stand." />
          <Spec label="Air & Light" value="PVC Ceiling + 2 Nos. 9W Light + Exhaust Fan" />
          <SubTitle text="Tiles & Surfaces" />
          <Spec label="Material Art" value="Double Charge / Digital / 3D / Glossy" note="Brands: Iton / Orbit." />
          <Spec label="Floor Specs" value="2x4, 2x2, 12x18 | Stairs: 2x2 | Bathroom: 1x1." />
        </Section>

        {/* CTA & Final Notes */}
        <div className="container" style={{ padding: '80px 0 120px' }}>
          <div className="caution-box">
            <h4>Assam Type Structure Note</h4>
            <p>For Assam Type projects: Tin O.40 MM (Normal Brand), Iron Frame Structure, Pipe 9 to 13 KG (1.5 x 1.5 inch). Headroom: 8ft height O.40 mm colour Tin, Iron structure 13 kg pipe.</p>
          </div>
          
          <div className="caution-box" style={{ marginTop: '20px' }}>
            <h4>Architectural & External Notes</h4>
            <p>Parapet Wall: Only front side included in elevation. Elevation varies by work type. Staircase headroom is enclosed using a roof truss with a 35mm Dyna roof covering.</p>
          </div>

          <div className="cta-box">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--off-white)', marginBottom: '20px', fontWeight: 200 }}>A Legacy of Luxury.</h2>
            <p style={{ color: '#888', marginBottom: '40px' }}>Exquisite details. Masterful construction. Your dream home awaits.</p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" className="btn-gold" style={{ padding: '15px 40px' }}>Request Proposal</a>
              <a href="/LUXURY-CLASS.pdf" download className="btn-outline" style={{ padding: '15px 40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download Agreement
              </a>
              <a href="tel:+919678279817" className="btn-outline" style={{ padding: '15px 40px' }}>Call Expert</a>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
