// Paso 1 del laboratorio 201: crear un tipo de datos enumerado.
// Caso: clasificación de criticidad software según IEC 62304 (clases A, B y C),
// coherente con la plantilla Medical Devices del proyecto.
import { abrirNavegador, entrar, abrirMetamodelo, seccionMetamodelo, catalogador } from './lib201.mjs';

const NOMBRE = 'Criticidad IEC 62304';
const VALORES = ['Clase A', 'Clase B', 'Clase C'];

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '201',
  lab: 'Personalización del modelo de requisitos de un proyecto de ingeniería',
  titulo: 'Personalización del modelo de requisitos',
  desde: 80,
});

const limpio = (s) => (s || '').replace(/[\t\n]+/g, ' ').trim();

await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });
await abrirMetamodelo(page);
await seccionMetamodelo(page, 'Tipos de datos de atributo');
await captura('tipos-datos-antes', 'Sección de tipos de datos de atributo, con los tipos que trae la plantilla');

await page.evaluate(() => {
  const b = [...document.querySelectorAll('button')].find(
    (x) => x.offsetParent !== null && /Tipo de datos nuevo/i.test(x.innerText || ''),
  );
  if (b) b.click();
});
await page.waitForTimeout(7000);
await captura('tipo-datos-form', 'Formulario de un tipo de datos nuevo, con las tres clases de valor');

// Rellenar el nombre: el input vive junto a la etiqueta "Nombre:"
const nombrePuesto = await page.evaluate((NOMBRE) => {
  const etiquetas = [...document.querySelectorAll('label,td,span,div')].filter(
    (e) => e.offsetParent !== null && /^Nombre:?\*?$/.test(e.innerText.trim()),
  );
  for (const et of etiquetas) {
    let cont = et.parentElement;
    for (let i = 0; i < 4 && cont; i += 1) {
      const inp = [...cont.querySelectorAll('input[type=text]')].find((x) => x.offsetParent !== null);
      if (inp) {
        inp.focus();
        inp.value = NOMBRE;
        inp.dispatchEvent(new Event('input', { bubbles: true }));
        inp.dispatchEvent(new Event('change', { bubbles: true }));
        return 'nombre escrito';
      }
      cont = cont.parentElement;
    }
  }
  return 'campo de nombre no localizado';
}, NOMBRE);
console.log('NOMBRE:', nombrePuesto);
await page.waitForTimeout(2500);

// Elegir "Lista enumerada de valores". Es un widget propio, no un radio nativo,
// así que hay que pulsar sobre su etiqueta.
let tipoElegido = 'no elegido';
for (const loc of [
  page.getByRole('radio', { name: /Lista enumerada/i }),
  page.locator('label:has-text("Lista enumerada de valores")'),
  page.getByText('Lista enumerada de valores', { exact: true }),
]) {
  if (await loc.count().catch(() => 0)) {
    await loc.first().click({ timeout: 8000, force: true }).catch((e) => console.log('  fallo:', e.message.split('\n')[0]));
    tipoElegido = 'pulsado';
    break;
  }
}
console.log('TIPO DE VALOR:', tipoElegido);
await page.waitForTimeout(5000);
await captura('tipo-datos-enumerado', 'Tipo de datos configurado como lista enumerada, con la tabla de valores');

// Ver qué controles aparecen para dar de alta los valores de la lista
const controles = await page.evaluate(() => {
  const etiqueta = (e) => (e.innerText || e.getAttribute('title') || e.getAttribute('aria-label') || '').trim();
  return [...document.querySelectorAll('button,a,img')]
    .filter((e) => e.offsetParent !== null && etiqueta(e).length > 0 && etiqueta(e).length < 40)
    .map((e) => `${e.tagName} "${etiqueta(e)}"`)
    .filter((s) => /añadir|nuevo|nueva|agregar|valor|\+/i.test(s));
});
console.log('CONTROLES DE VALORES:', JSON.stringify([...new Set(controles)]));
console.log('\nPANTALLA:', limpio(await page.locator('body').innerText()).slice(-700));

await browser.close();
