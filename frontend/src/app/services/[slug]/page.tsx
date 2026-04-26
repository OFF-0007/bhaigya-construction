import { api } from '@/lib/api';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Preloader from '@/components/Preloader';
import Script from 'next/script';
import { notFound } from 'next/navigation';

import { FALLBACK_SERVICES } from '@/components/Services';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const response = await api.getServicePackageBySlug(slug);
    const service = response?.data;
    if (!service) {
      const fallback = FALLBACK_SERVICES.find(s => s.slug === slug);
      if (fallback) {
        return {
          title: `${fallback.title} | Bhaigya Construction`,
          description: fallback.description,
        };
      }
      return { title: 'Service Not Found' };
    }
    
    return {
      title: `${service.title} | Bhaigya Construction`,
      description: service.description,
    };
  } catch (e) {
    const { slug } = await params;
    const fallback = FALLBACK_SERVICES.find(s => s.slug === slug);
    if (fallback) {
      return {
        title: `${fallback.title} | Bhaigya Construction`,
        description: fallback.description,
      };
    }
    return { title: 'Service Details' };
  }
}

export default async function ServiceDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let service = null;

  try {
    console.log(`[DEBUG] Fetching service package by slug: ${slug}`);
    const response = await api.getServicePackageBySlug(slug);
    console.log(`[DEBUG] Response received for slug ${slug}:`, response?.data?.id);
    if (response?.data) {
      service = response.data;
    }
  } catch (error) {
    console.error(`[DEBUG] Failed to fetch service package ${slug}:`, error);
  }

  if (!service) {
    console.log(`[DEBUG] Service not found in API. Trying fallback for ${slug}...`);
    service = FALLBACK_SERVICES.find(s => s.slug === slug) || null;
  }

  if (!service) {
    console.log(`[DEBUG] Service completely not found. Returning 404.`);
    notFound();
  }

  const isPopular = service.popularity === 'popular';
  const hasPrice = parseFloat(service.price) > 0;
  const priceFormatted = Number(service.price).toLocaleString('en-IN');

  return (
    <>
      <Preloader />
      <Header />
      <main id="main-content" style={{ minHeight: '100vh', paddingTop: 'var(--header-h)' }}>
        
        {/* Service Hero Section */}
        <section className="service-detail-hero" style={{
          position: 'relative',
          padding: '80px 0',
          background: 'var(--dark2)',
          borderBottom: '1px solid var(--gold-border)',
          overflow: 'hidden'
        }}>
          {service.imageUrl && (
            <div 
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url('${service.imageUrl}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                opacity: 0.15,
                zIndex: 0
              }}
            />
          )}
          
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
              {isPopular && (
                <div style={{
                  display: 'inline-block',
                  padding: '6px 16px',
                  background: 'rgba(197, 160, 89, 0.15)',
                  color: 'var(--gold)',
                  border: '1px solid var(--gold-border)',
                  borderRadius: '100px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  marginBottom: '1.5rem'
                }}>
                  Most Popular Package
                </div>
              )}
              
              <div style={{
                fontSize: '0.85rem',
                fontWeight: 700,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
                marginBottom: '1rem'
              }}>
                {service.category?.categoryName ?? 'Service Package'}
              </div>
              
              <h1 style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                fontWeight: 700,
                color: 'var(--off-white)',
                lineHeight: 1.1,
                marginBottom: '1.5rem'
              }}>
                {service.title}
              </h1>
              
              {hasPrice && (
                <div style={{
                  fontSize: '1.25rem',
                  color: 'var(--white)',
                  marginBottom: '2rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px'
                }}>
                  <span style={{ color: 'var(--grey-light)', fontSize: '1rem' }}>Starting from</span>
                  <strong style={{ color: 'var(--gold)' }}>₹{priceFormatted}</strong>
                </div>
              )}
              
              <p style={{
                fontSize: '1.1rem',
                color: 'var(--grey-light)',
                lineHeight: 1.8,
                maxWidth: '680px',
                margin: '0 auto'
              }}>
                {service.description}
              </p>
            </div>
          </div>
        </section>

        {/* Details Content */}
        <section className="section" style={{ background: 'var(--dark)' }}>
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '40px',
              maxWidth: '1000px',
              margin: '0 auto'
            }}>
              
              {/* Benefits Column */}
              <div style={{
                background: 'var(--dark2)',
                border: '1px solid var(--gold-border)',
                borderRadius: 'var(--radius-lg)',
                padding: '40px'
              }}>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: 'var(--off-white)',
                  marginBottom: '24px',
                  fontFamily: 'var(--font-serif)'
                }}>What&apos;s Included</h3>
                
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {(service.benefits || []).map((benefit, idx) => (
                    <li key={idx} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      marginBottom: '16px',
                      color: 'var(--text)',
                      lineHeight: 1.6
                    }}>
                      <span style={{ color: 'var(--gold)', marginTop: '2px' }}>✦</span>
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact / Action Column */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div style={{
                  background: 'rgba(197, 160, 89, 0.03)',
                  border: '1px solid rgba(197, 160, 89, 0.1)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '40px',
                  textAlign: 'center'
                }}>
                  <h3 style={{
                    fontSize: '1.5rem',
                    color: 'var(--off-white)',
                    marginBottom: '16px',
                    fontFamily: 'var(--font-serif)'
                  }}>Ready to Start?</h3>
                  <p style={{ color: 'var(--grey-light)', marginBottom: '30px', fontSize: '0.95rem' }}>
                    Get in touch with our experts to discuss your requirements and receive a personalized quote based on this package.
                  </p>
                  <a href="/#contact" className="btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
                    Request Consultation
                  </a>
                </div>
                
                <div style={{ textAlign: 'center' }}>
                  <a href="/#services" className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                    ← Back to Packages
                  </a>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Script src="/animations.js" strategy="afterInteractive" />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
