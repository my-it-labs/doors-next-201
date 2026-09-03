# M206 · Gestión avanzada de configuraciones

[← Módulo anterior](../M205-reutilizacion/M205-03-componentes-con-cm.md) · [Siguiente página →](M206-01-lineas-base.md)

> [!NOTE]
> **De qué va este módulo** — congelar hitos, comparar versiones y, **si la clave de CM está
> activa**, trabajar con streams y change sets. **GCM** (configuración global RM+QM+código)
> no está en la imagen: se explica y no se finge.
>
> ⏱️ ~50 min · 🎯 Resultado: líneas base comparadas y un mapa claro de lo que falta sin la clave.

---

## Vocabulario

| Término | Analogía útil | Inmutable |
|---|---|---|
| **Línea base de módulo** (sin CM de proyecto) | Foto de un documento | Sí |
| **Baseline de componente** (con CM) | Foto de todo el componente | Sí |
| **Stream** | Rama de trabajo | No |
| **Change set** | Commit / lote de cambios a entregar | Hasta entregarlo |
| **Configuración global** | La versión de producto que une RM+ETM+EWM | Requiere GCM |

> [!IMPORTANT]
> En el 101 creaste baselines de **módulo**. Siguen existiendo y **funcionan sin la clave**.
> Streams y change sets de DNG nativo **exigen** la clave en propiedades avanzadas de RM y
> habilitar CM en el área (irreversible).

## Laboratorios

| Lab | Título | Qué harás | Tiempo |
|---|---|---|---|
| [M206-01](M206-01-lineas-base.md) | Líneas base y comparación | Congelar un hito y comparar | ~20 min |
| [M206-02](M206-02-firma-y-entrega.md) | Firma y paquete de entrega | Encadenar baseline + firma electrónica | ~10 min |
| [M206-03](M206-03-streams-y-change-sets.md) | Streams y change sets | Solo con CM habilitada | ~20 min |

→ Empieza por **[M206-01](M206-01-lineas-base.md)**.
