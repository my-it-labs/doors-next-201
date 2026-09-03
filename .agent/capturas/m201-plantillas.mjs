// El proyecto nace sin tipos de artefacto. Este script inventaría las plantillas de
// proyecto disponibles en la imagen, que son el punto de partida de todos los módulos.
import { abrirNavegador, entrar, catalogador, BASE } from './lib201.mjs';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '201',
  lab: 'Personalización del modelo de requisitos de un proyecto de ingeniería',
  titulo: 'Personalización del modelo de requisitos',
  desde: 40,
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
await captura('proyecto-sin-tipos', 'Aviso de que el proyecto no tiene tipos de artefacto y las tres vías para añadirlos');

// Vía 1: aplicar una plantilla de proyecto
await page.locator('a:has-text("Aplicar una plantilla de proyecto")').first()
  .click({ timeout: 20000 })
  .catch((e) => console.log('error abriendo plantillas:', e.message.split('\n')[0]));
await page.waitForTimeout(12000);
await captura('plantillas-dialogo', 'Diálogo de aplicación de plantilla de proyecto con las plantillas disponibles');

console.log('=== DIALOGO DE PLANTILLAS ===');
const dlg = await page.evaluate(() => {
  const d = [...document.querySelectorAll('div[role=dialog],.dijitDialog')].find((x) => x.offsetParent !== null);
  if (!d) return null;
  return {
    texto: d.innerText.replace(/[\t\n]+/g, ' ').slice(0, 900),
    opciones: [...d.querySelectorAll('option,li,tr,label')]
      .map((o) => o.innerText.trim().replace(/\s+/g, ' '))
      .filter((t) => t && t.length < 90),
    botones: [...d.querySelectorAll('button')].map((b) => b.innerText.trim() + (b.disabled ? '[off]' : '')),
  };
});
console.log(JSON.stringify(dlg, null, 1));

if (!dlg) {
  console.log('SIN DIALOGO. Texto de la pagina:');
  console.log(limpio(await page.locator('body').innerText()).slice(0, 900));
}

await browser.close();
