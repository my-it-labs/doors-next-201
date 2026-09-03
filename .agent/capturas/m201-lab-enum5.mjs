// Alta completa del tipo de datos enumerado "Criticidad IEC 62304".
// El control de creación es el botón con título "Tipo de datos nuevo..." de la
// cabecera del panel de la lista; hay homónimos ocultos, así que se pulsa por
// coordenadas del elemento realmente visible.
import { abrirNavegador, entrar, abrirMetamodelo, seccionMetamodelo, catalogador } from './lib201.mjs';

const NOMBRE = 'Criticidad IEC 62304';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '201',
  lab: 'Personalización del modelo de requisitos de un proyecto de ingeniería',
  titulo: 'Personalización del modelo de requisitos',
  desde: 82,
});

const limpio = (s) => (s || '').replace(/[\t\n]+/g, ' ').trim();

// Pulsa el control visible cuyo título coincide, usando su centro real
async function pulsarPorTitulo(patron) {
  const p = await page.evaluate((patron) => {
    const re = new RegExp(patron, 'i');
    for (const e of document.querySelectorAll('button,a,img,span')) {
      if (e.offsetParent === null) continue;
      const t = e.getAttribute('title') || e.getAttribute('aria-label') || '';
      if (!re.test(t)) continue;
      const b = e.getBoundingClientRect();
      if (b.width < 4 || b.height < 4) continue;
      return { x: Math.round(b.left + b.width / 2), y: Math.round(b.top + b.height / 2), t };
    }
    return null;
  }, patron);
  if (!p) return `no visible: ${patron}`;
  await page.mouse.click(p.x, p.y);
  return `pulsado "${p.t}" en (${p.x},${p.y})`;
}

await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });
await abrirMetamodelo(page);
await seccionMetamodelo(page, 'Tipos de datos de atributo');
await captura('tipos-datos-lista', 'Lista de tipos de datos de la plantilla, con el botón de alta en la cabecera');

console.log(await pulsarPorTitulo('Tipo de datos nuevo'));
await page.waitForTimeout(7000);
await captura('tipo-datos-form-vacio', 'Formulario en blanco de un tipo de datos de atributo nuevo');

// Nombre: ahora sí hay un input editable en el formulario
const nombre = await page.evaluate((NOMBRE) => {
  const libres = [...document.querySelectorAll('input[type=text]')].filter(
    (e) => e.offsetParent !== null && !e.disabled && !e.readOnly && !/Buscar/.test(e.value || ''),
  );
  if (!libres.length) return 'sin campos editables';
  const inp = libres[0];
  inp.focus();
  inp.value = NOMBRE;
  inp.dispatchEvent(new Event('input', { bubbles: true }));
  inp.dispatchEvent(new Event('change', { bubbles: true }));
  return `escrito en id=${inp.id || '(sin id)'}`;
}, NOMBRE);
console.log('NOMBRE:', nombre);
await page.waitForTimeout(2500);

// Marcar "Lista enumerada de valores" sobre el input habilitado
const enumer = await page.evaluate(() => {
  const labs = [...document.querySelectorAll('label')].filter((l) => /Lista enumerada de valores/i.test(l.innerText));
  for (const lab of labs) {
    const id = lab.getAttribute('for');
    const inp = id ? document.getElementById(id) : null;
    if (inp && !inp.disabled) {
      inp.click();
      return `marcado (${id}) checked=${inp.checked}`;
    }
  }
  return 'sin radio habilitado';
});
console.log('ENUMERACION:', enumer);
await page.waitForTimeout(6000);
await captura('tipo-datos-enumeracion', 'Tipo de datos marcado como lista enumerada, con su tabla de valores');

// Controles para dar de alta los valores de la enumeración
const valores = await page.evaluate(() => {
  const salida = [];
  for (const e of document.querySelectorAll('button,a,img,span')) {
    if (e.offsetParent === null) continue;
    const t = e.getAttribute('title') || e.getAttribute('aria-label') || (e.childElementCount === 0 ? e.innerText : '');
    if (!t || !/valor|añadir|nuevo/i.test(t) || t.length > 40) continue;
    const b = e.getBoundingClientRect();
    if (b.width < 4) continue;
    salida.push(`${e.tagName} "${t.trim()}" (${Math.round(b.left + b.width / 2)},${Math.round(b.top + b.height / 2)})`);
  }
  return [...new Set(salida)];
});
console.log('CONTROLES DE VALORES:', JSON.stringify(valores, null, 1));
console.log('\nPANTALLA:', limpio(await page.locator('body').innerText()).slice(-500));

await browser.close();
