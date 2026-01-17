import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { type Project, categoryLabels, categoryIcons } from '../data/projects';
import { prefersReducedMotion } from '../lib/reducedMotion';

interface Props {
  project: Project;
  index: number;
  onSelect?: (project: Project) => void;
}

export function ProjectCard({ project, index, onSelect }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Efecto de brillo que sigue el mouse
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      gsap.to(glow, {
        x: x - 100,
        y: y - 100,
        duration: 0.3,
        ease: 'power2.out',
      });
    };

    const handleMouseEnter = () => {
      gsap.to(glow, { opacity: 1, duration: 0.3 });
      gsap.to(card, {
        y: -8,
        scale: 1.02,
        duration: 0.4,
        ease: 'power3.out'
      });
    };

    const handleMouseLeave = () => {
      gsap.to(glow, { opacity: 0, duration: 0.3 });
      gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: 'power3.out'
      });
    };

    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseenter', handleMouseEnter);
    card.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseenter', handleMouseEnter);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const visibilityConfig = {
    public: { label: 'Público', class: 'visibility--public' },
    private: { label: 'Privado', class: 'visibility--private' },
    confidential: { label: 'Confidencial (NDA)', class: 'visibility--confidential' },
  }[project.visibility];

  return (
    <article
      ref={cardRef}
      className={`project-card project-card--${project.visibility}`}
      style={{ '--index': index } as React.CSSProperties}
      onClick={() => onSelect?.(project)}
    >
      {/* Glow effect */}
      <div ref={glowRef} className="project-card-glow" />

      {/* Cover Image */}
      {project.image && (
        <div className="project-cover-container">
          <div className="project-cover-overlay"></div>
          <img src={project.image} alt={project.title} className="project-cover-image" loading="lazy" />
        </div>
      )}

      {/* Header */}
      <div className="project-card-header">
        <span className="project-code dots">{project.code}</span>
        <span className={`project-visibility ${visibilityConfig.class}`}>
          {visibilityConfig.label}
        </span>
      </div>

      {/* Category badge */}
      <div className="project-category">
        <span className="project-category-icon">{categoryIcons[project.category]}</span>
        <span className="mono">{categoryLabels[project.category]}</span>
      </div>

      {/* Content */}
      <h3 className="project-title">{project.title}</h3>
      <p className="project-tagline">{project.tagline}</p>

      {/* Tags */}
      <div className="project-tags">
        {project.tags.slice(0, 4).map((tag) => (
          <span key={tag} className="tag">{tag}</span>
        ))}
        {project.tags.length > 4 && (
          <span className="tag tag--more">+{project.tags.length - 4}</span>
        )}
      </div>

      {/* Highlights (métricas) */}
      <div className="project-highlights">
        {project.highlights.map((h, i) => (
          <div key={i} className="project-highlight">
            <div className="highlight-content">
              <span className="highlight-metric">{h.metric}</span>
              <span className="highlight-label mono">{h.label}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="project-card-footer">
        {project.year && (
          <span className="project-year mono">{project.year}</span>
        )}
        {project.duration && (
          <span className="project-duration mono">{project.duration}</span>
        )}
        <span className="project-view-more">
          Ver detalles →
        </span>
      </div>
    </article>
  );
}
