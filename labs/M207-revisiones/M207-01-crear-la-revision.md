# M207-01 · Crear la revisión formal

[← Página anterior](README.md) · [Siguiente página →](M207-02-comentarios-y-cierre.md)

> [!NOTE]
> **Objetivo** — abrir una revisión sobre `Revision de diseño - bomba v1` (o un módulo),
> invitar a `autor` y `aprobador`, y dejarla **en curso**.
>
> ⏱️ ~15 min · 🗂️ Pestaña **Revisiones** · 🎯 Resultado: una revisión con alcance y dos participantes.

---

## Antes de empezar necesitas

- [M203-03](../M203-consultas-vistas/M203-03-colecciones.md) o, si no existe la colección, el
  módulo System Requirements.
- Cuentas `autor` y `aprobador` miembros del proyecto (M202).
- Rol que permita **Guardar revisión** (el *Administrador* y el *Aprobador* que configuraste).

![El proyecto, tras la plantilla, ya muestra la pestaña Revisiones](../img/plantilla-aplicada.png)

---

## Paso a paso

### Paso 1 · Nueva revisión

**Acción** — pestaña **Revisiones → Crear**. Nombre: `DR-01 Revision de diseño bomba`.
Resumen: `Paquete v1 de seguridad y riesgos asociados.`

---

### Paso 2 · Alcance

**Acción** — añade como alcance la **colección** `Revision de diseño - bomba v1`. Si el
diálogo solo admite módulos, añade el módulo que contiene tus requisitos de seguridad y
anota en la descripción que el alcance "oficial" es la colección.

**Qué ves** — la revisión lista artefactos. Si el alcance está vacío, no hay revisión: hay un
título.

> [!IMPORTANT]
> **Alcance de más es tan malo como de menos.** Meter los 100 artefactos de ejemplo de la
> plantilla garantiza que nadie termine. El M203-03 existía para esto.

---

### Paso 3 · Participantes y calendario

**Acción** — añade **revisores**: `aprobador` (revisor) y `autor` (autor de los requisitos;
en algunas plantillas el rol se llama *autor* o *moderator*). Fecha objetivo: hoy + 2 días
(aunque sea laboratorio).

**Acción** — **Iniciar** / *Empezar revisión* si está en borrador.

**Qué ves** — estado distinto de *Nueva*. Los invitados, al entrar, deben ver la revisión en
su lista.

---

### Paso 4 · Comprueba con el otro usuario

**Acción** — ventana privada, `aprobador` / `aprobador` → **Revisiones**.

**Qué ves** — `DR-01`. Si no, no es miembro, no tiene permiso de lectura (control de acceso)
o no le invitaste.

---

## ✅ Resultado

- Revisión `DR-01` iniciada, con alcance acotado.
- El aprobador la ve sin ser administrador del área.

## Comprueba

- [ ] El alcance no es "todo el proyecto".
- [ ] Hay al menos dos personas distintas (autor y revisor).
- [ ] No está en borrador eterno.

## Errores frecuentes

> [!WARNING]
> - **Crear revisión apagado** → permiso *Guardar revisión* (M202-02).
> - **No puedo añadir la colección** → usa módulo y documenta la limitación; no infles el
>   alcance con carpetas enteras de la plantilla.

## 📝 Autoevaluación

¿Por qué el aprobador de M202 no es automáticamente revisor de todas las revisiones?

<details>
<summary>Ver respuesta</summary>

<br>

El rol da **capacidad**. La revisión es una **convocatoria**. Mezclarlos haría que todo el
mundo con rol Aprobador recibiera cada design review, incluidos los de otros subsistemas.
La invitación es el alcance humano, como la colección es el alcance de contenido.

</details>
