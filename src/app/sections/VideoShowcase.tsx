import { VideoScrub } from '../components/VideoScrub';
import { withBase } from '../lib/asset';

/**
 * VideoShowcase - All three pinned videos in sequence
 * Each video stays pinned while you scroll through all frames
 */
export function VideoShowcase() {
    return (
        <>
            {/* Video 1: Hero */}
            <VideoScrub
                src={withBase('media/video/hero_a.mp4')}
                pin={true}
                scrubDuration={2000}
                className="video-section-bg"
            >
                <div className="container">
                    <div className="dots" style={{ color: 'var(--accent)' }}>00 / INTRO</div>
                    <h1 className="h1" style={{ maxWidth: 800 }}>
                        Software · Datos · Automatización
                    </h1>
                    <p className="mono" style={{ maxWidth: 600, marginTop: 24 }}>
                        Construyo sistemas que reducen fricción operativa y escalan decisiones con datos.
                        Consultoría de software en Chile.
                    </p>
                    <div style={{ marginTop: 40, display: 'flex', gap: 16 }}>
                        <a href="#proof" className="btn-primary">Hablemos</a>
                        <a href="#projects" className="btn-ghost">Ver proyectos →</a>
                    </div>
                </div>
            </VideoScrub>

            {/* Video 2: Projects */}
            <VideoScrub
                src={withBase('media/video/hero_b.mp4')}
                pin={true}
                scrubDuration={2000}
                className="video-section-bg"
            >
                <div className="container">
                    <div className="dots" style={{ color: 'var(--accent)' }}>01 / PROYECTOS</div>
                    <h2 className="h2" style={{ maxWidth: 600 }}>
                        Casos y sistemas construidos
                    </h2>
                    <p className="mono" style={{ maxWidth: 500, marginTop: 16 }}>
                        Proyectos públicos, privados y confidenciales.
                    </p>
                </div>
            </VideoScrub>

            {/* Video 3: Contact */}
            <VideoScrub
                src={withBase('media/video/hero_c.mp4')}
                pin={true}
                scrubDuration={2000}
                className="video-section-bg"
            >
                <div className="container">
                    <div className="dots" style={{ color: 'var(--accent)' }}>02 / CONTACTO</div>
                    <h2 className="h2" style={{ maxWidth: 600 }}>
                        ¿Tienes un proyecto en mente?
                    </h2>
                    <p className="mono" style={{ maxWidth: 500, marginTop: 16 }}>
                        Si buscas velocidad, control y resultados con datos, conversemos.
                    </p>
                    <div style={{ marginTop: 32 }}>
                        <a href="mailto:todo@dominio.cl" className="btn-primary">Enviar email →</a>
                    </div>
                </div>
            </VideoScrub>
        </>
    );
}
