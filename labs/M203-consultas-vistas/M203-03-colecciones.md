# M203-03 · Colecciones de entrega

[← Página anterior](M203-02-cobertura-y-trazabilidad.md) · [Siguiente módulo →](../M204-trazabilidad-elm/README.md)

> [!NOTE]
> **Objetivo** — crear una **colección** con el alcance de una revisión de diseño y usarla como
> conjunto de trabajo, distinto de un módulo y de una vista.
>
> ⏱️ ~15 min · 🗂️ Pestaña **Colecciones** · 🎯 Resultado: una colección con membresía explícita y una vista aplicada sobre ella.

---

## En qué consiste

Una **vista** muestra artefactos que cumplen un criterio *ahora*. Una **colección** contiene
los artefactos que **alguien eligió**, y esa membresía se queda aunque los atributos cambien.

Vas a armar la colección `Revision de diseño - bomba v1` con los requisitos de seguridad de
clase B y C que hay que presentar, más los riesgos que mitigan.

## Antes de empezar necesitas

- [M203-02](M203-02-cobertura-y-trazabilidad.md) y al menos un requisito enlazado a un riesgo.
- Distinguir **Todo · Módulos · Colecciones** en la pestaña Artefactos.

---

## Conceptos clave

| Concepto | Vista | Colección | Módulo |
|---|---|---|---|
| **Qué agrupa** | Lo que cumple el filtro ahora | Lo que se añadió a mano (o por consulta, y luego se fija) | Una jerarquía de documento |
| **Si cambia un atributo** | El artefacto puede entrar o salir solo | Sigue dentro hasta que lo quites | Sigue en su sitio del documento |
| **Para qué** | Preguntas repetibles | Entregas, revisiones, paquetes | Especificar |

> [!IMPORTANT]
> **No uses la colección como sucedáneo de un atributo `Release`.** Si la release 2 son "estos
> 80 que fui eligiendo", la release 3 será un infierno. La colección brilla cuando el criterio
> **no se puede expresar** con atributos (el paquete que pidió el auditor, los 12 que entran
> en la reunión de mañana).

---

## Paso a paso

### Paso 1 · Crea la colección

**Acción** — en **Artefactos**, abre la pestaña **Colecciones** (junto a *Todo* y *Módulos*).
Pulsa **Crear** y elige **Colección**.

**Acción** — nombre: `Revision de diseño - bomba v1`. Resumen: `Alcance de la revision formal
del M207`. Crea.

**Qué ves** — una colección vacía, sin jerarquía de encabezados. No es un documento: es una
lista.

> [!NOTE]
> **Por qué no un módulo** — un módulo impone orden de lectura y numeración. El paquete de una
> revisión no es un capítulo: es un **conjunto**. Si lo metes en un módulo, acabarás
> duplicando requisitos que ya viven en `Stakeholder Requirements` y `System Requirements`.

---

### Paso 2 · Añade miembros desde una vista

**Acción** — vuelve a **Artefactos → Todo** (o a la carpeta), aplica `Direccion - clase C` o
filtra por *Clase B* y *Clase C*. Selecciona los requisitos que entran en la revisión.

**Acción** — **Más acciones → Añadir a colección…** (o *Añadir artefactos a colección*) y
elige `Revision de diseño - bomba v1`.

**Qué ves** — al abrir la colección, esos requisitos están dentro. Si más tarde un requisito
deja de ser clase C, **sigue en la colección** hasta que lo quites: eso es exactamente la
diferencia con la vista.

> [!TIP]
> **Opciones** — algunas versiones permiten *Añadir artefactos que coincidan con una consulta*.
> Úsalo para el volcado inicial, y después gestiona altas y bajas a mano. El volcado no
> convierte la colección en una vista: es un atajo de relleno.

---

### Paso 3 · Incluye los riesgos enlazados

**Acción** — para cada requisito de la colección (o para el que ya tiene enlace **Mitiga**),
abre el destino y **añádelo también** a la colección.

**Qué ves** — el paquete de revisión contiene **los dos extremos** de la trazabilidad: el
requisito y el riesgo. Quien revise no tendrá que saltar fuera del alcance para entender el
porqué.

> [!IMPORTANT]
> **Un paquete de revisión incompleto genera comentarios inútiles.** Si el revisor ve el
> requisito de clase C y no el riesgo, preguntará lo que ya está enlazado. El alcance de la
> colección es una decisión de diseño de la revisión (M207), no un detalle de interfaz.

---

### Paso 4 · Trabaja *dentro* de la colección

**Acción** — abre la colección y configura columnas: **ID**, **Tipo**, **Estado**, **Criticidad
de seguridad**, columna **Mitiga**.

**Acción** — guarda esa configuración como vista de la colección: `Contenido de revision v1`.

**Qué ves** — una mini matriz de cobertura **acotada al paquete**, no a todo el proyecto. Es
el material que llevarás a la revisión formal.

---

## ✅ Resultado

- Distingues vista, colección y módulo, y sabes cuándo usar cada uno.
- Existe `Revision de diseño - bomba v1` con requisitos y al menos un riesgo.
- Tienes una vista de cobertura aplicada **sobre la colección**, no sobre todo el proyecto.

## Comprueba

- [ ] La colección aparece en la pestaña **Colecciones**.
- [ ] Un requisito que cambie de criticidad **no sale solo** de la colección.
- [ ] El riesgo enlazado está dentro del mismo paquete.
- [ ] Sabes añadir y quitar miembros sin borrar los artefactos del proyecto.

## Errores frecuentes

> [!WARNING]
> - **No encuentro Crear → Colección** → estás dentro de un módulo, no en la pestaña
>   Colecciones del proyecto. Sal al nivel de artefactos.
> - **Añadí el requisito y desapareció del módulo** → no: un artefacto puede vivir en un módulo
>   **y** en una colección. Si desapareció, lo **cortaste** en vez de referenciarlo. Deshaz y
>   usa *Añadir a colección*.
> - **La colección se comporta como una vista** → la rellenaste con una consulta y esperabas
>   que se actualizara. Tras el volcado, la membresía es fija.

## 📝 Autoevaluación

**1.** Tienes que entregar cada mes "todo lo aprobado en ese mes". ¿Colección, vista o atributo?

**2.** ¿Por qué la colección de este laboratorio se llama con el nombre de la revisión y no
`Requisitos importantes`?

<details>
<summary>Ver respuestas</summary>

<br>

**1.** **Vista** (filtro de estado = Aprobado y fecha de modificación en el mes), o un atributo
`Mes de entrega` si el criterio no coincide con la fecha de aprobación. Una colección mensual
hecha a mano se olvida de alguien todos los meses. La colección sí valdría para "los 15 que el
cliente pidió ver en la reunión del jueves", que no tienen criterio calculable.

**2.** Porque el nombre fija **el propósito y la caducidad**. `Requisitos importantes` no se
puede vaciar nunca (¿importantes para quién?) y acaba siendo un cajón. `Revision de diseño -
bomba v1` se cierra con la revisión, se archiva, y la v2 empieza otra. Las colecciones
buenas nacen y mueren con un hito.

</details>
