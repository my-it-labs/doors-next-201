# M201-03 · Extender el modelo

[← Página anterior](M201-02-anatomia-del-metamodelo.md) · [Siguiente módulo →](../M202-gobernanza/README.md)

> [!NOTE]
> **Objetivo** — ampliar el modelo de la plantilla con una necesidad nueva y real: poder decir
> de cada requisito **qué clase de daño puede causar si falla**, y poder trazar qué requisitos
> mitigan qué riesgos.
>
> ⏱️ ~25 min · 🗂️ Sobre tu proyecto de M201-01 · 🎯 Resultado: una enumeración, un atributo, un tipo de requisito, un tipo de enlace y una restricción, creados por ti.

---

## En qué consiste

Tienes un encargo concreto. El proyecto va a certificarse según la norma **IEC 62304** (software
de dispositivos médicos), que obliga a clasificar el software según la gravedad del daño que
puede causar un fallo: clase A (ninguno), B (daño no grave) y C (daño grave o muerte).

La plantilla no trae nada de eso. Vas a construirlo en cinco pasos, de abajo arriba:

```
1. Tipo de datos      Criticidad IEC 62304  (enumeración: Clase A / B / C)
        ↓
2. Atributo           Criticidad de seguridad  (usa el tipo anterior)
        ↓
3. Tipo de artefacto  Requisito de Seguridad  (incluye el atributo)
        ↓
4. Tipo de enlace     Mitiga / Mitigado por
        ↓
5. Restricción        Requisito de Seguridad --Mitiga--> Risk
```

## Antes de empezar necesitas

- Haber completado [M201-02](M201-02-anatomia-del-metamodelo.md) y tener abierto el editor de
  propiedades del proyecto.

> [!IMPORTANT]
> **El orden no es negociable.** Cada paso consume lo creado en el anterior. Si intentas crear
> el atributo antes que su tipo de datos, no lo encontrarás en la lista.

---

## Conceptos clave

| Concepto | Qué es |
|---|---|
| **Lista enumerada de valores** | Dominio cerrado: el atributo solo admite los valores que declares |
| **Rango limitado de valores** | Dominio numérico acotado por un mínimo y un máximo |
| **Cardinalidad** | Si el atributo admite **un** valor o **varios** |
| **Valor inicial** | El valor que recibe el atributo al crear el artefacto |
| **Par de nombres del enlace** | Cómo se lee la relación desde cada extremo (*Mitiga* / *Mitigado por*) |
| **Restricción de enlace** | La regla que declara qué tipo puede enlazarse con qué, y con qué enlace |

---

## Paso a paso

### Paso 1 · Crea el tipo de datos enumerado

**Acción** — abre la pestaña **Tipos de datos de atributo** y pulsa el botón **+** de la
cabecera del panel izquierdo (su etiqueta es *Tipo de datos nuevo…*).

![Lista de tipos de datos, con el botón de alta en la cabecera del panel](../img/metamodelo-tipos-datos.png)

**Acción** — rellena el formulario de la derecha:

| Campo | Valor |
|---|---|
| **Nombre** | `Criticidad IEC 62304` |
| **Descripción** | `Clase de seguridad del software segun IEC 62304` |
| **Tipo de valor** | **Lista enumerada de valores** |

**Qué ves** — al marcar *Lista enumerada de valores*, el formulario cambia: desaparecen
**Mínimo** y **Máximo** (que son de *Rango limitado*) y aparece una **tabla de valores** con su
propio botón de alta.

**Acción** — añade los tres valores, en este orden:

- `Clase A`
- `Clase B`
- `Clase C`

Pulsa **Guardar** (arriba a la derecha del panel).

**Qué ves** — `Criticidad IEC 62304` aparece en la lista de la izquierda con tipo base
**Enumerado**, junto a los `Severity Type` y `Priority Type` de la plantilla.

> [!IMPORTANT]
> **El orden de los valores es el orden de la escala.** DOORS Next respeta el orden en que los
> declaras al ordenar y agrupar en vistas e informes. Declararlos alfabéticamente o al azar es
> un error que se paga al hacer el cuadro de mando del M208.

