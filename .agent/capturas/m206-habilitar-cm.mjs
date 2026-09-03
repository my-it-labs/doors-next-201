// Habilita la gestión de configuraciones en el área de proyecto (operación irreversible)
// y comprueba que aparecen componentes, corrientes (streams) y conjuntos de cambios.
import { abrirNavegador, entrar, catalogador, BASE } from './lib201.mjs';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '206',
  lab: 'Gestión de configuraciones: componentes, streams, baselines y change sets',
  titulo: 'Gestión avanzada de configuraciones',
  desde: 50,
});

const limpio = (s) => (s || '').replace(/[\t\n]+/g, ' ').trim();

await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });

await page.goto(`${BASE}/rm/admin#action=jazz.viewPage&id=com.ibm.team.process.ProjectAreaManagement`, {
  waitUntil: 'domcontentloaded',
  timeout: 60000,
});
await page.waitForTimeout(9000);
await page.locator('a:has-text("Validacion 201")').first().click({ timeout: 20000 }).catch(() => {});
await page.waitForTimeout(10000);
await page.locator('a:has-text("Gestión de configuraciones")').first().click({ timeout: 20000 }).catch(() => {});
await page.waitForTimeout(8000);
await captura('cm-antes-habilitar', 'Aviso de que habilitar la gestión de configuraciones es irreversible');

await page.locator('button:has-text("Habilitar gestión de configuraciones")').first()
  .click({ timeout: 20000 })
  .catch((e) => console.log('error al habilitar:', e.message.split('\n')[0]));
await page.waitForTimeout(6000);

// Puede pedir confirmación
const dlg = await page.evaluate(() => {
  const d = [...document.querySelectorAll('div[role=dialog],.dijitDialog')].find((x) => x.offsetParent !== null);
  return d ? { texto: d.innerText.replace(/[\t\n]+/g, ' ').slice(0, 300), botones: [...d.querySelectorAll('button')].map((b) => b.innerText.trim()) } : null;
});
console.log('DIALOGO:', JSON.stringify(dlg));
if (dlg) {
  await captura('cm-confirmacion', 'Diálogo de confirmación al habilitar la gestión de configuraciones');
  for (const etiqueta of ['Habilitar', 'Aceptar', 'Sí', 'OK', 'Continuar']) {
    const b = page.locator(`div[role=dialog] button:has-text("${etiqueta}"), .dijitDialog button:has-text("${etiqueta}")`).first();
    if (await b.count()) {
      await b.click().catch(() => {});
      console.log('confirmado con', etiqueta);
      break;
    }
  }
}

// Habilitar CM reinicializa el área: puede tardar
for (let i = 0; i < 40; i += 1) {
  await page.waitForTimeout(3000);
  const t = await page.locator('body').innerText().catch(() => '');
  if (/habilitada|habilitado|componente/i.test(t)) break;
}
await page.waitForTimeout(8000);
await captura('cm-habilitada', 'Gestión de configuraciones ya habilitada en el área de proyecto');
console.log('=== TRAS HABILITAR ===');
console.log(limpio(await page.locator('body').innerText()).slice(0, 1200));

await browser.close();
