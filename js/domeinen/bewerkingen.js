/* Bewerkingen: plus/min, keer en delen (automatiseren + getallen).
   Categorieën: plusmin, keer, delen, bplusmin, bkeer, bdelen.
   Alle globale namen beginnen met bw_. */
import { defCat, dots, multi, nl, num, pick, plaatjes, R, round, shuffle, splitshuis } from '../kern.js';

/* ===================== hulpjes ===================== */
const bw_M = '−';
const bw_GAT = '…';
const bw_EMOJI = ['🍎', '⭐', '🐞', '🍓', '🚗', '🎈', '🐟', '🌻', '🧁', '⚽'];
/* getal tonen: duizendtal-punten vanaf 10.000 (zoals het antwoord) */
const bw_F = n => nl(n, n >= 10000);
/* kommagetal met vast aantal decimalen */
const bw_dec = (n, d) => n.toFixed(d).replace('.', ',');
/* probeer fn tot ok(x); anders fallback */
function bw_gen(fn, ok, fb) {
  for (let i = 0; i < 400; i++) { const x = fn(); if (ok(x)) return x; }
  return fb;
}
const bw_digits = n => String(n).split('').reverse().map(Number);
/* is er bij a + b ergens een overschrijding (onthouden)? */
function bw_carry(a, b) {
  const x = bw_digits(a), y = bw_digits(b);
  for (let i = 0; i < Math.max(x.length, y.length); i++) if ((x[i] || 0) + (y[i] || 0) >= 10) return true;
  return false;
}
/* moet je bij a − b ergens lenen? */
function bw_borrow(a, b) {
  const x = bw_digits(a), y = bw_digits(b);
  for (let i = 0; i < y.length; i++) if ((x[i] || 0) < y[i]) return true;
  return false;
}
const bw_UNIT = { 1: ['tiental', 'eenheden'], 10: ['honderdtal', 'tientallen'], 100: ['duizendtal', 'honderdtallen'] };

/* Hint voor a + b. u = 1 (tot 100), 10 (tientallen), 100 (honderdtallen) */
function bw_hintPlus(a, b, u = 1) {
  const T = 10 * u, [tien, eenh] = bw_UNIT[u];
  if (b < T) {
    if (a % T + b > T) { const vol = T - a % T, n = a + vol; return `Maak eerst het ${tien} vol: ${bw_F(a)} + ${bw_F(vol)} = ${bw_F(n)}. Dan nog ${bw_F(b - vol)} erbij.`; }
    if (a % T + b === T) return `${bw_F(a % T)} en ${bw_F(b)} zijn samen precies een ${tien}. Welk ${tien} komt na ${bw_F(a)}?`;
    if (a >= T) return `Kijk alleen naar de ${eenh}: ${bw_F(a % T)} + ${bw_F(b)} = ${bw_F(a % T + b)}. De rest (${bw_F(a - a % T)}) blijft hetzelfde.`;
    return `Begin bij ${bw_F(Math.max(a, b))} en tel ${bw_F(Math.min(a, b))} verder.`;
  }
  if (b % T === 0) return `Er komen ${b / T} ${b / T === 1 ? tien : tien === 'tiental' ? 'tientallen' : tien === 'honderdtal' ? 'honderdtallen' : 'duizendtallen'} bij. Spring vanaf ${bw_F(a)} in sprongen van ${bw_F(T)}.`;
  const groot = b - b % T;
  return `Rijgen: eerst ${bw_F(a)} + ${bw_F(groot)} = ${bw_F(a + groot)}. Doe er dan nog ${bw_F(b % T)} bij.`;
}
/* Hint voor a − b */
function bw_hintMin(a, b, u = 1) {
  const T = 10 * u, [tien, eenh] = bw_UNIT[u];
  if (b < T) {
    if (b > a % T && a >= T) { const st = a % T, n = a - st; return `Spring eerst terug naar het ${tien}: ${bw_F(a)} ${bw_M} ${bw_F(st)} = ${bw_F(n)}. Dan nog ${bw_F(b - st)} eraf.`; }
    if (a >= T) return `Kijk alleen naar de ${eenh}: ${bw_F(a % T)} ${bw_M} ${bw_F(b)} = ${bw_F(a % T - b)}. De rest (${bw_F(a - a % T)}) blijft hetzelfde.`;
    return `Begin bij ${bw_F(a)} en tel ${bw_F(b)} terug.`;
  }
  if (b % T === 0) return `Er gaan ${b / T} ${b / T === 1 ? tien : tien === 'tiental' ? 'tientallen' : tien === 'honderdtal' ? 'honderdtallen' : 'duizendtallen'} af. Spring vanaf ${bw_F(a)} terug in sprongen van ${bw_F(T)}.`;
  const groot = b - b % T;
  return `Rijgen: eerst ${bw_F(a)} ${bw_M} ${bw_F(groot)} = ${bw_F(a - groot)}. Haal er dan nog ${bw_F(b % T)} af.`;
}
const bw_qp = (a, b) => `${bw_F(a)} + ${bw_F(b)} = ${bw_GAT}`;
const bw_qm = (a, b) => `${bw_F(a)} ${bw_M} ${bw_F(b)} = ${bw_GAT}`;
function bw_plusQ(a, b, u, o) { return num(bw_qp(a, b), a + b, bw_hintPlus(a, b, u), o); }
function bw_minQ(a, b, u, o) { return num(bw_qm(a, b), a - b, bw_hintMin(a, b, u), o); }

/* ===================== plaatjes ===================== */
/* plussom met twee groepjes plaatjes */
function bw_picPlus(a, b, e) {
  return `<div class="bw-pics">${plaatjes(a, e, 5)}<span class="bw-op">+</span>${plaatjes(b, e, 5)}</div>`;
}
/* minsom: a plaatjes, de laatste b zijn weggestreept */
function bw_picMin(a, b, e) {
  let s = '<div class="bw-pics"><div class="bw-rij">';
  for (let i = 0; i < a; i++) s += `<span class="${i >= a - b ? 'bw-weg' : ''}">${e}</span>`;
  return s + '</div></div>';
}
/* a groepjes van b plaatjes */
function bw_groepjes(a, b, e) {
  let s = '<div class="bw-groepen">';
  for (let i = 0; i < a; i++) s += `<div class="bw-groep">${e.repeat(b)}</div>`;
  return s + '</div>';
}
/* cijferen: getallen onder elkaar */
function bw_col(nums, op) {
  const str = nums.map(String), w = Math.max(...str.map(s => s.length));
  let s = '<table class="bw-col" aria-label="cijfersom">';
  str.forEach((t, i) => {
    s += `<tr><td class="bw-o">${i === str.length - 1 ? op : ''}</td>`;
    const pad = ' '.repeat(w - t.length) + t;
    for (const c of pad) s += `<td>${c === ' ' ? '' : c}</td>`;
    s += '</tr>';
  });
  s += `<tr class="bw-ans"><td class="bw-o"></td>${'<td></td>'.repeat(w - 1)}<td>?</td></tr>`;
  return s + '</table>';
}
/* staartdeling (Nederlandse notatie: deler / deeltal \ uitkomst) */
function bw_staart(n, d) {
  return `<div class="bw-staart"><span>${d}</span><span class="bw-sl">/</span><span>${n}</span><span class="bw-sl">\\</span><span class="bw-q">?</span></div>`;
}

