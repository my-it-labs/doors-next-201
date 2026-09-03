// Confirma la causa del modo lectura del metamodelo: el área de proyecto no tiene
// miembros, así que el usuario solo dispone del rol implícito "Todos", que no permite
// modificar el sistema de tipos. Se añade el miembro y se comprueba el efecto.
import { abrirNavegador, entrar, abrirMetamodelo, seccionMetamodelo, catalogador, BASE } from './lib201.mjs';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '202',
  lab: 'Gobernanza: miembros, roles y permisos del area de proyecto',
  titulo: 'Gobernanza y flujos de trabajo',
  desde: 32,
});

const AREA = `${BASE}/rm/admin#action=com.ibm.team.process.editProjectArea&itemId=_qPXo4KdwEfGdNNHedQqJEw`;

async function estadoBotonAlta(etiqueta) {
  const e = await page.evaluate(() => {
    const b = [...document.querySelectorAll('[title="Tipo de datos nuevo..."]')].find((x) => x.offsetParent !== null);
    if (!b) return 'boton no visible';
    return `disabled=${b.disabled} clases=${(b.className || '').toString().includes('disabled')}`;
  });
  console.log(`[${etiqueta}] boton de alta -> ${e}`);
}

await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });

// Estado de partida del editor del metamodelo
await abrirMetamodelo(page);
await seccionMetamodelo(page, 'Tipos de datos de atributo');
await estadoBotonAlta('SIN ser miembro');

// Ver los roles que define la plantilla de proceso
await page.goto(AREA, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(14000);
await page.locator('a:has-text("Roles")').first().click({ timeout: 15000 }).catch(() => {});
await page.waitForTimeout(8000);
await captura('roles-disponibles', 'Roles que define la plantilla de proceso de gestión de requisitos');
const roles = await page.evaluate(() => {
  const t = document.body.innerText;
  const i = t.indexOf('Roles');
  return t.slice(i, i + 700).replace(/[\t\n]+/g, ' | ');
});
console.log('\nROLES:', roles);

// Volver a Visión general y añadir el miembro
await page.goto(AREA, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(14000);
const pulsado = await page.evaluate(() => {
  const t = document.body.innerText;
  const enlaces = [...document.querySelectorAll('a')].filter(
    (a) => a.offsetParent !== null && a.innerText.trim() === 'Añadir...',
  );
  // El primer "Añadir..." es el de Miembros; el segundo, el de Administradores
  if (!enlaces.length) return 'sin enlaces';
  enlaces[0].click();
  return `pulsado (de ${enlaces.length} enlaces)`;
});
console.log('\nAÑADIR MIEMBRO:', pulsado);
await page.waitForTimeout(7000);
await captura('anadir-miembro-dialogo', 'Diálogo de selección de usuarios para añadir un miembro');

const dlg = await page.evaluate(() => {
  const d = [...document.querySelectorAll('div[role=dialog],.dijitDialog')].filter((x) => x.offsetParent !== null).pop();
  if (!d) return null;
  return {
    texto: d.innerText.replace(/[\t\n]+/g, ' | ').slice(0, 300),
    campos: [...d.querySelectorAll('input')].filter((i) => i.offsetParent !== null).map((i) => `${i.type} id=${i.id}`),
    botones: [...d.querySelectorAll('button')].filter((b) => b.offsetParent !== null).map((b) => b.innerText.trim() + (b.disabled ? '[off]' : '')),
  };
});
console.log('DIALOGO:', JSON.stringify(dlg, null, 1));

await browser.close();
