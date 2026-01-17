# P17 — Editor de redes interactivo con nodos custom (frontend)

## Resumen
Implementación de un **editor de diagramas/redes** (tipo flow/network editor) en React con nodos custom, handles configurables y herramientas de export.
El objetivo era que un usuario pudiera **diseñar y documentar** una red (activos/relaciones) de forma visual, con control de layout y exportación.

**Stack:** React + TypeScript, Xyflow/ReactFlow, CSS Modules (SCSS), utilidades de export a imagen.

## Qué se entregó
- Nodos custom (por tipo) con estilos modulados y handles configurables.
- Toolbar (zoom, fit view, toggle labels, animación de edges, export a PNG).
- Persistencia de parámetros visuales en el estado del grafo (p.ej., ángulos/posiciones de handles).
- Helpers de serialización y plantillas de nodos.

## Señales de seniority
- Separación UI/estado: nodos declarativos + helpers para normalizar config.
- UX pragmática: minimap, background, selección, opacidad contextual.
- Export reproducible: snapshot controlado del viewport.

## Límites por confidencialidad
- Se omite el producto final y cualquier branding/datos.
- Solo se describe el patrón de implementación.
