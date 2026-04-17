'use client';

import { useState, useEffect, useCallback } from 'react';
import { Project, ProjectRoomImage } from '@/types/api';

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

type Tab = 'overview' | 'rooms' | 'progress' | 'amenities';

const statusLabel: Record<string, string> = {
  ongoing: 'Ongoing',
  completed: 'Completed',
  upcoming: 'Upcoming',
};

const statusColor: Record<string, string> = {
  ongoing: '#C5A059',
  completed: '#4ade80',
  upcoming: '#60a5fa',
};

export default function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [activeRoomIdx, setActiveRoomIdx] = useState(0);
  const [roomImgIdx, setRoomImgIdx] = useState(0);
  // Lightbox: opened by clicking a room image
  const [lightboxImg, setLightboxImg] = useState<ProjectRoomImage | null>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (lightboxImg) {
          setLightboxImg(null); // close lightbox first
        } else {
          onClose();
        }
      }
    },
    [onClose, lightboxImg]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  // Reset room image index when switching rooms
  useEffect(() => { setRoomImgIdx(0); }, [activeRoomIdx]);

  const allImages = project.images ?? [];
  const hasImages = allImages.length > 0;
  const heroBg = project.primaryImage?.fileUrl
    ?? allImages[0]?.fileUrl
    ?? null;

  const rooms = project.rooms ?? [];
  const currentRoom = rooms[activeRoomIdx] ?? null;
  const currentRoomImages = currentRoom?.images ?? [];
  const currentRoomImg = currentRoomImages[roomImgIdx] ?? currentRoom?.primaryImage ?? null;

  const progressItems = project.progress ?? [];
  const amenities = project.amenities ?? [];

  const hasRooms = rooms.length > 0;
  const hasProgress = progressItems.length > 0;
  const hasAmenities = amenities.length > 0;

  const tabs: { key: Tab; label: string; show: boolean }[] = [
    { key: 'overview', label: 'Overview', show: true },
    { key: 'rooms', label: `Rooms (${rooms.length})`, show: hasRooms },
    { key: 'progress', label: 'Progress', show: hasProgress },
    { key: 'amenities', label: 'Amenities', show: hasAmenities },
  ];

  return (
    <>
    <div
      className="proj-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.projectName} details`}
      onClick={onClose}
    >
      <div className="proj-modal-panel" onClick={(e) => e.stopPropagation()}>

        {/* ── Close ── */}
        <button className="proj-modal-close" onClick={onClose} aria-label="Close">✕</button>

        {/* ── Hero Image ── */}
        <div
          className="proj-modal-hero"
          style={{ backgroundImage: heroBg ? `url('${heroBg}')` : undefined }}
          aria-label={`${project.projectName} hero image`}
        >
          <div className="proj-modal-hero-overlay">
            <div className="proj-modal-status-badge" style={{ color: statusColor[project.status] ?? '#C5A059', borderColor: statusColor[project.status] ?? '#C5A059' }}>
              {statusLabel[project.status] ?? project.status}
            </div>
            <h2 className="proj-modal-hero-title">{project.projectName}</h2>
            {project.projectLocation && (
              <p className="proj-modal-hero-loc">📍 {project.projectLocation}{project.district ? `, ${project.district.name}` : ''}</p>
            )}
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="proj-modal-tabs">
          {tabs.filter(t => t.show).map(t => (
            <button
              key={t.key}
              className={`proj-modal-tab ${activeTab === t.key ? 'active' : ''}`}
              onClick={() => setActiveTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ══════════ OVERVIEW TAB ══════════ */}
        {activeTab === 'overview' && (
          <div className="proj-modal-body">
            {/* Description */}
            <p className="proj-modal-desc">{project.description}</p>

            {/* Key Stats */}
            <div className="proj-modal-stats-grid">
              {project.projectType && (
                <div className="proj-stat-item">
                  <span className="proj-stat-label">Type</span>
                  <span className="proj-stat-value">{project.projectType.name}</span>
                </div>
              )}
              {project.servicePackage && (
                <div className="proj-stat-item">
                  <span className="proj-stat-label">Package</span>
                  <span className="proj-stat-value">{project.servicePackage.title}</span>
                </div>
              )}
              {project.numberOfFloors != null && (
                <div className="proj-stat-item">
                  <span className="proj-stat-label">Floors</span>
                  <span className="proj-stat-value">{project.numberOfFloors}</span>
                </div>
              )}
              {project.numberOfRooms != null && (
                <div className="proj-stat-item">
                  <span className="proj-stat-label">Rooms</span>
                  <span className="proj-stat-value">{project.numberOfRooms}</span>
                </div>
              )}
              {project.numberOfWashrooms != null && (
                <div className="proj-stat-item">
                  <span className="proj-stat-label">Washrooms</span>
                  <span className="proj-stat-value">{project.numberOfWashrooms}</span>
                </div>
              )}
              {project.totalArea && (
                <div className="proj-stat-item">
                  <span className="proj-stat-label">Total Area</span>
                  <span className="proj-stat-value">{project.totalArea} {project.areaUnit?.toUpperCase()}</span>
                </div>
              )}
              {project.carpetArea && (
                <div className="proj-stat-item">
                  <span className="proj-stat-label">Carpet Area</span>
                  <span className="proj-stat-value">{project.carpetArea} {project.areaUnit?.toUpperCase()}</span>
                </div>
              )}
              {project.projectStartDate && (
                <div className="proj-stat-item">
                  <span className="proj-stat-label">Started</span>
                  <span className="proj-stat-value">{new Date(project.projectStartDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                </div>
              )}
              {project.projectCompletionDate && (
                <div className="proj-stat-item">
                  <span className="proj-stat-label">Completion</span>
                  <span className="proj-stat-value">{new Date(project.projectCompletionDate).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</span>
                </div>
              )}
            </div>

            {/* Image Gallery */}
            {hasImages && (
              <div className="proj-modal-section">
                <h3 className="proj-modal-section-title">Gallery</h3>
                <div className="proj-gallery-main">
                  <img
                    src={allImages[activeImageIdx]?.fileUrl}
                    alt={allImages[activeImageIdx]?.altText ?? project.projectName}
                    className="proj-gallery-main-img"
                  />
                  {allImages.length > 1 && (
                    <>
                      <button className="proj-gallery-nav proj-gallery-nav--prev" onClick={() => setActiveImageIdx(i => (i - 1 + allImages.length) % allImages.length)}>‹</button>
                      <button className="proj-gallery-nav proj-gallery-nav--next" onClick={() => setActiveImageIdx(i => (i + 1) % allImages.length)}>›</button>
                    </>
                  )}
                </div>
                {allImages.length > 1 && (
                  <div className="proj-gallery-thumbs">
                    {allImages.map((img, i) => (
                      <button
                        key={img.id}
                        className={`proj-gallery-thumb ${i === activeImageIdx ? 'active' : ''}`}
                        onClick={() => setActiveImageIdx(i)}
                        aria-label={`View image ${i + 1}`}
                        style={{ backgroundImage: `url('${img.fileUrl}')` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Address */}
            {project.address && (
              <div className="proj-modal-section">
                <h3 className="proj-modal-section-title">Location</h3>
                <p className="proj-modal-text">{project.address}</p>
              </div>
            )}

            {/* CTA */}
            <div className="proj-modal-cta-wrap">
              <a href="#contact" className="proj-modal-cta proj-modal-cta--gold" onClick={onClose}>
                Enquire About This Project →
              </a>
              <button className="proj-modal-cta proj-modal-cta--outline" onClick={onClose}>
                Back to Projects
              </button>
            </div>
          </div>
        )}

        {/* ══════════ ROOMS TAB ══════════ */}
        {activeTab === 'rooms' && hasRooms && (
          <div className="proj-modal-body">
            {/* Room selector */}
            <div className="proj-room-tabs">
              {rooms.map((room, i) => (
                <button
                  key={room.id}
                  className={`proj-room-tab ${i === activeRoomIdx ? 'active' : ''}`}
                  onClick={() => setActiveRoomIdx(i)}
                >
                  {room.roomType?.name ?? `Room ${i + 1}`}
                </button>
              ))}
            </div>

            {currentRoom && (
              <div className="proj-room-detail">
                {/* Room image */}
                {currentRoomImg?.fileUrl ? (
                  <div className="proj-room-gallery">
                    <div
                      className="proj-room-main-img-wrap proj-room-main-img-wrap--clickable"
                      title="Click to view details"
                    >
                      <img
                        src={currentRoomImg.fileUrl}
                        alt={currentRoomImg.altText ?? currentRoom.roomType?.name ?? 'Room image'}
                        className="proj-room-main-img"
                        onClick={() => setLightboxImg(currentRoomImg)}
                        style={{ cursor: 'zoom-in' }}
                      />
                      {/* Zoom hint badge */}
                      <div className="proj-room-img-hint">🔍 Click for details</div>
                      {currentRoomImages.length > 1 && (
                        <>
                          <button className="proj-gallery-nav proj-gallery-nav--prev" onClick={() => setRoomImgIdx(i => (i - 1 + currentRoomImages.length) % currentRoomImages.length)}>‹</button>
                          <button className="proj-gallery-nav proj-gallery-nav--next" onClick={() => setRoomImgIdx(i => (i + 1) % currentRoomImages.length)}>›</button>
                        </>
                      )}
                    </div>
                    {currentRoomImages.length > 1 && (
                      <div className="proj-gallery-thumbs">
                        {currentRoomImages.map((img, i) => (
                          <button
                            key={img.id}
                            className={`proj-gallery-thumb ${i === roomImgIdx ? 'active' : ''}`}
                            onClick={() => { setRoomImgIdx(i); }}
                            style={{ backgroundImage: `url('${img.fileUrl}')` }}
                            aria-label={`View room image ${i + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="proj-room-no-img">🏗️ No images uploaded</div>
                )}

                {/* Room details */}
                <div className="proj-room-info">
                  <h3 className="proj-room-name">{currentRoom.roomType?.name ?? 'Room'}</h3>
                  {currentRoom.description && (
                    <p className="proj-modal-text">{currentRoom.description}</p>
                  )}
                  {currentRoom.details && Object.keys(currentRoom.details).length > 0 && (
                    <div className="proj-room-specs">
                      {Object.entries(currentRoom.details).map(([key, val]) => (
                        <div key={key} className="proj-room-spec-item">
                          <span className="proj-room-spec-label">{key.replace(/_/g, ' ')}</span>
                          <span className="proj-room-spec-value">{String(val)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══════════ PROGRESS TAB ══════════ */}
        {activeTab === 'progress' && hasProgress && (
          <div className="proj-modal-body">
            <div className="proj-progress-timeline">
              {progressItems.map((item, i) => (
                <div key={item.id} className="proj-progress-item">
                  <div className="proj-progress-dot" style={{ background: item.status === 'completed' ? '#4ade80' : item.status === 'in_progress' ? '#C5A059' : '#60a5fa' }} />
                  {i < progressItems.length - 1 && <div className="proj-progress-line" />}
                  <div className="proj-progress-content">
                    <div className="proj-progress-header">
                      <span className="proj-progress-title">{item.title}</span>
                      {item.progressDate && (
                        <span className="proj-progress-date">
                          {new Date(item.progressDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                      )}
                    </div>
                    {item.description && <p className="proj-progress-desc">{item.description}</p>}
                    <span className="proj-progress-status">{item.status.replace(/_/g, ' ')}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════ AMENITIES TAB ══════════ */}
        {activeTab === 'amenities' && hasAmenities && (
          <div className="proj-modal-body">
            <div className="proj-amenities-grid">
              {amenities.map(a => (
                <div key={a.id} className="proj-amenity-item">
                  <span className="proj-amenity-icon">{a.icon ?? '✦'}</span>
                  <span className="proj-amenity-name">{a.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>

    {/* ══════════ ROOM IMAGE LIGHTBOX ══════════ */}
    {(() => {
      const lb = lightboxImg;
      if (!lb) return null;
      const hasSpecs = lb.imageDetails != null && Object.keys(lb.imageDetails).length > 0;
      const hasNoInfo = !hasSpecs && !lb.image_name && !lb.altText;
      return (
        <div
          className="room-lightbox-backdrop"
          onClick={() => setLightboxImg(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Room image detail"
        >
          <div className="room-lightbox-panel" onClick={(e) => e.stopPropagation()}>
            <button
              className="proj-modal-close room-lightbox-close"
              onClick={() => setLightboxImg(null)}
              aria-label="Close image detail"
            >
              ✕
            </button>

            {/* Full image */}
            <div className="room-lightbox-img-wrap">
              <img
                src={lb.fileUrl!}
                alt={lb.altText ?? 'Room image'}
                className="room-lightbox-img"
              />
            </div>

            {/* Details panel */}
            <div className="room-lightbox-info">
              {lb.image_name && (
                <h3 className="room-lightbox-title">{lb.image_name}</h3>
              )}
              {lb.altText && (
                <p className="room-lightbox-alt">{lb.altText}</p>
              )}

              {hasSpecs && (
                <div className="room-lightbox-specs">
                  <div className="room-lightbox-specs-title">Specifications</div>
                  <div className="room-lightbox-specs-grid">
                  {Object.entries(lb.imageDetails!).map(([key, val]) => {
                    // Fallback for legacy DB records that stored arrays like [{"label":"color", "value":"red"}]
                    if (val && typeof val === 'object' && 'label' in (val as any) && 'value' in (val as any)) {
                      return (
                        <div key={key} className="room-lightbox-spec-item">
                          <span className="proj-room-spec-label">{String((val as any).label).replace(/_/g, ' ')}</span>
                          <span className="proj-room-spec-value">{String((val as any).value)}</span>
                        </div>
                      );
                    }
                    return (
                      <div key={key} className="room-lightbox-spec-item">
                        <span className="proj-room-spec-label">{key.replace(/_/g, ' ')}</span>
                        <span className="proj-room-spec-value">{String(val)}</span>
                      </div>
                    );
                  })}
                </div>
                </div>
              )}

              {hasNoInfo && (
                <p className="room-lightbox-alt" style={{ opacity: 0.5 }}>No additional details available.</p>
              )}
            </div>
          </div>
        </div>
      );
    })()}
    </>
  );
}
