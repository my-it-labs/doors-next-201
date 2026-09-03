// Módulo 201 · Metamodelo: tipos de artefacto, atributos, enumeraciones y tipos de enlace.
// Comprueba que el editor de propiedades del proyecto está accesible y qué ofrece.
import { abrirNavegador, entrar, catalogador, BASE } from './lib201.mjs';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '201',
  lab: 'Personalización del modelo de requisitos de un proyecto de ingeniería',
  titulo: 'Personalización del modelo de requisitos',
  desde: 10,
});

const limpio = (s) => (s || '').replace(/[\t\n]+/g, ' ').trim();

await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });
console.log('URL:', page.url());
await captura('rm-portada', 'Portada de DOORS Next con la lista de proyectos');

// Listado de todos los proyectos en la interfaz de usuario
await page.goto(`${BASE}/rm/web#action=com.ibm.rdm.web.pages.showAllProjectsPage`, {
  waitUntil: 'domcontentloaded',
  timeout: 60000,
});
await page.waitForTimeout(14000);
await captura('proyectos-lista', 'Lista de proyectos de DOORS Next');
console.log('PROYECTOS:', limpio(await page.locator('body').innerText()).slice(0, 500));

// Abrir el proyecto de validación
const enlace = page.locator('a:has-text("Validacion 201")').first();
console.log('proyecto visible:', await enlace.count());
if (await enlace.count()) {
  await enlace.click({ timeout: 20000 }).catch((e) => console.log('error abriendo:', e.message.split('\n')[0]));
  await page.waitForTimeout(16000);
  await captura('proyecto-abierto', 'Proyecto abierto en DOORS Next, con artefactos y carpetas');
  console.log('DENTRO:', limpio(await page.locator('body').innerText()).slice(0, 600));
}

// Menú de administración del proyecto: ahí viven los tipos de artefacto y atributos
const menus = await page.evaluate(() =>
  [...document.querySelectorAll('a,span,div')]
    .filter((e) => e.offsetParent !== null && /propiedades del proyecto|gestionar|administraci/i.test(e.innerText || ''))
    .map((e) => e.innerText.trim().slice(0, 60))
    .slice(0, 15),
);
console.log('MENUS DE ADMINISTRACION:', JSON.stringify([...new Set(menus)]));

await browser.close();
