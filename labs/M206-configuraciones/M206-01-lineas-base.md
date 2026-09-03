# M206-01 · Líneas base y comparación

[← Página anterior](README.md) · [Siguiente página →](M206-02-firma-y-entrega.md)

> [!NOTE]
> **Objetivo** — crear una **línea base** del módulo (o de la colección de revisión), modificar
> el trabajo vivo y **comparar** para ver añadidos, cambios y bajas.
>
> ⏱️ ~20 min · 🗂️ Un módulo de `01 Requirements` · 🎯 Resultado: un hito nombrado y un diff entendible.

---

## En qué consiste

Esto **sí** está validado en el 101 y no depende de la clave de CM. En el 201 lo haces sobre
el material de dispositivo médico y lo conectas con la colección del M203-03.

## Antes de empezar necesitas

- Un módulo con requisitos (plantilla o el tuyo).
- Haber tocado al menos un requisito después de M201.

---

## Paso a paso

### Paso 1 · Elige el alcance

**Acción** — abre el módulo **System Requirements** (o el que estés usando de verdad). Evita
baselinar un módulo que no hayas entendido: la foto sería ruido.

---

### Paso 2 · Crea la línea base

**Acción** — **Más acciones** del módulo → **Crear línea base** (o *Crear línea de referencia*).
Nombre: `BL-diseno-v1 - antes de revision formal`. Descripción: fecha y motivo.

**Qué ves** — la línea base aparece en la lista del módulo. **No se edita** su contenido: si
"cambias" algo, estás en la corriente de trabajo, no en la foto.

> [!IMPORTANT]
> **Inmutable significa inmutable.** No hay "editar la baseline un poquito". Si el hito estaba
> mal, creas **otra** baseline después, no reescribes la historia.

---

### Paso 3 · Genera diferencias a propósito

**Acción** — cambia el texto de un requisito, añade uno nuevo (aunque sea `TODO-lab-206`) y,
si te atreves, elimina un encabezado vacío de ejemplo.

---

### Paso 4 · Compara

**Acción** — **Comparar** la línea base `BL-diseno-v1` con el estado actual del módulo.

**Qué ves** — añadidos, modificados, eliminados. Eso es el control de cambios operativo, el
mismo concepto que el historial de un artefacto pero a **escala de entrega**.

> [!NOTE]
> **Historial vs baseline** — el historial explica *un* artefacto. La comparación de baseline
> explica *el paquete*. Un auditor pide las dos.

---

### Paso 5 · (Opcional) Baseline de colección

**Acción** — si tu versión permite línea base sobre **colección**, haz lo mismo con
`Revision de diseño - bomba v1`. El alcance de la revisión (M207) queda congelado aunque
sigas trabajando en el módulo.

---

## ✅ Resultado

- Existe `BL-diseno-v1`.
- Sabes comparar y leer el diff.
- Distingues foto de módulo y trabajo en curso.

## Comprueba

- [ ] No puedes editar el contenido *dentro* de la línea base como si fuera el módulo vivo.
- [ ] La comparación muestra el requisito que modificaste.
- [ ] El nombre de la baseline dice el hito, no `baseline1`.

## Errores frecuentes

> [!WARNING]
> - **No encuentro crear línea base** → estás en la vista de artefactos de carpeta, no dentro
>   del módulo. Entra al documento.
> - **Comparé dos cosas y no hay diff** → elegiste la misma configuración dos veces, o no
>   guardaste los cambios antes de comparar.

## 📝 Autoevaluación

¿Sirve una baseline para "deshacer" un mes de trabajo y volver atrás como `git reset`?

<details>
<summary>Ver respuesta</summary>

<br>

No es un reset del stream. Te permite **consultar y comparar** (y, con CM, **entregar** o
partir un stream nuevo desde la foto). El trabajo vivo no se borra solo. Quien promete "la
baseline es un undo" acaba copiando artefactos a mano y empeorando el historial.

</details>
