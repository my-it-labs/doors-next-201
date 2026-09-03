// Con la plantilla ya aplicada, valida el editor del metamodelo (tipos de artefacto,
// atributos, tipos de enlace) y la vista de artefactos, base de los módulos 201 y 203.
import { abrirNavegador, entrar, catalogador, BASE } from './lib201.mjs';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '201',
  lab: 'Personalización del modelo de requisitos de un proyecto de ingeniería',
  titulo: 'Personalización del modelo de requisitos',
  desde: 60,
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

// Vista de artefactos: carpetas, módulos y vistas (módulo 203)
await page.locator('a:has-text("Artefactos"), span:has-text("Artefactos")').first().click({ timeout: 20000 }).catch(() => {});
await page.waitForTimeout(15000);
await captura('artefactos-vista', 'Vista de artefactos del proyecto con las carpetas de la plantilla aplicada');
console.log('=== ARTEFACTOS ===');
console.log(limpio(await page.locator('body').innerText()).slice(0, 900));

// Editor del metamodelo
await page.evaluate(() => {
  const g = [...document.querySelectorAll('a,span,div,button')].find(
    (e) => e.offsetParent !== null && /administra/i.test(e.getAttribute('title') || e.getAttribute('aria-label') || ''),
  );
  if (g) g.click();
});
await page.waitForTimeout(4000);
await page.locator('a:has-text("Gestionar propiedades de proyecto"), [role="menuitem"]:has-text("Gestionar propiedades de proyecto")')
  .first().click({ timeout: 20000 }).catch((e) => console.log('error:', e.message.split('\n')[0]));
await page.waitForTimeout(17000);
await captura('metamodelo-editor', 'Editor del metamodelo con los tipos de artefacto de la plantilla');

console.log('\n=== EDITOR DE PROPIEDADES ===');
console.log(limpio(await page.locator('body').innerText()).slice(0, 1400));

const apartados = await page.evaluate(() =>
  [...document.querySelectorAll('a,li,span,h2,h3,td')]
    .filter((e) => e.offsetParent !== null)
    .map((e) => e.innerText.trim().replace(/\s+/g, ' '))
    .filter((t) => t.length > 3 && t.length < 45 && /tipo|atributo|enlace|enumera|artefacto|plantilla|termin|estilo|vista/i.test(t)),
);
console.log('\n=== APARTADOS DEL METAMODELO ===');
console.log(JSON.stringify([...new Set(apartados)].slice(0, 25), null, 1));

await browser.close();
