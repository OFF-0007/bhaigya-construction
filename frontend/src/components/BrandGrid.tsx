'use client';

import { useState } from 'react';

function BrandLogo({ domain, name }: { domain: string; name: string }) {
  const [imgSrc, setImgSrc] = useState(`https://logo.clearbit.com/${domain}`);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', minWidth: '70px' }}>
      <div style={{ width: '52px', height: '52px', borderRadius: '10px', background: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '6px', boxShadow: '0 2px 12px rgba(0,0,0,0.3)', border: '1px solid rgba(197,160,89,0.2)', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imgSrc}
          alt={name}
          width={40}
          height={40}
          style={{ objectFit: 'contain', width: '40px', height: '40px' }}
          onError={() => {
            if (imgSrc.includes('clearbit')) {
              // Fallback to Google Favicon service
              setImgSrc(`https://www.google.com/s2/favicons?domain=${domain}&sz=64`);
            } else if (imgSrc.includes('google')) {
              // Ultimate fallback: generated letter avatar
              setImgSrc(`https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=C5A059&color=fff&size=64&bold=true`);
            }
          }}
        />
      </div>
      <span style={{ fontSize: '0.65rem', color: 'var(--grey-light)', textAlign: 'center', lineHeight: 1.2, fontWeight: 600 }}>{name}</span>
    </div>
  );
}

export function BrandGrid({ brands }: { brands: { domain: string; name: string }[] }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '12px' }}>
      {brands.map(b => (
        <BrandLogo key={b.domain} domain={b.domain} name={b.name} />
      ))}
    </div>
  );
}
