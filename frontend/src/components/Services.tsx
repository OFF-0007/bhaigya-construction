import { api } from '@/lib/api';
import { ServicePackage } from '@/types/api';

const FALLBACK_SERVICES: ServicePackage[] = [
  {
    id: 1,
    title: "Standard Excellence",
    slug: "standard-excellence",
    description: "Solid construction with quality materials — perfect for value-conscious homeowners who refuse to compromise on standards.",
    benefits: [
      "Standard Electrical & Plumbing Systems",
      "Premium Paint Finishes",
      "Tiles up to ₹50 / sq.ft",
      "Partial False Ceiling (Living Room)",
      "Quality Sanitary Fixtures",
      "Structural Warranty"
    ],
    is_active: true,
    popularity: "none",
    price: "0",
    is_featured: false,
    category: {
      id: 1,
      category_name: "A CLASS",
      is_active: true,
      type: "package",
      createdAt: ""
    },
    createdAt: ""
  },
  {
    id: 2,
    title: "Premium Finishes",
    slug: "premium-finishes",
    description: "Elevated interiors with luxury finishes — a harmonious blend of comfort, aesthetics, and sophistication.",
    benefits: [
      "Premium Electrical & Plumbing",
      "Luxury Paint (Asian Paints / Berger)",
      "Tiles up to ₹65 / sq.ft",
      "Full False Ceiling (Drawing & Master)",
      "Premium Sanitary & CP Fittings",
      "Modular Kitchen Provision"
    ],
    is_active: true,
    popularity: "popular",
    price: "0",
    is_featured: true,
    category: {
      id: 2,
      category_name: "LUXURY CLASS",
      is_active: true,
      type: "package",
      createdAt: ""
    },
    createdAt: ""
  },
  {
    id: 3,
    title: "Bespoke High-End",
    slug: "bespoke-high-end",
    description: "A completely bespoke experience — globally sourced materials, end-to-end interior styling, and uncompromising attention to every detail.",
    benefits: [
      "Bespoke High-End Finishes",
      "Global Material Sourcing",
      "End-to-End Interior Styling",
      "Smart Home Integration",
      "Dedicated Project Manager",
      "Lifetime Structural Support"
    ],
    is_active: true,
    popularity: "none",
    price: "0",
    is_featured: false,
    category: {
      id: 3,
      category_name: "ULTRA LUXURY",
      is_active: true,
      type: "package",
      createdAt: ""
    },
    createdAt: ""
  },
  {
    id: 4,
    title: "Core Civil Work",
    slug: "core-civil-work",
    description: "Structural excellence without compromise — robust civil engineering forming the backbone of every great build.",
    benefits: [
      "Foundation & Structural Work",
      "RCC Framework & Slab",
      "Brick & Block Masonry",
      "Waterproofing Treatment",
      "Plastering & Pointing",
      "BIS Certified Materials"
    ],
    is_active: true,
    popularity: "none",
    price: "0",
    is_featured: false,
    category: {
      id: 4,
      category_name: "B CLASS",
      is_active: true,
      type: "package",
      createdAt: ""
    },
    createdAt: ""
  }
];

const getIcon = (categoryName: string) => {
  const cat = categoryName.toUpperCase();
  if (cat.includes('A CLASS')) return '🏠';
  if (cat.includes('LUXURY CLASS')) return '🏛️';
  if (cat.includes('ULTRA LUXURY')) return '💎';
  if (cat.includes('B CLASS')) return '🏗️';
  return '🏗️';
};

export default async function Services() {
  let services: ServicePackage[] = FALLBACK_SERVICES;

  try {
    const response = await api.getServicePackages();
    if (response && response.data) {
      services = response.data.filter(s => s.is_active);
    }
  } catch (error) {
    console.error('Failed to fetch services:', error);
    // Fallback to static data
  }

  return (
    <section id="services" className="services section dark-section" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-label reveal-up">What We Build</div>
        <h2 id="services-heading" className="section-title centered reveal-up">
          Our <span className="gold-text">Service Packages</span>
        </h2>
        <p className="section-sub centered reveal-up">Four distinct construction tiers — each engineered for a different vision of excellence.</p>

        <div className="services-grid">
          {services.map((service) => {
            const isPopular = service.popularity === 'popular';
            return (
              <div 
                key={service.id} 
                className={`service-card reveal-up ${isPopular ? 'featured' : ''}`} 
                id={`service-${service.slug}`}
              >
                {isPopular && <div className="service-badge-top">Most Popular</div>}
                <div className="service-tier">{service.category.category_name}</div>
                <div className="service-icon">{getIcon(service.category.category_name)}</div>
                <h3 className="service-name">{service.title}</h3>
                <p className="service-desc">{service.description}</p>
                <ul className="service-features">
                  {service.benefits.map((benefit, idx) => (
                    <li key={idx}>
                      <span className="feat-check">✦</span> {benefit}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`service-cta ${isPopular ? 'gold-cta' : ''}`}>
                  Get Quote →
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
