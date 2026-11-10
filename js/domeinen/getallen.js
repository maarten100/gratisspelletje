/* Rekenraket – domein Getallen: getalbegrip tot 100, boven de 100 en kommagetallen.
   Categorieën: getal100, getalgroot, komma. Alle eigen globale namen beginnen met gt_. */
import { choice, count, defCat, getalWoord, line, lineSVG, multi, nl, num, order, pick, plaatjes, R, round, shuffle, splitshuis } from '../kern.js';

/* ===================== hulpjes ===================== */
const gt_EMO = ['🍎', '🐞', '⭐', '🐟', '🚗', '🌸', '🐣', '🍓', '⚽', '🎈', '🐸', '🧁', '🦋', '🍌'];
const gt_PL = ['eenheden', 'tientallen', 'honderdtallen', 'duizendtallen', 'tienduizendtallen', 'honderdduizendtallen'];
const gt_f = n => nl(n, true);
const gt_pow = p => Math.pow(10, p);

/* n verschillende waarden uit f() (stopt na een vast aantal pogingen) */
function gt_distinct(n, f, start = []) {
  const s = new Set(start);
  for (let t = 0; t < 400 && s.size < n; t++) s.add(f());
  return shuffle([...s]).slice(0, n);
}

/* Getallenrij met vakjes. vals = getallen; nb = aantal open vakjes. Er blijven altijd twee buren zichtbaar. */
function gt_row(vals, nb, fmt = gt_f) {
  const len = vals.length;
  let pos = null;
  for (let t = 0; t < 60 && !pos; t++) {
    const p = shuffle(vals.map((_, i) => i)).slice(0, nb).sort((a, b) => a - b);
    let ok = false;
    for (let i = 0; i < len - 1; i++) if (p.indexOf(i) < 0 && p.indexOf(i + 1) < 0) ok = true;
    if (ok) pos = p;
  }
  if (!pos) { pos = []; for (let i = len - nb; i < len; i++) pos.push(i); }
  const vis = '<div class="gt-row">' + vals.map((v, i) => {
    const k = pos.indexOf(i);
    return k >= 0 ? `<span class="gt-box gt-blank">{{${k}}}</span>` : `<span class="gt-box">${fmt(v)}</span>`;
  }).join('') + '</div>';
  return { vis, blanks: pos.map(i => vals[i]) };
}
/* Rij van gehele getallen (of eenheden van 1/div) */
function gt_seqVals(start, step, len, div = 1) {
  const a = [];
  for (let i = 0; i < len; i++) a.push((start + i * step) / div);
  return a;
}
function gt_seqQ(q, vals, nb, hint, fmt) {
  const r = gt_row(vals, nb, fmt);
  return multi(q, r.blanks, hint, { vis: r.vis });
}
const gt_wd = s => `<span class="gt-wd">${s}</span>`;
/* Plaatsnaam voor een macht van 10 */
const gt_plaats = u => gt_PL[Math.round(Math.log10(u))];

