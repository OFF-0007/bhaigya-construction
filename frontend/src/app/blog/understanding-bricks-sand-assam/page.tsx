import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Ultimate Guide to Bricks, Sand & Stones in Assam | Bhaigya Construction',
  description: 'Understand the difference between Class A and Class B bricks, Kanaighat sand, and the best building materials for construction in Assam.',
  keywords: ['kanaighat sand', 'class a vs class b bricks assam', 'best sand for construction in assam', 'building materials assam', 'bhaigya construction materials'],
};

export default function BlogPost() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "The Ultimate Guide to Bricks, Sand & Stones in Assam",
    "author": { "@type": "Organization", "name": "Bhaigya Construction" },
    "datePublished": "2026-04-28",
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
          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>The Ultimate Guide to Bricks, Sand & Stones in Assam</h1>
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: 'var(--grey-light)', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span>By Bhaigya Construction Procurement Team</span><span>•</span><span>Published April 28, 2026</span>
          </div>
          <div className="article-content" style={{ color: 'var(--grey-light)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>Selecting the right raw building materials is the most critical decision you will make. In Assam, the local geography provides unique materials, and understanding what to ask for can save your home from dampness and structural issues.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>A-Class vs B-Class Bricks</h2>
            <p style={{ marginBottom: '1.5rem' }}><strong>Class A (First Class) Bricks:</strong> These are machine-pressed or perfectly molded, thoroughly burnt in kilns. They have a deep red color, uniform shape, and emit a metallic ringing sound when struck together. They absorb less than 20% of their weight in water, making them essential for load-bearing walls and exteriors in Assam's rainy climate.</p>
            <p style={{ marginBottom: '1.5rem' }}><strong>Class B (Second Class) Bricks:</strong> Slightly irregular in shape and may have minor cracks. They absorb up to 22% water. While cheaper, they should only be used for interior partition walls, never for the main exterior envelope.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>The Gold Standard: Kanaighat Sand</h2>
            <p style={{ marginBottom: '1.5rem' }}>When builders in Assam talk about premium sand, they mention <strong>Kanaighat Sand</strong>. Sourced primarily from riverbeds, this coarse sand is free from silt and organic impurities. Using coarse river sand (like Kanaighat or high-quality Brahmaputra sand) is absolutely vital for RCC (Reinforced Cement Concrete) works like slabs and columns. For plastering walls, a finer grade of sand is used to ensure a smooth finish.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>Stone Chips (Aggregates)</h2>
            <p style={{ marginBottom: '1.5rem' }}>Black stone chips (usually 20mm and 10mm down) from certified quarries in Karbi Anglong or Bhutan borders are preferred. Avoid cheap, flaky stones as they drastically reduce the compressive strength of your concrete.</p>
            
            <div style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', borderLeft: '4px solid var(--gold)', padding: '2rem', marginTop: '3rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>We use only the best.</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>At Bhaigya Construction, we never compromise on raw materials. We source Grade-A red bricks, premium Kanaighat sand, and IS-certified aggregates for every project.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
