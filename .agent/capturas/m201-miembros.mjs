// Hipótesis: el editor del metamodelo está en modo lectura porque el área de proyecto
// se creó sin miembros ni administradores. Se inspecciona el área en la administración.
import { abrirNavegador, entrar, catalogador, BASE } from './lib201.mjs';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '202',
  lab: 'Gobernanza: miembros, roles y permisos del area de proyecto',
  titulo: 'Gobernanza y flujos de trabajo',
  desde: 30,
});

const limpio = (s) => (s || '').replace(/[\t\n]+/g, ' ').trim();

await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });
await page.goto(`${BASE}/rm/admin`, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(11000);

// Menú "Áreas de proyecto" -> submenú de áreas activas
await page.locator('a:has-text("Áreas de proyecto"), span:has-text("Áreas de proyecto")')
  .first().click({ timeout: 20000 }).catch((e) => console.log('menu:', e.message.split('\n')[0]));
await page.waitForTimeout(3500);
const submenu = await page.evaluate(() => {
  const items = [...document.querySelectorAll('a,li,span')]
    .filter((e) => e.offsetParent !== null && /área|areas|activas|archivad/i.test(e.innerText || '') && e.innerText.trim().length < 45)
    .map((e) => e.innerText.trim());
  return [...new Set(items)];
});
console.log('SUBMENU:', JSON.stringify(submenu));
await page.locator('a:has-text("Áreas de proyecto activas")').first().click({ timeout: 15000 }).catch(() => {});
await page.waitForTimeout(12000);
await captura('areas-proyecto-lista', 'Lista de áreas de proyecto en la administración');

await page.locator('a:has-text("Validacion 201")').first().click({ timeout: 20000 }).catch((e) => console.log('clic:', e.message.split('\n')[0]));
await page.waitForTimeout(14000);
await captura('area-proyecto-miembros', 'Área de proyecto con las secciones de miembros y administradores');

const info = await page.evaluate(() => {
  const texto = document.body.innerText;
  const trozo = (etiqueta) => {
    const i = texto.indexOf(etiqueta);
    return i < 0 ? `(no aparece "${etiqueta}")` : texto.slice(i, i + 260).replace(/[\t\n]+/g, ' | ');
  };
  const botones = [...document.querySelectorAll('a,button')]
    .filter((b) => b.offsetParent !== null)
    .map((b) => (b.innerText || b.getAttribute('title') || '').trim())
    .filter((t) => t && t.length < 40 && /añadir|agregar|guardar|suprimir|eliminar/i.test(t));
  return {
    miembros: trozo('Miembros'),
    administradores: trozo('Administradores'),
    roles: trozo('Roles disponibles'),
    botones: [...new Set(botones)],
  };
});
console.log('MIEMBROS:', info.miembros);
console.log('\nADMINISTRADORES:', info.administradores);
console.log('\nROLES:', info.roles);
console.log('\nBOTONES:', JSON.stringify(info.botones));
console.log('\nURL:', page.url());

await browser.close();
