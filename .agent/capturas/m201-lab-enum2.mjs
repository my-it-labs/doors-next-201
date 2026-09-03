// Crea el tipo de datos enumerado "Criticidad IEC 62304" con sus tres clases.
// Los radios son de Carbon: el input está oculto y se asocia por label[for].
import { abrirNavegador, entrar, abrirMetamodelo, seccionMetamodelo, catalogador } from './lib201.mjs';

const NOMBRE = 'Criticidad IEC 62304';
const VALORES = ['Clase A', 'Clase B', 'Clase C'];

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '201',
  lab: 'Personalización del modelo de requisitos de un proyecto de ingeniería',
  titulo: 'Personalización del modelo de requisitos',
  desde: 82,
});

const limpio = (s) => (s || '').replace(/[\t\n]+/g, ' ').trim();

await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });
await abrirMetamodelo(page);
await seccionMetamodelo(page, 'Tipos de datos de atributo');

await page.evaluate(() => {
  const b = [...document.querySelectorAll('button')].find(
    (x) => x.offsetParent !== null && /Tipo de datos nuevo/i.test(x.innerText || ''),
  );
  if (b) b.click();
});
await page.waitForTimeout(7000);

// Nombre
await page.evaluate((NOMBRE) => {
  const et = [...document.querySelectorAll('label,td,span,div')].find(
    (e) => e.offsetParent !== null && /^Nombre:?\s*\*?$/.test(e.innerText.trim()),
  );
  let cont = et ? et.parentElement : null;
  for (let i = 0; i < 4 && cont; i += 1) {
    const inp = [...cont.querySelectorAll('input[type=text]')].find((x) => x.offsetParent !== null);
    if (inp) {
      inp.focus();
      inp.value = NOMBRE;
      inp.dispatchEvent(new Event('input', { bubbles: true }));
      inp.dispatchEvent(new Event('change', { bubbles: true }));
      return;
    }
    cont = cont.parentElement;
  }
}, NOMBRE);
await page.waitForTimeout(2000);

// Marcar la enumeración usando el input asociado a la etiqueta
const marcado = await page.evaluate(() => {
  const lab = [...document.querySelectorAll('label')].find((l) => /Lista enumerada de valores/i.test(l.innerText));
  if (!lab) return 'etiqueta no encontrada';
  const id = lab.getAttribute('for');
  const inp = id ? document.getElementById(id) : lab.querySelector('input[type=radio]');
  if (!inp) return 'input no encontrado (for=' + id + ')';
  inp.checked = true;
  inp.click();
  inp.dispatchEvent(new Event('change', { bubbles: true }));
  return `marcado id=${id} checked=${inp.checked}`;
});
console.log('ENUMERACION:', marcado);
await page.waitForTimeout(6000);
await captura('tipo-datos-enumerado', 'Tipo de datos configurado como lista enumerada, con la tabla de valores');

// Estado real de los radios y controles de valores
const estado = await page.evaluate(() => {
  const radios = [...document.querySelectorAll('input[type=radio]')].map((r) => {
    const lab = document.querySelector(`label[for="${r.id}"]`);
    return `${lab ? lab.innerText.trim() : r.id}=${r.checked}`;
  });
  const etiqueta = (e) => (e.innerText || e.getAttribute('title') || e.getAttribute('aria-label') || '').trim();
  const nuevos = [...document.querySelectorAll('button,a,img')]
    .filter((e) => e.offsetParent !== null && etiqueta(e) && etiqueta(e).length < 35)
    .map((e) => etiqueta(e))
    .filter((t) => /añadir|valor|nuevo/i.test(t));
  return { radios, controles: [...new Set(nuevos)] };
});
console.log('RADIOS:', JSON.stringify(estado.radios));
console.log('CONTROLES:', JSON.stringify(estado.controles));
console.log('\nPANTALLA:', limpio(await page.locator('body').innerText()).slice(-600));

await browser.close();