/* ===================== plus en min generators ===================== */
/* tot 6 / tot 10 */
function bw_plusTot(max, vis) {
  const s = R(2, max), a = R(1, s - 1), b = s - a, e = pick(bw_EMOJI);
  return num(bw_qp(a, b), s, `Begin bij ${Math.max(a, b)} en tel ${Math.min(a, b)} verder. Je mag je vingers gebruiken.`,
    vis === 'pic' ? { vis: bw_picPlus(a, b, e) } : vis === 'dots' ? { vis: dots(a, b) } : {});
}
function bw_minTot(max, vis) {
  const a = R(2, max), b = R(1, a - 1), e = pick(bw_EMOJI);
  return num(bw_qm(a, b), a - b, vis === 'pic' ? `Tel de plaatjes die niet zijn weggestreept.` : `Begin bij ${a} en tel ${b} terug.`,
    vis === 'pic' ? { vis: bw_picMin(a, b, e) } : vis === 'dots' ? { vis: dots(a, b, true) } : {});
}
function bw_splitsTot(min, max) {
  const t = R(min, max), l = R(1, t - 1);
  return num(`${t} = ${l} + ${bw_GAT}`, t - l, `Hoeveel moet je bij ${l} doen om ${t} te krijgen? Tel verder vanaf ${l} tot ${t}.`, { vis: splitshuis(t, l, '?') });
}
function bw_stipPlus(max) {
  const s = R(3, max), a = R(1, s - 1);
  return num(`${a} + ${bw_GAT} = ${s}`, s - a, `Tel verder van ${a} tot ${s}. Hoeveel stappen zet je?`, { vis: splitshuis(s, a, '?') });
}
function bw_stipMin(max) {
  const a = R(3, max), b = R(1, a - 1), u = a - b;
  return num(`${a} ${bw_M} ${bw_GAT} = ${u}`, b, `Tel terug van ${a} naar ${u}. Hoeveel stappen zet je? Of denk: ${u} + ${bw_GAT} = ${a}.`);
}
function bw_stipMix(max) { return Math.random() < 0.6 ? bw_stipPlus(max) : bw_stipMin(max); }
function bw_verdwijn(lo, hi) {
  const a = R(lo, hi), b = a - pick([0, 1, 1, 2, 2]);
  return num(bw_qm(a, b), a - b, b === a ? `Je haalt er net zoveel af als er is. Wat blijft er over?` : `${b} is bijna net zoveel als ${a}. Tel van ${b} naar ${a}: hoeveel stapjes?`);
}
/* tot 20 */
function bw_dubbel() {
  const n = R(2, 10);
  return num(`${n} + ${n} = ${bw_GAT}`, 2 * n, n > 5 ? `Splits ${n} in 5 en ${n - 5}. 5 + 5 = 10 en ${n - 5} + ${n - 5} = ${2 * (n - 5)}. Tel ze op.` : `Dubbel ${n} is ${n} en nog eens ${n}. Tel verder vanaf ${n}.`, { vis: dots(n, n) });
}
function bw_plus20bin() { const a = R(10, 18), b = R(1, 19 - a); return bw_plusQ(a, b, 1); }
function bw_min20bin() { const a = R(11, 19), b = R(1, a % 10); return bw_minQ(a, b, 1); }
function bw_plus20over() { const a = R(2, 9), b = R(11 - a, 9); return num(bw_qp(a, b), a + b, `Maak eerst 10: ${a} + ${10 - a} = 10. Dan nog ${b - (10 - a)} erbij.`, { vis: dots(a, b) }); }
function bw_min20over() { const a = R(11, 18), b = R(a - 9, 9); return num(bw_qm(a, b), a - b, `Spring eerst terug naar 10: ${a} ${bw_M} ${a - 10} = 10. Dan nog ${b - (a - 10)} eraf.`, { vis: dots(a, b, true) }); }
function bw_min20boven() { const a = R(12, 20), b = R(11, a - 1); return num(bw_qm(a, b), a - b, `Haal eerst 10 eraf: ${a} ${bw_M} 10 = ${a - 10}. Dan nog ${b - 10} eraf.`); }
/* tot 100 */
function bw_plus100bin() { const a = bw_gen(() => R(11, 98), x => x % 10 < 9, 32); const b = R(1, 9 - a % 10); return bw_plusQ(a, b, 1); }
function bw_min100bin() { const a = bw_gen(() => R(21, 99), x => x % 10 > 0, 86); const b = R(1, a % 10); return bw_minQ(a, b, 1); }
function bw_plus100over() { const a = bw_gen(() => R(12, 89), x => x % 10 > 1, 47); const b = R(11 - a % 10, 9); return bw_plusQ(a, b, 1); }
function bw_min100over() { const a = bw_gen(() => R(21, 98), x => x % 10 < 8, 65); const b = R(a % 10 + 1, 9); return bw_minQ(a, b, 1); }
function bw_tienPlus() { const a = R(11, 89), b = 10 * R(1, Math.floor((99 - a) / 10)); return bw_plusQ(a, b, 1); }
function bw_tienMin() { const a = R(21, 99), b = 10 * R(1, Math.floor(a / 10) - 1); return bw_minQ(a, b, 1); }
function bw_eenPlus() {
  const [a, b] = bw_gen(() => [R(11, 88), R(11, 88)], ([x, y]) => x + y < 100 && x % 10 + y % 10 < 10 && y % 10 > 0, [21, 36]);
  return bw_plusQ(a, b, 1);
}
function bw_eenMin() {
  const [a, b] = bw_gen(() => [R(22, 99), R(11, 88)], ([x, y]) => y < x && y % 10 > 0 && y % 10 <= x % 10, [76, 42]);
  return bw_minQ(a, b, 1);
}
function bw_eenOverPlus() {
  const [a, b] = bw_gen(() => [R(12, 79), R(12, 79)], ([x, y]) => x + y < 100 && x % 10 + y % 10 > 10, [38, 29]);
  return bw_plusQ(a, b, 1);
}
function bw_eenOverMin() {
  const [a, b] = bw_gen(() => [R(31, 98), R(12, 89)], ([x, y]) => y < x - 9 && y % 10 > x % 10, [62, 38]);
  return bw_minQ(a, b, 1);
}
/* tot 1000. kind: h, tb, to, htb, hto, hte, alle; op: '+' of '-' */
function bw_1000(kind, op) {
  let a, b;
  const p = op === '+';
  if (kind === 'h') {
    if (p) { b = 100 * R(1, 8); a = R(101, 999 - b); }
    else { a = R(201, 999); b = 100 * R(1, Math.floor(a / 100) - 1 || 1); }
    const ah = Math.floor(a / 100);
    return num(p ? bw_qp(a, b) : bw_qm(a, b), p ? a + b : a - b, `Alleen de honderdtallen veranderen: ${ah} honderd ${p ? '+' : bw_M} ${b / 100} honderd. De ${a % 100} achteraan blijft hetzelfde.`);
  }
  if (kind === 'tb' || kind === 'to') {
    const over = kind === 'to';
    [a, b] = bw_gen(() => [10 * R(10, 98), 10 * R(1, 9)], ([x, y]) => {
      const t = (x / 10) % 10, s = y / 10;
      if (x % 100 === 0) return false;
      if (p) return x + y < 1000 && (over ? t + s > 10 : t + s < 10);
      return x - y >= 100 && (over ? s > t : s < t);
    }, p ? (over ? [170, 50] : [130, 40]) : (over ? [430, 80] : [280, 60]));
    return p ? bw_plusQ(a, b, 10) : bw_minQ(a, b, 10);
  }
  if (kind === 'htb' || kind === 'hto' || kind === 'hte') {
    const over = kind === 'hto';
    [a, b] = bw_gen(() => [kind === 'hte' ? R(101, 989) : 10 * R(11, 98), 10 * R(11, 89)], ([x, y]) => {
      if (y % 100 === 0 || (kind !== 'hte' && x % 100 === 0)) return false;
      if (kind === 'hte' && x % 10 === 0) return false;
      const tx = Math.floor(x / 10) % 10, ty = (y / 10) % 10;
      if (p) return x + y < 1000 && (over ? tx + ty > 10 : tx + ty < 10);
      return x - y >= 100 && (over ? ty > tx : ty < tx);
    }, p ? (over ? [350, 580] : kind === 'hte' ? [152, 230] : [350, 640]) : (over ? [810, 350] : kind === 'hte' ? [763, 340] : [880, 350]));
    const bh = b - b % 100, bt = b % 100, s = p ? a + bh : a - bh;
    const hint = p ? `Eerst de honderdtallen: ${a} + ${bh} = ${s}. Doe er dan nog ${bt} bij.` + (over ? ` Maak het honderdtal eerst vol!` : '')
      : `Eerst de honderdtallen: ${a} ${bw_M} ${bh} = ${s}. Haal er dan nog ${bt} af.` + (over ? ` Spring eerst terug naar het honderdtal!` : '');
    return num(p ? bw_qp(a, b) : bw_qm(a, b), p ? a + b : a - b, hint);
  }
  /* alle */
  if (p) { a = R(10, 900); b = R(10, 1000 - a); }
  else { a = R(100, 1000); b = R(10, a - 1); }
  const bh = b - b % 100, rest = b % 100;
  const hint = bh && rest ? (p ? `Rijgen: eerst ${a} + ${bh} = ${a + bh}. Doe er dan nog ${rest} bij (eerst de tientallen, dan de eenheden).`
    : `Rijgen: eerst ${a} ${bw_M} ${bh} = ${a - bh}. Haal er dan nog ${rest} af (eerst de tientallen, dan de eenheden).`)
    : (p ? bw_hintPlus(a, b, 1) : bw_hintMin(a, b, 1));
  return num(p ? bw_qp(a, b) : bw_qm(a, b), p ? a + b : a - b, hint);
}
const bw_pm = () => (Math.random() < 0.5 ? '+' : '-');