/* ===================== getal100: kleine getallen (tot 5, 10, 20) ===================== */
function gt_tellen(N) {
  const n = N === 5 ? R(1, 5) : N === 10 ? R(3, 10) : R(8, 20), e = pick(gt_EMO);
  return num(`Hoeveel ${e}?`, n, n > 5 ? 'Tel eerst de groepjes van 5. Tel dan verder.' : 'Wijs ze één voor één aan en tel hardop.', { vis: plaatjes(n, e) });
}
function gt_slepen(N) {
  const n = N === 5 ? R(1, 5) : N === 10 ? R(2, 10) : R(8, 20), e = pick(gt_EMO);
  return count(`Zet er <b>${n}</b> neer.`, n, n > 10 ? 'Maak eerst een rij van 10. Doe er dan nog wat bij.' : 'Tik en tel mee: 1, 2, 3 …', { emoji: e, max: N === 20 ? 20 : 10 });
}
function gt_rijKlein(N) {
  const len = N === 5 ? 5 : 6, back = N >= 10 && Math.random() < 0.3;
  const step = N === 20 && !back && Math.random() < 0.3 ? 2 : 1;
  let vals;
  if (back) { const s = R(len - 1, N); vals = gt_seqVals(s, -1, len); }
  else vals = gt_seqVals(R(0, N - step * (len - 1)), step, len);
  const nb = N === 5 ? 2 : R(2, 3);
  const hint = back ? 'Tel steeds 1 terug.' : step === 2 ? 'Kijk goed: hoeveel komt er steeds bij?' : 'Tel steeds 1 verder.';
  return gt_seqQ(back ? 'Tel terug. Welke getallen missen?' : 'Welke getallen missen?', vals, nb, hint);
}
function gt_orderKlein(N) {
  const all = []; for (let i = 0; i <= N; i++) all.push(i);
  const vals = shuffle(all).slice(0, N === 5 ? 4 : R(4, 5));
  return order('Van minder naar meer. Tik op volgorde.', vals.map(String), vals,
    N === 20 ? 'Kijk eerst: is het getal kleiner of groter dan 10?' : 'Welk getal is het kleinst? Tel maar: 0, 1, 2, 3 …');
}
function gt_labelsKlein(N) { return N === 5 ? [0, 5] : N === 10 ? [0, 5, 10] : [0, 10, 20]; }
function gt_lijnKlein(N) {
  const labels = gt_labelsKlein(N);
  let v; do { v = R(1, N - 1); } while (labels.indexOf(v) >= 0);
  return line(`Waar hoort <b>${v}</b>?`, 0, N, v, N === 20 ? 'Elk streepje is 1. Begin bij 10 als het getal groter is dan 10.' : 'Elk streepje is 1. Tel de streepjes vanaf 0.',
    { labels, ticks: N, tol: 0.45 / N });
}
function gt_afleesKlein(N) {
  const labels = gt_labelsKlein(N);
  let v; do { v = R(1, N - 1); } while (labels.indexOf(v) >= 0);
  return num('Welk getal hoort bij de pijl?', v, N === 20 ? 'Elk streepje is 1. Tel vanaf het dichtstbijzijnde getal.' : 'Elk streepje is 1. Tel de streepjes vanaf 0.',
    { vis: lineSVG(0, N, { arrow: v, labels, ticks: N }) });
}
function gt_splitsRange(N) { return N === 5 ? R(2, 5) : N === 10 ? R(3, 10) : R(11, 20); }
function gt_splitsPl(N) {
  const t = gt_splitsRange(N), l = R(1, t - 1), e = pick(gt_EMO), left = Math.random() < 0.5;
  return num(`Splits ${t}. Wat hoort op het vraagteken?`, t - l, `Er zijn ${t} plaatjes. Tel er ${l} af. Hoeveel blijven er over?`,
    { vis: plaatjes(t, e) + splitshuis(t, left ? l : '?', left ? '?' : l) });
}
function gt_splits(N) {
  const t = gt_splitsRange(N), l = R(1, t - 1);
  if (Math.random() < 0.25) return num('Welk getal hoort op het dak?', t, `Doe ${l} en ${t - l} samen.`, { vis: splitshuis('?', l, t - l) });
  const left = Math.random() < 0.5;
  return num(`Splits ${t}. Wat hoort op het vraagteken?`, t - l, `Tel verder vanaf ${l} tot je bij ${t} bent.`, { vis: splitshuis(t, left ? l : '?', left ? '?' : l) });
}
function gt_tl(N) {
  if (N === 20) {
    const t = R(11, 19), f = R(0, 2);
    if (f === 0) return multi(`${t} = {{0}} + {{1}}`, [10, t - 10], 'Een tiental is 10. Hoeveel blijven er dan nog over?');
    if (f === 1) return multi(`${t} = {{0}} tiental en {{1}} losse`, [1, t - 10], 'In elk getal van 11 tot 19 zit één tiental (10).');
    return num(`10 + ${t - 10} = ?`, t, 'Een tiental en wat losse. Het tiental geeft de 1 vooraan.');
  }
  let t; do { t = R(21, 99); } while (t % 10 === 0);
  const T = Math.floor(t / 10), E = t % 10, f = R(0, 2);
  if (f === 0) return multi(`${t} = {{0}} + {{1}}`, [T * 10, E], 'Het eerste cijfer zegt hoeveel tientallen. Hoeveel is dat samen?');
  if (f === 1) return multi(`${t} = {{0}} tientallen en {{1}} losse`, [T, E], 'Het eerste cijfer zijn de tientallen, het laatste de losse.');
  return num(`${T} tientallen en ${E} losse = ?`, t, `${T} tientallen is ${T} × 10. Doe de losse erbij.`);
}
function gt_dubbel(N) {
  const e = pick(gt_EMO);
  if (Math.random() < 0.5) {
    const n = N === 10 ? R(1, 5) : N === 20 ? R(2, 10) : R(6, 50);
    return num(`Wat is het <b>dubbele</b> van ${n}?`, 2 * n,
      N === 100 ? 'Verdubbel eerst de tientallen, dan de losse. Tel ze samen.' : 'Het dubbele is twee keer zoveel. Doe het getal + hetzelfde getal.',
      N === 10 ? { vis: plaatjes(n, e) } : {});
  }
  const n = N === 10 ? 2 * R(1, 5) : N === 20 ? 2 * R(2, 10) : 2 * R(6, 50);
  return num(`Wat is de <b>helft</b> van ${n}?`, n / 2,
    N === 100 ? 'Neem de helft van de tientallen en de helft van de losse. Weet je: de helft van 10 is 5.' : 'Verdeel eerlijk in twee groepjes. Welk getal + hetzelfde getal is het?',
    N === 10 ? { vis: plaatjes(n, e) } : {});
}

/* ===================== getal100: tot 100 ===================== */
function gt_rij100() {
  const back = Math.random() < 0.3, T = 10 * R(1, 9), len = 6;
  const vals = back ? gt_seqVals(Math.min(100, T + R(1, 4)), -1, len) : gt_seqVals(T - R(1, 4), 1, len);
  return gt_seqQ(back ? 'Tel terug. Vul de rij aan.' : 'Vul de rij aan.', vals, R(2, 3), back ? 'Tel steeds 1 terug. Let op als er een nieuw tiental begint.' : 'Tel steeds 1 verder. Let op als er een nieuw tiental begint.');
}
function gt_order100() {
  const a = R(1, 9), b = R(1, 9), start = a !== b ? [10 * a + b, 10 * b + a] : [];
  const vals = gt_distinct(5, () => R(1, 100), start);
  return order('Zet van klein naar groot.', vals.map(String), vals, 'Kijk eerst naar de tientallen. Zijn die gelijk? Kijk dan naar de losse.');
}
function gt_sprongRij(step, startList, desc, q, hint) {
  const s = pick(startList), len = 6;
  let vals = gt_seqVals(s, step, len);
  if (desc) vals = vals.reverse();
  return gt_seqQ(q, vals, R(2, 3), hint);
}
function gt_vijf() {
  const st = []; for (let i = 0; i <= 15; i++) st.push(5 * i);
  const desc = Math.random() < 0.25;
  return gt_sprongRij(5, st, desc, desc ? 'Tel terug met sprongen van 5.' : 'Tel met sprongen van 5.', 'Getallen in de vijfrij eindigen altijd op een 5 of een 0.');
}
function gt_tien() {
  const desc = Math.random() < 0.25;
  return gt_sprongRij(10, [0, 10, 20, 30, 40, 50], desc, desc ? 'Tel terug met tientallen.' : 'Tel met tientallen.', 'Tientallen eindigen altijd op een 0. Het eerste cijfer gaat steeds 1 omhoog of omlaag.');
}
function gt_sprong10() {
  const st = []; for (let i = 1; i <= 49; i++) if (i % 10) st.push(i);
  const desc = Math.random() < 0.3;
  return gt_sprongRij(10, st, desc, desc ? 'Spring steeds 10 terug.' : 'Spring steeds 10 verder.', 'Bij een sprong van 10 verandert alleen het tiental. Het laatste cijfer blijft hetzelfde.');
}
function gt_lijn100() {
  let v; do { v = R(1, 99); } while (v === 50);
  const lo = Math.floor(v / 10) * 10;
  return line(`Waar ligt <b>${v}</b>?`, 0, 100, v, `Elk streepje is 10. ${v} ligt tussen ${lo} en ${lo + 10}.`, { labels: [0, 50, 100], ticks: 10, tol: 0.04 });
}
function gt_aflees100() {
  const f = R(0, 2);
  if (f === 0) { const v = 10 * R(1, 9); return num('Welk getal hoort bij de pijl?', v, 'Van 0 tot 100 zijn 10 stapjes. Hoeveel is één stapje?', { vis: lineSVG(0, 100, { arrow: v, labels: [0, 100], ticks: 10 }) }); }
  if (f === 1) { let v; do { v = 5 * R(1, 19); } while (v === 50); return num('Welk getal hoort bij de pijl?', v, 'Van 0 tot 50 zijn 10 stapjes. Hoeveel is één stapje?', { vis: lineSVG(0, 100, { arrow: v, labels: [0, 50, 100], ticks: 20 }) }); }
  const A = 10 * R(0, 9), v = A + R(1, 9);
  return num('Welk getal hoort bij de pijl?', v, `Van ${A} tot ${A + 10} zijn 10 stapjes. Elk stapje is 1.`, { vis: lineSVG(A, A + 10, { arrow: v, labels: [A, A + 10], ticks: 10 }) });
}
function gt_woord100() {
  const n = R(11, 100);
  if (Math.random() < 0.5) return num(`Schrijf als getal: ${gt_wd(`<b>${getalWoord(n)}</b>`)}`, n, 'Bij "vijfentwintig" hoor je eerst de 5 losse en dan de 20. Dus eerst het tiental opschrijven!');
  const T = Math.floor(n / 10), E = n % 10, w = [];
  if (E && E !== T && T < 10) w.push(10 * E + T);
  w.push(...[n - 1, n + 1, n + 10, n - 10].filter(x => x > 0 && x <= 100));
  return choice(`Hoe schrijf je <b>${n}</b> in letters?`, getalWoord(n), w.map(getalWoord), 'Boven de 20 zeg je eerst de losse en dan het tiental: 25 = vijf-en-twintig.');
}

