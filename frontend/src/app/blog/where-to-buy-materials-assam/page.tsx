import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Where to Buy Premium Construction Materials in Assam | Bhaigya Construction',
  description: 'A guide to sourcing cement, steel, sand, and interior materials in Guwahati, Jorhat, Dibrugarh, and across Assam.',
  keywords: ['hardware stores guwahati', 'where to buy cement assam', 'tata tiscon dealers assam', 'buy building materials assam'],
};

export default function BlogPost() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Where to Buy Premium Construction Materials in Assam",
    "author": { "@type": "Organization", "name": "Bhaigya Construction" },
    "datePublished": "2026-04-25"
  };

  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--bg-dark)' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
          <Link href="/blog" style={{ color: 'var(--gold)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>← Back to Insights</Link>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>Where to Buy Premium Construction Materials in Assam</h1>
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: 'var(--grey-light)', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span>By Bhaigya Construction</span><span>•</span><span>Published April 25, 2026</span>
          </div>
          <div className="article-content" style={{ color: 'var(--grey-light)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>If you are choosing to procure materials yourself rather than hiring a turnkey contractor, knowing the right markets in Assam is crucial to avoid counterfeit products and inflated prices.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>1. Steel and Cement (Primary Structure)</h2>
            <p style={{ marginBottom: '1.5rem' }}>For authentic Tata Tiscon, Shyam Steel, and Dalmia/UltraTech cement, it is always recommended to buy from authorized district distributors rather than small retail hardware shops. Guwahati's Athgaon and Fancy Bazar areas host major regional distributors where bulk discounts apply.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>2. Tiles, Marbles, and Sanitaryware</h2>
            <p style={{ marginBottom: '1.5rem' }}>Guwahati's Christian Basti and GS Road are the hubs for premium interior finishes. Showrooms for Kajaria, Somany, Jaquar, and Kohler have massive experience centers here. For those in Upper Assam, Jorhat's AT Road also features excellent multi-brand tile showrooms.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>3. Sand and Aggregates</h2>
            <p style={{ marginBottom: '1.5rem' }}>Raw natural materials are usually sourced through local syndicates and suppliers. Kanaighat sand can be ordered through major truck suppliers in your local district. Always inspect the truckload before dumping to ensure the sand isn't mixed with excessive soil.</p>
            
            <div style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', borderLeft: '4px solid var(--gold)', padding: '2rem', marginTop: '3rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Skip the hassle!</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Procuring materials is exhausting and risky. Bhaigya Construction has direct ties with factory distributors, ensuring your home is built with 100% authentic, premium materials at no extra headache to you.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
