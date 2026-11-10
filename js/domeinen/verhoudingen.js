/* Rekenraket – domein Verhoudingen: verhoudingstabellen, breuken, procenten, relatie, schaal.
   Alle globale namen beginnen met vh_. */
import { choice, colour, defCat, fracHTML, gcd, line, multi, nl, num, order, pick, pieSVG, R, round, shuffle, stripSVG, tableHTML } from '../kern.js';

/* ===================== hulpfuncties ===================== */
const vh_lcm = (a, b) => a / gcd(a, b) * b;
/* breuk als tekst (wordt in q/keuzes automatisch gestapeld). Gemengd: "1 1/4" */
function vh_mx(w, n, d) {
  if (!n) return String(w);
  return w ? `${w} ${n}/${d}` : `${n}/${d}`;
}
/* Antwoordtekst: vereenvoudigd, en bij meer dan 1 ook als gemengd getal */
function vh_ans(n, d) {
  const g = gcd(n, d); n /= g; d /= g;
  if (d === 1) return String(n);
  if (n < d) return `${n}/${d}`;
  return `${n}/${d} = ${vh_mx(Math.floor(n / d), n % d, d)}`;
}
/* num-vraag met een breuk als antwoord */
function vh_fnum(q, n, d, hint, o = {}) {
  return num(q, n / d, hint, Object.assign({ frac: true, a: vh_ans(n, d) }, o));
}
/* gestapelde breuk met invulvakjes */
const vh_fin = (a, b) => `<span class="frac vh-fin"><span>${a}</span><span>${b}</span></span>`;
/* bedrag: heel getal zonder komma, anders 2 decimalen */
const vh_geld = v => (Number.isInteger(round(v, 6)) ? nl(v) : v.toFixed(2).replace('.', ','));
const vh_eur = v => '€ ' + vh_geld(v);
function vh_money(q, v, hint, o = {}) {
  return num(q, round(v, 2), hint, Object.assign({ unit: '€', pre: true, a: vh_eur(v) }, o));
}
function vh_pickN(arr, n) { return shuffle(arr).slice(0, n); }
/* teller 1..d-1 die niet te vereenvoudigen is */
function vh_cop(d) { const c = []; for (let n = 1; n < d; n++) if (gcd(n, d) === 1) c.push(n); return pick(c); }

/* ===================== verhoudingstabel ===================== */
/* top/bot: waarden; bt/bb: true = invulvakje. Nummering per rij van links naar rechts. */
function vh_tabel(h1, h2, top, bot, bt, bb) {
  let i = 0;
  const blanks = [];
  const cell = (v, b, geld) => {
    if (b) { blanks.push(v); return `<td class="vh-blank">{{${i++}}}</td>`; }
    return `<td>${geld ? vh_geld(v) : nl(v, v >= 10000)}</td>`;
  };
  let html = `<table class="vh-tab"><tr><th>${h1}</th>${top.map((v, k) => cell(v, bt[k], h1.includes('€'))).join('')}</tr>`;
  html += `<tr><th>${h2}</th>${bot.map((v, k) => cell(v, bb[k], h2.includes('€'))).join('')}</tr></table>`;
  return { html: `<div class="vh-tabwrap">${html}</div>`, blanks };
}
/* contexten: r = onderste waarde bij 1 bovenste; ri = hele getallen, rd = kommagetallen; dt = boven mag ,5 zijn */
const VH_CTX = [
  { h1: 'pakken koek', h2: 'prijs (€)', ri: [2, 3, 4, 5, 6], rd: [0.8, 1.2, 1.25, 1.5, 2.5, 0.75], dt: false, s: (t, b) => `${nl(t)} pakken koek kosten € ${vh_geld(b)}.` },
  { h1: 'personen', h2: 'gram bloem', ri: [25, 50, 75, 100, 30, 40], rd: [], dt: false, s: (t, b) => `Voor ${nl(t)} personen heb je ${nl(b)} gram bloem nodig.` },
  { h1: 'personen', h2: 'liter melk', ri: [], rd: [0.25, 0.2, 0.3, 0.15, 0.5, 0.4], dt: false, s: (t, b) => `Voor ${nl(t)} personen heb je ${nl(b)} liter melk nodig.` },
  { h1: 'afstand (km)', h2: 'tijd (minuten)', ri: [3, 4, 5, 6], rd: [3.5, 4.5, 2.5], dt: true, s: (t, b) => `Mila fietst ${nl(t)} km in ${nl(b)} minuten.` },
  { h1: 'kilo appels', h2: 'prijs (€)', ri: [2, 3, 4], rd: [1.2, 1.5, 2.5, 0.8, 1.75, 2.25], dt: true, s: (t, b) => `${nl(t)} kilo appels kost € ${vh_geld(b)}.` },
  { h1: 'liter benzine', h2: 'afstand (km)', ri: [12, 15, 16, 18, 20], rd: [12.5, 14.5, 16.5], dt: true, s: (t, b) => `Met ${nl(t)} liter benzine rijdt de auto ${nl(b)} km.` },
  { h1: 'uren werken', h2: 'verdiend (€)', ri: [8, 9, 10, 12, 15], rd: [7.5, 8.5, 9.25, 12.5], dt: true, s: (t, b) => `Voor ${nl(t)} uur werken krijgt Sem € ${vh_geld(b)}.` },
  { h1: 'zakjes', h2: 'snoepjes', ri: [6, 8, 12, 15, 20, 24], rd: [], dt: false, s: (t, b) => `In ${nl(t)} zakjes zitten ${nl(b)} snoepjes.` },
  { h1: 'meter stof', h2: 'prijs (€)', ri: [4, 5, 6, 8], rd: [4.5, 3.25, 6.5, 2.8, 5.5], dt: true, s: (t, b) => `${nl(t)} meter stof kost € ${vh_geld(b)}.` }
];
/* Kies context, verhouding en 4 kolommen (eerste kolom = startkolom) */
function vh_vtSetup(dec) {
  const ctx = pick(VH_CTX.filter(c => (dec ? c.rd.length : c.ri.length)));
  const r = dec ? pick(ctx.rd) : pick(ctx.ri);
  const twoDec = Math.round(r * 100) % 10 !== 0;
  const halves = dec && ctx.dt && !twoDec;
  const t0 = halves && Math.random() < 0.4 ? pick([1.5, 2.5]) : pick([2, 3, 4, 5, 6]);
  let cand = [1, t0 * 2, t0 * 3, t0 * 4, t0 * 5, t0 * 10, t0 / 2, t0 + 1, t0 * 2 + 1];
  if (halves) cand = cand.concat([0.5, t0 * 1.5, 2.5, 3.5, 4.5]);
  cand = [...new Set(cand.map(x => round(x, 3)))].filter(x => x > 0 && x !== t0 && x <= 100 && (halves ? Number.isInteger(x * 2) : Number.isInteger(x)));
  if (!dec) cand = cand.filter(x => x * r <= 2000);
  const others = vh_pickN(cand, 3).sort((a, b) => a - b);
  const top = [t0, ...others], bot = top.map(t => round(t * r, 3));
  return { ctx, r, top, bot };
}
function vh_vtHint(s) {
  return `Kijk in de eerste kolom: bij ${nl(s.top[0])} hoort ${nl(s.bot[0])}. Wat hoort er bij 1? Of: met welk getal doe je de bovenste rij keer? Doe met de onderste rij hetzelfde.`;
}
function vh_vtOnder(dec) {
  const s = vh_vtSetup(dec);
  const t = vh_tabel(s.ctx.h1, s.ctx.h2, s.top, s.bot, [0, 0, 0, 0], [0, 1, 1, 1]);
  return multi(`${s.ctx.s(s.top[0], s.bot[0])} Vul de onderste rij in.`, t.blanks, vh_vtHint(s), { vis: t.html });
}
function vh_vtBeide(dec) {
  const s = vh_vtSetup(dec);
  let bt, bb;
  do {
    bt = [0]; bb = [0];
    for (let k = 1; k < 4; k++) { const up = Math.random() < 0.5; bt.push(up ? 1 : 0); bb.push(up ? 0 : 1); }
  } while (!bt.some(x => x) || !bb.some(x => x));
  const t = vh_tabel(s.ctx.h1, s.ctx.h2, s.top, s.bot, bt, bb);
  return multi(`${s.ctx.s(s.top[0], s.bot[0])} Vul de tabel verder in.`, t.blanks, vh_vtHint(s) + ' Een bovenste vakje leeg? Reken dan terug: delen in plaats van keer.', { vis: t.html });
}
function vh_vtHeel(dec) {
  const s = vh_vtSetup(dec);
  /* startkolom alleen in het verhaal; in de tabel van elke kolom één getal */
  let top = s.top.slice(1), bot = s.bot.slice(1);
  const extra = round(s.top[0] * pick([2, 3]), 3);
  if (!top.includes(extra) && extra <= 100) { top.push(extra); bot.push(round(extra * s.r, 3)); }
  else { top.unshift(1); bot.unshift(round(s.r, 3)); }
  if (top.filter(x => x === 1).length > 1) { top = s.top.slice(1); bot = s.bot.slice(1); }
  const idx = top.map((_, i) => i).sort((a, b) => top[a] - top[b]);
  top = idx.map(i => top[i]); bot = idx.map(i => bot[i]);
  let bt;
  do { bt = top.map(() => (Math.random() < 0.5 ? 1 : 0)); } while (!bt.some(x => x) || bt.every(x => x));
  const bb = bt.map(x => 1 - x);
  const t = vh_tabel(s.ctx.h1, s.ctx.h2, top, bot, bt, bb);
  return multi(`${s.ctx.s(s.top[0], s.bot[0])} Vul de hele tabel in.`, t.blanks,
    `Zet eerst ${nl(s.top[0])} en ${nl(s.bot[0])} in je hoofd (of op een kladblaadje) als startkolom. Reken dan uit wat er bij 1 hoort, of zoek een handige keersom.`, { vis: t.html });
}