/* ===================== groter dan 1000 ===================== */
function bw_h10k() {
  if (Math.random() < 0.5) { const a = 100 * R(10, 85), b = 100 * R(10, 99 - a / 100); return num(`${bw_F(a)} + ${bw_F(b)} = ${bw_GAT}`, a + b, `Reken met honderdtallen: ${a / 100} + ${b / 100} honderd. Of rijg: eerst ${bw_F(a)} + ${bw_F(b - b % 1000)}, dan de honderdtallen erbij.`); }
  const a = 100 * R(25, 99), b = 100 * R(10, a / 100 - 5);
  return num(`${bw_F(a)} ${bw_M} ${bw_F(b)} = ${bw_GAT}`, a - b, `Reken met honderdtallen: ${a / 100} ${bw_M} ${b / 100} honderd. Of rijg: eerst ${bw_F(a)} ${bw_M} ${bw_F(b - b % 1000)}, dan de honderdtallen eraf.`);
}
function bw_h1m() {
  if (Math.random() < 0.5) {
    const a = 100 * R(100, 8000), b = 100 * R(100, Math.min(8000, 9990 - a / 100));
    return num(`${bw_F(a)} + ${bw_F(b)} = ${bw_GAT}`, a + b, `Splits het tweede getal: eerst ${bw_F(a)} + ${bw_F(b - b % 1000)} = ${bw_F(a + b - b % 1000)}. Doe er dan nog ${bw_F(b % 1000)} bij.`);
  }
  const a = 100 * R(2000, 9999), b = 100 * R(100, a / 100 - 500);
  return num(`${bw_F(a)} ${bw_M} ${bw_F(b)} = ${bw_GAT}`, a - b, `Splits het tweede getal: eerst ${bw_F(a)} ${bw_M} ${bw_F(b - b % 1000)} = ${bw_F(a - (b - b % 1000))}. Haal er dan nog ${bw_F(b % 1000)} af.`);
}
function bw_posSom(len) {
  const n = bw_gen(() => R(10 ** (len - 1), 10 ** len - 1), x => {
    const d = bw_digits(x), z = d.filter(c => c === 0).length;
    return len === 4 ? z <= 1 : z >= 1 && z <= 3;
  }, len === 4 ? 5633 : 243003);
  const parts = bw_digits(n).map((c, i) => c * 10 ** i).filter(x => x > 0);
  return num(shuffle(parts).map(bw_F).join(' + ') + ` = ${bw_GAT}`, n,
    `Zet de stukjes op volgorde van groot naar klein. Kijk bij elk stukje: is het een eenheid, tiental, honderdtal, duizendtal…? Vergeet niet een 0 te schrijven als er een plek leeg is.`);
}

/* ===================== kommagetallen plus/min ===================== */
/* d = 1, 2 of 3 decimalen */
function bw_komma(d) {
  const p = Math.random() < 0.5;
  const D = 10 ** d;
  let A, B, da, db;
  if (d === 1) { A = R(11, 99); B = bw_gen(() => R(11, 99), x => x % 10 !== 0, 29); da = db = 1; }
  else if (d === 2) { A = R(101, 999); da = 2; db = pick([1, 2]); B = db === 1 ? 10 * R(11, 99) : R(101, 999); }
  else { A = R(1001, 9999); da = 3; db = pick([1, 2, 3]); B = db === 1 ? 100 * R(1, 30) : db === 2 ? 10 * R(11, 300) : R(101, 3000); }
  if (A % 10 === 0) A += 1;
  if (!p && B >= A) { const t = A; A = B; B = t; [da, db] = [db, da]; }
  if (!p && B === A) B = A - 1, db = d;
  const a = A / D, b = B / D, show = (x, k) => bw_dec(x, k);
  const v = round(p ? a + b : a - b, 3);
  const q = `${show(a, da)} ${p ? '+' : bw_M} ${show(b, db)} = ${bw_GAT}`;
  const hint = (da !== db ? `Maak eerst evenveel cijfers achter de komma: ${show(a, d)} ${p ? '+' : bw_M} ${show(b, d)}. ` : '')
    + (p ? `Tel eerst de helen bij elkaar, daarna wat achter de komma staat. Kom je bij de tienden op 10 of meer? Dan wissel je 10 tienden in voor een hele.`
      : `Haal eerst de helen eraf, daarna wat achter de komma staat. Kom je tekort? Wissel dan een hele in voor 10 tienden.`);
  return num(q, v, hint);
}

/* ===================== cijferen plus/min ===================== */
function bw_cijferQ(a, b, p) {
  const v = p ? a + b : a - b;
  const da = a % 10, db = b % 10;
  const hint = p
    ? `Zet de getallen recht onder elkaar en begin rechts bij de eenheden: ${da} + ${db} = ${da + db}.${da + db >= 10 ? ` Schrijf ${(da + db) % 10} op en onthoud 1 voor de tientallen.` : ''} Ga daarna naar links: tientallen, honderdtallen…`
    : `Begin rechts bij de eenheden: ${da} ${bw_M} ${db}.${db > da ? ` Dat kan niet, dus leen 1 tiental: ${da + 10} ${bw_M} ${db} = ${da + 10 - db}.` : ''} Ga daarna naar links: tientallen, honderdtallen… Vergeet niet wat je geleend hebt.`;
  return num(`Reken uit onder elkaar: ${bw_F(a)} ${p ? '+' : bw_M} ${bw_F(b)} = ${bw_GAT}`, v, hint, { vis: bw_col([a, b], p ? '+' : bw_M) });
}
const bw_hasZero = n => String(n).indexOf('0') >= 0;
function bw_cijfer(kind) {
  let a, b;
  switch (kind) {
    case 'pzonder': [a, b] = bw_gen(() => [R(100, 888), R(100, 888)], ([x, y]) => !bw_carry(x, y) && x + y < 1000, [324, 152]); return bw_cijferQ(a, b, true);
    case 'pmet': [a, b] = bw_gen(() => [R(100, 899), R(100, 899)], ([x, y]) => bw_carry(x, y) && x + y < 1000, [367, 258]); return bw_cijferQ(a, b, true);
    case 'pnul': [a, b] = bw_gen(() => [R(100, 899), R(100, 899)], ([x, y]) => x + y < 1000 && bw_hasZero(x + y) && !bw_hasZero(x) && !bw_hasZero(y) && bw_carry(x, y), [457, 348]); return bw_cijferQ(a, b, true);
    case 'p10k': [a, b] = bw_gen(() => [R(1000, 8999), R(100, 8999)], ([x, y]) => x + y < 10000 && bw_carry(x, y), [4568, 2795]); return bw_cijferQ(a, b, true);
    case 'pgroot': [a, b] = bw_gen(() => [R(10000, 600000), R(1000, 400000)], ([x, y]) => bw_carry(x, y), [45678, 27955]); return bw_cijferQ(a, b, true);
    case 'mzonder': [a, b] = bw_gen(() => [R(200, 999), R(100, 899)], ([x, y]) => y < x - 99 && !bw_borrow(x, y), [576, 243]); return bw_cijferQ(a, b, false);
    case 'mmet': [a, b] = bw_gen(() => [R(200, 999), R(100, 899)], ([x, y]) => y < x && bw_borrow(x, y), [624, 358]); return bw_cijferQ(a, b, false);
    case 'mnul': [a, b] = bw_gen(() => [R(200, 999), R(100, 899)], ([x, y]) => y < x && (x % 10 === 0 || Math.floor(x / 10) % 10 === 0) && bw_borrow(x, y), [503, 278]); return bw_cijferQ(a, b, false);
    case 'm10k': [a, b] = bw_gen(() => [R(2000, 9999), R(100, 8999)], ([x, y]) => y < x && bw_borrow(x, y), [7254, 3687]); return bw_cijferQ(a, b, false);
    default: [a, b] = bw_gen(() => [R(20000, 999999), R(1000, 500000)], ([x, y]) => y < x && bw_borrow(x, y), [84302, 37685]); return bw_cijferQ(a, b, false);
  }
}

