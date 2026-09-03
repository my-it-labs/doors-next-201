// Abre la pestaña "Gestión de configuraciones" del área de proyecto y comprueba
// si DOORS Next ofrece componentes, streams, baselines y change sets sin GCM instalado.
import { abrirNavegador, entrar, catalogador, BASE } from './lib201.mjs';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '206',
  lab: 'Gestión de configuraciones: componentes, streams, baselines y change sets',
  titulo: 'Gestión avanzada de configuraciones',
  desde: 40,
});

const limpio = (s) => (s || '').replace(/[\t\n]+/g, ' ').trim();

await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });

// Abrir el área de proyecto desde el listado
await page.goto(`${BASE}/rm/admin#action=jazz.viewPage&id=com.ibm.team.process.ProjectAreaManagement`, {
  waitUntil: 'domcontentloaded',
  timeout: 60000,
});
await page.waitForTimeout(9000);
await page.locator('a:has-text("Validacion 201")').first().click({ timeout: 20000 })
  .catch((e) => console.log('error abriendo area:', e.message.split('\n')[0]));
await page.waitForTimeout(10000);

// Pestaña de gestión de configuraciones
await page.locator('a:has-text("Gestión de configuraciones"), span:has-text("Gestión de configuraciones")').first()
  .click({ timeout: 20000 })
  .catch((e) => console.log('error abriendo pestaña CM:', e.message.split('\n')[0]));
await page.waitForTimeout(9000);
await captura('cm-pestana', 'Pestaña de gestión de configuraciones del área de proyecto');

console.log('=== TEXTO DE LA PESTAÑA CM ===');
console.log(limpio(await page.locator('body').innerText()).slice(0, 1800));

const controles = await page.evaluate(() =>
  [...document.querySelectorAll('input,select,button,a')]
    .filter((e) => e.offsetParent !== null)
    .map((e) => {
      const etiqueta = (e.innerText || e.value || e.name || '').trim().slice(0, 60);
      const ctx = (e.closest('tr,div,label') || e.parentElement);
      return `${e.tagName}[${e.type || ''}] "${etiqueta}" checked=${e.checked === undefined ? '-' : e.checked} :: ${((ctx ? ctx.innerText : '') || '').replace(/[\t\n]+/g, ' ').trim().slice(0, 90)}`;
    })
    .filter((s) => /configuraci|component|habilit|enable|stream|baseline|conjunto/i.test(s)),
);
console.log('\n=== CONTROLES RELACIONADOS CON CM ===');
console.log(controles.join('\n') || '(ninguno)');

await browser.close();