> [!TIP]
> **Opciones** — el campo **URI** te deja dar un identificador propio a la enumeración, del
> estilo `https://mi-organizacion.com/ns/rm/criticidad#claseC`. No es un adorno: es lo que
> permite que una herramienta externa entienda el valor. Lo aprovecharás en el M209.

---

### Paso 2 · Crea el atributo

**Acción** — abre **Atributos de artefacto** y pulsa el **+** de la cabecera del panel
(*Nuevo atributo…*).

**Acción** — rellena:

| Campo | Valor | Por qué |
|---|---|---|
| **Nombre** | `Criticidad de seguridad` | Será una cabecera de columna: que se entienda sola |
| **Tipo de datos** | `Criticidad IEC 62304` | El que creaste en el paso 1 |
| **Número de valores** | **un solo valor** (deja *Se permiten varios valores* sin marcar) | Un requisito tiene una única clase de criticidad |
| **Valor inicial** | `Clase A` | Ver el aviso de abajo |
| **Afecta a la validez de enlace** | **marcado** | Si cambia la criticidad, hay que revisar las pruebas asociadas |

Pulsa **Guardar**.

**Qué ves** — el atributo aparece en la lista con su tipo de datos en la segunda columna.

> [!IMPORTANT]
> **Cuidado con el valor inicial en un atributo de seguridad.** Poner `Clase A` por defecto
> significa que todo requisito nace declarado como *inocuo*, y quien no rellene el campo dejará
> requisitos peligrosos disfrazados de inofensivos. Dejar el valor inicial **vacío** es más
> incómodo, pero hace visible lo que falta por clasificar: un filtro por *sin valor* te da la
> lista de deberes. Es una decisión de gobernanza, no de configuración.

> [!NOTE]
> **Por qué marcamos la validez de enlace** — la criticidad de un requisito determina cuánto
> rigor necesita su verificación. Si un requisito sube de clase A a clase C, sus casos de
> prueba probablemente ya no sean suficientes: es exactamente el caso para el que existen los
> enlaces sospechosos del M204.

---

### Paso 3 · Crea el tipo de artefacto

**Acción** — abre **Tipos de artefactos** y pulsa el **+** de la cabecera
(*Añadir tipo de artefacto…*).

![Sección de tipos de artefacto con el detalle de un tipo](../img/metamodelo-tipos-artefacto.png)

**Acción** — rellena:

| Campo | Valor |
|---|---|
| **Nombre** | `Requisito de Seguridad` |
| **Descripción** | `Requisito cuyo incumplimiento puede causar danio al paciente o al operador` |
| **Formato de artefacto predeterminado** | **Texto** (no *Module*: esto es un requisito, no un documento) |
| **Flujo de trabajo** | déjalo vacío por ahora, lo configurarás en el M202 |

**Acción** — ahora asocia el atributo. Pulsa **Añadir atributo…** y selecciona
`Criticidad de seguridad`. Añade también los atributos que ya usan los requisitos de la
plantilla, para que tu tipo sea coherente con el resto del modelo:

- `Acceptance Criteria`
- `Ver Method` (método de verificación)

Pulsa **Guardar**.

**Qué ves** — `Requisito de Seguridad` aparece en la lista de tipos, ya con 19 tipos en total.

> [!TIP]
> **Opciones** — en **Roles de artefacto** puedes marcar *Convertir este tipo de artefacto en un
> tipo de artefacto preferido*. Los tipos preferidos se ofrecen primero al crear artefactos, y es
> una forma barata de guiar al equipo hacia el modelo correcto sin escribir ni una norma interna.

> [!NOTE]
> **Por qué un tipo nuevo y no un atributo en el tipo existente** — es la pregunta de diseño de
> este módulo, y la respuesta depende de si el requisito de seguridad **se gobierna distinto**.
> Si va a tener otro flujo de aprobación, otros permisos de edición y otra exigencia de
> verificación, merece un tipo propio. Si solo cambia un campo, sobra el tipo y basta el
> atributo. Aquí creamos el tipo porque en el M202 le pondremos un flujo de aprobación más
> estricto que al resto.

---

### Paso 4 · Crea el tipo de enlace

**Acción** — abre **Tipos de enlace** y pulsa **Añadir…**

**Acción** — rellena los **dos** nombres de la relación:

