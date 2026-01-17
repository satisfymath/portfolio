// Imports removed to fix conflict


export type ProjectCategory =
  | 'data-ml'
  | 'automation-ai'
  | 'web-platforms'
  | 'scraping-etl';

export type ProjectVisibility = 'public' | 'private' | 'confidential';

export interface ProjectHighlight {
  metric: string;
  label: string;
}

export interface Project {
  id: string;
  code: string;
  title: string;
  tagline: string;
  description: string;
  category: ProjectCategory;
  tags: string[];
  visibility: ProjectVisibility;
  year?: string;
  duration?: string;
  links: {
    demo?: string;
    repo?: string;
    case?: string;
    notebook?: string;
  };
  image?: string;
  highlights: ProjectHighlight[];
  senioritySignals: string[];
  featured?: boolean;
  order: number;
}

export const categoryLabels: Record<ProjectCategory, string> = {
  'data-ml': 'Data & ML',
  'automation-ai': 'Automation & AI',
  'web-platforms': 'Web & Platforms',
  'scraping-etl': 'Scraping & ETL',
};

export const categoryIcons: Record<ProjectCategory, string> = {
  'data-ml': '//',
  'automation-ai': '//',
  'web-platforms': '//',
  'scraping-etl': '//',
};

export const projects: Project[] = [
  // DATA & ML
  {
    id: 'forecasting-signals-framework',
    code: 'P01',
    title: 'Forecasting Signals Framework',
    tagline: 'Pipeline modular de features → modelos → señales para series temporales',
    description: `Framework completo para predicción de series temporales con énfasis en
    reproducibilidad y trazabilidad de experimentos. Diseñado para iterar rápido 
    sin romper contratos de datos entre módulos.`,
    category: 'data-ml',
    tags: ['Python', 'pandas', 'numpy', 'Backtesting', 'ML'],
    visibility: 'confidential',
    year: '2025',
    duration: '3 meses',
    image: '/portfolio/media/projects/p01_forecasting.png',
    links: { case: '#P01' },
    highlights: [
      { metric: '5', label: 'Módulos independientes' },
      { metric: '100%', label: 'Reproducibilidad' },
      { metric: '+40%', label: 'Velocidad iteración' },
    ],
    senioritySignals: [
      'Diseño por módulos (data/feat/model/signal/eval)',
      'Contratos de datos y trazabilidad de experimentos',
      'Enfoque en testabilidad y reproducibilidad',
    ],
    featured: true,
    order: 1,
  },
  {
    id: 'unified-trading-ai-platform',
    code: 'P02',
    title: 'Unified Trading AI Platform',
    tagline: 'Orquestación de bots + análisis + reportes unificados',
    description: `Capa de orquestación que integra componentes de data, señales, 
    ejecución simulada y reportes. Diseñada para evolucionar desde research 
    hacia producción de manera controlada.`,
    category: 'data-ml',
    tags: ['Python', 'Orchestration', 'Pipelines', 'Dashboards'],
    visibility: 'confidential',
    year: '2025',
    duration: '4 meses',
    image: '/portfolio/media/projects/p02_trading.png',
    links: { case: '#P02' },
    highlights: [
      { metric: '3', label: 'Entornos separados' },
      { metric: 'Full', label: 'Observabilidad' },
      { metric: 'Modular', label: 'Arquitectura' },
    ],
    senioritySignals: [
      'Separación clara entre investigación y ejecución',
      'Estrategia de configuración por entornos',
      'Observabilidad mínima (logs + artefactos)',
    ],
    featured: true,
    order: 2,
  },
  {
    id: 'social-discourse-sentiment-rag',
    code: 'P11',
    title: 'Social Discourse Sentiment & Toxicity RAG',
    tagline: 'Análisis de tono, polaridad y patrones en texto público',
    description: `Procesamiento de texto de redes y medios para detectar 
    sentimiento, toxicidad y patrones discursivos. Incluye consultas 
    semánticas sobre histórico para investigación.`,
    category: 'data-ml',
    tags: ['Python', 'NLP', 'Embeddings', 'Classification', 'RAG'],
    visibility: 'private',
    year: '2025',
    duration: '2 meses',
    image: '/portfolio/media/projects/cover_data_ml.png',
    links: { case: '#P11' },
    highlights: [
      { metric: '+85%', label: 'Precisión clasificación' },
      { metric: 'ETL→NLP', label: 'Pipeline reproducible' },
      { metric: 'GDPR', label: 'Anonimización' },
    ],
    senioritySignals: [
      'Pipeline reproducible (ETL → NLP → report)',
      'Métricas y validación rigurosa',
      'Protección de datos (anonimización)',
    ],
    order: 11,
  },
  {
    id: 'industrial-ml-sensitivity-surrogate',
    code: 'P15',
    title: 'Industrial ML Sensitivity Surrogate',
    tagline: 'Surrogate modeling para análisis de sensibilidad industrial',
    description: `Modelamiento predictivo sobre resultados de optimizador industrial.
    Transforma escenarios en modelo liviano para estimar KPIs, identificar 
    drivers críticos y generar reportes ejecutivos reproducibles.`,
    category: 'data-ml',
    tags: ['Python', 'scikit-learn', 'Jupyter', 'Regression', 'Analytics'],
    visibility: 'confidential',
    year: '2024',
    duration: '6 semanas',
    image: '/portfolio/media/projects/p15_industrial.png',
    links: { case: '#P15' },
    highlights: [
      { metric: 'Top 5', label: 'Drivers identificados' },
      { metric: 'HTML', label: 'Export ejecutivo' },
      { metric: 'CV', label: 'Validación cruzada' },
    ],
    senioritySignals: [
      'Separación data contracts / training / eval / reporting',
      'Checks anti-leakage, overfit y drift',
      'Trazabilidad de datasets y versiones',
    ],
    featured: true,
    order: 15,
  },
  {
    id: 'multistage-optimization-binary-fixing',
    code: 'P16',
    title: 'Multistage Optimization & Binary Fixing',
    tagline: 'Driver multi-fase para problemas MILP con binarios operacionales',
    description: `Motor de optimización por etapas para problemas complejos con 
    binarios on/off. Incluye relajación, fijación de perfiles y diagnóstico 
    automático de infeasibilidad.`,
    category: 'data-ml',
    tags: ['Python', 'Pyomo', 'MILP', 'Optimization', 'MPS'],
    visibility: 'confidential',
    year: '2024',
    duration: '3 meses',
    image: '/portfolio/media/projects/cover_data_ml.png',
    links: { case: '#P16' },
    highlights: [
      { metric: '4', label: 'Etapas de solving' },
      { metric: 'Auto', label: 'Diagnóstico fallas' },
      { metric: 'TSA', label: 'Compatible' },
    ],
    senioritySignals: [
      'Separación: discovery → solve relaxed → fix → final',
      'Compatibilidad TSA (agregación temporal)',
      'Post-mortem automático estructurado',
    ],
    order: 16,
  },

  // AUTOMATION & AI
  {
    id: 'llm-rag-comms-intelligence-api',
    code: 'P08',
    title: 'LLM RAG Comms Intelligence API',
    tagline: 'Ingesta de docs + búsqueda semántica + respuestas estructuradas',
    description: `API que combina LLM con RAG para análisis de comunicaciones.
    Orientado a generación de reportes, alimentación de dashboards y 
    automatización de workflows con respuestas JSON validadas.`,
    category: 'automation-ai',
    tags: ['Python', 'FastAPI', 'Embeddings', 'Vector Store', 'LLM'],
    visibility: 'private',
    year: '2025',
    duration: '2.5 meses',
    image: '/portfolio/media/projects/p08_comms.png',
    links: { case: '#P08' },
    highlights: [
      { metric: 'JSON', label: 'Salidas validadas' },
      { metric: 'Grounding', label: 'Anti-alucinación' },
      { metric: 'Async', label: 'Ingestión/consulta' },
    ],
    senioritySignals: [
      'Salidas JSON validadas',
      'Separación ingestión/consulta',
      'Mitigación de alucinaciones con grounding',
    ],
    featured: true,
    order: 8,
  },
  {
    id: 'legislative-rag-admissibility-workflows',
    code: 'P09',
    title: 'Legislative RAG Admissibility Workflows',
    tagline: 'Pipeline por etapas para documentos legales → data estructurada',
    description: `Sistema de clasificación y procesamiento de documentos legales
    con orquestación por etapas (E0/E1/E2/E3). Integra prompts controlados 
    y webhooks para automatización externa.`,
    category: 'automation-ai',
    tags: ['Python', 'FastAPI', 'Workers', 'Vector Store', 'n8n'],
    visibility: 'confidential',
    year: '2025',
    duration: '3 meses',
    image: '/portfolio/media/projects/cover_automation_ai.png',
    links: { case: '#P09' },
    highlights: [
      { metric: 'E0→E3', label: 'Etapas orquestadas' },
      { metric: 'Webhooks', label: 'Integración n8n' },
      { metric: 'Artefactos', label: 'Persistidos' },
    ],
    senioritySignals: [
      'Orquestación por etapas (E0/E1/E2/E3)',
      'Persistencia de artefactos intermedios',
      'Integración con automatización (webhooks/colas)',
    ],
    order: 9,
  },
  {
    id: 'mcp-orchestrator-telegram-n8n',
    code: 'P10',
    title: 'MCP Orchestrator Telegram + n8n',
    tagline: 'Agentes inteligentes que deciden cuándo invocar herramientas',
    description: `Capa de decisión para agentes que controla invocación de 
    herramientas (subflows), razonamiento y costos. Incluye memoria de 
    conversación y trazabilidad completa.`,
    category: 'automation-ai',
    tags: ['Node.js', 'TypeScript', 'Webhooks', 'n8n', 'Telegram'],
    visibility: 'private',
    year: '2025',
    duration: '6 semanas',
    image: '/portfolio/media/projects/cover_automation_ai.png',
    links: { case: '#P10' },
    highlights: [
      { metric: 'Tools', label: 'Contrato + permisos' },
      { metric: 'State', label: 'Memoria conversación' },
      { metric: 'Logs', label: 'Trazabilidad' },
    ],
    senioritySignals: [
      'Contrato de tools + permisos',
      'Memoria de conversación (estado)',
      'Trazabilidad de ejecuciones',
    ],
    order: 10,
  },
  {
    id: 'interactive-network-editor',
    code: 'P17',
    title: 'Interactive Network Editor',
    tagline: 'Editor visual de redes con nodos custom y export',
    description: `Editor de diagramas tipo flow/network en React para diseñar 
    y documentar redes de activos. Incluye nodos custom, handles configurables,
    toolbar completa y export a imagen.`,
    category: 'automation-ai',
    tags: ['React', 'TypeScript', 'Xyflow', 'ReactFlow', 'SCSS'],
    visibility: 'private',
    year: '2024',
    duration: '5 semanas',
    image: '/portfolio/media/projects/cover_automation_ai.png',
    links: { case: '#P17' },
    highlights: [
      { metric: 'Custom', label: 'Nodos modulares' },
      { metric: 'PNG', label: 'Export reproducible' },
      { metric: 'UX', label: 'Minimap + selection' },
    ],
    senioritySignals: [
      'Separación UI/estado declarativo',
      'UX pragmática (minimap, background, selección)',
      'Export reproducible del viewport',
    ],
    order: 17,
  },

  // WEB & PLATFORMS
  {
    id: 'secure-trading-backend-api',
    code: 'P03',
    title: 'Secure Trading Backend API',
    tagline: 'API transaccional con auth, roles y límites operativos',
    description: `Backend seguro para servicios transaccionales con 
    autenticación por tokens, modelo de permisos (admin/user), validación 
    de inputs y estructura lista para CI/CD.`,
    category: 'web-platforms',
    tags: ['Python', 'FastAPI', 'PostgreSQL', 'Docker', 'Auth'],
    visibility: 'confidential',
    year: '2025',
    duration: '2 meses',
    image: '/portfolio/media/projects/p03_security.png',
    links: { case: '#P03' },
    highlights: [
      { metric: 'JWT', label: 'Auth + roles' },
      { metric: 'Validate', label: 'Inputs + errors' },
      { metric: 'CI/CD', label: 'Ready' },
    ],
    senioritySignals: [
      'Modelo de permisos (admin vs usuario)',
      'Validación de inputs y manejo de errores consistente',
      'Estructura preparada para CI/CD',
    ],
    order: 3,
  },
  {
    id: 'gym-saas-qr-demo',
    code: 'P04',
    title: 'Gym SaaS QR Demo',
    tagline: 'Mockup interactivo para ingreso por QR en gimnasios',
    description: `Demo comercial para SaaS de gimnasio: flujo de ingreso 
    por QR, panel admin, control de pagos. Modo local para presentaciones 
    sin backend, desplegable en GitHub Pages.`,
    category: 'web-platforms',
    tags: ['Vite', 'React', 'TypeScript', 'LocalStorage', 'QR'],
    visibility: 'public',
    year: '2024',
    duration: '3 semanas',
    image: '/portfolio/media/projects/cover_web_platforms.png',
    links: { demo: '#P04-demo', repo: '#P04-repo' },
    highlights: [
      { metric: 'QR', label: 'Scan web nativo' },
      { metric: 'Routes', label: 'Admin/User' },
      { metric: 'Offline', label: 'LocalStorage' },
    ],
    senioritySignals: [
      'UX minimalista y responsive',
      'Separación de rutas (admin/user)',
      'Persistencia local para demo sin backend',
    ],
    order: 4,
  },
  {
    id: 'digital-products-landing-funnel',
    code: 'P05',
    title: 'Digital Products Landing Funnel',
    tagline: 'Landing optimizada para conversión de productos digitales',
    description: `Landing minimalista con propuesta de valor clara, catálogo 
    de productos, CTAs estratégicos y estructura preparada para pasarela 
    de pago y A/B testing.`,
    category: 'web-platforms',
    tags: ['React', 'Next.js', 'Vite', 'Performance', 'Analytics'],
    visibility: 'public',
    year: '2024',
    duration: '2 semanas',
    image: '/portfolio/media/projects/cover_web_platforms.png',
    links: { demo: '#P05-demo' },
    highlights: [
      { metric: 'Brutalista', label: 'Diseño limpio' },
      { metric: 'A/B', label: 'Ready' },
      { metric: '<1s', label: 'LCP optimizado' },
    ],
    senioritySignals: [
      'Diseño brutalista/minimalista',
      'Jerarquía clara de contenido',
      'Preparado para analytics y A/B',
    ],
    order: 5,
  },
  {
    id: 'email-delivery-platform',
    code: 'P07',
    title: 'Email Delivery Platform',
    tagline: 'Automatización de campañas con foco en deliverability',
    description: `Plataforma de envío masivo de correos con buenas prácticas 
    de entregabilidad, segmentación de listas, monitoreo de rebotes y 
    cuidado de reputación del remitente.`,
    category: 'web-platforms',
    tags: ['Python', 'SMTP', 'IMAP', 'Docker', 'Templates'],
    visibility: 'private',
    year: '2024',
    duration: '6 semanas',
    image: '/portfolio/media/projects/cover_web_platforms.png',
    links: { case: '#P07' },
    highlights: [
      { metric: '+95%', label: 'Delivery rate' },
      { metric: 'Lists', label: 'Segmentación' },
      { metric: 'Secrets', label: 'Separados' },
    ],
    senioritySignals: [
      'Manejo de listas y supresión',
      'Trazabilidad por campaña',
      'Separación de credenciales y secrets',
    ],
    order: 7,
  },

  // SCRAPING & ETL
  {
    id: 'production-sequencing-optimizer',
    code: 'P06',
    title: 'Production Sequencing Optimizer API',
    tagline: 'Servicio que arma secuencias factibles bajo restricciones industriales',
    description: `API de optimización que genera secuencias de producción 
    respetando restricciones complejas. Incluye fallback heurístico y 
    endpoints deterministas con auditoría.`,
    category: 'scraping-etl',
    tags: ['Python', 'MIP', 'Heuristics', 'FastAPI', 'Docker'],
    visibility: 'confidential',
    year: '2024',
    duration: '2.5 meses',
    image: '/portfolio/media/projects/cover_scraping_etl.png',
    links: { case: '#P06' },
    highlights: [
      { metric: 'MIP', label: 'Optimización exacta' },
      { metric: 'Fallback', label: 'Heurístico' },
      { metric: 'Audit', label: 'Endpoints' },
    ],
    senioritySignals: [
      'Modelado de restricciones complejas',
      'Estrategia de fallback heurístico',
      'Endpoints deterministas + auditoría',
    ],
    order: 6,
  },
  {
    id: 'social-media-scraping-postgres',
    code: 'P12',
    title: 'Social Media Scraping Pipeline',
    tagline: 'Harvester robusto multi-plataforma con PostgreSQL',
    description: `Sistema de recolección con reintentos, parsing HTML híbrido 
    (browser + HTTP), normalización de posts/comentarios y persistencia 
    en PostgreSQL para análisis posterior.`,
    category: 'scraping-etl',
    tags: ['Python', 'Selenium', 'aiohttp', 'BeautifulSoup', 'PostgreSQL'],
    visibility: 'private',
    year: '2025',
    duration: '5 semanas',
    image: '/portfolio/media/projects/cover_scraping_etl.png',
    links: { case: '#P12' },
    highlights: [
      { metric: 'Hybrid', label: 'Browser + HTTP' },
      { metric: 'Dedupe', label: 'Idempotencia' },
      { metric: 'Schema', label: 'Normalizado' },
    ],
    senioritySignals: [
      'Scraping híbrido (browser + HTTP)',
      'Modelo de datos normalizado',
      'Idempotencia básica (dedupe)',
    ],
    order: 12,
  },
  {
    id: 'public-institution-scraper',
    code: 'P13',
    title: 'Public Institution Scraper Pipeline',
    tagline: 'ETL de documentos públicos con API de consulta',
    description: `Monitor de fuentes públicas que descarga documentos, 
    extrae estructura (PDF/DOCX) y publica resultados via API. Incluye 
    tolerancia a fallas y registro de auditoría.`,
    category: 'scraping-etl',
    tags: ['Python', 'requests', 'PDF parsing', 'Scheduler', 'Docker'],
    visibility: 'private',
    year: '2024',
    duration: '4 semanas',
    image: '/portfolio/media/projects/cover_scraping_etl.png',
    links: { case: '#P13' },
    highlights: [
      { metric: 'Retry', label: 'Backoff exponencial' },
      { metric: 'PDF/DOCX', label: 'Extracción' },
      { metric: 'Audit', label: 'Log completo' },
    ],
    senioritySignals: [
      'Tolerancia a fallas (reintentos, backoff)',
      'Extracción estructural de documentos',
      'Registro de auditoría',
    ],
    order: 13,
  },
  {
    id: 'news-harvester-topic-pipeline',
    code: 'P14',
    title: 'News Harvester Topic Pipeline',
    tagline: 'Recolección + clustering + reportes ejecutivos',
    description: `Pipeline de noticias que recolecta, deduplica, agrupa por 
    tema y genera reportes exportables (PDF/HTML) con métricas de cobertura 
    y resumen ejecutivo.`,
    category: 'scraping-etl',
    tags: ['Python', 'Scraping', 'Clustering', 'NLP', 'PDF Generation'],
    visibility: 'private',
    year: '2024',
    duration: '5 semanas',
    image: '/portfolio/media/projects/cover_scraping_etl.png',
    links: { case: '#P14' },
    highlights: [
      { metric: 'Cluster', label: 'Agrupación temas' },
      { metric: 'PDF/HTML', label: 'Export ejecutivo' },
      { metric: 'Dedupe', label: 'Deduplicación' },
    ],
    senioritySignals: [
      'Deduplicación y clustering automático',
      'Pipelines configurables',
      'Export a formatos ejecutivos',
    ],
    order: 14,
  },
];

export function getProjectsByCategory(category: ProjectCategory): Project[] {
  return projects
    .filter(p => p.category === category)
    .sort((a, b) => a.order - b.order);
}

export function getFeaturedProjects(): Project[] {
  return projects
    .filter(p => p.featured)
    .sort((a, b) => a.order - b.order);
}

export function getAllCategories(): ProjectCategory[] {
  return ['data-ml', 'automation-ai', 'web-platforms', 'scraping-etl'];
}
