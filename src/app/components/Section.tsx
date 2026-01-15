import type { ReactNode } from 'react';

interface SectionProps {
    id: string;
    children: ReactNode;
    className?: string;
}

/**
 * Section wrapper for consistent layout
 */
export function Section({ id, children, className = '' }: SectionProps) {
    return (
        <section id={id} className={`section ${className}`}>
            {children}
        </section>
    );
}
