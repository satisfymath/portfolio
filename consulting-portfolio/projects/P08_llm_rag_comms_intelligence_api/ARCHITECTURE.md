# Arquitectura — P08

## Diagrama (alto nivel)

```text
[Cliente/UI] → [API/Service] → [Procesamiento] → [Persistencia/Artefactos] → [Reporte/Salida]
```

## Componentes
- **Entrada**: datos o eventos (upload, scheduler, webhooks).
- **Core**: validación, reglas, modelos, orquestación.
- **Persistencia**: DB, storage de artefactos, cachés.
- **Salida**: endpoints, reportes, exports.

## Consideraciones
- Idempotencia y reintentos en jobs
- Contratos de datos (esquemas/versionado)
- Observabilidad (logs/métricas/trazas)
