'use client';
import React from 'react';

export default function BranchLocations() {
  const branches = [
    { name: 'Guwahati Bhetapara', type: 'Head Office', addr: 'PRAG MAHAL RESIDENCY, Guwahati' },
    { name: 'Nagaon Hub', type: 'Regional Office', addr: 'Central Nagaon, Assam' },
    { name: 'Jorhat Division', type: 'Regional Office', addr: 'Jorhat Town, Assam' },
    { name: 'Golaghat Branch', type: 'Service Point', addr: 'Golaghat, Assam' },
    { name: 'Dibrugarh Office', type: 'Regional Hub', addr: 'Dibrugarh, Assam' },
    { name: 'Lakhimpur Unit', type: 'Regional Office', addr: 'North Lakhimpur, Assam' },
    { name: 'Tinsukia Sector', type: 'Regional Office', addr: 'Tinsukia, Assam' },
    { name: 'Bongaigaon Div.', type: 'Regional Office', addr: 'Bongaigaon, Assam' },
    { name: 'Barpeta Branch', type: 'Regional Office', addr: 'Barpeta, Assam' },
    { name: 'Goalpara Unit', type: 'Regional Office', addr: 'Goalpara, Assam' },
    { name: 'Nalbari Office', type: 'Regional Office', addr: 'Nalbari, Assam' },
    { name: 'Dhubri Division', type: 'Regional Office', addr: 'Dhubri Town, Assam' },
  ];

  return (
    <section className="branches-dark-section" style={{
      padding: '120px 0',
      backgroundColor: '#0c1211',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Background Elements */}
      <div style={{ position: 'absolute', top: '10%', right: '-5%', fontSize: '15rem', fontWeight: 900, color: 'rgba(197, 160, 89, 0.03)', pointerEvents: 'none', lineHeight: 1 }}>BRANCHES</div>

      <div className="container">
        <div style={{ marginBottom: '80px', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
            <span style={{ color: '#c5a059', fontSize: '0.75rem', fontWeight: 900, letterSpacing: '0.3em', textTransform: 'uppercase' }}>Operational Network</span>
            <div style={{ flex: 1, height: '1px', background: 'rgba(197, 160, 89, 0.2)' }}></div>
          </div>
          <h2 style={{
            fontFamily: 'var(--font-serif)',
            fontSize: 'clamp(2.5rem, 6vw, 4.5rem)',
            color: '#fff',
            margin: '0',
            fontWeight: 300,
            lineHeight: 1.1
          }}>
            Our branch offices in <span style={{ color: '#c5a059', fontWeight: 700 }}>Assam.</span>
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '500px', fontSize: '1.1rem', marginTop: '20px', lineHeight: 1.6 }}>
            Our regional offices ensure that Bhaigya Construction's standards of excellence are maintained in every corner of Assam.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '20px'
        }}>
          {branches.map((branch, i) => (
            <div
              key={i}
              style={{
                padding: '15px 20px',
                background: 'rgba(255, 255, 255, 0.02)',
                backdropFilter: 'blur(10px)',
                borderRadius: '4px',
                border: '1px solid rgba(197, 160, 89, 0.1)',
                transition: 'all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column'
              }}
              className="branch-card-dark"
            >
              <div style={{
                position: 'absolute',
                bottom: '10px',
                right: '15px',
                fontSize: '2.5rem',
                fontWeight: 900,
                color: 'rgba(197, 160, 89, 0.03)',
                lineHeight: 1,
                pointerEvents: 'none',
                fontFamily: 'var(--font-serif)'
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <div style={{
                  width: '6px',
                  height: '6px',
                  background: branch.type === 'Head Office' ? '#c5a059' : 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  boxShadow: branch.type === 'Head Office' ? '0 0 8px rgba(197,160,89,0.5)' : 'none'
                }}></div>
                <h4 style={{ color: '#c5a059', fontSize: '0.55rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0 }}>
                  {branch.type}
                </h4>
              </div>

              <h3 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '4px', fontWeight: 500, fontFamily: 'var(--font-serif)' }}>
                {branch.name}
              </h3>

              <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem', lineHeight: 1.4, margin: 0 }}>
                {branch.addr}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .branch-card-dark:hover {
          background: rgba(197, 160, 89, 0.05) !important;
          border-color: rgba(197, 160, 89, 0.4) !important;
          transform: translateY(-5px);
        }
      `}</style>
    </section>
  );
}
