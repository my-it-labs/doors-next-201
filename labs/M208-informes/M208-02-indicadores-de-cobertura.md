# M208-02 · Indicadores de cobertura y exportación

[← Página anterior](M208-01-dashboard-nativo.md) · [Siguiente módulo →](../M209-interoperabilidad/README.md)

> [!NOTE]
> **Objetivo** — consolidar **cuatro indicadores** como vistas compartidas y exportar el de
> dirección a CSV/Word, comprobando que la vista manda sobre el fichero.
>
> ⏱️ ~25 min · 🗂️ Artefactos + Más acciones → Exportar · 🎯 Resultado: un paquete de informe repetible.

---

## Los cuatro indicadores del curso

| Indicador | Vista (nómbrala exactamente) | Pregunta |
|---|---|---|
| Cola de aprobación | `Aprobador - cola de revision` | ¿Qué hay que firmar ya? |
| Riesgo | `Cobertura - clase C sin riesgo` | ¿Clase C sin mitigación? |
| Prueba | `Cobertura - clase C sin prueba` | ¿Clase C sin caso ETM? |
| Madurez | `Direccion - clase C` | ¿Cómo está el núcleo duro? |

Si alguna no existe, créala ahora (M203). El informe ejecutivo **es** este conjunto, no un
PDF generado por una herramienta ausente.

---

## Paso a paso

### Paso 1 · Abre la vista de dirección

**Acción** — aplica `Direccion - clase C`. Columnas: ID, Nombre, Estado, Criticidad, Mitiga,
Validated By.

---

### Paso 2 · Exporta CSV

**Acción** — **Más acciones → Exportar → CSV** (o *Hoja de cálculo*). Abre el fichero.

**Qué ves** — **las mismas columnas y filas** que la vista. Si salen 200 requisitos de más,
el filtro no estaba aplicado o exportaste el módulo entero.

> [!IMPORTANT]
> *Lo que ves es lo que exportas.* Igual que en el 101. Aquí las columnas de enlace son el
> valor añadido: el CSV de cobertura.

---

### Paso 3 · Exporta Word (documento de hito)

**Acción** — misma vista, exporta **Word**. Úsalo como anexo a `DR-01` / baseline.

**Qué ves** — documento legible por quien no tiene DOORS. No sustituye la herramienta; comunica
un **corte**.

---

### Paso 4 · Corte de calidad ETM (manual)

**Acción** — en `/qm`, abre el plan o la lista de casos. Anota cuántos casos están enlazados
a requisitos de clase C. No habrá un widget cruzado mágico.

**Acción** — escribe en el widget HTML del panel tres números **con fecha**:

```
Corte 2026-09-03
Clase C total: (cuenta de la vista)
Clase C sin riesgo: (cuenta)
Clase C sin prueba: (cuenta)
```

Actualizar esos números es el ritual de gobierno semanal. Cuando exista JRS, se automatiza;
el ritual no cambia.

---

## ✅ Resultado

- Cuatro vistas-indicador.
- CSV y Word coherentes con la vista.
- Un corte fechado en el panel.

## Comprueba

- [ ] El CSV no incluye encabezados filtrados fuera.
- [ ] Las columnas de enlace salen (o se ve el límite de la exportación; documéntalo).
- [ ] El corte tiene fecha.

## Errores frecuentes

> [!WARNING]
> - **Excel muestra basura** → abre con UTF-16/UTF-8 según lo que exporte DNG; no es un fallo
>   de cobertura.
> - **La columna de enlace sale vacía en Word** → limitación de la plantilla de export. El CSV
>   o la captura de la vista son el plan B honesto.

## 📝 Autoevaluación

¿Un CSV semanal en un buzón compartido es "un JRS pobre" o una práctica válida?

<details>
<summary>Ver respuesta</summary>

<br>

Es válida como **puente**, si el corte está fechado, la vista es canónica y nadie edita el
CSV a mano para "arreglar" cifras. Deja de ser válida cuando el CSV se convierte en la
fuente de verdad y DOORS queda desactualizado. JRS/LQE automatizan el puente, no cambian
quién es el maestro: los artefactos.

</details>
