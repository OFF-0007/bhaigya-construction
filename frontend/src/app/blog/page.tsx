import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';

export const metadata = {
  title: 'Construction Insights & Updates | Bhaigya Construction Blog',
  description: 'Expert insights on house construction costs, materials, Vastu tips, and building regulations in Assam and North East India.',
  keywords: ['house construction cost in assam', 'best tmt bar for construction', 'vastu design house', 'bhaigya construction blog', 'assam builders'],
};

const articles = [
  {
    title: "How to Calculate Ita, Bali, and Pathor for Your New House",
    slug: "calculate-ita-bali-pathor-assam",
    excerpt: "A simple 2026 guide to calculating the exact amount of Ita (Bricks), Bali (Sand), and Pathor (Stones) needed for building a house in Assam.",
    date: "March 10, 2026",
    readTime: "5 min read"
  },
  {
    title: "Why You Need a Good Mistri and Jugali for Assam Monsoons",
    slug: "good-mistri-jugali-assam",
    excerpt: "Understand the critical roles of a Head Mistri and Jugali in Assam house construction. How to avoid poor workmanship in 2026.",
    date: "March 5, 2026",
    readTime: "5 min read"
  },
  {
    title: "Choosing the Best Rod (TMT Bar) for Earthquake Safety",
    slug: "best-rod-tmt-bar-assam",
    excerpt: "Which Rod is best for house construction in Assam? Learn about Tata Tiscon, Shyam Steel, and why FE-500D TMT bars are essential.",
    date: "February 28, 2026",
    readTime: "6 min read"
  },
  {
    title: "Assam Type House vs RCC House: What is Better in 2026?",
    slug: "assam-type-vs-rcc-house-2026",
    excerpt: "Explore the pros and cons of traditional Assam Type houses vs modern RCC buildings. Understand earthquake safety, cost, and maintenance.",
    date: "February 15, 2026",
    readTime: "6 min read"
  },
  {
    title: "The True Cost of Painting (Rong) Your House in Assam",
    slug: "cost-of-painting-rong-assam",
    excerpt: "How much does Rong (painting) cost in Assam? Learn about putty, Asian Paints primer, and avoiding peeling paint during the monsoon.",
    date: "February 10, 2026",
    readTime: "5 min read"
  },
  {
    title: "Best Foundation Types for Assam's Soil and Earthquakes",
    slug: "best-foundation-types-assam",
    excerpt: "Learn which house foundation is best for Assam. Understand pile foundations, raft foundations, and how to build earthquake-resistant homes.",
    date: "April 15, 2026",
    readTime: "6 min read"
  },
  {
    title: "How to Prevent Dampness and Seepage in Assam's Monsoon",
    slug: "prevent-dampness-seepage-assam",
    excerpt: "Stop wall dampness and roof seepage in Assam. Learn about Dr. Fixit waterproofing, DPC layers, and anti-fungal exterior paints.",
    date: "April 10, 2026",
    readTime: "5 min read"
  },
  {
    title: "Vastu Shastra Tips for Building a House in North East India",
    slug: "vastu-tips-assam-homes",
    excerpt: "Essential Vastu Shastra principles for North East India. Learn where to place the kitchen, master bedroom, and entrance for prosperity.",
    date: "April 5, 2026",
    readTime: "5 min read"
  },
  {
    title: "Why You Should Hire a Turnkey Contractor vs Local Labour",
    slug: "turnkey-contractor-vs-local-labour-assam",
    excerpt: "Why hiring a turnkey construction company in Guwahati is cheaper and safer than managing daily-wage laborers and buying materials yourself.",
    date: "March 25, 2026",
    readTime: "7 min read"
  },
  {
    title: "Government Rules & Approvals for Construction in Assam (2026 Update)",
    slug: "government-rules-construction-assam-2026",
    excerpt: "Updated 2026 guidelines, RERA regulations, building bye-laws, and municipality approvals required for building a house in Assam.",
    date: "April 30, 2026",
    readTime: "6 min read"
  },
  {
    title: "The Ultimate Guide to Bricks, Sand & Stones in Assam",
    slug: "understanding-bricks-sand-assam",
    excerpt: "Understand the difference between Class A and Class B bricks, Kanaighat sand, and the best building materials for construction.",
    date: "April 28, 2026",
    readTime: "5 min read"
  },
  {
    title: "Where to Buy Premium Construction Materials in Assam",
    slug: "where-to-buy-materials-assam",
    excerpt: "A guide to sourcing cement, steel, sand, and interior materials in Guwahati, Jorhat, Dibrugarh, and across Assam.",
    date: "April 25, 2026",
    readTime: "4 min read"
  },
  {
    title: "Finding Skilled Carpenters & Construction Workers in Assam",
    slug: "finding-skilled-workers-carpenters",
    excerpt: "How to hire the best masons, carpenters, plumbers, and electricians for your house construction in Assam.",
    date: "April 20, 2026",
    readTime: "5 min read"
  },
  {
    title: "How Much Does It Cost to Build a House in Assam?",
    slug: "cost-of-building-house-assam",
    excerpt: "A complete breakdown of construction costs per square foot in Assam, covering B-Class civil work to Ultra Luxury finishes.",
    date: "May 15, 2024",
    readTime: "5 min read"
  },
  {
    title: "10 Essential Vastu Tips for Your New Home",
    slug: "vastu-tips-new-home",
    excerpt: "Ensure peace, health, and prosperity by following these crucial Vastu Shastra principles before finalizing your floor plan.",
    date: "March 10, 2024",
    readTime: "6 min read"
  }
];

