import { api } from '@/lib/api';
import { Project } from '@/types/api';
import PortfolioClient from './PortfolioClient';
import { FALLBACK_PROJECTS } from '@/lib/projects';

export default async function Portfolio() {
  let projects: Project[] = FALLBACK_PROJECTS;

  try {
    const response = await api.getProjects();
    const fetchedProjects = response?.data;
    
    if (Array.isArray(fetchedProjects) && fetchedProjects.length > 0) {
      // Handle both camelCase and snake_case, and ensure we only take active ones
      const active = fetchedProjects.filter((p) => p && (p.isActive === true || (p as any).is_active === true || p.isActive === 1 || (p as any).is_active === 1));
      if (active.length > 0) {
        projects = active;
      }
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

        {Array.isArray(projects) && projects.length > 0 ? (
          <PortfolioClient projects={projects} isMainPage={true} />
        ) : (
          <div className="centered" style={{ padding: '40px', background: 'rgba(197, 160, 89, 0.04)', border: '1px solid var(--gold-border)', borderRadius: 'var(--radius-lg)' }}>
            <p style={{ color: 'var(--grey-light)' }}>No signature projects are currently available.</p>
          </div>
        )}

        <div className="centered" style={{ marginTop: '3rem' }}>
          <a href="/projects" className="btn-gold">
            See Complete Directory →
          </a>
        </div>
      </div>
    </section>
  );
}