defCat({
  id: 'vtabel', domain: 'verhoudingen', title: 'Verhoudingstabellen', emoji: '📋', groups: [6, 7, 8],
  uitleg: `<p>In een <b>verhoudingstabel</b> doe je boven en onder <b>hetzelfde</b>. Doe je boven keer 3, dan doe je onder ook keer 3.</p>
    <div class="voorbeeld">${tableHTML([['pakken', '2', '6', '1', '5'], ['prijs (€)', '4', '12', '2', '10']], 'vh-tab')}</div>
    <p>Stappen: 2 → 6 is <b>× 3</b>, dus 4 × 3 = 12. Van 2 naar 1 is <b>: 2</b>, dus 4 : 2 = 2. Bij 5 pakken: 5 × 2 = 10.</p>
    <p>Tip: reken eerst uit wat er bij <b>1</b> hoort. Daarna kun je alles uitrekenen.</p>
    <div class="voorbeeld">1,5 kilo kost € 3 → 0,5 kilo kost € 1 → 2,5 kilo kost <b>€ 5</b></div>`,
  subs: [
    { id: 'heel', title: 'Met hele getallen', groups: [6, 7, 8], ex: [
      { id: 'onder', name: 'Alleen de onderste rij invullen', example: '2 pakken = € 6 → 4, 10 pakken?', gen: () => vh_vtOnder(false) },
      { id: 'beide', name: 'Beide rijen invullen', example: 'vakjes boven én onder', gen: () => vh_vtBeide(false) },
      { id: 'tabel', name: 'Hele tabel invullen', example: 'start alleen in het verhaal', gen: () => vh_vtHeel(false) }
    ]},
    { id: 'komma', title: 'Met kommagetallen', groups: [7, 8], ex: [
      { id: 'beide', name: 'Beide rijen invullen', example: '1 kilo = € 1,25', gen: () => (Math.random() < 0.35 ? vh_vtOnder(true) : vh_vtBeide(true)) },
      { id: 'tabel', name: 'Hele tabel invullen', example: '2,5 kilo = € 5', gen: () => vh_vtHeel(true) }
    ]}
  ]
});