/* ===================== getalgroot ===================== */
const gt_STEPS = { 1e3: [1, 10, 100], 1e4: [1, 10, 100, 1000], 1e5: [1, 10, 100, 1000, 10000], 1e6: [10, 100, 1000, 10000, 100000] };
const gt_RONDEN = { 1e3: [10, 100], 1e4: [10, 100, 1000], 1e5: [10, 100, 1000, 10000], 1e6: [100, 1000, 10000, 100000] };

function gt_rijGroot(L) {
  const u = pick([10, 100, 1000, 10000].filter(x => x <= L / 10)), T = u * R(L / 10 / u, L / u - 1), back = Math.random() < 0.3;
  const vals = back ? gt_seqVals(T + R(1, 4), -1, 6) : gt_seqVals(T - R(1, 4), 1, 6);
  return gt_seqQ(back ? 'Tel terug. Vul de rij aan.' : 'Vul de rij aan.', vals, R(2, 3),
    'Tel steeds 1 ' + (back ? 'terug' : 'verder') + '. Let goed op als er een nieuw tiental, honderdtal of duizendtal begint.');
}
/* willekeurig getal met D cijfers; zero = kans op een nul per cijfer */
function gt_digits(D, zero = 0.15) {
  let s = String(R(1, 9));
  for (let i = 1; i < D; i++) s += Math.random() < zero ? '0' : String(R(1, 9));
  return +s;
}
function gt_swap(n) {
  const s = String(n).split(''), i = R(0, s.length - 2);
  [s[i], s[i + 1]] = [s[i + 1], s[i]];
  return s[0] === '0' ? n : +s.join('');
}
function gt_orderGroot(L) {
  const D = Math.round(Math.log10(L)), base = gt_digits(D, 0.2);
  const vals = gt_distinct(5, () => {
    const f = R(0, 2), p = gt_pow(R(0, D - 1));
    if (f === 0) return gt_swap(base);
    if (f === 1) return Math.min(L - 1, Math.max(L / 10, base + (Math.random() < 0.5 ? p : -p)));
    return gt_digits(D, 0.2);
  }, [base]);
  const desc = Math.random() < 0.2;
  return order(desc ? 'Zet van <b>groot naar klein</b>.' : 'Zet van klein naar groot.', vals.map(gt_f), vals,
    'Vergelijk eerst de cijfers helemaal links. Zijn die gelijk? Kijk dan naar het volgende cijfer.', desc ? { desc: true } : {});
}
function gt_sprongGroot(L) {
  const s = pick(gt_STEPS[L]), M = 10 * s;
  let start;
  if (Math.floor(L / M) >= 2) {
    const T = M * R(Math.max(1, Math.ceil(L / 10 / M)), Math.floor(L / M) - 1);
    start = T - R(1, 4) * s + (s > 1 ? R(0, s - 1) : 0);
  } else start = R(0, L - 5 * s);
  let vals = gt_seqVals(start, s, 6);
  const desc = Math.random() < 0.25;
  if (desc) vals = vals.reverse();
  return gt_seqQ(`Tel ${desc ? 'terug ' : ''}met sprongen van ${gt_f(s)}. Vul de rij aan.`, vals, R(2, 3),
    `Elke sprong is ${gt_f(s)}. Kijk vooral naar het cijfer van de ${gt_plaats(s)}.`);
}
function gt_lijnGroot(L) {
  if (Math.random() < 0.5) {
    let k; do { k = R(1, 99); } while (k === 50);
    const v = k * L / 100, lo = Math.floor(k / 10) * L / 10;
    return line(`Waar ligt <b>${gt_f(v)}</b>?`, 0, L, v, `Elk streepje is ${gt_f(L / 10)}. ${gt_f(v)} ligt tussen ${gt_f(lo)} en ${gt_f(lo + L / 10)}.`,
      { labels: [0, L / 2, L], ticks: 10, tol: 0.03, display: gt_f(v) });
  }
  const u = L / 10, A = u * R(L === 1000 ? 1 : 0, 9), v = A + R(1, 19) * u / 20;
  return line(`Waar ligt <b>${gt_f(v)}</b>?`, A, A + u, v, `Van ${gt_f(A)} tot ${gt_f(A + u)} zijn 10 stapjes. Hoeveel is één stapje?`,
    { labels: [A, A + u], ticks: 10, tol: 0.03, display: gt_f(v) });
}
function gt_afleesGroot(L) {
  const f = R(0, 2), q = 'Welk getal hoort bij de pijl?';
  if (f === 0) { const v = R(1, 9) * L / 10; return num(q, v, `Van 0 tot ${gt_f(L)} zijn 10 stapjes. Hoeveel is één stapje?`, { vis: lineSVG(0, L, { arrow: v, labels: [0, L], ticks: 10 }) }); }
  if (f === 1) { let k; do { k = R(1, 19); } while (k === 10); const v = k * L / 20; return num(q, v, `Van 0 tot ${gt_f(L / 2)} zijn 10 stapjes. Hoeveel is één stapje?`, { vis: lineSVG(0, L, { arrow: v, labels: [0, L / 2, L], ticks: 20 }) }); }
  const u = L / 10, A = u * R(0, 9), v = A + R(1, 9) * u / 10;
  return num(q, v, `Van ${gt_f(A)} tot ${gt_f(A + u)} zijn 10 stapjes. Hoeveel is één stapje?`, { vis: lineSVG(A, A + u, { arrow: v, labels: [A, A + u], ticks: 10 }) });
}
function gt_afronden(L) {
  const u = pick(gt_RONDEN[L]);
  let n;
  for (let t = 0; t < 50; t++) {
    n = R(Math.max(L / 10, u + 1), L - 1);
    if (Math.random() < 0.25) n = Math.floor(n / u) * u + 5 * u / 10 + (u >= 100 ? R(0, u / 10 - 1) : 0);
    if (n % u && n < L) break;
  }
  if (!(n % u) || n >= L) n = u + Math.floor(u / 2) + (u > 10 ? 1 : 0);
  const nm = gt_plaats(u);
  return num(`Rond <b>${gt_f(n)}</b> af op ${nm}.`, Math.round(n / u) * u,
    `Kijk naar het cijfer rechts van de ${nm}. Is dat 5 of meer? Dan naar boven. 4 of minder? Dan naar beneden.`);
}
function gt_woordGroot(L) {
  const D = Math.round(Math.log10(L)), n = gt_digits(D, 0.25);
  const hint = L === 1000 ? 'Schrijf eerst de honderdtallen. Let op: bij "vijfendertig" komt de 3 vóór de 5.' : 'Schrijf eerst het stuk vóór "duizend". Daarna komen altijd nog 3 cijfers. Vergeet de nullen niet!';
  if (Math.random() < 0.5) return num(`Schrijf in cijfers: ${gt_wd(`<b>${getalWoord(n)}</b>`)}`, n, hint);
  const w = [gt_swap(n)];
  for (let p = 0; p < D; p++) for (const x of [n + gt_pow(p), n - gt_pow(p)]) if (x >= L / 10 && x < L) w.push(x);
  if (D >= 4) { const x = Math.floor(n / 1000) * 100 + n % 100; if (x > 0) w.push(x); }
  return choice(`Hoe schrijf je <b>${gt_f(n)}</b> in woorden?`, gt_wd(getalWoord(n)), shuffle(w).map(x => gt_wd(getalWoord(x))),
    L === 1000 ? 'Zeg eerst de honderdtallen. Daarna de losse en dan pas de tientallen: 35 = vijfendertig.' : 'Lees het getal in stukjes: eerst het deel vóór de punt (duizend), dan de rest.');
}
function gt_positie(L) {
  const D = Math.round(Math.log10(L)), f = R(0, D <= 4 ? 3 : 2);
  if (f === 3) {
    const n = gt_digits(D, 0), parts = String(n).split('').map((c, i) => +c * gt_pow(D - 1 - i));
    return multi(`${gt_f(n)} = ` + parts.map((_, i) => `{{${i}}}`).join(' + '), parts, 'Splits in duizendtallen, honderdtallen, tientallen en eenheden. Elk cijfer is iets anders waard.');
  }
  /* getal met allemaal verschillende cijfers, zodat het cijfer maar één keer voorkomt */
  let ds = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, D);
  if (ds[0] === 0) ds = ds.slice(1).concat(0);
  const n = +ds.join(''), pos = [];
  ds.forEach((d, i) => { if (d) pos.push(D - 1 - i); });
  const p = pick(pos), d = Math.floor(n / gt_pow(p)) % 10;
  const hint = 'Begin rechts: eenheden, tientallen, honderdtallen, duizendtallen …';
  if (f === 0) return num(`Wat is de waarde van de <b>${d}</b> in ${gt_f(n)}?`, d * gt_pow(p), hint);
  if (f === 1) { const q = R(0, D - 1); return num(`Welk cijfer staat op de plaats van de <b>${gt_PL[q]}</b> in ${gt_f(n)}?`, Math.floor(n / gt_pow(q)) % 10, hint); }
  const w = []; for (let q = 0; q <= D; q++) if (q !== p) w.push(gt_f(d * gt_pow(q)));
  return choice(`Hoeveel is de <b>${d}</b> waard in ${gt_f(n)}?`, gt_f(d * gt_pow(p)), w, hint);
}

