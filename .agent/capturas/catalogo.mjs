// Genera CATALOGO-201.md a partir de manifest-201.json, agrupado por módulo.
import fs from 'fs';

const MANIFEST = new URL('./manifest-201.json', import.meta.url).pathname;
const SALIDA = new URL('./CATALOGO-201.md', import.meta.url).pathname;

const entradas = JSON.parse(fs.readFileSync(MANIFEST, 'utf8'));
const porModulo = new Map();
for (const e of entradas) {
  if (!porModulo.has(e.modulo)) porModulo.set(e.modulo, []);
  porModulo.get(e.modulo).push(e);
}

let md = '# Catálogo de capturas · DOORS Next 201\n\n';
md += 'Generado por `catalogo.mjs`. Las imágenes viven en `.agent/capturas/out-201/`;\n';
md += 'las que se aprueben se copian a `labs/img/201/` para el material autoguiado.\n\n';
md += `Total de capturas: **${entradas.length}** en ${porModulo.size} módulo(s).\n\n`;

for (const [modulo, lista] of [...porModulo.entries()].sort()) {
  md += `## ${modulo} · ${lista[0].titulo}\n\n`;
  md += `Laboratorio: ${lista[0].lab}\n\n`;
  md += '| # | Archivo | Qué muestra |\n|---|---|---|\n';
  for (const e of lista.sort((a, b) => a.orden - b.orden)) {
    md += `| ${e.orden} | \`${e.archivo}\` | ${e.descripcion} |\n`;
  }
  md += '\n';
}

fs.writeFileSync(SALIDA, md);
console.log(`CATALOGO-201.md generado: ${entradas.length} capturas.`);
