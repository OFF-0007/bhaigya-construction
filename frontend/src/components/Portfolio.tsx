import { api } from '@/lib/api';
import { Project } from '@/types/api';
import PortfolioClient from './PortfolioClient';

const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    projectName: 'Luxury Villa, Guwahati',
    slug: 'luxury-villa-guwahati',
    description: 'A magnificent luxury residence with bespoke premium finishes and end-to-end interior styling. The epitome of modern living in Assam.',
    projectLocation: 'Guwahati',
    address: null, latitude: null, longitude: null,
    projectStartDate: null, projectCompletionDate: null,
    numberOfRooms: null, numberOfFloors: null, numberOfWashrooms: null,
    totalArea: null, carpetArea: null, areaUnit: 'sqft',
    status: 'completed',
    isActive: true, isFeatured: true, isCompleted: true, isWorking: false,
    createdAt: '',
    projectType: { id: 1, name: 'ULTRA LUXURY', slug: 'villa', description: '', status: 'active' },
    district: null, serviceCategory: null, servicePackage: null,
    primaryImage: { id: 1, projectId: 1, fileUrl: '/portfolio_villa.png', altText: 'Luxury Villa', isPrimary: true },
    images: [], documents: [], owners: [], amenities: [], progress: [], videos: [], rooms: [],
  },
  {
    id: 2,
    projectName: 'Commercial Office Complex',
    slug: 'commercial-office-complex',
    description: 'Ultra-Luxury class commercial development in North East India\'s business corridor.',
    projectLocation: 'Dispur, Guwahati',
    address: null, latitude: null, longitude: null,
    projectStartDate: null, projectCompletionDate: null,
    numberOfRooms: null, numberOfFloors: 6, numberOfWashrooms: null,
    totalArea: null, carpetArea: null, areaUnit: 'sqft',
    status: 'ongoing',
    isActive: true, isFeatured: false, isCompleted: false, isWorking: true,
    createdAt: '',
    projectType: { id: 2, name: 'COMMERCIAL', slug: 'commercial', description: '', status: 'active' },
    district: null, serviceCategory: null, servicePackage: null,
    primaryImage: { id: 2, projectId: 2, fileUrl: '/portfolio_office.png', altText: 'Office Complex', isPrimary: true },
    images: [], documents: [], owners: [], amenities: [], progress: [], videos: [], rooms: [],
  },
  {
    id: 3,
    projectName: 'Modern Apartment Complex',
    slug: 'modern-apartment-complex',
    description: 'Urban efficiency meets premium finishing — a signature residential development.',
    projectLocation: 'Jorhat, Assam',
    address: null, latitude: null, longitude: null,
    projectStartDate: null, projectCompletionDate: null,
    numberOfRooms: 24, numberOfFloors: 4, numberOfWashrooms: null,
    totalArea: null, carpetArea: null, areaUnit: 'sqft',
    status: 'completed',
    isActive: true, isFeatured: false, isCompleted: true, isWorking: false,
    createdAt: '',
    projectType: { id: 3, name: 'RESIDENTIAL', slug: 'apartment', description: '', status: 'active' },
    district: null, serviceCategory: null, servicePackage: null,
    primaryImage: { id: 3, projectId: 3, fileUrl: '/portfolio_apartment.png', altText: 'Apartment Complex', isPrimary: true },
    images: [], documents: [], owners: [], amenities: [], progress: [], videos: [], rooms: [],
  },
];

export default async function Portfolio() {
  let projects: Project[] = FALLBACK_PROJECTS;

  try {
    const response = await api.getProjects();
    if (response?.data && Array.isArray(response.data)) {
      const active = response.data.filter((p) => p.isActive);
      if (active.length > 0) projects = active;
    }
  } catch (error) {
    console.error('Failed to fetch projects:', error);
  }

  return (
    <section id="portfolio" className="portfolio section" aria-labelledby="portfolio-heading">
      <div className="container">
        <div className="section-label reveal-up">Featured Works</div>
        <h2 id="portfolio-heading" className="section-title centered reveal-up">
          Our <span className="gold-text">Signature Projects</span>
        </h2>
        <p className="section-sub centered reveal-up">
          Crafted across Assam and North East India — each project a testament to uncompromising quality.
        </p>

        <PortfolioClient projects={projects} />
      </div>
    </section>
  );
}
