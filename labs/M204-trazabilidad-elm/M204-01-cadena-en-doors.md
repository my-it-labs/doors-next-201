# M204-01 · Cadena dentro de DOORS Next

[← Página anterior](README.md) · [Siguiente página →](M204-02-enlazar-con-etm.md)

> [!NOTE]
> **Objetivo** — construir una cadena **completa y tipada** desde una necesidad de stakeholder
> hasta un riesgo, usando los tipos de la plantilla y el `Mitiga` de M201.
>
> ⏱️ ~20 min · 🗂️ Módulos de la plantilla Medical Devices · 🎯 Resultado: tres enlaces recorridos en ambos sentidos.

---

## En qué consiste

La plantilla ya trae documentos: *Vision*, *Stakeholder requirements*, *System Requirements*,
*Risks*. Vas a unir **un** hilo narrativo, no a enlazar el proyecto entero:

```
Necesidad de stakeholder  --Satisfies-->  Requisito de sistema
Requisito de sistema      --Elaborates--> Requisito de Seguridad (el tuyo)
Requisito de Seguridad    --Mitiga------> Riesgo
```

## Antes de empezar necesitas

- Proyecto con **Medical Devices** y el modelo de [M201-03](../M201-modelo-requisitos/M201-03-extender-el-modelo.md).
- La restricción `Requisito de Seguridad --Mitiga--> Risk` activa.

---

## Conceptos clave

| Concepto | Qué es |
|---|---|
| **Enlace tipado** | Relación con significado; sin tipo es solo "esto toca aquello" |
| **Dirección** | Se crea en un sentido y se lee en los dos (*Mitiga* / *Mitigado por*) |
| **Navegación transversal** | Saltar de un artefacto a otro sin pasar por la carpeta |
| **Restricción** | Si intentas *Mitiga* hacia un glosario, el destino no debe ofrecerse |

---

## Paso a paso

### Paso 1 · Elige los tres artefactos de ejemplo

**Acción** — en **Artefactos**, abre `01 Requirements` y localiza:

- un **Stakeholder Requirement** (módulo *Stakeholder requirements*),
- un **System Requirement** (módulo *System Requirements*),
- tu **Requisito de Seguridad** de M201-03,
- un **Risk** en `04 Hazard and Risk Analysis`.

Anota los **ID**. Trabajarás solo con esos cuatro.

> [!TIP]
> Si los módulos de ejemplo están densos, usa el buscador del proyecto con una palabra del
> texto. El objetivo no es conocer el producto médico de la plantilla: es la cadena.

---

### Paso 2 · Enlaza stakeholder → sistema

**Acción** — abre el requisito de sistema. Panel derecho → **Enlaces** → añade enlace de tipo
**Satisfies** (o *Satisfied By*, según el extremo desde el que crees) hacia el stakeholder.

![Tipos de enlace disponibles, varios con URI OSLC](../img/metamodelo-tipos-enlace.png)

**Qué ves** — en el sistema: *Satisfies* hacia el stakeholder. En el stakeholder: la lectura
inversa. Las URI `http://open-services.net/ns/rm#satisfies` son las que más adelante
entenderá ETM.

---

### Paso 3 · Enlaza sistema → seguridad

**Acción** — desde tu `Requisito de Seguridad`, crea **Elaborates** (o *Elaborated By*) hacia
el requisito de sistema.

**Qué ves** — la cadena ya tiene tres eslabones. Un cambio en el stakeholder **debería** hacer
dudar del sistema y de la seguridad: eso lo activarás en M204-03 con validez de enlace.

---

### Paso 4 · Cierra con el riesgo

**Acción** — desde el `Requisito de Seguridad`, **Mitiga** → el riesgo elegido. Si la
restricción está bien, un término del glosario **no** aparece como destino válido.

![Restricciones de enlace: origen, tipo y destino](../img/metamodelo-restricciones-enlace.png)

**Qué ves** — el riesgo muestra **Mitigado por**. La cadena es recorrible de punta a punta.

---

### Paso 5 · Recorre el impacto a mano

**Acción** — abre el stakeholder y sigue **Dónde se utiliza** / enlaces salientes hasta el
riesgo. Anota la secuencia de IDs.

**Qué ves** — eso **es** el análisis de impacto artesanal. En M203-02 ya lo viste en columna;
aquí demuestras que la semántica de los tipos es la que hace la cadena explicable a un auditor
(*satisface*, *elabora*, *mitiga*), no un grafo de flechas anónimas.

---

## ✅ Resultado

- Una cadena de cuatro artefactos con tres tipos de enlace distintos.
- Sabes leer cada relación en los dos sentidos.
- Has comprobado que la restricción de *Mitiga* recorta destinos absurdos.

## Comprueba

- [ ] Desde el riesgo se llega al stakeholder en tres saltos.
- [ ] Cada enlace tiene tipo; ninguno es "relacionado con" genérico.
- [ ] Un glosario no se puede elegir como destino de *Mitiga*.

## Errores frecuentes

> [!WARNING]
> - **No aparece Mitiga** → no guardaste el tipo de enlace o estás en otro componente/corriente.
> - **El destino válido no sale** → la restricción del M201-03 es más estricta de lo que
>   recuerdas: solo `Risk` como destino. El tipo de la plantilla puede llamarse `Risk` exactamente.
> - **Creé el enlace al revés** → no lo borres a la ligera: ábrelo y mira los nombres saliente /
>   entrante. A veces está bien y solo lo estás leyendo desde el extremo contrario.

## 📝 Autoevaluación

**1.** ¿Por qué *Satisfies* entre stakeholder y sistema es mejor que un enlace sin tipo o que
otro *Mitiga*?

**2.** Si el auditor pide "cobertura de riesgos de clase C", ¿qué le enseñas: la cadena de un
ejemplo o la vista de M203-02?

<details>
<summary>Ver respuestas</summary>

<br>

**1.** *Satisfies* es un tipo **OSLC** con URI estándar: significa que el sistema cubre una
necesidad de negocio, y viaja a otras herramientas. *Mitiga* es tu tipo de dominio para daño
y control. Mezclarlos hace informes mentirosos (un stakeholder no "mitiga" un riesgo: lo
origina o lo exige).

**2.** Las dos, en este orden: la **vista** demuestra que el criterio se aplica a todo el
conjunto; la **cadena** demuestra que sabes explicar un caso. Un auditor desconfía de una
matriz sin ejemplo, y de un ejemplo sin matriz.

</details>
