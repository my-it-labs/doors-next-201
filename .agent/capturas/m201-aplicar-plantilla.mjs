// Aplica la plantilla "Medical Devices" al proyecto de validación. Encaja con el 201
// porque está diseñada para desarrollo regulado (FDA Design Control) y aporta tipos de
// artefacto, atributos y estructura sobre los que validar el resto de módulos.
import { abrirNavegador, entrar, catalogador, BASE } from './lib201.mjs';

const PLANTILLA = 'Medical Devices Template';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '201',
  lab: 'Personalización del modelo de requisitos de un proyecto de ingeniería',
  titulo: 'Personalización del modelo de requisitos',
  desde: 50,
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

await page.locator('a:has-text("Aplicar una plantilla de proyecto")').first().click({ timeout: 20000 }).catch(() => {});
await page.waitForTimeout(11000);

// Marcar la casilla de usar plantilla y elegir la de dispositivos médicos
const elegido = await page.evaluate((PLANTILLA) => {
  const d = [...document.querySelectorAll('div[role=dialog],.dijitDialog')].find((x) => x.offsetParent !== null);
  if (!d) return 'sin diálogo';
  const pasos = [];

  const casilla = [...d.querySelectorAll('input[type=checkbox]')].find((c) => c.offsetParent !== null);
  if (casilla && !casilla.checked) { casilla.click(); pasos.push('casilla marcada'); }

  // La plantilla puede estar como radio, opción de lista o fila seleccionable
  const radio = [...d.querySelectorAll('input[type=radio]')].find((r) => {
    const ctx = (r.closest('tr,label,div') || r.parentElement).innerText || '';
    return ctx.includes(PLANTILLA);
  });
  if (radio) { radio.click(); pasos.push('radio de plantilla'); return pasos.join(' + '); }

  const sel = [...d.querySelectorAll('select')].find((s) => [...s.options].some((o) => o.text.includes(PLANTILLA)));
  if (sel) {
    const op = [...sel.options].find((o) => o.text.includes(PLANTILLA));
    sel.value = op.value;
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    pasos.push('select de plantilla');
    return pasos.join(' + ');
  }

  const fila = [...d.querySelectorAll('tr,li,div')].find(
    (f) => f.offsetParent !== null && (f.innerText || '').trim().startsWith(PLANTILLA),
  );
  if (fila) { fila.click(); pasos.push('fila pulsada'); return pasos.join(' + '); }

  return pasos.join(' + ') || 'plantilla no localizada';
}, PLANTILLA);
console.log('SELECCION:', elegido);
await page.waitForTimeout(4000);
await captura('plantilla-elegida', `Plantilla "${PLANTILLA}" seleccionada en el asistente`);

// Avanzar el asistente hasta poder finalizar
for (let i = 0; i < 6; i += 1) {
  const avanzado = await page.evaluate(() => {
    const d = [...document.querySelectorAll('div[role=dialog],.dijitDialog')].find((x) => x.offsetParent !== null);
    if (!d) return 'sin diálogo';
    const fin = [...d.querySelectorAll('button')].find((b) => /Finalizar/i.test(b.innerText) && !b.disabled);
    if (fin) { fin.click(); return 'FINALIZAR'; }
    const sig = [...d.querySelectorAll('button')].find((b) => /Siguiente/i.test(b.innerText) && !b.disabled);
    if (sig) { sig.click(); return 'siguiente'; }
    return 'nada habilitado';
  });
  console.log(`paso ${i + 1}: ${avanzado}`);
  await page.waitForTimeout(6000);
  if (avanzado === 'FINALIZAR' || avanzado === 'sin diálogo') break;
}

// Aplicar la plantilla tarda: crea tipos, atributos y artefactos de ejemplo
for (let i = 0; i < 60; i += 1) {
  await page.waitForTimeout(4000);
  const t = await page.locator('body').innerText().catch(() => '');
  if (!/Aplicar plantilla|Aplicando/i.test(t)) break;
}
await page.waitForTimeout(10000);
await captura('plantilla-aplicada', 'Proyecto tras aplicar la plantilla, ya con tipos de artefacto');
console.log('=== RESULTADO ===');
console.log(limpio(await page.locator('body').innerText()).slice(0, 900));

await browser.close();