/* ===================== vermenigvuldigen ===================== */
function bw_tafelHint(a, t) {
  if (t === 1) return `Keer 1 verandert niets: ${a} × 1 is gewoon ${a}.`;
  if (t === 2) return `Keer 2 is het dubbele: ${a} + ${a}.`;
  if (t === 3) return `Weet je ${a} × 2 = ${a * 2}? Doe er dan nog ${a} bij, want ${a} × 3 = ${a} × 2 + ${a}.`;
  if (t === 4) return `Keer 4 is twee keer verdubbelen: ${a} × 2 = ${a * 2}, en dat nog eens dubbel.`;
  if (t === 5) return `Keer 5 is de helft van keer 10. ${a} × 10 = ${a * 10}. Wat is de helft daarvan?`;
  if (t === 6) return `Weet je ${a} × 5 = ${a * 5}? Doe er dan nog ${a} bij, want ${a} × 6 = ${a} × 5 + ${a}.`;
  if (t === 7) return `Splits 7 in 5 en 2: ${a} × 5 = ${a * 5} en ${a} × 2 = ${a * 2}. Tel ze op.`;
  if (t === 8) return `Keer 8 is drie keer verdubbelen: ${a} → ${a * 2} → ${a * 4} → …`;
  if (t === 9) return `Keer 9 is keer 10 min één keer: ${a} × 10 = ${a * 10}, haal er dan ${a} af.`;
  if (t === 10) return `Bij keer 10 zet je een 0 achter het getal.`;
  if (t === 20) return `Keer 20 is keer 2 en dan keer 10: ${a} × 2 = ${a * 2}. Zet er een 0 achter.`;
  return `Splits ${t} in 10 en ${t - 10}: ${a} × 10 = ${a * 10} en ${a} × ${t - 10} = ${a * (t - 10)}. Tel ze op.`;
}
function bw_tafel(t, varied) {
  const a = R(1, 10);
  if (varied && Math.random() < 0.25) return num(`${bw_GAT} × ${t} = ${a * t}`, a, `Hoe vaak past ${t} in ${a * t}? Zeg de tafel van ${t} op tot je bij ${a * t} komt.`);
  if (varied && Math.random() < 0.2) return num(`${t} × ${a} = ${bw_GAT}`, a * t, `${t} × ${a} is hetzelfde als ${a} × ${t}. ` + bw_tafelHint(a, t));
  return num(`${a} × ${t} = ${bw_GAT}`, a * t, bw_tafelHint(a, t));
}
const bw_zeros = n => { let z = 0; while (n && n % 10 === 0) { n /= 10; z++; } return z; };
/* x × 10^za maal y × 10^zb */
function bw_nulKeer(za, zb, swap) {
  const x = R(2, 9), y = R(2, 9), a = x * 10 ** za, b = y * 10 ** zb;
  const [p, q] = swap && Math.random() < 0.5 ? [b, a] : [a, b];
  const z = za + zb;
  return num(`${bw_F(p)} × ${bw_F(q)} = ${bw_GAT}`, a * b, `Reken eerst ${Math.round(p / 10 ** bw_zeros(p))} × ${Math.round(q / 10 ** bw_zeros(q))} = ${x * y}. Tel dan de nullen in de som: ${z === 1 ? '1 nul' : z + ' nullen'}. Zet ${z === 1 ? 'die' : 'ze'} achter ${x * y}.`);
}
function bw_keerGroot() {
  const x = R(2, 9), zx = R(1, 3), y = R(11, 15), zy = R(2, 3), a = x * 10 ** zx, b = y * 10 ** zy;
  return num(`${bw_F(a)} × ${bw_F(b)} = ${bw_GAT}`, a * b, `Reken eerst ${x} × ${y} = ${x * y}. Tel dan alle nullen: ${zx} + ${zy} = ${zx + zy}. Zet ze achter ${x * y}.`);
}
function bw_keerMet(m) {
  let a, hint;
  if (m === 10) { a = R(11, 999); hint = `Bij keer 10 schuift elk cijfer één plek naar links: zet een 0 achter ${a}.`; }
  else if (m === 100) { a = R(11, 999); hint = `Bij keer 100 zet je twee nullen achter het getal.`; }
  else if (m === 15) { a = R(2, 16); hint = `${a} × 15 = ${a} × 10 + ${a} × 5. ${a} × 10 = ${a * 10} en ${a} × 5 is de helft daarvan.`; }
  else if (m === 25) { a = R(2, 40); hint = `4 × 25 = 100. Hoe vaak zit 4 in ${a}? Of: ${a} × 25 is ${a} × 100 gedeeld door 4.`; }
  else { a = R(2, 40); hint = `${a} × 50 is de helft van ${a} × 100 = ${a * 100}.`; }
  return Math.random() < 0.7 ? num(`${a} × ${m} = ${bw_GAT}`, a * m, hint) : num(`${m} × ${a} = ${bw_GAT}`, a * m, hint);
}
function bw_splitsKeer(lo, hi) {
  const a = R(2, 9), b = bw_gen(() => R(lo, hi), x => x % 10 !== 0, lo + 1), t = b - b % 10, e = b % 10;
  const hint = e >= 8 ? `Handig: ${b} = ${t + 10} ${bw_M} ${10 - e}. ${a} × ${t + 10} = ${a * (t + 10)}, haal er dan ${a} × ${10 - e} af.`
    : `Splits ${b} in ${t} en ${e}: ${a} × ${t} = ${a * t} en ${a} × ${e} = ${a * e}. Tel ze op.`;
  return num(`${a} × ${b} = ${bw_GAT}`, a * b, hint, { vis: `<div class="bw-splits"><b>${b}</b><span>${t}</span><span>${e}</span></div>` });
}
function bw_kommaVerplaats() {
  const m = pick([10, 100, 1000]), k = R(1, 3), X = bw_gen(() => R(11, 9999), x => x % 10 !== 0, 562), x = X / 10 ** k;
  return num(`${m} × ${nl(x)} = ${bw_GAT}`, round(m * x, 3), `Bij keer ${m} schuift de komma ${String(m).length - 1} ${m === 10 ? 'plek' : 'plekken'} naar rechts. Is er geen cijfer meer? Schrijf dan een 0.`);
}
function bw_kommaKeer(d) {
  const a = R(2, 9), X = bw_gen(() => (d === 1 ? R(11, 99) : R(101, 999)), x => x % 10 !== 0 && x % 10 ** d !== 0, d === 1 ? 41 : 435);
  const x = X / 10 ** d, h = Math.floor(x), f = round(x - h, 3);
  return num(`${a} × ${nl(x)} = ${bw_GAT}`, round(a * X / 10 ** d, 3), `Splits ${nl(x)} in ${h} en ${nl(f)}: ${a} × ${h} = ${a * h} en ${a} × ${nl(f)} = ${nl(round(a * f, 3))}. Tel ze op.`);
}
function bw_cijferKeer(kind) {
  let a, b;
  if (kind === 'c1') { a = R(2, 4); const mx = Math.floor(9 / a); b = 10 * R(1, mx) + R(1, mx); }
  else if (kind === 'c2') { a = R(3, 9); b = bw_gen(() => R(12, 99), x => (x % 10) * a >= 10, 39); }
  else if (kind === 'c3') { a = R(3, 9); b = R(112, 989); }
  else if (kind === 'c4') { a = R(12, 98); b = bw_gen(() => R(12, 98), x => x % 10 !== 0, 35); }
  else if (kind === 'c5') { a = R(12, 98); b = bw_gen(() => R(112, 989), x => x % 10 !== 0, 229); }
  else { a = R(112, 989); b = bw_gen(() => R(112, 989), x => x % 10 !== 0, 982); }
  /* onder = b (het getal waarmee je vermenigvuldigt), boven = a of andersom: het grootste boven */
  const top = Math.max(a, b), bot = Math.min(a, b);
  const e = bot % 10;
  let hint;
  if (bot < 10) hint = `Begin rechts: ${bot} × ${top % 10} = ${bot * (top % 10)}.${bot * (top % 10) >= 10 ? ` Schrijf ${bot * (top % 10) % 10} op en onthoud ${Math.floor(bot * (top % 10) / 10)}.` : ''} Doe daarna ${bot} × de tientallen (en tel op wat je onthouden hebt).`;
  else {
    const rij = bw_digits(bot).map((c, i) => c * 10 ** i).filter(x => x > 0).slice(0, 2);
    hint = `Maak voor elk cijfer van ${bot} een rij. Eerst ${top} × ${rij[0]} = ${top * rij[0]}${rij[1] ? `, dan ${top} × ${rij[1]} = ${top * rij[1]} (begin die rij met een 0)` : ''}${bot >= 100 ? `, en daarna de honderdtallen (begin met twee nullen)` : ''}. Tel de rijen op.`;
  }
  return num(`Reken uit onder elkaar: ${bw_F(a)} × ${bw_F(b)} = ${bw_GAT}`, a * b, hint, { vis: bw_col([top, bot], '×') });
}
function bw_keerPlaatjes() {
  const a = R(2, 5), b = R(2, 6), e = pick(bw_EMOJI);
  return num(`Hoeveel zijn het er samen?<br>${a} groepjes van ${b} → ${a} × ${b} = ${bw_GAT}`, a * b, `Er zijn ${a} groepjes en in elk groepje zitten er ${b}. Tel in sprongen van ${b}: ${b}, ${2 * b}, …`, { vis: bw_groepjes(a, b, e) });
}

