// Crea el área de proyecto de DOORS Next y comprueba si la gestión de configuraciones
// (componentes, streams, baselines, change sets) queda disponible sin GCM instalado.
import { abrirNavegador, entrar, catalogador, BASE } from './lib201.mjs';

const NOMBRE = 'Validacion 201';

const { browser, page } = await abrirNavegador();
const captura = catalogador(page, {
  modulo: '206',
  lab: 'Gestión de configuraciones: componentes, streams, baselines y change sets',
  titulo: 'Gestión avanzada de configuraciones',
  desde: 20,
});

const limpio = (s) => (s || '').replace(/[\t\n]+/g, ' ').trim();

await entrar(page, { app: 'rm', usuario: 'formador', clave: 'formador' });

await page.goto(`${BASE}/rm/admin#action=com.ibm.team.process.editProjectArea&itemId=new`, {
  waitUntil: 'domcontentloaded',
  timeout: 60000,
});
await page.waitForTimeout(11000);

await page.fill('input[name="name"]', NOMBRE);
await page.fill('input[name="summary"]', 'Area de pruebas para validar los laboratorios del curso 201');
await page.waitForTimeout(1500);
await captura('area-rellena', `Formulario de área de proyecto rellenado con "${NOMBRE}" y la plantilla de Gestión de requisitos`);

// Buscar cualquier opción de gestión de configuraciones antes de guardar
const opcionesCM = await page.evaluate(() => {
  const txt = document.body.innerText;
  const encontrado = [];
  for (const patron of [/gesti[oó]n de configuraci\w*/gi, /configuration management/gi, /componente/gi]) {
    const m = txt.match(patron);
    if (m) encontrado.push(...new Set(m.map((x) => x.toLowerCase())));
  }
  return [...new Set(encontrado)];
});
console.log('MENCIONES A CM EN EL FORMULARIO:', JSON.stringify(opcionesCM));

await page.locator('button:has-text("Guardar"), a:has-text("Guardar")').first().click({ timeout: 20000 })
  .catch((e) => console.log('error Guardar:', e.message.split('\n')[0]));

// La creación del área tarda: despliega la plantilla y crea el componente inicial
for (let i = 0; i < 40; i += 1) {
  await page.waitForTimeout(3000);
  const t = await page.locator('body').innerText().catch(() => '');
  if (/creada|creado|guardad|Explorar|Miembros/i.test(t) && !/Guardando/i.test(t)) break;
}
await page.waitForTimeout(6000);
await captura('area-creada', 'Área de proyecto creada, con sus secciones de miembros y administradores');
console.log('TRAS GUARDAR:', limpio(await page.locator('body').innerText()).slice(0, 700));

// Comprobar el área desde el listado
await page.goto(`${BASE}/rm/admin#action=jazz.viewPage&id=com.ibm.team.process.ProjectAreaManagement`, {
  waitUntil: 'domcontentloaded',
  timeout: 60000,
});
await page.waitForTimeout(9000);
console.log('LISTADO:', limpio(await page.locator('body').innerText()).slice(0, 600));
await captura('areas-con-proyecto', 'Listado de áreas de proyecto con la del curso ya creada');

await browser.close();
