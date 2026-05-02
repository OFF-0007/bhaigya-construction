import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'B Class Construction Package | Bhaigya Construction',
  description: "Bhaigya Construction's B Class package — high-quality civil work, foundation, slab, masonry, and core structural framework for your construction in Assam.",
  alternates: { canonical: '/services/b-class' },
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

export default function BClassPage() {
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

        .payment-box {
          background: rgba(197, 160, 89, 0.05);
          border: 1px solid rgba(197, 160, 89, 0.2);
          padding: 25px;
          margin-top: 40px;
          border-radius: 4px;
        }
        .payment-box h4 {
          color: var(--gold);
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.2em;
          margin-bottom: 20px;
        }
        .payment-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 20px;
        }
        .pay-step {
          text-align: left;
        }
        .pay-val { color: #fff; font-size: 1.2rem; font-weight: 700; display: block; }
        .pay-lbl { color: #888; font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; }

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
          <div className="hero-bg-text">B-CLASS</div>
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
              B Class<br /><span style={{ color: 'var(--gold)' }}>Core Foundations.</span>
            </h1>
            <div className="work-tag-container">
              {['Civil Work Only', 'Foundation', 'Slab', 'Bricks & Plaster', 'Electric Concealing', 'Door/Window Frames'].map(w => <span key={w} className="work-tag">{w}</span>)}
            </div>
            <p style={{
              color: '#999',
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              maxWidth: '550px',
              marginTop: '40px',
              lineHeight: 1.7,
              fontWeight: 300
            }}>
              High-quality B-Class core construction focusing on structural integrity, professional masonry, and the skeletal framework of your project.
            </p>
            <div style={{ marginTop: '30px' }}>
              <a href="/B-CLASS.pdf" download style={{
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
                <p style={{ color: '#fff', fontSize: '0.95rem', margin: '5px 0 0', fontWeight: 500 }}>(RCC / Civil Structure Only)</p>
              </div>
              <div>
                <span style={{ color: 'var(--gold)', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.2em' }}>Included Works</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '12px' }}>
                  {[
                    'Only Civil work', 'Foundation', 'Slab', 'Bricks and Plaster',
                    'Electric Concealing', 'Door and Window Frame'
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
              <a href="#masonry">Masonry</a>
              <a href="#frames">Frames</a>
              <a href="#utility">Utility</a>
            </div>
          </div>
        </div>

        {/* ── 01 STRUCTURAL ── */}
        <Section title="Structural Core" id="structural" bg="#0d1413">
          <Spec
            label="Reinforcement (ROD)"
            value="Zeecon / Lotus / Zara"
            note="Note: In case of TATA, extra charge of ₹150/- per sq.ft. will be levied."
          />
          <Spec
            label="Cement Selection"
            value="Dalmia / Star / Ambuja / Amrit"
            note="Used as per owner requirement for all structural and civil works."
          />
          <Spec label="Brick Selection" value="Red Bricks / AAC Block" />
          <SubTitle text="Slab & Foundation" />
          <Spec label="Slab Engineering" value="8x10 MM Bar Double Zali" note="Thickness: 5 inch | Bar binding gap: 4 inch | Concrete: M20 Grade." />
          <Spec label="Septic Tank" value="7 ft x 13 ft" />
        </Section>

        {/* ── 02 MASONRY & WALLS ── */}
        <Section title="Masonry & Walls" id="masonry">
          <Spec label="Brick Wall Sizes" value="Plinth: 10 inch | Partition: 5 inch" />
          <Spec label="Work Scope" value="Bricks & Plastering" note="Professional cement-sand mix plastering for internal & external walls." />
        </Section>

        {/* ── 03 FRAMES & OPENINGS ── */}
        <Section title="Frames & Portals" id="frames" bg="#0d1413">
          <Spec label="Main Frame" value="Wood (First Class) / TATA Steel" />
          <Spec label="Frame Dimensions" value="Outer: 5x3 inch | Inner: 4x3 inch" />
          <SubTitle text="Door & Window Sizes" />
          <Spec label="Door Sizes" value="Front: 7'x4' | Others: 7'x3.5'" />
          <Spec label="Window Sizes" value="Front: As per Elevation | Others: 5x4' & 5x6'" />
          <Spec label="Ventilation" value="As per architectural elevation design." />
        </Section>

        {/* ── 04 UTILITY & KITCHEN ── */}
        <Section title="Utility Core" id="utility">
          <Spec label="Electrical Scope" value="Electric Concealing Work" note="Concealing of pipes and boxes only (wiring and fixtures not included)." />
          <Spec label="Kitchen Platform" value="Only L-Shape Slab Work" note="Foundation and core civil work for the kitchen platform." />
        </Section>

        {/* Payment & Final Notes */}
        <div className="container" style={{ padding: '80px 0 120px' }}>
          <div className="payment-box">
            <h4>Payment Installments</h4>
            <div className="payment-grid">
              <div className="pay-step">
                <span className="pay-val">35%</span>
                <span className="pay-lbl">Plinth Level</span>
              </div>
              <div className="pay-step">
                <span className="pay-val">35%</span>
                <span className="pay-lbl">Slab Level</span>
              </div>
              <div className="pay-step">
                <span className="pay-val">30%</span>
                <span className="pay-lbl">Brick & Plaster</span>
              </div>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8rem', marginTop: '30px', lineHeight: 1.6 }}>
              <strong>N.B.:</strong> Amount should be paid by the owner before the work starts in part by part as mentioned above. Every part shown above should be paid in full in a single payment.
            </p>
          </div>

          <div className="cta-box">
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 5vw, 3rem)', color: 'var(--off-white)', marginBottom: '20px', fontWeight: 200 }}>Built for Strength.</h2>
            <p style={{ color: '#888', marginBottom: '40px' }}>Professional core civil construction for your building's skeleton.</p>
            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/contact" className="btn-gold" style={{ padding: '15px 40px' }}>Get A Quote</a>
              <a href="/B-CLASS.pdf" download className="btn-outline" style={{ padding: '15px 40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                Download Agreement
              </a>
              <a href="tel:+919678279817" className="btn-outline" style={{ padding: '15px 40px' }}>Call Specialist</a>
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </>
  );
}
