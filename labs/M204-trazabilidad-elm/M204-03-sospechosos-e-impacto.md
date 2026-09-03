# M204-03 · Enlaces sospechosos, impacto y la pata EWM

[← Página anterior](M204-02-enlazar-con-etm.md) · [Siguiente módulo →](../M205-reutilizacion/README.md)

> [!NOTE]
> **Objetivo** — provocar un **enlace sospechoso**, decidir si sigue siendo válido, recorrer
> el impacto, y dejar documentado cómo se enlazaría **EWM** cuando exista.
>
> ⏱️ ~15 min · 🗂️ Metamodelo (validez) + tus artefactos enlazados · 🎯 Resultado: un suspect revisado y un hueco de implementación consciente.

---

## En qué consiste

En M201-02 viste la pestaña **Validez de enlace** vacía y la casilla **Afecta a la validez de
enlace** en el atributo. Ahora las usas. Después simulas la tarea de desarrollo que este
entorno no puede hospedar.

## Antes de empezar necesitas

- Cadena de [M204-01](M204-01-cadena-en-doors.md) y, si puedes, el enlace a ETM de M204-02.
- Permiso de administrador de proyecto (rol *Administrador*) para tocar validez.

---

## Conceptos clave

| Concepto | Qué es |
|---|---|
| **Validez de enlace** | Configuración: qué tipos de enlace se marcan sospechosos al cambiar un extremo |
| **Suspect link** | El aviso de que la relación **puede** haber dejado de ser cierta |
| **Análisis de impacto** | Seguir enlaces desde el artefacto cambiado hacia todo lo afectado |
| **EWM** | Engineering Workflow Management: work items (tareas, defectos). **No instalado** |

---

## Paso a paso

### Paso 1 · Activa la validez en el modelo

**Acción** — **Gestionar propiedades de proyecto → Validez de enlace**. Añade una fila para el
tipo **Mitiga** (y, si el diálogo lo permite, **Validated By**).

![Pestaña de validez de enlace del metamodelo](../img/metamodelo-validez-enlace.png)

**Acción** — confirma que en **Atributos de artefacto**, `Criticidad de seguridad` tiene marcada
**Afecta a la validez de enlace** (M201-03). El **texto** del requisito suele afectar siempre.

**Qué ves** — la tabla deja de estar vacía. Sin esto, puedes cambiar el requisito y nadie
recibirá aviso en los enlaces.

---

### Paso 2 · Provoca el sospechoso

**Acción** — abre tu `Requisito de Seguridad` y cambia la **Criticidad** de C a B (o el texto
de la oclusión). Guarda.

**Acción** — abre el enlace **Mitiga** hacia el riesgo (y el *Validated By* si existe).

**Qué ves** — el enlace marcado como **sospechoso** / validez incierta. El riesgo y el caso de
prueba no se han editado: el sistema no sabe si *siguen* cubriendo el requisito nuevo.

> [!IMPORTANT]
> **Sospechoso no significa inválido.** Significa "hay que mirarlo". Aprobar en bloque todos
> los sospechosos es tan malo como ignorarlos (el reto de M201-02).

---

### Paso 3 · Resuelve

**Acción** — si el riesgo sigue siendo el adecuado para clase B, **marca el enlace como
válido**. Si ya no aplica, **rompe** el enlace y busca otro riesgo, o baja la criticidad con
criterio.

**Qué ves** — el aviso desaparece. El historial del artefacto registra el cambio de atributo;
la validez registra la decisión sobre la relación.

---

### Paso 4 · Impacto en cadena

**Acción** — desde el requisito modificado, lista: riesgos, pruebas, stakeholder/sistema de
M204-01. Anota qué habría que reabrir en el flujo de M202 (*Volver a abrir* un aprobado).

**Qué ves** — el impacto no es una pantalla mágica única en este entorno sin JRS: es **seguir
columnas de enlace** (M203-02) más los sospechosos. Eso basta para una reunión de cambio.

---

### Paso 5 · Simular EWM (sin la aplicación)

Este entorno **no** incluye `/ccm`. En un ELM completo, el tipo **Implemented By** apuntaría a
un work item *Story* o *Task*.

**Acción** — no inventes un tipo de artefacto "Tarea" dentro de RM como si fuera EWM: contaminas
el modelo. En su lugar, en el requisito añade un comentario de trabajo:

`Implementacion (simulada EWM): TASK-1045 - driver de sensor de oclusion. Cuando exista EWM, sustituir este comentario por enlace Implemented By.`

**Acción** — opcional: crea un atributo de texto `ID work item` **solo si el formador lo
autoriza como muletilla temporal**. El laboratorio correcto el día que haya EWM es **borrar**
ese atributo y crear el enlace OSLC.

> [!NOTE]
> **Qué perderías de verdad sin EWM** — estado de la tarea, asignado, sprint y el suspect
> cuando el desarrollador cierra la tarea sin haber tocado el requisito. El comentario no
> sustituye eso; solo deja constancia de que el hueco es conocido.

---

## ✅ Resultado

- Validez de enlace configurada para *Mitiga* (y prueba, si aplica).
- Has generado y cerrado un sospechoso con criterio.
- Sabes qué se simula de EWM y qué no se debe fingir en el metamodelo.

## Comprueba

- [ ] Un cambio de criticidad o de texto marca el enlace.
- [ ] Tras validar o romper, el aviso no queda eterno.
- [ ] No has creado un tipo `Work Item` falso en RM.

## Errores frecuentes

> [!WARNING]
> - **No se marca sospechoso** → el atributo no afecta a validez, o el tipo de enlace no está
>   en la tabla de validez, o el enlace se creó antes y hay que volver a guardar el artefacto.
> - **Todo sale sospechoso siempre** → marcaste *Afecta a la validez* en atributos de sistema
>   (*Modified On*). Quítalo.
> - **Creé "Tarea EWM" como tipo de requisito** → deshazlo. Mezcla dos mundos y rompe ReqIF.

## 📝 Autoevaluación

**1.** Cambias un *Heading* y se marcan sospechosos los enlaces de los requisitos del módulo.
¿Está bien configurada la validez?

**2.** El cliente insiste en "trazabilidad hasta el código". Sin EWM ni GCM, ¿qué puedes
prometer honestamente en este curso?

<details>
<summary>Ver respuestas</summary>

<br>

**1.** No. Un encabezado no debería invalidar pruebas. La validez se configura **por tipo de
enlace y por atributo que cambia el significado**. Los encabezados cambian a menudo por
redacción documental.

**2.** Puedes prometer cadena **requisito → riesgo → caso de prueba** real, y el *diseño* del
enlace a work item. No puedes prometer configuración global de producto (requisitos+pruebas+
código en una sola versión) ni suspect desde el commit. Prometerlo sería mentir sobre la imagen.

</details>
