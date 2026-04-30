import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Assam Type House vs RCC House: Which is Better in 2026? | Bhaigya',
  description: 'Explore the pros and cons of traditional Assam Type houses vs modern RCC buildings. Understand earthquake safety, cost, and maintenance.',
  keywords: ['assam type house', 'rcc house vs assam type', 'traditional assam house', 'earthquake proof house assam', 'house design 2026'],
};

export default function BlogPost() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Assam Type House vs RCC House: What is Better in 2026?",
    "author": { "@type": "Organization", "name": "Bhaigya Construction" },
    "datePublished": "2026-02-15"
  };

  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--bg-dark)' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
          <Link href="/blog" style={{ color: 'var(--gold)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>← Back to Insights</Link>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>Assam Type House vs RCC House: What is Better in 2026?</h1>
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: 'var(--grey-light)', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span>By Bhaigya Architects</span><span>•</span><span>Published February 15, 2026</span>
          </div>
          <div className="article-content" style={{ color: 'var(--grey-light)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>For decades, the traditional <strong>Assam Type</strong> house—characterized by its sloping tin roof, ikra (reed) walls, and wooden framework—was the pinnacle of earthquake-resistant design. But fast forward to 2026, and the landscape is dominated by modern <strong>RCC (Reinforced Cement Concrete)</strong> structures. Which is better for you?</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>The Charm of the Assam Type House</h2>
            <p style={{ marginBottom: '1.5rem' }}>Assam Type houses are incredibly lightweight. During an earthquake, they sway rather than shatter. The high, sloping ceilings keep the interiors extremely cool during humid summers, and the tin roof effectively drains heavy monsoon rains.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>The Rise of the RCC House</h2>
            <p style={{ marginBottom: '1.5rem' }}>RCC houses use a heavy framework of <em>Ita, Bali, Pathor,</em> and <em>Rod</em>. They are immensely popular because they allow for vertical expansion (G+1, G+2 floors), which is crucial as land in cities like Guwahati becomes scarce and expensive. RCC houses also offer better security, soundproofing, and the ability to utilize the flat terrace space.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>The Verdict for 2026</h2>
            <p style={{ marginBottom: '1.5rem' }}>While Assam Type houses are beautiful and nostalgic, the cost of good quality timber has skyrocketed, and maintenance is high. In 2026, a properly engineered RCC house, designed explicitly for Seismic Zone V, is the most practical and durable choice. However, modern architects are now successfully blending the two—creating RCC houses with sloping "Assam Type" profile roofs on the top floor to get the best of both worlds.</p>
            
            <div style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', borderLeft: '4px solid var(--gold)', padding: '2rem', marginTop: '3rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Modern Meets Traditional</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Looking to build a modern RCC house with traditional Assamese aesthetics? Our architectural team specializes in creating stunning fusion designs.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