/* ===================== breuken ===================== */
function vh_colsFor(cells) {
  if (cells <= 12) return cells;
  for (const c of [10, 8, 9, 6, 12, 7]) if (cells % c === 0) return c;
  return cells;
}
function vh_welk() {
  const d = pick([2, 3, 4, 5, 6, 8, 10, 12]), n = R(1, d - 1);
  const strip = d >= 3 && Math.random() < 0.4;
  const vis = strip ? `<div class="vh-vis"><div class="vh-stripbox" style="max-width:${Math.min(320, d * 40)}px">${stripSVG(n, d)}</div></div>` : `<div class="vh-vis">${pieSVG(n, d)}</div>`;
  return choice('Welk deel is gekleurd?', `${n}/${d}`, [`${d - n}/${d}`, `${n}/${d - n}`, `${n + 1}/${d}`, `${n}/${d + 1}`, `${d}/${n}`],
    'Tel eerst alle stukken: dat is de noemer (onder). Tel dan de gekleurde stukken: dat is de teller (boven).', { vis });
}
function vh_kleur() {
  const d = pick([2, 3, 4, 5, 6, 8, 10]), n = Math.random() < 0.75 ? vh_cop(d) : R(1, d - 1);
  const ks = [1, 2, 3, 4].filter(k => d * k <= 24 && d * k >= 4);
  const k = pick(ks), cells = d * k;
  return colour(`Kleur ${n}/${d} van de vakjes.`, cells, n * k,
    k === 1 ? `Er zijn ${cells} vakjes, dus elk vakje is 1/${d}.` : `Verdeel de ${cells} vakjes eerst in ${d} gelijke groepjes. Hoeveel vakjes zitten in één groepje?`,
    { cols: vh_colsFor(cells) });
}
function vh_lijn() {
  const tot = Math.random() < 0.4 ? 2 : 1;
  const d = pick([2, 3, 4, 5, 6, 8, 10]);
  const n = R(1, tot * d - 1);
  if (n === d) return vh_lijn();
  const ticks = tot * d;
  const shown = n > d && Math.random() < 0.5 ? vh_mx(Math.floor(n / d), n % d, d) : `${n}/${d}`;
  return line(`Tik aan waar ${shown} ligt.`, 0, tot, n / d,
    `Tussen 0 en 1 zitten ${d} gelijke stapjes. Elk stapje is 1/${d}. Tel de stapjes.`,
    { labels: tot === 2 ? [0, 1, 2] : [0, 1], ticks, tol: Math.min(0.04, 0.4 / ticks), display: shown });
}
function vh_orde() {
  const m = R(0, 2);
  let fr = [];
  if (m === 0) { const d = pick([5, 6, 7, 8, 9, 10, 12]); fr = vh_pickN([...Array(d - 1).keys()].map(i => i + 1), 4).map(n => [n, d]); }
  else if (m === 1) { const n = pick([1, 1, 2, 3]); fr = vh_pickN([2, 3, 4, 5, 6, 8, 10, 12].filter(d => d > n), 4).map(d => [n, d]); }
  else {
    const pool = [[1, 2], [1, 4], [3, 4], [1, 3], [2, 3], [1, 5], [4, 5], [1, 10], [9, 10], [3, 8], [5, 8], [2, 5], [7, 10], [5, 6], [1, 8]];
    const seen = new Set();
    for (const f of shuffle(pool)) { const v = round(f[0] / f[1]); if (!seen.has(v)) { seen.add(v); fr.push(f); } if (fr.length === 4) break; }
  }
  const desc = Math.random() < 0.3;
  return order(`Zet de breuken op volgorde, van ${desc ? 'groot naar klein' : 'klein naar groot'}.`, fr.map(f => fracHTML(`${f[0]}/${f[1]}`)), fr.map(f => f[0] / f[1]),
    m === 0 ? 'De noemers zijn gelijk. Kijk dus alleen naar de tellers.' : m === 1 ? 'De tellers zijn gelijk. Hoe groter de noemer, hoe kleiner de stukken!' : 'Vergelijk elke breuk met 1/2. Of maak de noemers gelijk.',
    { desc });
}
/* breuk-operand: {w, n, d}; totale teller = w*d+n */
const vh_tn = o => o.w * o.d + o.n;
function vh_op(o) { return vh_mx(o.w, o.n, o.d); }
function vh_plusmin(pairs, mixedKans) {
  const [d1, d2] = shuffle(pick(pairs));
  const mk = d => ({ w: Math.random() < mixedKans ? R(1, 3) : 0, n: vh_cop(d), d });
  let a = mk(d1), b = mk(d2);
  const L = vh_lcm(d1, d2);
  let A = vh_tn(a) * L / d1, B = vh_tn(b) * L / d2;
  const plus = Math.random() < 0.5;
  if (!plus) {
    if (A === B) return vh_plusmin(pairs, mixedKans);
    if (A < B) { [a, b] = [b, a]; [A, B] = [B, A]; }
  }
  const res = plus ? A + B : A - B;
  const q = `${vh_op(a)} ${plus ? '+' : '−'} ${vh_op(b)} = ?`;
  const hint = d1 === d2 ? `De noemers zijn gelijk. ${plus ? 'Tel de tellers op' : 'Haal de tellers van elkaar af'}; de noemer blijft ${d1}.${a.w || b.w ? ' Reken eerst met de hele getallen.' : ''}`
    : `Maak de noemers eerst gelijk. Zoek een getal waar ${d1} en ${d2} allebei in passen, bijvoorbeeld ${L}.`;
  return vh_fnum(q, res, L, hint + ' Typ je antwoord als breuk.');
}
const VH_GELIJK = [3, 4, 5, 6, 7, 8, 9, 10, 12].map(d => [d, d]);
const VH_EENV = [[2, 4], [3, 6], [4, 8], [2, 6], [5, 10], [2, 8], [3, 9], [4, 12], [2, 10], [3, 12], [6, 12]];
const VH_MOEIL = [[2, 3], [3, 4], [2, 5], [3, 5], [4, 6], [6, 8], [4, 10], [3, 8], [5, 6], [4, 5], [6, 9], [8, 12], [6, 10], [2, 7], [3, 10]];

