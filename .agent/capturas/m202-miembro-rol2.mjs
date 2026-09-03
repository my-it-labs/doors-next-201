// Completa el asistente "Añadir nuevos miembros": selecciona el usuario, le asigna
// el rol Administrador, guarda el área y comprueba que el metamodelo pasa a ser
// editable.
import { abrirNavegador, entrar, abrirMetamodelo, seccionMetamodelo, catalogador, BASE } from './lib201.mjs';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '202',
  lab: 'Gobernanza: miembros, roles y permisos del area de proyecto',
  titulo: 'Gobernanza y flujos de trabajo',
  desde: 34,
});

const AREA = `${BASE}/rm/admin#action=com.ibm.team.process.editProjectArea&itemId=_qPXo4KdwEfGdNNHedQqJEw`;

const dialogo = () =>
  page.locator('div[role=dialog], .dijitDialog, .jazz-ui-dialog').filter({ hasText: 'Añadir nuevos miembros' }).last();

async function estadoDialogo(etiqueta) {
  const d = await page.evaluate(() => {
    const dlg = [...document.querySelectorAll('div[role=dialog],.dijitDialog,.jazz-ui-dialog')]
      .filter((x) => x.offsetParent !== null)
      .pop();
    if (!dlg) return null;
    return {
      texto: dlg.innerText.replace(/[\t\n]+/g, ' | ').slice(0, 320),
      listas: [...dlg.querySelectorAll('select')].map((s) =>
        [...s.options].map((o) => o.text.trim()).join(' / ') || '(vacía)',
      ),
      botones: [...dlg.querySelectorAll('button')]
        .filter((b) => b.offsetParent !== null && b.innerText.trim())
        .map((b) => b.innerText.trim().replace(/\n/g, ' ') + (b.disabled ? '[off]' : '')),
    };
  });
  console.log(`\n[${etiqueta}]`, JSON.stringify(d, null, 1));
  return d;
}

async function pulsar(patron) {
  const r = await page.evaluate((patron) => {
    const re = new RegExp(patron, 'i');
    const dlg = [...document.querySelectorAll('div[role=dialog],.dijitDialog,.jazz-ui-dialog')]
      .filter((x) => x.offsetParent !== null)
      .pop();
    const b = [...(dlg || document).querySelectorAll('button')].find(
      (x) => x.offsetParent !== null && !x.disabled && re.test(x.innerText),
    );
    if (!b) return `no pulsable: ${patron}`;
    b.click();
    return `pulsado: ${b.innerText.trim().replace(/\n/g, ' ')}`;
  }, patron);
  console.log('  ->', r);
  return r;
}

await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });
await page.goto(AREA, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(15000);
await page.locator('a:has-text("Visión general")').first().click({ timeout: 15000 }).catch(() => {});
await page.waitForTimeout(6000);

await page.evaluate(() => {
  const as = [...document.querySelectorAll('a')].filter(
    (a) => a.offsetParent !== null && /^Añadir\.\.\.$/.test(a.innerText.trim()),
  );
  if (as.length) as[0].click();
});
await page.waitForTimeout(8000);

// Filtrar y seleccionar el usuario
await page.evaluate(() => {
  const dlg = [...document.querySelectorAll('div[role=dialog],.dijitDialog,.jazz-ui-dialog')]
    .filter((x) => x.offsetParent !== null)
    .pop();
  const inp = dlg && [...dlg.querySelectorAll('input[type=text]')].find((i) => i.offsetParent !== null);
  if (inp) {
    inp.focus();
    inp.value = 'formador';
    inp.dispatchEvent(new Event('input', { bubbles: true }));
  }
});
await page.keyboard.press('Enter').catch(() => {});
await page.waitForTimeout(9000);

// Marcar la opción en "Usuarios coincidentes" y moverla a "Usuarios seleccionados"
const movido = await page.evaluate(() => {
  const dlg = [...document.querySelectorAll('div[role=dialog],.dijitDialog,.jazz-ui-dialog')]
    .filter((x) => x.offsetParent !== null)
    .pop();
  const sel = [...dlg.querySelectorAll('select')][0];
  if (!sel || !sel.options.length) return 'lista de coincidencias vacía';
  sel.options[0].selected = true;
  sel.dispatchEvent(new Event('change', { bubbles: true }));
  // Doble clic sobre la opción, que es como estos diálogos mueven elementos
  sel.options[0].dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
  sel.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
  return `seleccionado "${sel.options[0].text.trim()}"`;
});
console.log('SELECCION:', movido);
await page.waitForTimeout(4000);
await estadoDialogo('tras seleccionar el usuario');
await captura('miembro-seleccionado', 'Usuario trasladado a la lista de usuarios seleccionados');

// Avanzar al paso de roles
await pulsar('Siguiente');
await page.waitForTimeout(7000);
await estadoDialogo('paso de roles');
await captura('miembro-roles', 'Paso del asistente en el que se asignan los roles al miembro');

await browser.close();
