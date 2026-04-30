import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Vastu Shastra Tips for Building a House in Assam | Bhaigya Construction',
  description: 'Essential Vastu Shastra principles for North East India. Learn where to place the kitchen, master bedroom, and entrance for prosperity.',
  keywords: ['vastu tips house', 'assam vastu design', 'northeast facing house', 'pooja room vastu', 'kitchen vastu direction', 'bhaigya construction floor plans'],
};

export default function BlogPost() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Vastu Shastra Tips for Building a House in North East India",
    "author": { "@type": "Organization", "name": "Bhaigya Construction" },
    "datePublished": "2026-04-05"
  };

  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--bg-dark)' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
          <Link href="/blog" style={{ color: 'var(--gold)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>← Back to Insights</Link>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>Vastu Shastra Tips for Building a House in North East India</h1>
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: 'var(--grey-light)', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span>By Bhaigya Architectural Design Team</span><span>•</span><span>Published April 5, 2026</span>
          </div>
          <div className="article-content" style={{ color: 'var(--grey-light)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>For generations, the principles of Vastu Shastra have been used to harmonize living spaces with cosmic energies. In Assam, integrating Vastu with proper ventilation to handle humidity is the secret to a peaceful, healthy home.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>The North-East Corner (Ishan Kona)</h2>
            <p style={{ marginBottom: '1.5rem' }}>This is the most sacred corner of the plot. It is highly recommended to place your <strong>Pooja Room</strong> or an open, well-ventilated living space here. Never place a bathroom or a heavy staircase in the North-East, as it is believed to block positive cosmic energy.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>The South-East Corner (Agni Kona)</h2>
            <p style={{ marginBottom: '1.5rem' }}>Ruled by the element of fire, the South-East is the absolute best direction for your <strong>Kitchen</strong>. Ensure that the person cooking faces East. This orientation is not only astrologically sound but also scientifically allows morning sunlight to kill kitchen bacteria.</p>

            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>The South-West Corner (Nairutya Kona)</h2>
            <p style={{ marginBottom: '1.5rem' }}>This zone represents earth and stability. It is the perfect location for the <strong>Master Bedroom</strong> or the room of the head of the family. The bed should be placed so that your head points South while sleeping.</p>

            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>Staircase and Toilets</h2>
            <p style={{ marginBottom: '1.5rem' }}>Staircases should ideally be built in the South, West, or South-West directions, turning clockwise as you ascend. Toilets and septic tanks should be relegated to the North-West or West, completely isolated from the sacred zones.</p>
            
            <div style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', borderLeft: '4px solid var(--gold)', padding: '2rem', marginTop: '3rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>100% Vastu-Compliant Floor Plans</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Bhaigya Construction's architects specialize in weaving strict Vastu principles into highly modern, aesthetic floor plans. We guarantee a home that brings prosperity and peace.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
