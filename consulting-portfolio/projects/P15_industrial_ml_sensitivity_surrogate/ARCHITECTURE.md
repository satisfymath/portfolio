# Arquitectura

```text
[Excel/CSV escenarios]  --->  [Ingest + Normalización]  --->  [Feature Store (tabular)]
                                     |                          |
                                     v                          v
                             [Validaciones]               [Train/Eval]
                                     |                          |
                                     v                          v
                               [Sensitivities]  <---  [Model Zoo + Baselines]
                                     |
                                     v
                               [Reporte: notebook + HTML]
```

## Decisiones
- **Contratos explícitos**: lista de entradas/salidas, tipos y reglas de nulos.
- **Baselines primero**: antes de un modelo complejo, validar con un baseline interpretable.
- **Reporting reproducible**: el resultado se entrega como notebook narrativo + export.
