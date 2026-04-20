import { api } from '@/lib/api';
import { Project } from '@/types/api';
import PortfolioClient from './PortfolioClient';
import { FALLBACK_PROJECTS } from '@/lib/projects';

export default async function Portfolio() {
  let projects: Project[] = FALLBACK_PROJECTS;

  try {
    const response = await api.getProjects();
    if (response?.data && Array.isArray(response.data)) {
      const active = response.data.filter((p) => p && p.isActive);
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

        <div className="centered" style={{ marginTop: '3rem' }}>
          <a href="/projects" className="btn-gold">
            See Complete Directory →
          </a>
        </div>
      </div>
    </section>
  );
}
