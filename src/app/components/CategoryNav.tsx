import { useEffect, useState } from 'react';
import {
    type ProjectCategory,
    categoryLabels,
    categoryIcons,
    getAllCategories
} from '../data/projects';

interface Props {
    currentCategory: ProjectCategory | null;
}

export function CategoryNav({ }: Props) {
    const [activeSection, setActiveSection] = useState<string | null>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.3, rootMargin: '-20% 0px -60% 0px' }
        );

        getAllCategories().forEach(cat => {
            const el = document.getElementById(`category-${cat}`);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToCategory = (category: ProjectCategory) => {
        const el = document.getElementById(`category-${category}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <nav className="category-nav">
            <div className="category-nav-label mono">CATEGORÍAS</div>
            {getAllCategories().map((cat) => (
                <button
                    key={cat}
                    className={`category-nav-item ${activeSection === `category-${cat}` ? 'category-nav-item--active' : ''}`}
                    onClick={() => scrollToCategory(cat)}
                >
                    <span className="category-nav-icon">{categoryIcons[cat]}</span>
                    <span className="category-nav-text">{categoryLabels[cat]}</span>
                    <span className="category-nav-line" />
                </button>
            ))}
        </nav>
    );
}
