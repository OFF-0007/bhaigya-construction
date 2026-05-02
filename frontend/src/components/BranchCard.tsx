'use client';

import React, { useState } from 'react';
import { OfficeBranch } from '@/types/api';

export default function BranchCard({ branch }: { branch: OfficeBranch }) {
  const [isMapExpanded, setIsMapExpanded] = useState(false);

  return (
    <div className="reveal-up" style={{ 
      background: 'rgba(13, 13, 13, 0.7)', 
      borderRadius: 'var(--radius-lg)', 
      overflow: 'hidden',
      boxShadow: '0 10px 40px rgba(0,0,0,0.4)',
      border: '1px solid var(--gold-border)',
      transition: 'all var(--transition)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}>
      {branch.image_url && (
        <div style={{ width: '100%', height: '160px', position: 'relative', overflow: 'hidden' }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={branch.image_url} 
            alt={`${branch.name} Office`} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, transparent 40%, rgba(13, 13, 13, 0.9) 100%)'
          }} />
        </div>
      )}
      
      <div style={{ padding: '25px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--off-white)', lineHeight: '1.2' }}>
            {branch.name}
          </h3>
          {branch.location && (
            <span style={{ 
              background: 'rgba(197, 160, 89, 0.1)', 
              color: 'var(--gold)', 
              padding: '4px 10px', 
              borderRadius: '4px', 
              fontSize: '0.75rem', 
              fontWeight: '600', 
              letterSpacing: '0.05em', 
              textTransform: 'uppercase',
              border: '1px solid rgba(197, 160, 89, 0.2)'
            }}>
              {branch.location}
            </span>
          )}
        </div>
        
        {branch.description && (
          <p style={{ color: 'var(--grey-light)', marginBottom: '20px', fontSize: '0.9rem', lineHeight: '1.6' }}>
            {branch.description}
          </p>
        )}

        <div style={{ marginTop: 'auto' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', background: 'rgba(255, 255, 255, 0.02)', padding: '15px', borderRadius: '8px', border: '1px solid rgba(255, 255, 255, 0.05)' }}>
            {branch.address && (
              <div style={{ display: 'flex', color: 'var(--text)', gap: '12px', alignItems: 'flex-start' }}>
                <span style={{ fontSize: '1rem', color: 'var(--gold)', marginTop: '2px' }}>🏢</span>
                <span style={{ flex: 1, fontSize: '0.85rem', lineHeight: '1.5', color: 'var(--grey-light)' }}>{branch.address}</span>
              </div>
            )}
            {branch.phone && (
              <div style={{ display: 'flex', color: 'var(--text)', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '1rem', color: 'var(--gold)' }}>📞</span>
                <a href={`tel:${branch.phone.replace(/[^0-9+]/g, '')}`} style={{ flex: 1, fontSize: '0.85rem', color: 'var(--off-white)', textDecoration: 'none', transition: 'color var(--transition)' }} onMouseOver={e => e.currentTarget.style.color = 'var(--gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--off-white)'}>
                  {branch.phone}
                </a>
              </div>
            )}
            {branch.email && (
              <div style={{ display: 'flex', color: 'var(--text)', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '1rem', color: 'var(--gold)' }}>✉️</span>
                <a href={`mailto:${branch.email}`} style={{ flex: 1, fontSize: '0.85rem', color: 'var(--off-white)', textDecoration: 'none', wordBreak: 'break-all', transition: 'color var(--transition)' }} onMouseOver={e => e.currentTarget.style.color = 'var(--gold)'} onMouseOut={e => e.currentTarget.style.color = 'var(--off-white)'}>
                  {branch.email}
                </a>
              </div>
            )}
          </div>

          {branch.map_url && (
            <div style={{ marginTop: '15px' }}>
              <button 
                onClick={() => setIsMapExpanded(!isMapExpanded)}
                className="btn-outline btn-full"
                style={{ padding: '10px', fontSize: '0.8rem', letterSpacing: '0.05em' }}
              >
                {isMapExpanded ? 'Close Map' : 'View on Map'}
              </button>

              {isMapExpanded && (() => {
                const isEmbedUrl = branch.map_url.includes('/embed') || branch.map_url.includes('output=embed');
                const mapQuery = `${branch.name} ${branch.location || ''} ${branch.address || ''}`.trim();
                const embedSrc = isEmbedUrl 
                  ? branch.map_url 
                  : `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

                return (
                  <div style={{ marginTop: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ borderRadius: 'var(--radius)', overflow: 'hidden', height: '200px', border: '1px solid var(--gold-border)' }}>
                      <iframe 
                        src={embedSrc} 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>
                    
                    {!isEmbedUrl && (
                      <a 
                        href={branch.map_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="btn-gold btn-full"
                        style={{ padding: '10px', fontSize: '0.8rem' }}
                      >
                        <span style={{ fontSize: '1rem', marginRight: '6px' }}>🗺️</span> Open in Google Maps
                      </a>
                    )}
                  </div>
                );
              })()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
