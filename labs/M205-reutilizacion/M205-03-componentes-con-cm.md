# M205-03 · Componentes cuando la CM está activa

[← Página anterior](M205-02-copiar-frente-a-compartir.md) · [Siguiente módulo →](../M206-configuraciones/README.md)

> [!NOTE]
> **Objetivo** — si la **gestión de configuraciones** ya está habilitada en el proyecto,
> crear un componente de biblioteca y usarlo como unidad de reutilización. Si el botón sigue
> deshabilitado, **no improvises**: este laboratorio se aplaza a M206.
>
> ⏱️ ~10 min · 🗂️ Área de proyecto → Gestión de configuraciones · 🎯 Resultado: un componente extra o una parada explícita.

---

## Antes de empezar

**Acción** — `/rm/admin` → tu área de producto → **Gestión de configuraciones**.

![Pestaña de gestión de configuraciones](../img/cm-pestana.png)

- Si **Habilitar gestión de configuraciones** está **activo** (o ya habilitaste): sigue.
- Si está **gris**: falta la **clave de activación** en propiedades avanzadas de RM. No hay
  truco de permisos (se comprobó con el rol *Administrador de configuración*). Pasa a
  [M206-01](../M206-configuraciones/M206-01-lineas-base.md), que sí se puede hacer con
  baselines de módulo.

---

## Paso a paso (solo con CM)

### Paso 1 · Componente de biblioteca

**Acción** — crea un componente `Seguridad compartida` (el diálogo está en administración de
componentes / configuraciones del proyecto, una vez CM está on).

**Qué ves** — un segundo contenedor de artefactos, con su propia corriente inicial, no una
carpeta más.

### Paso 2 · Artefactos en el componente

**Acción** — crea en ese componente los `Requisito de Seguridad` canónicos (pocos: 3–5
cláusulas realmente comunes).

### Paso 3 · Uso en el producto

**Acción** — en la corriente del producto, **añade el componente** (o crea un stream que lo
incluya), según la UI de configuraciones de tu versión.

**Qué ves** — los artefactos de seguridad aparecen en el contexto del producto **sin copiar**.
Un cambio se entrega por **change set** (M206), no por pegar texto.

> [!WARNING]
> Habilitar CM **no se puede deshacer**. No lo actives en un área de producción real sin
> haber leído los factores que lista la propia pantalla.

---

## ✅ Resultado

- O bien un componente de biblioteca reutilizado,
- o bien la decisión consciente de esperar la clave, sin falsear el modelo con copias.

## Comprueba

- [ ] No habilitaste CM "a ver qué pasa" en un proyecto que no sea el de clase.
- [ ] Si no había clave, no inventaste componentes falsos con carpetas.

## 📝 Autoevaluación

¿Una carpeta `00 Biblioteca` dentro del mismo componente resuelve la reutilización entre
**dos productos**?

<details>
<summary>Ver respuesta</summary>

<br>

No. Es organización visual. Los dos productos necesitan **dos áreas** (permisos, ReqIF,
baselines) y un **componente o proyecto** de biblioteca. La carpeta no cruza esa frontera.

</details>
