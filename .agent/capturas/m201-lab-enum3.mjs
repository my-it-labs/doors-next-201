// Crea el tipo de datos enumerado usando el botón "+" de la cabecera de la lista,
// que es el control real de creación (los botones "Nuevo..." pertenecen a otras
// secciones que están en el DOM pero ocultas).
import { abrirNavegador, entrar, abrirMetamodelo, seccionMetamodelo, catalogador } from './lib201.mjs';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '201',
  lab: 'Personalización del modelo de requisitos de un proyecto de ingeniería',
  titulo: 'Personalización del modelo de requisitos',
  desde: 82,
});

await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });
await abrirMetamodelo(page);
await seccionMetamodelo(page, 'Tipos de datos de atributo');

// Identificar el control "+" de la cabecera del panel de la lista
const info = await page.evaluate(() => {
  const cab = [...document.querySelectorAll('*')].find(
    (e) => e.offsetParent !== null && e.children.length === 0 && e.innerText.trim() === 'Tipos de datos de atributo',
  );
  if (!cab) return { error: 'cabecera no encontrada' };
  const r = cab.getBoundingClientRect();
  // Buscar controles clicables a la derecha de la cabecera, en su misma banda vertical
  const candidatos = [...document.querySelectorAll('a,button,img,span,div')]
    .filter((e) => {
      if (e.offsetParent === null) return false;
      const b = e.getBoundingClientRect();
      return b.width > 4 && b.width < 40 && b.height > 4 && b.height < 40
        && Math.abs(b.top - r.top) < 30 && b.left > r.right;
    })
    .map((e) => ({
      tag: e.tagName,
      clase: (e.className || '').toString().slice(0, 40),
      titulo: e.getAttribute('title') || e.getAttribute('aria-label') || '',
      x: Math.round(e.getBoundingClientRect().left + e.getBoundingClientRect().width / 2),
      y: Math.round(e.getBoundingClientRect().top + e.getBoundingClientRect().height / 2),
    }));
  return { cabecera: { x: Math.round(r.left), y: Math.round(r.top) }, candidatos };
});
console.log('INSPECCION:', JSON.stringify(info, null, 1));

if (info.candidatos && info.candidatos.length) {
  const c = info.candidatos[0];
  console.log(`Pulsando en (${c.x}, ${c.y}) -> ${c.tag} "${c.titulo}"`);
  await page.mouse.click(c.x, c.y);
  await page.waitForTimeout(7000);
  await captura('tipo-datos-form-nuevo', 'Formulario en blanco para crear un tipo de datos de atributo');

  const campos = await page.evaluate(() => {
    const editables = [...document.querySelectorAll('input[type=text]')]
      .filter((e) => e.offsetParent !== null && !e.disabled && !e.readOnly)
      .map((e) => `id=${e.id} valor="${e.value}"`);
    const radios = [...document.querySelectorAll('input[type=radio]')].map((r) => {
      const lab = document.querySelector(`label[for="${r.id}"]`);
      return `${lab ? lab.innerText.trim() : r.id}=${r.checked}${r.disabled ? '(off)' : ''}`;
    });
    const btns = [...document.querySelectorAll('button')]
      .filter((b) => b.offsetParent !== null && /Guardar|Cancelar/.test(b.innerText))
      .map((b) => b.innerText.trim() + (b.disabled ? '[off]' : ''));
    return { editables, radios, btns };
  });
  console.log('CAMPOS EDITABLES:', JSON.stringify(campos, null, 1));
}

await browser.close();
