import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Cost of Building a House in Assam (2024) | Bhaigya Construction',
  description: 'Discover the exact per square foot cost of building a house in Assam. We break down B-Class, A-Class, and Ultra Luxury construction packages.',
  keywords: ['cost to build house in assam', 'per square foot construction cost guwahati', 'house building estimate assam'],
};

export default function BlogPost() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "How Much Does It Cost to Build a House in Assam in 2024?",
    "author": {
      "@type": "Organization",
      "name": "Bhaigya Construction"
    },
    "datePublished": "2024-05-15",
    "image": "https://bhaigyaconstruction.com/hero.jpeg",
    "publisher": {
      "@type": "Organization",
      "name": "Bhaigya Construction",
      "logo": {
        "@type": "ImageObject",
        "url": "https://bhaigyaconstruction.com/BGC.jpeg"
      }
    }
  };

  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--bg-dark)' }}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto', paddingBottom: '4rem' }}>
          
          <Link href="/blog" style={{ color: 'var(--gold)', textDecoration: 'none', display: 'inline-block', marginBottom: '2rem' }}>
            ← Back to Insights
          </Link>

          <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '1rem', lineHeight: '1.2' }}>
            How Much Does It Cost to Build a House in Assam in 2024?
          </h1>
          
          <div style={{ display: 'flex', gap: '15px', fontSize: '0.9rem', color: 'var(--grey-light)', marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <span>By Bhaigya Construction Experts</span>
            <span>•</span>
            <span>Published May 15, 2024</span>
          </div>

          <div className="article-content" style={{ color: 'var(--grey-light)', lineHeight: '1.8', fontSize: '1.1rem' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Building a house in Assam requires careful planning due to the unique climatic conditions, heavy rainfall, and seismic activity in the North East. One of the most common questions we receive at Bhaigya Construction is: <strong>"How much will my house cost per square foot?"</strong>
            </p>
            
            <p style={{ marginBottom: '2rem' }}>
              The short answer is that construction costs in Assam generally range from <strong>₹1,400 to ₹2,500+ per square foot</strong>, depending heavily on the quality of materials, the interior finishes, and the structural integrity required. Let's break down the three primary tiers of construction.
            </p>

            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>1. Standard Construction (B-Class)</h2>
            <p style={{ marginBottom: '1rem' }}><strong>Estimated Cost:</strong> ₹1,400 - ₹1,600 / sq. ft.</p>
            <p style={{ marginBottom: '2rem' }}>
              This is the most economical way to build a reliable, safe home. It utilizes standard but certified materials. You can expect standard vitrified tiles, basic electrical wiring, standard CP fittings, and conventional brickwork. This is perfect for simple residential properties and budget-conscious investments.
            </p>

            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>2. Premium Construction (A-Class)</h2>
            <p style={{ marginBottom: '1rem' }}><strong>Estimated Cost:</strong> ₹1,700 - ₹1,900 / sq. ft.</p>
            <p style={{ marginBottom: '2rem' }}>
              The most popular choice for modern homes in cities like Guwahati, Dibrugarh, and Jorhat. A-Class construction uses premium brands like Tata Tiscon/Durgapur steel, Dalmia/UltraTech cement, premium large-format vitrified tiles, and branded sanitaryware (like basic Jaquar or Hindware). It also includes better waterproofing protocols essential for Assam's monsoon.
            </p>

            <h2 style={{ color: 'var(--gold)', fontSize: '1.8rem', marginTop: '3rem', marginBottom: '1rem' }}>3. Ultra Luxury Construction</h2>
            <p style={{ marginBottom: '1rem' }}><strong>Estimated Cost:</strong> ₹2,100 - ₹2,500+ / sq. ft.</p>
            <p style={{ marginBottom: '2rem' }}>
              For those wanting the absolute best. This tier includes Italian marble flooring, high-end Kohler/Grohe bathroom fittings, custom modular kitchens, smart home automation wiring, teak wood doors, and extensive aesthetic elevations (glass facades, premium exterior paints). Structural design is also heavily fortified.
            </p>

            <div style={{ backgroundColor: 'rgba(197, 160, 89, 0.1)', borderLeft: '4px solid var(--gold)', padding: '2rem', marginTop: '3rem', borderRadius: '0 8px 8px 0' }}>
              <h3 style={{ color: '#fff', marginBottom: '1rem' }}>Ready to start your project?</h3>
              <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>
                At Bhaigya Construction, we provide 100% transparent quotations with no hidden costs. We handle everything from architectural planning to the final coat of paint.
              </p>
              <Link href="/contact" style={{ display: 'inline-block', backgroundColor: 'var(--gold)', color: '#000', padding: '10px 24px', borderRadius: '4px', textDecoration: 'none', fontWeight: 'bold' }}>
                Get a Free Estimate Today
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
