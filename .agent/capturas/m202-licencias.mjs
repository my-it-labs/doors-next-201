// Inventario de licencias de acceso de cliente: qué hay activado y con cuántas unidades.
// Determina la viabilidad de los módulos que necesitan ETM (204) y de los perfiles del 202.
import { abrirNavegador, entrar, catalogador, BASE } from './lib201.mjs';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '202',
  lab: 'Alta de usuarios, licencias y permisos para el flujo de aprobación',
  titulo: 'Gobernanza y flujos de trabajo',
  desde: 30,
});

await entrar(page, { app: 'jts', usuario: 'formador', clave: 'formador' });

await page.goto(`${BASE}/jts/admin#action=com.ibm.team.repository.admin.manageLicenses`, {
  waitUntil: 'domcontentloaded',
  timeout: 60000,
});
await page.waitForTimeout(10000);
await captura('licencias-inventario', 'Inventario de licencias de acceso de cliente con unidades disponibles y caducidad');

const filas = await page.evaluate(() =>
  [...document.querySelectorAll('tr')]
    .map((r) => [...r.querySelectorAll('td,th')].map((c) => c.innerText.trim()).filter(Boolean).join(' | '))
    .filter((t) => /licen|analyst|contributor|practitioner|quality|test|caduc|expir|\d{4}/i.test(t)),
);
console.log('=== INVENTARIO DE LICENCIAS ===');
console.log([...new Set(filas)].join('\n').slice(0, 5000));

await browser.close();
