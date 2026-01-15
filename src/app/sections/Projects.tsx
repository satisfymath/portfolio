import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../components/Section';
import { prefersReducedMotion } from '../lib/reducedMotion';
import { projects, type Project } from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project }: { project: Project }) {
    const visibilityLabel = {
        public: 'Público',
        private: 'Privado',
        confidential: 'Confidencial (NDA)',
    }[project.visibility];

    const hasLink = project.links.demo || project.links.repo || project.links.case;

    return (
        <article
            className={`project-card ${project.visibility === 'confidential' ? 'project-card--confidential' : ''}`}
        >
            <span className={`project-visibility ${project.visibility === 'public' ? 'project-visibility--public' : ''}`}>
                {visibilityLabel}
            </span>

            <h3 className="project-title">{project.title}</h3>
            <p className="project-tagline">{project.tagline}</p>

            <div className="project-tags">
                {project.tags.map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                ))}
            </div>

            <ul className="project-highlights">
                {project.highlights.map((highlight, i) => (
                    <li key={i}>{highlight}</li>
                ))}
            </ul>

            {hasLink && (
                <div>
                    {project.links.demo && (
                        <a href={project.links.demo} className="project-link" target="_blank" rel="noopener noreferrer">
                            Ver demo →
                        </a>
                    )}
                    {project.links.repo && !project.links.demo && (
                        <a href={project.links.repo} className="project-link" target="_blank" rel="noopener noreferrer">
                            Ver código →
                        </a>
                    )}
                    {project.links.case && !project.links.demo && !project.links.repo && (
                        <a href={project.links.case} className="project-link" target="_blank" rel="noopener noreferrer">
                            Ver caso →
                        </a>
                    )}
                </div>
            )}
        </article>
    );
}

export function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            gsap.from('.project-card', {
                scrollTrigger: {
                    trigger: '.projects-grid',
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse',
                },
                y: 60,
                opacity: 0,
                stagger: 0.12,
                duration: 0.8,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <Section id="projects">
            <div ref={sectionRef} className="container" style={{ position: 'relative', padding: '120px 0' }}>
                <div className="dots" style={{ color: 'var(--muted)', marginBottom: 16 }}>
                    01 / PROYECTOS
                </div>

                <h2 className="h2" style={{ marginBottom: 12 }}>
                    Casos y sistemas construidos
                </h2>

                <p className="mono" style={{ maxWidth: 640 }}>
                    Proyectos públicos, privados y confidenciales (NDA). Cards con stack, highlights y accesos.
                </p>

                <div className="projects-grid">
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            </div>
        </Section>
    );
}
