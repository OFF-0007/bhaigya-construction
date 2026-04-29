'use client';
import { useEffect } from 'react';

export default function Preloader() {
  useEffect(() => {
    const preloader = document.getElementById('preloader');
    if (!preloader) return;

    const hide = () => {
      preloader.classList.add('done');
      setTimeout(() => {
        if (preloader.parentNode) {
          preloader.style.display = 'none';
        }
      }, 900);
    };

    // Hide after a max of 3 seconds or when window loads
    const timer = setTimeout(hide, 3000);
    
    if (document.readyState === 'complete') {
      hide();
    } else {
      window.addEventListener('load', hide);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('load', hide);
    };
  }, []);

  return (
    <div 
      id="preloader" 
      role="status" 
      aria-label="Loading Bhaigya Construction"
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 99999, 
        background: '#0a1c15', 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}
    >
      <div className="preloader-logo">
        <img src="/BGC.jpeg" alt="Bhaigya Construction Logo" style={{ height: '50px', width: 'auto', borderRadius: '4px', marginBottom: '8px' }} />
      </div>
      <div className="preloader-bar-wrap">
        <div className="preloader-bar"></div>
      </div>
      <span className="preloader-text">Crafting Excellence…</span>
    </div>
  );
}
