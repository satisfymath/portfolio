import { useEffect, useRef } from 'react';
import { initLenis, destroyLenis } from './lib/lenis';
import { HUD } from './components/HUD';
import { VideoBackgroundSection } from './components/VideoBackgroundSection';
import { withBase } from './lib/asset';
import { Hero } from './sections/Hero';
import { Proof } from './sections/Proof';
import { Projects } from './sections/Projects';
import { Services } from './sections/Services';
import { Process } from './sections/Process';
import { Contact } from './sections/Contact';
import type Lenis from '@studio-freight/lenis';

export default function App() {
    const lenisRef = useRef<Lenis | null>(null);

    useEffect(() => {
        lenisRef.current = initLenis();

        return () => {
            destroyLenis(lenisRef.current);
        };
    }, []);

    return (
        <>
            <HUD />

            {/* Subtle grid overlay */}
            <div className="grid-overlay" aria-hidden="true" />

            <main>
                {/* Section 1: Video 1 background for Hero + Proof */}
                <VideoBackgroundSection
                    id="section-1"
                    videoSrc={withBase('media/video/hero_a.mp4')}
                >
                    <Hero />
                    <Proof />
                </VideoBackgroundSection>

                {/* Section 2: Video 2 background for Projects + Services */}
                <VideoBackgroundSection
                    id="section-2"
                    videoSrc={withBase('media/video/hero_b.mp4')}
                >
                    <Projects />
                    <Services />
                </VideoBackgroundSection>

                {/* Section 3: Video 3 background for Process + Contact */}
                <VideoBackgroundSection
                    id="section-3"
                    videoSrc={withBase('media/video/hero_c.mp4')}
                >
                    <Process />
                    <Contact />
                </VideoBackgroundSection>
            </main>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <p className="mono" style={{ fontSize: '0.75rem' }}>
                        © {new Date().getFullYear()} · TODO: Tu Nombre · Santiago, Chile
                    </p>
                </div>
            </footer>
        </>
    );
}
