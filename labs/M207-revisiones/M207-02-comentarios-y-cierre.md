# M207-02 · Observaciones, resolución y cierre

[← Página anterior](M207-01-crear-la-revision.md) · [Siguiente módulo →](../M208-informes/README.md)

> [!NOTE]
> **Objetivo** — recorrer el ciclo **observación → cambio → resolución → cierre**, con dos
> usuarios, sobre un requisito de clase C.
>
> ⏱️ ~25 min · 🗂️ La revisión `DR-01` · 🎯 Resultado: al menos un comentario resuelto y la revisión completada.

---

## Paso a paso

### Paso 1 · El revisor deja una observación

**Acción** — entra como `aprobador`. Abre `DR-01`. Selecciona el requisito de oclusión.

**Acción** — añade un **comentario de revisión** (no un comentario informal suelto si la UI
distingue): `Falta criterio cuantitativo de presion. No se puede ensayar el TC-Oclusion.`

**Qué ves** — el comentario ligado al artefacto **dentro** de la revisión. El contador de
observaciones abiertas sube.

---

### Paso 2 · El autor corrige

**Acción** — entra como `autor`. Abre el requisito (puede ser desde la revisión o desde
Artefactos). Completa el texto con un umbral explícito. Si el flujo lo exige, el requisito
puede estar *Bajo revisión*: entonces o el aprobador lo reabre, o el autor solo responde en
comentario pidiendo cambio. En laboratorio, como administrador puedes ajustar el estado para
no bloquearos: el punto pedagógico es **no fingir que el comentario se resolvió sin tocar el
requisito**.

**Acción** — en la revisión, responde al hilo: `Umbral anadido. Listo para re-ensayo.`

---

### Paso 3 · El revisor cierra la observación

**Acción** — como `aprobador`, marca el comentario / hallazgo como **resuelto** / *aceptado*.

**Qué ves** — el contador de abiertos baja. Si cierras la revisión con hallazgos abiertos, la
herramienta puede impedirlo o dejar constancia de impago: **no lo hagas**.

---

### Paso 4 · Cierre formal

**Acción** — cuando no queden observaciones abiertas, **Completar** la revisión (el
moderador/administrador). Resumen de cierre: `DR-01 cerrada. Pendiente firma de baseline
BL-diseno-v1 (M206).`

**Qué ves** — estado terminal. La revisión **no** se sigue usando como chat. La siguiente
oleada es `DR-02`, no reabrir eternamente `DR-01` salvo política explícita.

---

### Paso 5 · Encadena con gobernanza

**Acción** — como `aprobador`, si el requisito está listo, **Aprobar** en el flujo de M202.

**Qué ves** — dos capas: la revisión del **paquete** y el estado del **ítem**. Un requisito
puede estar aprobado en flujo y aun así haber nacido de una revisión con hallazgos: el
historial y la revisión lo explican.

---

## ✅ Resultado

- Un hallazgo resuelto de verdad (el texto cambió).
- `DR-01` completada.
- Relación clara revisión ↔ flujo ↔ baseline.

## Comprueba

- [ ] El comentario no quedó "resuelto" con el texto igual.
- [ ] La revisión no está *En curso* para siempre.
- [ ] Autor y revisor no fueron la misma persona.

## Errores frecuentes

> [!WARNING]
> - **Comenté en el artefacto pero no en la revisión** → el moderador no lo ve en el cierre.
>   Usa el hilo de la revisión.
> - **El autor no puede editar** → permisos de M202 o estado *Aprobado*. Reabre el flujo.
> - **Completar está apagado** → hallazgos abiertos, o no eres el rol que cierra.

## 📝 Autoevaluación

**1.** Diez comentarios "nits" de redacción y uno de seguridad clase C. ¿Misma revisión?

**2.** ¿Cerrar la revisión aprueba los requisitos?

<details>
<summary>Ver respuestas</summary>

<br>

**1.** Pueden convivir, pero el cierre no debería negociar el nit contra el de seguridad.
Marca severidad si la UI lo permite, o dos revisiones (`DR-01 seguridad`, `DR-01 editorial`)
si el ruido editorial oculta el hallazgo grave.

**2.** No. Cierra el **proceso colaborativo del paquete**. Cada requisito sigue su flujo
(M202) y el hito se congela con baseline (M206). Tres interruptores, tres preguntas de
auditor.

</details>