/* ===================== delen ===================== */
function bw_deelHint(p, t) {
  if (t === 1) return `Delen door 1 verandert niets.`;
  if (t === 10) return `Bij delen door 10 haal je de 0 achteraan weg.`;
  if (t === 2) return `Delen door 2 is de helft nemen. Wat is de helft van ${p}?`;
  if (t > 10) return `Welk getal keer ${t} is ${p}? Probeer: 5 × ${t} = ${5 * t}. Moet het meer of minder zijn?`;
  return `Denk aan de tafel van ${t}: welk getal keer ${t} is ${p}?`;
}
function bw_deeltafel(t, varied) {
  const a = R(1, 10), p = a * t;
  if (varied && Math.random() < 0.25) return num(`${bw_GAT} : ${t} = ${a}`, p, `Delen en keer horen bij elkaar: ${a} × ${t} = ${bw_GAT}`);
  return num(`${p} : ${t} = ${bw_GAT}`, a, bw_deelHint(p, t));
}
/* (x*d)·10^zp : d·10^zd */
function bw_nulDeel(zp, zd) {
  const [d, q] = bw_gen(() => [R(2, 9), R(2, 9)], ([x, y]) => (x * y) % 10 !== 0, [8, 7]);
  const P = d * q, n = P * 10 ** zp, dd = d * 10 ** zd, v = n / dd;
  const hint = zd > 0 ? `Streep in beide getallen evenveel nullen weg (${zd}). Dan hou je ${bw_F(n / 10 ** zd)} : ${d} over. Denk aan ${P} : ${d}.`
    : `Denk aan de deeltafel ${P} : ${d}. De ${zp === 1 ? 'nul' : zp + ' nullen'} achter ${P} ${zp === 1 ? 'komt' : 'komen'} ook achter het antwoord.`;
  return num(`${bw_F(n)} : ${bw_F(dd)} = ${bw_GAT}`, v, hint);
}
function bw_splitsDeel(three) {
  const d = R(2, 9);
  const q = bw_gen(() => (three ? R(12, 99) : R(11, Math.floor(99 / d))), x => (three ? x * d >= 100 && x * d <= 999 : x * d <= 99) && x % 10 !== 0, three ? 39 : 12);
  const n = q * d, big = d * (q - q % 10), rest = n - big;
  return num(`${n} : ${d} = ${bw_GAT}`, q, `Splits ${n} in stukken die makkelijk door ${d} kunnen: ${big} en ${rest}. ${big} : ${d} = ${big / d}. Hoeveel is ${rest} : ${d}? Tel ze op.`,
    { vis: `<div class="bw-splits"><b>${n}</b><span>${big}</span><span>${rest}</span></div>` });
}
function bw_rest() {
  const d = R(2, 9), q = R(2, 10), r = R(1, d - 1), n = q * d + r;
  return multi(`${n} : ${d} = {{0}} rest {{1}}`, [q, r], `Zoek in de tafel van ${d} het grootste getal dat niet boven ${n} komt. Hoeveel blijft er dan nog over?`);
}
function bw_deelPlaatjes() {
  const a = R(2, 5), q = R(2, 6), n = a * q, e = pick(bw_EMOJI);
  return num(`Verdeel ${n} ${e} eerlijk over ${a} kinderen. Hoeveel krijgt ieder kind?<br>${n} : ${a} = ${bw_GAT}`, q, `Deel ze één voor één uit aan de ${a} kinderen, of denk: ${bw_GAT} × ${a} = ${n}.`, { vis: plaatjes(n, e, 10) });
}
function bw_kommaDeel(d) {
  const t = R(2, 9), Q = bw_gen(() => (d === 1 ? R(11, 99) : R(101, 999)), x => x % 10 !== 0, d === 1 ? 62 : 406), N = Q * t;
  return num(`${bw_dec(N / 10 ** d, d)} : ${t} = ${bw_GAT}`, Q / 10 ** d, `Doe eerst alsof de komma er niet is: ${N} : ${t}. Zet daarna de komma terug: ${d === 1 ? 'één cijfer' : 'twee cijfers'} achter de komma. Check: is het antwoord ongeveer ${Math.round(N / 10 ** d)} : ${t}?`);
}
function bw_deel10() {
  const m = pick([10, 100, 1000]), zm = String(m).length - 1, k = R(0, 3 - zm);
  const X = bw_gen(() => R(11, 9999), x => x % 10 !== 0, 3248), x = X / 10 ** k;
  return num(`${nl(x)} : ${m} = ${bw_GAT}`, round(x / m, 3), `Bij delen door ${m} schuift de komma ${zm} ${zm === 1 ? 'plek' : 'plekken'} naar links. Kom je cijfers tekort? Zet er dan een 0 voor.`);
}
function bw_cijferDeel(nd, dd, rest) {
  const [n, d] = bw_gen(() => {
    const d = dd === 1 ? R(3, 9) : R(12, 89);
    const n = R(10 ** (nd - 1), 10 ** nd - 1);
    return [n, d];
  }, ([n, d]) => (rest ? n % d !== 0 : n % d === 0) && Math.floor(n / d) >= 10, nd === 3 ? (dd === 1 ? [693, 7] : [810, 45]) : (dd === 1 ? [5778, 6] : [7986, 66]));
  let chunk = 0; const s = String(n);
  for (const c of s) { chunk = chunk * 10 + Number(c); if (chunk >= d) break; }
  const hint = `Begin links: hoe vaak past ${d} in ${chunk}? Schrijf dat achter de \\. Haal ${d} × dat getal eraf, haal het volgende cijfer erbij en ga zo verder.`
    + (dd === 2 ? ` Tip: maak eerst een rijtje 1 × ${d}, 2 × ${d}, 5 × ${d} = ${5 * d}.` : '');
  const q = Math.floor(n / d), r = n % d;
  if (rest) return multi(`Reken uit met een staartdeling: ${n} : ${d} = {{0}} rest {{1}}`, [q, r], hint, { vis: bw_staart(n, d) });
  return num(`Reken uit met een staartdeling: ${n} : ${d} = ${bw_GAT}`, q, hint, { vis: bw_staart(n, d) });
}

/* ===================== uitleg ===================== */
const bw_U_PLUSMIN = `<p>Hoe sneller je deze sommen uit je hoofd weet, hoe makkelijker groot rekenen wordt!</p>
  <p><b>Maak eerst 10.</b> Kom je over het tiental? Vul eerst aan tot 10.</p>
  <div class="voorbeeld">8 + 6 = 8 + 2 + 4 = 10 + 4 = <b>14</b></div>
  <p>Bij min spring je eerst terug naar het tiental.</p>
  <div class="voorbeeld">12 ${bw_M} 5 = 12 ${bw_M} 2 ${bw_M} 3 = 10 ${bw_M} 3 = <b>7</b></div>
  <p><b>Splitsen</b>: welk getal hoort erbij? Ken de vriendjes van 10: 1+9, 2+8, 3+7, 4+6, 5+5.</p>
  <p><b>Rijgen</b> bij grote getallen: eerst de tientallen, dan de eenheden.</p>
  <div class="voorbeeld">47 + 25 = 47 + 20 + 5 = 67 + 5 = <b>72</b></div>`;
const bw_U_KEER = `<p>De tafels moet je zo snel mogelijk weten. Een paar trucjes:</p>
  <div class="voorbeeld">× 2 = dubbel &nbsp;·&nbsp; × 4 = 2 keer dubbel &nbsp;·&nbsp; × 5 = helft van × 10</div>
  <div class="voorbeeld">7 × 9 = 7 × 10 ${bw_M} 7 = 70 ${bw_M} 7 = <b>63</b></div>
  <p>Grote tafels? <b>Splits</b> het getal in 10 en de rest.</p>
  <div class="voorbeeld">6 × 14 = 6 × 10 + 6 × 4 = 60 + 24 = <b>84</b></div>
  <p>Sommen met <b>nullen</b>: reken zonder de nullen en zet ze er daarna allemaal weer achter.</p>
  <div class="voorbeeld">60 × 400 → 6 × 4 = 24, 3 nullen → <b>24.000</b></div>`;
const bw_U_DELEN = `<p>Delen is het omgekeerde van keer. Ken je de tafels, dan ken je de deeltafels!</p>
  <div class="voorbeeld">56 : 8 = <b>7</b>, want 7 × 8 = 56</div>
  <p>Met <b>nullen</b>: streep evenveel nullen weg, of laat de nullen meelopen.</p>
  <div class="voorbeeld">5600 : 80 = 560 : 8 = <b>70</b></div>
  <p>Is het getal te groot voor de tafel? <b>Splits</b> het in handige stukken.</p>
  <div class="voorbeeld">72 : 6 = 60 : 6 + 12 : 6 = 10 + 2 = <b>12</b></div>`;
const bw_U_BPLUSMIN = `<p>Bij <b>plus</b> doe je er iets bij, bij <b>min</b> haal je er iets af. Plaatjes of stippen helpen je tellen.</p>
  <div class="voorbeeld">3 + ${bw_GAT} = 5 → tel verder: 4, 5. Er moeten <b>2</b> bij.</div>
  <p><b>Over het tiental?</b> Maak eerst 10 (of 100) vol.</p>
  <div class="voorbeeld">170 + 50 = 170 + 30 + 20 = 200 + 20 = <b>220</b></div>
  <p><b>Kommagetallen</b>: zet de komma's onder elkaar en maak evenveel cijfers achter de komma.</p>
  <div class="voorbeeld">2,27 + 5,3 = 2,27 + 5,30 = <b>7,57</b></div>
  <p><b>Cijferen</b>: zet de getallen recht onder elkaar en begin rechts. Is het 10 of meer? Schrijf de eenheden op en onthoud 1. Bij min: kom je tekort, leen dan 1 van links.</p>
  <div class="voorbeeld">367 + 258: 7+8=15 → 5, onthoud 1 · 6+5+1=12 → 2, onthoud 1 · 3+2+1=6 → <b>625</b></div>`;
const bw_U_BKEER = `<p><b>Keer</b> betekent: een aantal groepjes die even groot zijn. 3 × 4 = 3 groepjes van 4 = 4 + 4 + 4 = <b>12</b>.</p>
  <p><b>Splitsen</b> maakt moeilijke sommen makkelijk:</p>
  <div class="voorbeeld">6 × 76 = 6 × 70 + 6 × 6 = 420 + 36 = <b>456</b></div>
  <div class="voorbeeld">5 × 19 = 5 × 20 ${bw_M} 5 = 100 ${bw_M} 5 = <b>95</b></div>
  <p><b>Komma</b>: bij × 10 schuift de komma 1 plek naar rechts, bij × 100 twee plekken.</p>
  <div class="voorbeeld">10 × 5,62 = <b>56,2</b> &nbsp;·&nbsp; 8 × 4,1 = 32 + 0,8 = <b>32,8</b></div>
  <p><b>Cijferen</b>: vermenigvuldig met elk cijfer van het onderste getal en tel de rijen op. Bij de tientallen schrijf je eerst een 0.</p>
  <div class="voorbeeld">48 × 35 = 48 × 5 + 48 × 30 = 240 + 1440 = <b>1680</b></div>`;
