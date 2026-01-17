# P16 — Optimización multi‑etapa: relajación, fijación de binarios e infeasibilidad

## Resumen
Driver multi‑fase para problemas de optimización con **binarios operacionales** (on/off, segmentación de eficiencia, exclusiones) en horizontes largos.
Estrategia: **resolver relajado**, **extraer perfiles** y **fijar** para llegar a una solución final estable; incluye herramientas de **diagnóstico de infeasibilidad** usando relajación de factibilidad.

**Stack (abstracto):** Python, Pyomo + solver MILP, heurísticas de fijación, export MPS, análisis de slacks.

## Qué se entregó
- Motor de ejecución por etapas (entrypoint único) con logging y parámetros por etapa.
- Detección automática de componentes que requieren binarios (por tipo de restricción).
- Fijación de perfiles: on/off, segmentFix, restricciones de alimentación, simultaneidad.
- Tracker de infeasibilidad: export MPS → `feasRelaxS` → extracción de slacks → reporte por componente.

## Señales de seniority
- **Separación de responsabilidades**: discovery → solve relaxed → fix → final.
- **Compatibilidad TSA**: soporte para agregación de series temporales y reconstrucción posterior.
- **Post‑mortem automático**: cuando el solver falla, se habilita diagnóstico estructurado (qué restricciones/artefactos rompen).

## Límites por confidencialidad
- No se incluye implementación completa, datos reales, ni el modelo industrial.
- Nombres propios, paths y dominios se reemplazan por placeholders.
