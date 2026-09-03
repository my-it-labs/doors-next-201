# M205 · Reutilización de requisitos

[← Módulo anterior](../M204-trazabilidad-elm/M204-03-sospechosos-e-impacto.md) · [Siguiente página →](M205-01-componentes-y-referencias.md)

> [!NOTE]
> **De qué va este módulo** — dejar de copiar requisitos de un proyecto a otro y diseñar
> **reutilización** con componentes, referencias y un proyecto canónico de biblioteca.
>
> ⏱️ ~45 min · 🎯 Resultado: un patrón de reutilización aplicable aunque la clave de CM no esté aún.

---

## Por qué importa

Copiar requisitos "para ir rápido" crea **gemelos que divergen**. A la tercera variante de
producto nadie sabe cuál es la cláusula de seguridad vigente. La reutilización bien hecha
distingue **compartir** de **clonar**.

## Qué permite este entorno

| Capacidad | Sin clave de CM | Con clave de CM (M206) |
|---|---|---|
| Segundo **área de proyecto** como biblioteca | Sí | Sí |
| **Importar propiedades de proyecto** (el modelo) | Sí | Sí |
| **Compartir proceso** entre áreas | Sí | Sí |
| Varios **componentes** y basar uno en otro | Limitado al componente inicial | Completo |
| **GAL** / streams de biblioteca | No fiable | El escenario real |

> [!IMPORTANT]
> **Si el botón de habilitad gestión de configuraciones sigue apagado**, no fuerces componentes
> extra: harás el laboratorio de biblioteca **por proyecto** (M205-01 y M205-02), que ya cubre
> el 80 % de las decisiones de diseño. M205-03 queda como ampliación cuando tengas la clave.

## Referencia frente a copia

| | Referencia | Copia |
|---|---|---|
| **Qué es** | El mismo artefacto (o un proxy versionado) usado en otro contexto | Un artefacto nuevo con el texto inicial igual |
| **Si corrigen un error** | Lo ven todos los consumidores | Solo el proyecto donde se corrigió |
| **Si un producto necesita una variante** | Hay que ramificar (CM) o no reutilizar ese ítem | Cada uno evoluciona solo |
| **ReqIF / proveedores** | Casi siempre copia o snapshot | Es el caso de uso |

## Laboratorios

| Lab | Título | Qué harás | Tiempo |
|---|---|---|---|
| [M205-01](M205-01-componentes-y-referencias.md) | Biblioteca por proyecto | Crear un área "Biblioteca de seguridad" e importar el modelo | ~20 min |
| [M205-02](M205-02-copiar-frente-a-compartir.md) | Copia frente a compartir | Copiar un requisito y contrastar con reutilizar el modelo/proceso | ~15 min |
| [M205-03](M205-03-componentes-con-cm.md) | Componentes (con CM) | Solo si la clave está activa: componente de biblioteca en stream | ~10 min |

→ Empieza por **[M205-01](M205-01-componentes-y-referencias.md)**.