export default function BlogIndex() {
  return (
    <>
      <Header />
      <main id="main-content" style={{ paddingTop: '120px', minHeight: '80vh', backgroundColor: 'var(--bg-dark)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-subtitle">Insights</span>
            <h1 className="section-title">Construction Blog & Guides</h1>
            <p style={{ color: 'var(--grey-light)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>
              Expert advice, cost estimates, and design inspiration for building your dream home in Assam.
            </p>
          </div>

          <style dangerouslySetInnerHTML={{__html: `
            .blog-card {
              position: relative;
              background: rgba(255, 255, 255, 0.02);
              backdrop-filter: blur(12px);
              -webkit-backdrop-filter: blur(12px);
              border-radius: 16px;
              padding: 2.5rem 2rem;
              border: 1px solid rgba(255, 255, 255, 0.08);
              transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
              cursor: pointer;
              height: 100%;
              overflow: hidden;
              display: flex;
              flex-direction: column;
            }
            .blog-card::before {
              content: '';
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              background: radial-gradient(circle at top right, rgba(197, 160, 89, 0.15), transparent 60%);
              opacity: 0;
              transition: opacity 0.5s ease;
              z-index: 1;
              pointer-events: none;
            }
            .blog-card:hover {
              transform: translateY(-8px);
              border-color: rgba(197, 160, 89, 0.4);
              background: rgba(255, 255, 255, 0.05);
              box-shadow: 0 15px 35px rgba(0, 0, 0, 0.2);
            }
            .blog-card:hover::before {
              opacity: 1;
            }
            .blog-card-content {
              position: relative;
              z-index: 2;
              display: flex;
              flex-direction: column;
              height: 100%;
            }
            .blog-card-read-more {
              margin-top: auto;
              padding-top: 1.5rem;
              display: inline-block;
              color: var(--gold);
              font-weight: 600;
              text-transform: uppercase;
              letter-spacing: 1px;
              font-size: 0.85rem;
              transition: letter-spacing 0.3s ease;
            }
            .blog-card:hover .blog-card-read-more {
              letter-spacing: 2px;
            }
          `}} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '3rem', paddingBottom: '4rem' }}>
            {articles.map((article) => (
              <Link href={`/blog/${article.slug}`} key={article.slug} style={{ textDecoration: 'none' }}>
                <div className="blog-card">
                  <div className="blog-card-content">
                    <div style={{ display: 'flex', gap: '15px', fontSize: '0.85rem', color: 'var(--gold)', marginBottom: '1rem', fontWeight: 600 }}>
                      <span>📅 {article.date}</span>
                      <span>⏱️ {article.readTime}</span>
                    </div>
                    <h2 style={{ color: '#fff', fontSize: '1.4rem', marginBottom: '1rem', lineHeight: '1.4' }}>
                      {article.title}
                    </h2>
                    <p style={{ color: 'var(--grey-light)', lineHeight: '1.6', fontSize: '0.95rem', marginBottom: '1rem' }}>
                      {article.excerpt}
                    </p>
                    <span className="blog-card-read-more">
                      Read Article →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
