import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GalleryClient from '@/components/GalleryClient';
import Preloader from '@/components/Preloader';
import Script from 'next/script';
import { api } from '@/lib/api';
import { ImageGallery } from '@/types/api';

export const metadata = {
  title: 'Gallery — Construction Photos & Project Images from Assam',
  description: 'View Bhaigya Construction\'s complete photo gallery featuring luxury residential homes, commercial buildings, interior finishes, and construction projects from across Guwahati, Bongaigaon, and North East India.',
  alternates: { canonical: 'https://bhaigyaconstruction.com/gallery' },
  openGraph: {
    title: 'Construction Gallery | Bhaigya Construction Assam',
    description: 'Explore stunning photos of luxury homes, villas, and commercial projects built by Bhaigya Construction across Assam and North East India.',
    url: 'https://bhaigyaconstruction.com/gallery',
    images: [{ url: '/hero.jpeg', width: 1200, height: 630 }],
  },
};

export default async function GalleryPage() {
  let images: ImageGallery[] = [];

  try {
    const response = await api.getGallery();
    if (response?.data && Array.isArray(response.data)) {
      images = response.data;
    }
  } catch (error) {
    console.error('Failed to fetch gallery:', error);
  }

  return (
    <>
      <Preloader />
      <Header />
      <main id="main-content" style={{ paddingTop: '100px', minHeight: '80vh' }}>
        <section className="portfolio section">
          <div className="container">
            <h1 className="section-title centered reveal-up">
              Our <span className="gold-text">Gallery</span>
            </h1>
            <p className="section-sub centered reveal-up" style={{ marginBottom: '3rem' }}>
              Filter and explore our complete visual showcase by category.
            </p>

            <GalleryClient images={images} isMainPage={false} unstructured={true} />
          </div>
        </section>
      </main>
      <Footer />
      <Script src="/animations.js" strategy="afterInteractive" />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
