import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Government Rules for Construction in Assam 2026 | Bhaigya Construction',
  description: 'Updated 2026 guidelines, RERA regulations, building bye-laws, and municipality approvals required for building a house in Assam.',
  keywords: ['assam building rules 2026', 'gmc building permission', 'rera assam', 'house construction rules assam', 'bhaigya construction approvals'],
};

export default function BlogPost() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Government Rules for Construction in Assam 2026",
    "author": { "@type": "Organization", "name": "Bhaigya Construction" },
    "datePublished": "2026-04-30",
    "image": "https://bhaigyaconstruction.com/hero.jpeg",
    "publisher": {
      "@type": "Organization",
      "name": "Bhaigya Construction",
      "logo": { "@type": "ImageObject", "url": "https://bhaigyaconstruction.com/BGC.jpeg" }
    }
  };

  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--bg-dark)' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
          <Link href="/blog" style={{ color: 'var(--gold)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>← Back to Insights</Link>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>Government Rules & Approvals for Construction in Assam (2026 Update)</h1>
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: 'var(--grey-light)', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span>By Bhaigya Construction Legal Experts</span><span>•</span><span>Published April 30, 2026</span>
          </div>
          <div className="article-content" style={{ color: 'var(--grey-light)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>Building a house in Assam in 2026 involves strict adherence to modernized building bye-laws, designed to protect structures against the high seismic activity (Zone V) and heavy monsoon rainfall typical of the North East.</p>
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>1. GMC and Municipality Approvals</h2>
            <p style={{ marginBottom: '1.5rem' }}>If you are building within Guwahati Municipal Corporation (GMC) limits or any municipal board in Assam, obtaining a Building Permission (NOC) is mandatory before excavation. The 2026 regulations strictly require soil testing reports and structural designs vetted by registered empanelled engineers.</p>
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>2. Floor Area Ratio (FAR) & Setbacks</h2>
            <p style={{ marginBottom: '1.5rem' }}>Depending on your road width, the FAR determines how many floors you can build. For instance, a residential plot on a 15-foot road will have different vertical limits compared to a 30-foot road. Additionally, leaving standard setbacks (open space around the house) is rigidly enforced to allow emergency vehicle access.</p>
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>3. Earthquake Resilience Regulations</h2>
            <p style={{ marginBottom: '1.5rem' }}>Assam is in Seismic Zone V. Government regulations mandate the use of specific grades of TMT bars and concrete mixes (minimum M20 grade for structural elements). Plinth beams and lintel bands are legally required components of any structural drawing submitted for approval.</p>
            <div style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', borderLeft: '4px solid var(--gold)', padding: '2rem', marginTop: '3rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Need Help with Approvals?</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>At Bhaigya Construction, our turnkey packages include complete liaisoning with GMC and local panchayats. We handle your drawings, soil tests, and NOCs.</p>
              <Link href="/contact" style={{ color: 'var(--gold)', fontWeight: 'bold' }}>Contact us for a hassle-free build →</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
