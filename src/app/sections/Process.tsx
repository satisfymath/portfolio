import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Section } from '../components/Section';
import { prefersReducedMotion } from '../lib/reducedMotion';

gsap.registerPlugin(ScrollTrigger);

const steps = [
    {
        num: '01',
        title: 'Diagnóstico',
        duration: '1–3 días',
        description: 'Entender el problema, mapear datos y definir alcance.',
    },
    {
        num: '02',
        title: 'Prototipo',
        duration: '1–2 semanas',
        description: 'MVP funcional para validar hipótesis y arquitectura.',
    },
    {
        num: '03',
        title: 'Producción',
        duration: '2–6 semanas',
        description: 'Sistema completo, tests, deploy y documentación.',
    },
    {
        num: '04',
        title: 'Evolución',
        duration: 'Mensual',
        description: 'Mantención, mejoras y nuevas features según feedback.',
    },
];

export function Process() {
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            gsap.from('.process-step', {
                scrollTrigger: {
                    trigger: '.process-list',
                    start: 'top 80%',
                },
                x: -40,
                opacity: 0,
                stagger: 0.15,
                duration: 0.7,
                ease: 'power3.out',
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <Section id="process">
            <div
                ref={sectionRef}
                className="container"
                style={{
                    padding: '120px 0',
                    borderBottom: '1px solid var(--line)',
                }}
            >
                <div className="dots" style={{ color: 'var(--muted)', marginBottom: 16 }}>
                    04 / PROCESO
                </div>

                <h2 className="h2" style={{ marginBottom: 12 }}>
                    Cómo trabajamos
                </h2>

                <p className="mono" style={{ maxWidth: 560, marginBottom: 48 }}>
                    Metodología iterativa enfocada en entrega rápida y feedback continuo.
                </p>

                <div className="process-list">
                    {steps.map((step) => (
                        <div key={step.num} className="process-step">
                            <div className="process-num dots">{step.num}</div>
                            <div className="process-content">
                                <div className="process-header">
                                    <h3 className="process-title">{step.title}</h3>
                                    <span className="process-duration">{step.duration}</span>
                                </div>
                                <p className="process-desc">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Section>
    );
}
