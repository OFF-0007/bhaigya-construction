import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import Script from 'next/script';
import { api } from '@/lib/api';
import { OfficeBranch } from '@/types/api';
import BranchCard from '@/components/BranchCard';

export const metadata = {
  title: 'Our Offices & Branches — Bhaigya Construction Locations Across Assam',
  description: 'Find all Bhaigya Construction office locations across Assam including our Guwahati headquarters at Bhetapara Chariali and our Bongaigaon office. Get directions, contact details and office hours for every branch.',
  alternates: { canonical: 'https://bhaigyaconstruction.com/branches' },
  openGraph: {
    title: 'Bhaigya Construction Office Locations Across Assam',
    description: 'Find our construction company offices in Guwahati, Bongaigaon and other locations across Assam and North East India.',
    url: 'https://bhaigyaconstruction.com/branches',
    images: [{ url: '/hero.jpeg', width: 1200, height: 630 }],
  },
};

export default async function BranchesPage() {
  let branches: OfficeBranch[] = [];

  try {
    const response = await api.getOfficeBranches();
    if (response?.data && Array.isArray(response.data)) {
      branches = response.data;
    }
  } catch (error) {
    console.error('Failed to fetch branches:', error);
  }

  return (
    <>
      <Preloader />
      <Header />
      <main id="main-content" style={{ paddingTop: '120px', minHeight: '80vh' }}>
        <section className="branches section">
          <div className="container">
            <div className="section-label centered reveal-up">Our Network</div>
            <h1 className="section-title centered reveal-up">
              Our <span className="gold-text">Branches</span>
            </h1>
            <p className="section-sub centered reveal-up" style={{ marginBottom: '3rem', maxWidth: '600px', margin: '0 auto 40px' }}>
              Find our company locations and contact details. We are always ready to assist you.
            </p>

            {branches.length === 0 ? (
              <div className="centered" style={{ padding: '40px', background: 'rgba(197, 160, 89, 0.04)', border: '1px solid var(--gold-border)', borderRadius: 'var(--radius-lg)' }}>
                <p style={{ color: 'var(--grey-light)' }}>No branch locations are currently available. Please contact our main office.</p>
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
                {branches.map((branch) => (
                  <BranchCard key={branch.id} branch={branch} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
      <Script src="/animations.js" strategy="afterInteractive" />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
