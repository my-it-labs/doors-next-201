# IBM DOORS Next 201

Gestión avanzada de requisitos, trazabilidad ELM y gobernanza del ciclo de vida.

**Duración:** 10 horas · **Enfoque:** laboratorios guiados paso a paso.

Formación dirigida a quienes ya utilizan IBM DOORS Next y quieren profundizar en modelado,
configuración, trazabilidad y colaboración dentro de IBM Engineering Lifecycle Management.

## Temario

| Módulo | Laboratorios | Notas de entorno |
|--------|--------------|------------------|
| [**M201** · Modelo de requisitos](labs/M201-modelo-requisitos/README.md) | Entorno (fork/Codespace/`gh`), proyecto, metamodelo, extensión IEC 62304 | Validado en laboratorio |
| [**M202** · Gobernanza](labs/M202-gobernanza/README.md) | Usuarios/CAL, roles y permisos, flujo de aprobación | Validado en laboratorio |
| [**M203** · Consultas y vistas](labs/M203-consultas-vistas/README.md) | Vistas por perfil, cobertura, colecciones | Pendiente de validar en UI |
| [**M204** · Trazabilidad ELM](labs/M204-trazabilidad-elm/README.md) | Cadena RM, enlace a ETM, suspect links | ETM sí; EWM simulado |
| [**M205** · Reutilización](labs/M205-reutilizacion/README.md) | Biblioteca de modelo, copia vs compartir, componentes | Componentes completos requieren clave CM |
| [**M206** · Configuraciones](labs/M206-configuraciones/README.md) | Baselines, firma, streams/change sets | Streams requieren clave CM; sin GCM |
| [**M207** · Revisiones](labs/M207-revisiones/README.md) | Crear revisión, observaciones y cierre | Pendiente de validar en UI |
| [**M208** · Informes](labs/M208-informes/README.md) | Panel nativo, indicadores por vistas | Sin JRS/Report Builder |
| [**M209** · Interoperabilidad](labs/M209-interoperabilidad/README.md) | ReqIF, API OSLC | Pendiente de validar en UI |

## Al terminar podrás

- Diseñar modelos avanzados de requisitos adaptados a tu dominio de ingeniería.
- Personalizar artefactos, atributos y relaciones de trazabilidad.
- Configurar procesos de gobernanza, flujos de trabajo y políticas de acceso.
- Administrar hitos con líneas base (y streams/change sets si la CM está activa).
- Construir trazabilidad entre requisitos, riesgos y pruebas en ETM.
- Gestionar revisiones formales de especificaciones.
- Elaborar indicadores de cobertura con vistas y exportaciones.
- Intercambiar información mediante ReqIF y consultar el repositorio con OSLC.

## Entorno de prácticas

| Aplicación | Contexto | Disponible |
|---|---|---|
| Jazz Team Server | `/jts` | Sí |
| DOORS Next (RM) | `/rm` | Sí |
| Engineering Test Management (ETM) | `/qm` | Sí |
| Engineering Workflow Management (EWM) | `/ccm` | No incluida |
| Global Configuration Management (GCM) | `/gc` | No incluida |
| Jazz Reporting Service (JRS) | `/rs` | No incluida |

Monta el entorno en el primer laboratorio:
**[M201-00 · Fork, Codespace y arranque](labs/M201-modelo-requisitos/M201-00-entorno.md)**.
Referencia de puertos, `gh` y problemas: [infra/README.md](infra/README.md).

## Requisitos previos

Se recomienda haber cursado el nivel 101 o dominar: navegación por DOORS Next, creación y
edición de requisitos, módulos, atributos, tipos, enlaces, vistas sencillas, baselines y
exportación.
