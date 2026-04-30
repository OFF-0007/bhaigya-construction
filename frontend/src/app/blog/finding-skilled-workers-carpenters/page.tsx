import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Finding Skilled Carpenters & Construction Workers in Assam | Bhaigya Construction',
  description: 'How to hire the best masons, carpenters, plumbers, and electricians for your house construction in Assam.',
  keywords: ['carpenters in assam', 'construction workers guwahati', 'hire mason assam', 'skilled labor construction', 'bhaigya construction team'],
};

export default function BlogPost() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Finding Skilled Carpenters & Construction Workers in Assam",
    "author": { "@type": "Organization", "name": "Bhaigya Construction" },
    "datePublished": "2026-04-20"
  };

  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--bg-dark)' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
          <Link href="/blog" style={{ color: 'var(--gold)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>← Back to Insights</Link>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>Finding Skilled Carpenters & Construction Workers in Assam</h1>
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: 'var(--grey-light)', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span>By Bhaigya Construction HR</span><span>•</span><span>Published April 20, 2026</span>
          </div>
          <div className="article-content" style={{ color: 'var(--grey-light)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>The best materials in the world are useless in the hands of unskilled labor. A major challenge for independent homebuilders in Assam is finding reliable, highly skilled masons, carpenters, and electricians.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>The Role of the Head Mason (Mistri)</h2>
            <p style={{ marginBottom: '1.5rem' }}>The head mason is responsible for translating the architect's structural drawings into reality. In Assam, a good mason must understand curing times during high humidity and the proper alignment of columns. Never hire a mason without physically visiting their past completed sites.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>Carpenters and Interior Finishers</h2>
            <p style={{ marginBottom: '1.5rem' }}>Assam has a rich heritage of woodwork. For doors, windows, and modular kitchens, you need carpenters experienced with local woods like Teak, Sal, and modern engineered woods (HDHMR/Plywood). Skilled carpenters are highly sought after and usually booked months in advance.</p>

            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>The Danger of Daily Wage Delays</h2>
            <p style={{ marginBottom: '1.5rem' }}>Managing labor on a daily wage basis often leads to project delays, as workers may stretch out the timeline. This is why giving a "contract" to a firm is vastly superior to managing individual laborers yourself.</p>
            
            <div style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', borderLeft: '4px solid var(--gold)', padding: '2rem', marginTop: '3rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Our In-House Teams</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>At Bhaigya Construction, we have permanent, vetted teams of the finest masons, carpenters, plumbers, and electricians in Assam. When you hire us, you hire guaranteed elite craftsmanship.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
