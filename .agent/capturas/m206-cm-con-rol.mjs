// El botón "Habilitar gestión de configuraciones" estaba deshabilitado. Ahora que se
// conoce la causa del modo lectura (falta de rol), se comprueba si el rol
// "Administrador de configuración" lo desbloquea, o si de verdad hace falta la clave.
import { abrirNavegador, entrar, catalogador, BASE } from './lib201.mjs';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '206',
  lab: 'Gestion avanzada de configuraciones',
  titulo: 'Gestión avanzada de configuraciones',
  desde: 30,
});

const AREA = `${BASE}/rm/admin#action=com.ibm.team.process.editProjectArea&itemId=_qPXo4KdwEfGdNNHedQqJEw`;

await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });
await page.goto(AREA, { waitUntil: 'domcontentloaded', timeout: 60000 });
await page.waitForTimeout(15000);

await page.locator('a:has-text("Gestión de configuraciones")').first().click({ timeout: 15000 }).catch((e) => console.log('clic:', e.message.split('\n')[0]));
await page.waitForTimeout(10000);
await captura('cm-pestana', 'Pestaña de gestión de configuraciones del área de proyecto');

const estado = await page.evaluate(() => {
  const texto = document.body.innerText.replace(/[\t\n]+/g, ' | ');
  const i = texto.indexOf('configuraciones');
  const botones = [...document.querySelectorAll('button,a,input[type=button]')]
    .filter((b) => b.offsetParent !== null && /habilitar|configuraci/i.test(b.innerText || b.value || ''))
    .map((b) => {
      const r = b.getBoundingClientRect();
      return {
        etiqueta: (b.innerText || b.value || '').trim().slice(0, 60),
        deshabilitado: b.disabled === true || /disabled/.test((b.className || '').toString()),
        tam: `${Math.round(r.width)}x${Math.round(r.height)}`,
      };
    });
  return { fragmento: texto.slice(Math.max(0, i - 200), i + 700), botones };
});
console.log('TEXTO:', estado.fragmento);
console.log('\nBOTONES:', JSON.stringify(estado.botones, null, 1));

await browser.close();