const bw_U_BDELEN = `<p><b>Delen</b> is eerlijk verdelen: 12 : 3 = 12 dingen over 3 groepjes = <b>4</b> per groepje.</p>
  <p>Past het niet precies? Dan houd je een <b>rest</b> over.</p>
  <div class="voorbeeld">17 : 5 = 3 rest 2, want 3 × 5 = 15 en 17 ${bw_M} 15 = 2</div>
  <p><b>Splitsen</b>: 234 : 6 = 180 : 6 + 54 : 6 = 30 + 9 = <b>39</b></p>
  <p><b>Komma</b>: reken zonder komma en zet hem daarna terug. 32,48 : 8 → 3248 : 8 = 406 → <b>4,06</b></p>
  <p><b>Staartdeling</b>: begin links. Hoe vaak past de deler erin? Trek af, haal het volgende cijfer erbij en ga door.</p>
  <div class="voorbeeld">7 / 693 \\ 99 &nbsp;→ 7 past 9 keer in 69 (63), 69 ${bw_M} 63 = 6, haal 3 erbij: 63 : 7 = 9</div>`;

/* ===================== registratie ===================== */
const bw_T = n => Array.from({ length: 10 }, (_, i) => i + n);

defCat({
  id: 'plusmin', domain: 'automatiseren', title: 'Plus- en minsommen', emoji: '➕', groups: [3, 4, 5, 6, 7, 8], timed: true,
  uitleg: bw_U_PLUSMIN,
  subs: [
    { id: 'tot6', title: 'Tot 6', groups: [3], ex: [
      { id: 'plus', name: 'Plussommen tot 6', example: '2 + 3 = …', gen: () => bw_plusTot(6) },
      { id: 'min', name: 'Minsommen tot 6', example: '6 − 3 = …', gen: () => bw_minTot(6) },
      { id: 'splitsen', name: 'Splitsen tot 6', example: '4 = 3 + …', gen: () => bw_splitsTot(2, 6) },
      { id: 'stip', name: 'Stipsommen tot 6', example: '3 + … = 5', gen: () => bw_stipPlus(6) }
    ] },
    { id: 'tot10', title: 'Tot 10', groups: [3, 4], ex: [
      { id: 'plus', name: 'Plussommen tot 10', example: '6 + 3 = …', gen: () => bw_plusTot(10) },
      { id: 'min', name: 'Minsommen tot 10', example: '8 − 5 = …', gen: () => bw_minTot(10) },
      { id: 'splitsen', name: 'Splitsen tot 10', example: '7 = 4 + …', gen: () => bw_splitsTot(3, 10) },
      { id: 'split10', name: 'Splitsen van 10', example: '10 = 6 + …', gen: () => bw_splitsTot(10, 10) },
      { id: 'stipplus', name: 'Stipsommen tot 10 +', example: '3 + … = 6', gen: () => bw_stipPlus(10) },
      { id: 'stipmin', name: 'Stipsommen tot 10 −', example: '8 − … = 5', gen: () => bw_stipMin(10) },
      { id: 'verdwijn', name: '(Bijna) verdwijnsommen', example: '9 − 8 = …', gen: () => bw_verdwijn(3, 10) }
    ] },
    { id: 'tot20', title: 'Tot 20', groups: [3, 4, 5], ex: [
      { id: 'dubbel', name: 'Dubbelen', example: '7 + 7 = …', gen: bw_dubbel },
      { id: 'plusbin', name: 'Plus binnen het tiental', example: '12 + 6 = …', gen: bw_plus20bin },
      { id: 'minbin', name: 'Min binnen het tiental', example: '19 − 5 = …', gen: bw_min20bin },
      { id: 'plusover', name: 'Plus over het tiental', example: '8 + 6 = …', gen: bw_plus20over },
      { id: 'minover', name: 'Min over het tiental', example: '12 − 5 = …', gen: bw_min20over },
      { id: 'minboven', name: 'Min – beide boven de 10', example: '18 − 13 = …', gen: bw_min20boven },
      { id: 'verdwijn', name: '(Bijna) verdwijnsommen', example: '19 − 18 = …', gen: () => bw_verdwijn(12, 20) }
    ] },
    { id: 'tot100', title: 'Tot 100', groups: [4, 5, 6], ex: [
      { id: 'plusbin', name: 'Plus binnen het tiental', example: '32 + 7 = …', gen: bw_plus100bin },
      { id: 'minbin', name: 'Min binnen het tiental', example: '86 − 5 = …', gen: bw_min100bin },
      { id: 'plusover', name: 'Plus over het tiental', example: '47 + 7 = …', gen: bw_plus100over },
      { id: 'minover', name: 'Min over het tiental', example: '65 − 8 = …', gen: bw_min100over },
      { id: 'tienplus', name: 'Tientallen erbij', example: '33 + 20 = …', gen: bw_tienPlus },
      { id: 'tienmin', name: 'Tientallen eraf', example: '93 − 40 = …', gen: bw_tienMin },
      { id: 'pluseen', name: 'Plus – eenheden binnen tiental', example: '21 + 36 = …', gen: bw_eenPlus },
      { id: 'mineen', name: 'Min – eenheden binnen tiental', example: '76 − 42 = …', gen: bw_eenMin }
    ] },
    { id: 'tot1000', title: 'Tot 1000', groups: [5, 6, 7, 8], ex: [
      { id: 'honderd', name: 'Honderdtallen', example: '344 + 400 = … · 935 − 500 = …', gen: () => bw_1000('h', bw_pm()) },
      { id: 'tienbin', name: 'Tientallen binnen honderdtal', example: '130 + 40 = … · 280 − 60 = …', gen: () => bw_1000('tb', bw_pm()) },
      { id: 'tienover', name: 'Tientallen over honderdtal', example: '170 + 50 = … · 430 − 80 = …', gen: () => bw_1000('to', bw_pm()) },
      { id: 'htbin', name: 'Honderd- en tientallen binnen honderdtal', example: '350 + 640 = … · 880 − 350 = …', gen: () => bw_1000('htb', bw_pm()) },
      { id: 'htover', name: 'Honderd- en tientallen over honderdtal', example: '350 + 580 = … · 820 − 430 = …', gen: () => bw_1000('hto', bw_pm()) }
    ] }
  ]
});

defCat({
  id: 'keer', domain: 'automatiseren', title: 'Vermenigvuldigen', emoji: '✖️', groups: [4, 5, 6, 7, 8], timed: true,
  uitleg: bw_U_KEER,
  subs: [
    { id: 'tafels10', title: 'Tafels tot 10', groups: [4, 5, 6, 7, 8],
      ex: bw_T(1).map(t => ({ id: 't' + t, name: 'Tafel van ' + t, example: `3 × ${t} = …`, gen: () => bw_tafel(t, false) })) },
    { id: 'tafels20', title: 'Tafels tot 20', groups: [6, 7, 8],
      ex: bw_T(11).map(t => ({ id: 't' + t, name: 'Tafel van ' + t, example: `3 × ${t} = …`, gen: () => bw_tafel(t, false) })) },
    { id: 'nullen', title: 'Met 10- en 100-tallen', groups: [6, 7, 8], ex: [
      { id: 'n1', name: 'Sommen als 6 × 40', example: '6 × 40 = …', gen: () => bw_nulKeer(0, 1) },
      { id: 'n2', name: 'Sommen als 4 × 600', example: '4 × 600 = …', gen: () => bw_nulKeer(0, 2) },
      { id: 'n3', name: 'Sommen als 60 × 40', example: '60 × 40 = …', gen: () => bw_nulKeer(1, 1) },
      { id: 'n4', name: 'Sommen als 60 × 400', example: '60 × 400 = …', gen: () => bw_nulKeer(1, 2) },
      { id: 'n5', name: 'Sommen als 600 × 400', example: '600 × 400 = …', gen: () => bw_nulKeer(2, 2) }
    ] },
    { id: 'handig', title: 'Met 10, 15, 25, 50 en 100', groups: [6, 7, 8], ex: [
      { id: 'm10', name: 'Keer 10', example: '234 × 10 = …', gen: () => bw_keerMet(10) },
      { id: 'm15', name: 'Keer 15', example: '8 × 15 = …', gen: () => bw_keerMet(15) },
      { id: 'm25', name: 'Keer 25', example: '20 × 25 = …', gen: () => bw_keerMet(25) },
      { id: 'm50', name: 'Keer 50', example: '15 × 50 = …', gen: () => bw_keerMet(50) },
      { id: 'm100', name: 'Keer 100', example: '24 × 100 = …', gen: () => bw_keerMet(100) }
    ] }
  ]
});

