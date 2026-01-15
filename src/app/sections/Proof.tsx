import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../components/Section';
import { prefersReducedMotion } from '../lib/reducedMotion';

gsap.registerPlugin(ScrollTrigger);

const proofItems = [
    {
        id: 'e2e',
        label: 'End-to-end',
        description: 'Diseño → Deploy',
    },
    {
        id: 'automation',
        label: 'Automatización real',
        description: 'n8n + APIs',
    },
    {
        id: 'data',
        label: 'Decisiones con datos',
        description: 'ML & Optimización',
    },
];

export function Proof() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            gsap.from('.proof-item', {
                scrollTrigger: {
                    trigger: '.proof-grid',
                    start: 'top 85%',
                },
                y: 30,
                opacity: 0,
                stagger: 0.15,
                duration: 0.7,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <Section id="proof">
            <div
                ref={sectionRef}
                className="container"
                style={{
                    padding: '80px 0',
                    borderBottom: '1px solid var(--line)',
                }}
            >
                <div className="proof-grid">
                    {proofItems.map((item) => (
                        <div key={item.id} className="proof-item">
                            <div className="proof-label">{item.label}</div>
                            <div className="proof-desc">{item.description}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
