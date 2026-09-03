# IBM DOORS Next 201

Gestión avanzada de requisitos, trazabilidad ELM y gobernanza del ciclo de vida.

**Duración:** 10 horas · **Enfoque:** laboratorios guiados paso a paso.

Formación dirigida a quienes ya utilizan IBM DOORS Next y quieren profundizar en modelado,
configuración, trazabilidad y colaboración dentro de IBM Engineering Lifecycle Management.
El tiempo de clase se dedica sobre todo a que practiques: cada módulo lleva una introducción
breve, una demostración guiada y un laboratorio detallado con capturas de cada paso.

## Temario

| Módulo | Contenidos | Estado del laboratorio |
|--------|------------|------------------------|
| **M201** · Personalización del modelo de requisitos | Metamodelo, tipos de artefacto, tipos de enlace, atributos, enumeraciones, restricciones | Pendiente de validar |
| **M202** · Gobernanza y flujos de trabajo | Ciclo de vida, estados, transiciones, roles, permisos, políticas de edición, auditoría | **Validado** |
| **M203** · Consultas, vistas y colecciones | Consultas complejas, filtros, vistas compartidas, columnas de trazabilidad, cobertura | Pendiente de validar |
| **M204** · Trazabilidad avanzada en ELM | Estrategias, integración con ETM, suspect links, análisis de impacto | **ETM operativo**; la parte de EWM se simula |
| **M205** · Reutilización de requisitos | Componentes, Global Artifact Library, referencias frente a copias, variaciones | Requiere la clave de configuraciones |
| **M206** · Gestión avanzada de configuraciones | Streams, baselines, change sets, comparación de configuraciones | Baselines sí; streams y change sets requieren la clave |
| **M207** · Revisiones formales y colaboración | Revisiones, comentarios, resolución de observaciones, cierre | Pendiente de validar |
| **M208** · Informes y cuadros de mando | Vistas de trazabilidad, dashboards nativos, indicadores de cobertura y calidad | Rediseñado sin Jazz Reporting Service |
| **M209** · Interoperabilidad y automatización | ReqIF, API OSLC, consultas REST, operaciones masivas | Pendiente de validar |

## Al terminar podrás

- Diseñar modelos avanzados de requisitos adaptados a tu dominio de ingeniería.
- Personalizar artefactos, atributos y relaciones de trazabilidad.
- Configurar procesos de gobernanza, flujos de trabajo y políticas de acceso.
- Administrar líneas de evolución con streams, baselines y change sets.
- Construir trazabilidad extremo a extremo entre requisitos y validación.
- Gestionar revisiones formales de especificaciones.
- Elaborar cuadros de mando con indicadores de cobertura y madurez.
- Intercambiar información mediante ReqIF y automatizar tareas con la API OSLC.

## Entorno de prácticas

Los laboratorios se ejecutan sobre una imagen Docker preparada que incluye:

| Aplicación | Contexto | Disponible |
|---|---|---|
| Jazz Team Server | `/jts` | Sí |
| DOORS Next (RM) | `/rm` | Sí |
| Engineering Test Management (ETM) | `/qm` | Sí |
| Engineering Workflow Management (EWM) | `/ccm` | No incluida en la imagen |
| Global Configuration Management (GCM) | `/gc` | No incluida en la imagen |
| Jazz Reporting Service (JRS) | `/rs` | No incluida en la imagen |

Los ejercicios que dependen de EWM, GCM o JRS se abordan mediante escenarios simulados y
análisis de casos, manteniendo los mismos objetivos de aprendizaje. El resto se realiza
íntegramente sobre el entorno real.

Monta el entorno siguiendo [infra/README.md](infra/README.md).

## Cómo funciona el curso

Sigue este README como índice y avanza módulo a módulo. Cada módulo tiene su propio índice
con los laboratorios en orden y las capturas de cada paso.

## Requisitos previos

Se recomienda haber cursado el nivel 101 o dominar: navegación por DOORS Next, creación y
edición de requisitos, organización de módulos y componentes, gestión básica de atributos,
tipos de artefactos, enlaces de trazabilidad, vistas y consultas sencillas, baselines y
exportación de información.
