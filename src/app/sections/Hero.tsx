import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Section } from '../components/Section';
import { prefersReducedMotion } from '../lib/reducedMotion';

export function Hero() {
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (prefersReducedMotion()) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            tl.from('.hero-eyebrow', { y: 20, opacity: 0, duration: 0.8 })
                .from('.hero-headline', { y: 40, opacity: 0, duration: 1 }, '-=0.5')
                .from('.hero-sub', { y: 30, opacity: 0, duration: 0.8 }, '-=0.6')
                .from('.hero-tags .tag', { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.4')
                .from('.hero-ctas a', { y: 20, opacity: 0, stagger: 0.1, duration: 0.5 }, '-=0.3');
        }, contentRef);

        return () => ctx.revert();
    }, []);

    return (
        <Section id="hero">
            <div ref={contentRef} className="hero-content container">
                <div className="hero-eyebrow dots">DAVID ASTUDILLO M.</div>

                <h1 className="hero-headline h1">
                    Data Science · ML · Automatización
                </h1>

                <p className="hero-sub">
                    Construyo sistemas de datos, modelos predictivos y automatizaciones con LLMs
                    que reducen fricción operativa y escalan decisiones. Consultoría especializada en Chile.
                </p>

                <div className="hero-tags">
                    <span className="tag">ML & Analytics</span>
                    <span className="tag">LLM & RAG</span>
                    <span className="tag">Scraping</span>
                    <span className="tag">n8n</span>
                    <span className="tag">FastAPI</span>
                    <span className="tag">React</span>
                </div>

                <div className="hero-ctas">
                    <a href="#contact" className="btn-primary">Hablemos</a>
                    <a href="#projects" className="btn-ghost">Ver 17 proyectos →</a>
                </div>
            </div>
        </Section>
    );
}
