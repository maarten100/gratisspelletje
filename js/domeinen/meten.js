/* Rekenraket – domein Meten: klokkijken, tijd, metriek stelsel, geld en meetkunde (blokkenbouwsels).
   Alle eigen functies beginnen met mt_, alle CSS-klassen met mt- (zie css/ex-meten.css). */
import { choice, clockSet, clockSVG, DAGEN, defCat, digitalClock, euro, klokWoord, MAANDEN, moneyHTML, multi, nl, num, order, pay, pick, R, round, shuffle } from '../kern.js';

/* ===================== algemene hulp ===================== */
const mt_p2 = n => String(n).padStart(2, '0');
const mt_tijd = (h, m) => `${mt_p2(h)}:${mt_p2(m)}`;
const mt_ok3 = v => isFinite(v) && Math.abs(v * 1000 - Math.round(v * 1000)) < 1e-6;
function mt_duur(min) {
  const h = Math.floor(min / 60), m = min % 60;
  const hs = h ? `${h} uur` : '', ms = m ? (m === 1 ? '1 minuut' : `${m} minuten`) : '';
  return h && m ? `${hs} en ${ms}` : hs || ms;
}
const mt_two = (a, la, b, lb) => `<div class="mt-two"><figure><figcaption>${la}</figcaption>${a}</figure><figure><figcaption>${lb}</figcaption>${b}</figure></div>`;
const mt_fig = (a, la) => `<div class="mt-two"><figure><figcaption>${la}</figcaption>${a}</figure></div>`;

/* ===================== KLOKKIJKEN ===================== */
const MT_KL = [
  { id: 'uren', title: 'Hele uren', groups: [3], st: 60, mins: [0], nw: [0], ex: 'drie uur' },
  { id: 'half', title: 'Hele en halve uren', groups: [3, 4], st: 30, mins: [0, 30], nw: [30], ex: 'half vier' },
  { id: 'kwart', title: 'Tot kwartieren', groups: [4, 5], st: 15, mins: [0, 15, 30, 45], nw: [15, 45], ex: 'kwart over drie' },
  { id: 'min10', title: 'Tot 10 minuten', groups: [5, 6], st: 10, cs: 5, mins: [0, 10, 20, 30, 40, 50], nw: [10, 20, 40, 50], ex: 'tien voor half vier' },
  { id: 'min5', title: 'Tot 5 minuten', groups: [5, 6], st: 5, mins: [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55], nw: [5, 25, 35, 55, 10, 20, 40, 50], ex: 'vijf over half vier' },
  { id: 'min1', title: 'Tot 1 minuut', groups: [6, 7, 8], st: 1, mins: [...Array(60).keys()], nw: [...Array(60).keys()].filter(m => m % 5), ex: 'zeven minuten over drie' }
];
const mt_min = L => (Math.random() < 0.7 ? pick(L.nw) : pick(L.mins));

function mt_khint(m) {
  if (m === 0) return 'De lange wijzer staat recht omhoog op de 12: dan is het een heel uur. De korte wijzer wijst het uur aan.';
  if (m === 30) return 'De lange wijzer staat op de 6: het is half. Let op: half betekent een half uur vóór het volgende uur.';
  if (m === 15 || m === 45) return 'Lange wijzer op de 3 = kwart over het uur. Lange wijzer op de 9 = kwart voor het volgende uur.';
  if (m % 5 === 0) return 'Elk cijfer is 5 minuten. Staat de lange wijzer dicht bij de 12? Dan zeg je "over" of "voor" het uur. Dicht bij de 6? Dan "voor half" of "over half".';
  return 'Elk streepje is 1 minuut. Tel de streepjes vanaf het dichtstbijzijnde cijfer: de 12, de 3, de 6 of de 9.';
}
function mt_dhint(h, m) {
  const a = h > 12 ? 'Is het uur groter dan 12? Haal er dan 12 af. ' : '';
  let b;
  if (m === 0) b = 'Na de dubbele punt staat 00: dan is het een heel uur.';
  else if (m === 30) b = '30 minuten is half. Half gaat altijd naar het vólgende uur.';
  else if (m === 15 || m === 45) b = '15 minuten = kwart over, 45 minuten = kwart voor het volgende uur.';
  else if (m < 15) b = `Het is ${m} minuten na het hele uur.`;
  else if (m < 30) b = `Nog ${30 - m} minuten tot het halve uur. Half gaat naar het volgende uur.`;
  else if (m < 45) b = `Het is ${m - 30} minuten na het halve uur. Half gaat naar het volgende uur.`;
  else b = `Nog ${60 - m} minuten tot het volgende hele uur.`;
  return a + b;
}
function mt_kWrong(h, m, L) {
  const s = L.st, w = [klokWoord(h + 1, m), klokWoord(h - 1, m), klokWoord(h, (m + s) % 60), klokWoord(h, (m + 60 - s) % 60)];
  if (m) w.push(klokWoord(h, 60 - m));
  if (m % 5 === 0) w.push(klokWoord(m / 5 || 12, (h % 12) * 5)); // wijzers verwisseld
  if (s === 60) w.push(klokWoord(h + 2, 0), klokWoord(h - 2, 0), klokWoord(h, 30));
  return w;
}
function mt_kAna(L) {
  const h = R(1, 12), m = mt_min(L);
  return choice('Hoe laat is het?', klokWoord(h, m), mt_kWrong(h, m, L), mt_khint(m), { vis: clockSVG(h, m) });
}
function mt_kSet(L) {
  const h = R(1, 12), m = mt_min(L);
  const hint = m === 0 ? 'Zet de lange wijzer op de 12 en de korte wijzer op het uur.'
    : m === 30 ? 'Bij half staat de lange wijzer op de 6. De korte wijzer staat dan tussen twee cijfers in.'
      : 'Zet eerst de lange wijzer goed (de minuten), kijk dan of de korte wijzer bij het goede uur staat. ' + (m < 30 ? '' : 'Na half gaat het al naar het volgende uur.');
  return clockSet(`Zet de klok op <b>${klokWoord(h, m)}</b>.`, h, m, hint, { step: L.cs || L.st });
}
function mt_kDig(L) {
  const m = mt_min(L), hh = L.st === 60 && Math.random() < 0.5 ? R(1, 12) : R(1, 23);
  const w = [klokWoord(hh + 1, m), klokWoord(hh - 1, m), klokWoord(hh, (m + L.st) % 60)];
  if (hh > 12 && hh % 10 && hh % 10 !== hh - 12) w.push(klokWoord(hh % 10, m));
  if (m) w.push(klokWoord(hh, 60 - m));
  if (L.st === 60) w.push(klokWoord(hh + 2, 0), klokWoord(hh, 30));
  return choice('Hoe zeg je deze tijd?', klokWoord(hh, m), w, mt_dhint(hh, m), { vis: digitalClock(hh, m) });
}
function mt_kDigSet(L) {
  const m = mt_min(L);
  let h = R(1, 12), ans, extra = '';
  const ctx = L.st <= 15 && Math.random() < 0.5 ? pick(['middag', 'avond']) : '';
  if (ctx === 'middag') { h = pick([12, 1, 2, 3, 4, 5]); ans = h === 12 ? 12 : h + 12; extra = ' in de middag'; }
  else if (ctx === 'avond') { h = R(6, 11); ans = h + 12; extra = ' in de avond'; }
  else ans = h;
  const q = `Zet de digitale klok op <b>${klokWoord(h, m)}${extra}</b>.` + (ctx ? '' : ' <small>(Gebruik de uren 1 tot en met 12.)</small>');
  const hint = (ctx ? 'Na 12 uur in de middag tel je door: 1 uur in de middag is 13:00, 2 uur is 14:00. ' : 'Je mag hier de ochtendtijd gebruiken: uren van 1 tot en met 12. ')
    + (m === 0 ? 'Een heel uur: de minuten zijn 00.' : 'Kwart = 15 minuten, half = 30 minuten. Bij "half" of "voor" hoort het uur ervóór op de digitale klok.');
  return multi(q, [ans, m], hint, { vis: '<div class="digital mt-dset">{{0}}<span>:</span>{{1}}</div>' });
}
function mt_kOmzet(L) {
  const m = mt_min(L), h = R(1, 12);
  if (Math.random() < 0.5) {
    const mid = L.st <= 30 && h <= 6 && Math.random() < 0.4;
    const hh = mid ? h + 12 : h;
    const w = [mt_tijd(hh + 1 > 23 ? 1 : hh + 1, m), mt_tijd(hh - 1 || 12, m), mt_tijd(hh, (m + L.st) % 60)];
    if (mid) w.push(mt_tijd(h, m), mt_tijd(h + 13, m));
    else if (L.st === 60) w.push(mt_tijd((h + 1) % 12 + 1, m), mt_tijd((h + 8) % 12 + 1, m));
    if (m % 5 === 0) w.push(mt_tijd(m / 5 || 12, (h % 12) * 5));
    if (m % 5 === 0 && m) w.push(mt_tijd(h, m / 5));
    if (m >= 30) w.push(mt_tijd(h + 1, m));
    if (m) w.push(mt_tijd(h, 60 - m));
    return choice(`${mid ? 'Het is middag. ' : ''}Welke digitale tijd hoort bij deze klok?`, mt_tijd(hh, m), w,
      'De korte wijzer wijst het uur aan, de lange wijzer de minuten. Elk cijfer op de klok is 5 minuten.' + (mid ? ' In de middag tel je 12 uur erbij.' : ''), { vis: clockSVG(h, m) });
  }
  const hh = R(1, 23), c = (a, b) => clockSVG(a, b, 'mt-ch');
  const w = [c(hh + 1, m), c(hh - 1, m), c(hh, (m + 30) % 60)];
  if (m % 5 === 0) w.push(c(m / 5 || 12, (hh % 12) * 5));
  if (hh > 12 && hh % 10 && hh % 10 !== hh - 12) w.push(c(hh % 10, m));
  return choice('Welke klok wijst deze tijd aan?', c(hh, m), w, mt_dhint(hh, m) + ' Kijk goed naar de korte wijzer: die schuift langzaam naar het volgende uur.', { vis: digitalClock(hh, m) });
}

