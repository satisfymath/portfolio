export interface Service {
    id: string;
    icon: string;
    title: string;
    description: string;
    outcomes: string[];
    relatedProjects: string[]; // IDs de proyectos relacionados
}

export const services: Service[] = [
    {
        id: 'data-analytics',
        icon: '📊',
        title: 'Data & Analytics',
        description: 'Pipelines de datos, ML en producción y análisis predictivo para decisiones basadas en evidencia.',
        outcomes: [
            'Feature engineering y modelos predictivos',
            'Pipelines ETL robustos y escalables',
            'Dashboards y reportes ejecutivos',
            'Análisis de sensibilidad y surrogate models',
        ],
        relatedProjects: ['forecasting-signals-framework', 'industrial-ml-sensitivity-surrogate', 'multistage-optimization-binary-fixing'],
    },
    {
        id: 'automation-ai',
        icon: '🤖',
        title: 'Automatización & AI',
        description: 'Sistemas inteligentes con LLM, RAG y orquestación de agentes para workflows complejos.',
        outcomes: [
            'APIs con LLM + búsqueda semántica',
            'Clasificación de documentos automatizada',
            'Agentes con memoria y herramientas',
            'Integración n8n/Telegram/webhooks',
        ],
        relatedProjects: ['llm-rag-comms-intelligence-api', 'legislative-rag-admissibility-workflows', 'mcp-orchestrator-telegram-n8n'],
    },
    {
        id: 'web-development',
        icon: '🌐',
        title: 'Desarrollo Web',
        description: 'Aplicaciones web modernas, APIs seguras y plataformas transaccionales con UX de primer nivel.',
        outcomes: [
            'SPAs con React/TypeScript',
            'APIs RESTful con autenticación',
            'Dashboards y paneles admin',
            'Landing pages de conversión',
        ],
        relatedProjects: ['secure-trading-backend-api', 'gym-saas-qr-demo', 'digital-products-landing-funnel'],
    },
    {
        id: 'scraping-etl',
        icon: '🔍',
        title: 'Scraping & ETL',
        description: 'Recolección de datos robusta, pipelines de procesamiento y monitoreo de fuentes públicas.',
        outcomes: [
            'Scrapers híbridos (browser + HTTP)',
            'Parsers de PDF/DOCX estructurados',
            'Clustering y deduplicación',
            'APIs de consulta para downstream',
        ],
        relatedProjects: ['social-media-scraping-postgres', 'public-institution-scraper', 'news-harvester-topic-pipeline'],
    },
];