function vh_heelxbreuk() {
  const d = pick([2, 3, 4, 5, 6, 8, 10]), n = R(1, d - 1), k = R(2, 9);
  return vh_fnum(`${k} × ${n}/${d} = ?`, k * n, d, `${k} keer ${n}/${d} is ${k} keer zoveel stukjes van 1/${d}. Doe ${k} × de teller; de noemer blijft ${d}.`);
}
function vh_heelxgem() {
  const d = pick([2, 3, 4, 5, 8]), n = R(1, d - 1), w = R(1, 4), k = R(2, 6);
  return vh_fnum(`${k} × ${vh_mx(w, n, d)} = ?`, k * (w * d + n), d, `Splits: ${k} × ${w} en ${k} × ${n}/${d}. Tel die twee daarna op.`);
}
function vh_breukxbreuk() {
  const d1 = pick([2, 3, 4, 5, 6, 8]), d2 = pick([2, 3, 4, 5, 6, 10]);
  const n1 = vh_cop(d1), n2 = vh_cop(d2);
  return vh_fnum(`${n1}/${d1} × ${n2}/${d2} = ?`, n1 * n2, d1 * d2, 'Teller keer teller en noemer keer noemer. Je mag het antwoord vereenvoudigen.');
}
function vh_deelGelijk() {
  const d = pick([4, 5, 6, 8, 10, 12]);
  let a = R(1, 2 * d - 1), b = R(1, d - 1);
  if (a === b) a = b * pick([2, 3]);
  if (Math.random() < 0.5 && b * 2 < 2 * d) a = b * R(2, Math.max(2, Math.floor((2 * d - 1) / b)));
  return vh_fnum(`${a}/${d} : ${b}/${d} = ?`, a, b,
    `De noemers zijn gelijk. Dan is het: hoe vaak ${b > 1 ? `passen ${b} stukjes` : 'past 1 stukje'} in ${a} stukje${a > 1 ? 's' : ''}? Typ een breuk als het niet precies past.`);
}
function vh_deelOngelijk() {
  if (Math.random() < 0.3) {
    const k = R(2, 6), d = pick([2, 3, 4, 5, 8, 10]);
    return vh_fnum(`${k} : 1/${d} = ?`, k * d, 1, `Hoeveel stukjes van 1/${d} passen in 1 hele? En dan in ${k} hele?`);
  }
  const [d1, d2] = shuffle(pick(VH_EENV.concat(VH_MOEIL)));
  const n1 = vh_cop(d1), n2 = vh_cop(d2);
  if (n1 * d2 === n2 * d1) return vh_deelOngelijk();
  return vh_fnum(`${n1}/${d1} : ${n2}/${d2} = ?`, n1 * d2, d1 * n2,
    `Maak de noemers eerst gelijk (bijvoorbeeld ${vh_lcm(d1, d2)}). Deel daarna de tellers door elkaar. Of: keer het omgekeerde van de tweede breuk.`);
}
function vh_vereenv() {
  const d = R(2, 12); let n = R(1, d - 1);
  while (gcd(n, d) !== 1) n = R(1, d - 1);
  const k = pick([2, 2, 3, 3, 4, 5, 6, 7, 8, 9].filter(x => x * d <= 100));
  return multi(`Schrijf zo eenvoudig mogelijk.<br>${fracHTML(`${n * k}/${d * k}`)} = ${vh_fin('{{0}}', '{{1}}')}`, [n, d],
    `Zoek een getal waardoor je zowel ${n * k} als ${d * k} kunt delen. Ga door tot het niet meer kan.`);
}
function vh_helen() {
  const d = R(2, 12); let r = R(1, d - 1);
  while (gcd(r, d) !== 1) r = R(1, d - 1);
  const w = R(1, 5);
  return multi(`Haal de helen uit de breuk.<br>${fracHTML(`${w * d + r}/${d}`)} = {{0}} ${vh_fin('{{1}}', '{{2}}')}`, [w, r, d],
    `${d}/${d} is 1 hele. Hoe vaak past ${d} in ${w * d + r}? Wat blijft er over?`);
}
const VH_DINGEN = [['kinderen', 'gaan', 'gaat', 'met de fiets naar school'], ['knikkers', 'zijn', 'is', 'blauw'], ['appels', 'zijn', 'is', 'rood'], ['boeken', 'zijn', 'is', 'een strip'], ['ballonnen', 'zijn', 'is', 'geel'], ['leerlingen', 'hebben', 'heeft', 'een huisdier']];
function vh_aanvul() {
  const d = pick([2, 3, 4, 5, 6, 8, 10, 12]), n = R(1, d - 1);
  if (Math.random() < 0.3) {
    const w = R(1, 4);
    return vh_fnum(`${vh_mx(w, n, d)} + ? = ${w + 1}`, d - n, d, `Hoeveel stukjes van 1/${d} heb je nog nodig tot de volgende hele?`);
  }
  return vh_fnum(`${n}/${d} + ? = 1`, d - n, d, `1 hele = ${d}/${d}. Hoeveel stukjes van 1/${d} mis je nog?`);
}
function vh_deel() {
  const d = pick([2, 3, 4, 5, 6, 8, 10]), n = R(1, d - 1), k = R(2, 8);
  const [wat, pl, , rest] = pick(VH_DINGEN);
  return vh_fnum(`Er zijn ${d * k} ${wat}. Daarvan ${pl} er ${n * k} ${rest}. Welk deel is dat?`, n * k, d * k,
    'Zet het deel boven de streep en het totaal eronder. Vereenvoudig daarna als het kan.');
}
function vh_van() {
  const d = pick([2, 3, 4, 5, 6, 8, 10]), n = Math.random() < 0.5 ? 1 : R(1, d - 1), k = pick([R(2, 12), R(2, 12), 10, 20, 25]);
  return num(`${n}/${d} van ${d * k} = ?`, n * k, `Deel eerst door de noemer: 1/${d} van ${d * k} = ${d * k} : ${d}. Doe dat daarna keer de teller.`);
}
function vh_totaal() {
  const d = pick([2, 3, 4, 5, 6, 8, 10]), n = R(1, d - 1), k = R(2, 10);
  const [wat, , sg, rest] = pick(VH_DINGEN);
  return num(`${n}/${d} van de ${wat} ${sg} ${rest}. Dat zijn er ${n * k}. Hoeveel ${wat} zijn er in totaal?`, d * k,
    n === 1 ? `1/${d} is ${k}. Uit hoeveel stukjes van 1/${d} bestaat het geheel?` : `Als ${n}/${d} gelijk is aan ${n * k}, hoeveel is dan 1/${d}? En hoeveel stukjes van 1/${d} heb je in totaal?`);
}

defCat({
  id: 'breuken', domain: 'verhoudingen', title: 'Breuken', emoji: '🍕', groups: [6, 7, 8],
  uitleg: `<p>Een <b>breuk</b> is een deel van een geheel. De <b>noemer</b> (onder) zegt in hoeveel gelijke stukken het geheel is verdeeld. De <b>teller</b> (boven) zegt hoeveel stukken je hebt.</p>
    <div class="voorbeeld">${pieSVG(3, 4)} = ${fracHTML('3/4')}</div>
    <p><b>Vereenvoudigen:</b> deel teller en noemer door hetzelfde getal.</p>
    <div class="voorbeeld">${fracHTML('6/8')} → beide : 2 → <b>${fracHTML('3/4')}</b></div>
    <p><b>Ongelijknamig → gelijknamig:</b> maak eerst de noemers gelijk, tel dan de tellers op.</p>
    <div class="voorbeeld">${fracHTML('1/3')} + ${fracHTML('1/4')} = ${fracHTML('4/12')} + ${fracHTML('3/12')} = <b>${fracHTML('7/12')}</b></div>
    <p><b>Helen eruit halen:</b> ${fracHTML('7/4')} = ${fracHTML('4/4')} + ${fracHTML('3/4')} = <b>1 ${fracHTML('3/4')}</b></p>
    <p><b>Breuk van een getal:</b> ${fracHTML('3/4')} van 20 → 20 : 4 = 5 → 3 × 5 = <b>15</b></p>
    <p>Typ een breuk met de <b>/</b> toets, bijvoorbeeld 3/4. Meer dan 1? Typ dan bijvoorbeeld 7/4.</p>`,
  subs: [
    { id: 'begrip', title: 'Begrip', groups: [6, 7, 8], ex: [
      { id: 'welk', name: 'Welk deel is gekleurd?', example: '3 van de 4 stukken', gen: vh_welk },
      { id: 'kleur', name: 'Kleur het juiste deel', example: 'kleur 2/3', gen: vh_kleur },
      { id: 'lijn', name: 'Op de getallenlijn plaatsen', example: 'waar ligt 3/4?', gen: vh_lijn },
      { id: 'orde', name: 'Van klein naar groot zetten', example: '1/2, 1/3, 1/5', gen: vh_orde }
    ]},
    { id: 'optel', title: 'Optellen en aftrekken', groups: [7, 8], ex: [
      { id: 'gelijk', name: 'Gelijknamige breuken', example: '2/5 + 1/5', gen: () => vh_plusmin(VH_GELIJK, 0.25) },
      { id: 'eenv', name: 'Eenvoudige ongelijknamige breuken', example: '1/2 + 1/4', gen: () => vh_plusmin(VH_EENV, 0.15) },
      { id: 'moeil', name: 'Moeilijke ongelijknamige breuken', example: '2/3 + 3/4', gen: () => vh_plusmin(VH_MOEIL, 0.3) }
    ]},
    { id: 'verm', title: 'Vermenigvuldigen', groups: [8], ex: [
      { id: 'heelbreuk', name: 'Heel getal × breuk', example: '3 × 2/5', gen: vh_heelxbreuk },
      { id: 'heelgem', name: 'Heel getal × heel getal + breuk', example: '3 × 2 1/4', gen: vh_heelxgem },
      { id: 'breukbreuk', name: 'Breuk × breuk', example: '2/3 × 3/4', gen: vh_breukxbreuk }
    ]},
    { id: 'delen', title: 'Delen', groups: [8], ex: [
      { id: 'gelijk', name: 'Gelijknamige breuken delen', example: '6/8 : 2/8', gen: vh_deelGelijk },
      { id: 'ongelijk', name: 'Ongelijknamige breuken delen', example: '3/4 : 1/8', gen: vh_deelOngelijk }
    ]},
    { id: 'vereenv', title: 'Vereenvoudigen', groups: [7, 8], ex: [
      { id: 'vereenv', name: 'Vereenvoudigen', example: '6/8 = 3/4', gen: vh_vereenv },
      { id: 'helen', name: 'Helen uit de breuk halen', example: '7/4 = 1 3/4', gen: vh_helen }
    ]},
    { id: 'anders', title: 'Andere opgaven', groups: [6, 7, 8], ex: [
      { id: 'aanvul', name: 'Aanvullen tot een hele', example: '3/8 + ? = 1', gen: vh_aanvul },
      { id: 'deel', name: 'Een deel van een geheel bepalen', example: '6 van de 24 = ?', gen: vh_deel },
      { id: 'van', name: '1/4 van 80 = ...', example: '1/4 van 80', gen: vh_van },
      { id: 'totaal', name: 'Totaal berekenen op basis van een deel', example: '3/5 is 15, totaal?', gen: vh_totaal }
    ]}
  ]
});

