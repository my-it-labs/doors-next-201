# M206-02 · Firma electrónica y paquete de entrega

[← Página anterior](M206-01-lineas-base.md) · [Siguiente página →](M206-03-streams-y-change-sets.md)

> [!NOTE]
> **Objetivo** — configurar la **firma electrónica** del área y entender cómo se combina con
> una línea base para un hito regulado.
>
> ⏱️ ~10 min · 🗂️ Área de proyecto → Firma electrónica · 🎯 Resultado: razones de firma definidas y el criterio de cuándo exigirlas.

---

## Paso a paso

### Paso 1 · Abre la política de firma

**Acción** — área de proyecto → **Requisitos → Firma electrónica**.

![Firma electrónica: comentario y razones](../img/firma-electronica.png)

**Qué ves** — puedes exigir **comentario**, exigir **razón** de una lista, y **añadir razones**.

---

### Paso 2 · Define razones serias

**Acción** — **Añadir razón** (tres, no quince):

- `Aprobacion de diseño`
- `Liberacion para verificacion`
- `Correccion post-auditoria`

**Acción** — marca **Requerir que el usuario seleccione una razón** y **Requerir un
comentario**. **Guarda** el área.

> [!NOTE]
> En entornos FDA 21 CFR Part 11 la firma es un acto consciente, no un clic más. Si dejas la
> lista vacía o razones tipo `ok`, has teatralizado el control.

---

### Paso 3 · Relación con la baseline

**Acción** — no hace falta firmar ahora si el diálogo de baseline no lo pide aún (depende de
si CM está on y de la versión). Lo que debes saber:

1. La **baseline** congela el contenido.
2. La **firma** congela la **atestación** (quién, por qué).
3. El **flujo de M202** congela el estado de cada requisito.
4. Los tres se complementan; ninguno sustituye a los otros (autoevaluación de M202-03).

---

## ✅ Resultado

- Razones de firma propias del dominio.
- Comentario obligatorio activado.

## Comprueba

- [ ] Las tres razones aparecen en la lista.
- [ ] El área está guardada (sin asterisco).

## 📝 Autoevaluación

¿Basta la firma electrónica para demostrar que el *texto* no cambió después?

<details>
<summary>Ver respuesta</summary>

<br>

No. La firma atestigua un acto. La **inmutabilidad del texto** la da la línea base (y el
historial si alguien trabaja fuera de ella). Sin baseline, puedes firmar un conjunto que
sigue mutando.

</details>
