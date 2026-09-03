# M205-01 · Biblioteca por proyecto

[← Página anterior](README.md) · [Siguiente página →](M205-02-copiar-frente-a-compartir.md)

> [!NOTE]
> **Objetivo** — crear un segundo proyecto que actúe como **modelo canónico** y arrastrar a
> tu proyecto de producto **el metamodelo**, no los 3.000 requisitos a mano.
>
> ⏱️ ~20 min · 🗂️ `/rm/admin` · 🎯 Resultado: un área biblioteca y el mecanismo de importar propiedades localizado.

---

## En qué consiste

En M201-01 las tres vías para tener tipos eran: plantilla, **importar propiedades de un
proyecto existente**, o definir a mano. Aquí usas la segunda, que es la respuesta al reto de
aquel laboratorio.

## Antes de empezar necesitas

- Tu proyecto de producto (Medical Devices + extensiones de M201).
- Ser *JazzAdmins* o equivalente para crear áreas.

---

## Paso a paso

### Paso 1 · Crea el área biblioteca

**Acción** — `/rm/admin` → **Crear área de proyecto**.

| Campo | Valor |
|---|---|
| **Nombre** | `Biblioteca - requisitos de seguridad` |
| **Resumen** | `Modelo y clausulas comunes. No es un producto.` |

Misma plantilla de **proceso** que el producto. **Guarda**.

**Acción** — hazte **miembro** con rol **Administrador** (paso 4 de M201-01). Sin eso, no
importas ni editas tipos.

---

### Paso 2 · Decide qué vive en la biblioteca

No copies la plantilla Medical Devices entera otra vez. En la biblioteca vas a querer:

- los **tipos de datos** (`Criticidad IEC 62304`),
- el **atributo** `Criticidad de seguridad`,
- el tipo `Requisito de Seguridad`,
- el tipo de enlace `Mitiga` y su restricción.

**Acción** — en la biblioteca, **Gestionar propiedades** → **Importar propiedades del
proyecto** (botón que ya viste en cada pestaña del metamodelo).

**Acción** — origen: tu proyecto de **producto** (el de M201). Selecciona tipos de datos,
atributos, tipos de artefacto y tipos de enlace relacionados con seguridad. Finaliza.

**Qué ves** — la biblioteca ya no está vacía de tipos. Aún puede no tener artefactos, y está
bien: una biblioteca de **modelo** no obliga a tener ya las cláusulas.

> [!IMPORTANT]
> **El sentido del import en producción suele ser el inverso:** el canónico es la biblioteca y
> los productos **importan de ella**. Aquí importas *desde* el producto porque es donde ya
> construiste el modelo en M201. En el paso 3 giramos la historia.

---

### Paso 3 · Gira el canon (mental y, si puedes, práctico)

A partir de ahora, **nuevos** tipos de seguridad se crean **en la biblioteca** y se importan
al producto, no al revés.

**Acción** — en la biblioteca, añade un valor de enumeración `Clase B+` (o un atributo
`Normativa aplicable` con cardinalidad múltiple, el reto de M201-03) y **Guarda**.

**Acción** — en el proyecto de **producto**, importa otra vez las propiedades **desde la
biblioteca**.

**Qué ves** — el producto recibe el cambio de modelo sin rehacer pantallas. Los artefactos
viejos no ganan el valor nuevo hasta que alguien los edite: importar propiedades no es migrar
datos.

---

### Paso 4 · Comparte proceso (opcional pero el de M201)

**Acción** — en el área biblioteca, **Visión general → Compartir proceso**: ofrece compartir
la configuración. En el área producto, al crear *futuras* áreas se podría heredar.

En las áreas **ya creadas**, heredar proceso a posteriori es limitado: lo importante es
conocer la opción *Utilizar la configuración del proceso de otra área* **al crear**.

> [!NOTE]
> Recuerda el aviso de **Control de acceso** (M202-02): compartir proceso puede abrir lectura
> entre áreas.

---

## ✅ Resultado

- Existe `Biblioteca - requisitos de seguridad`.
- Sabes importar el metamodelo en las dos direcciones y cuál debe ser el canon.
- Distingues importar **tipos** de copiar **artefactos**.

## Comprueba

- [ ] La biblioteca tiene `Criticidad IEC 62304` sin haber aplicado Medical Devices otra vez.
- [ ] Un cambio de modelo en la biblioteca puede entrar al producto por importación.
- [ ] No has mezclado 100 artefactos de ejemplo de la plantilla en la biblioteca "porque sí".

## Errores frecuentes

> [!WARNING]
> - **Importar no hace nada** → no eres miembro administrador, o elegiste el proyecto origen
>   equivocado, o no marcaste las casillas de qué propiedades.
> - **Se duplicaron tipos** → el import no fusionó por nombre. Limpia en el destino o importa
>   sobre un proyecto vacío de tipos.
> - **La biblioteca es un clon del producto** → aplicaste la plantilla Medical Devices otra
>   vez. Crea el área vacía de tipos e importa solo lo de seguridad.

## 📝 Autoevaluación

Ocho productos de la misma familia: ¿una biblioteca de modelo, ocho copias de plantilla IBM,
o un solo proyecto gigante con carpetas por producto?

<details>
<summary>Ver respuesta</summary>

<br>

**Biblioteca de modelo** (y, con CM, componentes). Ocho copias de plantilla divergen en la
semana dos. Un solo proyecto gigante mezcla permisos, baselines y ReqIF: el producto B ve
requisitos secretos del A. Las carpetas no son frontera de gobierno.

</details>
