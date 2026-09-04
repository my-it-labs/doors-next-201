# M201-00 · Fork, Codespace y arranque

[← Página anterior](README.md) · [Siguiente página →](M201-01-proyecto-y-modelo-base.md)

> [!NOTE]
> **Objetivo** — dejar **tu** copia del curso en GitHub, levantar el laboratorio en un
> Codespace y entrar a DOORS Next por `localhost`. Es el mismo esquema que el 101, sobre
> este repositorio.
>
> ⏱️ ~15 min (más la descarga de la imagen la primera vez) · 🎯 Resultado: `https://localhost:9443/rm` con sesión iniciada.

---

## En qué consiste

Cada alumno trabaja contra **su** contenedor, no contra un servidor compartido. Para eso:

1. Haces **fork** de `my-it-labs/doors-next-201`.
2. Creas un **Codespace** sobre *tu* fork.
3. Arrancas DOORS con `bash infra/up.sh`.
4. Reenvías el puerto **9443** a tu equipo (VS Code de escritorio o **GitHub CLI `gh`**).

Si ya tienes Docker en el portátil y prefieres no usar la nube, ve directo a la
[opción local de infra/README.md](../../infra/README.md#opción-a--docker-local).

## Antes de empezar necesitas

- Una cuenta de GitHub.
- Los secretos de Codespaces **`DOCKERHUB_USER`** y **`DOCKERHUB_TOKEN`** (los entrega el
  formador). Sin ellos `up.sh` no puede bajar la imagen, que es privada.
- ~8 GB de RAM en el Codespace (máquina por defecto; si va justo, 4 núcleos / 16 GB).

> [!IMPORTANT]
> DOORS tiene grabada la URI `https://localhost:9443`. El login **solo** funciona abriendo
> esa URL en **tu** navegador, con el puerto reenviado. La dirección `*.app.github.dev` del
> Codespace **no sirve**.

---

## Paso a paso

### Paso 1 · Haz fork del repositorio

**Acción (navegador)** — abre
[https://github.com/my-it-labs/doors-next-201](https://github.com/my-it-labs/doors-next-201)
y pulsa **Fork**. Deja tu usuario como destino y confirma.

**Acción (GitHub CLI, si ya tienes `gh` en tu equipo)** — equivalente al botón Fork:

```bash
gh repo fork my-it-labs/doors-next-201 --default-branch-only
```

**Qué ves** — un repositorio `https://github.com/<TU-USUARIO>/doors-next-201` bajo tu cuenta.
A partir de aquí **no** trabajas sobre `my-it-labs`: si el formador actualiza el curso,
sincronizas el fork (botón *Sync fork* o `gh repo sync`).

---

### Paso 2 · Crea el Codespace

**Acción (navegador)** — en **tu** fork: **Code → Codespaces → Create codespace on main**.
Acepta la máquina por defecto. La primera vez tarda unos minutos (instala Docker-in-Docker).

**Acción (GitHub CLI)** — desde tu equipo, sin abrir github.com:

```bash
gh codespace create --repo <TU-USUARIO>/doors-next-201 --branch main
```

Lista los Codespaces y anota el nombre (lo usarás al reenviar puertos):

```bash
gh codespace list
```

**Qué ves** — un VS Code en el navegador (o la confirmación de `gh`) con el árbol del
repositorio y una terminal. El fichero `.devcontainer/devcontainer.json` es el que pide
Docker y `gh` dentro de esa máquina.

> [!TIP]
> Si aparece *«no machine types are available»*, sincroniza el fork con `main` del curso y
> vuelve a crear el Codespace.

---

### Paso 3 · Arranca DOORS Next

**Acción** — en la **terminal del Codespace** (no en la de tu portátil):

```bash
bash infra/up.sh
```

El script inicia sesión en Docker Hub con los secretos, baja la imagen y levanta el compose.
Espera a que RM esté arriba:

```bash
docker compose -f infra/docker-compose.yml logs -f doors
```

Sal con `Ctrl+C` cuando veas `Application rm started` (o *La aplicación rm se ha iniciado*).

**Qué ves** — dos contenedores: DOORS y Mailpit. El primer `pull` son varios GB; los siguientes
arranques son más cortos (~3–4 min).

> [!WARNING]
> Si `up.sh` dice que faltan `DOCKERHUB_USER` / `DOCKERHUB_TOKEN`, configúralos en
> **tu usuario de GitHub → Settings → Codespaces → Secrets** (o en la organización, con
> acceso a este fork) y **recrea** el Codespace: los secretos solo se inyectan al crearlo.

---

### Paso 4 · Reenvía el puerto a tu `localhost`

Elige **una** vía. El detalle por sistema operativo está en
[infra/README.md](../../infra/README.md#reenvío-de-puerto-opción-b--según-tu-sistema).

**Vía 1 — VS Code de escritorio (la más fiable)** — en el Codespace del navegador:
**≡ → Open in VS Code Desktop**. Instala la extensión *GitHub Codespaces* si la pide.
La pestaña **Ports** deja el **9443** (y el 8025) en tu máquina. No hace falta `gh`.

**Vía 2 — GitHub CLI (`gh`)** — en una terminal **de tu equipo** (el túnel sale hacia
fuera; si lo lanzas *dentro* del Codespace no te sirve el navegador local):

```bash
# Una vez por máquina: autoriza el permiso de Codespaces
gh auth login -s codespace
# o, si ya estabas logueado:
gh auth refresh -h github.com -s codespace

gh codespace ports forward 9443:9443 8025:8025
```

Si tienes varios Codespaces, añade `-c <nombre>` (el de `gh codespace list`).
**Deja esa terminal abierta.** `Ctrl+C` corta el túnel.

Otros comandos útiles de `gh` en este curso:

| Comando | Para qué |
|---|---|
| `gh repo fork my-it-labs/doors-next-201` | Crear tu copia del curso |
| `gh repo sync` | Traer actualizaciones del original a tu fork |
| `gh codespace create --repo <tú>/doors-next-201` | Levantar el laboratorio |
| `gh codespace list` | Ver nombre y estado |
| `gh codespace ports forward 9443:9443 8025:8025` | Túnel a `localhost` |
| `gh codespace ports -c <nombre>` | Ver qué puertos ya están reenviados |
| `gh codespace stop -c <nombre>` | Pausar (deja de gastar cuota) |

> [!NOTE]
> **Por qué `gh` y no la URL del Codespace** — el túnel hace que `localhost:9443` de tu
> portátil sea el 9443 del contenedor. Sin eso, el navegador habla con otra máquina y Jazz
> rechaza el login.

---

### Paso 5 · Entra en DOORS Next

**Acción** — en el navegador de **tu equipo**, abre `https://localhost:9443/rm`. Acepta el
certificado autofirmado (o instálalo: [certificado-autofirmado.md](../../infra/certificado-autofirmado.md)).
Usuario inicial: `alumno` / `alumno` (o `formador` / `formador` si la imagen lo trae).

**Qué ves** — la página **Todos los proyectos**. Mailpit, con el 8025 reenviado:
`http://localhost:8025`.

| Qué | URL |
|---|---|
| DOORS Next | https://localhost:9443/rm |
| ETM (pruebas) | https://localhost:9443/qm |
| Administración JTS | https://localhost:9443/jts/admin |
| Mailpit | http://localhost:8025 |

---

## ✅ Resultado

- El curso vive en **tu** fork.
- El Codespace está arriba y DOORS responde en `localhost`.
- Sabes parar el túnel (`Ctrl+C`) y el Codespace (`gh codespace stop` o la UI de GitHub).

## Comprueba

- [ ] El repositorio en GitHub es `\<tu-usuario>/doors-next-201`, no el de `my-it-labs`.
- [ ] `up.sh` terminó sin error de secretos.
- [ ] El log muestra que RM arrancó.
- [ ] `https://localhost:9443/rm` muestra el login (no un `*.app.github.dev`).
- [ ] Entras con `alumno` / `alumno`.

## Errores frecuentes

> [!WARNING]
> - **Login que no avanza / vuelve al formulario** → estás en `*.app.github.dev`. Cierra esa
>   pestaña y usa `localhost` con el puerto reenviado.
> - **`HTTP 403 ... needs the "codespace" scope`** → `gh auth refresh -h github.com -s codespace`.
> - **`create tunnel port failed ... 400`** → fallo conocido de `gh`. Actualiza el CLI, reenvía
>   solo `9443:9443`, o pasa a VS Code de escritorio.
> - **`unable to find git executable`** → instala Git y reabre la terminal.
> - **`503` / `CRJAZ1972E`** → entraste antes de `Application rm started`. Espera o recrea el
>   stack (`bash infra/down.sh` y otra vez `up.sh`). Detalle en
>   [infra/README.md](../../infra/README.md#comprobaciones-y-problemas).
> - **Creé el Codespace sobre `my-it-labs/doors-next-201`** → no tienes permiso de escritura y
>   los secretos pueden no aplicarse. Borra ese Codespace y créalo sobre **tu fork**.

## 📝 Autoevaluación

**1.** Un compañero abre el Codespace en Chrome y usa la URL que GitHub pinta en **Ports**
(`…-9443.app.github.dev`). ¿Por qué no entra?

**2.** ¿En qué máquina hay que ejecutar `gh codespace ports forward`: en el Codespace o en el
portátil?

<details>
<summary>Ver respuestas</summary>

<br>

**1.** Jazz redirige el login a `https://localhost:9443`. En el dominio del proxy esa
redirección apunta al portátil del alumno, no al contenedor. El túnel (o VS Code Desktop)
hace que `localhost` *sea* el contenedor.

**2.** En el **portátil**. El comando abre un túnel desde tu `localhost` hacia el Codespace.
Lanzarlo dentro del Codespace reenvía el puerto a la propia máquina remota, y tu navegador
sigue sin ver el 9443.

</details>