| Campo | Valor |
|---|---|
| **Nombre del tipo** | `Mitigacion` |
| **Nombre saliente** | `Mitiga` |
| **Nombre entrante** | `Mitigado por` |

Pulsa **Guardar**.

**Qué ves** — tu tipo aparece en la lista. A diferencia de los de la plantilla, la columna de
**URI** queda vacía o con una URI local: es un tipo **propio**, no un tipo estándar de OSLC.

![Sección de tipos de enlace](../img/metamodelo-tipos-enlace.png)

**Qué ves** — y ahora se lee así: desde el requisito, *"este requisito **mitiga** el riesgo de
sobredosis"*; desde el riesgo, *"este riesgo está **mitigado por** el requisito RS-014"*. La
misma relación, dos lecturas.

> [!IMPORTANT]
> **Antes de inventar un tipo de enlace, busca el estándar.** Revisa la lista: ¿te sirve
> `Affects / Affected By` o `Satisfies / Satisfied By`? Un tipo propio no viaja: no lo entenderá
> ETM al enlazar pruebas, no saldrá igual en un ReqIF y tendrás que tratarlo a mano en la API
> OSLC del M209. Aquí lo creamos precisamente para que veas ese coste.

---

### Paso 5 · Restringe qué se puede enlazar con qué

**Acción** — abre **Restricciones de enlace** y pulsa **Añadir**. Rellena la fila:

| Columna | Valor |
|---|---|
| **Tipo de artefacto de origen** | `Requisito de Seguridad` |
| **Tipo de enlace (saliente, entrante)** | `Mitiga` |
| **Tipo de artefacto de destino** | `Risk` |

![Sección de restricciones de enlace](../img/metamodelo-restricciones-enlace.png)

Pulsa **Guardar**.

**Qué ves** — la tabla, que estaba vacía, tiene ya una fila.

> [!IMPORTANT]
> **Ojo al efecto secundario, que sorprende a todo el mundo.** Mientras la tabla estaba vacía,
> *todo* estaba permitido. En cuanto añades **una** restricción para un tipo de enlace, ese
> enlace queda limitado **solo** a las combinaciones declaradas. Es decir: acabas de prohibir
> usar *Mitiga* en cualquier otro par de tipos. Si tu modelo también necesita que un
> `System Requirement` mitigue un riesgo, tendrás que añadir esa fila explícitamente.

---

### Paso 6 · Comprueba que el modelo funciona de verdad

Un modelo no está terminado hasta que se ha usado. Vamos a probarlo.

**Acción** — sal del editor, entra en **Artefactos**, abre la carpeta `01 Requirements` y crea
un artefacto nuevo de tipo **`Requisito de Seguridad`**. Escribe como texto:
`La bomba debe detener la infusion si detecta oclusion en menos de 2 segundos.`

**Qué ves** — al crearlo, el tipo `Requisito de Seguridad` aparece ya en la lista de tipos
disponibles, y el artefacto trae el atributo **Criticidad de seguridad**.

**Acción** — abre el artefacto, pon su **Criticidad de seguridad** en `Clase C` y guarda.
Después, enlázalo con un riesgo: en el panel derecho, **Enlaces → Añadir enlace**, elige
**Mitiga** y selecciona un artefacto de la carpeta `04 Hazard and Risk Analysis`.

**Qué ves** — el enlace se crea y, desde el riesgo, se lee **Mitigado por**.

> [!TIP]
> **Prueba a romperlo, que es lo que más enseña.** Intenta crear un enlace **Mitiga** desde tu
> requisito hacia un término del `Project Glossary`. La restricción del paso 5 debe impedirlo:
> ese tipo no aparecerá como destino válido. Ahí ves para qué sirve la tabla que estaba vacía.

---

## ✅ Resultado

- Has creado una **enumeración** con una escala ordenada y con sentido de dominio.
- Has creado un **atributo** con su cardinalidad, su valor inicial y su efecto sobre los enlaces sospechosos.
- Has creado un **tipo de artefacto** con su formato y sus atributos, y sabes argumentar por qué es un tipo y no un atributo más.
- Has creado un **tipo de enlace** con sus dos nombres, y sabes el precio de no usar el estándar.
- Has creado una **restricción de enlace** y entiendes que restringir uno restringe todos.
- Has usado el modelo con un requisito real enlazado a un riesgo.

