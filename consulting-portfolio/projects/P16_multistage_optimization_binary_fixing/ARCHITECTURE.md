# Arquitectura

## Pipeline en fases

```text
[Model Build] 
   |
   v
[1) Binary Discovery]  -> identifica componentes con binarios: On/Off, eficiencia variable, feed restrictions, etc.
   |
   v
[2) Relax Solve]       -> resuelve versión relajada (continuo) para obtener señales/perfiles
   |
   v
[3) Fix + Final Solve] -> fija perfiles (isOperateFix/segmentFix/...) y resuelve final (MILP más estable)
   |
   v
[Results + Audit]      -> métricas, logs, export, checks

(If infeasible)
   -> [Export MPS] -> [FeasRelaxS] -> [Slacks] -> [Diagnostic report]
```

## Decisiones clave
- **Wrapper de solver por etapa**: controla declarative solve + flags por etapa (procesar resultados solo al final).
- **Fijación selectiva**: no “congelar todo”; fijar lo que reduce combinatoria, mantener flexibilidad donde aporta.
- **Diagnóstico accionable**: agrupar slacks por componente/operación para guiar ajuste de restricciones.