defCat({
  id: 'klok', domain: 'meten', title: 'Klokkijken', emoji: '🕒', groups: [3, 4, 5, 6, 7, 8],
  uitleg: `<p>De <b>korte wijzer</b> wijst het uur aan, de <b>lange wijzer</b> de minuten. Elk cijfer is 5 minuten, elk streepje 1 minuut.</p>
    <div class="voorbeeld">Lange wijzer op de 12 → <b>drie uur</b> · op de 3 → <b>kwart over drie</b> · op de 6 → <b>half vier</b> · op de 9 → <b>kwart voor vier</b></div>
    <p>Let op: <b>half vier</b> is een half uur vóór vier uur, dus 3:30!</p>
    <div class="voorbeeld">3:10 = tien over drie · 3:20 = tien voor half vier · 3:40 = tien over half vier · 3:50 = tien voor vier</div>
    <p>Op een <b>digitale klok</b> gaan de uren door tot 23. Na 12 uur haal je er 12 af:</p>
    <div class="voorbeeld">15:30 → 15 − 12 = 3 → <b>half vier</b> in de middag</div>`,
  subs: MT_KL.map(L => ({
    id: L.id, title: L.title, groups: L.groups, ex: [
      { id: 'ana', name: 'Analoge klok aflezen', example: L.ex, gen: () => mt_kAna(L) },
      { id: 'anaset', name: 'Analoge klok goedzetten', example: 'Zet de klok op ' + L.ex, gen: () => mt_kSet(L) },
      { id: 'dig', name: 'Digitale klok aflezen', example: '15:30 = half vier', gen: () => mt_kDig(L) },
      { id: 'digset', name: 'Digitale klok goedzetten', example: L.ex + ' = __ : __', gen: () => mt_kDigSet(L) },
      { id: 'omzet', name: 'Analoog en digitaal omzetten', example: 'klok ↔ 03:30', gen: () => mt_kOmzet(L) }
    ]
  }))
});

/* ===================== TIJD ===================== */
function mt_cal(y, mo, marks = []) {
  const first = (new Date(y, mo, 1).getDay() + 6) % 7, dim = new Date(y, mo + 1, 0).getDate();
  let s = `<table class="mt-cal"><caption>${MAANDEN[mo]} ${y}</caption><tr>${['ma', 'di', 'wo', 'do', 'vr', 'za', 'zo'].map(d => `<th>${d}</th>`).join('')}</tr><tr>`;
  for (let i = 0; i < first; i++) s += '<td></td>';
  for (let d = 1; d <= dim; d++) {
    if (d > 1 && (first + d - 1) % 7 === 0) s += '</tr><tr>';
    s += `<td${marks.includes(d) ? ' class="mt-on"' : ''}>${d}</td>`;
  }
  return s + '</tr></table>';
}
const MT_RANG = ['eerste', 'tweede', 'derde', 'vierde'];
function mt_maandVolg() {
  const t = R(0, 2);
  if (t === 0) {
    const n = R(4, 5), ms = shuffle([...Array(12).keys()]).slice(0, n);
    return order('Zet de maanden in de goede volgorde. Begin bij de maand die het eerst komt in het jaar.', ms.map(i => MAANDEN[i]), ms,
      'Het jaar begint met januari, februari, maart … en eindigt met november en december.');
  }
  if (t === 1) {
    const mo = R(0, 11), k = pick([1, 1, 2, 3, -1, -1, -2]), ans = MAANDEN[(mo + k + 12) % 12];
    const q = k === 1 ? `Welke maand komt na <b>${MAANDEN[mo]}</b>?` : k === -1 ? `Welke maand komt vóór <b>${MAANDEN[mo]}</b>?`
      : k > 0 ? `Welke maand is het ${k} maanden na <b>${MAANDEN[mo]}</b>?` : `Welke maand was het 2 maanden vóór <b>${MAANDEN[mo]}</b>?`;
    const w = [-3, -2, -1, 0, 1, 2, 3].filter(x => x !== k).map(x => MAANDEN[(mo + x + 12) % 12]);
    return choice(q, ans, w, 'Zeg de maanden op een rij op. Na december begint het jaar weer bij januari.');
  }
  const mo = R(0, 11);
  return num(`De hoeveelste maand van het jaar is <b>${MAANDEN[mo]}</b>?`, mo + 1, 'Tel de maanden vanaf januari: januari is de 1e maand.');
}
function mt_kalDag() {
  const y = pick([2026, 2027]), mo = R(0, 11), dim = new Date(y, mo + 1, 0).getDate();
  const wd = d => (new Date(y, mo, d).getDay() + 6) % 7;
  const t = R(0, 3);
  if (t === 0) {
    const d = R(1, dim), x = wd(d);
    return choice(`Op welke dag valt <b>${d} ${MAANDEN[mo]}</b>?`, DAGEN[x], [1, 6, 2, 5].map(k => DAGEN[(x + k) % 7]),
      'Zoek de datum in de kalender. Kijk dan welke dag er bovenaan die kolom staat.', { vis: mt_cal(y, mo, [d]) });
  }
  if (t === 1) {
    const dag = R(0, 6), list = [];
    for (let d = 1; d <= dim; d++) if (wd(d) === dag) list.push(d);
    const k = R(0, 3);
    return num(`Welke datum is de <b>${MT_RANG[k]} ${DAGEN[dag]}</b> van ${MAANDEN[mo]}?`, list[k],
      `Zoek de kolom van ${DAGEN[dag]} en tel van boven naar beneden.`, { vis: mt_cal(y, mo) });
  }
  if (t === 2) {
    const d = R(1, dim - 3), n = R(2, Math.min(20, dim - d)), x = wd(d + n);
    return choice(`Het is <b>${DAGEN[wd(d)]} ${d} ${MAANDEN[mo]}</b>. Welke dag is het ${n} dagen later?`, DAGEN[x], [1, 6, 2, 5].map(k => DAGEN[(x + k) % 7]),
      'Na 7 dagen is het weer dezelfde dag. Tel verder in de kalender.', { vis: mt_cal(y, mo, [d]) });
  }
  const dag = R(0, 6); let c = 0;
  for (let d = 1; d <= dim; d++) if (wd(d) === dag) c++;
  return num(`Hoeveel keer is het <b>${DAGEN[dag]}</b> in ${MAANDEN[mo]} ${y}?`, c, `Tel de datums in de kolom van ${DAGEN[dag]}.`, { vis: mt_cal(y, mo) });
}
function mt_kalBegrip() {
  const t = R(0, 5), dimOf = (y, mo) => new Date(y, mo + 1, 0).getDate();
  if (t === 0) {
    const mo = R(0, 11);
    if (mo === 1) {
      const y = pick([2026, 2027, 2028]);
      return num(`Hoeveel dagen heeft februari in ${y}?`, dimOf(y, 1), 'In een schrikkeljaar (2024, 2028, 2032 …) heeft februari 29 dagen, anders 28.', { unit: 'dagen' });
    }
    return num(`Hoeveel dagen heeft <b>${MAANDEN[mo]}</b>?`, dimOf(2026, mo), 'Tel op je knokkels: een knokkel is een maand met 31 dagen, een kuiltje een maand met 30 dagen (februari is korter).', { unit: 'dagen' });
  }
  if (t === 1) { const n = R(2, 10); return num(`Hoeveel dagen zijn <b>${n} weken</b>?`, n * 7, 'Een week heeft 7 dagen.', { unit: 'dagen' }); }
  if (t === 2) { const n = R(2, 10); return num(`Hoeveel weken zijn <b>${n * 7} dagen</b>?`, n, 'Een week heeft 7 dagen. Hoe vaak past 7 in dit getal?', { unit: 'weken' }); }
  if (t === 3) {
    const mo = R(0, 11), d = R(1, 28), n = R(5, 30), f = k => { const x = new Date(2026, mo, d + n + k); return `${x.getDate()} ${MAANDEN[x.getMonth()]}`; };
    return choice(`Het is <b>${d} ${MAANDEN[mo]}</b>. Welke datum is het over ${n} dagen?`, f(0), [f(1), f(-1), f(2), f(7), f(-7)],
      `Tel ${n} dagen verder. Denk erom: ${MAANDEN[mo]} heeft ${dimOf(2026, mo)} dagen.`);
  }
  if (t === 4) {
    const mo = R(0, 11), a = R(1, 14), b = R(a + 3, dimOf(2026, mo));
    return num(`Hoeveel dagen is het van <b>${a} ${MAANDEN[mo]}</b> tot <b>${b} ${MAANDEN[mo]}</b>?`, b - a, 'Reken het verschil uit tussen de twee datums.', { unit: 'dagen' });
  }
  const [q, v, h] = pick([['Hoeveel maanden heeft een jaar?', 12, 'Van januari tot en met december.'], ['Hoeveel dagen heeft een jaar dat geen schrikkeljaar is?', 365, 'Het is iets meer dan 52 weken.'],
    ['Hoeveel dagen heeft een schrikkeljaar?', 366, 'Een schrikkeljaar heeft één dag extra: 29 februari.'], ['Hoeveel uur heeft een dag?', 24, 'Van middernacht tot middernacht: 2 keer 12 uur.'],
    ['Hoeveel maanden zijn een half jaar?', 6, 'Een jaar heeft 12 maanden.'], ['Hoeveel weken heeft een jaar ongeveer?', 52, '365 dagen gedeeld door 7.']]);
  return num(q, v, h);
}