/* ===================== procenten ===================== */
const VH_P = { 1: [10, 10, 25, 25, 50], 2: [5, 15, 20, 30, 35, 5, 15, 35], 3: [12, 13, 16, 17, 18, 24, 28, 36, 42, 44, 56, 64, 65, 72, 85, 6, 8, 3] };
const vh_pp = lv => pick(VH_P[lv]);
/* kleinste geheel waarvan p% een heel getal is */
const vh_unit = p => 100 / gcd(p, 100);
function vh_pHint(p) {
  const h = { 10: '10% is 1/10: deel door 10.', 25: '25% is een kwart: deel door 4.', 50: '50% is de helft.', 100: '100% is alles.', 5: '5% is de helft van 10%.', 15: '15% = 10% + 5%.', 20: '20% = 2 × 10%.', 30: '30% = 3 × 10%.', 35: '35% = 3 × 10% + 5%.' };
  return h[p] || `Reken eerst 1% uit (deel door 100) of 10% (deel door 10). Doe dat daarna keer het aantal procent dat je nodig hebt.`;
}
function vh_strook(lv) {
  const p = vh_pp(lv);
  const cells = p % 10 === 0 && Math.random() < 0.5 ? 10 : 20;
  return colour(`Kleur ${p}% van de strook.`, cells, p * cells / 100,
    `De hele strook is 100%. Er zijn ${cells} vakjes, dus 1 vakje is ${100 / cells}%.`, { cols: 10 });
}
const VH_AANTAL = [['kinderen op school', 'gaan', 'gaat', 'op de fiets'], ['bezoekers in de dierentuin', 'zijn', 'is', 'een kind'], ['leerlingen', 'hebben', 'heeft', 'een broertje of zusje'], ['mensen in de bioscoop', 'eten', 'eet', 'popcorn'], ['bloembollen', 'komen', 'komt', 'uit'], ['fans in het stadion', 'dragen', 'draagt', 'een sjaal']];
function vh_pBase(lv, p, lo, hi) {
  const u = vh_unit(p);
  let mult = [];
  for (let x = u; x <= hi; x += u) if (x >= lo) mult.push(x);
  if (!mult.length) mult = [u * Math.ceil(lo / u)];
  return pick(mult);
}
function vh_pvan(lv) {
  const p = vh_pp(lv);
  if (lv === 3 && Math.random() < 0.4) {
    const b = R(4, 60) * 5;
    return num(`${p}% van ${b} = ?`, round(p * b / 100, 2), vh_pHint(p));
  }
  const b = vh_pBase(lv, p, 20, lv === 1 ? 400 : 800);
  const [wat, , sg, rest] = pick(VH_AANTAL);
  return num(`Er zijn ${b} ${wat}. Daarvan ${sg} ${p}% ${rest}. Hoeveel ${wat.split(' ')[0]} zijn dat?`, p * b / 100, vh_pHint(p));
}
function vh_pdeel(lv) {
  const p = vh_pp(lv);
  const b = lv === 3 ? pick([50, 100, 200, 25, 20, 300, 400, 500].filter(x => (p * x) % 100 === 0)) : vh_pBase(lv, p, 20, 400);
  const [wat, pl, , rest] = pick(VH_AANTAL);
  return num(`Er zijn ${b} ${wat}. Daarvan ${pl} er ${p * b / 100} ${rest}. Hoeveel procent is dat?`, p, `Schrijf het als breuk: ${p * b / 100} van de ${b}. Hoeveel is dat van de 100?`, { unit: '%' });
}
function vh_pgeheel(lv) {
  const p = vh_pp(lv);
  const b = vh_pBase(lv, p, 20, lv === 3 ? 1000 : 400);
  const [wat, , sg, rest] = pick(VH_AANTAL);
  return num(`${p}% van de ${wat} ${sg} ${rest}. Dat zijn er ${p * b / 100}. Hoeveel ${wat} zijn er in totaal?`, b,
    `${p}% is ${p * b / 100}. Reken uit hoeveel 1% (of 5% of 10%) is. Hoeveel is dan 100%?`);
}
const VH_SPUL = [['fiets', 180, 600], ['jas', 40, 160], ['spelcomputer', 200, 500], ['skateboard', 40, 120], ['koptelefoon', 40, 200], ['tent', 80, 300], ['paar schoenen', 40, 140], ['tablet', 150, 500]];
function vh_prijsSetup(lv) {
  const p = vh_pp(lv);
  const [ding, lo, hi] = pick(VH_SPUL);
  /* korting een heel bedrag of hooguit op halve euro's in niveau 3 */
  let u = vh_unit(p);
  if (lv === 3 && u > 20) u = u / 2;
  const old = vh_pBase(lv, p, lo, hi * (lv === 3 ? 2 : 1)) ;
  const o2 = Number.isInteger(old / u) ? old : u * Math.max(1, Math.round(old / u));
  return { p, ding, old: o2, k: round(o2 * p / 100, 2) };
}
function vh_korting(lv) {
  const s = vh_prijsSetup(lv);
  return vh_money(`Een ${s.ding} kost ${vh_eur(s.old)}. Je krijgt ${s.p}% korting. Hoeveel korting krijg je?`, s.k, vh_pHint(s.p));
}
function vh_nieuw(lv) {
  const s = vh_prijsSetup(lv);
  return vh_money(`Een ${s.ding} kost ${vh_eur(s.old)}. Je krijgt ${s.p}% korting. Wat is de nieuwe prijs?`, round(s.old - s.k, 2),
    `Reken eerst de korting uit. ${vh_pHint(s.p)} Haal de korting daarna van de oude prijs af.`);
}
function vh_oud(lv) {
  const s = vh_prijsSetup(lv);
  const nieuw = round(s.old - s.k, 2);
  return vh_money(`Na ${s.p}% korting kost een ${s.ding} nog ${vh_eur(nieuw)}. Wat was de oude prijs?`, s.old,
    `De oude prijs is 100%. Na ${s.p}% korting betaal je nog ${100 - s.p}%. Dus ${vh_eur(nieuw)} is ${100 - s.p}%. Reken uit hoeveel 1% (of 10%) is.`);
}
function vh_pSub(lv, strook) {
  const ex = [];
  if (strook) ex.push({ id: 'strook', name: 'Percentage van strook kleuren', example: 'kleur 25%', gen: () => vh_strook(lv) });
  ex.push(
    { id: 'van', name: 'Percentage van aantal berekenen', example: `${VH_P[lv][0]}% van 200`, gen: () => vh_pvan(lv) },
    { id: 'deel', name: 'Percentage deel van totaal berekenen', example: '10 van de 40 = ?%', gen: () => vh_pdeel(lv) },
    { id: 'geheel', name: 'Geheel op basis van deel berekenen', example: '25% is 8, totaal?', gen: () => vh_pgeheel(lv) },
    { id: 'korting', name: 'Korting berekenen', example: '25% korting op € 80', gen: () => vh_korting(lv) },
    { id: 'nieuw', name: 'Nieuw bedrag na korting berekenen', example: '€ 80 − 25%', gen: () => vh_nieuw(lv) },
    { id: 'oud', name: 'Oude prijs berekenen (op basis van nieuwe prijs en korting)', example: 'na 25% korting € 60', gen: () => vh_oud(lv) }
  );
  return ex;
}

