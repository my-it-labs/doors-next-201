# M204 · Trazabilidad avanzada en IBM ELM

[← Módulo anterior](../M203-consultas-vistas/M203-03-colecciones.md) · [Siguiente página →](M204-01-cadena-en-doors.md)

> [!NOTE]
> **De qué va este módulo** — la trazabilidad dentro de DOORS Next ya la practicaste. Aquí se
> sale del silo: requisitos ↔ riesgos ↔ pruebas (ETM), enlaces sospechosos y análisis de
> impacto. La pata de **EWM** (tareas de desarrollo) no está en la imagen; se simula para
> no perder el objetivo de aprendizaje.
>
> ⏱️ ~1 h · 🎯 Resultado: una cadena de trazabilidad que se puede recorrer y auditar.

---

## Por qué importa

Un requisito sin prueba es una intención. Una prueba sin requisito es un ritual. El auditor
no pregunta si "hay trazabilidad": pide **seguir un requisito de clase C hasta el resultado
de su ensayo**. Este módulo construye esa cadena y enseña qué pasa cuando uno de los extremos
cambia.

## Qué hay en este entorno

| Aplicación | ¿Está? | Qué puedes hacer de verdad |
|---|---|---|
| **DOORS Next (RM)** | Sí | Enlaces entre requisitos, riesgos, glosario |
| **ETM / QM** | Sí | Planes, casos de prueba y enlaces OSLC *Validated By* |
| **EWM / CCM** | **No** | Se simula con un artefacto de tipo enlace *Implemented By* y un identificador de tarea |
| **GCM** | **No** | No hay configuración global que una RM+QM+CCM; cada aplicación se configura por separado |

> [!IMPORTANT]
> **OSLC no necesita que las dos herramientas sean IBM**, pero sí que ambas hablen el
> estándar. ETM en este laboratorio **sí** está registrado en JTS: los enlaces entre `/rm` y
> `/qm` son reales. Los de EWM se documentan como si el destino existiera, para que sepas
> leerlos el día que el destino esté.

## Estrategia de trazabilidad

No se enlaza "todo con todo". Se elige **qué pregunta** debe poder contestarse:

| Pregunta | Relación típica | Tipo OSLC habitual |
|---|---|---|
| ¿De dónde sale este requisito de sistema? | Stakeholder → Sistema | *Satisfies* / *Elaborates* |
| ¿Qué daño cubre este requisito? | Requisito → Riesgo | *Mitiga* (el tuyo) o *Affected By* |
| ¿Cómo se demuestra? | Requisito → Caso de prueba | *Validated By* |
| ¿Quién lo implementa? | Requisito → Tarea EWM | *Implemented By* |

## Laboratorios

| Lab | Título | Qué harás | Tiempo |
|---|---|---|---|
| [M204-01](M204-01-cadena-en-doors.md) | Cadena dentro de RM | Stakeholder → sistema → seguridad → riesgo | ~20 min |
| [M204-02](M204-02-enlazar-con-etm.md) | Validación en ETM | Crear un caso de prueba y enlazarlo al requisito | ~25 min |
| [M204-03](M204-03-sospechosos-e-impacto.md) | Sospechosos e impacto | Provocar un suspect link y seguir el impacto; simular EWM | ~15 min |

→ Empieza por **[M204-01 — Cadena dentro de RM](M204-01-cadena-en-doors.md)**.
