import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'How to Calculate Ita, Bali, and Pathor for Your House | Bhaigya Construction',
  description: 'A simple 2026 guide to calculating the exact amount of Ita (Bricks), Bali (Sand), and Pathor (Stones) needed for building a house in Assam.',
  keywords: ['ita bali pathor calculation', 'bricks calculation assam', 'sand requirements for house', 'how much pathor needed', 'assam construction materials'],
};

export default function BlogPost() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How to Calculate Ita, Bali, and Pathor for Your New House",
    "author": { "@type": "Organization", "name": "Bhaigya Construction" },
    "datePublished": "2026-03-10"
  };

  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--bg-dark)' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
          <Link href="/blog" style={{ color: 'var(--gold)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>← Back to Insights</Link>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>How to Calculate Ita, Bali, and Pathor for Your New House</h1>
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: 'var(--grey-light)', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span>By Bhaigya Cost Estimators</span><span>•</span><span>Published March 10, 2026</span>
          </div>
          <div className="article-content" style={{ color: 'var(--grey-light)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>One of the biggest worries when starting a house is getting cheated by suppliers. Knowing how to calculate exactly how much <strong>Ita</strong> (bricks), <strong>Bali</strong> (sand), and <strong>Pathor</strong> (stone chips) you need is crucial for any homeowner in Assam in 2026.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>1. Calculating Ita (Bricks)</h2>
            <p style={{ marginBottom: '1.5rem' }}>For a standard 9-inch exterior wall, you will need approximately 10 to 11 <em>Ita</em> per square foot of wall area. For a 4.5-inch interior partition wall, you need about 5 <em>Ita</em> per square foot. Always order First-Class Red Bricks (A-Class Ita) for the outer walls to prevent moisture from seeping in during the heavy monsoons.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>2. Calculating Bali (Sand)</h2>
            <p style={{ marginBottom: '1.5rem' }}><em>Bali</em> is used for two main things: RCC casting (pillars and slabs) and plastering. For structural casting, always demand coarse <strong>Kanaighat Bali</strong> or high-grade Brahmaputra sand. For plastering, a finer <em>Bali</em> is needed to get a smooth wall finish. As a thumb rule, for a 1000 sq.ft house, you will need around 1,500 to 1,800 cubic feet (cft) of sand.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>3. Calculating Pathor (Stone Chips)</h2>
            <p style={{ marginBottom: '1.5rem' }}><em>Pathor</em> gives the concrete its strength. You will mostly use 20mm and 10mm <em>Pathor</em>. For every 1000 sq.ft of RCC slab casting, you generally require about 800 to 900 cft of <em>Pathor</em>. Never compromise on the quality of stone chips—avoid flaky stones and insist on solid black crushed stone from certified quarries.</p>
            
            <div style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', borderLeft: '4px solid var(--gold)', padding: '2rem', marginTop: '3rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>We Handle the Math for You</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Calculating raw materials is exhausting, and dealing with suppliers can be stressful. With Bhaigya Construction's Turnkey packages, we procure the finest <em>Ita, Bali, and Pathor</em> with 100% transparent billing.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
