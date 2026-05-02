import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Luxury Class Construction Package | Bhaigya Construction',
  description: 'Explore Bhaigya Construction\'s Luxury Class package — premium materials, full modular kitchen, false ceiling, branded electricals, and complete finishes for your dream home in Assam.',
  alternates: { canonical: '/packages/luxury' },
};

export default function LuxuryPackagePage() {
  return (
    <>
      <Header />
      <main style={{ background: 'var(--dark)', minHeight: '100vh', paddingTop: 'var(--header-h)' }}>

        {/* ── HERO BANNER ── */}
        <section style={{
          background: 'linear-gradient(135deg, #0a1c15 0%, #0d1f17 40%, #111a0e 100%)',
          borderBottom: '1px solid rgba(197,160,89,0.25)',
          padding: '80px 0 60px',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.04,
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23C5A059' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
          <div style={{
            position: 'absolute', top: '-80px', right: '-80px',
            width: '400px', height: '400px', borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(197,160,89,0.08) 0%, transparent 70%)',
          }} />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem' }}>
              <div style={{ width: '40px', height: '1px', background: 'var(--gold)' }} />
              <span style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--gold)' }}>Bhaigya Construction</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '2rem' }}>
              <div>
                <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 900, color: 'var(--off-white)', lineHeight: 1.1, marginBottom: '1rem' }}>
                  Luxury Class<br />
                  <span style={{ background: 'linear-gradient(135deg, #D4AF37 0%, #C5A059 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                    Construction Package
                  </span>
                </h1>
                <p style={{ fontSize: '1.05rem', color: 'var(--grey-light)', maxWidth: '600px', lineHeight: 1.8 }}>
                  A comprehensive, premium construction package featuring branded materials, full modular kitchen, false ceilings, and complete luxury finishes — crafted for discerning homeowners across Assam.
                </p>
              </div>
              <div style={{
                background: 'rgba(197,160,89,0.08)', border: '1px solid rgba(197,160,89,0.3)',
                borderRadius: '12px', padding: '24px 32px', textAlign: 'center', flexShrink: 0,
              }}>
                <div style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--gold)', marginBottom: '8px' }}>Package Tier</div>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', fontWeight: 800, color: 'var(--off-white)' }}>⭐ Luxury</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--grey)', marginTop: '8px' }}>Premium Grade</div>
              </div>
            </div>

            {/* Works tags */}
            <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {['Construction Work','Electrical','Plumbing','Sanitary Fittings','Putty Colour','Tiles','False Ceiling','Door & Window','Ventilation','Grill','Full Modular Kitchen','TV Cabinet','Basin with Cabinet','Front Veranda / Balcony'].map(w => (
                <span key={w} style={{
                  padding: '5px 14px', borderRadius: '100px',
                  background: 'rgba(197,160,89,0.1)', border: '1px solid rgba(197,160,89,0.25)',
                  fontSize: '0.75rem', color: 'var(--gold)', letterSpacing: '0.05em',
                }}>
                  {w}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* ── MAIN CONTENT ── */}
        <div className="container" style={{ padding: '60px 0 80px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>

            {/* STRUCTURAL */}
            <div style={{ gridColumn: '1 / -1' }}>
              <SectionHeading icon="🏗️" title="Structural Specifications" />
            </div>

            <SpecCard icon="🧱" title="Rod / TMT Bars">
              <BrandRow brands={['Durgapur']} note="All Durgapur brand as per availability." />
              <Note>Tata/Other branded TMT bars: Extra charge of ₹150/- and above per sq.ft.</Note>
            </SpecCard>

            <SpecCard icon="🪨" title="Cement">
              <BrandRow brands={['Dalmia','Ultra Tech','Star','Ambuja','Surya Gold','Max','Taj']} note="As per owner's requirement" />
              <Note>Casting work (foundation & slab): Dhalai Master or DSP. Other works: Normal cement.</Note>
            </SpecCard>

            <SpecCard icon="🟫" title="Brick">
              <SpecRow label="Type" value="Red Bricks / AAC Block" />
            </SpecCard>

            <SpecCard icon="📐" title="Slab">
              <SpecRow label="Bar" value="8×10 mm Double Zali" />
              <SpecRow label="Thickness" value="5 Inches" />
              <SpecRow label="Bar Binding Gap" value="4 Inches" />
              <SpecRow label="Concrete Grade" value="M20" />
            </SpecCard>

            <SpecCard icon="🧱" title="Brick Wall Size">
              <SpecRow label="RCC Plinth" value='10 Inch' />
              <SpecRow label="Assam Type / Partition" value='5 Inch' />
            </SpecCard>

            <SpecCard icon="📏" title="Plinth">
              <SpecRow label="Maximum Height" value="4 ft" />
            </SpecCard>

            {/* ELECTRICAL */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
              <SectionHeading icon="⚡" title="Electrical" />
            </div>

            <SpecCard icon="🔌" title="Electrical Wire">
              <BrandRow brands={['Havells','Finolex','Polycab']} note="Copper Wire" />
              <div style={{ marginTop: '12px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  ['Main Circuit', '4 mm'],
                  ['DV to Board Circuit', '2.5 mm'],
                  ['Board to Board Circuit', '1.5 mm'],
                  ['Switch & Light', '0.75 mm'],
                  ['Other', '1 mm'],
                ].map(([k, v]) => <SpecRow key={k} label={k} value={v} />)}
              </div>
            </SpecCard>

            <SpecCard icon="💡" title="Lights & Switches">
              <SpecRow label="Light Brands" value="Havells / Crompton" />
              <SpecRow label="Switch Models" value="Gold Model / Kolors / Syska" />
              <Note>Chain lights and other fancy lights available from any brand.</Note>
            </SpecCard>

            <SpecCard icon="🔦" title="Electrical Notes">
              <Note>Front Elevation: Wall light / Profile light as per design.</Note>
              <Note>Connection provided only from meter box.</Note>
              <Note>Earthing not included.</Note>
              <Note>AC point included only in Master Bedroom.</Note>
            </SpecCard>

            {/* ROOM SPECS */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
              <SectionHeading icon="🛏️" title="Room-wise Specifications" />
            </div>

            <RoomCard
              icon="👑"
              title="Master Bedroom"
              color="rgba(197,160,89,0.12)"
              items={[
                'False Ceiling',
                'Chain Light',
                '4 Nos. 6+3 Watt Colour Lights',
                'AC Point',
                '4 nos. Additional Electrical Points',
                '2×4 Floor Tiles',
              ]}
            />

            <RoomCard
              icon="🛏️"
              title="Other Bedrooms"
              items={[
                'False Ceiling',
                'Chain Light',
                '3 Nos. 6+3 Watt Colour Lights',
                '4 nos. Additional Electrical Points',
                '2×2 Floor Tiles',
              ]}
            />

            <RoomCard
              icon="🛋️"
              title="Drawing / Dining Hall"
              items={[
                'False Ceiling',
                'Chain Light',
                '12 Nos. 6+3 Watt Colour Lights',
                '4 Nos. Electrical Plug Points',
                'TV Cabinet 8×6 ft with Spotlight',
                'Basin with Cabinet & Lighting Mirror (2×2.5 ft)',
                '2×4 Floor Tiles',
              ]}
            />

            <RoomCard
              icon="🚿"
              title="Bathroom"
              items={[
                'PVC Ceiling',
                '2 Nos. 9 Watt Lights',
                'Exhaust Fan',
                'Basin with Cabinet',
                'Lighting Mirror 2×2 ft',
                'Tap & Faucet Pipe',
                'Kumud / WC',
                'Soap Stand',
                'Towel Stand',
                '7 ft Height Wall Tiles',
              ]}
            />

            <RoomCard
              icon="🍳"
              title="Kitchen"
              items={[
                'False Ceiling',
                '4 Nos. 6+3 Watt Colour Lights',
                'Slab Granite (Breadth 1.5 ft – 2 ft)',
                'Full Modular Kitchen — L Shape (Floor to slab 2.5 ft)',
                'Top Level Box 2 ft Height',
                '2×2 Floor Tiles',
                'All Electrical Points',
                'Exhaust Fan',
                '1 Sink — 25"×22"',
                '1 Tap',
              ]}
            />

            {/* FINISHES */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
              <SectionHeading icon="🎨" title="Finishes & Fixtures" />
            </div>

            <SpecCard icon="🎨" title="Colour / Putty">
              <BrandRow brands={['Asian Paints','Berger','Indigo']} />
              <Note>Asian Paints: Premium & Apex (Inner & Outer use).</Note>
            </SpecCard>

            <SpecCard icon="🟦" title="Tiles">
              <SpecRow label="Types" value="Double Charge, Digital, 3D, Glossy, Matt" />
              <SpecRow label="Brands" value="Iton / Orbit" />
              <div style={{ marginTop: '10px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {[
                  ['Floor (General)', '2×4, 2×2'],
                  ['Stairs', '2×2'],
                  ['Bathroom Wall', '1×1 (up to 7 ft height)'],
                  ['Other Sizes', '12"×18"'],
                ].map(([k, v]) => <SpecRow key={k} label={k} value={v} />)}
              </div>
            </SpecCard>

            <SpecCard icon="🚽" title="Sanitary Fittings">
              <BrandRow brands={['Cera','Parryware']} />
              <SpecRow label="Basins" value="Drawing/Dining Hall, Kitchen, Bathroom" />
            </SpecCard>

            <SpecCard icon="🔧" title="Plumbing">
              <BrandRow brands={['Prince','Supreme','Ashirvad']} />
            </SpecCard>

            {/* MODULAR */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
              <SectionHeading icon="🪵" title="Modular Work" />
            </div>

            <SpecCard icon="🪵" title="Modular Kitchen Materials">
              <SpecRow label="Ply" value="25 Years Guarantee — BOB" />
              <SpecRow label="Maika / Thinner" value="0.70 Outer, 0.80 mm" />
              <SpecRow label="Fittings & Accessories" value="Stainless Steel (S/S) — Any brand as per availability" />
              <Note>Modular Kitchen: 72 sq.ft. Full Modular Kitchen in L Shape.</Note>
            </SpecCard>

            {/* DOORS & WINDOWS */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
              <SectionHeading icon="🚪" title="Doors & Windows" />
            </div>

            <SpecCard icon="🚪" title="Door Frame">
              <SpecRow label="Material" value="Hardwood (as per availability) / Tata Ezy Fit Door Frame" />
              <SpecRow label="Frame Size" value='5×3 Inch' />
            </SpecCard>

            <SpecCard icon="🚪" title="Door Sizes & Types">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {[
                  ['Main Door', "Segun Wood — 4'×7'", '👑'],
                  ['Bedroom Doors', "Ply — 3'×7'", '🛏️'],
                  ['Bathroom Door', "Fiber/Plastic — 2'6\"×7'", '🚿'],
                  ['Extra Exit Door', "2'×6'", '🚪'],
                ].map(([k, v, ico]) => (
                  <div key={String(k)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 14px', background: 'rgba(197,160,89,0.05)', borderRadius: '8px', border: '1px solid rgba(197,160,89,0.15)' }}>
                    <span>{ico}</span>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--grey)', letterSpacing: '0.05em', textTransform: 'uppercase' }}>{k}</div>
                      <div style={{ fontSize: '0.95rem', color: 'var(--off-white)', fontWeight: 600 }}>{v}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Note>Double Palla Door & Single Palla Door options available.</Note>
            </SpecCard>

            <SpecCard icon="🪟" title="Windows & Ventilation">
              <SpecRow label="Material" value="Aluminium (Silver) / Hardwood" />
              <SpecRow label="Window Sizes" value="5×4, 5×3, 1.5×5" />
              <SpecRow label="Ventilation Height" value="1.5 ft (breadth same as window)" />
              <SpecRow label="Grill" value='Plain square — 10mm solid bar (Window & Ventilation only)' />
            </SpecCard>

            {/* ELEVATION & STRUCTURE */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
              <SectionHeading icon="🏠" title="Elevation & External Structure" />
            </div>

            <SpecCard icon="🏠" title="Elevation">
              <Note>Elevation will be different as per Work Type. Front profile/wall lights included as per design.</Note>
            </SpecCard>

            <SpecCard icon="🌿" title="Veranda / Balcony">
              <SpecRow label="Design" value="As per Elevation Design" />
              <Note>Steel railing provided only in the main staircase.</Note>
              <Note>Parapet wall on front side only — other three sides not included.</Note>
            </SpecCard>

            <SpecCard icon="🏚️" title="Head Room">
              <SpecRow label="Height" value="8 ft" />
              <SpecRow label="Tin" value="O.40 mm Colour Tin" />
              <SpecRow label="Structure" value="Iron frame — 13 kg pipe, 1.5×1.5 inch" />
              <Note>Staircase headroom enclosed using roof truss with 35mm Dyna roof covering.</Note>
            </SpecCard>

            {/* ASSAM TYPE NOTE */}
            <div style={{ gridColumn: '1 / -1', marginTop: '16px' }}>
              <div style={{
                padding: '24px 28px',
                background: 'rgba(197,160,89,0.06)',
                border: '1px solid rgba(197,160,89,0.3)',
                borderLeft: '4px solid var(--gold)',
                borderRadius: '12px',
              }}>
                <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', color: 'var(--gold)', marginBottom: '10px', fontWeight: 700 }}>📌 Assam Type Tin Specification</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px', fontSize: '0.9rem', color: 'var(--grey-light)' }}>
                  <span>🔩 Tin: O.40 mm, Colour Tin (Any normal brand)</span>
                  <span>🔧 Structure: Iron frame</span>
                  <span>📦 Pipe: 9 to 13 kg, 1.5×1.5 inch (Any brand)</span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div style={{ gridColumn: '1 / -1', marginTop: '24px', textAlign: 'center' }}>
              <div style={{
                padding: '48px 40px',
                background: 'linear-gradient(135deg, rgba(197,160,89,0.08) 0%, rgba(197,160,89,0.03) 100%)',
                border: '1px solid rgba(197,160,89,0.3)',
                borderRadius: '16px',
              }}>
                <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--off-white)', marginBottom: '12px' }}>
                  Interested in the Luxury Class Package?
                </h2>
                <p style={{ color: 'var(--grey-light)', marginBottom: '28px', maxWidth: '500px', margin: '0 auto 28px' }}>
                  Get a personalized quote from our experts. We serve all across Assam & North East India.
                </p>
                <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a href="/contact" className="btn-gold">Get a Free Quote</a>
                  <a href="tel:+919678279817" className="btn-outline">📞 +91 96782 79817</a>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// ── Sub-components ──────────────────────────────────────

function SectionHeading({ icon, title }: { icon: string; title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px', marginTop: '8px' }}>
      <span style={{ fontSize: '1.3rem' }}>{icon}</span>
      <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.3rem', fontWeight: 700, color: 'var(--gold)' }}>{title}</h2>
      <div style={{ flex: 1, height: '1px', background: 'rgba(197,160,89,0.2)' }} />
    </div>
  );
}

function SpecCard({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(197,160,89,0.15)',
      borderRadius: '12px',
      padding: '24px',
      transition: 'border-color 0.3s, background 0.3s',
    }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(197,160,89,0.4)';
        (e.currentTarget as HTMLDivElement).style.background = 'rgba(197,160,89,0.04)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(197,160,89,0.15)';
        (e.currentTarget as HTMLDivElement).style.background = 'rgba(255,255,255,0.02)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid rgba(197,160,89,0.12)' }}>
        <span style={{ fontSize: '1.2rem' }}>{icon}</span>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1rem', fontWeight: 700, color: 'var(--off-white)', letterSpacing: '0.03em' }}>{title}</h3>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {children}
      </div>
    </div>
  );
}

function RoomCard({ icon, title, items, color }: { icon: string; title: string; items: string[]; color?: string }) {
  return (
    <div style={{
      background: color || 'rgba(255,255,255,0.02)',
      border: '1px solid rgba(197,160,89,0.2)',
      borderRadius: '12px',
      padding: '24px',
      transition: 'transform 0.3s, box-shadow 0.3s',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
        <span style={{ fontSize: '1.4rem' }}>{icon}</span>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.05rem', fontWeight: 700, color: 'var(--gold)' }}>{title}</h3>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {items.map(item => (
          <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.88rem', color: 'var(--grey-light)', lineHeight: 1.5 }}>
            <span style={{ color: 'var(--gold)', marginTop: '2px', flexShrink: 0 }}>◆</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

function BrandRow({ brands, note }: { brands: string[]; note?: string }) {
  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: note ? '8px' : 0 }}>
        {brands.map(b => (
          <span key={b} style={{
            padding: '4px 12px', borderRadius: '6px',
            background: 'linear-gradient(135deg, rgba(212,175,55,0.15) 0%, rgba(197,160,89,0.08) 100%)',
            border: '1px solid rgba(197,160,89,0.3)',
            fontSize: '0.8rem', fontWeight: 600, color: 'var(--gold)',
          }}>{b}</span>
        ))}
      </div>
      {note && <p style={{ fontSize: '0.78rem', color: 'var(--grey)', fontStyle: 'italic' }}>{note}</p>}
    </div>
  );
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px', fontSize: '0.85rem', paddingBottom: '6px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
      <span style={{ color: 'var(--grey)', flexShrink: 0 }}>{label}</span>
      <span style={{ color: 'var(--off-white)', fontWeight: 600, textAlign: 'right' }}>{value}</span>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontSize: '0.78rem', color: 'var(--grey)', fontStyle: 'italic', lineHeight: 1.6, paddingLeft: '10px', borderLeft: '2px solid rgba(197,160,89,0.3)' }}>
      {children}
    </p>
  );
}
