// Localiza el editor de propiedades del proyecto (tipos de artefacto, atributos,
// enumeraciones y tipos de enlace) y valida de paso las pestañas de Revisiones e Informes,
// que son la base de los módulos 207 y 208.
import { abrirNavegador, entrar, catalogador, BASE } from './lib201.mjs';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '201',
  lab: 'Personalización del modelo de requisitos de un proyecto de ingeniería',
  titulo: 'Personalización del modelo de requisitos',
  desde: 20,
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

// Volcar todas las acciones disponibles en la interfaz del proyecto
const acciones = await page.evaluate(() =>
  [...document.querySelectorAll('a')]
    .map((a) => (a.getAttribute('href') || ''))
    .filter((h) => /action=/.test(h))
    .map((h) => h.replace(/^.*action=/, '').split('&')[0]),
);
console.log('ACCIONES DISPONIBLES:', JSON.stringify([...new Set(acciones)].slice(0, 40), null, 1));

// Abrir el menú de administración del proyecto (icono de engranaje)
const abierto = await page.evaluate(() => {
  const candidatos = [...document.querySelectorAll('a,span,div,button')].filter((e) => {
    if (e.offsetParent === null) return null;
    const t = (e.getAttribute('title') || e.getAttribute('aria-label') || '').toLowerCase();
    return /administra|gestionar|configurar/.test(t);
  });
  if (!candidatos.length) return 'sin candidatos';
  candidatos[0].click();
  return 'pulsado: ' + (candidatos[0].getAttribute('title') || candidatos[0].getAttribute('aria-label'));
});
console.log('MENU:', abierto);
await page.waitForTimeout(4000);
await captura('menu-administracion', 'Menú de administración del proyecto desplegado');

const opciones = await page.evaluate(() =>
  [...document.querySelectorAll('[role="menuitem"],.dijitMenuItem,a')]
    .filter((e) => e.offsetParent !== null && e.innerText.trim())
    .map((e) => e.innerText.trim().replace(/\s+/g, ' '))
    .filter((t) => t.length < 60),
);
console.log('OPCIONES DEL MENU:', JSON.stringify([...new Set(opciones)].slice(0, 30)));

await browser.close();
