# M202 · Gobernanza y flujos de trabajo

[← Módulo anterior](../M201-modelo-requisitos/M201-03-extender-el-modelo.md) · [Siguiente página →](M202-01-usuarios-y-licencias.md)

> [!NOTE]
> **De qué va este módulo** — en el 201 decidiste **qué información** existe. Aquí decides
> **quién puede hacer qué con ella, y en qué momento**. Es la diferencia entre una herramienta
> donde cualquiera cambia cualquier cosa y una donde un requisito aprobado está protegido.
>
> ⏱️ ~1 h 15 min · 🎯 Resultado: un circuito de aprobación funcionando, con dos perfiles de usuario que no pueden hacer lo mismo.

---

## Por qué importa

En el laboratorio anterior te topaste con la gobernanza sin haberla estudiado: el editor del
modelo se abría en **solo lectura** hasta que te diste un rol. Eso no era un fallo, era el
mecanismo funcionando. Este módulo explica ese mecanismo entero.

En un proyecto con exigencias de cumplimiento normativo, la pregunta *"¿quién aprobó este
requisito y cuándo?"* tiene que tener una respuesta que no dependa de la memoria de nadie. Y la
pregunta *"¿puede un becario modificar un requisito ya aprobado?"* tiene que tener respuesta
**no**, garantizada por la herramienta y no por un procedimiento escrito que nadie lee.

## Las cuatro capas del control de acceso

Es el concepto que más se confunde, así que conviene tenerlo claro desde el principio. Para que
alguien pueda hacer algo en DOORS Next tienen que cumplirse **cuatro** condiciones
independientes, y basta que falle una para que no pueda:

| Capa | Qué controla | Dónde se administra |
|---|---|---|
| **1. Cuenta de usuario** | Que exista y pueda autenticarse | Administración de JTS → *Usuarios* |
| **2. Licencia (CAL)** | Qué producto puede usar y con qué alcance | Administración de JTS → *Gestión de licencias* |
| **3. Pertenencia y rol** | En qué proyectos participa y con qué papel | Área de proyecto → *Miembros* |
| **4. Permiso de operación** | Qué acciones concretas puede ejecutar su rol | Área de proyecto → *Permisos* |

> [!IMPORTANT]
> **Los diagnósticos se parecen y las causas no.** Un usuario sin licencia recibe un error de
> licencia al entrar (`CRRRW7281E`). Un usuario con licencia pero sin rol **entra sin problema**
> y se encuentra la interfaz en modo lectura, sin ningún mensaje que lo explique. Ese segundo
> caso es el que hace perder tardes enteras, y es el que sufriste en M201.

## Ciclo de vida de un requisito

Un requisito no es un texto: es un texto **en un estado**. El estado dice qué se puede hacer con
él y qué significa para el resto del proyecto.

| Pieza | Qué es | Ejemplo |
|---|---|---|
| **Estado** | La situación en la que está el requisito | *Nuevo*, *Bajo revisión*, *Aprobados* |
| **Acción** | La operación que provoca el cambio | *Enviar para revisión*, *Aprobar* |
| **Transición** | Qué acción lleva de qué estado a qué estado | *Bajo revisión* —Aprobar→ *Aprobados* |
| **Grupo de estado** | La categoría que el sistema entiende | borrador, bajo revisión, revisado, aprobado, publicado, cerrado |

> [!NOTE]
> **Por qué existen los grupos de estado** — puedes llamar a tus estados como quieras
> (*Pendiente de visado*, *Validado por cliente*), pero al crearlos tienes que decir a qué
> **grupo** pertenecen. Es lo que permite que DOORS Next sepa que *"Validado por cliente"*
> significa *aprobado* y actúe en consecuencia en informes y consultas, sin tener que entender
> tu vocabulario.

## Auditoría

La gobernanza no consiste solo en impedir cosas, sino en **poder demostrar** lo que pasó. En este
módulo verás tres registros distintos, que la gente tiende a confundir:

| Registro | Qué guarda | Dónde |
|---|---|---|
| **Historial del artefacto** | Cada versión del requisito, con quién y cuándo | Panel del artefacto → *Historial* |
| **Historial del área de proyecto** | Cambios en la configuración del proceso | Área de proyecto → *Historial* |
| **Firma electrónica** | Firma explícita de una línea base, con motivo | Área de proyecto → *Firma electrónica* |

## Laboratorios

| Lab | Título | Qué harás | Tiempo |
|---|---|---|---|
| [M202-01](M202-01-usuarios-y-licencias.md) | Usuarios y licencias | Crear las cuentas del equipo y darles licencia | ~20 min |
| [M202-02](M202-02-roles-y-permisos.md) | Roles y permisos | Repartir roles y ajustar qué puede hacer cada uno | ~25 min |
| [M202-03](M202-03-flujo-de-aprobacion.md) | Flujo de aprobación | Poner en marcha el circuito de estados y probarlo con dos perfiles | ~30 min |

→ Empieza por **[M202-01 — Usuarios y licencias](M202-01-usuarios-y-licencias.md)**.

## Buenas prácticas de gobernanza

> [!TIP]
> - **Roles por función, no por persona.** *Autor*, *Revisor*, *Aprobador*. Las personas cambian
>   de proyecto; las funciones, no.
> - **Empieza restringiendo y abre luego.** Es mucho más fácil conceder un permiso que te piden
>   que retirar uno que la gente ya usa.
> - **Separa quien escribe de quien aprueba.** Si el autor puede aprobar su propio requisito, el
>   circuito de aprobación es decorativo.
> - **Protege lo aprobado.** El valor de un estado *Aprobado* es que nadie pueda editarlo sin
>   dejar rastro y sin volver a pasar por revisión.
> - **Documenta el mapa rol–permiso.** Dentro de seis meses nadie recordará por qué el rol
>   *Comentarista* podía crear carpetas.
