import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../components/Section';
import { prefersReducedMotion } from '../lib/reducedMotion';

gsap.registerPlugin(ScrollTrigger);

export function Contact() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            gsap.from('.contact-content > *', {
                scrollTrigger: {
                    trigger: '.contact-content',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse',
                },
                y: 40,
                opacity: 0,
                stagger: 0.12,
                duration: 0.8,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <Section id="contact">
            <div ref={sectionRef} className="contact-content container">
                <div className="contact-header">
                    <span className="dots contact-index" style={{ color: 'var(--accent)' }}>02</span>
                    <span className="mono contact-label">/ CONTACTO</span>
                </div>

                <h2 className="h2 contact-title">
                    ¿Tienes un proyecto<br />
                    <span style={{ color: 'var(--accent)' }}>que necesita datos?</span>
                </h2>

                <p className="contact-subtitle">
                    Si buscas velocidad, control y resultados con datos, ML o automatización, 
                    conversemos. Trabajo con clientes en Chile y remoto.
                </p>

                <div className="contact-box">
                    <div className="contact-item">
                        <div className="contact-label mono">// NOMBRE</div>
                        <div className="contact-value">David Astudillo M.</div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-label mono">// LINKEDIN</div>
                        <div className="contact-value">
                            <a href="https://www.linkedin.com/in/daasm/" target="_blank" rel="noopener noreferrer">
                                linkedin.com/in/daasm
                            </a>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-label mono">// UBICACIÓN</div>
                        <div className="contact-value">Santiago, Chile</div>
                    </div>
                </div>

                <div className="contact-cta">
                    <a 
                        href="https://www.linkedin.com/in/daasm/" 
                        className="btn-primary"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Conectar en LinkedIn →
                    </a>
                    <a href="#projects" className="btn-ghost">
                        Ver proyectos
                    </a>
                </div>

                <div className="contact-footer mono">
                    <p>
                        Disponible para consultoría, proyectos de desarrollo y colaboraciones técnicas.
                    </p>
                </div>
            </div>
        </Section>
    );
}
