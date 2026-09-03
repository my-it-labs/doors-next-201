// Localiza los controles de creación (iconos sin texto) en las secciones del metamodelo
// que el laboratorio 201 necesita: tipos de datos, atributos y tipos de artefacto.
import { abrirNavegador, entrar, BASE } from './lib201.mjs';

const { browser, page } = await abrirNavegador();

await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });
await page.goto(`${BASE}/rm/web#action=com.ibm.rdm.web.pages.showAllProjectsPage`, {
  waitUntil: 'domcontentloaded',
  timeout: 60000,
});
await page.waitForTimeout(13000);
await page.locator('a:has-text("Validacion 201")').first().click({ timeout: 20000 }).catch(() => {});
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

for (const seccion of ['Tipos de datos de atributo', 'Atributos de artefacto', 'Tipos de artefactos', 'Tipos de enlace']) {
  await page.evaluate((s) => {
    const e = [...document.querySelectorAll('a,li,span,div')].find(
      (x) => x.offsetParent !== null && x.innerText.trim() === s,
    );
    if (e) e.click();
  }, seccion);
  await page.waitForTimeout(8000);

  const controles = await page.evaluate(() => {
    const etiqueta = (e) =>
      (e.getAttribute('title') || e.getAttribute('aria-label') || e.getAttribute('alt') || '').trim();
    return [...document.querySelectorAll('button,a,span,div,img,input[type=button]')]
      .filter((e) => e.offsetParent !== null && etiqueta(e).length > 1 && etiqueta(e).length < 60)
      .map((e) => `${e.tagName}.${(e.className || '').toString().slice(0, 30)} :: "${etiqueta(e)}"`)
      .filter((s) => /crear|nuev|añadir|agregar|add|new|create|\+/i.test(s));
  });
  console.log(`\n### ${seccion}`);
  console.log([...new Set(controles)].join('\n') || '  (sin controles de creación detectados)');
}

await browser.close();
