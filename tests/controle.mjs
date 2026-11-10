/* Controles op oefeningen en koppelingen.
   Deze functies weten niet waar de code vandaan komt: ze krijgen EX en KOPPELINGEN aangereikt.
   Zo kunnen we dezelfde controles draaien op de oude index.html én op de nieuwe losse bestanden. */

import { createHash } from 'node:crypto';

export const AANTAL = 200;   // zo vaak laten we elke oefening een vraag maken

/* Hetzelfde als parseAnswer in de sommen-speler: wat een kind intypt → getal */
function parseAnswer(s) {
  s = String(s).trim().replace(/[€%]/g, '').replace(/\s+/g, ' ').replace(/,/g, '.').trim();
  let m;
  if ((m = s.match(/^(\d+) (\d+)\/(\d+)$/))) return +m[1] + m[2] / m[3];
  if ((m = s.match(/^(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/))) return +m[2] === 0 ? NaN : m[1] / m[2];
  if (/^\d*\.?\d+$|^\d+\.$/.test(s)) return parseFloat(s);
  return NaN;
}
const same = (a, b) => Math.abs(a - b) < 1e-6;
const isNum = x => typeof x === 'number' && Number.isFinite(x);
const isInt = x => Number.isInteger(x);

/* Kan een kind dit getal op het toetsenblok intypen? (geen min-teken, hooguit 12 tekens) */
function typbaar(v) {
  if (!isNum(v) || v < 0) return false;
  const s = String(Math.round(v * 1e6) / 1e6).replace('.', ',');
  return s.length <= 12 && same(parseAnswer(s), v);
}

/* Kan je dit bedrag (in centen) precies betalen met deze munten en briefjes? */
function betaalbaar(bedrag, geld) {
  const kan = new Array(bedrag + 1).fill(false);
  kan[0] = true;
  for (let i = 1; i <= bedrag; i++) kan[i] = geld.some(c => c <= i && kan[i - c]);
  return kan[bedrag];
}

/* Geeft een lijst met problemen terug voor één vraag (leeg = goed) */
export function controleerVraag(q) {
  const p = [];
  if (!q || typeof q !== 'object') return ['geen vraag-object'];
  for (const veld of ['q', 'a', 'hint', 'vis']) {
    const w = q[veld];
    if (w == null) continue;
    if (typeof w !== 'string' && typeof w !== 'number') { p.push(`${veld} is geen tekst`); continue; }
    if (/NaN|undefined|Infinity|\[object /.test(String(w))) p.push(`${veld} bevat "${String(w).match(/NaN|undefined|Infinity|\[object /)[0]}"`);
  }
  if (typeof q.q !== 'string' || !q.q.trim()) p.push('vraagtekst ontbreekt');
  if (q.a == null || String(q.a) === '') p.push('antwoord (a) ontbreekt');

  switch (q.type) {
    case 'num':
      if (!typbaar(q.v)) p.push(`antwoord ${q.v} is niet in te typen`);
      break;
    case 'multi': {
      if (!Array.isArray(q.blanks) || !q.blanks.length) { p.push('geen invulvakjes'); break; }
      q.blanks.forEach((b, i) => { if (!typbaar(b)) p.push(`invulvak ${i}: ${b} is niet in te typen`); });
      const tekst = String(q.q) + String(q.vis || '');
      q.blanks.forEach((_, i) => { if (!tekst.includes(`{{${i}}}`)) p.push(`invulvak {{${i}}} staat niet in de vraag`); });
      break;
    }
    case 'choice':
      if (!Array.isArray(q.choices) || q.choices.length < 2) p.push('te weinig keuzes');
      else {
        if (!q.choices.includes(q.ans)) p.push('goede antwoord staat niet tussen de keuzes');
        if (new Set(q.choices).size !== q.choices.length) p.push('dubbele keuzes');
      }
      break;
    case 'order':
      if (!Array.isArray(q.items) || q.items.length < 2) p.push('te weinig dingen om te ordenen');
      else if (!Array.isArray(q.sorted) || q.sorted.length !== q.items.length
        || [...q.items].sort().join('\u0000') !== [...q.sorted].sort().join('\u0000')) p.push('juiste volgorde past niet bij de items');
      break;
    case 'line':
      if (!isNum(q.min) || !isNum(q.max) || !(q.min < q.max)) p.push('getallenlijn heeft geen geldig begin/eind');
      else if (!isNum(q.v) || q.v < q.min || q.v > q.max) p.push(`antwoord ${q.v} ligt niet op de lijn ${q.min}–${q.max}`);
      break;
    case 'clock':
      if (!isInt(q.h) || q.h < 1 || q.h > 12) p.push(`uur ${q.h} ongeldig`);
      if (!isInt(q.m) || q.m < 0 || q.m > 59) p.push(`minuten ${q.m} ongeldig`);
      else if (q.step < 60 ? q.m % q.step : q.m !== 0) p.push(`minuten ${q.m} niet te zetten met stap ${q.step}`);
      break;
    case 'count':
      if (!isInt(q.n) || q.n < 0 || q.n > q.max) p.push(`aantal ${q.n} ongeldig (max ${q.max})`);
      break;
    case 'pay':
      if (!isInt(q.amount) || q.amount <= 0) p.push(`bedrag ${q.amount} ongeldig`);
      else if (q.amount > 100000 || !betaalbaar(q.amount, q.money)) p.push(`bedrag ${q.amount} niet precies te betalen`);
      break;
    case 'colour':
      if (!isInt(q.cells) || !isInt(q.n) || q.n < 0 || q.n > q.cells) p.push(`${q.n} van ${q.cells} vakjes ongeldig`);
      break;
    default:
      p.push(`onbekend vraagtype "${q.type}"`);
  }
  return p;
}

/* Voorspelbaar toeval: met hetzelfde startgetal komen steeds dezelfde sommen.
   Zo kunnen we oude en nieuwe code precies vergelijken. */
function seeded(seed) {
  return () => {
    seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
/* Getallen met heel veel cijfers achter de komma (bv. in de klok- en cirkelplaatjes) kunnen op een
   Linux-computer (GitHub) in het allerlaatste cijfer anders uitkomen dan op een Mac.
   Voor de vingerafdruk ronden we die af op 6 cijfers achter de komma. */
const gelijkmaken = tekst => tekst.replace(/\d+\.\d{7,}/g, g => String(Math.round(+g * 1e6) / 1e6));
const hashString = s => [...s].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) | 0, 7);

/* Draai alle controles. mathObj = het Math-object dat de oefeningen gebruiken (om toeval vast te zetten). */
export function controleerAlles({ EX, CATS, KOPPELINGEN, mathObj }) {
  const fouten = [];                 // { id, probleem, voorbeeld }
  const vingerafdruk = {};           // id → hash van de gemaakte vragen (voor vergelijken oud/nieuw)
  const echteRandom = mathObj.random;
  const ids = Object.keys(EX).sort();

  for (const id of ids) {
    const per = new Map();
    const h = createHash('sha1');
    mathObj.random = seeded(hashString(id));
    for (let i = 0; i < AANTAL; i++) {
      let q;
      try { q = EX[id].gen(); } catch (e) { per.set('crasht: ' + e.message, null); break; }
      h.update(gelijkmaken(JSON.stringify(q) || ''));
      for (const pr of controleerVraag(q)) if (!per.has(pr)) per.set(pr, q);
    }
    for (const [probleem, q] of per) fouten.push({ id, probleem, voorbeeld: q && (q.q || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 80) });
    vingerafdruk[id] = h.digest('hex').slice(0, 12);
  }
  mathObj.random = echteRandom;
  /* ook de volgorde van de categorieën in de app moet gelijk blijven */
  vingerafdruk['(volgorde categorieën)'] = CATS.map(c => c.id).join(' ');

  const kapot = [];
  for (const k of KOPPELINGEN) for (const s of k.sections || []) for (const it of s.items || [])
    for (const x of it.ids || []) if (!EX[x]) kapot.push(`${k.id} › groep ${s.groep} › ${s.title} › "${it.label}": ${x}`);

  return { aantalOefeningen: ids.length, fouten, kapot, vingerafdruk };
}
