'use client';

import { ServicePackage } from '@/types/api';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface ServicesClientProps {
  services: ServicePackage[];
}

export default function ServicesClient({ services }: ServicesClientProps) {
  const router = useRouter();

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
              onClick={() => router.push(`/services/${service.slug}`)}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${service.title}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  router.push(`/services/${service.slug}`);
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              {isPopular && <div className="service-badge-top">Most Popular</div>}
              
              {service.imageUrl && (
                <div 
                  className="service-img-top"
                  style={{
                    position: 'relative',
                    height: '200px',
                    width: '100%'
                  }}
                >
                  <Image
                    src={service.imageUrl}
                    alt={`${service.title} Package`}
                    fill
                    style={{ objectFit: 'cover' }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              
              <div className="service-card-body">
              <div className="service-tier">{service.category?.categoryName ?? '—'}</div>
              <h3 className="service-name">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              <ul className="service-features">
                {(service.benefits || []).slice(0, 3).map((benefit, idx) => (
                  <li key={idx}>
                    <span className="feat-check">✦</span> {benefit}
                  </li>
                ))}
                {(service.benefits || []).length > 3 && (
                  <li className="service-more-hint">
                    <span className="feat-check">+</span> {(service.benefits || []).length - 3} more included...
                  </li>
                )}
              </ul>
                <button
                  className={`service-cta ${isPopular ? 'gold-cta' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/services/${service.slug}`);
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
