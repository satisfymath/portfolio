# Arquitectura

```text
[React UI]
  ├─ Canvas (Flow renderer)
  │   ├─ Custom Nodes (Component/Carrier/...)
  │   ├─ Handles (in/out) + reglas de ángulos/posiciones
  │   ├─ Edges (animación, estilos)
  │   └─ Viewport (zoom/pan/fit)
  ├─ Toolbar
  │   ├─ Toggle labels
  │   ├─ Toggle edge animation
  │   ├─ Zoom/fit
  │   └─ Export PNG
  └─ State layer
      ├─ nodes/edges
      ├─ node data (config)
      └─ helpers (serialize/deserialize)
```

## Decisiones
- **CSS Modules (SCSS)** para aislar estilos por nodo.
- **Export** vía snapshot del contenedor (sin depender del backend).
- **Normalización de handles** para mantener consistencia al editar/cargar.
