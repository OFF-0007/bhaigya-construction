import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import Script from 'next/script';
import { api } from '@/lib/api';
import { Project } from '@/types/api';
import PortfolioClient from '@/components/PortfolioClient';
import { FALLBACK_PROJECTS } from '@/lib/projects';

export default async function ProjectsDirectory() {
  let projects: Project[] = FALLBACK_PROJECTS;

  try {
    const response = await api.getProjects();
    if (response?.data && Array.isArray(response.data)) {
      const active = response.data.filter((p) => p && p.isActive);
      if (active.length > 0) projects = active;
    }
  } catch (error) {
    console.error('Failed to fetch projects for directory:', error);
  }

  return (
    <>
      <Preloader />
      <Header />
      <main id="main-content" style={{ paddingTop: 'var(--header-h)' }}>
        <section className="portfolio section">
            <div className="container">
                <div className="section-label reveal-up">Our Masterpieces</div>
                <h2 className="section-title centered reveal-up">
                    Complete <span className="gold-text">Project Directory</span>
                </h2>
                <p className="section-sub centered reveal-up">
                    Browse our full suite of residential, commercial, and ultra-luxury developments.
                </p>

                {/* We render ALL projects evenly without a hard cut-off */}
                <div style={{ marginTop: '4rem' }}>
                    <PortfolioClient projects={projects} />
                </div>
            </div>
        </section>
      </main>
      <Footer />
      <Script src="/animations.js" strategy="afterInteractive" />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
