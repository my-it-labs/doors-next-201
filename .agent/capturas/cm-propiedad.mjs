// Localiza la propiedad avanzada de RM que habilita la gestión de configuraciones.
// La página oculta por omisión las propiedades sin modificar, así que hay que
// desmarcar esa casilla y usar el buscador.
import { abrirNavegador, entrar, BASE } from './lib201.mjs';

const { browser, page } = await abrirNavegador();
await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });

await page.goto(`${BASE}/rm/admin#action=com.ibm.team.repository.admin.configureAdvanced`, {
  waitUntil: 'domcontentloaded',
  timeout: 60000,
});
await page.waitForTimeout(16000);

// Mostrar también las propiedades que están en su valor por omisión
const estado = await page.evaluate(() => {
  const r = [];
  for (const id of ['hideDefaultCheckBox', 'hideUnchangedCheckBox']) {
    const c = document.getElementById(id);
    if (c) {
      r.push(`${id} estaba=${c.checked}`);
      if (c.checked) c.click();
    }
  }
  return r.join(' | ');
});
console.log('CASILLAS:', estado);
await page.waitForTimeout(6000);

// Buscar por la palabra clave
const caja = page.locator('input[name="filter-box"]').first();
if (await caja.count()) {
  await caja.fill('configuraciones');
  await page.waitForTimeout(7000);
}

const resultado = await page.evaluate(() => {
  const salida = [];
  // Cada propiedad se pinta como una fila con etiqueta, descripción y un input
  for (const fila of document.querySelectorAll('tr')) {
    const t = (fila.innerText || '').replace(/[\t\n]+/g, ' ').trim();
    if (t.length < 10 || t.length > 400) continue;
    if (!/clave|licencia|configuraciones|versionado/i.test(t)) continue;
    const inp = fila.querySelector('input,textarea');
    salida.push(`${t.slice(0, 200)} :: input id=${inp ? inp.id : '-'} name=${inp ? inp.name : '-'} valor="${inp ? (inp.value || '').slice(0, 30) : '-'}"`);
  }
  return [...new Set(salida)].slice(0, 15);
});
console.log('\n=== PROPIEDADES COINCIDENTES ===');
console.log(resultado.join('\n') || '(ninguna)');

// Secciones de la página, para ubicar el apartado correcto
const secciones = await page.evaluate(() =>
  [...document.querySelectorAll('h1,h2,h3,h4,legend,summary')]
    .map((e) => e.innerText.trim())
    .filter((t) => t && t.length < 80),
);
console.log('\n=== SECCIONES VISIBLES ===');
console.log([...new Set(secciones)].slice(0, 40).join(' | '));

await browser.close();
