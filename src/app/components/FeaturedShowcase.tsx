import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { type Project, categoryIcons } from '../data/projects';
import { prefersReducedMotion } from '../lib/reducedMotion';

gsap.registerPlugin(ScrollTrigger);

interface Props {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export function FeaturedShowcase({ projects, onSelectProject }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      // Parallax en cada featured card
      gsap.utils.toArray<HTMLElement>('.featured-card').forEach((card, i) => {
        const direction = i % 2 === 0 ? 50 : -50;

        gsap.fromTo(card,
          { y: direction, opacity: 0.3 },
          {
            y: -direction,
            opacity: 1,
            scrollTrigger: {
              trigger: card,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.5,
            },
          }
        );

        // Línea decorativa animada
        const line = card.querySelector('.featured-line');
        if (line) {
          gsap.fromTo(line,
            { scaleX: 0 },
            {
              scaleX: 1,
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 40%',
                scrub: true,
              },
            }
          );
        }
      });

      // Counter animation para métricas
      gsap.utils.toArray<HTMLElement>('.featured-metric').forEach((el) => {
        const value = el.dataset.value;
        if (!value) return;

        // Solo animar números
        const numMatch = value.match(/^(\d+)/);
        if (numMatch) {
          // const num = parseInt(numMatch[1]);
          const suffix = value.replace(numMatch[1], '');

          ScrollTrigger.create({
            trigger: el,
            start: 'top 85%',
            once: true,
            onEnter: () => {
              gsap.fromTo(el,
                { textContent: '0' + suffix },
                {
                  textContent: value,
                  duration: 1.5,
                  ease: 'power2.out',
                  snap: { textContent: 1 },
                  onUpdate: function () {
                    const current = Math.round(gsap.getProperty(el, 'textContent') as number);
                    el.textContent = current + suffix;
                  }
                }
              );
            }
          });
        }
      });

    }, containerRef);

    return () => ctx.revert();
  }, [projects]);

  return (
    <div ref={containerRef} className="featured-showcase">
      <div className="featured-header">
        <span className="dots">✦ DESTACADOS</span>
        <h3 className="h3">Proyectos que marcan la diferencia</h3>
      </div>

      <div className="featured-grid">
        {projects.map((project, index) => (
          <article
            key={project.id}
            className="featured-card"
            onClick={() => onSelectProject(project)}
          >
            {/* Background Image with Overlay */}
            {project.image && (
              <>
                <div className="featured-bg-overlay"></div>
                <img src={project.image} alt="" className="featured-bg-image" />
              </>
            )}

            {/* Decorative number */}
            <span className="featured-number dots">{String(index + 1).padStart(2, '0')}</span>

            {/* Animated line */}
            <div className="featured-line" />

            {/* Content */}
            <div className="featured-content">
              <div className="featured-category">
                <span>{categoryIcons[project.category]}</span>
                <span className="mono">{project.code}</span>
              </div>

              <h4 className="featured-title">{project.title}</h4>
              <p className="featured-tagline">{project.tagline}</p>

              {/* Big metric */}
              <div className="featured-metrics">
                {project.highlights.slice(0, 2).map((h, i) => (
                  <div key={i} className="featured-metric-item">
                    <span
                      className="featured-metric"
                      data-value={h.metric}
                    >
                      {h.metric}
                    </span>
                    <span className="featured-metric-label mono">{h.label}</span>
                  </div>
                ))}
              </div>

              {/* Tags preview */}
              <div className="featured-tags">
                {project.tags.slice(0, 3).map(tag => (
                  <span key={tag} className="tag tag--sm">{tag}</span>
                ))}
              </div>
            </div>

            {/* Hover arrow */}
            <div className="featured-arrow">→</div>
          </article>
        ))}
      </div>
    </div>
  );
}