const MT_DL = [
  { id: 'uren', title: 'Hele uren', st: 60, max: 360, ex: 'van 2 uur tot 5 uur' },
  { id: 'half', title: 'Hele en halve uren', st: 30, max: 270, ex: 'van 2 uur tot half 5' },
  { id: 'kwart', title: 'Tot kwartieren', st: 15, max: 225, ex: 'van kwart over 2 tot 4 uur' },
  { id: 'min5', title: 'Tot 5 minuten', st: 5, max: 200, ex: 'van 2:05 tot 3:40' },
  { id: 'min1', title: 'Tot 1 minuut', st: 1, max: 180, ex: 'van 2:07 tot 3:52' }
];
const MT_ACT = ['de film', 'de voetbaltraining', 'het feestje', 'de zwemles', 'de busreis', 'het concert', 'de wandeling', 'de schoolreis', 'de toneelvoorstelling', 'de knutselmiddag'];
function mt_duurQ(L, dig) {
  const st = L.st;
  let d = st * R(1, Math.floor(L.max / st));
  if (st < 60 && d % 60 === 0 && Math.random() < 0.8) d += st;
  let b = R(dig ? 6 : 7, dig ? 20 : 16) * 60 + (st === 1 ? R(0, 59) : st * R(0, Math.floor(59 / st)));
  while (b + d > 23 * 60 + 59) b -= 60;
  const e = b + d, bh = Math.floor(b / 60), bm = b % 60, eh = Math.floor(e / 60), em = e % 60;
  const act = pick(MT_ACT), Act = act[0].toUpperCase() + act.slice(1);
  const show = (h, m) => (dig ? digitalClock(h, m) : clockSVG(h, m, 'mt-sm'));
  const blank = '<div class="digital mt-dset">{{0}}<span>:</span>{{1}}</div>';
  const t = R(0, 2);
  if (t === 0) {
    const hint = 'Tel eerst de hele uren vanaf de begintijd. Hoeveel minuten blijven er dan nog over tot de eindtijd?';
    const vis = mt_two(show(bh, bm), 'begin', show(eh, em), 'eind');
    if (st === 60) return num(`Hoe lang duurt ${act}?`, d / 60, hint, { unit: 'uur', vis });
    return multi(`Hoe lang duurt ${act}?`, [Math.floor(d / 60), d % 60], hint, { vis: vis + '<p class="mt-ans">{{0}} uur en {{1}} minuten</p>' });
  }
  if (t === 1) {
    const q = `${Act} begint om ${dig ? 'deze tijd' : 'de tijd op de klok'} en duurt <b>${mt_duur(d)}</b>. ${dig ? 'Hoe laat is het dan afgelopen?' : 'Zet de klok op de eindtijd.'}`;
    const hint = 'Tel eerst de hele uren erbij, daarna de minuten.' + (st < 60 ? ' Kom je over de 60 minuten? Dan begint een nieuw uur.' : '');
    if (dig) return multi(q, [eh, em], hint + ' Gebruik de 24-uursklok, net als de begintijd.', { vis: mt_two(show(bh, bm), 'begin', blank, 'eind') });
    return clockSet(q, eh, em, hint, { step: st, vis: mt_fig(show(bh, bm), 'begin') });
  }
  const q = `${Act} duurt <b>${mt_duur(d)}</b> en is om ${dig ? 'deze tijd' : 'de tijd op de klok'} afgelopen. ${dig ? 'Hoe laat begon het?' : 'Zet de klok op de begintijd.'}`;
  const hint = 'Reken terug: haal eerst de hele uren eraf, daarna de minuten.' + (st < 60 ? ' Ga je onder de 0 minuten? Ga dan een uur terug en tel 60 minuten erbij.' : '');
  if (dig) return multi(q, [bh, bm], hint + ' Gebruik de 24-uursklok.', { vis: mt_two(blank, 'begin', show(eh, em), 'eind') });
  return clockSet(q, bh, bm, hint, { step: st, vis: mt_fig(show(eh, em), 'eind') });
}

const MT_VOER = [['wandelaar', 'loopt', [3, 4, 5, 6]], ['fietser', 'fietst', [12, 15, 16, 18, 20, 24]], ['scooter', 'rijdt', [25, 30, 36, 40, 45]],
  ['auto', 'rijdt', [50, 60, 70, 80, 90, 100, 120]], ['trein', 'rijdt', [80, 100, 120, 140, 160]], ['vliegtuig', 'vliegt', [600, 720, 800, 900]]];
const MT_TDUR = [[60, '1 uur'], [120, '2 uur'], [180, '3 uur'], [30, 'een half uur'], [15, 'een kwartier'], [45, 'drie kwartier'], [90, 'anderhalf uur'], [20, '20 minuten'], [10, '10 minuten'], [150, '2,5 uur']];
function mt_snelKmu() {
  for (let k = 0; k < 60; k++) {
    const [wie, ww, vs] = pick(MT_VOER), v = pick(vs), [t, ts] = pick(MT_TDUR), d = v * t / 60;
    if (!Number.isInteger(d) || d < 1) continue;
    return num(`Een ${wie} ${ww} <b>${nl(d, true)} km</b> in <b>${ts}</b>. Hoe snel is dat gemiddeld?`, v,
      'km/u betekent: hoeveel kilometer in 1 uur (60 minuten). ' + (t === 60 ? 'Hier is de tijd al precies 1 uur.' : t < 60 ? `Hoe vaak past ${t} minuten in een uur?` : 'Reken uit hoeveel km er in 1 uur wordt afgelegd.'), { unit: 'km/u' });
  }
  return num('Een auto rijdt <b>120 km</b> in <b>2 uur</b>. Hoe snel is dat gemiddeld?', 60, 'Hoeveel km rijdt de auto in 1 uur?', { unit: 'km/u' });
}
function mt_snelDuur() {
  for (let k = 0; k < 80; k++) {
    const [wie, ww, vs] = pick(MT_VOER), v = pick(vs), t = pick([15, 20, 30, 40, 45, 60, 75, 90, 105, 120, 150, 180, 210, 240]), d = v * t / 60;
    if (!Number.isInteger(d) || d < 1) continue;
    return multi(`Een ${wie} ${ww} gemiddeld <b>${v} km/u</b>. Hoe lang doet hij over <b>${nl(d, true)} km</b>?`, [Math.floor(t / 60), t % 60],
      `In 1 uur (60 minuten) gaat de ${wie} ${v} km. In een half uur gaat hij de helft daarvan, in een kwartier een kwart. Hoeveel tijd is nodig voor ${nl(d, true)} km?`,
      { vis: '<p class="mt-ans">{{0}} uur en {{1}} minuten</p>' });
  }
  return multi('Een auto rijdt gemiddeld <b>60 km/u</b>. Hoe lang doet hij over <b>90 km</b>?', [1, 30], 'In 1 uur rijdt de auto 60 km.', { vis: '<p class="mt-ans">{{0}} uur en {{1}} minuten</p>' });
}

defCat({
  id: 'tijd', domain: 'meten', title: 'Tijd', emoji: '📅', groups: [3, 4, 5, 6, 7, 8],
  uitleg: `<p>Een jaar heeft <b>12 maanden</b>, 52 weken en 365 dagen (een schrikkeljaar 366). Een week heeft 7 dagen.</p>
    <div class="voorbeeld">31 dagen: januari, maart, mei, juli, augustus, oktober, december · 30 dagen: april, juni, september, november · februari: 28 (of 29)</div>
    <p><b>Tijdsduur</b>: tel eerst de hele uren, dan de minuten.</p>
    <div class="voorbeeld">van 14:20 tot 16:05 → 14:20 + 1 uur = 15:20 → nog 40 minuten tot 16:00 → nog 5 minuten → <b>1 uur en 45 minuten</b></div>
    <p><b>Snelheid</b> in km/u: hoeveel kilometer je in 1 uur aflegt.</p>
    <div class="voorbeeld">30 km in een half uur → in 1 uur 2 × 30 = <b>60 km/u</b> · 80 km/u, 200 km → 200 : 80 = <b>2,5 uur</b> = 2 uur en 30 minuten</div>`,
  subs: [
    { id: 'kalender', title: 'Kalender', groups: [4, 5, 6], ex: [
      { id: 'maanden', name: 'Volgorde van de maanden', example: 'januari, februari, …', gen: mt_maandVolg },
      { id: 'dag', name: 'Welke dag is het?', example: 'Op welke dag valt 14 maart?', gen: mt_kalDag },
      { id: 'begrip', name: 'De kalender begrijpen', example: 'Hoeveel dagen heeft april?', gen: mt_kalBegrip }
    ]},
    { id: 'duurana', title: 'Tijdsduur analoog', groups: [3, 4, 5, 6, 7, 8], ex: MT_DL.map(L => ({ id: L.id, name: L.title, example: L.ex, gen: () => mt_duurQ(L, false) })) },
    { id: 'duurdig', title: 'Tijdsduur digitaal', groups: [5, 6, 7, 8], ex: MT_DL.map(L => ({ id: L.id, name: L.title, example: L.ex.replace(/(\d+) uur/g, '$1:00'), gen: () => mt_duurQ(L, true) })) },
    { id: 'snelheid', title: 'Snelheid', groups: [7, 8], ex: [
      { id: 'kmu', name: 'Omrekenen naar km/u', example: '30 km in een half uur = ? km/u', gen: mt_snelKmu },
      { id: 'duur', name: 'km/u naar tijdsduur', example: '80 km/u, 200 km → ? uur', gen: mt_snelDuur }
    ]}
  ]
});