defCat({
  id: 'procenten', domain: 'verhoudingen', title: 'Procenten', emoji: '💯', groups: [7, 8],
  uitleg: `<p><b>Procent</b> betekent "van de honderd". 100% is alles.</p>
    <ul><li>50% = de helft · 25% = een kwart</li><li>10% → deel door 10 · 1% → deel door 100</li></ul>
    <div class="voorbeeld">30% van 60 → 10% = 6 → 30% = 3 × 6 = <b>18</b></div>
    <div class="voorbeeld">13% van 300 → 1% = 3 → 13% = 13 × 3 = <b>39</b></div>
    <p><b>Korting:</b> een jas van € 80 met 25% korting. Korting = € 20. Nieuwe prijs = 80 − 20 = <b>€ 60</b>.</p>
    <p><b>Oude prijs:</b> na 20% korting € 48. Dan is € 48 = 80%. 10% = € 6, dus 100% = <b>€ 60</b>.</p>`,
  subs: [
    { id: 'n1', title: 'Niveau 1 (10% 25%)', groups: [7], ex: vh_pSub(1, true) },
    { id: 'n2', title: 'Niveau 2 (5% 35%)', groups: [7, 8], ex: vh_pSub(2, true) },
    { id: 'n3', title: 'Niveau 3 (13% 56%)', groups: [8], ex: vh_pSub(3, false) }
  ]
});

