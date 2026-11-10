/* Tests voor de PWA-bestanden: staat alles wat de app nodig heeft in de offline-lijst van sw.js,
   bestaan de iconen uit manifest.json, en laadt index.html alle CSS-bestanden? */
import { readFileSync, readdirSync, existsSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const MAP = fileURLToPath(new URL('..', import.meta.url));
const lees = f => readFileSync(path.join(MAP, f), 'utf8');
function alleBestanden(map) {
  return readdirSync(path.join(MAP, map)).flatMap(n => {
    const p = map + '/' + n;
    return statSync(path.join(MAP, p)).isDirectory() ? alleBestanden(p) : [p];
  });
}

export function testPwa() {
  const fouten = [];
  const sw = lees('sw.js');
  const lijst = JSON.parse(sw.match(/const BESTANDEN = (\[[\s\S]*?\]);/)[1].replace(/'/g, '"').replace(/,\s*\]/, ']'))
    .map(b => b.replace(/^\.\//, '')).filter(Boolean);

  /* elk bestand van de app moet in de lijst staan */
  const nodig = ['index.html', 'manifest.json', ...alleBestanden('css'), ...alleBestanden('js'), ...alleBestanden('iconen')]
    .filter(f => !/(^|\/)\./.test(f));
  for (const f of nodig) if (!lijst.includes(f)) fouten.push(`sw.js: ${f} staat niet in BESTANDEN (dan werkt het offline niet)`);
  for (const f of lijst) if (!existsSync(path.join(MAP, f))) fouten.push(`sw.js: ${f} staat in BESTANDEN maar bestaat niet`);

  /* manifest */
  let manifest;
  try { manifest = JSON.parse(lees('manifest.json')); } catch (e) { fouten.push('manifest.json is geen geldige JSON: ' + e.message); }
  if (manifest) {
    for (const i of manifest.icons || []) if (!existsSync(path.join(MAP, i.src))) fouten.push(`manifest.json: icoon ${i.src} bestaat niet`);
    const maten = (manifest.icons || []).filter(i => i.type === 'image/png').map(i => i.sizes);
    for (const m of ['192x192', '512x512']) if (!maten.includes(m)) fouten.push(`manifest.json: PNG-icoon van ${m} ontbreekt (nodig voor Android)`);
    if (!(manifest.icons || []).some(i => i.purpose === 'maskable')) fouten.push('manifest.json: maskable icoon ontbreekt');
  }

  /* index.html */
  const html = lees('index.html');
  for (const f of alleBestanden('css')) if (!html.includes(`href="${f}"`)) fouten.push(`index.html laadt ${f} niet`);
  for (const f of ['manifest.json', 'iconen/apple-touch-icon.png', 'js/app.js']) if (!html.includes(`"${f}"`)) fouten.push(`index.html verwijst niet naar ${f}`);
  return fouten;
}
