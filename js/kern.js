/* Kern: hulpfuncties, vraag-bouwers, plaatjes en het register van oefeningen.
   Het vraagformaat staat hieronder bij de vraag-bouwers. */

/* ===================== hulpfuncties ===================== */
export const R = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
export const pick = a => a[Math.floor(Math.random() * a.length)];
export function shuffle(a) {
  a = a.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
export const gcd = (a, b) => (b ? gcd(b, a % b) : Math.abs(a));
export const round = (n, d = 6) => Math.round(n * 10 ** d) / 10 ** d;
/* Nederlands getal: komma als decimaalteken. dots=true → punt als duizendtal-scheiding (12.500) */
export function nl(n, dots = false) {
  const s = String(round(n, 6));
  if (!dots) return s.replace('.', ',');
  const [i, d] = s.split('.');
  return i.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + (d ? ',' + d : '');
}
export const euro = n => '€ ' + n.toFixed(2).replace('.', ',');
function fracStr(n, d) {
  const g = gcd(n, d);
  n /= g; d /= g;
  return d === 1 ? String(n) : n + '/' + d;
}
export function fracHTML(s) {
  return String(s).replace(/(\d+)\/(\d+)/g, '<span class="frac"><span>$1</span><span>$2</span></span>');
}
export const NAMEN = ['Noah', 'Emma', 'Sem', 'Julia', 'Liam', 'Mila', 'Daan', 'Tess', 'Finn', 'Sara', 'Mohammed', 'Yara', 'Luuk', 'Zoë', 'Lucas', 'Nora', 'Adam', 'Fenna'];
export const MAANDEN = ['januari', 'februari', 'maart', 'april', 'mei', 'juni', 'juli', 'augustus', 'september', 'oktober', 'november', 'december'];
export const DAGEN = ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag', 'zaterdag', 'zondag'];

/* ===================== getallen in woorden ===================== */
const W_EEN = ['nul', 'een', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien', 'elf', 'twaalf', 'dertien', 'veertien', 'vijftien', 'zestien', 'zeventien', 'achttien', 'negentien'];
const W_TIEN = ['', '', 'twintig', 'dertig', 'veertig', 'vijftig', 'zestig', 'zeventig', 'tachtig', 'negentig'];
function w100(n) {
  if (n < 20) return W_EEN[n];
  const t = Math.floor(n / 10), e = n % 10;
  if (!e) return W_TIEN[t];
  return W_EEN[e] + (e === 2 || e === 3 ? 'ën' : 'en') + W_TIEN[t];
}
function w1000(n) {
  if (n < 100) return w100(n);
  const h = Math.floor(n / 100), r = n % 100;
  return (h === 1 ? '' : W_EEN[h]) + 'honderd' + (r ? w100(r) : '');
}
/* 2345 → "tweeduizend driehonderdvijfenveertig", 1 → "één" */
export function getalWoord(n) {
  n = Math.round(n);
  if (n === 0) return 'nul';
  if (n === 1) return 'één';
  const parts = [];
  const mld = Math.floor(n / 1e9), mln = Math.floor(n / 1e6) % 1000, dzd = Math.floor(n / 1000) % 1000, rest = n % 1000;
  if (mld) parts.push((mld === 1 ? 'één' : w1000(mld)) + ' miljard');
  if (mln) parts.push((mln === 1 ? 'één' : w1000(mln)) + ' miljoen');
  if (dzd) parts.push((dzd === 1 ? '' : w1000(dzd)) + 'duizend');
  if (rest) parts.push(w1000(rest));
  return parts.join(' ');
}

/* ===================== vraag-bouwers ===================== */
/* Elke bouwer geeft een vraag-object terug. Altijd aanwezig:
     type  – soort vraag: num, choice, multi, order, line, clock, count, pay of colour
     q     – de vraagtekst (mag HTML bevatten)
     a     – het goede antwoord als tekst (voor de nakijklijst)
     hint  – tip die het kind na een fout ziet
   Veelgebruikte extra velden via o:
     vis   – plaatje (HTML) bij de vraag
     unit  – eenheid achter (of met pre: vóór) het invulvak, bv. 'cm' of '€'
     frac  – kind mag een breuk intypen;  noFrac – breuken niet als plaatje tonen
   De sommen-speler (speler.js) heeft per type een widget die het antwoord nakijkt. */
export function num(q, v, hint, o = {}) {
  return Object.assign({ type: 'num', q, v, a: nl(v, v >= 10000), hint }, o);
}
export function choice(q, ans, wrongs, hint, o = {}) {
  ans = String(ans);
  const w = [...new Set(wrongs.map(String))].filter(x => x !== ans);
  const n = o.n || 3;
  return Object.assign({ type: 'choice', q, ans, a: ans, choices: shuffle([ans, ...shuffle(w).slice(0, n)]), hint }, o);
}
/* Meerdere invulvakjes: zet {{0}}, {{1}}, … in q of vis. blanks = goede antwoorden (getallen). */
export function multi(q, blanks, hint, o = {}) {
  return Object.assign({ type: 'multi', q, blanks, a: blanks.map(b => nl(b, b >= 10000)).join(' · '), hint }, o);
}
/* Op volgorde tikken. items = weergaveteksten; values = getallen om op te sorteren. desc=true → groot naar klein */
export function order(q, items, values, hint, o = {}) {
  const idx = items.map((_, i) => i).sort((a, b) => (o.desc ? values[b] - values[a] : values[a] - values[b]));
  const sorted = idx.map(i => items[i]);
  return Object.assign({ type: 'order', q, items: shuffle(items), sorted, a: sorted.join(' · '), hint }, o);
}
/* Tik de juiste plek op de getallenlijn. labels = getallen met een label; ticks = aantal streepjes-stappen */
export function line(q, min, max, v, hint, o = {}) {
  return Object.assign({ type: 'line', q, min, max, v, a: o.display || nl(v, v >= 10000), labels: o.labels || [min, max], ticks: o.ticks || 10, tol: o.tol || 0.04, hint }, o);
}
/* Analoge klok goedzetten. step = minuten per klik (60, 30, 15, 5, 1) */
export function clockSet(q, h, m, hint, o = {}) {
  return Object.assign({ type: 'clock', q, h: ((h - 1 + 12) % 12) + 1, m, step: o.step || 5, a: klokWoord(h, m), hint }, o);
}
/* Juiste aantal plaatjes neerzetten */
export function count(q, n, hint, o = {}) {
  return Object.assign({ type: 'count', q, n, emoji: o.emoji || '🍎', max: o.max || Math.max(10, n + 5), a: String(n), hint }, o);
}
/* Precies betalen met munten/briefjes. amount en money in centen */
export function pay(q, amount, hint, o = {}) {
  return Object.assign({ type: 'pay', q, amount, money: o.money || [5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000], a: euro(amount / 100), hint }, o);
}
/* Vakjes kleuren: cells vakjes (rows × cols of strook), n moeten gekleurd zijn */
export function colour(q, cells, n, hint, o = {}) {
  return Object.assign({ type: 'colour', q, cells, n, cols: o.cols || cells, a: `${n} van de ${cells} vakjes`, hint }, o);
}
export function nearWrongs(v, n = 3, step = 1) {
  const set = new Set();
  for (const d of shuffle([1, -1, 2, -2, 10, -10, 3, -3, 5, -5])) {
    const x = round(v + d * step);
    if (x >= 0 && x !== v) set.add(x);
    if (set.size >= n) break;
  }
  return [...set];
}

/* ===================== plaatjes (generiek) ===================== */
/* Plaatjes in groepjes van 5 (handig tellen) */
export function plaatjes(n, emoji = '🍎', perRow = 10) {
  let s = `<div class="plaatjes" style="--per:${perRow}" aria-label="${n} plaatjes">`;
  for (let i = 0; i < n; i++) s += `<span class="${i % 5 === 4 ? 'p5' : ''}">${emoji}</span>`;
  return s + '</div>';
}
export function dots(a, b, minus = false) {
  let s = '<div class="dots" aria-hidden="true">';
  if (minus) for (let i = 0; i < a; i++) s += `<i class="${i >= a - b ? 'dx' : 'd1'}"></i>`;
  else {
    for (let i = 0; i < a; i++) s += '<i class="d1"></i>';
    for (let i = 0; i < b; i++) s += '<i class="d2"></i>';
  }
  return s + '</div>';
}
export function splitshuis(top, left, right) {
  return `<div class="split" aria-hidden="true"><div class="roof">${top}</div><div class="rooms"><div>${left}</div><div>${right}</div></div></div>`;
}
export function clockSVG(h, m, cls = '') {
  let s = `<svg class="clock ${cls}" viewBox="0 0 100 100" role="img" aria-label="klok">`;
  s += '<circle cx="50" cy="50" r="46" class="face"/>';
  for (let i = 0; i < 60; i++) {
    const a = i * 6 * Math.PI / 180, big = i % 5 === 0, r1 = big ? 39 : 42, r2 = 44;
    s += `<line x1="${50 + r1 * Math.sin(a)}" y1="${50 - r1 * Math.cos(a)}" x2="${50 + r2 * Math.sin(a)}" y2="${50 - r2 * Math.cos(a)}" class="${big ? 'tick big' : 'tick'}"/>`;
  }
  for (let i = 1; i <= 12; i++) {
    const a = i * 30 * Math.PI / 180;
    s += `<text x="${50 + 31 * Math.sin(a)}" y="${50 - 31 * Math.cos(a) + 3.6}" class="num">${i}</text>`;
  }
  const ha = ((h % 12) + m / 60) * 30 * Math.PI / 180, ma = m * 6 * Math.PI / 180;
  s += `<line x1="50" y1="50" x2="${50 + 20 * Math.sin(ha)}" y2="${50 - 20 * Math.cos(ha)}" class="hand hour"/>`;
  s += `<line x1="50" y1="50" x2="${50 + 33 * Math.sin(ma)}" y2="${50 - 33 * Math.cos(ma)}" class="hand min"/>`;
  return s + '<circle cx="50" cy="50" r="3" class="pin"/></svg>';
}
export const digitalClock = (h, m) => `<div class="digital">${String(h).padStart(2, '0')}<span>:</span>${String(m).padStart(2, '0')}</div>`;
const UREN = ['twaalf', 'één', 'twee', 'drie', 'vier', 'vijf', 'zes', 'zeven', 'acht', 'negen', 'tien', 'elf', 'twaalf'];
/* Klok in woorden, per minuut ("zeven over half vier", "kwart voor vijf") */
export function klokWoord(h, m) {
  h = ((h - 1 + 12) % 12) + 1;
  const H = UREN[h], N = UREN[h % 12 + 1];
  const min = x => (x === 1 ? 'één minuut' : `${W_EEN[x]} minuten`);
  const short = x => W_EEN[x];
  if (m === 0) return `${H} uur`;
  if (m === 15) return `kwart over ${H}`;
  if (m === 30) return `half ${N}`;
  if (m === 45) return `kwart voor ${N}`;
  if (m < 15) return `${m % 5 ? min(m) : short(m)} over ${H}`;
  if (m < 30) return `${m % 5 ? min(30 - m) : short(30 - m)} voor half ${N}`;
  if (m < 45) return `${m % 5 ? min(m - 30) : short(m - 30)} over half ${N}`;
  return `${m % 5 ? min(60 - m) : short(60 - m)} voor ${N}`;
}
export function pieSVG(n, d, cls = '') {
  if (d === 1) return `<svg class="pie ${cls}" viewBox="0 0 100 100"><circle cx="50" cy="50" r="44" class="${n ? 'on' : 'off'}"/></svg>`;
  let s = `<svg class="pie ${cls}" viewBox="0 0 100 100" role="img" aria-label="cirkel in ${d} stukken">`;
  for (let i = 0; i < d; i++) {
    const a0 = i / d * 2 * Math.PI - Math.PI / 2, a1 = (i + 1) / d * 2 * Math.PI - Math.PI / 2;
    s += `<path d="M50 50 L${50 + 44 * Math.cos(a0)} ${50 + 44 * Math.sin(a0)} A44 44 0 0 1 ${50 + 44 * Math.cos(a1)} ${50 + 44 * Math.sin(a1)} Z" class="${i < n ? 'on' : 'off'}"/>`;
  }
  return s + '</svg>';
}
/* Strook verdeeld in d vakjes, n gekleurd */
export function stripSVG(n, d) {
  let s = `<svg class="strip" viewBox="0 0 ${d * 30 + 4} 44" role="img" aria-label="strook">`;
  for (let i = 0; i < d; i++) s += `<rect x="${2 + i * 30}" y="2" width="30" height="40" class="${i < n ? 'on' : 'off'}"/>`;
  return s + '</svg>';
}
/* Getallenlijn als plaatje. o.arrow = waarde met pijl, o.labels = waarden met label, o.ticks = aantal stappen, o.fmt = labelfunctie */
export function lineSVG(min, max, o = {}) {
  const W = 320, x = v => 10 + (v - min) / (max - min) * (W - 20), ticks = o.ticks || 10, fmt = o.fmt || (v => nl(v, true));
  let s = `<svg class="nlsvg" viewBox="0 0 ${W} 70" role="img" aria-label="getallenlijn"><line x1="10" y1="40" x2="${W - 10}" y2="40" class="axis"/>`;
  for (let i = 0; i <= ticks; i++) { const xx = 10 + i * (W - 20) / ticks; s += `<line x1="${xx}" y1="${i % 5 === 0 || ticks <= 10 ? 32 : 35}" x2="${xx}" y2="${i % 5 === 0 || ticks <= 10 ? 48 : 45}" class="tk"/>`; }
  for (const l of o.labels || [min, max]) s += `<text x="${x(l)}" y="64" class="lb">${fmt(l)}</text>`;
  if (o.arrow != null) s += `<path d="M${x(o.arrow)} 30 l-7 -14 h14 z" class="arrow"/>`;
  return s + '</svg>';
}
/* Munten en briefjes tekenen. list = bedragen in centen */
export function moneyHTML(list) {
  return `<div class="money">${list.map(c => moneyItem(c)).join('')}</div>`;
}
export function moneyItem(c, tag = 'span', attrs = '') {
  const note = c >= 500, label = c >= 100 ? '€' + c / 100 : c + 'c';
  return `<${tag} class="${note ? 'bill' : 'coin'} m${c}" ${attrs}>${label}</${tag}>`;
}
/* Eenvoudige tabel: rows = [[..], [..]], eerste rij = kop */
export function tableHTML(rows, cls = '') {
  return `<table class="tbl ${cls}">${rows.map((r, i) => `<tr>${r.map(c => (i === 0 ? `<th>${c}</th>` : `<td>${c}</td>`)).join('')}</tr>`).join('')}</table>`;
}

/* ===================== register ===================== */
export const DOMAINS = [
  { id: 'automatiseren', title: 'Automatiseren', emoji: '⚡' },
  { id: 'getallen', title: 'Getallen', emoji: '🔢' },
  { id: 'meten', title: 'Meten', emoji: '📏' },
  { id: 'verhoudingen', title: 'Verhoudingen', emoji: '🍕' },
  { id: 'verbanden', title: 'Verbanden', emoji: '📊' }
];
export const CATS = [];        // categorieën in volgorde
export const CAT = {};         // id → categorie
export const EX = {};          // volledige id 'cat.sub.ex' → { id, name, example, gen, cat, sub, groups }
export const GROEPEN = [1, 2, 3, 4, 5, 6, 7, 8];

export function defCat(def) {
  def.subs.forEach(s => {
    s.groups = s.groups || def.groups;
    s.ex.forEach(e => {
      const id = `${def.id}.${s.id}.${e.id}`;
      if (EX[id]) throw new Error('Dubbele oefening: ' + id);
      e.fullId = id;
      EX[id] = Object.assign({}, e, { id, cat: def, sub: s, groups: e.groups || s.groups });
    });
  });
  CATS.push(def);
  CAT[def.id] = def;
  return def;
}
/* Maak een vraag voor een oefening; voegt bron-id toe */
export function makeQ(id) {
  const q = EX[id].gen();
  q.ex = id;
  return q;
}