/* ===================== relatie breuk – komma – procent – verhouding ===================== */
const VH_RB = [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [3, 5], [4, 5], [1, 10], [3, 10], [7, 10], [9, 10], [1, 20], [1, 1]];
const VH_RL = [[1, 8], [3, 8], [5, 8], [7, 8], [3, 20], [7, 20], [9, 20], [1, 25], [4, 25], [12, 25], [1, 50], [9, 50], [3, 100], [17, 100], [5, 4], [3, 2], [6, 5], [11, 20], [3, 40]];
const vh_rset = lv => (lv === 1 ? VH_RB.slice(0, 12) : VH_RL);
function vh_relBK(lv) {
  const [n, d] = pick(vh_rset(lv)), v = n / d;
  if (Math.random() < 0.5) return num(`${n}/${d} = ? (kommagetal)`, round(v, 3), `Deel de teller door de noemer: ${n} : ${d}. Of maak eerst de noemer 10, 100 of 1000.`);
  return vh_fnum(`${nl(v)} = ? (breuk)`, n, d, 'Lees het kommagetal als tienden, honderdsten of duizendsten. Vereenvoudig daarna.');
}
function vh_relBP(lv) {
  const [n, d] = pick(vh_rset(lv)), p = round(n / d * 100, 3);
  if (Math.random() < 0.5) return num(`${n}/${d} = ?%`, p, `Maak de noemer 100. ${100 % d === 0 ? `Doe teller en noemer keer ${100 / d}.` : 'Of reken eerst het kommagetal uit.'}`, { unit: '%' });
  return vh_fnum(`${nl(p)}% = ? (breuk)`, n, d, Number.isInteger(p) ? `${p}% = ${p}/100. Vereenvoudig deze breuk.` : `${nl(p)}% = ${round(p * 10)} van de 1000. Maak daar een breuk van en vereenvoudig.`);
}
function vh_relKP(lv) {
  const v = lv === 1 ? R(1, 99) / 100 : pick([R(1, 9) / 1000 + R(1, 9) / 100, R(101, 250) / 100, R(1, 9) / 100, R(1, 999) / 1000, 0.125, 0.375, 0.875, 0.045]);
  const p = round(v * 100, 3), vv = round(v, 3);
  if (Math.random() < 0.5) return num(`${nl(vv)} = ?%`, p, 'Procent is "van de honderd". Doe het kommagetal keer 100.', { unit: '%' });
  return num(`${nl(p)}% = ? (kommagetal)`, vv, 'Deel het percentage door 100: de komma schuift 2 plekken naar links.');
}
function vh_relMix(lv) {
  const [n, d] = pick(lv === 1 ? [[1, 2], [1, 4], [3, 4], [1, 5], [2, 5], [1, 10], [3, 10]] : [[1, 8], [3, 8], [3, 20], [1, 25], [7, 20], [2, 5], [3, 4], [1, 20]]);
  const p = round(n / d * 100, 3), k = round(n / d, 3);
  const t = R(0, 4);
  const wrongs = (good) => {
    const opts = [`${nl(p)}%`, nl(k), `${n}/${d}`, `${n} op de ${d}`];
    const fake = [[`${nl(round(d / n, 3))}%`, d / n / 100], [`${nl(n * 10 + d)}%`, (n * 10 + d) / 100], [nl(round(n / 10 + d / 100, 3)), n / 10 + d / 100], [`${d}/${n + d}`, d / (n + d)],
      [`${nl(n * d)}%`, n * d / 100], [`${n}/${d + n}`, n / (d + n)], [nl(round(n / d / 10, 4)), n / d / 10], [`${nl(round(p / 10, 3))}%`, p / 1000]]
      .filter(f => Math.abs(f[1] - n / d) > 1e-9 && !/,\d{3}/.test(f[0]) && f[1] < 1.5).map(f => f[0]);
    return { opts: opts.filter(x => x !== good), fake };
  };
  if (t === 0) {
    /* x op de y → procent */
    const [wat, zin] = pick([['kinderen', 'heeft een hond'], ['mensen', 'draagt een bril'], ['auto’s', 'is rood']]);
    return num(`${n} op de ${d} ${wat} ${zin}. Hoeveel procent is dat?`, p, `${n} op de ${d} is de breuk ${n}/${d}. Maak er "van de 100" van.`, { unit: '%' });
  }
  if (t === 1) {
    /* verhouding a : b → deel van het geheel */
    const a = n, b = d - n;
    const v = pick([['saft', 'water', 'limonade'], ['rode', 'blauwe', 'knikkers'], ['jongens', 'meisjes', 'klas']]);
    if (Math.random() < 0.5) return vh_fnum(`De verhouding ${v[0]} : ${v[1]} is ${a} : ${b}. Welk deel van de ${v[2]} is ${v[0]}?`, a, a + b,
      `Tel de delen bij elkaar op: ${a} + ${b}. Dat is het totaal (de noemer).`);
    return num(`De verhouding ${v[0]} : ${v[1]} is ${a} : ${b}. Hoeveel procent van de ${v[2]} is ${v[0]}?`, p, `Tel eerst alle delen op: ${a} + ${b}. Maak dan een breuk en reken die om naar procenten.`, { unit: '%' });
  }
  if (t === 2) {
    const show = pick([`${n}/${d}`, `${nl(p)}%`, nl(k)]);
    const good = pick([`${n}/${d}`, `${nl(p)}%`, nl(k), `${n} op de ${d}`].filter(x => x !== show));
    const w = wrongs(good);
    return choice(`Wat is evenveel als ${show}?`, good, w.fake, 'Reken alles om naar procenten. Dan kun je ze makkelijk vergelijken.');
  }
  if (t === 3) return num(`${n} op de ${d} = ? (kommagetal)`, k, `${n} op de ${d} = ${n}/${d}. Reken die breuk om naar een kommagetal.`);
  /* welke hoort er niet bij */
  const set = [`${n}/${d}`, `${nl(p)}%`, nl(k), `${n} op de ${d}`];
  const odd = pick(wrongs('').fake.filter(x => !set.includes(x)));
  const shown = vh_pickN(set, 3);
  return choice(`Drie hiervan zijn even groot. Welke hoort er <b>niet</b> bij?`, odd, shown, 'Reken alles om naar procenten en vergelijk.');
}
function vh_rSub(lv) {
  return [
    { id: 'bk', name: 'Breuken en kommagetallen omzetten', example: lv === 1 ? '3/4 = 0,75' : '3/8 = 0,375', gen: () => vh_relBK(lv) },
    { id: 'bp', name: 'Breuken en procenten omzetten', example: lv === 1 ? '1/5 = 20%' : '7/20 = 35%', gen: () => vh_relBP(lv) },
    { id: 'kp', name: 'Kommagetallen en procenten omzetten', example: lv === 1 ? '0,35 = 35%' : '0,075 = 7,5%', gen: () => vh_relKP(lv) },
    { id: 'mix', name: 'Breuken, kommagetallen, procenten en verhoudingen omzetten', example: '1 op de 4 = 25%', gen: () => vh_relMix(lv) }
  ];
}

defCat({
  id: 'relatie', domain: 'verhoudingen', title: 'Relatie tussen alle verhoudingen', emoji: '🔁', groups: [7, 8],
  uitleg: `<p>Een breuk, een kommagetal, een procent en een verhouding kunnen <b>precies hetzelfde</b> zijn.</p>
    <div class="voorbeeld">${fracHTML('1/4')} = 0,25 = 25% = 1 op de 4</div>
    <p><b>Breuk → procent:</b> maak de noemer 100. ${fracHTML('3/5')} = ${fracHTML('60/100')} = <b>60%</b></p>
    <p><b>Kommagetal → procent:</b> keer 100. 0,35 = <b>35%</b></p>
    <p><b>Procent → kommagetal:</b> gedeeld door 100. 8% = <b>0,08</b></p>
    <p><b>Verhouding:</b> saft : water = 1 : 4. Dat zijn samen 5 delen, dus saft is ${fracHTML('1/5')} = <b>20%</b> van de limonade.</p>`,
  subs: [
    { id: 'basis', title: 'Basisverhoudingen', groups: [7, 8], ex: vh_rSub(1) },
    { id: 'lastig', title: 'Lastigere verhoudingen', groups: [8], ex: vh_rSub(2) }
  ]
});

