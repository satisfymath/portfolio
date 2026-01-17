import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { type Project, categoryLabels, categoryIcons } from '../data/projects';
import { prefersReducedMotion } from '../lib/reducedMotion';

interface Props {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;

    const overlay = overlayRef.current;
    const modal = modalRef.current;
    if (!overlay || !modal) return;

    // Lock scroll
    document.body.style.overflow = 'hidden';

    if (!prefersReducedMotion()) {
      // Animate in
      gsap.fromTo(overlay,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
      gsap.fromTo(modal,
        { opacity: 0, y: 60, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 }
      );

      // Stagger content
      gsap.fromTo('.modal-section',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.5, ease: 'power3.out', delay: 0.3 }
      );
    }

    // ESC to close
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [project, onClose]);

  const handleClose = () => {
    const overlay = overlayRef.current;
    const modal = modalRef.current;

    if (!prefersReducedMotion() && overlay && modal) {
      gsap.to(modal, { opacity: 0, y: 40, scale: 0.95, duration: 0.3, ease: 'power2.in' });
      gsap.to(overlay, { opacity: 0, duration: 0.3, delay: 0.1, onComplete: onClose });
    } else {
      onClose();
    }
  };

  if (!project) return null;

  const visibilityConfig = {
    public: { label: 'Público', class: 'visibility--public' },
    private: { label: 'Privado', class: 'visibility--private' },
    confidential: { label: 'Confidencial (NDA)', class: 'visibility--confidential' },
  }[project.visibility];

  return (
    <div ref={overlayRef} className="modal-overlay" onClick={handleClose}>
      <div
        ref={modalRef}
        className="modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button className="modal-close" onClick={handleClose} aria-label="Cerrar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Image Banner */}
        {project.image && (
          <div className="modal-image-container modal-section">
            <img src={project.image} alt={project.title} className="modal-image" />
            <div className="modal-image-overlay" />
          </div>
        )}

        {/* Header */}
        <div className="modal-header modal-section">
          <div className="modal-header-top">
            <span className="project-code dots">{project.code}</span>
            <span className={`project-visibility ${visibilityConfig.class}`}>
              {visibilityConfig.label}
            </span>
          </div>
          <div className="project-category">
            <span className="project-category-icon">{categoryIcons[project.category]}</span>
            <span className="mono">{categoryLabels[project.category]}</span>
          </div>
          <h2 className="h2 modal-title">{project.title}</h2>
          <p className="modal-tagline">{project.tagline}</p>
        </div>

        {/* Description */}
        <div className="modal-section">
          <h3 className="modal-section-title mono">// DESCRIPCIÓN</h3>
          <p className="modal-description">{project.description}</p>
        </div>

        {/* Tech Stack */}
        <div className="modal-section">
          <h3 className="modal-section-title mono">// STACK TÉCNICO</h3>
          <div className="project-tags project-tags--large">
            {project.tags.map((tag) => (
              <span key={tag} className="tag">{tag}</span>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="modal-section">
          <h3 className="modal-section-title mono">// MÉTRICAS CLAVE</h3>
          <div className="modal-highlights">
            {project.highlights.map((h, i) => (
              <div key={i} className="modal-highlight">
                <span className="modal-highlight-metric">{h.metric}</span>
                <span className="modal-highlight-label mono">{h.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Seniority Signals */}
        <div className="modal-section">
          <h3 className="modal-section-title mono">// SEÑALES DE SENIORITY</h3>
          <ul className="modal-signals">
            {project.senioritySignals.map((signal, i) => (
              <li key={i} className="modal-signal">
                <span className="signal-bullet">▸</span>
                {signal}
              </li>
            ))}
          </ul>
        </div>

        {/* Meta info */}
        <div className="modal-section modal-meta">
          {project.year && (
            <div className="modal-meta-item">
              <span className="mono">Año:</span>
              <span>{project.year}</span>
            </div>
          )}
          {project.duration && (
            <div className="modal-meta-item">
              <span className="mono">Duración:</span>
              <span>{project.duration}</span>
            </div>
          )}
        </div>

        {/* Links */}
        {(project.links.demo || project.links.repo || project.links.case) && (
          <div className="modal-section modal-links">
            {project.links.demo && (
              <a href={project.links.demo} className="btn-primary" target="_blank" rel="noopener noreferrer">
                Ver Demo
              </a>
            )}
            {project.links.repo && (
              <a href={project.links.repo} className="btn-ghost" target="_blank" rel="noopener noreferrer">
                Ver Código
              </a>
            )}
            {project.links.case && (
              <a href={project.links.case} className="btn-ghost" target="_blank" rel="noopener noreferrer">
                Ver Caso de Estudio
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
