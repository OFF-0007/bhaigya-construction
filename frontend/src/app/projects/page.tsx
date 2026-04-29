import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import Script from 'next/script';
import { api } from '@/lib/api';
import { Project } from '@/types/api';
import PortfolioClient from '@/components/PortfolioClient';
import { FALLBACK_PROJECTS } from '@/lib/projects';

export const metadata: Metadata = {
  title: 'Projects — Our Luxury Construction Portfolio Across Assam',
  description: 'Browse Bhaigya Construction\'s complete portfolio of luxury residential and commercial projects across Assam. From ultra-luxury villas in Guwahati to commercial complexes in Bongaigaon — see our work across North East India.',
  alternates: { canonical: 'https://bhaigyaconstruction.com/projects' },
  openGraph: {
    title: 'Construction Projects Portfolio | Bhaigya Construction Assam',
    description: 'Explore 50+ completed luxury residential and commercial construction projects by Bhaigya Construction across Guwahati, Bongaigaon, and all of Assam.',
    url: 'https://bhaigyaconstruction.com/projects',
    images: [{ url: '/hero.jpeg', width: 1200, height: 630 }],
  },
};

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
                    <PortfolioClient projects={projects} unstructured={true} />
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