/* ===================== miljoenen en miljarden ===================== */
function gt_mWords(M) { return M === 1e6 ? ['miljoen', 'mln'] : ['miljard', 'mld']; }
function gt_lijnM(M) {
  const [w] = gt_mWords(M), big = Math.random() < 0.35, max = big ? 100 : 10;
  let x; do { x = big ? 5 * R(1, 19) : R(1, 19) / 2; } while (x === max / 2);
  const asDigits = Math.random() < 0.4, txt = asDigits ? gt_f(x * M) : `${nl(x)} ${w}`;
  return line(`De lijn gaat van 0 tot ${max} ${w}. Waar ligt <b>${txt}</b>?`, 0, max, x,
    `Elk streepje is ${max / 10} ${w}.` + (asDigits ? ` 1 ${w} = ${gt_f(M)}.` : ''),
    { labels: [0, max / 2, max], ticks: 10, tol: 0.03, display: txt, fmt: v => (v ? nl(v) + ' ' + gt_mWords(M)[1] : '0') });
}
function gt_afleesM(M) {
  const [w, ab] = gt_mWords(M), half = Math.random() < 0.5, ticks = half ? 20 : 10;
  let x; do { x = half ? R(1, 19) / 2 : R(1, 9); } while (x === 5);
  const vis = lineSVG(0, 10, { arrow: x, labels: [0, 5, 10], ticks, fmt: v => (v ? nl(v) + ' ' + ab : '0') });
  const hint = `Van 0 tot 5 ${w} zijn ${ticks / 2} stapjes. Hoeveel is één stapje?`;
  if (Math.random() < 0.5) return num(`Hoeveel ${w} hoort bij de pijl? (${ab} = ${w})`, x, hint, { vis, unit: w });
  return num(`Welk getal hoort bij de pijl? Schrijf het in cijfers. (${ab} = ${w})`, x * M, hint + ` 1 ${w} = ${gt_f(M)}.`, { vis });
}
function gt_kommaM(M) {
  const [w] = gt_mWords(M);
  let xi; do { xi = Math.random() < 0.6 ? 10 * R(1, 99) : R(101, 999); } while (xi % 100 === 0);
  const x = xi / 100, v = xi * (M / 100);
  if (Math.random() < 0.5) return num(`<b>${nl(x)} ${w}</b> = ? Schrijf het in cijfers.`, v, `1 ${w} = ${gt_f(M)}. Dus 0,1 ${w} = ${gt_f(M / 10)}.`);
  const W = Math.floor(xi / 100), r = xi % 100;
  const wr = [xi / 10, xi / 1000];
  if (r % 10 === 0) wr.push(W + r / 1000); else wr.push(W + (r % 10) / 10 + Math.floor(r / 10) / 100);
  wr.push(W + 1 + r / 100);
  return choice(`Hoe schrijf je <b>${gt_f(v)}</b> als kommagetal?`, `${nl(x)} ${w}`, wr.map(y => `${nl(round(y, 4))} ${w}`),
    `Hoeveel hele ${w}en zitten erin? Wat er overblijft, komt achter de komma.`);
}

