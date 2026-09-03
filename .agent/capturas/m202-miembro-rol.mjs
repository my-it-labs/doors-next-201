// Añade al usuario como miembro del área de proyecto con el rol Administrador y
// comprueba que con ello el editor del metamodelo deja de ser de solo lectura.
import { abrirNavegador, entrar, abrirMetamodelo, seccionMetamodelo, catalogador, BASE } from './lib201.mjs';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '202',
  lab: 'Gobernanza: miembros, roles y permisos del area de proyecto',
  titulo: 'Gobernanza y flujos de trabajo',
  desde: 33,
});

const AREA = `${BASE}/rm/admin#action=com.ibm.team.process.editProjectArea&itemId=_qPXo4KdwEfGdNNHedQqJEw`;

async function volcarDialogo(etiqueta) {
  const d = await page.evaluate(() => {
    const dlg = [...document.querySelectorAll('div[role=dialog],.dijitDialog,.jazz-ui-dialog')]
      .filter((x) => x.offsetParent !== null)
      .pop();
    if (!dlg) return null;
    return {
      texto: dlg.innerText.replace(/[\t\n]+/g, ' | ').slice(0, 350),
      campos: [...dlg.querySelectorAll('input,select')]
        .filter((i) => i.offsetParent !== null)
        .map((i) => `${i.tagName}[${i.type || ''}] id=${i.id || '-'}`),
      botones: [...dlg.querySelectorAll('button,a')]
        .filter((b) => b.offsetParent !== null && b.innerText.trim())
        .map((b) => b.innerText.trim() + (b.disabled ? '[off]' : '')),
    };
  });
  console.log(`\n[dialogo ${etiqueta}]`, JSON.stringify(d, null, 1));
  return d;
}

await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });
await page.goto(AREA, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(15000);

// Asegurar que estamos en Visión general, donde vive la sección Miembros
await page.locator('a:has-text("Visión general")').first().click({ timeout: 15000 }).catch(() => {});
await page.waitForTimeout(6000);

const enlaces = await page.evaluate(() => {
  const as = [...document.querySelectorAll('a')].filter(
    (a) => a.offsetParent !== null && /^Añadir\.\.\.$/.test(a.innerText.trim()),
  );
  return as.map((a) => {
    // Identificar a qué sección pertenece mirando hacia atrás en el texto
    let s = a.closest('table,div');
    for (let i = 0; i < 6 && s; i += 1) {
      const t = (s.innerText || '').slice(0, 60);
      if (/Miembros/.test(t)) return 'Miembros';
      if (/Administradores/.test(t)) return 'Administradores';
      s = s.parentElement;
    }
    return 'desconocida';
  });
});
console.log('ENLACES "Añadir...":', JSON.stringify(enlaces));

await page.evaluate(() => {
  const as = [...document.querySelectorAll('a')].filter(
    (a) => a.offsetParent !== null && /^Añadir\.\.\.$/.test(a.innerText.trim()),
  );
  if (as.length) as[0].click();
});
await page.waitForTimeout(8000);
await captura('anadir-miembro-dialogo', 'Diálogo para seleccionar el usuario que se añade como miembro');
await volcarDialogo('selección de usuario');

// Buscar el usuario
const buscado = await page.evaluate(() => {
  const dlg = [...document.querySelectorAll('div[role=dialog],.dijitDialog,.jazz-ui-dialog')]
    .filter((x) => x.offsetParent !== null)
    .pop();
  const inp = dlg && [...dlg.querySelectorAll('input[type=text]')].find((i) => i.offsetParent !== null);
  if (!inp) return 'sin campo de búsqueda';
  inp.focus();
  inp.value = 'formador';
  inp.dispatchEvent(new Event('input', { bubbles: true }));
  inp.dispatchEvent(new Event('keyup', { bubbles: true }));
  return 'buscando "formador"';
});
console.log('BUSQUEDA:', buscado);
await page.keyboard.press('Enter').catch(() => {});
await page.waitForTimeout(9000);
await captura('anadir-miembro-resultado', 'Resultado de la búsqueda del usuario en el diálogo');
await volcarDialogo('con resultados');

await browser.close();
