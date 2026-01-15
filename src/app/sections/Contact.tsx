import { Section } from '../components/Section';

export function Contact() {
    return (
        <Section id="contact">
            <div className="contact-content container">
                <div className="dots" style={{ color: 'var(--muted)', marginBottom: 16 }}>
                    02 / CONTACTO
                </div>

                <h2 className="h2" style={{ marginBottom: 12 }}>
                    ¿Tienes un proyecto en mente?
                </h2>

                <p className="mono" style={{ maxWidth: 560 }}>
                    Si buscas velocidad, control y resultados con datos, conversemos.
                </p>

                <div className="contact-box">
                    <div className="contact-item">
                        <div className="contact-label">Email</div>
                        <div className="contact-value">
                            <a href="mailto:TODO@dominio.cl">TODO@dominio.cl</a>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-label">LinkedIn</div>
                        <div className="contact-value">
                            <a href="https://linkedin.com/in/TODO" target="_blank" rel="noopener noreferrer">
                                linkedin.com/in/TODO
                            </a>
                        </div>
                    </div>

                    <div className="contact-item">
                        <div className="contact-label">GitHub</div>
                        <div className="contact-value">
                            <a href="https://github.com/TODO" target="_blank" rel="noopener noreferrer">
                                github.com/TODO
                            </a>
                        </div>
                    </div>
                </div>

                <div style={{ marginTop: 32 }}>
                    <a href="mailto:TODO@dominio.cl" className="btn-primary">
                        Enviar email →
                    </a>
                </div>
            </div>
        </Section>
    );
}
