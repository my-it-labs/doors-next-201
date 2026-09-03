// Termina el alta del miembro con el rol Administrador, guarda el área de proyecto y
// comprueba el efecto sobre el editor del metamodelo (la prueba de la causa raíz).
import { abrirNavegador, entrar, abrirMetamodelo, seccionMetamodelo, catalogador, BASE } from './lib201.mjs';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '202',
  lab: 'Gobernanza: miembros, roles y permisos del area de proyecto',
  titulo: 'Gobernanza y flujos de trabajo',
  desde: 36,
});

const AREA = `${BASE}/rm/admin#action=com.ibm.team.process.editProjectArea&itemId=_qPXo4KdwEfGdNNHedQqJEw`;

async function pulsar(patron, ambito = 'dialogo') {
  const r = await page.evaluate(({ patron, ambito }) => {
    const re = new RegExp(patron, 'i');
    let raiz = document;
    if (ambito === 'dialogo') {
      const dlg = [...document.querySelectorAll('div[role=dialog],.dijitDialog,.jazz-ui-dialog')]
        .filter((x) => x.offsetParent !== null)
        .pop();
      if (dlg) raiz = dlg;
    }
    const b = [...raiz.querySelectorAll('button,a')].find(
      (x) => x.offsetParent !== null && !x.disabled && re.test(x.innerText || x.getAttribute('title') || ''),
    );
    if (!b) return `no pulsable: ${patron}`;
    b.click();
    return `pulsado: ${(b.innerText || b.getAttribute('title')).trim().replace(/\n/g, ' ')}`;
  }, { patron, ambito });
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

// Paso 1: filtrar, seleccionar el usuario y avanzar
await page.evaluate(() => {
  const dlg = [...document.querySelectorAll('div[role=dialog],.dijitDialog,.jazz-ui-dialog')]
    .filter((x) => x.offsetParent !== null).pop();
  const inp = dlg && [...dlg.querySelectorAll('input[type=text]')].find((i) => i.offsetParent !== null);
  if (inp) { inp.focus(); inp.value = 'formador'; inp.dispatchEvent(new Event('input', { bubbles: true })); }
});
await page.keyboard.press('Enter').catch(() => {});
await page.waitForTimeout(9000);
await page.evaluate(() => {
  const dlg = [...document.querySelectorAll('div[role=dialog],.dijitDialog,.jazz-ui-dialog')]
    .filter((x) => x.offsetParent !== null).pop();
  const sel = [...dlg.querySelectorAll('select')][0];
  if (sel && sel.options.length) {
    sel.options[0].selected = true;
    sel.dispatchEvent(new Event('change', { bubbles: true }));
    sel.options[0].dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
  }
});
await page.waitForTimeout(4000);
await pulsar('Siguiente');
await page.waitForTimeout(7000);

// Paso 2: mover el rol Administrador a "Roles seleccionados"
const rol = await page.evaluate(() => {
  const dlg = [...document.querySelectorAll('div[role=dialog],.dijitDialog,.jazz-ui-dialog')]
    .filter((x) => x.offsetParent !== null).pop();
  const listas = [...dlg.querySelectorAll('select')];
  const disp = listas.find((s) => [...s.options].some((o) => /^Administrador$/.test(o.text.trim())));
  if (!disp) return 'no encuentro la lista de roles';
  const op = [...disp.options].find((o) => /^Administrador$/.test(o.text.trim()));
  op.selected = true;
  disp.dispatchEvent(new Event('change', { bubbles: true }));
  op.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
  disp.dispatchEvent(new MouseEvent('dblclick', { bubbles: true }));
  const estado = listas.map((s) => [...s.options].filter((o) => o.selected).map((o) => o.text.trim()).join(',') || '-');
  return `rol marcado; selecciones por lista: ${JSON.stringify(estado)}`;
});
console.log('ROL:', rol);
await page.waitForTimeout(4000);
await captura('miembro-rol-administrador', 'Rol Administrador asignado al miembro en el asistente');

await pulsar('Finalizar');
await page.waitForTimeout(9000);
await captura('miembro-anadido', 'Área de proyecto con el miembro y su rol, pendiente de guardar');

// Guardar el área de proyecto (el botón está en la barra superior, fuera del diálogo)
await pulsar('Guardar', 'pagina');
await page.waitForTimeout(14000);
await captura('area-guardada', 'Área de proyecto guardada con el miembro y su rol');

const miembros = await page.evaluate(() => {
  const t = document.body.innerText;
  const i = t.indexOf('Miembros');
  return t.slice(i, i + 320).replace(/[\t\n]+/g, ' | ');
});
console.log('\nMIEMBROS TRAS GUARDAR:', miembros);

// La prueba: ¿se habilita ya el alta en el editor del metamodelo?
await abrirMetamodelo(page);
await seccionMetamodelo(page, 'Tipos de datos de atributo');
const estado = await page.evaluate(() => {
  const b = [...document.querySelectorAll('[title="Tipo de datos nuevo..."]')].find((x) => x.offsetParent !== null);
  return b ? `disabled=${b.disabled}` : 'boton no visible';
});
console.log('\n*** BOTON DE ALTA SIENDO MIEMBRO CON ROL ADMINISTRADOR:', estado);
await captura('metamodelo-editable', 'Editor del metamodelo con el botón de alta ya habilitado');

await browser.close();
