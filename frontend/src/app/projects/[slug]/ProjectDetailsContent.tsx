'use client';

import { useState } from 'react';
import { Project } from '@/types/api';

interface ProjectDetailsContentProps {
  project: Project;
}

type Tab = 'overview' | 'images' | 'rooms' | 'progress';

interface LightboxImage {
  url: string;
  caption?: string;
  imageDetails?: Record<string, any> | null;
}

const statusLabel: Record<string, string> = {
  ongoing: 'Ongoing',
  completed: 'Completed',
  upcoming: 'Upcoming',
};

export default function ProjectDetailsContent({ project }: ProjectDetailsContentProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [lightboxImg, setLightboxImg] = useState<LightboxImage | null>(null);

  const allImages = [...(project.images ?? [])];
  if (project.primaryImage && !allImages.find(img => img.id === project.primaryImage?.id)) {
      allImages.unshift(project.primaryImage);
  }
  
  const heroBg = project.primaryImage?.fileUrl ?? allImages[0]?.fileUrl ?? null;
  const rooms = project.rooms ?? [];
  const progressItems = project.progress ?? [];
  
  // Create all image objects correctly formatted for UI
  const galleryImages = allImages.map(img => ({
    id: img.id,
    url: img.fileUrl,
    caption: img.altText || img.imageType?.name || 'Project Image',
    imageDetails: null
  }));

  const tabs: { key: Tab; label: string; show: boolean }[] = [
    { key: 'overview', label: 'Overview', show: true },
    { key: 'images', label: `Gallery (${galleryImages.length})`, show: galleryImages.length > 0 },
    { key: 'rooms', label: `Rooms Configuration`, show: rooms.length > 0 },
    { key: 'progress', label: 'Progress Update', show: progressItems.length > 0 },
  ];

  const handleLightboxOpen = (img: LightboxImage) => {
    setLightboxImg(img);
  };

  const formattedDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
  };

  return (
    <div className="project-details-page">
      
      {/* Hero Section */}
      <div 
        className="pd-hero"
        style={{ backgroundImage: heroBg ? `url('${heroBg}')` : undefined }}
      >
        <div className="pd-hero-overlay"></div>
        <div className="container">
            <div className="pd-hero-content reveal-up">
              <div className="pd-badge">
                {statusLabel[project.status] ?? project.status}
              </div>

              <h1 className="pd-title">{project.projectName}</h1>

              {project.projectLocation && (
                <div className="pd-subtitle">
                  <span style={{fontSize: '1.2rem'}}>📍</span>
                  {project.projectLocation}
                  {project.district ? `, ${project.district.name}, ${project.district.state}` : ''}
                </div>
              )}
            </div>
        </div>
      </div>

      {/* Sticky Sub-Navigation Tabs */}
      <nav className="pd-nav">
        <div className="container">
            <div className="pd-nav-list">
              {tabs.filter(t => t.show).map(t => (
                <button
                  key={t.key}
                  className={`pd-nav-item ${activeTab === t.key ? 'active' : ''}`}
                  onClick={() => setActiveTab(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <div className="pd-content-section">
          
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="pd-grid">
              
              <div className="pd-main-col">
                <div className="section-label">The Project Story</div>
                <h2 className="section-title">An Architectural Masterpiece</h2>
                
                <div className="pd-desc-block">
                  {project.description ? (
                      project.description.split('\n').map((para, i) => (
                          <p key={i}>{para}</p>
                      ))
                  ) : <p>Project details coming soon.</p>}
                </div>

                {project.servicePackage && (
                  <div className="pd-service-package">
                    <h3>{project.servicePackage.title} Package</h3>
                    <p>{project.servicePackage.description}</p>
                    {project.servicePackage.benefits && project.servicePackage.benefits.length > 0 && (
                        <ul className="pd-service-ben">
                            {project.servicePackage.benefits.map((ben, i) => (
                                <li key={i}>{ben}</li>
                            ))}
                        </ul>
                    )}
                  </div>
                )}
                
                <div style={{marginTop: '3rem'}}>
                    <a href="/contact" className="btn-gold">Enquire About This Project →</a>
                </div>
              </div>

              <div className="pd-sidebar">
                <div className="pd-stats-card">
                  <h3 className="pd-stats-card-title">Key Specifications</h3>
                  
                  {project.projectType && (
                      <div className="pd-stat-row">
                        <span className="pd-stat-label">Project Type</span>
                        <span className="pd-stat-val">{project.projectType.name}</span>
                      </div>
                  )}

                  {project.totalArea && (
                      <div className="pd-stat-row">
                        <span className="pd-stat-label">Total Area</span>
                        <span className="pd-stat-val">{project.totalArea} {project.areaUnit || 'sq.ft.'}</span>
                      </div>
                  )}

                  {project.carpetArea && (
                      <div className="pd-stat-row">
                        <span className="pd-stat-label">Carpet Area</span>
                        <span className="pd-stat-val">{project.carpetArea} {project.areaUnit || 'sq.ft.'}</span>
                      </div>
                  )}

                  {project.numberOfRooms != null && (
                      <div className="pd-stat-row">
                        <span className="pd-stat-label">Rooms</span>
                        <span className="pd-stat-val">{project.numberOfRooms}</span>
                      </div>
                  )}

                  {project.numberOfFloors != null && (
                      <div className="pd-stat-row">
                        <span className="pd-stat-label">Floors</span>
                        <span className="pd-stat-val">{project.numberOfFloors}</span>
                      </div>
                  )}

                  {project.projectStartDate && (
                      <div className="pd-stat-row">
                        <span className="pd-stat-label">Start Date</span>
                        <span className="pd-stat-val">{formattedDate(project.projectStartDate)}</span>
                      </div>
                  )}
                  
                  {project.projectCompletionDate && (
                      <div className="pd-stat-row">
                        <span className="pd-stat-label">Est. Completion</span>
                        <span className="pd-stat-val">{formattedDate(project.projectCompletionDate)}</span>
                      </div>
                  )}

                  <div className="pd-stat-row" style={{border: 'none'}}>
                      <span className="pd-stat-label">Status</span>
                      <span className="pd-stat-val" style={{color: 'var(--gold)', textTransform: 'capitalize'}}>{project.status}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* GALLERY TAB */}
          {activeTab === 'images' && galleryImages.length > 0 && (
             <div>
                <h2 className="section-title centered" style={{marginBottom: '3rem'}}>Project Gallery</h2>
                <div className="pd-gallery">
                  {galleryImages.map((img, i) => (
                    <div 
                        key={img.id || i} 
                        className="pd-gallery-img-wrap"
                        onClick={() => handleLightboxOpen(img)}
                    >
                      <img src={img.url} alt={img.caption || ''} className="pd-gallery-img" />
                      <div className="pd-gallery-caption">{img.caption}</div>
                    </div>
                  ))}
                </div>
             </div>
          )}

          {/* ROOMS TAB */}
          {activeTab === 'rooms' && rooms.length > 0 && (
             <div>
                <h2 className="section-title centered" style={{marginBottom: '3rem'}}>Rooms Configuration</h2>
                <div className="pd-rooms-grid">
                  {rooms.map((room) => {
                     const roomImg = room.images && room.images.length > 0 ? room.images[0]?.fileUrl : room.roomType?.primaryImage;
                     return (
                      <div key={room.id} className="pd-room-card">
                        {roomImg && (
                          <div 
                             className="pd-room-img-wrap" 
                             style={{cursor: room.images && room.images.length > 0 ? 'pointer' : 'default'}}
                             onClick={() => {
                                 if(room.images && room.images.length > 0) {
                                     handleLightboxOpen({
                                         url: roomImg,
                                         caption: `${room.roomType?.roomTypeName || 'Room'} - ${room.images[0].image_name || ''}`,
                                         imageDetails: room.images[0].imageDetails
                                     });
                                 }
                             }}
                          >
                            <img src={roomImg} alt="Room" className="pd-room-img" />
                          </div>
                        )}
                        <div className="pd-room-info">
                          <h3 className="pd-room-title">{room.roomType?.roomTypeName ?? 'Room'}</h3>
                          <p className="pd-room-desc">
                              {room.description || 'Spacious and carefully designed to maximize natural light and airflow.'}
                          </p>
                          <div className="pd-room-specs">
                              {room.details?.size && <span className="pd-room-spec">Size: {room.details.size}</span>}
                              {room.images && room.images.length > 0 && room.images[0].imageDetails && 
                                  Object.entries(room.images[0].imageDetails).slice(0, 3).map(([k, v]) => (
                                     <span key={k} className="pd-room-spec">{k}: {String(v)}</span>
                                  ))
                              }
                          </div>
                        </div>
                      </div>
                     );
                  })}
                </div>
             </div>
          )}

          {/* PROGRESS TAB */}
          {activeTab === 'progress' && progressItems.length > 0 && (
              <div>
                <h2 className="section-title centered" style={{marginBottom: '3rem'}}>Construction Progress</h2>
                {/* Standard grid, assuming progress models might be basic lists or images */}
                <div className="pd-grid" style={{gridTemplateColumns: '1fr'}}>
                    <p style={{color: 'var(--grey)', textAlign: 'center'}}>Progress updates are being tracked for this project.</p>
                </div>
              </div>
          )}

        </div>
      </div>

      {/* LIGHTBOX MODAL EXPLORER */}
      {lightboxImg && (
        <div className="pd-lightbox" onClick={() => setLightboxImg(null)}>
          <button className="pd-lightbox-close" onClick={() => setLightboxImg(null)} aria-label="Close">✕</button>
          
          <div className="pd-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="pd-lightbox-img-container">
                <img src={lightboxImg.url} alt={lightboxImg.caption || ''} className="pd-lightbox-img" />
            </div>

            {/* If there are specific image details (e.g. from rooms mapping) */}
            {lightboxImg.imageDetails && Object.keys(lightboxImg.imageDetails).length > 0 && (
              <div className="pd-lightbox-details">
                <div className="pd-lightbox-title">Specification Details</div>
                <div className="pd-lightbox-details-grid">
                  {Object.entries(lightboxImg.imageDetails).map(([key, val]) => {
                    if (val && typeof val === 'object' && 'label' in val && 'value' in val) {
                      const spec = val as { label: string; value: string };
                      return (
                        <div key={key} className="pd-lightbox-spec">
                          <span className="pd-lightbox-spec-label">{spec.label}</span>
                          <span className="pd-lightbox-spec-val">{spec.value}</span>
                        </div>
                      );
                    }
                    return (
                      <div key={key} className="pd-lightbox-spec">
                        <span className="pd-lightbox-spec-label">{key}</span>
                        <span className="pd-lightbox-spec-val">{String(val)}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
}