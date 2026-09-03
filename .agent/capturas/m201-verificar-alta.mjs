// Verifica el paso 1 del laboratorio M201-03: que el "+" de la cabecera abre un
// formulario en blanco de tipo de datos. Usa el clic de Playwright sobre el
// elemento visible (espera a que sea accionable) en lugar de coordenadas.
import { abrirNavegador, entrar, abrirMetamodelo, seccionMetamodelo, catalogador } from './lib201.mjs';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '201',
  lab: 'Personalización del modelo de requisitos de un proyecto de ingeniería',
  titulo: 'Personalización del modelo de requisitos',
  desde: 85,
});

async function estadoFormulario(etiqueta) {
  const e = await page.evaluate(() => {
    const editables = [...document.querySelectorAll('input[type=text],textarea')]
      .filter((x) => x.offsetParent !== null && !x.disabled && !x.readOnly)
      .map((x) => `${x.tagName} id=${x.id || '-'} valor="${(x.value || '').slice(0, 30)}"`);
    const radios = [...document.querySelectorAll('input[type=radio]')]
      .filter((r) => !r.disabled)
      .map((r) => {
        const l = document.querySelector(`label[for="${r.id}"]`);
        return `${l ? l.innerText.trim() : r.id}=${r.checked}`;
      });
    const acciones = [...document.querySelectorAll('button')]
      .filter((b) => b.offsetParent !== null && /Guardar|Cancelar/.test(b.innerText))
      .map((b) => `${b.innerText.trim()}${b.disabled ? '[apagado]' : '[activo]'}`);
    return { editables, radios, acciones };
  });
  console.log(`\n[${etiqueta}]`);
  console.log('  editables:', JSON.stringify(e.editables));
  console.log('  radios habilitados:', JSON.stringify(e.radios));
  console.log('  acciones:', JSON.stringify(e.acciones));
}

await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });
await abrirMetamodelo(page);
await seccionMetamodelo(page, 'Tipos de datos de atributo');
await estadoFormulario('antes de pulsar el +');

const boton = page.locator('[title="Tipo de datos nuevo..."]').locator('visible=true');
console.log('\nbotones visibles con ese título:', await boton.count());
await boton.first().click({ timeout: 20000 });
await page.waitForTimeout(9000);

await estadoFormulario('después de pulsar el +');
await captura('alta-tipo-datos', 'Formulario en blanco tras pulsar el botón de alta de tipo de datos');

await browser.close();
