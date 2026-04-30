import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Turnkey Contractor vs Local Labour in Assam | Bhaigya Construction',
  description: 'Why hiring a turnkey construction company in Guwahati is cheaper and safer than managing daily-wage laborers and buying materials yourself.',
  keywords: ['turnkey contractor guwahati', 'house building contract assam', 'local mistri vs contractor', 'construction company assam', 'bhaigya construction services'],
};

export default function BlogPost() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Why You Should Hire a Turnkey Contractor vs Local Labour",
    "author": { "@type": "Organization", "name": "Bhaigya Construction" },
    "datePublished": "2026-03-25"
  };

  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--bg-dark)' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
          <Link href="/blog" style={{ color: 'var(--gold)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>← Back to Insights</Link>
          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>Why You Should Hire a Turnkey Contractor vs Local Labour</h1>
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: 'var(--grey-light)', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span>By Bhaigya Construction Management</span><span>•</span><span>Published March 25, 2026</span>
          </div>
          <div className="article-content" style={{ color: 'var(--grey-light)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>A common myth in Assam is that acting as your own project manager and hiring local daily-wage laborers (the "Mistri" approach) will save you money. In reality, it often leads to budget overruns, structural flaws, and immense mental stress. Here is why hiring a Turnkey Contractor is the superior choice.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>1. The Hidden Cost of Material Wastage</h2>
            <p style={{ marginBottom: '1.5rem' }}>Local laborers do not pay for materials, so they rarely optimize them. Broken bricks, wasted cement, and poorly cut steel bars can inflate your material costs by up to 20%. A turnkey contractor buys in bulk and utilizes materials efficiently because wastage cuts directly into their profit margin.</p>
            
            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>2. Time is Money</h2>
            <p style={{ marginBottom: '1.5rem' }}>Daily wage workers have an incentive to drag out the project. A house that should take 8 months might take 18 months, exposing your half-finished structure to Assam's brutal monsoons. Turnkey contractors work on fixed deadlines and penalty clauses, ensuring swift delivery.</p>

            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>3. Engineering vs Guesswork</h2>
            <p style={{ marginBottom: '1.5rem' }}>A local mistri relies on "experience" to decide beam depth or steel thickness. This guesswork is highly dangerous in a Seismic Zone V region. A turnkey company employs qualified civil and structural engineers who design load-bearing frameworks using precise mathematical modeling.</p>

            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>4. Single Point of Contact</h2>
            <p style={{ marginBottom: '1.5rem' }}>Coordinating the plumber, the electrician, the carpenter, and the painter is a logistical nightmare. With a turnkey contractor, you deal with exactly one project manager. You get regular updates on WhatsApp, and if anything goes wrong, there is zero blame-shifting.</p>
            
            <div style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', borderLeft: '4px solid var(--gold)', padding: '2rem', marginTop: '3rem' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Build with Peace of Mind</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>Bhaigya Construction offers end-to-end turnkey solutions. You hand over the empty plot, and we hand over the keys to a finished, beautifully designed luxury home.</p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