/* ===================== schaal ===================== */
const vh_s = n => nl(n, true);
const VH_TEK = ['de kamer', 'de tuin', 'het klaslokaal', 'het zwembad', 'de schuur', 'het voetbalveld', 'de garage'];
function vh_lenGelijk() {
  const n = pick([10, 20, 25, 50, 100, 200, 250, 500]);
  const kaart = n >= 200 ? R(2, 12) : R(2, 30);
  const w = pick(VH_TEK);
  if (Math.random() < 0.6) return num(`Schaal 1 : ${vh_s(n)}. Op de tekening is ${w} ${kaart} cm lang. Hoe lang is dat in het echt?`, kaart * n,
    `1 cm op de tekening is ${vh_s(n)} cm in het echt. Hoeveel is dan ${kaart} cm?`, { unit: 'cm' });
  return num(`Schaal 1 : ${vh_s(n)}. In het echt is ${w} ${vh_s(kaart * n)} cm lang. Hoe lang is dat op de tekening?`, kaart,
    `Elke ${vh_s(n)} cm in het echt is 1 cm op de tekening. Hoe vaak past ${vh_s(n)} in ${vh_s(kaart * n)}?`, { unit: 'cm' });
}
function vh_lenCmM() {
  const n = pick([50, 100, 200, 250, 500, 1000, 2000]);
  const kaart = pick([R(2, 20), R(2, 20), R(3, 19) + 0.5]);
  const echtM = round(kaart * n / 100, 3);
  const w = n <= 200 ? pick(VH_TEK) : pick(['de straat', 'het park', 'het plein', 'de dijk', 'het sportpark']);
  if (Math.random() < 0.6) return num(`Schaal 1 : ${vh_s(n)}. Op de kaart is ${w} ${nl(kaart)} cm lang. Hoeveel meter is dat in het echt?`, echtM,
    `1 cm op de kaart is ${vh_s(n)} cm in het echt. Reken eerst uit hoeveel cm het is. 100 cm = 1 m.`, { unit: 'm' });
  return num(`Schaal 1 : ${vh_s(n)}. In het echt is ${w} ${nl(echtM)} m lang. Hoeveel cm is dat op de kaart?`, kaart,
    `Hoeveel meter is 1 cm op de kaart? (${vh_s(n)} cm = ? m). Hoe vaak past dat in ${nl(echtM)} m?`, { unit: 'cm' });
}
function vh_lenKm() {
  const n = pick([10000, 20000, 25000, 50000, 100000, 200000, 500000, 1000000]);
  const kaart = pick([R(2, 15), R(2, 15), R(2, 12) + 0.5]);
  const km = round(kaart * n / 100000, 3);
  const plek = pick(['de route', 'het fietspad', 'de weg tussen de twee dorpen', 'de rivier', 'het wandelpad']);
  const r = R(0, 2);
  if (r === 0) return num(`Schaal 1 : ${vh_s(n)}. Op de kaart is ${plek} ${nl(kaart)} cm lang. Hoeveel km is dat in het echt?`, km,
    `1 cm op de kaart is ${vh_s(n)} cm in het echt. 100.000 cm = 1 km. Hoeveel km is 1 cm dan?`, { unit: 'km' });
  if (r === 1 && kaart * n / 100 <= 10000) return num(`Schaal 1 : ${vh_s(n)}. Op de kaart is ${plek} ${nl(kaart)} cm lang. Hoeveel meter is dat in het echt?`, round(kaart * n / 100, 3),
    `1 cm op de kaart is ${vh_s(n)} cm in het echt. 100 cm = 1 m.`, { unit: 'm' });
  return num(`Schaal 1 : ${vh_s(n)}. In het echt is ${plek} ${nl(km)} km lang. Hoeveel cm is dat op de kaart?`, kaart,
    `Hoeveel km is 1 cm op de kaart? (${vh_s(n)} cm = ? km). Hoe vaak past dat in ${nl(km)} km?`, { unit: 'cm' });
}
function vh_schaalQ(kaartTxt, echtTxt, n, hint) {
  return num(`Op de kaart is een afstand ${kaartTxt}. In het echt is dat ${echtTxt}. Wat is de schaal?<br>Schaal 1 : …`, n, hint);
}
function vh_sGelijk() {
  const n = pick([10, 20, 25, 50, 100, 200, 250, 500, 1000]);
  const u = pick(['cm', 'cm', 'mm']);
  const k = R(2, 12);
  return vh_schaalQ(`${k} ${u}`, `${vh_s(k * n)} ${u}`, n, `De eenheden zijn al gelijk. Hoe vaak zo groot is het in het echt? Deel ${vh_s(k * n)} door ${k}.`);
}
const VH_EH = { mm: 0.1, cm: 1, dm: 10, m: 100, km: 100000 };
function vh_sMix(units, nList) {
  for (let t = 0; t < 30; t++) {
    const n = pick(nList);
    const ku = pick(units.kaart), eu = pick(units.echt.filter(u => VH_EH[u] > VH_EH[ku]));
    const k = R(2, 12);
    const echt = round(k * VH_EH[ku] * n / VH_EH[eu], 3);
    if (echt < 0.5 || echt > 5000 || Math.abs(echt * 10 - Math.round(echt * 10)) > 1e-9) continue;
    return vh_schaalQ(`${k} ${ku}`, `${vh_s(echt)} ${eu}`, n,
      `Maak eerst de eenheden gelijk: reken ${nl(echt)} ${eu} om naar ${ku === 'cm' ? 'centimeters' : ku}. Hoe vaak past ${k} ${ku} daarin?`);
  }
  return vh_sGelijk();
}

defCat({
  id: 'schaal', domain: 'verhoudingen', title: 'Schaal', emoji: '🗺️', groups: [7, 8],
  uitleg: `<p>Een kaart of tekening is een verkleining. De <b>schaal</b> zegt hoeveel keer kleiner.</p>
    <div class="voorbeeld">Schaal 1 : 100 → 1 cm op de tekening = 100 cm = <b>1 m</b> in het echt</div>
    <p>Op de tekening 6 cm → in het echt 6 × 100 = 600 cm = <b>6 m</b>.</p>
    <p>Handig: 100 cm = 1 m · 1000 m = 1 km · 100.000 cm = 1 km.</p>
    <p><b>Schaal uitrekenen:</b> maak de eenheden eerst gelijk. Kaart 4 cm, echt 2 km = 200.000 cm. 200.000 : 4 = 50.000 → schaal <b>1 : 50.000</b>.</p>`,
  subs: [
    { id: 'lengte', title: 'Lengte berekenen met schaal als 1:100', groups: [7, 8], ex: [
      { id: 'gelijk', name: 'Alleen gelijke maateenheden', example: '1 : 100, 4 cm = ? cm', gen: vh_lenGelijk },
      { id: 'cmm', name: 'Verschillende maateenheden cm en m', example: '1 : 200, 5 cm = ? m', gen: vh_lenCmM },
      { id: 'km', name: 'Verschillende maateenheden cm, m en km', example: '1 : 50.000, 4 cm = ? km', gen: vh_lenKm }
    ]},
    { id: 'bereken', title: 'Schaal berekenen met gegeven maten', groups: [7, 8], ex: [
      { id: 'gelijk', name: 'Alleen gelijke maateenheden', example: '3 cm ↔ 300 cm', gen: vh_sGelijk },
      { id: 'cmdm', name: 'Verschillende maateenheden cm, dm en m', example: '5 cm ↔ 10 m', gen: () => vh_sMix({ kaart: ['cm', 'cm', 'dm'], echt: ['dm', 'm', 'm'] }, [10, 20, 25, 50, 100, 200, 250, 500, 1000]) },
      { id: 'km', name: 'Verschillende maateenheden tot en met km', example: '4 cm ↔ 2 km', gen: () => vh_sMix({ kaart: ['cm', 'mm', 'dm'], echt: ['m', 'km', 'km'] }, [1000, 2000, 5000, 10000, 20000, 25000, 50000, 100000, 200000]) }
    ]}
  ]
});
