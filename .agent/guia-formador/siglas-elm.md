# Chuleta de siglas · IBM ELM / Jazz

Referencia rápida para moverse por el ecosistema de IBM. En 2019 (versión 7.0) IBM renombró
toda la familia: lo que antes era **Rational** pasó a llamarse **Engineering**. Por eso
conviven nombres viejos y nuevos, y en los identificadores internos siguen apareciendo los
antiguos.

## Lo primero: las dos palabras grandes

| Sigla | Significa | Qué es |
|-------|-----------|--------|
| **ELM** | Engineering Lifecycle Management | La **suite** completa de IBM para el ciclo de vida de ingeniería. No es un programa: es el paraguas que agrupa varias aplicaciones |
| **Jazz** | (nombre propio, no es sigla) | La **plataforma técnica** común sobre la que están construidas todas esas aplicaciones: usuarios, permisos, enlaces, autenticación |
| **CLM** | Collaborative Lifecycle Management | El **nombre anterior** de ELM (antes de la 7.0). Si lo ves en documentación o rutas de ficheros, es lo mismo |

La suite se instala como un único servidor con varias aplicaciones desplegadas dentro. Cada
aplicación vive en una ruta web propia, el *context root*: `/jts`, `/rm`, `/qm`...

## Las aplicaciones

| Sigla | Ruta | Nombre actual | Antes se llamaba | Para qué sirve |
|-------|------|---------------|------------------|----------------|
| **JTS** | `/jts` | Jazz Team Server | (igual) | El **corazón**. No gestiona requisitos ni pruebas: gestiona usuarios, licencias, permisos globales y el registro de las demás aplicaciones. Sin él no arranca nada |
| **RM** / **DNG** | `/rm` | Engineering Requirements Management **DOORS Next** | Rational DOORS Next Generation (RDNG) | **Requisitos**. Es la aplicación del curso |
| **QM** / **ETM** | `/qm` | Engineering **Test** Management | Rational Quality Manager (**RQM**) | **Pruebas**: planes de prueba, casos, ejecuciones, resultados |
| **CCM** / **EWM** | `/ccm` | Engineering **Workflow** Management | Rational Team Concert (**RTC**) | **Desarrollo**: tareas, incidencias, planificación, control de versiones de código |
| **GC** / **GCM** | `/gc` | **Global Configuration** Management | (nuevo) | Coordina configuraciones **entre aplicaciones**: permite decir "la versión 2.0 del producto = estos requisitos + estas pruebas + este código" |
| **AM** / **RMM** | `/am` | Rhapsody **Model Manager** | Rational Rhapsody | **Modelos** de arquitectura y diseño de sistemas |

**Regla mental:** RM dice *qué hay que hacer*, EWM *quién lo hace y cuándo*, ETM *si funciona*,
AM *cómo está diseñado*, y GCM *a qué versión del producto corresponde todo eso*.

### Qué hay en nuestro laboratorio

Instalados: **JTS**, **RM** y **QM**. No están EWM, GCM ni los módulos de informes.

## Informes y datos

| Sigla | Significa | Qué es |
|-------|-----------|--------|
| **JRS** | Jazz Reporting Service | El paquete de informes de ELM. Engloba las tres piezas siguientes |
| **Report Builder** | (`/rs`) | El constructor visual de informes: eliges qué datos y cómo mostrarlos, sin escribir consultas |
| **LQE** | Lifecycle Query Engine | El **índice** que recorre todas las aplicaciones y permite consultas que cruzan requisitos, pruebas y tareas a la vez |
| **DCC** | Data Collection Component | El recolector que vuelca los datos al almacén para informes históricos y de tendencias |
| **TRS** | Tracked Resource Set | El mecanismo por el que cada aplicación **publica** sus cambios para que LQE los indexe. Verás `TRS` en logs y en licencias internas |
| **ENI** | Engineering Insights | Visualización avanzada de relaciones entre artefactos. Antes: Rational Engineering Lifecycle Manager (**RELM**) |
| **RPE** | Rational Publishing Engine | Generación de documentos formales a partir de plantillas. Hoy: Engineering Publishing / Document Builder |

## Estándares e intercambio

| Sigla | Significa | Qué es |
|-------|-----------|--------|
| **OSLC** | Open Services for Lifecycle Collaboration | El **estándar abierto** que permite que un requisito de DOORS enlace con un caso de prueba de ETM aunque sean aplicaciones distintas. Es la base técnica de toda la trazabilidad entre herramientas, y su API REST es lo que se automatiza en el módulo 209 |
| **ReqIF** | Requirements Interchange Format | Formato estándar para **intercambiar requisitos** entre herramientas distintas (por ejemplo, mandar requisitos a un proveedor que usa otra herramienta y recibirlos de vuelta con cambios) |
| **RDF** / **SPARQL** | Resource Description Framework / lenguaje de consulta | La tecnología con la que se almacenan e interrogan los datos enlazados por debajo de OSLC y LQE |

