import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GalleryClient from '@/components/GalleryClient';
import Preloader from '@/components/Preloader';
import Script from 'next/script';
import { api } from '@/lib/api';
import { ImageGallery } from '@/types/api';

export const metadata = {
  title: 'Gallery - Bhaigya Construction',
  description: 'View our complete gallery of construction projects and services.',
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

            <GalleryClient images={images} isMainPage={false} />
          </div>
        </section>
      </main>
      <Footer />
      <Script src="/animations.js" strategy="afterInteractive" />
      <Script src="/script.js" strategy="afterInteractive" />
    </>
  );
}
