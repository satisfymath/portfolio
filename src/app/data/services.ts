export interface Service {
    id: string;
    title: string;
    description: string;
    outcomes: string[];
}

export const services: Service[] = [
    {
        id: 'web-apps',
        title: 'Desarrollo Web',
        description: 'Aplicaciones web modernas con React, TypeScript y arquitecturas escalables.',
        outcomes: [
            'SPAs y dashboards de alta performance',
            'Integración con APIs REST/GraphQL',
            'SSR/SSG con Next.js o Vite',
        ],
    },
    {
        id: 'data-automation',
        title: 'Automatización de Datos',
        description: 'Pipelines ETL, procesamiento batch y streaming para decisiones basadas en datos.',
        outcomes: [
            'Orquestación con Airflow/n8n',
            'Procesamiento distribuido con Spark',
            'Data warehousing y analytics',
        ],
    },
    {
        id: 'integrations',
        title: 'Integraciones',
        description: 'Conectamos sistemas legacy con plataformas modernas sin fricción.',
        outcomes: [
            'APIs RESTful y webhooks',
            'Conectores SAP/ERP',
            'Sincronización bidireccional',
        ],
    },
    {
        id: 'ml-ops',
        title: 'ML & MLOps',
        description: 'Modelos de machine learning en producción con monitoreo y reentrenamiento.',
        outcomes: [
            'Feature engineering y modelos predictivos',
            'Deploy con Docker/K8s',
            'Monitoreo de drift y performance',
        ],
    },
];
