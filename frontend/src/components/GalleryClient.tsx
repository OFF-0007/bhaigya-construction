'use client';

import { ImageGallery, ImageType } from '@/types/api';
import { useState, useMemo } from 'react';

interface GalleryClientProps {
  images: ImageGallery[];
  isMainPage?: boolean;
  unstructured?: boolean;
}

export default function GalleryClient({ images, isMainPage = false, unstructured = false }: GalleryClientProps) {
  const [activeTab, setActiveTab] = useState<number | 'all'>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // Use either prop to trigger the layout
  const useUnstructured = unstructured || isMainPage;

  // Extract unique image types
  const imageTypes = useMemo(() => {
    const typesMap = new Map<number, ImageType>();
    images.forEach(img => {
      if (img.image_type && !typesMap.has(img.image_type.id)) {
        typesMap.set(img.image_type.id, img.image_type);
      }
    });
    return Array.from(typesMap.values());
  }, [images]);

  const filteredImages = useMemo(() => {
    if (activeTab === 'all') return images;
    return images.filter(img => img.image_type?.id === activeTab);
  }, [images, activeTab]);

  return (
    <div>
      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          onClick={() => setSelectedImage(null)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.95)',
            zIndex: 100000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'zoom-out',
            padding: '40px'
          }}
        >
          <img 
            src={selectedImage} 
            alt="Full Size" 
            style={{ 
              maxWidth: '100%', 
              maxHeight: '100%', 
              objectFit: 'contain',
              boxShadow: '0 0 50px rgba(0,0,0,0.5)',
              borderRadius: '4px'
            }} 
          />
          <button 
            style={{
              position: 'absolute',
              top: '30px',
              right: '30px',
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              fontSize: '24px',
              fontWeight: 'bold',
              cursor: 'pointer',
              color: 'black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
        </div>
      )}

      {!isMainPage && imageTypes.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          <button
            onClick={() => setActiveTab('all')}
            style={{
              padding: '0.5rem 1.5rem',
              borderRadius: '2rem',
              border: '1px solid var(--gold-primary, #d4af37)',
              background: activeTab === 'all' ? 'var(--gold-primary, #d4af37)' : 'transparent',
              color: activeTab === 'all' ? '#000' : 'var(--text-main, #333)',
              cursor: 'pointer',
              fontWeight: 600,
              transition: 'all 0.3s ease'
            }}
          >
            All
          </button>
          {imageTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              style={{
                padding: '0.5rem 1.5rem',
                borderRadius: '2rem',
                border: '1px solid var(--gold-primary, #d4af37)',
                background: activeTab === type.id ? 'var(--gold-primary, #d4af37)' : 'transparent',
                color: activeTab === type.id ? '#000' : 'var(--text-main, #333)',
                cursor: 'pointer',
                fontWeight: 600,
                transition: 'all 0.3s ease'
              }}
            >
              {type.name}
            </button>
          ))}
        </div>
      )}

      <div className={`portfolio-grid ${useUnstructured ? 'unstructured' : ''}`}>
        {filteredImages.slice(0, isMainPage ? 8 : undefined).map((image, index) => {
          const bgUrl = image.upload_image;
          
          return (
            <div
              key={image.id}
              className="portfolio-item reveal-up"
              role="button"
              tabIndex={0}
              aria-label={`View ${image.image_name}`}
              style={{ cursor: 'pointer' }}
              onClick={() => bgUrl && setSelectedImage(bgUrl)}
            >
              {bgUrl ? (
                <div
                  className="portfolio-img"
                  style={{ 
                      backgroundImage: `url('${bgUrl}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center'
                  }}
                  role="img"
                  aria-label={image.image_name}
                />
              ) : (
                <div
                  className="portfolio-img portfolio-img-placeholder"
                  role="img"
                  aria-label={image.image_name}
                >
                  <div className="portfolio-placeholder-icon">📷</div>
                </div>
              )}

              <div className="portfolio-overlay">
                {image.image_type && (
                  <div className="portfolio-tag">{image.image_type.name}</div>
                )}
                <h3 className="portfolio-title">{image.image_name}</h3>
                
                {image.description ? (
                  <p className="portfolio-sub">{image.description}</p>
                ) : image.image_type?.description ? (
                  <p className="portfolio-sub">{image.image_type.description}</p>
                ) : null}

                {image.created_at && (
                  <div className="portfolio-meta-row">
                    <span className="portfolio-specs" style={{ opacity: 0.8, fontSize: '0.85rem' }}>
                      📅 {new Date(image.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}

                {/* Removed manual link in favor of Lightbox click */}
              </div>
            </div>
          );
        })}
      </div>
      
      {filteredImages.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--text-muted, #666)' }}>No images available in this category.</p>
      )}
    </div>
  );
}
