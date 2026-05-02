import { api } from '@/lib/api';
import { ImageGallery, ImageType } from '@/types/api';
import GalleryClient from './GalleryClient';

export default async function Gallery() {
  let images: ImageGallery[] = [];

  try {
    const response = await api.getGallery();
    if (response?.data && Array.isArray(response.data)) {
      images = response.data;
    }
  } catch (error) {
    console.error('Failed to fetch gallery:', error);
  }

  // Group images by type for the main page display
  // We can just show them or group them. The client component will handle rendering.
  return (
    <section id="gallery" className="portfolio section" aria-labelledby="gallery-heading">
      <div className="container">
        <div className="section-label reveal-up">Our Gallery</div>
        <h2 id="gallery-heading" className="section-title centered reveal-up">
          Visual <span className="gold-text">Showcase</span>
        </h2>
        <p className="section-sub centered reveal-up">
          Explore our construction excellence across various categories.
        </p>

        <GalleryClient images={images} isMainPage={true} />

        <div className="centered" style={{ marginTop: '3rem' }}>
          <a href="/gallery" className="btn-gold">
            See All Gallery →
          </a>
        </div>
      </div>
    </section>
  );
}
