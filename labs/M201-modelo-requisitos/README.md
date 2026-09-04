# M201 · Personalización del modelo de requisitos

[← Índice del curso](../../README.md) · [Siguiente página →](M201-00-entorno.md)

> [!NOTE]
> **De qué va este módulo** — en el 101 usabas el modelo de información que venía dado:
> unos tipos de artefacto, unos atributos y unos enlaces que alguien había definido antes.
> Aquí te pones **al otro lado**: vas a diseñar ese modelo tú.
>
> ⏱️ ~1 h 15 min · 🎯 Resultado: entorno en tu fork y un proyecto con un modelo de requisitos ampliado.

---

## Por qué importa

El modelo de información es la decisión más difícil de deshacer de un proyecto de requisitos.
Los artefactos se pueden reescribir y las vistas se pueden rehacer, pero cambiar el tipo de
cientos de requisitos o renombrar un atributo del que ya cuelgan filtros, informes y enlaces
es caro y arriesgado.

Un modelo bien planteado hace que las preguntas del proyecto se contesten con un filtro. Uno
mal planteado obliga a leer requisitos uno a uno para saber cuáles son críticos, quién los
aprobó o si están cubiertos por pruebas.

## Arquitectura del metamodelo

DOORS Next separa **qué información existe** de **qué información contiene cada requisito**.
Se organiza en cuatro piezas que se apoyan unas en otras:

| Pieza | Qué define | Ejemplo |
|---|---|---|
| **Tipo de datos de atributo** | El dominio de valores permitidos | `Criticidad IEC 62304` con las clases A, B y C |
| **Atributo de artefacto** | Un campo que usa un tipo de datos | `Criticidad de seguridad`, que toma valores de la enumeración anterior |
| **Tipo de artefacto** | Qué atributos y qué flujo de trabajo tiene un artefacto | `Requisito de Seguridad`, que incluye ese atributo |
| **Tipo de enlace** | Cómo se relacionan los artefactos entre sí | `Mitiga / Mitigado por`, entre un requisito y un riesgo |

> [!IMPORTANT]
> El orden importa y es de abajo arriba: no puedes crear el atributo antes que su tipo de
> datos, ni asignar el atributo a un tipo de artefacto que todavía no existe. Los laboratorios
> siguen ese orden a propósito.

Sobre esas cuatro piezas se apoyan dos mecanismos de control que a menudo se ignoran y que son
los que de verdad mantienen limpio un proyecto grande:

| Mecanismo | Para qué sirve |
|---|---|
| **Restricciones de enlace** | Limitan qué tipos se pueden enlazar con qué, y en qué dirección. Evitan que alguien enlace un glosario con un caso de prueba. |
| **Validez de enlace** | Marca un enlace como *sospechoso* cuando cambia uno de sus extremos, para que alguien revise si la relación sigue siendo cierta. |

## Cardinalidad

Cada atributo declara **cuántos valores** admite. Es una decisión de modelado, no un detalle:

- **Un solo valor** — el caso normal. Un requisito tiene *una* criticidad.
- **Varios valores** — cuando el campo es una lista legítima. Un requisito puede responder a
  *varias* normativas a la vez.

Poner varios valores donde debería haber uno es una de las causas más frecuentes de informes
que no cuadran, porque un requisito aparece contado en dos categorías.

## Laboratorios

| Lab | Título | Qué harás | Tiempo |
|---|---|---|---|
| [M201-00](M201-00-entorno.md) | Fork, Codespace y arranque | Copiar el repo, levantar el laboratorio y entrar por `localhost` (también con `gh`) | ~15 min |
| [M201-01](M201-01-proyecto-y-modelo-base.md) | Proyecto y modelo base | Crear tu área de proyecto y dotarla de un modelo de partida aplicando una plantilla | ~20 min |
| [M201-02](M201-02-anatomia-del-metamodelo.md) | Anatomía del metamodelo | Recorrer las secciones del editor y leer un tipo de artefacto real de arriba abajo | ~15 min |
| [M201-03](M201-03-extender-el-modelo.md) | Extender el modelo | Añadir una enumeración, un atributo, un tipo de requisito, un tipo de enlace y su restricción | ~25 min |

→ Empieza por **[M201-00 — Fork, Codespace y arranque](M201-00-entorno.md)**.

## Buenas prácticas de modelado

> [!TIP]
> Llévate esto anotado, es lo que se pregunta en proyectos reales:
>
> - **Menos tipos, mejor.** Si dos tipos de artefacto tienen los mismos atributos y el mismo
>   flujo, probablemente sean el mismo tipo con un atributo que los distingue.
> - **Un atributo por pregunta.** Si necesitas parsear el valor de un campo para responder algo,
>   te falta un atributo.
> - **Enumeraciones antes que texto libre.** El texto libre no se puede filtrar de forma fiable:
>   *Alta*, *ALTA* y *alta* son tres valores distintos.
> - **Nombra pensando en la columna.** El nombre del atributo será una cabecera de tabla y el
>   título de un eje en un informe.
> - **No borres, deja de usar.** Suprimir un atributo o un tipo en uso rompe vistas y enlaces.
