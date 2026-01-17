import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import {
  type ProjectCategory,
  categoryLabels,
  categoryIcons,
  getAllCategories
} from '../data/projects';
import { prefersReducedMotion } from '../lib/reducedMotion';

interface Props {
  activeCategory: ProjectCategory | 'all';
  onCategoryChange: (category: ProjectCategory | 'all') => void;
  projectCounts: Record<ProjectCategory | 'all', number>;
}

export function FilterBar({ activeCategory, onCategoryChange, projectCounts }: Props) {
  const barRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  // Animación del indicador activo
  useEffect(() => {
    if (prefersReducedMotion() || !indicatorRef.current) return;

    const activeButton = barRef.current?.querySelector(`[data-category="${activeCategory}"]`);
    if (!activeButton) return;

    const rect = activeButton.getBoundingClientRect();
    const barRect = barRef.current?.getBoundingClientRect();

    if (barRect) {
      gsap.to(indicatorRef.current, {
        x: rect.left - barRect.left,
        width: rect.width,
        duration: 0.4,
        ease: 'power3.out',
      });
    }
  }, [activeCategory]);

  const categories: (ProjectCategory | 'all')[] = ['all', ...getAllCategories()];

  return (
    <div className="filter-bar" ref={barRef}>
      <div className="filter-indicator" ref={indicatorRef} />

      {categories.map((cat) => (
        <button
          key={cat}
          data-category={cat}
          className={`filter-btn ${activeCategory === cat ? 'filter-btn--active' : ''}`}
          onClick={() => onCategoryChange(cat)}
        >
          <span className="filter-icon">
            {cat === 'all' ? '✦' : categoryIcons[cat]}
          </span>
          <span className="filter-label">
            {cat === 'all' ? 'Todos' : categoryLabels[cat]}
          </span>
          <span className="filter-count mono">{projectCounts[cat]}</span>
        </button>
      ))}
    </div>
  );
}