## Comprueba

- [ ] `Criticidad IEC 62304` sale en **Tipos de datos** con base *Enumerado* y tres valores en orden.
- [ ] `Criticidad de seguridad` sale en **Atributos** con ese tipo de datos.
- [ ] `Requisito de Seguridad` sale en **Tipos de artefactos** con formato de texto.
- [ ] `Mitiga` / `Mitigado por` sale en **Tipos de enlace** con los dos nombres.
- [ ] **Restricciones de enlace** tiene una fila.
- [ ] Existe un requisito de tu tipo, en `Clase C`, enlazado a un riesgo.

## Errores frecuentes

> [!WARNING]
> - **El botón + está apagado y todos los campos se ven grises** → es el error número uno de este
>   módulo: **no eres miembro del proyecto con el rol Administrador**. Vuelve al
>   [paso 4 de M201-01](M201-01-proyecto-y-modelo-base.md), añádete como miembro, asígnate el rol
>   y **guarda** el área. Ser administrador del área no basta: hace falta el rol.
> - **No encuentro el botón de crear** → es el **+** pequeño de la cabecera del panel de la
>   lista (izquierda), no un botón de la barra superior. Pasa el ratón por la esquina derecha de
>   la cabecera para ver su etiqueta.
> - **No veo mi tipo de datos al crear el atributo** → o no llegaste a pulsar **Guardar** en el
>   paso 1, o estás en otra corriente de configuración distinta de la que usaste.
> - **Guardar está apagado** → falta un campo obligatorio (los marcados con **\***). Los avisos
>   *El valor es necesario* aparecen junto al campo que falta.
> - **Creé el atributo pero no aparece en mis requisitos** → un atributo no se ve hasta que se
>   **asocia a un tipo de artefacto** (paso 3). Existir y estar en uso son cosas distintas.
> - **Mi tipo de artefacto no aparece al crear un artefacto** → comprueba su **formato
>   predeterminado**: si lo dejaste en *Module*, solo podrás usarlo para crear módulos.
> - **Después de la restricción no puedo enlazar nada con Mitiga** → es el efecto del paso 5:
>   añade las combinaciones que sí necesites.

## 🏆 Reto

El responsable de calidad te pide añadir un atributo `Normativa aplicable` para saber a qué
normas responde cada requisito, y te avisa de que un requisito puede responder a varias
(IEC 62304, ISO 14971, FDA 21 CFR 820). Un compañero propone un atributo de **texto libre**
donde se escriban separadas por comas.

Diseña la alternativa correcta y explica qué se rompe con la propuesta del texto libre.

<details>
<summary>Ver solución</summary>

<br>

**Diseño correcto**, en dos piezas:

1. Un **tipo de datos** enumerado, `Normativa`, con un valor por norma: `IEC 62304`,
   `ISO 14971`, `FDA 21 CFR 820`.
2. Un **atributo** `Normativa aplicable` que use ese tipo y tenga marcada la casilla
   **Se permiten varios valores** (cardinalidad múltiple).

Qué se rompe con el texto libre separado por comas:

- **No se puede filtrar de forma fiable.** Un filtro por `ISO 14971` sobre texto libre depende
  de que todo el mundo lo haya escrito igual: `ISO14971`, `ISO 14971:2019` e `Iso 14971` son
  valores distintos para la máquina.
- **No se puede contar.** Un informe de cobertura por normativa necesita agrupar, y no se puede
  agrupar por un campo que contiene tres valores dentro de una cadena.
- **No hay control de altas.** Cualquiera puede inventarse una norma que no existe, con una
  errata, y nadie lo detectará.
- **No sobrevive al intercambio.** En un ReqIF o en una consulta OSLC del M209, la enumeración
  viaja como valores identificables; la cadena `"IEC 62304, ISO 14971"` viaja como un texto que
  el receptor tendrá que parsear adivinando el separador.

La trampa del ejercicio está en la cardinalidad: la respuesta *"una enumeración"* es incompleta
si no se marca **varios valores**, porque entonces habría que elegir una sola norma y el
requisito perdería información.

</details>
