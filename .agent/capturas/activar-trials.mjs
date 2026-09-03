// Activa TODOS los trials de 60 días pendientes en el servidor.
// Motivo: la tabla usa rowspan para el producto, así que es más fiable y más simple
// activarlo todo; así todas las licencias caducan el mismo día y la receta de
// rejuvenecimiento de la imagen es una sola operación.
// Cada activación exige aceptar el acuerdo de licencia en un diálogo.
import { abrirNavegador, entrar, catalogador, BASE } from './lib201.mjs';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '000',
  lab: 'Preparación de la imagen (tarea del formador, no del alumno)',
  titulo: 'Preparación del entorno',
});

await entrar(page, { app: 'jts', usuario: 'formador', clave: 'formador' });

async function irALicencias() {
  await page.goto(`${BASE}/jts/admin#action=com.ibm.team.repository.admin.manageLicenses`, {
    waitUntil: 'domcontentloaded',
    timeout: 60000,
  });
  await page.waitForTimeout(8000);
}

await irALicencias();
await captura('licencias-antes', 'Inventario de licencias: solo DOORS Next activo, el resto de trials sin iniciar');

for (let intento = 1; intento <= 12; intento += 1) {
  const pendientes = await page.locator('a:has-text("Activar prueba")').count();
  if (!pendientes) {
    console.log(`No quedan trials por activar (vuelta ${intento}).`);
    break;
  }
  console.log(`Vuelta ${intento}: quedan ${pendientes} trials sin activar.`);

  await page.locator('a:has-text("Activar prueba")').first().click({ timeout: 15000 })
    .catch((e) => console.log('  error clic:', e.message.split('\n')[0]));
  await page.waitForTimeout(4500);

  const cual = await page.evaluate(() => {
    const d = [...document.querySelectorAll('div[role=dialog],.dijitDialog')].find((x) => x.offsetParent !== null);
    return d ? d.innerText.replace(/[\t\n]+/g, ' ').slice(0, 70) : '(sin diálogo)';
  });
  console.log(`  activando: ${cual}`);

  const marcado = await page.evaluate(() => {
    const radios = [...document.querySelectorAll('input[type=radio]')].filter((r) => r.offsetParent !== null);
    for (const r of radios) {
      const ctx = ((r.closest('label,td,div') || r.parentElement).innerText || '').trim();
      if (/^Acepto los t/i.test(ctx)) { r.click(); return 'acepto (por etiqueta)'; }
    }
    if (radios.length) { radios[0].click(); return 'acepto (primer radio)'; }
    return 'sin radios';
  });
  console.log(`  ${marcado}`);
  await page.waitForTimeout(2000);

  const fin = page.locator('button:has-text("Finalizar")').first();
  if (await fin.count()) {
    await fin.click({ timeout: 10000 }).catch((e) => console.log('  error Finalizar:', e.message.split('\n')[0]));
  } else {
    console.log('  no aparece Finalizar; cancelo para no bloquear el bucle');
    await page.locator('button:has-text("Cancelar")').first().click().catch(() => {});
  }
  await page.waitForTimeout(7000);
  await irALicencias();
}

await captura('licencias-despues', 'Inventario con todos los trials de 60 días activados y su fecha de caducidad');

const filas = await page.evaluate(() =>
  [...document.querySelectorAll('tr')]
    .map((r) => [...r.querySelectorAll('td')].map((c) => c.innerText.trim()).filter(Boolean).join(' | '))
    .filter((t) => /Trial|Included|Internal/.test(t)),
);
console.log('\n=== ESTADO FINAL DE LICENCIAS ===');
console.log([...new Set(filas)].join('\n'));

await browser.close();
