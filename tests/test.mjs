/* Tests voor Reken je Rot! — draaien zonder browser.

   Gebruik:
     npm test                              → test de huidige code (de losse bestanden in js/)
     node tests/test.mjs --oud index.html  → test een oude, ongesplitste index.html
     … --bewaar                            → sla de "vingerafdruk" op als nieuwe vergelijkingsbasis

   Wat wordt er getest?
   1. Elke oefening maakt 200 keer een vraag: zonder NaN, met een antwoord dat past bij het soort vraag,
      en bij keuzevragen staat het goede antwoord ertussen.
   2. Alle oefening-ID's in KOPPELINGEN bestaan echt.
   3. Met vast "toeval" maken alle oefeningen precies dezelfde sommen als de opgeslagen vingerafdruk.
      Zo zien we meteen als het opsplitsen of opruimen per ongeluk het gedrag verandert. */

import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { controleerAlles, AANTAL } from './controle.mjs';
import { BEKEND } from './bekende-problemen.mjs';

const args = process.argv.slice(2);
const oudPad = args.includes('--oud') ? args[args.indexOf('--oud') + 1] : null;
const bewaar = args.includes('--bewaar');
const afdrukPad = fileURLToPath(new URL('./vingerafdruk.json', import.meta.url));

let bron;
if (oudPad) {
  const { laadOud } = await import('./laad-oud.mjs');
  bron = laadOud(oudPad);
  console.log(`Bron: oude ${oudPad}`);
} else {
  const { EX, CATS } = await import('../js/oefeningen.js');
  const { KOPPELINGEN } = await import('../js/koppelingen.js');
  bron = { EX, CATS, KOPPELINGEN, mathObj: Math };
  console.log('Bron: losse bestanden in js/');
}

const r = controleerAlles(bron);
let mislukt = false;

console.log(`\n1. ${r.aantalOefeningen} oefeningen, elk ${AANTAL} vragen gemaakt`);
const nieuw = r.fouten.filter(f => !BEKEND.has(`${f.id} | ${f.probleem}`));
const bekend = r.fouten.length - nieuw.length;
if (nieuw.length) {
  mislukt = true;
  console.log(`   ✗ ${nieuw.length} problemen:`);
  for (const f of nieuw) console.log(`     - ${f.id}: ${f.probleem}${f.voorbeeld ? `  (bv. "${f.voorbeeld}")` : ''}`);
} else console.log('   ✓ alle vragen in orde');
if (bekend) console.log(`   (${bekend} al bekende problemen overgeslagen, zie tests/bekende-problemen.mjs)`);

console.log(`\n2. Koppelingen`);
if (r.kapot.length) {
  mislukt = true;
  console.log(`   ✗ ${r.kapot.length} oefening-ID's bestaan niet:`);
  for (const k of r.kapot) console.log('     - ' + k);
} else console.log('   ✓ alle oefening-ID\'s bestaan');

console.log(`\n3. Vergelijken met de vingerafdruk`);
if (bewaar) {
  writeFileSync(afdrukPad, JSON.stringify(r.vingerafdruk, null, 1) + '\n');
  console.log('   ✓ vingerafdruk opgeslagen in tests/vingerafdruk.json');
} else if (!existsSync(afdrukPad)) {
  console.log('   – nog geen vingerafdruk (maak er een met --bewaar)');
} else {
  const oud = JSON.parse(readFileSync(afdrukPad, 'utf8'));
  const weg = Object.keys(oud).filter(id => !(id in r.vingerafdruk));
  const erbij = Object.keys(r.vingerafdruk).filter(id => !(id in oud));
  const anders = Object.keys(oud).filter(id => id in r.vingerafdruk && oud[id] !== r.vingerafdruk[id]);
  if (weg.length || erbij.length || anders.length) {
    mislukt = true;
    if (weg.length) console.log(`   ✗ verdwenen: ${weg.join(', ')}`);
    if (erbij.length) console.log(`   ✗ nieuw (nog niet in de vingerafdruk): ${erbij.join(', ')}`);
    if (anders.length) console.log(`   ✗ maken andere sommen dan voorheen: ${anders.join(', ')}`);
    console.log('   Is dat de bedoeling (bijvoorbeeld een nieuwe oefening)? Draai dan: npm test -- --bewaar');
  } else console.log('   ✓ alle oefeningen maken precies dezelfde sommen als voorheen');
}

console.log(mislukt ? '\n✗ TESTS MISLUKT\n' : '\n✓ ALLE TESTS GESLAAGD\n');
process.exit(mislukt ? 1 : 0);
