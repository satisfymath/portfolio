import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../components/Section';
import { FilterBar } from '../components/FilterBar';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectModal } from '../components/ProjectModal';
import { FeaturedShowcase } from '../components/FeaturedShowcase';
import { CategoryNav } from '../components/CategoryNav';
import { prefersReducedMotion } from '../lib/reducedMotion';
import {
    projects,
    type Project,
    type ProjectCategory,
    categoryLabels,
    categoryIcons,
    getAllCategories,
    getProjectsByCategory,
    getFeaturedProjects,
} from '../data/projects';

gsap.registerPlugin(ScrollTrigger);

export function Projects() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'all'>('all');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Calcular conteos por categoría
    const projectCounts = useMemo(() => {
        const counts: Record<ProjectCategory | 'all', number> = {
            'all': projects.length,
            'data-ml': 0,
            'automation-ai': 0,
            'web-platforms': 0,
            'scraping-etl': 0,
        };

        projects.forEach(p => {
            counts[p.category]++;
        });

        return counts;
    }, []);

    // Proyectos filtrados
    const filteredProjects = useMemo(() => {
        if (activeCategory === 'all') {
            return [...projects].sort((a, b) => a.order - b.order);
        }
        return getProjectsByCategory(activeCategory);
    }, [activeCategory]);

    // Proyectos destacados
    const featuredProjects = useMemo(() => getFeaturedProjects(), []);

    // Animaciones GSAP
    useEffect(() => {
        if (prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            // Header animation
            gsap.from('.projects-header', {
                scrollTrigger: {
                    trigger: '.projects-header',
                    start: 'top 85%',
                },
                y: 40,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out',
            });

            // Stats counter animation
            gsap.utils.toArray<HTMLElement>('.stat-number').forEach(el => {
                const target = parseInt(el.dataset.value || '0');

                ScrollTrigger.create({
                    trigger: el,
                    start: 'top 85%',
                    once: true,
                    onEnter: () => {
                        gsap.fromTo(el,
                            { textContent: 0 },
                            {
                                textContent: target,
                                duration: 2,
                                ease: 'power2.out',
                                snap: { textContent: 1 },
                            }
                        );
                    }
                });
            });

            // Cards stagger
            ScrollTrigger.batch('.project-card', {
                start: 'top 85%',
                onEnter: (elements) => {
                    gsap.fromTo(elements,
                        { y: 60, opacity: 0 },
                        {
                            y: 0,
                            opacity: 1,
                            stagger: 0.08,
                            duration: 0.7,
                            ease: 'power3.out'
                        }
                    );
                },
            });

            // Category sections reveal
            gsap.utils.toArray<HTMLElement>('.category-section').forEach(section => {
                gsap.from(section.querySelector('.category-header'), {
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 80%',
                    },
                    x: -40,
                    opacity: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, [filteredProjects]);

    // Re-animar cards cuando cambia el filtro
    useEffect(() => {
        if (prefersReducedMotion()) return;

        gsap.fromTo('.project-card',
            { opacity: 0, y: 30, scale: 0.95 },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                stagger: 0.05,
                duration: 0.4,
                ease: 'power2.out'
            }
        );
    }, [activeCategory]);

    return (
        <Section id="projects">
            <div ref={sectionRef} className="container projects-container">

                {/* Header */}
                <div className="projects-header">
                    <div className="dots" style={{ color: 'var(--muted)', marginBottom: 16 }}>
                        01 / PROYECTOS
                    </div>

                    <h2 className="h1">
                        Casos y sistemas<br />
                        <span className="text-accent">construidos</span>
                    </h2>

                    <p className="projects-intro">
                        17 proyectos de consultoría real: desde pipelines de ML hasta
                        plataformas web y sistemas de scraping empresarial.
                    </p>

                    {/* Stats */}
                    <div className="projects-stats">
                        <div className="stat">
                            <span className="stat-number" data-value="17">0</span>
                            <span className="stat-label mono">Proyectos</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number" data-value="4">0</span>
                            <span className="stat-label mono">Categorías</span>
                        </div>
                        <div className="stat">
                            <span className="stat-number" data-value="12">0</span>
                            <span className="stat-label mono">Tecnologías</span>
                        </div>
                    </div>
                </div>

                {/* Featured Showcase */}
                <FeaturedShowcase
                    projects={featuredProjects}
                    onSelectProject={setSelectedProject}
                />

                {/* Filter Bar */}
                <FilterBar
                    activeCategory={activeCategory}
                    onCategoryChange={setActiveCategory}
                    projectCounts={projectCounts}
                />

                {/* Category Navigation (lateral) */}
                {activeCategory === 'all' && (
                    <CategoryNav currentCategory={null} />
                )}

                {/* Projects Display */}
                {activeCategory === 'all' ? (
                    // Vista por categorías
                    <div className="projects-by-category">
                        {getAllCategories().map((category) => {
                            const categoryProjects = getProjectsByCategory(category);

                            return (
                                <div
                                    key={category}
                                    id={`category-${category}`}
                                    className="category-section"
                                >
                                    <div className="category-header">
                                        <span className="category-icon">{categoryIcons[category]}</span>
                                        <h3 className="h3">{categoryLabels[category]}</h3>
                                        <span className="category-count mono">{categoryProjects.length} proyectos</span>
                                    </div>

                                    <div className="projects-grid">
                                        {categoryProjects.map((project, index) => (
                                            <ProjectCard
                                                key={project.id}
                                                project={project}
                                                index={index}
                                                onSelect={setSelectedProject}
                                            />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    // Vista filtrada
                    <div className="projects-grid projects-grid--filtered">
                        {filteredProjects.map((project, index) => (
                            <ProjectCard
                                key={project.id}
                                project={project}
                                index={index}
                                onSelect={setSelectedProject}
                            />
                        ))}
                    </div>
                )}

                {/* Empty state */}
                {filteredProjects.length === 0 && (
                    <div className="projects-empty">
                        <p className="mono">No hay proyectos en esta categoría.</p>
                    </div>
                )}

            </div>

            {/* Modal */}
            <ProjectModal
                project={selectedProject}
                onClose={() => setSelectedProject(null)}
            />
        </Section>
    );
}