defCat({
  id: 'delen', domain: 'automatiseren', title: 'Delen', emoji: '➗', groups: [5, 6, 7, 8], timed: true,
  uitleg: bw_U_DELEN,
  subs: [
    { id: 'deel10', title: 'Deeltafels tot 10', groups: [5, 6, 7, 8],
      ex: bw_T(1).map(t => ({ id: 'd' + t, name: 'Deeltafel van ' + t, example: `${3 * t} : ${t} = …`, gen: () => bw_deeltafel(t, false) })) },
    { id: 'deel20', title: 'Deeltafels tot 20', groups: [6, 7, 8],
      ex: bw_T(11).map(t => ({ id: 'd' + t, name: 'Deeltafel van ' + t, example: `${3 * t} : ${t} = …`, gen: () => bw_deeltafel(t, false) })) },
    { id: 'nullen', title: 'Delen met deeltafels', groups: [6, 7, 8], ex: [
      { id: 'n1', name: 'Sommen als 560 : 8', example: '560 : 8 = …', gen: () => bw_nulDeel(1, 0) },
      { id: 'n2', name: 'Sommen als 560 : 80', example: '560 : 80 = …', gen: () => bw_nulDeel(1, 1) },
      { id: 'n3', name: 'Sommen als 5600 : 8', example: '5600 : 8 = …', gen: () => bw_nulDeel(2, 0) },
      { id: 'n4', name: 'Sommen als 5600 : 80', example: '5600 : 80 = …', gen: () => bw_nulDeel(2, 1) },
      { id: 'n5', name: 'Sommen als 5600 : 800', example: '5600 : 800 = …', gen: () => bw_nulDeel(2, 2) },
      { id: 'splitsen', name: 'Splitsen', example: '72 : 6 = …', gen: () => bw_splitsDeel(false) }
    ] }
  ]
});

defCat({
  id: 'bplusmin', domain: 'getallen', title: 'Bewerkingen plus- en minsommen', emoji: '➕', groups: [2, 3, 4, 5, 6, 7, 8],
  uitleg: bw_U_BPLUSMIN,
  subs: [
    { id: 'tot6', title: 'Tot 6', groups: [2, 3], ex: [
      { id: 'pplus', name: 'Plussommen met plaatjes', example: '🍎🍎 + 🍎🍎🍎', gen: () => bw_plusTot(6, 'pic') },
      { id: 'pmin', name: 'Minsommen met plaatjes', example: '🍎🍎🍎🍎 − 🍎', gen: () => bw_minTot(6, 'pic') },
      { id: 'plus', name: 'Plussommen', example: '2 + 3 = …', gen: () => bw_plusTot(6, 'dots') },
      { id: 'min', name: 'Minsommen', example: '5 − 2 = …', gen: () => bw_minTot(6, 'dots') },
      { id: 'stip', name: 'Stipsommen', example: '3 + … = 5', gen: () => bw_stipMix(6) }
    ] },
    { id: 'tot10', title: 'Tot 10', groups: [2, 3], ex: [
      { id: 'pplus', name: 'Plussommen met plaatjes', example: '🍎🍎🍎 + 🍎🍎🍎🍎', gen: () => bw_plusTot(10, 'pic') },
      { id: 'pmin', name: 'Minsommen met plaatjes', example: '🍎🍎🍎🍎🍎🍎 − 🍎🍎', gen: () => bw_minTot(10, 'pic') },
      { id: 'plus', name: 'Plussommen', example: '6 + 3 = …', gen: () => bw_plusTot(10, 'dots') },
      { id: 'min', name: 'Minsommen', example: '8 − 5 = …', gen: () => bw_minTot(10, 'dots') },
      { id: 'stip', name: 'Stipsommen', example: '4 + … = 9', gen: () => bw_stipMix(10) },
      { id: 'aanvul', name: 'Aanvullen tot 10', example: '7 + … = 10', gen() {
        const a = R(1, 9);
        return num(`${a} + ${bw_GAT} = 10`, 10 - a, `Welk getal is het vriendje van ${a}? Samen maken ze 10. Tel verder van ${a} tot 10.`, { vis: dots(a, 0) });
      } }
    ] },
    { id: 'tot20', title: 'Tot 20', groups: [3, 4], ex: [
      { id: 'plusbin', name: 'Plus binnen het tiental', example: '12 + 6 = …', gen: bw_plus20bin },
      { id: 'minbin', name: 'Min binnen het tiental', example: '18 − 6 = …', gen: bw_min20bin },
      { id: 'plusover', name: 'Plus over het tiental', example: '8 + 6 = …', gen: bw_plus20over },
      { id: 'minover', name: 'Min over het tiental', example: '12 − 7 = …', gen: bw_min20over }
    ] },
    { id: 'tot100', title: 'Tot 100', groups: [4], ex: [
      { id: 'plusbin', name: 'Plus binnen het tiental', example: '32 + 7 = …', gen: bw_plus100bin },
      { id: 'minbin', name: 'Min binnen het tiental', example: '59 − 7 = …', gen: bw_min100bin },
      { id: 'plusover', name: 'Plus over het tiental', example: '68 + 7 = …', gen: bw_plus100over },
      { id: 'minover', name: 'Min over het tiental', example: '32 − 9 = …', gen: bw_min100over },
      { id: 'tien', name: 'Tientallen erbij en eraf', example: '54 + 20 = …', gen: () => (Math.random() < 0.5 ? bw_tienPlus() : bw_tienMin()) },
      { id: 'een', name: 'Plus en min, eenheden binnen tiental', example: '32 + 42 = …', gen: () => (Math.random() < 0.5 ? bw_eenPlus() : bw_eenMin()) },
      { id: 'eenover', name: 'Plus en min, eenheden over tiental', example: '38 + 29 = …', gen: () => (Math.random() < 0.5 ? bw_eenOverPlus() : bw_eenOverMin()) }
    ] },
    { id: 'tot1000', title: 'Tot 1000', groups: [5], ex: [
      { id: 'tbp', name: 'Sommen als 130 + 40', example: '130 + 40 = …', gen: () => bw_1000('tb', '+') },
      { id: 'tbm', name: 'Sommen als 280 − 60', example: '280 − 60 = …', gen: () => bw_1000('tb', '-') },
      { id: 'top', name: 'Sommen als 170 + 50', example: '170 + 50 = …', gen: () => bw_1000('to', '+') },
      { id: 'tom', name: 'Sommen als 430 − 80', example: '430 − 80 = …', gen: () => bw_1000('to', '-') },
      { id: 'htbp', name: 'Sommen als 350 + 640', example: '350 + 640 = …', gen: () => bw_1000('htb', '+') },
      { id: 'htbm', name: 'Sommen als 880 − 350', example: '880 − 350 = …', gen: () => bw_1000('htb', '-') },
      { id: 'htop', name: 'Sommen als 350 + 580', example: '350 + 580 = …', gen: () => bw_1000('hto', '+') },
      { id: 'htom', name: 'Sommen als 810 − 350', example: '810 − 350 = …', gen: () => bw_1000('hto', '-') },
      { id: 'htep', name: 'Sommen als 152 + 230', example: '152 + 230 = …', gen: () => bw_1000('hte', '+') },
      { id: 'htem', name: 'Sommen als 763 − 340', example: '763 − 340 = …', gen: () => bw_1000('hte', '-') },
      { id: 'alle', name: 'Alle plus- en minsommen tot 1000', example: '486 + 237 = …', gen: () => bw_1000('alle', bw_pm()) }
    ] },
    { id: 'groot', title: 'Groter dan 1000', groups: [6, 7, 8], ex: [
      { id: 'h10k', name: 'Tot 10.000 – honderdtallen', example: '5400 − 1800 = …', gen: bw_h10k },
      { id: 'h1m', name: 'Tot 1 miljoen – honderdtallen', example: '154.600 + 58.000 = …', gen: bw_h1m },
      { id: 'pos4', name: 'Sommen als 600 + 5000 + 3 + 30', example: '600 + 5000 + 3 + 30 = …', gen: () => bw_posSom(4) },
      { id: 'pos6', name: 'Sommen als 200.000 + 3 + 40.000 + 3000', example: '200.000 + 3 + 40.000 + 3000 = …', gen: () => bw_posSom(6) }
    ] },
    { id: 'komma', title: 'Kommagetallen', groups: [7, 8], ex: [
      { id: 'tienden', name: 'Tot tienden', example: '6,5 + 2,9 = …', gen: () => bw_komma(1) },
      { id: 'honderdsten', name: 'Tot honderdsten', example: '2,27 + 5,3 = …', gen: () => bw_komma(2) },
      { id: 'duizendsten', name: 'Tot duizendsten', example: '4,222 + 0,61 = …', gen: () => bw_komma(3) }
    ] },
    { id: 'cijferen', title: 'Cijferen', groups: [7, 8], ex: [
      { id: 'pzonder', name: 'Plussommen tot 1000 zonder overschrijdingen', example: '324 + 152', gen: () => bw_cijfer('pzonder') },
      { id: 'pmet', name: 'Plussommen tot 1000 met overschrijdingen', example: '367 + 258', gen: () => bw_cijfer('pmet') },
      { id: 'pnul', name: 'Plussommen tot 1000 met een 0 in het antwoord', example: '457 + 348', gen: () => bw_cijfer('pnul') },
      { id: 'p10k', name: 'Plussommen tot 10.000', example: '4568 + 2795', gen: () => bw_cijfer('p10k') },
      { id: 'pgroot', name: 'Plussommen boven de 10.000', example: '45.678 + 27.955', gen: () => bw_cijfer('pgroot') },
      { id: 'mzonder', name: 'Minsommen tot 1000 zonder overschrijdingen', example: '576 − 243', gen: () => bw_cijfer('mzonder') },
      { id: 'mmet', name: 'Minsommen tot 1000 met overschrijdingen', example: '624 − 358', gen: () => bw_cijfer('mmet') },
      { id: 'mnul', name: 'Minsommen tot 1000 met 0 in de som', example: '503 − 278', gen: () => bw_cijfer('mnul') },
      { id: 'm10k', name: 'Minsommen tot 10.000', example: '7254 − 3687', gen: () => bw_cijfer('m10k') },
      { id: 'mgroot', name: 'Minsommen boven de 10.000', example: '84.302 − 37.685', gen: () => bw_cijfer('mgroot') }
    ] }
  ]
});

