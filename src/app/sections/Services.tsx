import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../components/Section';
import { prefersReducedMotion } from '../lib/reducedMotion';
import { services } from '../data/services';

gsap.registerPlugin(ScrollTrigger);

export function Services() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            gsap.from('.service-card', {
                scrollTrigger: {
                    trigger: '.services-grid',
                    start: 'top 80%',
                },
                y: 50,
                opacity: 0,
                stagger: 0.1,
                duration: 0.6,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <Section id="services">
            <div
                ref={sectionRef}
                className="container"
                style={{
                    padding: '120px 0',
                    borderBottom: '1px solid var(--line)',
                }}
            >
                <div className="dots" style={{ color: 'var(--muted)', marginBottom: 16 }}>
                    03 / SERVICIOS
                </div>

                <h2 className="h2" style={{ marginBottom: 12 }}>
                    Consultoría & Desarrollo
                </h2>

                <p className="mono" style={{ maxWidth: 600, marginBottom: 48 }}>
                    Stack completo para productos digitales, pipelines de datos y automatización.
                </p>

                <div className="services-grid">
                    {services.map((service) => (
                        <article key={service.id} className="service-card">
                            <h3 className="service-title">{service.title}</h3>
                            <p className="service-desc">{service.description}</p>
                            <ul className="service-outcomes">
                                {service.outcomes.map((outcome, i) => (
                                    <li key={i}>{outcome}</li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>
            </div>
        </Section>
    );
}
