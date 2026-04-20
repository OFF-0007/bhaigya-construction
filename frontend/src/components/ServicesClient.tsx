'use client';

import { useState } from 'react';
import { ServicePackage } from '@/types/api';
import ServiceDetailModal from './ServiceDetailModal';

interface ServicesClientProps {
  services: ServicePackage[];
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

export default function ServicesClient({ services }: ServicesClientProps) {
  const [selectedService, setSelectedService] = useState<ServicePackage | null>(null);

  return (
    <>
      <div className="services-grid">
        {services.map((service) => {
          const isPopular = service.popularity === 'popular';
          return (
            <div
              key={service.id}
              className={`service-card reveal-up ${isPopular ? 'featured' : ''} ${service.imageUrl ? 'service-card--has-img' : ''}`}
              id={`service-${service.slug}`}
              onClick={() => setSelectedService(service)}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${service.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelectedService(service);
                }
              }}
              style={{
                cursor: 'pointer',
                ...(service.imageUrl
                  ? { 
                      backgroundImage: `url('${service.imageUrl}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                    }
                  : {}),
              }}
            >
              {isPopular && <div className="service-badge-top">Most Popular</div>}
              <div className="service-tier">{service.category?.categoryName ?? '—'}</div>
              <div className="service-icon">{getIcon(service.category?.categoryName)}</div>
              <h3 className="service-name">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              <ul className="service-features">
                {(service.benefits || []).slice(0, 5).map((benefit, idx) => (
                  <li key={idx}>
                    <span className="feat-check">✦</span> {benefit}
                  </li>
                ))}
                {(service.benefits || []).length > 5 && (
                  <li className="service-more-hint">
                    <span className="feat-check">+</span> {(service.benefits || []).length - 5} more included...
                  </li>
                )}
              </ul>
              <button
                className={`service-cta ${isPopular ? 'gold-cta' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedService(service);
                }}
                aria-label={`View full details for ${service.title}`}
              >
                View Details →
              </button>
            </div>
          );
        })}
      </div>

      {selectedService && (
        <ServiceDetailModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}
    </>
  );
}