defCat({
  id: 'bkeer', domain: 'getallen', title: 'Bewerkingen vermenigvuldigen', emoji: '✖️', groups: [4, 5, 6, 7, 8],
  uitleg: bw_U_BKEER,
  subs: [
    { id: 'begrip', title: 'Begrip', groups: [4, 5, 6, 7, 8], ex: [
      { id: 'plaatjes', name: 'Vermenigvuldigen met plaatjes', example: '3 groepjes van 4', gen: bw_keerPlaatjes }
    ] },
    { id: 'tafels', title: 'Tafels tot 10', groups: [4, 5],
      ex: bw_T(1).map(t => ({ id: 't' + t, name: 'Tafel van ' + t, example: `4 × ${t} = …`, gen: () => bw_tafel(t, true) })) },
    { id: 'nullen', title: 'Met 10-, 100- en 1000-tallen', groups: [5, 6, 7, 8], ex: [
      { id: 'n1', name: '1 nul', example: '6 × 40 = …', gen: () => bw_nulKeer(0, 1, true) },
      { id: 'n2', name: '2 nullen', example: '60 × 40 = … · 6 × 400 = …', gen: () => (Math.random() < 0.5 ? bw_nulKeer(1, 1) : bw_nulKeer(0, 2, true)) },
      { id: 'n3', name: '3 nullen', example: '700 × 50 = … · 5000 × 7 = …', gen: () => (Math.random() < 0.5 ? bw_nulKeer(2, 1, true) : bw_nulKeer(3, 0, true)) },
      { id: 'n4', name: '4 nullen', example: '300 × 500 = … · 30000 × 6 = …', gen: () => (Math.random() < 0.5 ? bw_nulKeer(2, 2) : bw_nulKeer(4, 0, true)) },
      { id: 'groot', name: 'Grote getallen', example: '300 × 12.000 = …', gen: bw_keerGroot }
    ] },
    { id: 'splitsen', title: 'Splitsen', groups: [5, 6, 7, 8], ex: [
      { id: 's1', name: 'Splitssommen (5 × 19)', example: '5 × 19 = …', gen: () => bw_splitsKeer(11, 29) },
      { id: 's2', name: 'Splitssommen (6 × 76)', example: '6 × 76 = …', gen: () => bw_splitsKeer(31, 99) }
    ] },
    { id: 'komma', title: 'Kommagetallen', groups: [7, 8], ex: [
      { id: 'verplaats', name: 'De komma verplaatsen', example: '10 × 5,62 = …', gen: bw_kommaVerplaats },
      { id: 'split1', name: 'Splitsen (8 × 4,1)', example: '8 × 4,1 = …', gen: () => bw_kommaKeer(1) },
      { id: 'split2', name: 'Splitsen (8 × 4,35)', example: '8 × 4,35 = …', gen: () => bw_kommaKeer(2) }
    ] },
    { id: 'cijferen', title: 'Cijferen', groups: [7, 8], ex: [
      { id: 'c1', name: 'Als 7 × 21 – zonder overschrijdingen', example: '3 × 21', gen: () => bw_cijferKeer('c1') },
      { id: 'c2', name: 'Als 8 × 39 – met overschrijdingen', example: '8 × 39', gen: () => bw_cijferKeer('c2') },
      { id: 'c3', name: 'Als 7 × 829', example: '7 × 829', gen: () => bw_cijferKeer('c3') },
      { id: 'c4', name: 'Als 48 × 35', example: '48 × 35', gen: () => bw_cijferKeer('c4') },
      { id: 'c5', name: 'Als 34 × 229', example: '34 × 229', gen: () => bw_cijferKeer('c5') },
      { id: 'c6', name: 'Als 382 × 982', example: '382 × 982', gen: () => bw_cijferKeer('c6') }
    ] }
  ]
});

defCat({
  id: 'bdelen', domain: 'getallen', title: 'Bewerkingen delen', emoji: '➗', groups: [4, 5, 6, 7, 8],
  uitleg: bw_U_BDELEN,
  subs: [
    { id: 'begrip', title: 'Begrip', groups: [4, 5, 6, 7, 8], ex: [
      { id: 'plaatjes', name: 'Delen met plaatjes', example: '12 appels over 3 kinderen', gen: bw_deelPlaatjes }
    ] },
    { id: 'deeltafels', title: 'Deeltafels', groups: [5],
      ex: bw_T(1).map(t => ({ id: 'd' + t, name: 'Deeltafel van ' + t, example: `${4 * t} : ${t} = …`, gen: () => bw_deeltafel(t, true) })) },
    { id: 'nullen', title: 'Getallen met nullen', groups: [5, 6, 7, 8], ex: [
      { id: 'n1', name: '1 nul', example: '560 : 8 = …', gen: () => bw_nulDeel(1, 0) },
      { id: 'n2', name: '2 nullen', example: '560 : 80 = … · 5600 : 8 = …', gen: () => (Math.random() < 0.5 ? bw_nulDeel(1, 1) : bw_nulDeel(2, 0)) },
      { id: 'n3', name: '3 nullen', example: '5600 : 80 = … · 56.000 : 8 = …', gen: () => (Math.random() < 0.5 ? bw_nulDeel(2, 1) : bw_nulDeel(3, 0)) },
      { id: 'n4', name: '4 nullen', example: '5600 : 800 = … · 560.000 : 8 = …', gen: () => (Math.random() < 0.5 ? bw_nulDeel(2, 2) : bw_nulDeel(4, 0)) }
    ] },
    { id: 'rest', title: 'Met rest en splitsen', groups: [5, 6, 7, 8], ex: [
      { id: 'rest', name: 'Delen met rest', example: '17 : 5 = 3 rest 2', gen: bw_rest },
      { id: 'split1', name: 'Delen door te splitsen (36 : 3)', example: '36 : 3 = …', gen: () => bw_splitsDeel(false) },
      { id: 'split2', name: 'Delen door te splitsen (234 : 6)', example: '234 : 6 = …', gen: () => bw_splitsDeel(true) }
    ] },
    { id: 'komma', title: 'Kommagetallen', groups: [7, 8], ex: [
      { id: 'tienden', name: 'Tot tienden', example: '55,8 : 9 = …', gen: () => bw_kommaDeel(1) },
      { id: 'honderdsten', name: 'Tot honderdsten', example: '32,48 : 8 = …', gen: () => bw_kommaDeel(2) },
      { id: 'd10', name: 'Delen door 10, 100 en 1000', example: '32,4 : 100 = …', gen: bw_deel10 }
    ] },
    { id: 'cijferen', title: 'Cijferend delen', groups: [7, 8], ex: [
      { id: 'c1', name: 'Als 693 : 7 – zonder rest', example: '693 : 7', gen: () => bw_cijferDeel(3, 1, false) },
      { id: 'c2', name: 'Als 715 : 7 – met rest', example: '715 : 7', gen: () => bw_cijferDeel(3, 1, true) },
      { id: 'c3', name: 'Als 810 : 45 – zonder rest', example: '810 : 45', gen: () => bw_cijferDeel(3, 2, false) },
      { id: 'c4', name: 'Als 693 : 17 – met rest', example: '693 : 17', gen: () => bw_cijferDeel(3, 2, true) },
      { id: 'c5', name: 'Als 5778 : 6 – zonder rest', example: '5778 : 6', gen: () => bw_cijferDeel(4, 1, false) },
      { id: 'c6', name: 'Als 6799 : 5 – met rest', example: '6799 : 5', gen: () => bw_cijferDeel(4, 1, true) },
      { id: 'c7', name: 'Als 7986 : 66 – zonder rest', example: '7986 : 66', gen: () => bw_cijferDeel(4, 2, false) },
      { id: 'c8', name: 'Als 8975 : 78 – met rest', example: '8975 : 78', gen: () => bw_cijferDeel(4, 2, true) }
    ] }
  ]
});
