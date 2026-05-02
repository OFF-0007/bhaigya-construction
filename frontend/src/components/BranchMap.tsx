'use client';
import React, { useState } from 'react';

export default function BranchMap() {
  const [activeBranch, setActiveBranch] = useState(0);

  const branches = [
    { name: 'Guwahati Bhetapara', type: 'Head Office', pos: [22, 58], addr: 'PRAG MAHAL RESIDENCY, Guwahati', phone: '+91 96782 79817' },
    { name: 'Nagaon Hub', type: 'Regional Office', pos: [45, 52], addr: 'Central Nagaon, Assam', phone: '+91 96782 79817' },
    { name: 'Jorhat Division', type: 'Regional Office', pos: [68, 40], addr: 'Jorhat Town, Assam', phone: '+91 96782 79817' },
    { name: 'Golaghat Branch', type: 'Service Point', pos: [72, 48], addr: 'Golaghat, Assam', phone: '+91 96782 79817' },
    { name: 'Dibrugarh Office', type: 'Regional Hub', pos: [85, 28], addr: 'Dibrugarh, Assam', phone: '+91 96782 79817' },
    { name: 'Lakhimpur Unit', type: 'Regional Office', pos: [74, 25], addr: 'North Lakhimpur, Assam', phone: '+91 96782 79817' },
  ];

  return (
    <section className="location-hub-section" style={{ 
      padding: '100px 0', 
      backgroundColor: '#fdfdfd',
      borderTop: '1px solid #eee'
    }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <span style={{ color: '#c5a059', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.2em', textTransform: 'uppercase' }}>Physical Network</span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#111', margin: '10px 0 0', fontWeight: 300 }}>Our <span style={{ fontWeight: 700 }}>Presence.</span></h2>
          </div>
          <p style={{ color: '#777', maxWidth: '400px', fontSize: '0.95rem', lineHeight: 1.6 }}>Strategically located hubs across Assam to provide unmatched ground-level support for your dream project.</p>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 2fr', 
          gap: '2px', 
          background: '#eee', 
          borderRadius: '24px', 
          overflow: 'hidden',
          boxShadow: '0 30px 70px rgba(0,0,0,0.08)',
          border: '1px solid #eee'
        }}>
          {/* Left: Interactive List */}
          <div style={{ background: '#fff', padding: '20px', maxHeight: '600px', overflowY: 'auto' }} className="custom-scrollbar">
            {branches.map((branch, i) => (
              <div 
                key={i} 
                onClick={() => setActiveBranch(i)}
                style={{ 
                  padding: '24px', 
                  borderRadius: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  marginBottom: '10px',
                  background: activeBranch === i ? 'rgba(197, 160, 89, 0.05)' : 'transparent',
                  border: activeBranch === i ? '1px solid rgba(197, 160, 89, 0.2)' : '1px solid transparent'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ color: '#c5a059', fontSize: '0.65rem', fontWeight: 800, textTransform: 'uppercase' }}>{branch.type}</span>
                  {activeBranch === i && <span style={{ color: '#c5a059' }}>→</span>}
                </div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111', marginBottom: '4px' }}>{branch.name}</h4>
                <p style={{ color: '#888', fontSize: '0.75rem', marginBottom: '0' }}>{branch.addr}</p>
              </div>
            ))}
          </div>

          {/* Right: The Map */}
          <div style={{ position: 'relative', background: '#fff' }}>
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d2500000!2d93.0!3d26.2!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1714629000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, minHeight: '600px' }} 
              allowFullScreen={true} 
              loading="lazy"
            ></iframe>

            {/* Bubble Markers Overlay */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
              {branches.map((branch, i) => (
                <div 
                  key={i} 
                  style={{ 
                    position: 'absolute', 
                    left: `${branch.pos[0]}%`, 
                    top: `${branch.pos[1]}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div style={{ 
                    width: activeBranch === i ? '60px' : '30px', 
                    height: activeBranch === i ? '60px' : '30px',
                    background: activeBranch === i ? 'rgba(197, 160, 89, 0.3)' : 'rgba(37, 99, 235, 0.2)',
                    border: activeBranch === i ? '2px solid #c5a059' : '1px solid #2563eb',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    boxShadow: activeBranch === i ? '0 0 20px rgba(197, 160, 89, 0.4)' : 'none'
                  }}>
                    {activeBranch === i && <div style={{ width: '8px', height: '8px', background: '#c5a059', borderRadius: '50%' }}></div>}
                  </div>
                </div>
              ))}
            </div>

            {/* Floating Info Card */}
            <div style={{ 
              position: 'absolute', 
              bottom: '30px', 
              right: '30px', 
              width: '300px',
              background: '#fff',
              padding: '30px',
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              border: '1px solid #eee',
              animation: 'slideUp 0.5s ease'
            }}>
              <span style={{ color: '#c5a059', fontSize: '0.7rem', fontWeight: 800 }}>NOW VIEWING</span>
              <h4 style={{ fontSize: '1.2rem', color: '#111', marginTop: '5px' }}>{branches[activeBranch].name}</h4>
              <p style={{ color: '#666', fontSize: '0.85rem', margin: '15px 0' }}>{branches[activeBranch].addr}</p>
              <a href={`tel:${branches[activeBranch].phone}`} style={{ 
                display: 'block',
                textAlign: 'center',
                padding: '12px',
                background: '#111',
                color: '#fff',
                textDecoration: 'none',
                borderRadius: '8px',
                fontSize: '0.85rem',
                fontWeight: 600
              }}>Call Office</a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #ddd;
          border-radius: 10px;
        }
        @media (max-width: 991px) {
          .grid-container { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
