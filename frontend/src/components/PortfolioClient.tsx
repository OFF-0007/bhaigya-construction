'use client';

import { Project } from '@/types/api';

interface PortfolioClientProps {
  projects: Project[];
  isMainPage?: boolean;
  unstructured?: boolean;
}

export default function PortfolioClient({ projects, isMainPage = false, unstructured = false }: PortfolioClientProps) {
  if (!projects || !Array.isArray(projects) || projects.length === 0) {
    return null;
  }

  const useUnstructured = unstructured || isMainPage;
  
  return (
    <div className={`portfolio-grid ${useUnstructured ? 'unstructured' : ''}`}>
      {projects.slice(0, isMainPage ? 8 : undefined).map((project, index) => {
        const bgUrl = project.primaryImage?.fileUrl ?? 
                     project.images?.find(img => img.isPrimary)?.fileUrl ?? 
                     project.images?.[0]?.fileUrl ?? 
                     null;
        
        return (
          <div
            key={project.id}
            className="portfolio-item reveal-up"
            id={`portfolio-${project.slug}`}
            role="button"
            tabIndex={0}
            aria-label={`View details for ${project.projectName}`}
            onClick={() => project.slug && (window.location.href = `/projects/${project.slug}`)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                project.slug && (window.location.href = `/projects/${project.slug}`);
              }
            }}
            style={{ cursor: 'pointer' }}
          >
            {/* Background image or placeholder */}
            {bgUrl ? (
              <div
                className="portfolio-img"
                style={{ 
                    backgroundImage: `url('${bgUrl}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
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
            <a 
              href={project.slug ? `/projects/${project.slug}` : '#'} 
              className="portfolio-link" 
              aria-label={`View ${project.projectName || 'project'} details`}
              onClick={(e) => e.stopPropagation()}
            >
              View Details →
            </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
