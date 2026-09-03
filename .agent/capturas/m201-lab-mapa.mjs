// Recorre las secciones del editor del metamodelo, captura cada una y anota qué
// acciones ofrece. Sirve para redactar el paso a paso del laboratorio 201 con precisión.
import { abrirNavegador, entrar, catalogador, BASE } from './lib201.mjs';

const SECCIONES = [
  'Tipos de artefactos',
  'Atributos de artefacto',
  'Tipos de datos de atributo',
  'Tipos de enlace',
  'Restricciones de enlace',
  'Validez de enlace',
];

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '201',
  lab: 'Personalización del modelo de requisitos de un proyecto de ingeniería',
  titulo: 'Personalización del modelo de requisitos',
  desde: 70,
});

const limpio = (s) => (s || '').replace(/[\t\n]+/g, ' ').trim();

await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });
await page.goto(`${BASE}/rm/web#action=com.ibm.rdm.web.pages.showAllProjectsPage`, {
  waitUntil: 'domcontentloaded',
  timeout: 60000,
});
await page.waitForTimeout(13000);
await page.locator('a:has-text("Validacion 201")').first().click({ timeout: 20000 }).catch(() => {});
await page.waitForTimeout(15000);

// Abrir el editor de propiedades del proyecto
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
console.log('URL DEL EDITOR:', page.url());

for (const seccion of SECCIONES) {
  const abierto = await page.evaluate((seccion) => {
    const e = [...document.querySelectorAll('a,li,span,div')].find(
      (x) => x.offsetParent !== null && x.innerText.trim() === seccion,
    );
    if (!e) return false;
    e.click();
    return true;
  }, seccion);
  if (!abierto) {
    console.log(`\n### ${seccion} => NO LOCALIZADA`);
    continue;
  }
  await page.waitForTimeout(9000);

  const slug = seccion.toLowerCase().replace(/[^a-z]+/g, '-').replace(/^-|-$/g, '');
  await captura(`meta-${slug}`, `Sección "${seccion}" del editor del metamodelo`);

  const info = await page.evaluate(() => {
    const botones = [...document.querySelectorAll('button,a')]
      .filter((b) => b.offsetParent !== null && b.innerText.trim().length > 1 && b.innerText.trim().length < 40)
      .map((b) => b.innerText.trim())
      .filter((t) => /crear|nuevo|nueva|añadir|agregar|editar|suprimir|eliminar|duplicar|importar/i.test(t));
    const filas = [...document.querySelectorAll('td,li')]
      .filter((c) => c.offsetParent !== null)
      .map((c) => c.innerText.trim())
      .filter((t) => t.length > 1 && t.length < 45);
    return { botones: [...new Set(botones)], elementos: [...new Set(filas)].slice(0, 22) };
  });
  console.log(`\n### ${seccion}`);
  console.log('  acciones:', JSON.stringify(info.botones));
  console.log('  contenido:', JSON.stringify(info.elementos));
}

await browser.close();
