import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Services from '@/components/Services';
import Contact from '@/components/Contact';
import Link from 'next/link';

// Helper to format city names
function formatCityName(city: string) {
  return city.charAt(0).toUpperCase() + city.slice(1).replace(/-/g, ' ');
}

// Generate dynamic metadata for each city for massive SEO benefits
export async function generateMetadata(
  props: { params: Promise<{ city: string }> }
): Promise<Metadata> {
  const params = await props.params;
  const cityName = formatCityName(params.city);
  
  return {
    title: `Best Construction Company in ${cityName} | Bhaigya Construction`,
    description: `Looking for top-rated builders in ${cityName}? Bhaigya Construction provides premium residential and commercial construction services in ${cityName}, Assam. Free consultation!`,
    keywords: [`construction company in ${cityName}`, `builders in ${cityName}`, `home construction ${cityName}`, `best builder ${cityName}`, `construction contractor ${cityName}`],
    alternates: {
      canonical: `https://bhaigyaconstruction.com/locations/${params.city}`,
    }
  };
}

// Ensure the page can be dynamically rendered for any city param
export const dynamic = 'force-dynamic';

export default async function LocationPage(props: { params: Promise<{ city: string }> }) {
  const params = await props.params;
  const cityName = formatCityName(params.city);

  return (
    <>
      <Header />
      <main id="main-content">
        {/* Localized Hero Section */}
        <section className="pd-hero" style={{ backgroundImage: 'url(/hero.jpeg)' }}>
          <div className="pd-hero-overlay"></div>
          <div className="pd-hero-content container">
            <span className="pd-badge">Local Service Area</span>
            <h1 className="pd-title">Construction Services in {cityName}</h1>
            <p className="pd-subtitle">
              Premium Residential & Commercial Building in {cityName}, Assam
            </p>
          </div>
        </section>

        {/* Localized Content Section */}
        <section className="section dark-section">
          <div className="container">
            <div className="pd-grid">
              <div>
                <h2 className="section-title">Why Choose Bhaigya Construction in {cityName}?</h2>
                <div className="pd-desc-block">
                  <p>
                    If you are planning to build your dream home or a commercial complex in <strong>{cityName}</strong>, Bhaigya Construction is your most reliable partner. With over 10 years of experience across North East India, we bring premium craftsmanship, high-quality materials, and on-time delivery right to {cityName}.
                  </p>
                  <p>
                    We understand the specific geographical and climatic needs of Assam. Whether it is robust foundation work for flood-prone areas or luxury interior finishes, our team of expert civil engineers and architects handles everything from start to finish.
                  </p>
                  <ul className="pd-service-ben" style={{ marginTop: '2rem' }}>
                    <li>100% Transparent Pricing in {cityName}</li>
                    <li>Vastu-Compliant Architectural Designs</li>
                    <li>Premium Quality Materials (Durgapur/Tata Steel, UltraTech/Dalmia Cement)</li>
                    <li>End-to-End Project Management</li>
                    <li>Timely Handover Guarantee</li>
                  </ul>
                  
                  <div style={{ marginTop: '3rem' }}>
                    <Link href="/#contact" className="btn-gold">Get a Free Quote in {cityName}</Link>
                  </div>
                </div>
              </div>

              <div>
                <div className="pd-stats-card">
                  <h3 className="pd-stats-card-title">Service Details</h3>
                  <div className="pd-stat-row">
                    <span className="pd-stat-label">Location</span>
                    <span className="pd-stat-val">{cityName}, Assam</span>
                  </div>
                  <div className="pd-stat-row">
                    <span className="pd-stat-label">Services Offered</span>
                    <span className="pd-stat-val">Residential, Commercial, Civil</span>
                  </div>
                  <div className="pd-stat-row">
                    <span className="pd-stat-label">Consultation</span>
                    <span className="pd-stat-val">Free On-Site Visit</span>
                  </div>
                  <div className="pd-stat-row">
                    <span className="pd-stat-label">Contact</span>
                    <span className="pd-stat-val">+91 96782 79817</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use existing Services and Contact components */}
        <Services />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
