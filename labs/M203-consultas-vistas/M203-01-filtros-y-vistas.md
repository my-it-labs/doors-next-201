# M203-01 · Filtros y vistas por perfil

[← Página anterior](README.md) · [Siguiente página →](M203-02-cobertura-y-trazabilidad.md)

> [!NOTE]
> **Objetivo** — construir tres vistas que contesten tres preguntas distintas sobre el mismo
> conjunto de requisitos, guardarlas y compartirlas para que el equipo las reutilice.
>
> ⏱️ ~20 min · 🗂️ Pestaña **Artefactos** de tu proyecto · 🎯 Resultado: tres vistas nombradas y una de ellas compartida.

---

## En qué consiste

Vas a trabajar sobre la carpeta `01 Requirements` (y, si ya tienes artefactos de tipo
`Requisito de Seguridad`, también sobre ellos). Prepararás vistas para tres perfiles:

| Perfil | Pregunta que contesta la vista |
|---|---|
| **Autor** | ¿Qué requisitos míos siguen en *En curso* o *Nuevo*? |
| **Aprobador** | ¿Qué hay ahora mismo *Bajo revisión*? |
| **Dirección** | ¿Cuántos requisitos de *Clase C* hay, y en qué estado? |

## Antes de empezar necesitas

- Haber completado [M201](../M201-modelo-requisitos/README.md) y [M202-03](../M202-gobernanza/M202-03-flujo-de-aprobacion.md): tipos, atributos, flujo y al menos un requisito con estado.
- Si todavía no tienes requisitos en *Bajo revisión* o *Aprobados*, crea dos o tres de tipo
  `Requisito de Seguridad` y recorre el flujo con `autor` / `aprobador` para tener datos que filtrar.

---

## Conceptos clave

| Concepto | Qué es |
|---|---|
| **Filtro rápido** | Condición que se aplica ahora sobre una columna (igual, contiene, está vacío…) |
| **Filtro avanzado** | Varias condiciones combinadas con Y / O, incluyendo condiciones sobre enlaces |
| **Vista personal** | Guardada para ti; nadie más la ve en el selector |
| **Vista compartida** | Visible para el equipo del proyecto. Cambiarla cambia lo que ven todos |
| **Vista de módulo frente a vista de artefactos** | La primera vive dentro de un documento; la segunda, sobre carpetas y consultas del proyecto |

---

## Paso a paso

### Paso 1 · Abre la tabla de trabajo

**Acción** — en tu proyecto, entra en **Artefactos**. A la izquierda, selecciona la carpeta
`01 Requirements`.

![Vista de artefactos con las carpetas de la plantilla](../img/artefactos-carpetas.png)

**Qué ves** — una tabla con los artefactos de esa carpeta. Arriba, los selectores **Carpetas** y
**Vistas**, y a menudo el mensaje *Para mostrar los artefactos, seleccione una carpeta o vista*
si no has elegido nada todavía.

**Acción** — abre el menú de columnas (**Más acciones ▤ → Configurar las columnas a visualizar…**)
y deja visibles al menos: **ID**, **Nombre**, **Tipo de artefacto**, **Estado** y, si existe,
**Criticidad de seguridad**.

> [!NOTE]
> **Por qué** — una vista es, antes que un filtro, una **elección de columnas**. Si el atributo
> no está en la tabla, no puedes filtrar por él cómodamente ni exportarlo después (M208).

---

### Paso 2 · Vista del autor: lo que queda por trabajar

**Acción** — en la cabecera de **Tipo de artefacto**, filtra por `Requisito de Seguridad` (o
`System Requirement` si aún no has creado el tipo). En **Estado**, filtra los valores *Nuevo* y
*En curso* (o *Draft*, si estás sobre un tipo sin el flujo de M202).

**Qué ves** — la tabla se reduce a los requisitos que todavía no han salido a revisión.

**Acción** — en el selector **Vistas**, elige **Guardar vista…** (o el equivalente *Guardar como*).
Nombre: `Autor - pendientes de enviar`. Déjala **personal** de momento.

> [!TIP]
> **Opciones** — si el filtro de estado no ofrece *Nuevo / En curso*, ese tipo no tiene flujo
> asignado. Vuelve a [M202-03](../M202-gobernanza/M202-03-flujo-de-aprobacion.md) y asígnalo
> antes de seguir: filtrar por una columna vacía no enseña nada.

---

### Paso 3 · Vista del aprobador: la cola de revisión

**Acción** — quita el filtro de estado anterior y deja solo **Estado = Bajo revisión**.

