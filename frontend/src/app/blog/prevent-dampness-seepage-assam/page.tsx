import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Preventing Dampness & Seepage in Assam Homes | Bhaigya Construction',
  description: 'Stop wall dampness and roof seepage in Assam. Learn about Dr. Fixit waterproofing, DPC layers, and anti-fungal exterior paints for the monsoon.',
  keywords: ['waterproofing assam', 'stop wall dampness guwahati', 'dr fixit waterproofing', 'seepage solution assam', 'anti fungal paint'],
};

export default function BlogPost() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Prevent Dampness and Seepage in Assam's Monsoon",
    "author": { "@type": "Organization", "name": "Bhaigya Construction" },
    "datePublished": "2026-04-10"
  };

  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--bg-dark)' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
          <Link href="/blog" style={{ color: 'var(--gold)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>← Back to Insights</Link>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>How to Prevent Dampness and Seepage in Assam's Monsoon</h1>
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: 'var(--grey-light)', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span>By Bhaigya Construction Quality Team</span><span>•</span><span>Published April 10, 2026</span>
          </div>
          <div className="article-content" style={{ color: 'var(--grey-light)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>Assam receives some of the heaviest rainfall in India. If your house isn't properly waterproofed during the civil construction phase, you will face peeling paint, black mold, and structural decay within the very first year.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>1. The Damp Proof Course (DPC)</h2>
            <p style={{ marginBottom: '1.5rem' }}>The most common cause of wall dampness is "capillary action"—water rising from the ground up through the brick walls. To stop this, a thick layer of concrete mixed with waterproofing chemicals (like Dr. Fixit LW+) must be laid at the plinth level. This acts as a barrier, preventing groundwater from climbing your walls.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>2. Roof and Terrace Waterproofing</h2>
            <p style={{ marginBottom: '1.5rem' }}>Flat RCC roofs are prone to water stagnation. When casting the roof slab, integral waterproofing compounds must be mixed with the concrete. After curing, a secondary elastomeric coating (like Dr. Fixit Roofseal) should be applied. Finally, proper sloping toward the rainwater drainage pipes is critical.</p>

            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>3. Exterior Wall Protection</h2>
            <p style={{ marginBottom: '1.5rem' }}>Assam's humidity causes rapid fungal growth on exterior walls. After plastering, the exterior must be primed with an anti-alkali primer, followed by premium weather-proof, anti-fungal exterior emulsions (like Asian Paints Apex Ultima Protek). Cheap distemper paints will wash away in a single monsoon.</p>
            
            <div style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', borderLeft: '4px solid var(--gold)', padding: '2rem', marginTop: '3rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Monsoon-Proof Your Home</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>At Bhaigya Construction, advanced waterproofing isn't an "add-on" service; it is built into our standard operating procedure. Your home will remain dry, safe, and beautiful for decades.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
