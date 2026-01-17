# P12 — Recolección multi‑plataforma + persistencia en PostgreSQL

## Resumen
Harvester robusto con reintentos y parsing HTML; normaliza posts/comentarios y los guarda en DB para análisis posterior.

**Stack:** Python, Selenium, aiohttp, BeautifulSoup, PostgreSQL, .env.

## Qué se entregó
- Documentación técnica (arquitectura, decisiones, trade‑offs)
- Walkthrough (notebook sin código)
- Recomendaciones de operación y seguridad

## Señales de seniority
- Scraping híbrido (browser + HTTP)
- Modelo de datos normalizado
- Idempotencia básica (dedupe)

## Límites por confidencialidad
- No se incluye implementación, datos reales, ni endpoints
- Nombres propios y dominios fueron reemplazados por placeholders