/* ===================== METRIEK STELSEL ===================== */
/* Omrekenen: units = [[naam, factor t.o.v. kleinste maat]]. o.must = maat die erin moet, o.mix = [groepA, groepB] één uit elk */
function mt_nice() {
  return pick([R(2, 9), R(11, 99), R(2, 9) * 10, R(2, 9) * 100, R(11, 99) * 10, R(11, 99) / 10, R(1, 9) / 10, R(1, 99) / 100, R(101, 999), R(2, 9) * 1000, R(15, 95) * 100]);
}
function mt_conv(units, o = {}) {
  for (let k = 0; k < 200; k++) {
    let i = R(0, units.length - 1), j = R(0, units.length - 1);
    if (i === j) continue;
    const [a, fa] = units[i], [b, fb] = units[j];
    if (o.must && a !== o.must && b !== o.must && Math.random() < 0.8) continue;
    if (o.mix && !((o.mix[0].includes(a) && o.mix[1].includes(b)) || (o.mix[1].includes(a) && o.mix[0].includes(b)))) continue;
    const r = Math.max(fa, fb) / Math.min(fa, fb);
    if (r > (o.maxr || 1e6)) continue;
    const x = mt_nice(), y = round(x * fa / fb, 9);
    if (!mt_ok3(x) || !mt_ok3(y) || y > 1e7 || x > 1e7 || y < 0.001) continue;
    if ((r >= 1e4 && x < 1 && y < 1) || (fa < fb && x < 1 && Math.random() < 0.85)) continue;
    return mt_convQ(a, b, x, y, fa, fb);
  }
  const [a, fa] = units[0], [b, fb] = units[1];
  return mt_convQ(a, b, 3, round(3 * fa / fb, 9), fa, fb);
}
function mt_convQ(a, b, x, y, fa, fb) {
  const big = fa >= fb ? a : b, small = fa >= fb ? b : a, r = round(Math.max(fa, fb) / Math.min(fa, fb), 6);
  const hint = r === 1 ? `1 ${a} is precies even veel als 1 ${b}.`
    : `1 ${big} = ${nl(r, true)} ${small}. ` + (fa > fb ? 'Van een grote naar een kleine maat: keer. Het getal wordt groter.' : 'Van een kleine naar een grote maat: delen. Het getal wordt kleiner.');
  return num(`${nl(x, x >= 10000)} ${a} = ? ${b}`, round(y, 6), hint, { unit: b });
}
const MT_U = {
  len1: [['m', 1000], ['dm', 100], ['cm', 10], ['mm', 1]],
  len2: [['km', 1000], ['hm', 100], ['dam', 10], ['m', 1]],
  opp1: [['m²', 1e6], ['dm²', 1e4], ['cm²', 100], ['mm²', 1]],
  opp2: [['km²', 1e6], ['hm²', 1e4], ['dam²', 100], ['m²', 1]],
  are: [['km²', 1e6], ['ha', 1e4], ['a', 100], ['m²', 1]],
  gew2: [['kg', 1000], ['g', 1]],
  gew3: [['kg', 1e6], ['g', 1000], ['mg', 1]],
  inh: [['l', 1000], ['dl', 100], ['cl', 10], ['ml', 1]],
  kub: [['m³', 1e9], ['dm³', 1e6], ['cm³', 1000], ['mm³', 1]]
};
MT_U.kubl = MT_U.kub.concat([['l', 1e6]]);
MT_U.kuball = MT_U.kub.concat([['l', 1e6], ['dl', 1e5], ['cl', 1e4], ['ml', 1e3]]);

/* schatten: [zin met …, getal, maat] en de maten waaruit gekozen wordt */
function mt_schat(list, units, cmp) {
  if (Math.random() < 0.3) return cmp();
  const [zin, v, u] = pick(list);
  const w = units.filter(x => x !== u).map(x => `${nl(v)} ${x}`);
  if (units.length < 3) w.push(`${nl(v * 10)} ${u}`, `${nl(v * 100)} ${u}`);
  return choice(`Wat past het best? <b>${zin.replace('…', '___')}</b>`, `${nl(v)} ${u}`, w, 'Denk aan iets wat je kent: hoe groot of zwaar is dat? Kies dan de maat die het beste past.');
}
/* vergelijken: waarden in kleinste maat, weergave in een willekeurige maat */
function mt_vergelijk(units, gen, q, hint) {
  const vals = [];
  while (vals.length < 4) { const v = gen(); if (!vals.includes(v)) vals.push(v); }
  const show = v => { const opts = units.filter(([, f]) => mt_ok3(v / f) && v / f < 100000); const [u, f] = pick(opts); return `${nl(round(v / f, 6), true)} ${u}`; };
  const strs = vals.map(show), mx = Math.max(...vals);
  return choice(q, strs[vals.indexOf(mx)], strs.filter((_, i) => vals[i] !== mx), hint);
}
const MT_SL = [['Een potlood is ongeveer … lang.', 15, 'cm'], ['Een mier is ongeveer … lang.', 4, 'mm'], ['Een deur is ongeveer … hoog.', 2, 'm'],
  ['Een gum is ongeveer … lang.', 4, 'cm'], ['Een liniaal is ongeveer … lang.', 30, 'cm'], ['Een rijstkorrel is ongeveer … lang.', 6, 'mm'],
  ['Een tafel is ongeveer … hoog.', 7, 'dm'], ['Een giraf is ongeveer … hoog.', 5, 'm'], ['Een emmer is ongeveer … hoog.', 3, 'dm'],
  ['Een munt van 1 euro is ongeveer … dik.', 2, 'mm'], ['Een klaslokaal is ongeveer … lang.', 9, 'm'], ['Een schoen is ongeveer … lang.', 25, 'cm'],
  ['Een bus is ongeveer … lang.', 12, 'm'], ['Je vinger is ongeveer … lang.', 7, 'cm'], ['Een stoel is ongeveer … hoog.', 8, 'dm'], ['Een paperclip is ongeveer … lang.', 3, 'cm']];
const MT_SG = [['Een appel weegt ongeveer …', 150, 'g'], ['Een fiets weegt ongeveer …', 15, 'kg'], ['Een pak suiker weegt …', 1, 'kg'], ['Een volwassene weegt ongeveer …', 75, 'kg'],
  ['Een potlood weegt ongeveer …', 5, 'g'], ['Een zak aardappelen weegt ongeveer …', 5, 'kg'], ['Een boterham weegt ongeveer …', 30, 'g'], ['Een kat weegt ongeveer …', 4, 'kg'],
  ['Een paperclip weegt ongeveer …', 1, 'g'], ['Een banaan weegt ongeveer …', 120, 'g'], ['Een pasgeboren baby weegt ongeveer …', 3, 'kg'], ['Een olifant weegt ongeveer …', 5000, 'kg'], ['Een ei weegt ongeveer …', 60, 'g']];
const MT_SI = [['In een pak melk zit …', 1, 'l'], ['Op een theelepel past ongeveer …', 5, 'ml'], ['In een glas water zit ongeveer …', 2, 'dl'], ['In een blikje frisdrank zit …', 33, 'cl'],
  ['In een emmer past ongeveer …', 10, 'l'], ['In een badkuip past ongeveer …', 150, 'l'], ['Op een eetlepel past ongeveer …', 15, 'ml'], ['In een grote fles cola zit …', 15, 'dl'],
  ['In een gieter past ongeveer …', 5, 'l'], ['In een kopje thee zit ongeveer …', 15, 'cl'], ['In een flesje parfum zit ongeveer …', 50, 'ml']];

