// Abre "Gestionar propiedades de proyecto" y cataloga las secciones del metamodelo:
// tipos de artefacto, atributos, enumeraciones y tipos de enlace (módulo 201).
import { abrirNavegador, entrar, catalogador, BASE } from './lib201.mjs';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '201',
  lab: 'Personalización del modelo de requisitos de un proyecto de ingeniería',
  titulo: 'Personalización del modelo de requisitos',
  desde: 30,
});

const limpio = (s) => (s || '').replace(/[\t\n]+/g, ' ').trim();

await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });
await page.goto(`${BASE}/rm/web#action=com.ibm.rdm.web.pages.showAllProjectsPage`, {
  waitUntil: 'domcontentloaded',
  timeout: 60000,
});
await page.waitForTimeout(13000);
await page.locator('a:has-text("Validacion 201")').first().click({ timeout: 20000 }).catch(() => {});
await page.waitForTimeout(16000);

// Administración -> Gestionar propiedades de proyecto
await page.evaluate(() => {
  const g = [...document.querySelectorAll('a,span,div,button')].find(
    (e) => e.offsetParent !== null && /administra/i.test(e.getAttribute('title') || e.getAttribute('aria-label') || ''),
  );
  if (g) g.click();
});
await page.waitForTimeout(4000);
await page.locator('a:has-text("Gestionar propiedades de proyecto"), [role="menuitem"]:has-text("Gestionar propiedades de proyecto")')
  .first()
  .click({ timeout: 20000 })
  .catch((e) => console.log('error abriendo propiedades:', e.message.split('\n')[0]));
await page.waitForTimeout(16000);
console.log('URL:', page.url());
await captura('propiedades-proyecto', 'Editor de propiedades del proyecto: tipos de artefacto, atributos y tipos de enlace');

console.log('=== CONTENIDO ===');
console.log(limpio(await page.locator('body').innerText()).slice(0, 1600));

// Secciones navegables del editor
const secciones = await page.evaluate(() =>
  [...document.querySelectorAll('a,li,span,h2,h3')]
    .filter((e) => e.offsetParent !== null && e.innerText.trim().length > 2 && e.innerText.trim().length < 50)
    .map((e) => e.innerText.trim().replace(/\s+/g, ' '))
    .filter((t) => /tipo|atributo|enlace|enumera|plantilla|artefacto|vista|term|estilo/i.test(t)),
);
console.log('\n=== SECCIONES DEL METAMODELO ===');
console.log(JSON.stringify([...new Set(secciones)].slice(0, 30), null, 1));

await browser.close();