**Acción** — guarda como `Aprobador - cola de revision`.

**Qué ves** — si recorriste el circuito de M202-03, aparece el requisito que enviaste a revisión.
Si la cola está vacía, es una respuesta válida: no hay nada que aprobar. Una vista vacía bien
hecha es un indicador, no un fallo.

> [!IMPORTANT]
> **Esta vista es la bandeja de entrada del aprobador.** Si no existe, el aprobador abre el
> proyecto y se pone a buscar. En cuanto exista, su trabajo del día es *abrir esa vista*.

---

### Paso 4 · Vista de dirección: criticidad y estado juntos

**Acción** — limpia filtros. Filtra **Criticidad de seguridad = Clase C**. Deja visibles
**Estado** y **Criticidad de seguridad**. Ordena por estado.

**Acción** — guarda como `Direccion - clase C` y, esta vez, márcala como **vista compartida**.

**Qué ves** — la vista aparece en el selector de vistas del proyecto, no solo en el tuyo.

> [!IMPORTANT]
> **Compartir es un acto de gobierno.** A partir de ahora, si cambias columnas o filtros de
> `Direccion - clase C`, cambias lo que ve dirección. Por eso el nombre tiene que describir la
> pregunta, y por eso no se comparte el borrador del paso 2.

> [!NOTE]
> **Por qué no basta un filtro de texto** — *Clase C* es un valor de enumeración. Un filtro
> sobre texto libre (`critico`, `CRÍTICO`, `clase c`) no agrupa. Esa es la deuda que se paga
> cuando en M201 se elige mal el tipo de datos.

---

### Paso 5 · Comprueba que cada perfil ve lo suyo

**Acción** — abre una ventana privada, entra como `autor` y aplica `Autor - pendientes de enviar`
si la compartiste, o reconstruye el filtro. Entra como `aprobador` y busca `Aprobador - cola de
revision`.

**Qué ves** — cada uno llega a su pregunta en dos clics. Si la vista compartida no aparece para
el otro usuario, no se llegó a guardar como compartida, o ese usuario no tiene permiso **Guardar
vista compartida** / **Visualizar** sobre ella (M202-02).

---

## ✅ Resultado

- Sabes montar un filtro sobre tipo, estado y enumeración.
- Tienes tres vistas nombradas por la pregunta que contestan.
- Has compartido una y entiendes el coste de hacerlo.

## Comprueba

- [ ] `Autor - pendientes de enviar` existe y reduce la tabla a estados iniciales.
- [ ] `Aprobador - cola de revision` filtra por *Bajo revisión*.
- [ ] `Direccion - clase C` está **compartida** y muestra la enumeración de M201.
- [ ] Al quitar la vista, los datos siguen ahí: solo cambió la presentación.

## Errores frecuentes

> [!WARNING]
> - **El filtro de estado no lista valores** → el tipo no tiene flujo, o la columna que añadiste
>   es *Estado (Predeterminado)* vacío. Usa el estado del flujo que conectaste en M202-03.
> - **No aparece Criticidad de seguridad** → el atributo no está asociado al tipo de los
>   artefactos de esa carpeta. En `01 Requirements` la plantilla trae otros tipos; filtra por
>   `Requisito de Seguridad` o trabaja sobre los artefactos que creaste en M201-03.
> - **Guardé la vista y el compañero no la ve** → es personal, no compartida. O el compañero no
>   es miembro del proyecto.
> - **La vista compartida cambió sola** → alguien con permiso la editó. Es el riesgo del paso 4.

## 📝 Autoevaluación

**1.** Dirección pide "los requisitos críticos que aún no están aprobados". ¿Haces una vista
nueva o reutilizas `Direccion - clase C`? ¿Qué le falta a esa vista para contestar la pregunta?

**2.** Un autor te pide que compartas `Autor - pendientes de enviar`. ¿Lo harías? ¿Por qué sí o
por qué no?

<details>
<summary>Ver respuestas</summary>

<br>

**1.** Reutilizas la vista y le **añades** el filtro de estado distinto de *Aprobados* /
*Completado*. Si no, dirección ve también los clase C ya cerrados y la pregunta queda
diluida. El nombre debería pasar a describir la pregunta completa (`Direccion - clase C
pendientes`) o tendrás dos preguntas distintas bajo el mismo nombre.

**2.** No, o no con ese nombre. Esa vista es la bandeja personal del autor: si se comparte, cada
autor ve *los pendientes de todos*, no los suyos, salvo que añadas un filtro por creador o por
propietario. Compartirla sin ese filtro convierte una herramienta individual en ruido de equipo.

</details>
