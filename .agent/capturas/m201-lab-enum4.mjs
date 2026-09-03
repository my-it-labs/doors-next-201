// Localiza todos los controles de alta visibles con sus coordenadas, para dar con el
// "+" del panel de la lista de tipos de datos.
import { abrirNavegador, entrar, abrirMetamodelo, seccionMetamodelo } from './lib201.mjs';

const { browser, page } = await abrirNavegador();

await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });
await abrirMetamodelo(page);
await seccionMetamodelo(page, 'Tipos de datos de atributo');

const controles = await page.evaluate(() => {
  const visible = (e) => {
    if (e.offsetParent === null) return false;
    const b = e.getBoundingClientRect();
    return b.width > 3 && b.height > 3;
  };
  const salida = [];
  for (const e of document.querySelectorAll('*')) {
    if (!visible(e)) continue;
    const clase = (e.className || '').toString();
    const titulo = e.getAttribute('title') || e.getAttribute('aria-label') || '';
    const texto = (e.childElementCount === 0 ? e.innerText || '' : '').trim();
    if (!/add|crear|nuev|plus/i.test(clase + ' ' + titulo) && texto !== '+') continue;
    const b = e.getBoundingClientRect();
    salida.push({
      tag: e.tagName,
      clase: clase.slice(0, 45),
      titulo,
      texto: texto.slice(0, 20),
      x: Math.round(b.left + b.width / 2),
      y: Math.round(b.top + b.height / 2),
      w: Math.round(b.width),
      h: Math.round(b.height),
    });
  }
  return salida;
});
console.log('CONTROLES DE ALTA VISIBLES:');
console.log(JSON.stringify(controles, null, 1));

console.log('\nVIEWPORT:', JSON.stringify(page.viewportSize()));
await browser.close();
