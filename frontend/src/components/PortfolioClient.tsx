'use client';

import { useState } from 'react';
import { Project } from '@/types/api';
import ProjectDetailModal from './ProjectDetailModal';

interface PortfolioClientProps {
  projects: Project[];
}

export default function PortfolioClient({ projects }: PortfolioClientProps) {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <>
      <div className="portfolio-grid">
        {projects.map((project, index) => {
          const bgUrl = project.primaryImage?.fileUrl ?? null;
          // First item or any featured item gets large treatment
          const isLarge = project.isFeatured || index === 0;

          return (
            <div
              key={project.id}
              className={`portfolio-item ${isLarge ? 'large' : ''} reveal-up`}
              id={`portfolio-${project.slug}`}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${project.projectName}`}
              onClick={() => setSelected(project)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setSelected(project);
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              {/* Background image or placeholder */}
              {bgUrl ? (
                <div
                  className="portfolio-img"
                  style={{ backgroundImage: `url('${bgUrl}')` }}
                  role="img"
                  aria-label={project.primaryImage?.altText ?? project.projectName}
                />
              ) : (
                <div
                  className="portfolio-img portfolio-img-placeholder"
                  role="img"
                  aria-label={project.projectName}
                >
                  <div className="portfolio-placeholder-icon">🏗️</div>
                </div>
              )}

              {/* Overlay */}
              <div className="portfolio-overlay">
                {project.projectType && (
                  <div className="portfolio-tag">{project.projectType.name}</div>
                )}
                <h3 className="portfolio-title">{project.projectName}</h3>
                {project.projectLocation && (
                  <p className="portfolio-loc">📍 {project.projectLocation}</p>
                )}
                <p className="portfolio-sub">{project.description}</p>
                <div className="portfolio-meta-row">
                  {project.status && (
                    <span className={`portfolio-status portfolio-status--${project.status}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  )}
                  {(project.numberOfRooms != null || project.numberOfFloors != null) && (
                    <span className="portfolio-specs">
                      {project.numberOfRooms != null && `${project.numberOfRooms} Rooms`}
                      {project.numberOfRooms != null && project.numberOfFloors != null && ' · '}
                      {project.numberOfFloors != null && `${project.numberOfFloors} Floors`}
                    </span>
                  )}
                </div>
                <button className="portfolio-link" aria-label={`View ${project.projectName} details`}>
                  View Details →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {selected && (
        <ProjectDetailModal
          project={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
