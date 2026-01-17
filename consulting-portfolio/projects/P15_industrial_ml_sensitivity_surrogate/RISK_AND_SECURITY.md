# Riesgos y seguridad

- **Leakage**: variables derivadas del target o de etapas posteriores → bloqueadas con validaciones.
- **Overfitting**: se usa evaluación holdout / CV + comparación contra baseline.
- **Reproducibilidad**: semillas, versionado de dataset y del pipeline, outputs determinísticos.
- **Confidencialidad**: el repo público solo expone arquitectura; no contiene datos ni artefactos entrenados.
