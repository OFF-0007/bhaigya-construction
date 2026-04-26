'use client';

import { ServicePackage } from '@/types/api';

interface ServicesClientProps {
  services: ServicePackage[];
}

export default function ServicesClient({ services }: ServicesClientProps) {

  return (
    <>
      <div className="services-grid">
        {services.map((service) => {
          const isPopular = service.popularity === 'popular';
          return (
            <div
              key={service.id}
              className={`service-card reveal-up ${isPopular ? 'featured' : ''} ${service.imageUrl ? 'has-image' : ''}`}
              id={`service-${service.slug}`}
              onClick={() => window.location.href = `/services/${service.slug}`}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${service.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  window.location.href = `/services/${service.slug}`;
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              {isPopular && <div className="service-badge-top">Most Popular</div>}
              
              {service.imageUrl && (
                <div 
                  className="service-img-top"
                  style={{
                    backgroundImage: `url('${service.imageUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '200px',
                    width: '100%'
                  }}
                />
              )}
              
              <div className="service-card-body">
              <div className="service-tier">{service.category?.categoryName ?? '—'}</div>
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
                    window.location.href = `/services/${service.slug}`;
                  }}
                  aria-label={`View full details for ${service.title}`}
                >
                  View Details →
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
