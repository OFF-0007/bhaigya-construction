import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Choosing the Best Rod (TMT Bar) for Earthquake Safety | Bhaigya Construction',
  description: 'Which Rod is best for house construction in Assam? Learn about Tata Tiscon, Shyam Steel, and why FE-500D TMT bars are essential for Zone V.',
  keywords: ['best rod for house construction', 'tmt bar assam', 'tata tiscon price guwahati', 'fe500d steel assam', 'earthquake proof steel'],
};

export default function BlogPost() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Choosing the Best Rod (TMT Bar) for Earthquake Safety",
    "author": { "@type": "Organization", "name": "Bhaigya Construction" },
    "datePublished": "2026-02-28"
  };

  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--bg-dark)' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
          <Link href="/blog" style={{ color: 'var(--gold)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>← Back to Insights</Link>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>Choosing the Best Rod (TMT Bar) for Earthquake Safety in Assam</h1>
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: 'var(--grey-light)', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span>By Bhaigya Structural Experts</span><span>•</span><span>Published February 28, 2026</span>
          </div>
          <div className="article-content" style={{ color: 'var(--grey-light)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>When building an RCC house in Assam (Seismic Zone V), the steel reinforcement—commonly known simply as <strong>Rod</strong>—is the backbone of your home. If an earthquake hits, it is the flexibility of the <em>Rod</em> that prevents the concrete from snapping.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>Why You Must Use Fe-500D Grade</h2>
            <p style={{ marginBottom: '1.5rem' }}>Never settle for anything less than Fe-500D grade TMT (Thermo Mechanically Treated) bars. The "D" stands for Ductility. Highly ductile <em>Rods</em> can bend significantly under the stress of an earthquake without breaking, absorbing the seismic shockwaves.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>Primary vs Secondary Steel</h2>
            <p style={{ marginBottom: '1.5rem' }}>Primary steel is made directly from iron ore, ensuring perfect chemical composition. Brands like <strong>Tata Tiscon</strong>, <strong>SAIL</strong>, and <strong>JSW Neosteel</strong> fall into this category. Secondary steel is made from melted scrap metal and is cheaper, but it often lacks the strict quality control required for a high-risk zone like Assam.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>Beware of Rusting</h2>
            <p style={{ marginBottom: '1.5rem' }}>Because of Assam's extreme humidity and rainfall, storing your <em>Rod</em> improperly on site will lead to heavy rusting. While slight surface rust is okay, deep flaking rust destroys the steel's ability to bond with the concrete. Always store TMT bars on raised wooden planks and cover them with tarpaulin.</p>
            
            <div style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', borderLeft: '4px solid var(--gold)', padding: '2rem', marginTop: '3rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Uncompromising Strength</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>At Bhaigya Construction, we exclusively use premium Primary Steel (like Tata Tiscon or Shyam Steel) in our A-Class and Luxury packages. We design your home to stand strong against anything nature throws at it.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