/* ===================== komma ===================== */
const gt_KN = ['', 'tienden', 'honderdsten', 'duizendsten'];
const gt_KN1 = ['', 'tiende', 'honderdste', 'duizendste'];
const gt_kd = d => gt_pow(d);
function gt_rijK(d) {
  const D = gt_kd(d), step = pick(d === 1 ? [1, 1, 2, 5] : [1, 1, 5, 10]);
  const M = d >= 2 && step === 1 && Math.random() < 0.3 ? 100 : Math.min(10 * step, D);
  const T = M * R(1, Math.max(1, Math.floor(9 * D / M)));
  const start = Math.max(0, T - R(1, 4) * step);
  let vals = gt_seqVals(start, step, 6, D);
  const desc = Math.random() < 0.2;
  if (desc) vals = vals.reverse();
  return gt_seqQ(desc ? 'Tel terug. Vul de rij aan.' : 'Vul de rij aan.', vals, R(2, 3),
    `Elke stap is ${nl(step / D)}. Let goed op als je bij een nieuw heel getal of een nieuwe tiende komt.`, v => nl(v));
}
/* configuratie voor getallenlijn met kommagetallen; alles in hele eenheden van 1/D */
function gt_lijnCfg(d) {
  const D = gt_kd(d), f = R(0, 1);
  if (d === 1) {
    if (f === 0) { const W = R(0, 9); return { a: W * D, b: W * D + D, ticks: 10, k: R(1, 9), stap: 1, D }; }
    return { a: 0, b: 10 * D, ticks: 20, k: R(1, 19), stap: 5, D, mid: true };
  }
  if (d === 2) {
    if (f === 0) { const A = 10 * R(0, 99); return { a: A, b: A + 10, ticks: 10, k: R(1, 9), stap: 1, D }; }
    const W = R(0, 5); return { a: W * D, b: W * D + D, ticks: 20, k: R(1, 19), stap: 5, D, mid: true };
  }
  if (f === 0) { const A = 10 * R(0, 999); return { a: A, b: A + 10, ticks: 10, k: R(1, 9), stap: 1, D }; }
  const A = 100 * R(0, 99); return { a: A, b: A + 100, ticks: 10, k: R(1, 9), stap: 10, D };
}
function gt_cfgLabels(c) {
  const l = [c.a / c.D, c.b / c.D];
  if (c.mid) l.splice(1, 0, (c.a + c.b) / 2 / c.D);
  return l;
}
function gt_lijnK(d) {
  const c = gt_lijnCfg(d);
  if (c.mid && c.k === c.ticks / 2) c.k++;
  const v = (c.a + c.k * c.stap + (c.stap === 10 ? 5 : 0)) / c.D;
  return line(`Waar ligt <b>${nl(v)}</b>?`, c.a / c.D, c.b / c.D, v,
    `Elk streepje is ${nl(c.stap / c.D)}. Tel de streepjes vanaf ${nl(c.a / c.D)}.`,
    { labels: gt_cfgLabels(c), ticks: c.ticks, tol: c.ticks === 20 ? 0.02 : 0.035, display: nl(v) });
}
function gt_afleesK(d) {
  const c = gt_lijnCfg(d);
  if (c.mid && c.k === c.ticks / 2) c.k++;
  const v = (c.a + c.k * c.stap) / c.D, labels = gt_cfgLabels(c);
  return num('Welk getal hoort bij de pijl?', v, `Van ${nl(labels[0])} tot ${nl(labels[1])} zijn ${c.mid ? c.ticks / 2 : c.ticks} stapjes. Hoeveel is één stapje?`,
    { vis: lineSVG(c.a / c.D, c.b / c.D, { arrow: v, labels, ticks: c.ticks, fmt: x => nl(x) }) });
}
const gt_heel = W => (W === 1 ? '1 hele' : `${W} helen`);
const gt_kn = (n, d) => `${n} ${n === 1 ? gt_KN1[d] : gt_KN[d]}`;
function gt_schema(d) {
  const h = ['E', ',', 't', 'h', 'd'].slice(0, 2 + d);
  return `<table class="vt gt-schema"><tr>${h.map(x => `<th>${x}</th>`).join('')}</tr><tr>${h.map(x => `<td>${x === ',' ? ',' : ''}</td>`).join('')}</tr></table>`;
}
function gt_omschr(d) {
  const W = R(0, 12), f = R(0, 2);
  let txt, n; // n in eenheden van 1/10^d
  if (d === 1) {
    if (f === 2) { const t = R(11, 39); txt = gt_kn(t, 1); n = t; }
    else { const t = R(1, 9), w = f === 0 ? Math.max(1, W) : 0; txt = w ? `${gt_heel(w)} en ${gt_kn(t, 1)}` : gt_kn(t, 1); n = w * 10 + t; }
  } else if (d === 2) {
    const w = Math.max(1, W), t = R(1, 9), h = R(1, 9);
    if (f === 0) { txt = `${gt_heel(w)} en ${gt_kn(h, 2)}`; n = w * 100 + h; }
    else if (f === 1) { txt = `${gt_heel(w)}, ${gt_kn(t, 1)} en ${gt_kn(h, 2)}`; n = w * 100 + 10 * t + h; }
    else { const m = R(10, 99); txt = Math.random() < 0.5 ? gt_kn(m, 2) : `${gt_heel(w)} en ${gt_kn(m, 2)}`; n = (txt.indexOf('hele') >= 0 ? w * 100 : 0) + m; }
  } else {
    const w = Math.max(1, W), t = R(1, 9), h = R(1, 9), k = R(1, 9);
    if (f === 0) { txt = `${gt_heel(w)} en ${gt_kn(k, 3)}`; n = w * 1000 + k; }
    else if (f === 1) {
      if (Math.random() < 0.5) { txt = `${gt_heel(w)}, ${gt_kn(t, 1)} en ${gt_kn(k, 3)}`; n = w * 1000 + 100 * t + k; }
      else { txt = `${gt_heel(w)}, ${gt_kn(h, 2)} en ${gt_kn(k, 3)}`; n = w * 1000 + 10 * h + k; }
    } else { const m = R(10, 999); txt = gt_kn(m, 3); n = m; }
  }
  return num(`Welk getal is <b>${txt}</b>?`, n / gt_kd(d),
    'Het 1e cijfer na de komma zijn de tienden, het 2e de honderdsten, het 3e de duizendsten. Vul lege plekken met een 0.', { vis: gt_schema(d) });
}
function gt_orderK(d) {
  const W = R(0, 9), a = R(1, 9);
  let b; do { b = R(1, 9); } while (b === a);
  let c;
  if (d === 1) {
    const w = Math.max(1, W);
    c = gt_distinct(5, () => R(Math.max(1, (w - 1) * 10), (w + 1) * 10 + 9), a !== w ? [w * 10 + a, a * 10 + w, w * 10] : [w * 10 + a, w * 10]);
  } else if (d === 2) c = shuffle([W * 100 + 10 * a, W * 100 + a, W * 100 + 10 * a + b, W * 100 + 10 * b + a, W * 100 + 10 * b]);
  else c = shuffle([...new Set([W * 1000 + 100 * a, W * 1000 + 10 * a, W * 1000 + a, W * 1000 + 100 * a + b, W * 1000 + 100 * b + 10 * a, W * 1000 + 10 * a + b])]);
  c = c.slice(0, R(4, 5));
  const vals = c.map(x => x / gt_kd(d));
  return order('Zet van klein naar groot.', vals.map(v => nl(v)), vals, 'Maak de getallen even lang achter de komma: 0,5 = 0,50 = 0,500. Vergelijk dan.');
}
function gt_afrondK(d) {
  const D = gt_kd(d), to = R(0, d - 1), u = gt_pow(d - to); // u = stap in eenheden van 1/D
  let n;
  for (let t = 0; t < 50; t++) {
    n = R(1, 20 * D);
    if (Math.random() < 0.25) n = Math.floor(n / u) * u + u / 2 + (u > 10 ? R(1, u / 10 - 1) : 0);
    if (n % u && n % 10) break;
  }
  if (!(n % u && n % 10)) n = u + 1;
  const v = Math.round(n / u) * u / D;
  const doel = to === 0 ? 'een heel getal' : to === 1 ? 'tienden (1 cijfer achter de komma)' : 'honderdsten (2 cijfers achter de komma)';
  const kijk = to === 0 ? 'het eerste cijfer na de komma (de tienden)' : to === 1 ? 'het tweede cijfer na de komma (de honderdsten)' : 'het derde cijfer na de komma (de duizendsten)';
  return num(`Rond <b>${nl(n / D)}</b> af op ${doel}.`, v, `Kijk naar ${kijk}. 5 of meer? Dan naar boven. 4 of minder? Dan naar beneden.`);
}

