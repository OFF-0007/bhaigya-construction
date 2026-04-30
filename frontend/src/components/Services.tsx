import { api } from '@/lib/api';
import { ServicePackage } from '@/types/api';
import ServicesClient from './ServicesClient';

export const FALLBACK_SERVICES: ServicePackage[] = [
  {
    id: 1,
    categoryId: 1,
    title: "Luxury Finishes",
    slug: "luxury-class",
    description: "Full finishing including Electrical, Plumbing, Sanitary, False Ceiling, and Full Modular Kitchen. A harmonious blend of comfort, aesthetics, and sophistication.",
    image: null,
    imageUrl: "/portfolio_villa.png",
    benefits: [
      "Durgapur Brand TMT Rods & Premium Cement",
      "Full Modular Kitchen with Granite Top & TV Cabinet",
      "Premium Paint (Asian / Berger / Indigo)",
      "Double Charge & Digital Floor Tiles (2x4, 2x2)",
      "False Ceiling with Gypsum/PVC & Chain Lights",
      "Segun Wood Main Door & Premium Hardware"
    ],
    isActive: true,
    popularity: "popular",
    price: "0",
    isFeatured: true,
    category: {
      id: 1,
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
    id: 2,
    categoryId: 2,
    title: "Standard Excellence",
    slug: "a-class",
    description: "Complete construction and finishing including Electrical, Plumbing, Putty Colour, False Ceiling, and a Semi Modular Kitchen.",
    image: null,
    imageUrl: "/portfolio_apartment.png",
    benefits: [
      "Zeecon/Lotus/Zara Rods & Standard Cement",
      "Semi Modular Kitchen in L Shape with Slab Tiles",
      "False Ceiling with 6+3 Color Lights",
      "Asian Paints (Premium & Apex inner/outer)",
      "Double Charge & Digital Floor Tiles (2x2)",
      "Segun Wood Main Door & Quality Sanitary Fittings"
    ],
    isActive: true,
    popularity: "none",
    price: "0",
    isFeatured: false,
    category: {
      id: 2,
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
    id: 3,
    categoryId: 3,
    title: "Core Civil Work",
    slug: "b-class",
    description: "Core Civil work only. Foundation, slab, bricks, plaster, electric concealing, and door/window frames.",
    image: null,
    imageUrl: "/portfolio_office.png",
    benefits: [
      "Foundation, Slab & RCC Framework (M20)",
      "Red Bricks / AAC Block Masonry",
      "Electrical Concealing",
      "First Class Wood / TATA Steel Door Frames",
      "Basic L-Shape Kitchen Slab",
      "Septic Tank (7ft x 13ft)"
    ],
    isActive: true,
    popularity: "none",
    price: "0",
    isFeatured: false,
    category: {
      id: 3,
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
      const active = response.data.filter(s => s && s.isActive);
      // Only override if the backend specifically has these packages correctly set up,
      // but for now, we'll force the frontend fallback so the new changes display immediately.
      if (active.length > 0) {
        // Uncomment to use API data:
        // services = active; 
      }
    }
  } catch (error) {
    console.error('Failed to fetch services:', error);
  }

  // Enforce the new 3-tier structure
  services = FALLBACK_SERVICES;

  return (
    <section id="services" className="services section dark-section" aria-labelledby="services-heading">
      <div className="container">
        <div className="section-label reveal-up">What We Build</div>
        <h2 id="services-heading" className="section-title centered reveal-up">
          Our <span className="gold-text">Service Packages</span>
        </h2>
        <p className="section-sub centered reveal-up">
          Three distinct construction tiers — each engineered for a different vision of excellence.
        </p>

        <ServicesClient services={services} />
      </div>
    </section>
  );
}
