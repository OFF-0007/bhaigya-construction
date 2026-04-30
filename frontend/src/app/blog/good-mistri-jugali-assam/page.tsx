import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Why You Need a Good Mistri and Jugali in Assam | Bhaigya Construction',
  description: 'Understand the critical roles of a Head Mistri and Jugali in Assam house construction. How to avoid poor workmanship in 2026.',
  keywords: ['mistri in assam', 'jugali for construction', 'head mason guwahati', 'house construction workers', 'assam mistri rates 2026'],
};

export default function BlogPost() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Why You Need a Good Mistri and Jugali for Assam Monsoons",
    "author": { "@type": "Organization", "name": "Bhaigya Construction" },
    "datePublished": "2026-03-05"
  };

  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--bg-dark)' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
          <Link href="/blog" style={{ color: 'var(--gold)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>← Back to Insights</Link>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>Why You Need a Good Mistri and Jugali for Assam Monsoons</h1>
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: 'var(--grey-light)', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span>By Bhaigya Site Supervisors</span><span>•</span><span>Published March 5, 2026</span>
          </div>
          <div className="article-content" style={{ color: 'var(--grey-light)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>If you ask anyone who has built a house in Assam, they will tell you: your house is only as strong as your <strong>Mistri</strong> (Head Mason). A bad Mistri will waste your expensive cement, while a bad <strong>Jugali</strong> (Helper) will mix the concrete wrong.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>The Role of the Head Mistri</h2>
            <p style={{ marginBottom: '1.5rem' }}>In 2026, building a house requires reading complex structural drawings. A highly skilled <em>Mistri</em> ensures that the columns are perfectly plumb (vertical) and the brickwork is perfectly aligned. If the <em>Mistri</em> makes a mistake with the column alignment, the entire load-bearing capacity of your house is compromised—a massive risk in Assam's earthquake zone.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>The Unsung Hero: The Jugali</h2>
            <p style={{ marginBottom: '1.5rem' }}>The <em>Jugali</em> does the heavy lifting, literally. But their most important job is mixing the <em>Ita, Bali, Pathor,</em> and cement in the exact right ratios. If a <em>Jugali</em> adds too much water to the concrete mix (to make it easier to carry), it drastically weakens the final slab. Supervision is key.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>Beating the Assam Monsoon</h2>
            <p style={{ marginBottom: '1.5rem' }}>A smart <em>Mistri</em> knows how to schedule casting and plastering around the unpredictable Assam rains. They know exactly how long the curing process needs to take in high humidity before stripping the shuttering.</p>
            
            <div style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', borderLeft: '4px solid var(--gold)', padding: '2rem', marginTop: '3rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>We Hire the Best</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>At Bhaigya Construction, our <em>Mistris</em> and <em>Jugalis</em> are permanent staff. They are highly trained, strictly supervised by our site engineers, and deeply experienced in Assam's unique building conditions.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
