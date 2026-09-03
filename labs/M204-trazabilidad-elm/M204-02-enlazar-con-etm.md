# M204-02 · Enlazar requisitos con Engineering Test Management

[← Página anterior](M204-01-cadena-en-doors.md) · [Siguiente página →](M204-03-sospechosos-e-impacto.md)

> [!NOTE]
> **Objetivo** — crear en **ETM** un caso de prueba que valide tu requisito de seguridad y
> dejar el enlace OSLC **Validated By** visible desde DOORS Next.
>
> ⏱️ ~25 min · 🗂️ `https://localhost:9443/qm` y tu proyecto RM · 🎯 Resultado: el requisito muestra un caso de prueba enlazado.

---

## En qué consiste

ETM (antes RQM; en URLs sigue `/qm`) es la aplicación de **pruebas** de este laboratorio.
JTS ya la tiene registrada. Vas a:

1. Abrir o crear un área de proyecto de calidad asociada al ciclo de vida.
2. Crear un **caso de prueba**.
3. Enlazarlo al `Requisito de Seguridad` de clase C.
4. Comprobar el enlace desde **los dos** lados.

## Antes de empezar necesitas

- [M204-01](M204-01-cadena-en-doors.md).
- Usuario con licencia que cubra ETM (en el trial de clase suele activarse **ELM Base** /
  *Quality Management* junto a las de DOORS; si al entrar en `/qm` hay error de licencia,
  asigna en `/jts/admin` una CAL de Test Management o Practitioner, como en M202-01).

> [!TIP]
> **Misma cuenta, otra aplicación.** `formador` / `formador` (o `alumno`) sirve en `/qm`. No
> crees un usuario nuevo salvo que quieras practicar de nuevo las capas de M202.

---

## Conceptos clave

| Concepto | Qué es |
|---|---|
| **ETM / QM** | Gestión de planes, casos, scripts y ejecuciones de prueba |
| **Caso de prueba** | El diseño de la prueba (qué se demuestra), no el resultado de una corrida |
| **Validated By** | Tipo OSLC: el requisito *es validado por* el caso |
| **Ambit / proyecto de ciclo de vida** | Cuando existe, RM y QM comparten un paraguas; si no, se enlaza por OSLC entre áreas |

---

## Paso a paso

### Paso 1 · Entra en ETM

**Acción** — abre `https://localhost:9443/qm`. Acepta el certificado si hace falta. Inicia
sesión.

**Qué ves** — el panel de Engineering Test Management. Si pide terminar un asistente de
proyecto, completa un área **de calidad** con nombre reconocible (`Calidad - bomba`) usando
la plantilla por defecto.

> [!NOTE]
> **Por qué otra área** — RM y QM son aplicaciones distintas. Los requisitos no "viven" en
> ETM; se **referencian**. El caso de prueba vive en QM.

---

### Paso 2 · Crea el caso de prueba

**Acción** — **Planificación → Crear → Caso de prueba** (las etiquetas pueden ser *Test Case*
si la UI está en inglés).

| Campo | Valor |
|---|---|
| **Nombre** | `TC-Oclusion - parada en menos de 2 s` |
| **Descripción** | `Verifica el requisito de parada por oclusion de la bomba.` |

Guarda.

**Qué ves** — un caso con ID propio de QM, distinto del ID de DOORS Next. Anótalo.

---

### Paso 3 · Crea el enlace desde el requisito

**Acción** — vuelve a `/rm`, abre tu `Requisito de Seguridad`. En **Enlaces**, añade un enlace
hacia un artefacto **de otra aplicación**. El diálogo de búsqueda OSLC debe ofrecer
**Quality Management** / casos de prueba. Busca `TC-Oclusion` y confirma el tipo
**Validated By**.

**Qué ves** — en el requisito, un enlace que no apunta a otro requisito sino a un recurso de
`/qm`. Al pulsar, cambias de aplicación (a veces con un nuevo login si la sesión caducó).

> [!IMPORTANT]
> **Si el diálogo no lista QM**, la aplicación no está registrada en JTS o el usuario no tiene
> permiso de lectura en el área de calidad. En `/jts/admin → Aplicaciones registradas` debe
> aparecer QM como *Installed*. Eso se validó al preparar el entorno; si no está, avisa al
> formador: no lo resuelves creando más enlaces internos de RM.

---

### Paso 4 · Comprueba el lado QM

**Acción** — en el caso de prueba, sección de **requisitos enlazados** / *Validates*. Debe
aparecer tu requisito de DOORS.

**Qué ves** — la misma relación, nombre inverso. Eso es OSLC funcionando, no un copiar/pegar
de texto.

---

### Paso 5 · Pon la columna en DOORS

**Acción** — en la vista `Cobertura - clase C sin riesgo` (o una nueva), añade la columna de
enlace **Validated By**.

**Qué ves** — tu requisito de clase C deja de ser un hueco de *prueba*. Los demás clase C
siguen vacíos: es el backlog de verificación.

Guarda la vista: `Cobertura - clase C sin prueba`.

---

## ✅ Resultado

- Existe un caso de prueba en ETM ligado a un requisito de DOORS Next.
- El enlace se ve en RM y en QM.
- Tienes una vista de huecos de **validación**, distinta de la de riesgos.

## Comprueba

- [ ] `/qm` abre sin error de licencia.
- [ ] El requisito muestra el caso `TC-Oclusion`.
- [ ] El caso muestra el requisito.
- [ ] La columna *Validated By* no está vacía en esa fila.

## Errores frecuentes

> [!WARNING]
> - **CRJAZ / forbidden license en QM** → falta CAL de pruebas. M202-01, inventario de
>   licencias: activa el trial de Test Management si está inactivo.
> - **El buscador OSLC no encuentra el caso** → estás buscando en el proyecto RM. Cambia el
>   destino a la aplicación QM y al área de calidad correcta.
> - **Enlacé con Satisfies en vez de Validated By** → el tipo importa para los informes y para
>   quien lea la matriz. Borra y recrea con el tipo correcto.

## 📝 Autoevaluación

**1.** ¿Un enlace *Validated By* demuestra que la prueba **pasó**?

**2.** ¿Por qué este laboratorio no se puede sustituir del todo con un atributo *ID de caso de
prueba* de texto en el requisito?

<details>
<summary>Ver respuestas</summary>

<br>

**1.** No. Demuestra que **existe un diseño de prueba asociado**. El resultado (pasó / falló)
vive en la **ejecución** del caso en ETM. Confundir diseño con resultado es el error que hace
que un cuadro de mando de "cobertura de pruebas" pinte en verde requisitos cuya última
ejecución falló.

**2.** Porque el texto no navega, no se actualiza si borran el caso, no aparece en el lado QM
y no participa en sospechosos OSLC. Es un post-it. El enlace es un hecho del ciclo de vida.

</details>