/* figuren tekenen: punten in eenheden (y omlaag), labels per zijde (tekst, of [tekst] voor binnen de figuur), o.dash = [[x1,y1,x2,y2,label]] */
function mt_lab(x, y, nx, ny, t) {
  const anchor = nx > 0.5 ? 'start' : nx < -0.5 ? 'end' : 'middle';
  return `<text x="${round(x + nx * 7, 1)}" y="${round(y + ny * 12 + 4, 1)}" text-anchor="${anchor}" class="mt-lbl">${t}</text>`;
}
function mt_poly(pts, labels, o = {}) {
  const xs = pts.map(p => p[0]), ys = pts.map(p => p[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const sc = Math.min(200 / (x1 - x0 || 1), 140 / (y1 - y0 || 1));
  const P = ([x, y]) => [round((x - x0) * sc + 60, 1), round((y - y0) * sc + 26, 1)];
  const W = round((x1 - x0) * sc + 120, 1), H = round((y1 - y0) * sc + 52, 1);
  let A = 0;
  pts.forEach((p, i) => { const q = pts[(i + 1) % pts.length]; A += p[0] * q[1] - q[0] * p[1]; });
  const sp = pts.map(P);
  let s = `<svg class="mt-svg" viewBox="0 0 ${W} ${H}" role="img" aria-label="figuur"><polygon points="${sp.map(p => p.join(',')).join(' ')}" class="mt-shape"/>`;
  (o.dash || []).forEach(([a, b, c, d, lab]) => {
    const p = P([a, b]), q = P([c, d]);
    s += `<line x1="${p[0]}" y1="${p[1]}" x2="${q[0]}" y2="${q[1]}" class="mt-dash"/>`;
    if (lab) s += mt_lab((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, 1, 0, lab);
  });
  (o.text || []).forEach(([x, y, t]) => { const p = P([x, y]); s += mt_lab(p[0], p[1], 0, -1, t); });
  sp.forEach((p, i) => {
    if (!labels[i]) return;
    const inside = Array.isArray(labels[i]), t = inside ? labels[i][0] : labels[i]; // [tekst] = label binnen de figuur
    const q = sp[(i + 1) % sp.length], dx = q[0] - p[0], dy = q[1] - p[1], len = Math.hypot(dx, dy) || 1;
    let nx = dy / len, ny = -dx / len;
    if ((A < 0) !== inside) { nx = -nx; ny = -ny; }
    s += mt_lab((p[0] + q[0]) / 2, (p[1] + q[1]) / 2, nx, ny, t);
  });
  return s + '</svg>';
}
function mt_rectFig(W, H, lw, lh) { return mt_poly([[0, 0], [W, 0], [W, H], [0, H]], [lw, lh, '', '']); }
/* L-vorm: buiten W×H, hap w×h rechtsboven. U-vorm: hap w×h in het midden boven (links a breed) */
function mt_L(u, hide) {
  const W = R(7, 18), H = R(5, 13), w = R(2, W - 3), h = R(2, H - 2);
  const lab = [hide ? '' : `${W - w} ${u}`, `${h} ${u}`, [`${w} ${u}`], hide ? '' : `${H - h} ${u}`, `${W} ${u}`, `${H} ${u}`];
  return { fig: mt_poly([[0, 0], [W - w, 0], [W - w, h], [W, h], [W, H], [0, H]], lab), omtrek: 2 * (W + H), opp: W * H - w * h, note: '', hidden: hide };
}
function mt_U(u) {
  const a = R(2, 5), w = R(5, 8), c = R(2, 5), W = a + w + c, H = R(6, 12), h = R(3, H - 3);
  const lab = [`${a} ${u}`, `${h} ${u}`, '', '', `${c} ${u}`, `${H} ${u}`, `${W} ${u}`, `${H} ${u}`];
  return { fig: mt_poly([[0, 0], [a, 0], [a, h], [a + w, h], [a + w, 0], [W, 0], [W, H], [0, H]], lab, { text: [[a + w / 2, 0, `${w} ${u}`]] }),
    omtrek: 2 * (W + H) + 2 * h, opp: W * H - w * h, note: ' De inham is aan beide kanten even diep.' };
}
/* trap: twee treden rechtsboven */
function mt_trap(u) {
  const a = R(2, 6), c = R(2, 5), g = R(2, 5), b = R(2, 4), e = R(2, 4), H = b + e + R(2, 6), W = a + c + g;
  const lab = [`${a} ${u}`, `${b} ${u}`, [`${c} ${u}`], `${e} ${u}`, [`${g} ${u}`], `${H - b - e} ${u}`, `${W} ${u}`, `${H} ${u}`];
  return { fig: mt_poly([[0, 0], [a, 0], [a, b], [a + c, b], [a + c, b + e], [W, b + e], [W, H], [0, H]], lab),
    omtrek: 2 * (W + H), opp: a * H + c * (H - b) + g * (H - b - e), note: '' };
}
function mt_samen(u, hide) { const t = R(0, 2); return t === 0 ? mt_L(u, hide) : t === 1 ? mt_U(u) : mt_trap(u); }
function mt_omtrekRect() {
  const u = pick(['cm', 'm']);
  if (Math.random() < 0.3) {
    const L = R(5, 40), B = R(3, L - 1);
    return num(`Een tuin is <b>${L} m</b> lang en <b>${B} m</b> breed. Hoeveel meter hek is er nodig om de hele tuin heen?`, 2 * (L + B), 'Het hek gaat langs alle vier de zijden. Twee zijden zijn lang, twee zijden zijn kort.', { unit: 'm' });
  }
  if (Math.random() < 0.25) {
    const z = R(2, 25);
    return num('Dit is een <b>vierkant</b>. Wat is de omtrek?', 4 * z, 'Bij een vierkant zijn alle 4 de zijden even lang.', { unit: u, vis: mt_rectFig(1, 1, `${z} ${u}`, '') });
  }
  const W = R(4, 30), H = R(2, W - 1);
  return num('Wat is de omtrek van deze rechthoek?', 2 * (W + H), 'De omtrek is alle zijden bij elkaar opgeteld. De overkant van een zijde is even lang.', { unit: u, vis: mt_rectFig(W, H, `${W} ${u}`, `${H} ${u}`) });
}
function mt_omtrekSam() {
  const u = pick(['cm', 'm']), hide = Math.random() < 0.4, f = mt_samen(u, hide);
  return num('Wat is de omtrek van deze figuur?' + f.note, f.omtrek, 'Loop in gedachten één keer helemaal om de figuur heen en tel alle zijden op.' + (f.hidden ? ' Twee zijden staan er niet bij: die kun je uitrekenen met de andere zijden.' : ''), { unit: u, vis: f.fig });
}
function mt_oppRect() {
  const u = pick(['cm', 'm']), W = R(3, 25), H = R(2, 15);
  if (Math.random() < 0.25) return num(`Een kamer is <b>${Math.max(W, H)} m</b> lang en <b>${Math.min(W, H)} m</b> breed. Hoeveel m² vloerbedekking is er nodig?`, W * H, 'Oppervlakte = lengte × breedte.', { unit: 'm²' });
  return num('Wat is de oppervlakte van deze rechthoek?', W * H, 'Oppervlakte = lengte × breedte. Hoeveel vierkantjes van 1 bij 1 passen erin?', { unit: u + '²', vis: mt_rectFig(W, H, `${W} ${u}`, `${H} ${u}`) });
}
function mt_oppMix() {
  const t = R(0, 3);
  let la, lb, a, b, ua, ub, ans, au;
  if (t === 0) { a = R(2, 9); b = R(1, 9) * 10; ua = 'm'; ub = 'cm'; if (Math.random() < 0.5) { au = 'm²'; ans = a * b / 100; } else { au = 'cm²'; ans = a * 100 * b; } }
  else if (t === 1) { a = R(2, 9); b = R(2, 9); ua = 'm'; ub = 'dm'; if (Math.random() < 0.5) { au = 'm²'; ans = a * b / 10; } else { au = 'dm²'; ans = a * 10 * b; } }
  else if (t === 2) { a = R(2, 20); b = R(1, 19) * 5; ua = 'cm'; ub = 'mm'; if (Math.random() < 0.5) { au = 'cm²'; ans = a * b / 10; } else { au = 'mm²'; ans = a * 10 * b; } }
  else { a = R(2, 9); b = R(2, 9); ua = 'dm'; ub = 'cm'; if (Math.random() < 0.5) { au = 'dm²'; ans = a * b / 10; } else { au = 'cm²'; ans = a * 10 * b; } }
  la = `${a} ${ua}`; lb = `${b} ${ub}`;
  const fa = { m: 100, dm: 10, cm: 1, mm: 0.1 };
  const W = a * fa[ua], H = b * fa[ub];
  return num(`Hoeveel <b>${au}</b> is de oppervlakte van deze rechthoek?`, round(ans, 6), `Maak eerst beide zijden dezelfde maat (de maat van het antwoord zonder het kwadraatje). Daarna lengte × breedte.`,
    { unit: au, vis: mt_rectFig(Math.max(W, H * 0.3), Math.max(H, W * 0.15), la, lb) });
}
function mt_oppDrie() {
  const u = pick(['cm', 'm']), b = R(3, 16), h = R(2, 12);
  const hint = 'Een driehoek is de helft van een rechthoek. Oppervlakte = basis × hoogte : 2.';
  if (Math.random() < 0.4) return num('Wat is de oppervlakte van deze driehoek?', b * h / 2, hint, { unit: u + '²', vis: mt_poly([[0, 0], [0, h], [b, h]], [`${h} ${u}`, `${b} ${u}`, '']) });
  const p = R(1, b - 1);
  return num('Wat is de oppervlakte van deze driehoek? De stippellijn is de hoogte.', b * h / 2, hint,
    { unit: u + '²', vis: mt_poly([[p, 0], [b, h], [0, h]], ['', `${b} ${u}`, ''], { dash: [[p, 0, p, h, `${h} ${u}`]] }) });
}
function mt_oppSam() {
  const u = pick(['cm', 'm']), hide = Math.random() < 0.3, f = mt_samen(u, hide);
  return num('Wat is de oppervlakte van deze figuur?' + f.note, f.opp, 'Verdeel de figuur in rechthoeken. Reken van elke rechthoek de oppervlakte uit en tel ze op. Of: reken de grote rechthoek uit en haal het stuk eruit eraf.', { unit: u + '²', vis: f.fig });
}
function mt_oppSamDrie() {
  const u = pick(['cm', 'm']), hint = 'Verdeel de figuur in een rechthoek en een driehoek. Driehoek = basis × hoogte : 2. Tel de stukken op.';
  if (Math.random() < 0.5) {
    let W, H, t;
    for (let k = 0; k < 50; k++) { W = R(4, 14); H = R(3, 10); t = R(2, 7); if (W * Math.min(200 / W, 140 / (H + t)) >= 144) break; }
    return num('Wat is de oppervlakte van dit huisje?', W * H + W * t / 2, hint,
      { unit: u + '²', vis: mt_poly([[0, t], [W / 2, 0], [W, t], [W, t + H], [0, t + H]], ['', '', `${H} ${u}`, `${W} ${u}`, ''], { dash: [[W / 2, 0, W / 2, t, `${t} ${u}`], [0, t, W, t, '']] }) });
  }
  const A = R(3, 12), T = R(2, 8), H = R(3, 10);
  return num('Wat is de oppervlakte van deze figuur?', A * H + T * H / 2, hint,
    { unit: u + '²', vis: mt_poly([[0, 0], [A, 0], [A + T, H], [0, H]], [`${A} ${u}`, '', `${A + T} ${u}`, `${H} ${u}`], { dash: [[A, 0, A, H, '']] }) });
}
function mt_areQ() {
  if (Math.random() < 0.6) return mt_conv(MT_U.are);
  const L = R(2, 40) * 10, B = R(2, 30) * 10, m2 = L * B;
  if (Math.random() < 0.5) return num(`Een weiland is <b>${L} m</b> lang en <b>${B} m</b> breed. Hoeveel <b>are</b> is dat?`, m2 / 100, 'Reken eerst de oppervlakte uit in m². 1 are = 100 m² (een vierkant van 10 m bij 10 m).', { unit: 'a' });
  return num(`Een akker is <b>${L} m</b> lang en <b>${B} m</b> breed. Hoeveel <b>hectare</b> is dat?`, m2 / 10000, 'Reken eerst de oppervlakte uit in m². 1 hectare = 10.000 m² (een vierkant van 100 m bij 100 m).', { unit: 'ha' });
}
function mt_gewBegrip() {
  return mt_schat(MT_SG, ['g', 'kg'], () => mt_vergelijk(MT_U.gew2, () => R(2, 40) * 100, 'Wat is het zwaarst?', 'Maak alles eerst dezelfde maat, bijvoorbeeld gram. 1 kg = 1000 g.'));
}
/* balk tekenen (schuine projectie) */
function mt_balk(L, B, H, ll, lb, lh) {
  const mx = Math.max(L, B, H); L = Math.max(L, mx * 0.3); B = Math.max(B, mx * 0.3); H = Math.max(H, mx * 0.3);
  const k = Math.min(170 / (L + B * 0.55), 120 / (H + B * 0.4));
  const l = round(L * k, 1), dx = round(B * k * 0.55, 1), dy = round(B * k * 0.4, 1), h = round(H * k, 1), x0 = 70, y0 = round(20 + dy + h, 1);
  const pt = a => a.map(p => p.join(',')).join(' ');
  let s = `<svg class="mt-svg" viewBox="0 0 ${round(x0 + l + dx + 75, 1)} ${round(y0 + 28, 1)}" role="img" aria-label="balk">`;
  s += `<polygon points="${pt([[x0, y0 - h], [x0 + l, y0 - h], [x0 + l + dx, y0 - h - dy], [x0 + dx, y0 - h - dy]])}" class="mt-bt"/>`;
  s += `<polygon points="${pt([[x0 + l, y0], [x0 + l + dx, y0 - dy], [x0 + l + dx, y0 - h - dy], [x0 + l, y0 - h]])}" class="mt-br"/>`;
  s += `<rect x="${x0}" y="${round(y0 - h, 1)}" width="${l}" height="${h}" class="mt-bf"/>`;
  s += `<text x="${round(x0 + l / 2, 1)}" y="${round(y0 + 18, 1)}" text-anchor="middle" class="mt-lbl">${ll}</text>`;
  s += `<text x="${x0 - 7}" y="${round(y0 - h / 2 + 4, 1)}" text-anchor="end" class="mt-lbl">${lh}</text>`;
  s += `<text x="${round(x0 + l + dx / 2 + 8, 1)}" y="${round(y0 - dy / 2 + 8, 1)}" text-anchor="start" class="mt-lbl">${lb}</text>`;
  return s + '</svg>';
}
function mt_inhGelijk() {
  const u = pick(['cm', 'dm', 'm']), mx = u === 'cm' ? 30 : u === 'dm' ? 15 : 10;
  const l = R(2, mx), b = R(1, mx), h = R(1, mx);
  return num(`Hoeveel <b>${u}³</b> is de inhoud van deze balk?`, l * b * h, 'Inhoud = lengte × breedte × hoogte. Reken eerst lengte × breedte (de bodem) uit, en dan keer de hoogte.',
    { unit: u + '³', vis: mt_balk(l, b, h, `${l} ${u}`, `${b} ${u}`, `${h} ${u}`) });
}
function mt_toon(cm) {
  const o = [[cm, 'cm']];
  if (cm % 10 === 0) o.push([cm / 10, 'dm']);
  if (cm % 100 === 0) o.push([cm / 100, 'm'], [cm / 100, 'm']);
  const [v, u] = pick(o); return `${v} ${u}`;
}
function mt_inhVersch() {
  for (let k = 0; k < 100; k++) {
    const d = [0, 1, 2].map(() => pick([R(1, 9) * 10, R(1, 3) * 100, R(2, 30) * 10, R(1, 9) * 10]));
    const lab = d.map(mt_toon), units = new Set(lab.map(x => x.split(' ')[1]));
    if (units.size < 2) continue;
    const p = d[0] * d[1] * d[2], opts = [['cm³', p], ['dm³', p / 1000]];
    if (mt_ok3(p / 1e6) && p / 1e6 >= 0.01) opts.push(['m³', p / 1e6], ['m³', p / 1e6]);
    const [au, ans] = Math.random() < 0.15 ? opts[0] : pick(opts.slice(1));
    return num(`Hoeveel <b>${au}</b> is de inhoud van deze balk?`, round(ans, 6), `Maak eerst alle maten hetzelfde (de maat van het antwoord zonder het driedje). 1 m = 10 dm = 100 cm. Daarna lengte × breedte × hoogte.`,
      { unit: au, vis: mt_balk(d[0], d[1], d[2], lab[0], lab[1], lab[2]) });
  }
  return num('Hoeveel <b>dm³</b> is de inhoud van deze balk?', 40, 'Maak eerst alle maten dm.', { unit: 'dm³', vis: mt_balk(100, 20, 20, '1 m', '20 cm', '2 dm') });
}
function mt_inhLiter() {
  const t = R(0, 2), wat = pick(['dit aquarium', 'deze bak', 'deze doos', 'dit vat']);
  const hint = '1 dm³ = 1 liter. Reken eerst de inhoud uit (lengte × breedte × hoogte) en reken dan om naar dm³.';
  if (t === 0) {
    const d = shuffle([R(1, 8) * 10, R(1, 8) * 10, R(2, 12) * 5]);
    return num(`Hoeveel liter past er in ${wat}?`, round(d[0] * d[1] * d[2] / 1000, 6), hint + ' 1000 cm³ = 1 dm³.', { unit: 'liter', vis: mt_balk(d[0], d[1], d[2], `${d[0]} cm`, `${d[1]} cm`, `${d[2]} cm`) });
  }
  if (t === 1) {
    const d = [R(2, 12), R(1, 8), R(1, 8)];
    return num(`Hoeveel liter past er in ${wat}?`, d[0] * d[1] * d[2], hint, { unit: 'liter', vis: mt_balk(d[0], d[1], d[2], `${d[0]} dm`, `${d[1]} dm`, `${d[2]} dm`) });
  }
  const d = [R(4, 25), R(2, 10), R(1, 2)];
  return num('Hoeveel liter water past er in dit zwembad?', d[0] * d[1] * d[2] * 1000, hint + ' 1 m³ = 1000 dm³.', { unit: 'liter', vis: mt_balk(d[0], d[1], d[2], `${d[0]} m`, `${d[1]} m`, `${d[2]} m`) });
}

defCat({
  id: 'metriek', domain: 'meten', title: 'Metriek stelsel', emoji: '📏', groups: [4, 5, 6, 7, 8],
  uitleg: `<p>Bij het <b>metriek stelsel</b> hoort een trapje. Elke stap omlaag is <b>× 10</b>, elke stap omhoog <b>: 10</b>.</p>
    <div class="voorbeeld">km – hm – dam – <b>m</b> – dm – cm – mm · 3,5 m = 35 dm = 350 cm · 2 km = 2000 m</div>
    <p>Bij <b>vierkante</b> maten (m²) is elke stap <b>× 100</b>, bij <b>kubieke</b> maten (m³) <b>× 1000</b>.</p>
    <div class="voorbeeld">1 m² = 100 dm² = 10.000 cm² · 1 m³ = 1000 dm³ · <b>1 dm³ = 1 liter</b> · 1 cm³ = 1 ml</div>
    <div class="voorbeeld">1 are = 100 m² · 1 hectare = 100 are = 10.000 m² · 1 km² = 100 ha</div>
    <p><b>Omtrek</b> = alle zijden bij elkaar. <b>Oppervlakte</b> rechthoek = lengte × breedte, driehoek = basis × hoogte : 2. <b>Inhoud</b> balk = lengte × breedte × hoogte.</p>
    <div class="voorbeeld">rechthoek 6 cm bij 4 cm → omtrek 6 + 4 + 6 + 4 = <b>20 cm</b> · oppervlakte 6 × 4 = <b>24 cm²</b></div>
    <p>Gewicht: 1 kg = 1000 g, 1 g = 1000 mg. Inhoud: 1 l = 10 dl = 100 cl = 1000 ml.</p>`,
  subs: [
    { id: 'lengte', title: 'Lengte', groups: [4, 5, 6, 7, 8], ex: [
      { id: 'begrip', name: 'Begrip mm, cm, dm, m', example: 'Een potlood is ongeveer 15 cm', gen: () => mt_schat(MT_SL, ['mm', 'cm', 'dm', 'm'], () => mt_vergelijk(MT_U.len1, () => R(5, 40) * 10, 'Wat is het langst?', 'Maak alles eerst dezelfde maat, bijvoorbeeld centimeters.')) },
      { id: 'omr1', name: 'Omrekenen mm, cm, dm, m', example: '3,5 m = ? cm', gen: () => mt_conv(MT_U.len1) },
      { id: 'omr2', name: 'Omrekenen m, dam, hm, km', example: '2,4 km = ? m', gen: () => mt_conv(MT_U.len2) }
    ]},
    { id: 'omtrek', title: 'Omtrek', groups: [6, 7, 8], ex: [
      { id: 'rechthoek', name: 'Omtrek van rechthoeken', example: '8 cm bij 5 cm → 26 cm', gen: mt_omtrekRect },
      { id: 'samen', name: 'Omtrek van samengestelde figuren', example: 'L-vorm', gen: mt_omtrekSam }
    ]},
    { id: 'opp', title: 'Oppervlakte', groups: [7, 8], ex: [
      { id: 'rechthoek', name: 'Oppervlakte van rechthoeken', example: '8 cm × 5 cm = 40 cm²', gen: mt_oppRect },
      { id: 'mix', name: 'Oppervlakte van rechthoeken met verschillende maateenheden', example: '3 m bij 40 cm = ? m²', gen: mt_oppMix },
      { id: 'driehoek', name: 'Oppervlakte van driehoeken', example: 'basis × hoogte : 2', gen: mt_oppDrie },
      { id: 'samen', name: 'Oppervlakte van samengestelde figuren', example: 'L-vorm', gen: mt_oppSam },
      { id: 'samendrie', name: 'Oppervlakte van samengestelde figuren met driehoeken', example: 'huisje', gen: mt_oppSamDrie },
      { id: 'omr1', name: 'Oppervlaktes mm², cm², dm², m² omrekenen', example: '3 m² = ? dm²', gen: () => mt_conv(MT_U.opp1) },
      { id: 'omr2', name: 'Oppervlaktes m², dam², hm², km² omrekenen', example: '2 hm² = ? m²', gen: () => mt_conv(MT_U.opp2) },
      { id: 'are', name: 'Rekenen met vierkante kilometers, are en hectare', example: '3 ha = ? a', gen: mt_areQ }
    ]},
    { id: 'gewicht', title: 'Gewicht', groups: [5, 6, 7, 8], ex: [
      { id: 'begrip', name: 'Begrip gram/kilogram', example: 'Een appel weegt 150 g', gen: mt_gewBegrip },
      { id: 'omr1', name: 'Omrekenen gram en kilogram', example: '2,5 kg = ? g', gen: () => mt_conv(MT_U.gew2) },
      { id: 'omr2', name: 'Omrekenen milligram, gram en kilogram', example: '500 mg = ? g', gen: () => mt_conv(MT_U.gew3) }
    ]},
    { id: 'inhoud', title: 'Inhoudsmaten', groups: [6, 7, 8], ex: [
      { id: 'begrip', name: 'Begrip ml, cl, dl en l', example: 'Een blikje: 33 cl', gen: () => mt_schat(MT_SI, ['ml', 'cl', 'dl', 'l'], () => mt_vergelijk(MT_U.inh, () => R(1, 30) * 50, 'Waar zit het meeste in?', 'Maak alles eerst dezelfde maat, bijvoorbeeld milliliter. 1 l = 1000 ml.')) },
      { id: 'omr1', name: 'Omrekenen ml, cl, dl en l', example: '1,5 l = ? dl', gen: () => mt_conv(MT_U.inh) },
      { id: 'kub', name: 'Omrekenen mm³, cm³, dm³, m³', example: '2 m³ = ? dm³', gen: () => mt_conv(MT_U.kub) },
      { id: 'kubl', name: 'Omrekenen mm³, cm³, dm³, m³, liters', example: '3 dm³ = ? l', gen: () => mt_conv(MT_U.kubl, { must: 'l' }) },
      { id: 'alles', name: 'Omrekenen mm³, cm³, dm³, m³, ml, cl, dl, l', example: '250 cm³ = ? cl', gen: () => (Math.random() < 0.75 ? mt_conv(MT_U.kuball, { mix: [['mm³', 'cm³', 'dm³', 'm³'], ['ml', 'cl', 'dl', 'l']] }) : mt_conv(MT_U.kuball)) }
    ]},
    { id: 'inhbereken', title: 'Inhoud berekenen', groups: [7, 8], ex: [
      { id: 'gelijk', name: 'Inhoud berekenen met gelijke maateenheden', example: '5 cm × 4 cm × 3 cm = 60 cm³', gen: mt_inhGelijk },
      { id: 'versch', name: 'Inhoud berekenen met verschillende maateenheden', example: '1 m × 20 cm × 3 dm = ? dm³', gen: mt_inhVersch },
      { id: 'liter', name: 'Inhoud berekenen in liters', example: '50 × 30 × 40 cm = 60 liter', gen: mt_inhLiter }
    ]}
  ]
});

/* ===================== GELD ===================== */
const MT_GELD = [
  { id: 'tot1', title: 'Tot 1 euro', groups: [3, 4], max: 100, unit: 5, tel: [5, 10, 20, 50], pay: [5, 10, 20, 50] },
  { id: 'tot5', title: 'Tot 5 euro', groups: [3, 4], max: 500, unit: 5, tel: [5, 10, 20, 50, 100, 200], pay: [5, 10, 20, 50, 100, 200] },
  { id: 'tot10', title: 'Tot 10 euro', groups: [3, 4, 5], max: 1000, unit: 10, tel: [10, 20, 50, 100, 200, 500], pay: [10, 20, 50, 100, 200, 500] },
  { id: 'tot20', title: 'Tot 20 euro', groups: [4, 5, 6], max: 2000, unit: 10, tel: [10, 20, 50, 100, 200, 500, 1000], pay: [10, 20, 50, 100, 200, 500, 1000] },
  { id: 'tot50', title: 'Tot 50 euro', groups: [4, 5, 6], max: 5000, unit: 10, tel: [50, 100, 200, 500, 1000, 2000], pay: [10, 20, 50, 100, 200, 500, 1000, 2000] },
  { id: 'tot100', title: 'Tot 100 euro', groups: [5, 6], max: 10000, unit: 50, tel: [50, 100, 200, 500, 1000, 2000, 5000], pay: [50, 100, 200, 500, 1000, 2000, 5000] },
  { id: 'tot500', title: 'Tot 500 euro', groups: [5, 6], max: 50000, unit: 100, tel: [100, 200, 500, 1000, 2000, 5000, 10000, 20000], pay: [100, 200, 500, 1000, 2000, 5000, 10000, 20000] }
];
const MT_DING = [
  ['🍬 een snoepje', '🍎 een appel', '⭐ een sticker', '🍭 een lolly', '✏️ een potlood'],
  ['🍦 een ijsje', '🧃 een pakje drinken', '🖍️ een doos krijtjes', '🥐 een croissant', '🎈 een zak ballonnen'],
  ['📕 een boek', '⚽ een bal', '🧩 een puzzel', '🧸 een knuffel', '🎨 een pot verf'],
  ['🎮 een spelletje', '👟 een paar gympen', '🎒 een rugzak', '🛹 een skateboard', '🎧 een koptelefoon'],
  ['🚲 een fiets', '📱 een tablet', '⛺ een tent', '🎸 een gitaar', '🛴 een step']
];
function mt_geldTel(L) {
  let list = null;
  for (let k = 0; k < 60 && !list; k++) {
    const n = R(2, L.max <= 100 ? 6 : 7), l = []; let sum = 0;
    for (let i = 0; i < n; i++) { const ok = L.tel.filter(c => sum + c <= L.max); if (!ok.length) break; const c = pick(ok); l.push(c); sum += c; }
    if (l.length >= 2 && sum >= L.max / 5) list = l;
  }
  list = (list || [L.tel[2], L.tel[1], L.tel[0]]).sort((a, b) => b - a);
  const sum = list.reduce((a, b) => a + b, 0);
  return num(`Hoeveel geld is dit?${L.max <= 500 ? ' <small>(in euro, bijvoorbeeld 0,75)</small>' : ''}`, round(sum / 100, 2),
    'Tel eerst de briefjes en de grote munten, daarna de kleine munten. 100 cent is 1 euro.', { vis: moneyHTML(list), unit: '€', pre: true, a: euro(sum / 100) });
}
function mt_geldPay(L) {
  const lo = Math.max(1, Math.ceil(L.max / 10 / L.unit)), a = L.unit * R(lo, L.max / L.unit);
  const tier = Math.min(4, Math.floor(Math.log10(a / 100 + 1) * 2.2));
  return pay(`${pick(MT_DING[tier])} kost <b>${euro(a / 100)}</b>. Betaal precies.`, a,
    'Begin met de grootste munt of het grootste briefje dat nog past. Tel steeds bij wat je al hebt.', { money: L.pay });
}
defCat({
  id: 'geld', domain: 'meten', title: 'Geld', emoji: '💶', groups: [3, 4, 5, 6],
  uitleg: `<p>Een euro is <b>100 cent</b>. Er zijn munten van 5, 10, 20 en 50 cent, en van € 1 en € 2. Briefjes zijn er van € 5, € 10, € 20, € 50, € 100 en € 200.</p>
    <p>Geld tellen: begin bij het <b>grootste</b> bedrag en tel steeds verder.</p>
    <div class="voorbeeld">${moneyHTML([200, 50, 20, 5])} → 2 euro, 2,50, 2,70, 2,75 → <b>€ 2,75</b></div>
    <p>Precies betalen: pak eerst het grootste briefje of de grootste munt die nog past.</p>
    <div class="voorbeeld">€ 7,30 → € 5 + € 2 + 20 cent + 10 cent</div>`,
  subs: MT_GELD.map(L => ({
    id: L.id, title: L.title, groups: L.groups, ex: [
      { id: 'tellen', name: 'Geld tellen', example: 'Hoeveel geld is dit?', gen: () => mt_geldTel(L) },
      { id: 'betalen', name: 'Geld betalen', example: 'Betaal precies', gen: () => mt_geldPay(L) }
    ]
  }))
});

/* ===================== MEETKUNDE: BLOKKENBOUWSELS ===================== */
/* h[r][c]: r = 0 achterste rij … laatste rij = voorkant; c = 0 links. Hoogtes worden nooit hoger naar voren of naar rechts,
   zodat elke stapel van bovenaf zichtbaar blijft. */
function mt_bouw(big) {
  const sizes = big ? [[3, 3], [3, 4], [4, 3], [4, 4], [3, 3]] : [[2, 2], [2, 3], [3, 2], [3, 3], [2, 3]];
  const maxH = big ? 4 : 3, lo = big ? 11 : 3, hi = big ? 25 : 10;
  for (let k = 0; k < 300; k++) {
    const [RR, C] = pick(sizes), h = [];
    let tot = 0;
    for (let r = 0; r < RR; r++) {
      h.push([]);
      for (let c = 0; c < C; c++) {
        const cap = Math.min(r ? h[r - 1][c] : maxH, c ? h[r][c - 1] : maxH);
        const v = r === 0 && c === 0 ? R(2, maxH) : Math.random() < 0.5 ? R(Math.max(0, cap - 1), cap) : R(0, cap);
        h[r].push(v); tot += v;
      }
    }
    if (tot >= lo && tot <= hi && h[RR - 1][0] > 0 && h[0][C - 1] > 0) return h;
  }
  return big ? [[4, 3, 2], [3, 2, 1], [2, 1, 1]] : [[2, 1], [1, 1]];
}
const mt_som = h => h.flat().reduce((a, b) => a + b, 0);
function mt_blokken(h, labels) {
  const RR = h.length, C = h[0].length, s = 26, dx = 12, dy = 12, maxH = Math.max(...h.flat());
  const x0 = 24, y0 = 18 + maxH * s + RR * dy;
  const W = x0 + C * s + RR * dx + (labels ? 54 : 18), Hh = y0 + (labels ? 22 : 8);
  const pt = a => a.map(([x, y]) => `${round(x, 1)},${round(y, 1)}`).join(' ');
  let g = '';
  for (let r = 0; r < RR; r++) for (let c = 0; c < C; c++) { // vloer
    const d = RR - 1 - r, X = x0 + c * s + d * dx, Y = y0 - d * dy;
    g += `<polygon points="${pt([[X, Y], [X + s, Y], [X + s + dx, Y - dy], [X + dx, Y - dy]])}" class="mt-floor"/>`;
  }
  for (let r = 0; r < RR; r++) for (let c = 0; c < C; c++) for (let z = 0; z < h[r][c]; z++) {
    const d = RR - 1 - r, X = x0 + c * s + d * dx, Y = y0 - d * dy - z * s;
    g += `<polygon points="${pt([[X, Y - s], [X + s, Y - s], [X + s + dx, Y - s - dy], [X + dx, Y - s - dy]])}" class="mt-ct"/>`;
    g += `<polygon points="${pt([[X + s, Y], [X + s + dx, Y - dy], [X + s + dx, Y - s - dy], [X + s, Y - s]])}" class="mt-cr"/>`;
    g += `<rect x="${X}" y="${Y - s}" width="${s}" height="${s}" class="mt-cf"/>`;
  }
  if (labels) {
    g += `<text x="${x0 + C * s / 2}" y="${y0 + 17}" text-anchor="middle" class="mt-lbl">voor</text>`;
    g += `<text x="${x0 + C * s + RR * dx / 2 + 8}" y="${round(y0 - RR * dy / 2 + 2, 1)}" text-anchor="start" class="mt-lbl">rechts</text>`;
  }
  return `<svg class="mt-svg mt-blok" viewBox="0 0 ${W} ${Hh}" role="img" aria-label="blokkenbouwsel">${g}</svg>`;
}
function mt_plat(h) {
  const RR = h.length, C = h[0].length, s = 22;
  let g = '';
  h.forEach((row, r) => row.forEach((v, c) => {
    g += `<rect x="${2 + c * s}" y="${2 + r * s}" width="${s}" height="${s}" class="${v ? 'mt-pc' : 'mt-pe'}"/>`;
    if (v) g += `<text x="${2 + c * s + s / 2}" y="${2 + r * s + s / 2 + 5}" text-anchor="middle" class="mt-pn">${v}</text>`;
  }));
  g += `<text x="${2 + C * s / 2}" y="${RR * s + 16}" text-anchor="middle" class="mt-pv">voor</text>`;
  return `<svg class="mt-plat" viewBox="0 0 ${C * s + 4} ${RR * s + 20}" role="img" aria-label="plattegrond">${g}</svg>`;
}
function mt_view(cols) {
  const s = 18, H = 4;
  let g = '';
  cols.forEach((v, i) => { for (let z = 0; z < v; z++) g += `<rect x="${2 + i * s}" y="${2 + (H - 1 - z) * s}" width="${s}" height="${s}" class="mt-vc"/>`; });
  g += `<line x1="0" y1="${2 + H * s}" x2="${cols.length * s + 4}" y2="${2 + H * s}" class="mt-vg"/>`;
  return `<svg class="mt-view" viewBox="0 0 ${cols.length * s + 4} ${H * s + 4}" role="img" aria-label="aanzicht">${g}</svg>`;
}
function mt_blokTel(big) {
  const h = mt_bouw(big);
  return num('Hoeveel blokken zijn er gebruikt voor dit bouwsel?', mt_som(h), 'Tel per stapel hoeveel blokken er op elkaar staan. Vergeet de blokken niet die achter of onder andere blokken verstopt zitten.', { vis: mt_blokken(h, false) });
}
function mt_blokPlat(big) {
  const h = mt_bouw(big), RR = h.length, C = h[0].length, w = [];
  w.push(h.map(r => r.slice().reverse()), h.slice().reverse());
  if (RR === C) w.push(h.map((r, i) => r.map((_, j) => h[j][i])));
  for (let k = 0; k < 6; k++) {
    const c = h.map(r => r.slice()), i = R(0, RR - 1), j = R(0, C - 1);
    c[i][j] = c[i][j] === 0 ? 1 : c[i][j] + pick([1, -1]);
    w.push(c);
  }
  return choice('Welke plattegrond hoort bij dit bouwsel? Het getal zegt hoeveel blokken er op dat vakje staan.', mt_plat(h), shuffle(w).map(mt_plat),
    'Kijk eerst naar de voorste rij en de linker rij. Klopt de hoogte van elke stapel? Klopt de plek van de lege vakjes?', { vis: mt_blokken(h, true) });
}
function mt_blokAanzicht(big) {
  const h = mt_bouw(big), RR = h.length, C = h[0].length;
  const front = [...Array(C).keys()].map(c => Math.max(...h.map(r => r[c])));
  const right = [...Array(RR).keys()].map(r => Math.max(...h[RR - 1 - r]));
  const voor = Math.random() < 0.5, ans = voor ? front : right, other = voor ? right : front;
  const w = [other, ans.slice().reverse(), other.slice().reverse(), voor ? h[RR - 1].slice() : h.map(r => r[C - 1]).reverse()];
  for (let k = 0; k < 4; k++) { const c = ans.slice(), i = R(0, c.length - 1); c[i] = c[i] >= 4 ? 3 : c[i] <= 1 ? c[i] + 1 : c[i] + pick([1, -1]); w.push(c); }
  return choice(voor ? 'Je kijkt recht van <b>voren</b> naar het bouwsel. Wat zie je?' : 'Je kijkt recht van <b>rechts</b> naar het bouwsel. Wat zie je?',
    mt_view(ans), w.map(mt_view),
    voor ? 'Van voren zie je per kolom (van links naar rechts) alleen de hoogste stapel. Lagere stapels erachter zie je niet.'
      : 'Van rechts zie je de voorkant links en de achterkant rechts. Per rij zie je alleen de hoogste stapel.', { vis: mt_blokken(h, true) });
}
defCat({
  id: 'meetkunde', domain: 'meten', title: 'Meetkunde', emoji: '🧊', groups: [3, 4, 5],
  uitleg: `<p>Een <b>blokkenbouwsel</b> bestaat uit stapels blokken. Blokken zweven nooit: onder elk blok staat een ander blok of de vloer.</p>
    <p>Op een <b>plattegrond</b> kijk je van bovenaf. Het getal in een vakje zegt hoeveel blokken er op elkaar staan.</p>
    <div class="voorbeeld">${mt_plat([[3, 2], [1, 0]])} → 3 + 2 + 1 = <b>6 blokken</b></div>
    <p>Bij een <b>aanzicht</b> kijk je recht van voren of van opzij. Je ziet dan per kolom alleen de hoogste stapel.</p>
    <div class="voorbeeld">vooraanzicht van dit bouwsel: ${mt_view([3, 2])}</div>`,
  subs: [
    { id: 'tot10', title: 'Blokkenbouwsels tot 10', ex: [
      { id: 'tellen', name: 'Blokken tellen', example: 'Hoeveel blokken?', gen: () => mt_blokTel(false) },
      { id: 'plat', name: 'Plattegrond kiezen bij bouwsel', example: 'Welke plattegrond?', gen: () => mt_blokPlat(false) },
      { id: 'aanzicht', name: 'Aanzicht bepalen', example: 'Wat zie je van voren?', gen: () => mt_blokAanzicht(false) }
    ]},
    { id: 'tot25', title: 'Blokkenbouwsels tot 25', ex: [
      { id: 'tellen', name: 'Blokken tellen', example: 'Hoeveel blokken?', gen: () => mt_blokTel(true) },
      { id: 'plat', name: 'Plattegrond kiezen bij bouwsel', example: 'Welke plattegrond?', gen: () => mt_blokPlat(true) },
      { id: 'aanzicht', name: 'Aanzicht bepalen', example: 'Wat zie je van voren?', gen: () => mt_blokAanzicht(true) }
    ]}
  ]
});
