# Política de anonimización

Este repositorio está diseñado como **portafolio consultivo**: explica arquitectura, decisiones y resultados **sin exponer** código propietario, credenciales, datos de clientes ni información operacional sensible.

## Qué se elimina o generaliza
- Nombres de clientes, marcas, dominios, endpoints, claves, tokens y datos personales.
- Estructuras internas (nombres de tablas reales, esquemas, rutas exactas), reemplazadas por **placeholders**.
- Métricas de negocio (ventas, tráfico) se presentan como rangos o impactos cualitativos.

## Qué sí se conserva
- Problema, enfoque, arquitectura (a alto nivel), tecnologías y trade‑offs.
- Controles de seguridad, pruebas, observabilidad, despliegue y operación.

## Regla práctica
Si un detalle permite inferir: (a) un cliente específico, (b) una credencial, (c) una vulnerabilidad explotable, o (d) data identificable → se reemplaza por un ejemplo ficticio o se omite.
