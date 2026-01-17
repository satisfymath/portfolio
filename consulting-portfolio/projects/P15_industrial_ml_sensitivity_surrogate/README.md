# P15 — ML aplicado a análisis de sensibilidad y surrogate modeling (industrial)

## Resumen
Caso de **modelamiento predictivo** y **análisis de sensibilidad** sobre resultados de un optimizador industrial.
La meta era transformar una base de escenarios (tablas tipo Excel/CSV) en un **surrogate model** (modelo liviano) capaz de:
- Estimar KPI(s) operacionales a partir de parámetros de diseño/operación.
- Identificar **drivers** (variables que más mueven el KPI) y regiones de riesgo.
- Generar un **reporte reproducible** (notebook + export HTML) para iterar rápido con el equipo.

**Stack (abstracto):** Python, pandas/numpy, scikit-learn (regresión), Jupyter, export HTML, utilidades de gráfico.

## Qué se entregó
- Pipeline de ingestión/limpieza (fuentes heterogéneas tipo Excel/CSV).
- Definición de *feature schema* y *target schema* (contratos de datos).
- Entrenamiento y evaluación de regresores (baseline + comparación).
- Reporte de sensibilidades (ranking + validaciones cruzadas).
- Entregable ejecutable local (script runner) + notebook narrativo.

## Señales de seniority
- Separación clara entre **data contracts**, entrenamiento, evaluación y reporting.
- Métricas y checks para evitar conclusiones “bonitas pero falsas” (leakage, overfit, drift).
- Diseño para auditar: trazabilidad de datasets, versiones y outputs.

## Límites por confidencialidad
- Se omiten nombres de producto, clientes, archivos reales y KPI exactos.
- Solo se describe la arquitectura y la lógica de validación.