/* ===================== registratie ===================== */
function gt_kleinSub(N, id, title, groups, extra) {
  const ex = [
    { id: 'tellen', name: 'Plaatjes tellen', example: `Hoeveel ${gt_EMO[0]}?`, gen: () => gt_tellen(N) },
    { id: 'slepen', name: 'Het juiste aantal plaatjes neerzetten', example: 'Zet er 4 neer.', gen: () => gt_slepen(N) },
    { id: 'rij', name: 'Getallenrij invullen', example: N === 5 ? '1 2 _ 4 _' : '6 7 _ 9 _', gen: () => gt_rijKlein(N) },
    { id: 'ordenen', name: 'Van minder naar meer', example: N === 5 ? '3 1 4 0' : '8 2 6 5', gen: () => gt_orderKlein(N) },
    { id: 'lijn', name: 'Juiste plaats op de getallenlijn', example: 'Waar hoort 3?', gen: () => gt_lijnKlein(N) },
    { id: 'aflezen', name: 'Aflezen van de getallenlijn', example: 'Welk getal hoort bij de pijl?', gen: () => gt_afleesKlein(N) },
    { id: 'splitsplaatjes', name: 'Splitsen met hulp van plaatjes', example: N === 20 ? '15 = 9 + ?' : '5 = 2 + ?', gen: () => gt_splitsPl(N) },
    { id: 'splitsen', name: 'Splitsen', example: N === 20 ? '17 = 8 + ?' : '7 = 3 + ?', gen: () => gt_splits(N) }
  ];
  return { id, title, groups, ex: ex.concat(extra) };
}
const gt_dubbelEx = N => ({ id: 'dubbel', name: 'Het dubbele en de helft', example: N === 10 ? 'Het dubbele van 4' : N === 20 ? 'De helft van 16' : 'Het dubbele van 35', gen: () => gt_dubbel(N) });

