'use client';

import { useEffect, useCallback } from 'react';
import { ServicePackage } from '@/types/api';

interface ServiceDetailModalProps {
  service: ServicePackage;
  onClose: () => void;
}

const getIcon = (categoryName?: string | null): string => {
  if (!categoryName) return '🏗️';
  const cat = categoryName.toUpperCase();
  if (cat.includes('A CLASS')) return '🏠';
  if (cat.includes('LUXURY CLASS')) return '🏛️';
  if (cat.includes('ULTRA LUXURY')) return '💎';
  if (cat.includes('B CLASS')) return '🏗️';
  return '🏗️';
};

export default function ServiceDetailModal({ service, onClose }: ServiceDetailModalProps) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  const isPopular = service.popularity === 'popular';
  const price = parseFloat(service.price);
  const hasPrice = price > 0;

  return (
    <div
      className="svc-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`${service.title} details`}
      onClick={onClose}
    >
      <div
        className="svc-modal-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button className="svc-modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {/* Header */}
        <div className={`svc-modal-header ${isPopular ? 'svc-modal-header--popular' : ''}`}>
          {isPopular && <div className="svc-modal-popular-badge">Most Popular</div>}
          <div className="svc-modal-tier">{service.category?.categoryName ?? '—'}</div>
          <div className="svc-modal-icon">{getIcon(service.category?.categoryName)}</div>
          <h2 className="svc-modal-title">{service.title}</h2>
          {hasPrice && (
            <div className="svc-modal-price">
              <span className="svc-modal-price-label">Starting from</span>
              <span className="svc-modal-price-value">
                ₹{Number(service.price).toLocaleString('en-IN')}
              </span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="svc-modal-body">
          {/* Description */}
          <div className="svc-modal-section">
            <h3 className="svc-modal-section-title">Overview</h3>
            <p className="svc-modal-desc">{service.description}</p>
          </div>

          {/* Benefits */}
          <div className="svc-modal-section">
            <h3 className="svc-modal-section-title">What&apos;s Included</h3>
            <ul className="svc-modal-benefits">
              {(service.benefits || []).map((benefit, idx) => (
                <li key={idx} className="svc-modal-benefit-item">
                  <span className="svc-modal-check">✦</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <div className="svc-modal-cta-wrap">
            <a
              href="#contact"
              className={`svc-modal-cta ${isPopular ? 'svc-modal-cta--gold' : ''}`}
              onClick={onClose}
            >
              Get a Free Quote →
            </a>
            <button className="svc-modal-cta svc-modal-cta--outline" onClick={onClose}>
              Back to Packages
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
