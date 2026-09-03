# M203 · Consultas, vistas y colecciones avanzadas

[← Módulo anterior](../M202-gobernanza/M202-03-flujo-de-aprobacion.md) · [Siguiente página →](M203-01-filtros-y-vistas.md)

> [!NOTE]
> **De qué va este módulo** — en el 101 aplicabas vistas que alguien había preparado. Aquí las
> **diseñas tú**: filtros que contestan preguntas de proyecto, vistas compartidas por perfil y
> colecciones que agrupan lo que hay que entregar.
>
> ⏱️ ~50 min · 🎯 Resultado: tres vistas reutilizables y una colección de cobertura.

---

## Por qué importa

Un proyecto de ingeniería no se gobierna leyendo requisitos uno a uno. Se gobierna con
preguntas: *¿cuántos requisitos de clase C no están aprobados? ¿cuáles no mitigan ningún
riesgo? ¿qué hay que entregar en la revisión de diseño?*

Si esas preguntas no se contestan con un filtro, el modelo de M201 no está trabajando. Este
módulo convierte el modelo en **instrumento de gestión**.

## Tres formas de organizar la misma información

| Pieza | Qué es | Qué no es |
|---|---|---|
| **Filtro** | Una condición sobre atributos o enlaces que reduce lo visible ahora | Un objeto persistente por sí solo: vive dentro de una vista |
| **Vista** | Columnas + filtros + orden, **guardados** con un nombre | Un informe: no genera documento, cambia cómo se mira la tabla |
| **Colección** | Un conjunto de artefactos **elegidos**, con membresía propia | Un módulo: no tiene jerarquía ni numeración de documento |

> [!IMPORTANT]
> **La vista no cambia los datos.** Cambia qué columnas ves, en qué orden y qué filas quedan
> fuera. Dos personas pueden estar mirando el mismo proyecto con dos vistas distintas y
> ambas tienen razón: están contestando preguntas distintas.

## Columnas de trazabilidad

Las columnas normales muestran **atributos** del artefacto de la fila. Las columnas de
trazabilidad muestran **artefactos enlazados**: para cada requisito, qué riesgos mitiga, qué
pruebas lo validan, de qué stakeholder deriva.

Eso convierte una tabla en una **matriz de cobertura**. Las celdas vacías son huecos, y los
huecos son el trabajo pendiente.

## Laboratorios

| Lab | Título | Qué harás | Tiempo |
|---|---|---|---|
| [M203-01](M203-01-filtros-y-vistas.md) | Filtros y vistas por perfil | Construir y compartir tres vistas: autor, aprobador y dirección | ~20 min |
| [M203-02](M203-02-cobertura-y-trazabilidad.md) | Cobertura en columnas | Añadir columnas de enlace y localizar requisitos sin cobertura | ~15 min |
| [M203-03](M203-03-colecciones.md) | Colecciones de entrega | Armar una colección de revisión y usarla como alcance | ~15 min |

→ Empieza por **[M203-01 — Filtros y vistas por perfil](M203-01-filtros-y-vistas.md)**.

## Buenas prácticas

> [!TIP]
> - **Nombra la vista por la pregunta que contesta**, no por quién la creó. `Clase C sin aprobar`
>   se entiende en seis meses; `Vista de Ana` no.
> - **Comparte poco y bien.** Una vista personal es un borrador. Una vista compartida es un
>   contrato con el equipo: si la cambias, cambias el informe de todo el mundo.
> - **Un filtro por pregunta.** Encadenar cinco condiciones en una sola vista la hace frágil:
>   cuando alguien no entiende por qué no ve un requisito, nadie se atreve a tocarla.
> - **La colección no sustituye al atributo.** Si agrupas "los de la release 2" a mano, en la
>   release 3 tendrás que volver a elegirlos. Un atributo `Release` más un filtro escala; la
>   colección a mano, no.
