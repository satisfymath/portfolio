export interface Project {
    id: string;
    title: string;
    tagline: string;
    tags: string[];
    visibility: 'public' | 'private' | 'confidential';
    links: {
        demo?: string;
        repo?: string;
        case?: string;
    };
    highlights: string[];
}

export const projects: Project[] = [
    {
        id: 'trading-platform',
        title: 'TODO: Trading Platform',
        tagline: 'Plataforma de análisis de mercados en tiempo real con alertas y backtesting.',
        tags: ['FastAPI', 'React', 'WebSockets', 'PostgreSQL'],
        visibility: 'public',
        links: {
            demo: '#TODO',
            repo: '#TODO',
        },
        highlights: [
            'TODO: Latencia promedio de respuesta',
            'TODO: Usuarios activos',
            'TODO: Backtests ejecutados',
        ],
    },
    {
        id: 'erp-integration',
        title: 'TODO: ERP Integration',
        tagline: 'Integración de sistemas ERP con automatización de flujos de trabajo.',
        tags: ['n8n', 'Python', 'REST APIs', 'SAP'],
        visibility: 'private',
        links: {
            case: '#TODO',
        },
        highlights: [
            'TODO: Horas de trabajo automatizadas',
            'TODO: Sistemas integrados',
            'TODO: Reducción de errores manuales',
        ],
    },
    {
        id: 'ml-forecasting',
        title: 'TODO: ML Forecasting',
        tagline: 'Sistema de predicción de demanda con machine learning para retail.',
        tags: ['PyTorch', 'Spark', 'Airflow', 'GCP'],
        visibility: 'confidential',
        links: {},
        highlights: [
            'TODO: Mejora en precisión de predicción',
            'TODO: SKUs procesados diariamente',
            'TODO: Impacto en inventario',
        ],
    },
    {
        id: 'data-pipeline',
        title: 'TODO: Data Pipeline',
        tagline: 'Pipeline de datos ETL para procesamiento de transacciones a escala.',
        tags: ['Python', 'Kafka', 'ClickHouse', 'Docker'],
        visibility: 'public',
        links: {
            repo: '#TODO',
        },
        highlights: [
            'TODO: Eventos procesados/seg',
            'TODO: Uptime del sistema',
            'TODO: Tiempo de procesamiento batch',
        ],
    },
    {
        id: 'web-scraping',
        title: 'TODO: Web Scraping System',
        tagline: 'Sistema de recolección de datos con anti-detección y rotación de proxies.',
        tags: ['Playwright', 'Python', 'Redis', 'Celery'],
        visibility: 'private',
        links: {
            case: '#TODO',
        },
        highlights: [
            'TODO: Páginas scraped diariamente',
            'TODO: Tasa de éxito',
            'TODO: Fuentes monitoreadas',
        ],
    },
    {
        id: 'landing-optimizer',
        title: 'TODO: Landing Optimizer',
        tagline: 'Plataforma de A/B testing y optimización de conversión para landing pages.',
        tags: ['Next.js', 'TypeScript', 'Analytics', 'Vercel'],
        visibility: 'public',
        links: {
            demo: '#TODO',
            repo: '#TODO',
        },
        highlights: [
            'TODO: Mejora promedio en conversión',
            'TODO: Tests ejecutados',
            'TODO: Clientes atendidos',
        ],
    },
];
