import { api } from '@/lib/api';
import { Project } from '@/types/api';

const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    projectName: "Luxury Villa, Guwahati",
    slug: "luxury-villa-guwahati",
    description: "A magnificent luxury residence with bespoke premium finishes and end-to-end interior styling. The epitome of Assam's modern living.",
    isActive: true,
    isFeatured: true,
    projectType: {
      id: 5,
      name: "ULTRA LUXURY",
      slug: "villa",
      description: "Independent villa",
      status: "active"
    },
    primaryImage: {
      id: 1,
      projectId: 1,
      fileUrl: "/portfolio_villa.png",
      altText: "Luxury Villa",
      isPrimary: true
    },
    createdAt: ""
  },
  {
    id: 2,
    projectName: "Commercial Office Complex",
    slug: "commercial-office-complex",
    description: "Ultra-Luxury class commercial development in North East India's business corridor.",
    isActive: true,
    isFeatured: false,
    projectType: {
      id: 2,
      name: "LUXURY CLASS",
      slug: "commercial",
      description: "Office buildings",
      status: "active"
    },
    primaryImage: {
      id: 2,
      projectId: 2,
      fileUrl: "/portfolio_office.png",
      altText: "Commercial Office",
      isPrimary: true
    },
    createdAt: ""
  },
  {
    id: 3,
    projectName: "Modern Apartment Complex",
    slug: "modern-apartment-complex",
    description: "Urban efficiency meets premium finishing — a signature residential development.",
    isActive: true,
    isFeatured: false,
    projectType: {
      id: 1,
      name: "A CLASS",
      slug: "apartment",
      description: "Apartment complex",
      status: "active"
    },
    primaryImage: {
      id: 3,
      projectId: 3,
      fileUrl: "/portfolio_apartment.png",
      altText: "Apartment Complex",
      isPrimary: true
    },
    createdAt: ""
  },
  {
    id: 4,
    projectName: "Modern Farmhouse Retreat",
    slug: "modern-farmhouse-retreat",
    description: "A bespoke countryside retreat blending modern design with natural elements of Assam.",
    isActive: true,
    isFeatured: false,
    projectType: {
      id: 4,
      name: "ULTRA LUXURY",
      slug: "farmhouse",
      description: "Farmhouse retreat",
      status: "active"
    },
    primaryImage: {
      id: 4,
      projectId: 4,
      fileUrl: "/portfolio_farmhouse.png",
      altText: "Farmhouse Retreat",
      isPrimary: true
    },
    createdAt: ""
  },
  {
    id: 5,
    projectName: "Educational Facility",
    slug: "educational-facility",
    description: "State-of-the-art academic infrastructure built to inspire and endure.",
    isActive: true,
    isFeatured: false,
    projectType: {
      id: 10,
      name: "INSTITUTIONAL",
      slug: "institutional",
      description: "Academic infrastructure",
      status: "active"
    },
    primaryImage: null,
    createdAt: ""
  }
];

export default async function Portfolio() {
  let projects: Project[] = FALLBACK_PROJECTS;

  try {
    const response = await api.getProjects();
    if (response && response.data) {
      projects = response.data.filter(p => p.isActive);
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
        <p className="section-sub centered reveal-up">Crafted across Assam and North East India — each project a testament to uncompromising quality.</p>

        <div className="portfolio-grid">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={`portfolio-item ${project.isFeatured ? 'large' : ''} reveal-up`} 
              id={`portfolio-${project.slug}`}
            >
              {project.primaryImage?.fileUrl ? (
                <div 
                  className="portfolio-img" 
                  style={{ backgroundImage: `url('${project.primaryImage.fileUrl}')` }} 
                  role="img" 
                  aria-label={`${project.projectName} by Bhaigya Construction`}
                ></div>
              ) : (
                <div className="portfolio-img portfolio-img-placeholder" role="img" aria-label={`${project.projectName} by Bhaigya Construction`}>
                  <div className="portfolio-placeholder-icon">🏗️</div>
                </div>
              )}
              <div className="portfolio-overlay">
                <div className="portfolio-tag">{project.projectType.name}</div>
                <h3 className="portfolio-title">{project.projectName}</h3>
                <p className="portfolio-sub">{project.description}</p>
                <a href="#contact" className="portfolio-link">Enquire →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
