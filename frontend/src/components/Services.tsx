import { api } from '@/lib/api';
import { ServicePackage } from '@/types/api';
import ServicesClient from './ServicesClient';

const FALLBACK_SERVICES: ServicePackage[] = [
  {
    id: 1,
    categoryId: 1,
    title: "Standard Excellence",
    slug: "standard-excellence",
    description: "Solid construction with quality materials — perfect for value-conscious homeowners who refuse to compromise on standards.",
    image: null,
    imageUrl: null,
    benefits: [
      "Standard Electrical & Plumbing Systems",
      "Premium Paint Finishes",
      "Tiles up to ₹50 / sq.ft",
      "Partial False Ceiling (Living Room)",
      "Quality Sanitary Fixtures",
      "Structural Warranty"
    ],
    isActive: true,
    popularity: "none",
    price: "0",
    isFeatured: false,
    category: {
      id: 1,
      categoryName: "A CLASS",
      isActive: true,
      type: "package",
      createdAt: "",
      updatedAt: ""
    },
    createdAt: "",
    updatedAt: ""
  },
  {
    id: 2,
    categoryId: 2,
    title: "Premium Finishes",
    slug: "premium-finishes",
    description: "Elevated interiors with luxury finishes — a harmonious blend of comfort, aesthetics, and sophistication.",
    image: null,
    imageUrl: null,
    benefits: [
      "Premium Electrical & Plumbing",
      "Luxury Paint (Asian Paints / Berger)",
      "Tiles up to ₹65 / sq.ft",
      "Full False Ceiling (Drawing & Master)",
      "Premium Sanitary & CP Fittings",
      "Modular Kitchen Provision"
    ],
    isActive: true,
    popularity: "popular",
    price: "0",
    isFeatured: true,
    category: {
      id: 2,
      categoryName: "LUXURY CLASS",
      isActive: true,
      type: "package",
      createdAt: "",
      updatedAt: ""
    },
    createdAt: "",
    updatedAt: ""
  },
  {
    id: 3,
    categoryId: 3,
    title: "Bespoke High-End",
    slug: "bespoke-high-end",
    description: "A completely bespoke experience — globally sourced materials, end-to-end interior styling, and uncompromising attention to every detail.",
    image: null,
    imageUrl: null,
    benefits: [
      "Bespoke High-End Finishes",
      "Global Material Sourcing",
      "End-to-End Interior Styling",
      "Smart Home Integration",
      "Dedicated Project Manager",
      "Lifetime Structural Support"
    ],
    isActive: true,
    popularity: "none",
    price: "0",
    isFeatured: false,
    category: {
      id: 3,
      categoryName: "ULTRA LUXURY",
      isActive: true,
      type: "package",
      createdAt: "",
      updatedAt: ""
    },
    createdAt: "",
    updatedAt: ""
  },
  {
    id: 4,
    categoryId: 4,
    title: "Core Civil Work",
    slug: "core-civil-work",
    description: "Structural excellence without compromise — robust civil engineering forming the backbone of every great build.",
    image: null,
    imageUrl: null,
    benefits: [
      "Foundation & Structural Work",
      "RCC Framework & Slab",
      "Brick & Block Masonry",
      "Waterproofing Treatment",
      "Plastering & Pointing",
      "BIS Certified Materials"
    ],
    isActive: true,
    popularity: "none",
    price: "0",
    isFeatured: false,
    category: {
      id: 4,
      categoryName: "B CLASS",
      isActive: true,
      type: "package",
      createdAt: "",
      updatedAt: ""
    },
    createdAt: "",
    updatedAt: ""
  }
];

export default async function Services() {
  let services: ServicePackage[] = FALLBACK_SERVICES;

  try {
    const response = await api.getServicePackages();
    if (response && response.data && Array.isArray(response.data)) {
      const active = response.data.filter(s => s.isActive);
      if (active.length > 0) {
        services = active;
      }
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
        <p className="section-sub centered reveal-up">
          Four distinct construction tiers — each engineered for a different vision of excellence.
        </p>

        <ServicesClient services={services} />
      </div>
    </section>
  );
}
