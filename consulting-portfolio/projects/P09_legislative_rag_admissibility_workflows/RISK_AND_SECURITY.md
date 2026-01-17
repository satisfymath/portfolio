# Riesgos y seguridad — P09

## Riesgos típicos
- **Datos sensibles**: minimización, anonimización, control de accesos.
- **Abuso**: rate limiting, validación estricta, auditoría.
- **Dependencias**: fijar versiones, escaneo básico, actualización planificada.

## Controles recomendados
- Secrets fuera del repo (env/secret manager)
- Logs sin PII
- Pruebas: unitarias + integración (happy path + edge cases)
- Backups y plan de recuperación