defCat({
  id: 'getal100',
  domain: 'getallen',
  title: 'Getalbegrip tot 100',
  emoji: '🔢',
  groups: [1, 2, 3, 4],
  uitleg: `<p><b>Tellen</b> doe je één voor één. Wijs elk plaatje aan. Een groepje van <b>5</b> herken je snel.</p>
    <p><b>Splitsen</b>: je maakt van één getal twee stukjes. Samen zijn ze weer het hele getal.</p>
    <div class="voorbeeld">${splitshuis(7, 3, 4)} 7 = 3 + 4</div>
    <p>Een getal als 47 bestaat uit <b>tientallen</b> en <b>losse</b>: 4 tientallen en 7 losse.</p>
    <div class="voorbeeld">47 = 40 + 7</div>
    <p><b>Getallenlijn</b>: kijk eerst hoeveel één streepje is. Tel dan vanaf het dichtstbijzijnde getal.</p>
    <p><b>Het dubbele</b> is twee keer zoveel. <b>De helft</b> is eerlijk delen in twee.</p>
    <div class="voorbeeld">dubbele van 6 = 6 + 6 = 12 · helft van 12 = 6</div>`,
  subs: [
    gt_kleinSub(5, 'tot5', 'Tot 5', [1, 2, 3], []),
    gt_kleinSub(10, 'tot10', 'Tot 10', [1, 2, 3], [gt_dubbelEx(10)]),
    gt_kleinSub(20, 'tot20', 'Tot 20', [2, 3], [
      { id: 'tl', name: 'Splitsen in tientallen en lossen', example: '14 = 10 + 4', gen: () => gt_tl(20) },
      gt_dubbelEx(20)
    ]),
    { id: 'tot100', title: 'Tot 100', groups: [3, 4], ex: [
      { id: 'rij', name: 'Getallenrij invullen', example: '38 39 _ 41 _', gen: gt_rij100 },
      { id: 'ordenen', name: 'Getallen van klein naar groot', example: '47 74 12 60 9', gen: gt_order100 },
      { id: 'vijftallen', name: 'Vijftallen invullen', example: '5 10 _ 20 _', gen: gt_vijf },
      { id: 'tientallen', name: 'Tientallen invullen', example: '10 20 _ 40 _', gen: gt_tien },
      { id: 'sprong10', name: 'Tellen met sprongen van 10', example: '54 64 _ 84', gen: gt_sprong10 },
      { id: 'lijn', name: 'Juiste plaats op de getallenlijn', example: 'Waar ligt 63?', gen: gt_lijn100 },
      { id: 'aflezen', name: 'Aflezen van de getallenlijn', example: 'Welk getal hoort bij de pijl?', gen: gt_aflees100 },
      { id: 'tl', name: 'Splitsen in tientallen en lossen', example: '47 = 40 + 7', gen: () => gt_tl(100) },
      { id: 'woord', name: 'Van woord naar getal en andersom', example: 'zevenenveertig = 47', gen: gt_woord100 },
      gt_dubbelEx(100)
    ]}
  ]
});

function gt_grootSub(L, id, title, groups, eg) {
  return { id, title, groups, ex: [
    { id: 'rij', name: 'Getallenrij invullen', example: eg.rij, gen: () => gt_rijGroot(L) },
    { id: 'ordenen', name: 'Getallen van klein naar groot', example: eg.ord, gen: () => gt_orderGroot(L) },
    { id: 'sprongen', name: 'Tellen met sprongen', example: eg.spr, gen: () => gt_sprongGroot(L) },
    { id: 'lijn', name: 'Juiste plaats op de getallenlijn', example: `Waar ligt ${eg.lijn}?`, gen: () => gt_lijnGroot(L) },
    { id: 'aflezen', name: 'Aflezen van de getallenlijn', example: 'Welk getal hoort bij de pijl?', gen: () => gt_afleesGroot(L) },
    { id: 'afronden', name: 'Afronden', example: eg.afr, gen: () => gt_afronden(L) },
    { id: 'woord', name: 'Van woord naar getal en andersom', example: eg.wrd, gen: () => gt_woordGroot(L) },
    { id: 'positie', name: 'Positiewaarden', example: eg.pos, gen: () => gt_positie(L) }
  ]};
}
const gt_mSub = (M, id, title) => ({ id, title, groups: [7, 8], ex: [
  { id: 'lijn', name: 'Juiste plaats op de getallenlijn', example: `Waar ligt 3,5 ${gt_mWords(M)[0]}?`, gen: () => gt_lijnM(M) },
  { id: 'aflezen', name: 'Aflezen van de getallenlijn', example: 'Welk getal hoort bij de pijl?', gen: () => gt_afleesM(M) },
  { id: 'komma', name: 'Van kommagetal naar cijfers en andersom', example: `2,5 ${gt_mWords(M)[0]} = ${gt_f(2.5 * M)}`, gen: () => gt_kommaM(M) }
]});

