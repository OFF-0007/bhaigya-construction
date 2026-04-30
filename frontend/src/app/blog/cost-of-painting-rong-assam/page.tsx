import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'The True Cost of Painting (Rong) Your House in Assam | Bhaigya',
  description: 'How much does Rong (painting) cost in Assam? Learn about putty, Asian Paints primer, and avoiding peeling paint during the monsoon.',
  keywords: ['house painting cost assam', 'rong cost guwahati', 'asian paints price assam', 'wall putty cost', 'weatherproof paint assam'],
};

export default function BlogPost() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "The True Cost of Painting (Rong) Your House in Assam",
    "author": { "@type": "Organization", "name": "Bhaigya Construction" },
    "datePublished": "2026-02-10"
  };

  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--bg-dark)' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
          <Link href="/blog" style={{ color: 'var(--gold)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>← Back to Insights</Link>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>The True Cost of Painting (Rong) Your House in Assam</h1>
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: 'var(--grey-light)', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span>By Bhaigya Finishing Team</span><span>•</span><span>Published February 10, 2026</span>
          </div>
          <div className="article-content" style={{ color: 'var(--grey-light)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>Applying <strong>Rong</strong> (paint) is the final, most satisfying step of building your house. However, many homeowners in Assam make the mistake of using cheap interior distemper or skipping primer, leading to peeling walls after just one monsoon season.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>1. The Importance of Wall Putty</h2>
            <p style={{ marginBottom: '1.5rem' }}>Before a single drop of <em>Rong</em> touches the wall, you need Wall Putty. Putty fills the pores in the cement plaster and provides a smooth, white base. In Assam's humid climate, applying two coats of high-quality waterproof putty (like Birla White or Asian Paints TruCare) is non-negotiable.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>2. Primer: The Unsung Hero</h2>
            <p style={{ marginBottom: '1.5rem' }}>Primer acts as the glue between the putty and your final <em>Rong</em>. Skipping primer is the #1 reason why paint bubbles and peels off walls in Assam. Exterior walls specifically require an Anti-Alkali primer to fight off fungus and algae.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>3. Choosing the Right Rong</h2>
            <p style={{ marginBottom: '1.5rem' }}>For interiors, Plastic Emulsion paint (like Asian Paints Royale) offers a washable, luxurious finish. For exteriors, you absolutely must invest in an elastomeric, weatherproof paint like Apex Ultima Protek. It is expensive, but it creates a flexible rubber-like film that covers hairline cracks and repels monsoon water completely.</p>

            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>Estimated Costs in 2026</h2>
            <p style={{ marginBottom: '1.5rem' }}>Depending on the quality of <em>Rong</em>, painting (including labor, putty, primer, and two coats of paint) usually costs between ₹25 to ₹45 per square foot of wall area. Always finalize a per-square-foot contract with your painter rather than a daily wage rate.</p>
            
            <div style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', borderLeft: '4px solid var(--gold)', padding: '2rem', marginTop: '3rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Flawless Finishes</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Our luxury turnkey packages include complete interior and exterior finishing using top-tier Asian Paints and Berger products, guaranteed to withstand Assam's weather.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
