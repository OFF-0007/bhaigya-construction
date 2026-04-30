import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Best Foundation Types for Assam Soil & Earthquakes | Bhaigya Construction',
  description: 'Learn which house foundation is best for Assam. Understand pile foundations, raft foundations, and how to build earthquake-resistant homes in Seismic Zone V.',
  keywords: ['pile foundation assam', 'earthquake resistant house guwahati', 'seismic zone 5 construction', 'raft foundation vs isolated footing', 'assam soil testing'],
};

export default function BlogPost() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Best Foundation Types for Assam's Soil and Earthquakes",
    "author": { "@type": "Organization", "name": "Bhaigya Construction" },
    "datePublished": "2026-04-15",
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
          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>Best Foundation Types for Assam's Soil and Earthquakes</h1>
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: 'var(--grey-light)', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span>By Bhaigya Structural Engineers</span><span>•</span><span>Published April 15, 2026</span>
          </div>
          <div className="article-content" style={{ color: 'var(--grey-light)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>Assam is located in <strong>Seismic Zone V</strong>, the highest earthquake risk zone in India. Combined with heavy monsoons and loose alluvial soil near the Brahmaputra, choosing the right foundation is a matter of life and death.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>1. Isolated Footing (For Hard Soil)</h2>
            <p style={{ marginBottom: '1.5rem' }}>If your plot is in a hilly or elevated area with dense, hard soil (like parts of Karbi Anglong or specific areas in Guwahati), an isolated column footing may suffice for a standard G+1 house. However, tie beams at the plinth level are absolutely mandatory to prevent independent column settling during an earthquake.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>2. Pile Foundation (For Soft/Sandy Soil)</h2>
            <p style={{ marginBottom: '1.5rem' }}>For areas near riverbanks (Majuli, Dhubri, parts of Dibrugarh) where the topsoil is silty and waterlogged, an isolated footing will sink. In these cases, deep <strong>Pile Foundations</strong> are driven deep into the earth until they hit a hard rock strata. This transfers the entire load of the building deep underground, bypassing the unstable topsoil.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>3. Raft / Mat Foundation (For Commercial / Multi-story)</h2>
            <p style={{ marginBottom: '1.5rem' }}>If you are building an apartment or commercial complex, a Raft Foundation is highly recommended. It involves casting a massive, continuous concrete slab under the entire footprint of the building. This prevents differential settlement (one side sinking more than the other) during seismic tremors.</p>

            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>The Importance of Soil Testing</h2>
            <p style={{ marginBottom: '1.5rem' }}>Never let a local mason guess your foundation depth. Before any excavation begins, a professional geotechnical soil test must be conducted. This report dictates the Safe Bearing Capacity (SBC) of your land, ensuring your structural engineer designs a foundation that won't fail.</p>
            
            <div style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', borderLeft: '4px solid var(--gold)', padding: '2rem', marginTop: '3rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Structurally Sound Homes</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>At Bhaigya Construction, every project begins with a mandatory soil test and a deeply vetted structural blueprint by our empanelled engineers. We don't take chances with your safety.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
