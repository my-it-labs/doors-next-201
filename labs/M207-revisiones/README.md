# M207 · Revisiones formales y colaboración

[← Módulo anterior](../M206-configuraciones/M206-03-streams-y-change-sets.md) · [Siguiente página →](M207-01-crear-la-revision.md)

> [!NOTE]
> **De qué va este módulo** — una **revisión formal** no es un hilo de comentarios en un
> artefacto. Es un objeto con alcance, revisores, estados y cierre. La pestaña **Revisiones**
> del proyecto (la viste al aplicar la plantilla) es el sitio.
>
> ⏱️ ~40 min · 🎯 Resultado: una revisión abierta, comentada y cerrada sobre la colección de M203.

---

## Por qué importa

El flujo de M202 mueve **un** requisito. La revisión agrupa **un paquete** (colección o
módulo), reparte observaciones y deja constancia de que el equipo **cerró** el hito. En
dispositivos médicos es el equivalente a un design review.

## Comentario de artefacto frente a revisión

| | Comentario en el artefacto | Revisión formal |
|---|---|---|
| **Alcance** | Un ítem | Un conjunto convocado |
| **Obligación de responder** | Social | Del proceso (estados de la revisión) |
| **Cierre** | El comentario se resuelve o no | La revisión se **completa** o se **cancela** |
| **Auditoría de hito** | Débil | Fuerte |

## Laboratorios

| Lab | Título | Qué harás | Tiempo |
|---|---|---|---|
| [M207-01](M207-01-crear-la-revision.md) | Crear la revisión | Alcance, revisores, arranque | ~15 min |
| [M207-02](M207-02-comentarios-y-cierre.md) | Observaciones y cierre | Comentar como revisor, resolver como autor, cerrar | ~25 min |

→ Empieza por **[M207-01](M207-01-crear-la-revision.md)**.

> [!TIP]
> Si Mailpit está levantado (`http://localhost:8025`) y el servidor tiene SMTP apuntando a
> `mailpit:1025`, verás avisos de revisión. Si el asistente de JTS dejó el correo apagado, el
> laboratorio **no depende** del mail: se trabaja dentro de la pestaña Revisiones.
