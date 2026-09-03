# M203-02 · Cobertura en columnas

[← Página anterior](M203-01-filtros-y-vistas.md) · [Siguiente página →](M203-03-colecciones.md)

> [!NOTE]
> **Objetivo** — convertir una tabla de requisitos en una **matriz de cobertura**: ver, fila a
> fila, qué está enlazado y qué no, y filtrar los huecos.
>
> ⏱️ ~15 min · 🗂️ Artefactos / un módulo de requisitos · 🎯 Resultado: una vista de cobertura con los requisitos sin enlace visibles.

---

## En qué consiste

En M201-03 enlazaste un `Requisito de Seguridad` con un `Risk` mediante **Mitiga**. Aquí vas a
hacer que esa relación se vea **en la tabla**, no solo en el panel de un artefacto abierto, y a
encontrar los requisitos que **no** mitigan ningún riesgo.

## Antes de empezar necesitas

- [M201-03](../M201-modelo-requisitos/M201-03-extender-el-modelo.md): tipo de enlace `Mitiga` y
  al menos un requisito enlazado a un riesgo.
- [M203-01](M203-01-filtros-y-vistas.md): soltura con columnas y guardar vistas.

---

## Conceptos clave

| Concepto | Qué es |
|---|---|
| **Columna de atributo** | Muestra un campo del artefacto de la fila |
| **Columna de enlace** | Muestra los artefactos **relacionados** por un tipo de enlace |
| **Hueco de cobertura** | Fila donde la columna de enlace está vacía y no debería estarlo |
| **Filtro "no tiene enlace"** | Condición sobre la ausencia de relación, no sobre un valor |

> [!IMPORTANT]
> **La cobertura no es un informe aparte: es una vista.** Si esperas a Jazz Reporting Service
> (que este entorno no incluye) para saber qué está cubierto, llegas tarde. La columna de
> enlace responde ahora.

---

## Paso a paso

### Paso 1 · Añade la columna de enlace

**Acción** — en **Artefactos**, carpeta `01 Requirements` (o la que contenga tus requisitos de
seguridad), **Más acciones → Configurar las columnas a visualizar…**.

**Acción** — en la lista de columnas disponibles, busca las de **enlaces**. Añade la que
corresponda a **Mitiga** (o *Mitiga / Mitigado por*, según cómo liste el diálogo). Si no
aparece `Mitiga`, añade **Satisfies** o **Validated By**, que sí trae la plantilla, y trabaja
con los enlaces que ya existan en los módulos de ejemplo.

![Tipos de enlace del metamodelo, origen de las columnas de trazabilidad](../img/metamodelo-tipos-enlace.png)

**Qué ves** — una columna nueva cuyas celdas contienen **nombres de otros artefactos** (el
riesgo, el requisito padre, el caso de prueba), no un valor de enumeración.

> [!NOTE]
> **Por qué el tipo de enlace manda** — si añades la columna equivocada, verás relaciones que
> no te importan y los huecos reales quedarán tapados. La columna tiene que ser la de la
> pregunta: *¿mitiga un riesgo?*, no *¿tiene algún enlace de cualquier tipo?*.

---

### Paso 2 · Lee la matriz

**Acción** — recorre las filas.

**Qué ves** — el requisito que enlazaste en M201-03 muestra el riesgo en la columna **Mitiga**.
Los demás, vacíos.

> [!TIP]
> **Opciones** — pulsar el artefacto dentro de la celda navega al destino. Eso es ya un
> **análisis de impacto** mínimo: desde el requisito saltas al riesgo (y, en M204, al caso de
> prueba).

---

### Paso 3 · Filtra los huecos

**Acción** — sobre la columna de enlace, aplica el filtro de **vacío** / *no tiene enlace* /
*ningún valor* (el texto exacto depende del diálogo; busca la opción que deja solo las celdas
sin destino).

**Qué ves** — la tabla pasa a ser la **lista de deberes**: requisitos de seguridad que aún no
mitigan ningún riesgo.

**Acción** — guarda la vista como `Cobertura - requisitos sin riesgo` y compártela.

> [!IMPORTANT]
> **Esta vista es más valiosa llena que vacía al principio.** Si sale vacía de primeras, o todos
> los requisitos están cubiertos (improbable en un proyecto recién extendido) o el filtro no
> está sobre el tipo de enlace correcto. Comprueba con el requisito que *sí* enlazaste: si
> también aparece en los huecos, el filtro está mal.

---

### Paso 4 · Cruza con criticidad

**Acción** — añade el filtro **Criticidad de seguridad = Clase C** encima del de hueco.

**Qué ves** — el conjunto que de verdad duele: requisitos cuyo fallo puede causar daño grave y
que **no** apuntan a ningún riesgo. Es el indicador que dirección entiende sin explicación.

Guarda (o actualiza) la vista: `Cobertura - clase C sin riesgo`.

---

## ✅ Resultado

- Tienes una columna de trazabilidad en la tabla, no solo en el panel del artefacto.
- Sabes filtrar por **ausencia** de enlace.
- Existe una vista compartida de huecos de cobertura, cruzable con criticidad.

## Comprueba

- [ ] La columna muestra el riesgo del requisito que enlazaste en M201-03.
- [ ] El filtro de vacío oculta esa fila y deja las demás.
- [ ] La vista de huecos está guardada con un nombre que describe la pregunta.

## Errores frecuentes

> [!WARNING]
> - **La columna de enlace no aparece en el diálogo** → el tipo de enlace no existe en este
>   componente, o estás en una vista de módulo que no lista ese tipo. Comprueba
>   **Gestionar propiedades de proyecto → Tipos de enlace**.
> - **Todas las celdas salen vacías** → estás mirando artefactos de un tipo que no usa ese
>   enlace (p. ej. *Heading*). Filtra primero por `Requisito de Seguridad`.
> - **Filtro "vacío" no existe** → algunas versiones ofrecen *No está enlazado a* en el filtro
>   avanzado, no en el de cabecera. Ábrelo desde el icono de filtro de la barra, no desde la
>   columna.

## 📝 Autoevaluación

**1.** Un compañero te propone marcar los requisitos sin cobertura con un atributo *Sin riesgo =
Sí* y filtrar por él. ¿Qué se rompe respecto a la columna de enlace?

**2.** La vista `Cobertura - clase C sin riesgo` tiene 40 filas. ¿Eso significa que hay 40
fallos de diseño, o puede ser otra cosa?

<details>
<summary>Ver respuestas</summary>

<br>

**1.** El atributo se **desactualiza**. Alguien enlaza el riesgo y se olvida de quitar el
*Sí*; o quita el enlace y deja el *No*. La columna de enlace se calcula sobre la relación
real: no hay un segundo dato que mantener. El atributo duplica información y, en auditoría,
los dos valores acaban contradiciéndose.

**2.** Puede ser las dos cosas. Si el modelo exige que **todo** requisito de clase C mitigue
un riesgo, son 40 huecos reales. Si el modelo solo exige mitigación para un subconjunto (p. ej.
los que afectan a infusión), entonces la vista está mal acotada: faltan filtros de tipo o de
carpeta. Una vista de cobertura sin el criterio de "quién debe estar cubierto" genera pánico
o complacencia, nunca una cifra útil.

</details>