## Licencias

| Sigla | Significa | Qué es |
|-------|-----------|--------|
| **CAL** | Client Access License | La licencia **por usuario**. Cada persona necesita una asignada para poder trabajar |
| **Analyst** | — | El CAL que permite **crear y editar requisitos** en DOORS Next. Es el que necesita el alumno |
| **Contributor** | — | CAL limitado: leer y comentar, sin autoría plena |
| **Stakeholder** | — | CAL de solo consulta, para perfiles de negocio |
| **Practitioner** | — | CAL de ELM Base que da acceso **a varias aplicaciones** a la vez |
| **Trial** | — | Variante de evaluación de cualquiera de los anteriores: **60 días** desde que se activa |
| **Floating / Token** | — | Licencias compartidas en un pool, en vez de asignadas a una persona fija. No las usamos |

En los identificadores internos aparecen nombres fósiles: el CAL de autoría de DOORS Next es
`com.ibm.team.rrc.author`, herencia de **RRC** (Rational Requirements Composer), el producto
del que nació DOORS Next.

## Gestión de configuraciones

Estos no son siglas, pero son el vocabulario del módulo 206 y conviene tenerlo claro:

| Término | Qué es |
|---------|--------|
| **Componente** | Una unidad reutilizable de requisitos, con vida propia. Un proyecto puede tener varios |
| **Stream** | Una **línea de evolución viva** de un componente: donde se trabaja el día a día. Equivale a una rama |
| **Baseline** | Una **foto inmutable** de un componente en un instante. No se puede modificar; sirve para congelar hitos y auditar |
| **Change Set** | Un **conjunto de cambios agrupados** que se revisan y se entregan juntos al stream |
| **Configuración global** | La combinación de configuraciones de varias aplicaciones (requisitos + pruebas + código) que define una versión del producto. Requiere GCM |
| **GAL** | Global Artifact Library: biblioteca de artefactos compartidos entre proyectos |
| **Suspect Link** | Enlace marcado automáticamente como **sospechoso** porque uno de sus extremos cambió y hay que revisar si el otro sigue siendo válido |

## Piezas técnicas del laboratorio

| Sigla | Qué es |
|-------|--------|
| **Derby** | La base de datos embebida que trae ELM para pruebas y demos. Limitada a 10 usuarios. En producción se usaría DB2 u Oracle |
| **Liberty** | El servidor de aplicaciones (WebSphere Liberty) donde se despliegan `jts.war`, `rm.war` y `qm.war` |
| **IM** | IBM Installation Manager: el instalador con el que se despliega la suite |
| **LPA** | Lifecycle Project Administration: el componente que crea "proyectos de ciclo de vida" enlazando áreas de proyecto de varias aplicaciones |
| **SCR** | La URL de descubrimiento de servicios de cada aplicación (`/rm/scr`), que JTS usa para registrarla |
| **Área de proyecto** | El contenedor de trabajo dentro de cada aplicación: su plantilla de proceso, sus roles, sus permisos y sus artefactos |

## Prefijos de los códigos de error

Muy útil para saber **quién** se está quejando cuando algo falla:

| Prefijo | Origen | Ejemplo |
|---------|--------|---------|
| **CRJAZ** | Núcleo de Jazz / JTS | `CRJAZ1972E`: un servicio no arrancó porque otro del que depende falló |
| **CRRRS** | DOORS Next (RM) | `CRRRS6254E`: error devuelto por RM al hablar con JTS |
| **CRRQM** / **CRRQMxxx** | Engineering Test Management | errores del lado de pruebas |
| **CWWK** | WebSphere Liberty (el servidor) | `CWWKZ0001I`: aplicación arrancada correctamente |
| **CRJZS** | Aprovisionamiento de Jazz | problemas cargando plugins |

La letra final indica gravedad: **I** informativo, **W** aviso, **E** error.

## Glosario exprés de la jerga del día a día

| Término | Qué es |
|---------|--------|
| **Artefacto** | La unidad de información en DOORS Next: un requisito, un encabezado, una imagen, un diagrama |
| **Módulo** | Un documento estructurado que ordena artefactos en jerarquía, como un capítulo con apartados |
| **Colección** | Un conjunto de artefactos agrupados por un criterio, sin la estructura de documento del módulo |
| **Tipo de artefacto** | La clase de un artefacto (Requisito de negocio, Requisito funcional...), que determina qué atributos tiene |
| **Atributo** | Un campo de datos del artefacto: estado, prioridad, responsable, criticidad |
| **Tipo de enlace** | La semántica de una relación entre artefactos: *satisface*, *deriva de*, *valida*, *implementa* |
| **Vista** | Una configuración guardada de columnas, filtros y orden sobre un conjunto de artefactos |
| **Plantilla de proceso** | El molde que define roles, permisos y flujos de trabajo al crear un área de proyecto |
