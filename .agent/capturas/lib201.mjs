// Arnés de capturas para el curso 201.
// Usa Chrome real fuera de Cursor: el navegador integrado recorta a ~730px y no sirve para material.
// Cada captura se registra en manifest-201.json para poder generar el contenido autoguiado.
import { chromium } from 'playwright-core';
import fs from 'fs';
import path from 'path';

export const BASE = 'https://localhost:9443';
const OUT = new URL('./out-201/', import.meta.url).pathname;
const MANIFEST = new URL('./manifest-201.json', import.meta.url).pathname;

fs.mkdirSync(OUT, { recursive: true });

export async function abrirNavegador() {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: true,
    args: ['--ignore-certificate-errors', '--no-sandbox', '--disable-dev-shm-usage'],
  });
  const page = await browser.newContext({
    ignoreHTTPSErrors: true,
    viewport: { width: 1440, height: 900 },
  }).then((c) => c.newPage());
  return { browser, page };
}

// El servidor está en español, así que el botón es "Iniciar sesión".
// Enviamos con Enter, que es independiente del idioma, y esperamos a salir
// de la página de autenticación antes de continuar.
export async function entrar(page, { app = 'rm', usuario = 'formador', clave = 'formador' } = {}) {
  await page.goto(`${BASE}/${app}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  const usuarioSel = 'input[name="j_username"]';
  const claveSel = 'input[name="j_password"]';

  // El formulario lo pinta Dojo después del domcontentloaded: hay que esperarlo,
  // no basta con comprobar si ya está en el DOM.
  const hayFormulario = await page.waitForSelector(usuarioSel, { timeout: 30000 })
    .then(() => true)
    .catch(() => false);

  if (hayFormulario) {
    await page.fill(usuarioSel, usuario);
    await page.fill(claveSel, clave);
    await page.press(claveSel, 'Enter');

    for (let i = 0; i < 30; i += 1) {
      await page.waitForTimeout(2000);
      if (!/authrequired|authfailed/.test(page.url())) break;
    }
  }

  if (/authfailed/.test(page.url())) {
    throw new Error(`Credenciales rechazadas para "${usuario}" en /${app}`);
  }
  await page.waitForTimeout(6000);
  return page;
}

// Abre un proyecto y su editor de propiedades (el metamodelo). Es el punto de
// partida de casi todos los laboratorios del 201.
export async function abrirMetamodelo(page, proyecto = 'Validacion 201') {
  await page.goto(`${BASE}/rm/web#action=com.ibm.rdm.web.pages.showAllProjectsPage`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });
  await page.waitForTimeout(13000);
  await page.locator(`a:has-text("${proyecto}")`).first().click({ timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(15000);

  await page.evaluate(() => {
    const g = [...document.querySelectorAll('a,span,div,button')].find(
      (e) => e.offsetParent !== null && /administra/i.test(e.getAttribute('title') || e.getAttribute('aria-label') || ''),
    );
    if (g) g.click();
  });
  await page.waitForTimeout(4000);
  await page.locator('a:has-text("Gestionar propiedades de proyecto"), [role="menuitem"]:has-text("Gestionar propiedades de proyecto")')
    .first().click({ timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(17000);
  return page;
}

// Cambia de sección dentro del editor del metamodelo.
export async function seccionMetamodelo(page, seccion) {
  const ok = await page.evaluate((s) => {
    const e = [...document.querySelectorAll('a,li,span,div')].find(
      (x) => x.offsetParent !== null && x.innerText.trim() === s,
    );
    if (!e) return false;
    e.click();
    return true;
  }, seccion);
  await page.waitForTimeout(8000);
  return ok;
}

function leerManifiesto() {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
  } catch {
    return [];
  }
}

// Devuelve una función de captura que numera automáticamente los pasos del laboratorio
// y va acumulando las entradas del catálogo.
// `desde` reserva una franja de numeración a cada script para que dos scripts del mismo
// módulo no colisionen: el de usuarios arranca en 10, el de licencias en 20, etc.
export function catalogador(page, { modulo, lab, titulo, desde = 1 }) {
  let orden = desde - 1;
  return async function captura(slug, descripcion, { espera = 1500, recorte = null } = {}) {
    orden += 1;
    await page.waitForTimeout(espera);
    const nombre = `${modulo}-${String(orden).padStart(2, '0')}-${slug}.png`;
    await page.screenshot({ path: path.join(OUT, nombre), clip: recorte || undefined });

    const entradas = leerManifiesto().filter((e) => e.archivo !== nombre);
    entradas.push({
      archivo: nombre,
      modulo,
      lab,
      titulo,
      orden,
      slug,
      descripcion,
      url: page.url(),
      capturada: new Date().toISOString(),
    });
    entradas.sort((a, b) => (a.modulo + String(a.orden).padStart(3, '0')).localeCompare(b.modulo + String(b.orden).padStart(3, '0')));
    fs.writeFileSync(MANIFEST, JSON.stringify(entradas, null, 2));
    console.log(`  captura ${nombre} :: ${descripcion}`);
    return nombre;
  };
}
