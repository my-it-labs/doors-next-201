// Módulo 202 · Gobernanza: alta de usuarios, licencias y permisos de repositorio.
// Valida el flujo que harán los alumnos y captura cada paso.
import { abrirNavegador, entrar, catalogador, BASE } from './lib201.mjs';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '202',
  lab: 'Alta de usuarios, licencias y permisos para el flujo de aprobación',
  titulo: 'Gobernanza y flujos de trabajo',
  desde: 10,
});

const limpio = (s) => (s || '').replace(/[\t\n]+/g, ' ').trim();

await entrar(page, { app: 'jts', usuario: 'formador', clave: 'formador' });

// 1) Gestión de usuarios existentes
await page.goto(`${BASE}/jts/admin#action=com.ibm.team.repository.manageUsers`, {
  waitUntil: 'domcontentloaded',
  timeout: 60000,
});
await page.waitForTimeout(8000);
await captura('usuarios-lista', 'Listado de usuarios activos del servidor con sus licencias');
console.log('USUARIOS:', limpio(await page.locator('body').innerText()).slice(0, 900));

// 2) Formulario de creación de usuario
await page.goto(`${BASE}/jts/admin#action=com.ibm.team.repository.editUser&itemId=new`, {
  waitUntil: 'domcontentloaded',
  timeout: 60000,
});
await page.waitForTimeout(8000);
await captura('usuario-nuevo-form', 'Formulario vacío de creación de usuario');

const campos = await page.evaluate(() =>
  [...document.querySelectorAll('input,select,textarea')]
    .filter((e) => e.offsetParent !== null)
    .map((e) => `${e.tagName}[${e.type || ''}] id=${e.id} name=${e.name} val=${(e.value || '').slice(0, 30)}`),
);
console.log('CAMPOS:\n' + campos.join('\n'));

const licencias = await page.evaluate(() =>
  [...document.querySelectorAll('input[type=checkbox]')]
    .filter((e) => e.offsetParent !== null)
    .map((e) => {
      const fila = e.closest('tr') || e.parentElement;
      return `${e.id || e.name} :: ${(fila ? fila.innerText : '').replace(/[\t\n]+/g, ' ').trim().slice(0, 90)}`;
    }),
);
console.log('CASILLAS (licencias/permisos):\n' + licencias.join('\n'));

const secciones = await page.evaluate(() =>
  [...document.querySelectorAll('h1,h2,h3,legend,label')]
    .filter((e) => e.offsetParent !== null && e.innerText.trim())
    .map((e) => e.tagName + ': ' + e.innerText.trim().slice(0, 60))
    .slice(0, 40),
);
console.log('SECCIONES:\n' + secciones.join('\n'));

await browser.close();
