// Módulos 205 y 206 · Crear el área de proyecto de DOORS Next con gestión de
// configuraciones activada y comprobar que existen componentes, streams y change sets.
// Es el arranque del laboratorio: tras restaurar las bases de fábrica no hay áreas de proyecto.
import { abrirNavegador, entrar, catalogador, BASE } from './lib201.mjs';

const NOMBRE = 'Validacion 201';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '206',
  lab: 'Gestión de configuraciones: componentes, streams, baselines y change sets',
  titulo: 'Gestión avanzada de configuraciones',
  desde: 10,
});

const limpio = (s) => (s || '').replace(/[\t\n]+/g, ' ').trim();

await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });
console.log('URL tras login:', page.url());
await captura('dng-inicio', 'DOORS Next recién abierto, todavía sin áreas de proyecto');

// Listado de áreas de proyecto en la administración de RM
await page.goto(`${BASE}/rm/admin#action=jazz.viewPage&id=com.ibm.team.process.ProjectAreaManagement`, {
  waitUntil: 'domcontentloaded',
  timeout: 60000,
});
await page.waitForTimeout(9000);
await captura('areas-listado', 'Listado de áreas de proyecto antes de crear la del curso');
console.log('AREAS:', limpio(await page.locator('body').innerText()).slice(0, 500));

// Formulario de creación de área de proyecto
await page.goto(`${BASE}/rm/admin#action=com.ibm.team.process.editProjectArea&itemId=new`, {
  waitUntil: 'domcontentloaded',
  timeout: 60000,
});
await page.waitForTimeout(10000);
await captura('area-nueva-form', 'Formulario de creación de área de proyecto en DOORS Next');

// Inventario de campos y plantillas disponibles
const campos = await page.evaluate(() =>
  [...document.querySelectorAll('input,select,textarea')]
    .filter((e) => e.offsetParent !== null)
    .map((e) => `${e.tagName}[${e.type || ''}] id=${e.id} name=${e.name} val="${(e.value || '').slice(0, 40)}"`),
);
console.log('CAMPOS:\n' + campos.join('\n'));

const checks = await page.evaluate(() =>
  [...document.querySelectorAll('input[type=checkbox]')]
    .filter((e) => e.offsetParent !== null)
    .map((e) => {
      const ctx = e.closest('label,td,div,tr');
      return `${e.id || e.name} checked=${e.checked} :: ${(ctx ? ctx.innerText : '').replace(/[\t\n]+/g, ' ').trim().slice(0, 110)}`;
    }),
);
console.log('CASILLAS:\n' + checks.join('\n'));

const plantillas = await page.evaluate(() =>
  [...document.querySelectorAll('select')]
    .filter((e) => e.offsetParent !== null)
    .map((s) => (s.id || s.name) + ' => ' + [...s.options].map((o) => o.text.trim()).join(' ; ')),
);
console.log('DESPLEGABLES:\n' + plantillas.join('\n'));

console.log('\nTEXTO DEL FORMULARIO:\n' + limpio(await page.locator('body').innerText()).slice(0, 1500));

await browser.close();