defCat({
  id: 'getalgroot',
  domain: 'getallen',
  title: 'Getalbegrip boven de 100',
  emoji: '🏔️',
  groups: [5, 6, 7, 8],
  uitleg: `<p>Elk cijfer in een getal heeft een <b>plaats</b>. De plaats bepaalt hoeveel het cijfer waard is.</p>
    <table class="vt"><tr><th>D</th><th>H</th><th>T</th><th>E</th></tr><tr><td>4</td><td>7</td><td>3</td><td>5</td></tr></table>
    <div class="voorbeeld">4.735 = 4.000 + 700 + 30 + 5 → de 7 is <b>700</b> waard</div>
    <p>Grote getallen lees je in groepjes van 3 cijfers. De punt helpt: 12.500 = twaalfduizend vijfhonderd.</p>
    <p><b>Afronden</b>: kijk naar het cijfer rechts van de plek waarop je afrondt. <b>5 of meer: naar boven. 4 of minder: naar beneden.</b></p>
    <div class="voorbeeld">3.478 op honderdtallen → kijk naar de 7 → naar boven → <b>3.500</b></div>
    <p><b>Getallenlijn</b>: deel het stuk tussen twee getallen door het aantal stapjes. Zo weet je hoeveel één stapje is.</p>
    <div class="voorbeeld">2,5 miljoen = 2.500.000 · 1 miljard = 1.000 miljoen</div>`,
  subs: [
    gt_grootSub(1e3, 't1000', 'Tot 1000', [5], { rij: '398 399 _ 401', ord: '345 354 435 543', spr: '237 247 _ 267', lijn: '650', afr: 'Rond 478 af op tientallen', wrd: 'driehonderdzeven = 307', pos: 'De waarde van de 4 in 347' }),
    gt_grootSub(1e4, 't10000', 'Tot 10.000', [5, 6], { rij: '3.998 3.999 _ 4.001', ord: '4.735 4.753 4.375', spr: '2.450 3.450 _ 5.450', lijn: '6.500', afr: 'Rond 3.478 af op honderdtallen', wrd: 'vierduizend vijfendertig = 4.035', pos: 'De waarde van de 7 in 4.735' }),
    gt_grootSub(1e5, 't100000', 'Tot 100.000', [6, 7], { rij: '39.998 39.999 _', ord: '45.120 45.210 41.520', spr: '12.500 22.500 _', lijn: '35.000', afr: 'Rond 46.512 af op duizendtallen', wrd: 'twaalfduizend vijfhonderd = 12.500', pos: 'De waarde van de 6 in 36.418' }),
    gt_grootSub(1e6, 't1000000', 'Tot 1.000.000', [7, 8], { rij: '299.998 299.999 _', ord: '450.300 405.300 453.000', spr: '125.000 135.000 _', lijn: '650.000', afr: 'Rond 348.512 af op tienduizendtallen', wrd: 'driehonderdduizend = 300.000', pos: 'De waarde van de 8 in 582.143' }),
    gt_mSub(1e6, 'miljoen', 'Miljoenen'),
    gt_mSub(1e9, 'miljard', 'Miljarden')
  ]
});

const gt_kSub = (d, id, title, groups, eg) => ({ id, title, groups, ex: [
  { id: 'rij', name: 'Getallenrij invullen', example: eg.rij, gen: () => gt_rijK(d) },
  { id: 'lijn', name: 'Juiste plaats op de getallenlijn', example: `Waar ligt ${eg.lijn}?`, gen: () => gt_lijnK(d) },
  { id: 'aflezen', name: 'Aflezen van de getallenlijn', example: 'Welk getal hoort bij de pijl?', gen: () => gt_afleesK(d) },
  { id: 'omschrijving', name: 'Omschrijving naar getal', example: eg.oms, gen: () => gt_omschr(d) },
  { id: 'ordenen', name: 'Van klein naar groot', example: eg.ord, gen: () => gt_orderK(d) },
  { id: 'afronden', name: 'Afronden', example: eg.afr, gen: () => gt_afrondK(d) }
]});

defCat({
  id: 'komma',
  domain: 'getallen',
  title: 'Getalbegrip kommagetallen',
  emoji: '🔸',
  groups: [6, 7, 8],
  uitleg: `<p>Achter de komma staan de stukjes van een heel getal. Het 1e cijfer zijn de <b>tienden</b>, het 2e de <b>honderdsten</b>, het 3e de <b>duizendsten</b>.</p>
    <table class="vt"><tr><th>E</th><th>,</th><th>t</th><th>h</th><th>d</th></tr><tr><td>3</td><td>,</td><td>0</td><td>5</td><td>0</td></tr></table>
    <div class="voorbeeld">3 helen en 5 honderdsten = <b>3,05</b> (de 0 houdt de plek van de tienden vrij)</div>
    <p><b>Vergelijken</b>: maak de getallen even lang met nullen achteraan. 0,5 = 0,50 = 0,500. Dus 0,5 is groter dan 0,45.</p>
    <p><b>Afronden</b>: kijk naar het cijfer rechts van de plek waarop je afrondt. <b>5 of meer: naar boven.</b></p>
    <div class="voorbeeld">4,67 op tienden → kijk naar de 7 → <b>4,7</b> · 2,349 op honderdsten → <b>2,35</b></div>
    <p><b>Getallenlijn</b>: tussen 2 en 3 zitten 10 tienden: 2,1 – 2,2 – … – 2,9.</p>`,
  subs: [
    gt_kSub(1, 'tienden', 'Tot tienden', [6], { rij: '2,8 2,9 _ 3,1', lijn: '0,7', oms: '3 helen en 5 tienden = 3,5', ord: '2,3 3,2 2 1,9', afr: 'Rond 4,6 af op een heel getal' }),
    gt_kSub(2, 'honderdsten', 'Tot honderdsten', [6, 7], { rij: '4,97 4,98 _ 5', lijn: '2,35', oms: '3 helen en 5 honderdsten = 3,05', ord: '3,4 3,04 3,45', afr: 'Rond 3,47 af op tienden' }),
    gt_kSub(3, 'duizendsten', 'Tot duizendsten', [7, 8], { rij: '1,998 1,999 _', lijn: '4,275', oms: '3 helen en 5 duizendsten = 3,005', ord: '0,5 0,45 0,405', afr: 'Rond 2,349 af op honderdsten' })
  ]
});
