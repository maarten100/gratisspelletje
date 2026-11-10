/* Domein Verbanden: diagrammen en tabellen.
   Alle globale namen beginnen met vb_. */
import { choice, defCat, euro, multi, NAMEN, nl, num, pick, R, round, shuffle, tableHTML } from '../kern.js';

/* ===================== hulpfuncties ===================== */
const vb_pickN = (arr, n) => shuffle(arr).slice(0, n);
const vb_sum = a => a.reduce((s, x) => s + x, 0);
/* n waarden, veelvoud van gran, tussen lo en hi; uniek hoogste en laagste */
function vb_vals(n, gran, lo, hi, mono) {
  const a = Math.ceil(lo / gran), b = Math.floor(hi / gran);
  for (let t = 0; t < 60; t++) {
    let v = [];
    if (mono === 'walk') {
      let c = R(a, b);
      for (let i = 0; i < n; i++) { v.push(c * gran); c = Math.min(b, Math.max(a, c + R(-3, 3))); }
    } else for (let i = 0; i < n; i++) v.push(R(a, b) * gran);
    if (mono === true) v.sort((x, y) => x - y);
    const mx = Math.max(...v), mn = Math.min(...v);
    if (v.filter(x => x === mx).length === 1 && v.filter(x => x === mn).length === 1 && new Set(v).size >= Math.min(n, b - a + 1) - 1) return v;
  }
  return [...Array(n).keys()].map(i => (a + i % (b - a + 1)) * gran);
}
const vb_esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
/* ===================== assen-diagram (staaf / lijn) ===================== */
const VB_W = 340, VB_L = 48, VB_R = 10, VB_T = 30, VB_B = 30;
function vb_frame(o) {
  const H = o.h || 236, pw = VB_W - VB_L - VB_R, ph = H - VB_T - VB_B, n = o.labels.length;
  const y = v => VB_T + ph - (v / o.max) * ph;
  const band = pw / n, x = i => VB_L + band * (i + 0.5);
  let s = `<svg class="vb-chart" viewBox="0 0 ${VB_W} ${H}" role="img" aria-label="${vb_esc(o.title || 'diagram')}">`;
  s += `<text x="4" y="14" class="vb-unit">${vb_esc(o.ylab || '')}</text>`;
  for (let v = 0; v <= o.max + 1e-9; v += o.step) {
    const yy = round(y(v), 2);
    s += `<line x1="${VB_L}" y1="${yy}" x2="${VB_W - VB_R}" y2="${yy}" class="vb-grid"/>`;
    s += `<text x="${VB_L - 6}" y="${yy + 4}" class="vb-yl">${nl(round(v, 3), true)}</text>`;
  }
  o.labels.forEach((l, i) => { s += `<text x="${round(x(i), 2)}" y="${H - VB_B + 17}" class="vb-xl">${vb_esc(l)}</text>`; });
  if (o.legend) {
    let lx = VB_W - VB_R;
    o.legend.slice().reverse().forEach((name, k) => {
      const idx = o.legend.length - 1 - k;
      lx -= name.length * 7 + 26;
      s += `<rect x="${lx}" y="5" width="12" height="12" rx="2" class="vb-s${idx}"/><text x="${lx + 16}" y="15" class="vb-leg">${vb_esc(name)}</text>`;
    });
  }
  return { s, x, y, band, H, end: `<line x1="${VB_L}" y1="${VB_T}" x2="${VB_L}" y2="${VB_T + ph}" class="vb-axis"/><line x1="${VB_L}" y1="${VB_T + ph}" x2="${VB_W - VB_R}" y2="${VB_T + ph}" class="vb-axis"/></svg>` };
}
/* series = [[...waarden], ...] */
function vb_barSVG(o) {
  const f = vb_frame(o);
  let s = f.s;
  const k = o.series.length, bw = f.band * (k === 1 ? 0.58 : 0.36);
  o.series.forEach((vals, si) => vals.forEach((v, i) => {
    const x0 = f.x(i) - (k * bw) / 2 + si * bw, y0 = f.y(v);
    s += `<rect x="${round(x0 + 1, 2)}" y="${round(y0, 2)}" width="${round(bw - 2, 2)}" height="${round(f.y(0) - y0, 2)}" class="vb-bar vb-s${si}"/>`;
  }));
  return `<div class="vb-wrap">${s + f.end}</div>`;
}
function vb_lineSVG(o) {
  const f = vb_frame(o);
  let s = f.s;
  o.series.forEach((vals, si) => {
    s += `<polyline points="${vals.map((v, i) => `${round(f.x(i), 2)},${round(f.y(v), 2)}`).join(' ')}" class="vb-line vb-ls${si}"/>`;
    vals.forEach((v, i) => {
      const cx = round(f.x(i), 2), cy = round(f.y(v), 2);
      s += si === 0 ? `<circle cx="${cx}" cy="${cy}" r="4" class="vb-pt vb-s0"/>` : `<rect x="${cx - 4}" y="${cy - 4}" width="8" height="8" class="vb-pt vb-s1"/>`;
    });
  });
  return `<div class="vb-wrap">${s + f.end}</div>`;
}
/* cirkeldiagram: slices = [{label, p (procent), show}] */
function vb_pieSVG(slices, showPct) {
  const cx = 92, cy = 100, r = 84;
  let s = `<svg class="vb-chart vb-pie" viewBox="0 0 ${VB_W} 200" role="img" aria-label="cirkeldiagram">`;
  let a = -Math.PI / 2;
  slices.forEach((sl, i) => {
    const b = a + sl.p / 100 * 2 * Math.PI, big = sl.p > 50 ? 1 : 0;
    s += `<path d="M${cx} ${cy} L${round(cx + r * Math.cos(a), 2)} ${round(cy + r * Math.sin(a), 2)} A${r} ${r} 0 ${big} 1 ${round(cx + r * Math.cos(b), 2)} ${round(cy + r * Math.sin(b), 2)} Z" class="vb-slice vb-c${i}"/>`;
    a = b;
  });
  const ly0 = 100 - slices.length * 14;
  slices.forEach((sl, i) => {
    const yy = ly0 + i * 28;
    s += `<rect x="196" y="${yy}" width="16" height="16" rx="3" class="vb-slice vb-c${i}"/>`;
    s += `<text x="218" y="${yy + 13}" class="vb-leg vb-big">${vb_esc(sl.label)}${showPct ? ` ${sl.show === false ? '?' : sl.p}%` : ''}</text>`;
  });
  return `<div class="vb-wrap">${s}</svg></div>`;
}
/* beelddiagram: rows = [[label, halveSymbolen]] */
function vb_beeld(rows, emoji, val, wat) {
  let s = `<div class="vb-wrap"><table class="vb-beeld">`;
  rows.forEach(([l, h]) => {
    let sym = '';
    for (let i = 0; i < Math.floor(h / 2); i++) sym += `<span>${emoji}</span>`;
    if (h % 2) sym += `<span class="vb-half">${emoji}</span>`;
    s += `<tr><th>${vb_esc(l)}</th><td>${sym}</td></tr>`;
  });
  return s + `</table><div class="vb-key"><span>${emoji}</span> = ${nl(val, true)} ${wat}</div></div>`;
}

/* ===================== niveaus ===================== */
const VB_LV = {
  56: { steps: [1, 2, 5, 10], half: false, lines: [4, 6] },
  7: { steps: [2, 5, 10, 20, 50], half: true, lines: [4, 6] },
  8: { steps: [50, 100, 200, 500, 1000], half: true, lines: [4, 6] }
};
const VB_MND = [['jan', 'januari'], ['feb', 'februari'], ['mrt', 'maart'], ['apr', 'april'], ['mei', 'mei'], ['jun', 'juni'], ['jul', 'juli'], ['aug', 'augustus']];
const VB_DAG = [['ma', 'maandag'], ['di', 'dinsdag'], ['wo', 'woensdag'], ['do', 'donderdag'], ['vr', 'vrijdag'], ['za', 'zaterdag'], ['zo', 'zondag']];
/* ---------- lijndiagram ---------- */
const VB_LIJN = [
  { title: 'Temperatuur op een zomerdag', ylab: '°C', unit: '°C', steps: [5], lines: [6, 7], lab: [6, 8, 10, 12, 14, 16, 18, 20].map(h => [`${h}:00`, `om ${h}:00`]), q: l => `Hoe warm was het ${l}?`, duo: ['Utrecht', 'Rome'] },
  { title: 'Lengte van de zonnebloem', ylab: 'cm', unit: 'cm', steps: [1, 2, 5, 10], mono: true, lab: [1, 2, 3, 4, 5, 6, 7, 8].map(w => [`wk ${w}`, `in week ${w}`]), q: l => `Hoe lang was de zonnebloem ${l}?` },
  { title: 'Bezoekers van het zwembad', ylab: 'bezoekers', unit: '', steps: [10, 20, 50, 100, 200, 500], lab: VB_MND.map(m => [m[0], 'in ' + m[1]]), q: l => `Hoeveel bezoekers had het zwembad ${l}?`, duo: ['2024', '2025'] },
  { title: 'Spaargeld van Tess', ylab: 'euro', unit: '€', steps: [5, 10, 20, 50], lab: VB_MND.map(m => [m[0], 'in ' + m[1]]), q: l => `Hoeveel euro had Tess gespaard ${l}?` },
  { title: 'Auto’s op de snelweg', ylab: 'auto’s per uur', unit: '', steps: [100, 200, 500, 1000], lab: [6, 7, 8, 9, 10, 11, 12].map(h => [`${h}:00`, `om ${h}:00`]), q: l => `Hoeveel auto’s per uur reden er ${l}?`, duo: ['maandag', 'zondag'] }
];
function vb_setup(ctxs, lvKey, nMin, nMax) {
  const L = VB_LV[lvKey];
  const ok = ctxs.filter(c => c.steps.some(s => L.steps.includes(s)));
  const ctx = pick(ok);
  const step = pick(ctx.steps.filter(s => L.steps.includes(s)));
  const ln = ctx.lines || L.lines, lines = R(ln[0], ln[1]);
  const gran = L.half ? step / 2 : step;
  const n = R(nMin, Math.min(nMax, ctx.lab.length));
  const start = R(0, ctx.lab.length - n);
  const lab = ctx.lab.slice(start, start + n);
  return { ctx, step, max: step * lines, gran, n, lab };
}
const vb_u = ctx => (ctx.unit === '€' ? { unit: '€', pre: true } : ctx.unit ? { unit: ctx.unit } : {});
function vb_readHint(step, half) {
  return `Elke lijn op de as is ${nl(step, true)} meer. ${half ? `Ligt de waarde tussen twee lijnen in? Dan is het de helft van ${nl(step, true)} erbij.` : 'Volg de lijn naar links naar de getallen.'}`;
}
function vb_lijn(lv) {
  const duo = lv === 8 && Math.random() < 0.5;
  const S = vb_setup(duo ? VB_LIJN.filter(c => c.duo) : VB_LIJN, lv, 5, lv === 56 ? 6 : 7);
  const { ctx, step, max, gran, n, lab } = S;
  const lo = gran, hi = max - (Math.random() < 0.5 ? 0 : gran);
  const v = vb_vals(n, gran, lo, hi, ctx.mono || 'walk');
  const series = [v];
  if (duo) series.push(vb_vals(n, gran, lo, hi, ctx.mono || 'walk'));
  const vis = vb_lineSVG({ labels: lab.map(l => l[0]), series, max, step, ylab: ctx.ylab, title: ctx.title, legend: duo ? ctx.duo : null });
  const head = `<b>${ctx.title}</b><br>`;
  const rh = vb_readHint(step, S.gran !== step);
  const o = Object.assign({ vis }, vb_u(ctx));
  const t = R(0, duo ? 5 : 4);
  if (duo && t >= 4) {
    const w = series[1];
    if (t === 4) {
      const i = R(0, n - 1);
      if (v[i] === w[i]) return vb_lijn(lv);
      return num(`${head}Hoeveel verschil is er ${lab[i][1]} tussen ${ctx.duo[0]} en ${ctx.duo[1]}?`, Math.abs(v[i] - w[i]), rh + ' Lees beide lijnen af en trek ze van elkaar af.', o);
    }
    const d = v.map((x, i) => Math.abs(x - w[i])), mx = Math.max(...d);
    if (d.filter(x => x === mx).length > 1) return vb_lijn(lv);
    const ii = d.indexOf(mx);
    return choice(`${head}Wanneer was het verschil tussen ${ctx.duo[0]} en ${ctx.duo[1]} het grootst?`, lab[ii][1], lab.filter((_, i) => i !== ii).map(l => l[1]),
      'Kijk waar de twee lijnen het verst uit elkaar liggen.', { vis });
  }
  const si = duo ? R(0, 1) : 0, vals = series[si], wie = duo ? ` (${ctx.duo[si]})` : '';
  if (t === 0) {
    const i = R(0, n - 1);
    return num(head + ctx.q(lab[i][1]) + wie, vals[i], rh, o);
  }
  if (t === 1) {
    const i = R(0, n - 2), j = R(i + 1, Math.min(n - 1, i + (lv === 56 ? 2 : 4)));
    if (vals[i] === vals[j]) return num(head + ctx.q(lab[j][1]) + wie, vals[j], rh, o);
    const up = vals[j] > vals[i];
    return num(`${head}Hoeveel ${up ? 'meer' : 'minder'} was het ${lab[j][1]} dan ${lab[i][1]}?${wie}`, Math.abs(vals[j] - vals[i]), rh + ' Lees beide punten af en trek ze van elkaar af.', o);
  }
  if (t === 2) {
    const hoog = Math.random() < 0.6, tgt = hoog ? Math.max(...vals) : Math.min(...vals), ii = vals.indexOf(tgt);
    return choice(`${head}Wanneer was het ${hoog ? 'hoogste' : 'laagste'} punt?${wie}`, lab[ii][1], lab.filter((_, i) => i !== ii).map(l => l[1]),
      `Zoek het punt dat het ${hoog ? 'hoogst' : 'laagst'} ligt.`, { vis });
  }
  if (t === 3 && lv !== 56) {
    const d = vals.slice(1).map((x, i) => x - vals[i]), mx = Math.max(...d);
    if (mx > 0 && d.filter(x => x === mx).length === 1) {
      const ii = d.indexOf(mx);
      const opt = i => `tussen ${lab[i][0]} en ${lab[i + 1][0]}`;
      return choice(`${head}Wanneer steeg de lijn het meest?${wie}`, opt(ii), d.map((_, i) => opt(i)).filter((_, i) => i !== ii),
        'Waar loopt de lijn het steilst omhoog? Reken eventueel elke stijging uit.', { vis });
    }
  }
  /* verschil tussen hoogste en laagste / totaal van drie punten (g8) */
  if (lv === 8 && Math.random() < 0.5) {
    const i = R(0, n - 3);
    return num(`${head}Tel de waarden van ${lab[i][0]}, ${lab[i + 1][0]} en ${lab[i + 2][0]} op. Hoeveel is dat samen?${wie}`, vals[i] + vals[i + 1] + vals[i + 2], rh + ' Lees elk punt af en tel ze op.', o);
  }
  return num(`${head}Hoeveel verschil is er tussen het hoogste en het laagste punt?${wie}`, Math.max(...vals) - Math.min(...vals), rh + ' Zoek het hoogste en het laagste punt en trek ze van elkaar af.', o);
}
/* ---------- staafdiagram ---------- */
const VB_STAAF = [
  { title: 'Lievelingsfruit van groep 5', ylab: 'kinderen', pre: 'bij', dt: ['bij de jongens', 'bij de meisjes'], steps: [1, 2, 5], cats: ['appel', 'banaan', 'peer', 'druif', 'kiwi', 'mango'], q: c => `Hoeveel kinderen kozen ${c}?`, duo: ['jongens', 'meisjes'] },
  { title: 'Gelezen boeken dit jaar', ylab: 'boeken', pre: 'bij', steps: [1, 2, 5, 10], cats: ['Noah', 'Emma', 'Sem', 'Julia', 'Liam', 'Mila', 'Daan'], q: c => `Hoeveel boeken las ${c}?` },
  { title: 'Auto’s op de parkeerplaats', ylab: 'auto’s', pre: 'bij', steps: [2, 5, 10, 20], cats: ['rood', 'blauw', 'grijs', 'zwart', 'wit', 'groen'], q: c => `Hoeveel auto’s zijn ${c}?` },
  { title: 'Verkochte ijsjes', ylab: 'ijsjes', pre: 'op', dt: ['in juni', 'in juli'], steps: [10, 20, 50, 100], cats: VB_DAG, q: c => `Hoeveel ijsjes werden er op ${c} verkocht?`, duo: ['juni', 'juli'] },
  { title: 'Bezoekers van de kermis', ylab: 'bezoekers', pre: 'op', dt: ['in 2024', 'in 2025'], steps: [100, 200, 500, 1000], cats: VB_DAG, q: c => `Hoeveel bezoekers kwamen er op ${c}?`, duo: ['2024', '2025'] },
  { title: 'Flessen ingezameld per groep', ylab: 'flessen', pre: 'bij', steps: [50, 100, 200], cats: ['gr 3', 'gr 4', 'gr 5', 'gr 6', 'gr 7', 'gr 8'].map(g => [g, 'groep ' + g.slice(3)]), q: c => `Hoeveel flessen zamelde ${c} in?` }
];
function vb_staaf(lv) {
  const duo = lv === 8 && Math.random() < 0.5;
  const ctxs = (duo ? VB_STAAF.filter(c => c.duo) : VB_STAAF).map(c => Object.assign({}, c, { lab: c.cats.map(x => (Array.isArray(x) ? x : [x, x])) }));
  const S = vb_setup(ctxs, lv, 4, duo ? 5 : 6);
  const { ctx, step, max, gran, n, lab } = S;
  const v = vb_vals(n, gran, gran, max, false);
  const series = [v];
  if (duo) series.push(vb_vals(n, gran, gran, max, false));
  const vis = vb_barSVG({ labels: lab.map(l => l[0]), series, max, step, ylab: ctx.ylab, title: ctx.title, legend: duo ? ctx.duo : null });
  const head = `<b>${ctx.title}</b><br>`;
  const rh = vb_readHint(step, gran !== step);
  const t = R(0, duo ? 5 : 4);
  if (duo && t >= 4) {
    const w = series[1];
    if (t === 4) {
      const si = R(0, 1);
      return num(`${head}Hoeveel ${ctx.ylab} waren het in totaal ${ctx.dt[si]}?`, vb_sum(series[si]), rh + ' Lees elke staaf van die kleur af en tel ze op.', { vis });
    }
    const d = v.map((x, i) => Math.abs(x - w[i])), mx = Math.max(...d);
    if (d.filter(x => x === mx).length > 1 || mx === 0) return vb_staaf(lv);
    const ii = d.indexOf(mx);
    return choice(`${head}Waar is het verschil tussen ${ctx.duo[0]} en ${ctx.duo[1]} het grootst?`, lab[ii][1], lab.filter((_, i) => i !== ii).map(l => l[1]),
      'Kijk bij elk paar staven hoeveel ze verschillen.', { vis });
  }
  const si = duo ? R(0, 1) : 0, vals = series[si], wie = duo ? ` (${ctx.duo[si]})` : '';
  if (t === 0) { const i = R(0, n - 1); return num(head + ctx.q(lab[i][1]) + wie, vals[i], rh, { vis }); }
  if (t === 1) {
    const [i, j] = vb_pickN([...Array(n).keys()], 2);
    if (vals[i] === vals[j]) return num(head + ctx.q(lab[i][1]) + wie, vals[i], rh, { vis });
    const [a, b] = vals[i] > vals[j] ? [i, j] : [j, i];
    return num(`${head}Hoeveel ${ctx.ylab} meer ${ctx.pre} ${lab[a][1]} dan ${ctx.pre} ${lab[b][1]}?${wie}`, vals[a] - vals[b], rh + ' Lees beide staven af en trek ze van elkaar af.', { vis });
  }
  if (t === 2) {
    const hoog = Math.random() < 0.6, tgt = hoog ? Math.max(...vals) : Math.min(...vals), ii = vals.indexOf(tgt);
    return choice(`${head}Welke staaf is het ${hoog ? 'hoogst' : 'laagst'}?${wie}`, lab[ii][1], lab.filter((_, i) => i !== ii).map(l => l[1]),
      `Zoek de ${hoog ? 'langste' : 'kortste'} staaf.`, { vis });
  }
  if (t === 3) {
    const k = lv === 56 ? 2 : lv === 7 ? 3 : n;
    const idx = vb_pickN([...Array(n).keys()], k).sort((a, b) => a - b);
    const namen = idx.map(i => lab[i][1]);
    const txt = k === n ? 'alle staven samen' : namen.slice(0, -1).join(', ') + ' en ' + namen[namen.length - 1] + ' samen';
    return num(`${head}Hoeveel ${ctx.ylab} zijn het voor ${txt}?${wie}`, vb_sum(idx.map(i => vals[i])), rh + ' Lees elke staaf af en tel ze op.', { vis });
  }
  return num(`${head}Hoeveel verschil is er tussen de hoogste en de laagste staaf?${wie}`, Math.max(...vals) - Math.min(...vals), rh + ' Zoek de hoogste en de laagste staaf.', { vis });
}
/* ---------- cirkeldiagram ---------- */
const VB_PIE = [
  { title: 'Lievelingssport', wie: 'kinderen', cats: ['voetbal', 'hockey', 'tennis', 'zwemmen', 'judo', 'dansen'], q: c => `kozen ${c}` },
  { title: 'Lievelingskleur', wie: 'kinderen', cats: ['rood', 'blauw', 'groen', 'geel', 'paars'], q: c => `kozen ${c}` },
  { title: 'Lievelingsvak', wie: 'leerlingen', cats: ['rekenen', 'taal', 'gym', 'tekenen', 'muziek'], q: c => `kozen ${c}` },
  { title: 'Waar gaat het zakgeld naartoe?', wie: 'kinderen', cats: ['snoep', 'sparen', 'games', 'boeken', 'kleding'], q: c => `kozen ${c}` },
  { title: 'Lievelingsdier', wie: 'leerlingen', cats: ['hond', 'kat', 'konijn', 'paard', 'vis'], q: c => `kozen ${c}` }
];
const VB_PIE6 = [[4, 2, 2], [4, 2, 1, 1], [3, 2, 2, 1], [4, 3, 1], [6, 1, 1], [5, 2, 1], [2, 2, 4], [3, 3, 2], [6, 2]];
const VB_ACHT = ['', '1/8', '1/4', '3/8', '1/2', '5/8', '3/4', '7/8'];
function vb_parts(k) {
  /* k delen, veelvouden van 5%, samen 100%, uniek grootste */
  for (let t = 0; t < 50; t++) {
    const cuts = vb_pickN([...Array(19).keys()].map(i => i + 1), k - 1).sort((a, b) => a - b);
    const p = [];
    let prev = 0;
    for (const c of cuts.concat([20])) { p.push((c - prev) * 5); prev = c; }
    const mx = Math.max(...p);
    if (p.filter(x => x === mx).length === 1) return p.sort((a, b) => b - a);
  }
  return [40, 30, 20, 10].slice(0, k - 1).concat([100 - [40, 30, 20, 10].slice(0, k - 1).reduce((a, b) => a + b, 0)]);
}
function vb_cirkel(lv) {
  const ctx = pick(VB_PIE);
  const head = `<b>${ctx.title}</b><br>`;
  if (lv === 6) {
    const comp = shuffle(pick(VB_PIE6)), cats = vb_pickN(ctx.cats, comp.length);
    const slices = comp.map((e, i) => ({ label: cats[i], p: e * 12.5 }));
    const vis = vb_pieSVG(slices, false);
    const t = R(0, 2), i = R(0, comp.length - 1);
    if (t === 0) return choice(`${head}Welk deel van de ${ctx.wie} koos ${cats[i]}?`, VB_ACHT[comp[i]], ['1/8', '1/4', '3/8', '1/2', '3/4', '1/3', '2/3'].filter(x => x !== VB_ACHT[comp[i]]),
      'Een halve cirkel is 1/2. Een kwart cirkel is 1/4. Vergelijk het stuk met een halve of een kwart cirkel.', { vis });
    if (t === 1) {
      const mx = Math.max(...comp);
      if (comp.filter(x => x === mx).length > 1) return vb_cirkel(lv);
      return choice(`${head}Wat werd het meest gekozen?`, cats[comp.indexOf(mx)], cats.filter((_, k) => k !== comp.indexOf(mx)), 'Zoek het grootste stuk van de cirkel.', { vis });
    }
    const N = 8 * R(2, 6);
    return num(`${head}Er deden ${N} ${ctx.wie} mee. Hoeveel ${ctx.wie} ${ctx.q(cats[i])}?`, N * comp[i] / 8, `Welk deel van de cirkel is het? Bereken dat deel van ${N}.`, { vis });
  }
  const k = R(3, lv === 7 ? 4 : 5), p = vb_parts(k), cats = vb_pickN(ctx.cats, k);
  if (lv === 7) {
    const slices = p.map((x, i) => ({ label: cats[i], p: x }));
    const vis = vb_pieSVG(slices, true);
    const N = 20 * R(2, 10);
    const t = R(0, 2), [i, j] = vb_pickN([...Array(k).keys()], 2);
    if (t === 0) return num(`${head}Er deden ${N} ${ctx.wie} mee. Hoeveel ${ctx.wie} ${ctx.q(cats[i])}?`, N * p[i] / 100, `Reken ${p[i]}% van ${N} uit. Begin met 10% of 1%.`, { vis });
    if (t === 1) return num(`${head}Hoeveel procent van de ${ctx.wie} koos ${cats[i]} of ${cats[j]}?`, p[i] + p[j], 'Zoek de twee percentages op en tel ze op.', { vis, unit: '%' });
    if (p[i] === p[j]) return num(`${head}Er deden ${N} ${ctx.wie} mee. Hoeveel ${ctx.wie} ${ctx.q(cats[i])}?`, N * p[i] / 100, `Reken ${p[i]}% van ${N} uit.`, { vis });
    const [a, b] = p[i] > p[j] ? [i, j] : [j, i];
    return num(`${head}Er deden ${N} ${ctx.wie} mee. Hoeveel meer ${ctx.wie} kozen ${cats[a]} dan ${cats[b]}?`, N * (p[a] - p[b]) / 100, 'Reken het verschil in procenten uit. Neem daarna dat percentage van het totaal.', { vis });
  }
  /* groep 8: één percentage ontbreekt */
  const hid = R(0, k - 1);
  const slices = p.map((x, i) => ({ label: cats[i], p: x, show: i !== hid }));
  const vis = vb_pieSVG(slices, true);
  const t = R(0, 3);
  if (t === 0) return num(`${head}Hoeveel procent van de ${ctx.wie} koos ${cats[hid]}?`, p[hid], 'Alle stukken samen zijn 100%. Tel de bekende percentages op.', { vis, unit: '%' });
  if (t === 1) {
    const N = 20 * R(3, 25);
    return num(`${head}Er deden ${N} ${ctx.wie} mee. Hoeveel ${ctx.wie} ${ctx.q(cats[hid])}?`, N * p[hid] / 100, 'Reken eerst het ontbrekende percentage uit (samen 100%). Neem dan dat percentage van het totaal.', { vis });
  }
  const i = pick([...Array(k).keys()].filter(x => x !== hid));
  const N = 20 * R(3, 25), cnt = N * p[i] / 100;
  if (t === 2) return num(`${head}${cnt} ${ctx.wie} ${ctx.q(cats[i])}. Hoeveel ${ctx.wie} deden er in totaal mee?`, N, `${cnt} ${ctx.wie} is ${p[i]}%. Hoeveel is dan 1% of 10%? En 100%?`, { vis });
  return num(`${head}Er deden ${N} ${ctx.wie} mee. Hoeveel ${ctx.wie} kozen <b>niet</b> ${cats[i]}?`, N - cnt, `Hoeveel procent kozen niet ${cats[i]}? Neem dat percentage van ${N}.`, { vis });
}
/* ---------- beelddiagram ---------- */
const VB_BEELD = [
  { title: 'Verkochte ijsjes', e: '🍦', wat: 'ijsjes', cats: ['maandag', 'dinsdag', 'woensdag', 'donderdag', 'vrijdag'], q: c => `Hoeveel ijsjes werden er op ${c} verkocht?` },
  { title: 'Geplukte appels', e: '🍎', wat: 'appels', cats: ['Noah', 'Emma', 'Sem', 'Julia', 'Finn'], q: c => `Hoeveel appels plukte ${c}?` },
  { title: 'Boeken in de klassenbieb', e: '📚', wat: 'boeken', cats: ['groep 3', 'groep 4', 'groep 5', 'groep 6'], q: c => `Hoeveel boeken heeft ${c}?` },
  { title: 'Doelpunten dit seizoen', e: '⚽', wat: 'doelpunten', cats: ['De Leeuwen', 'De Tijgers', 'De Haaien', 'De Arenden'], q: c => `Hoeveel doelpunten maakten ${c}?` },
  { title: 'Bezoekers van de kinderboerderij', e: '🙂', wat: 'bezoekers', cats: ['april', 'mei', 'juni', 'juli', 'augustus'], q: c => `Hoeveel bezoekers waren er in ${c}?` }
];
function vb_beeldQ(complex) {
  const ctx = pick(VB_BEELD);
  const val = complex ? pick([4, 10, 20, 50, 100]) : pick([2, 2, 5, 10]);
  const n = R(3, ctx.cats.length), cats = ctx.cats.slice(0, n);
  let h;
  for (let t = 0; t < 40; t++) {
    h = cats.map(() => (complex ? R(1, 16) : 2 * R(1, 8)));
    const mx = Math.max(...h);
    if (h.filter(x => x === mx).length === 1 && (!complex || h.some(x => x % 2))) break;
  }
  const v = h.map(x => x * val / 2);
  const vis = vb_beeld(cats.map((c, i) => [c, h[i]]), ctx.e, val, ctx.wat);
  const head = `<b>${ctx.title}</b><br>`;
  const hint = `Eén ${ctx.e} is ${nl(val)} ${ctx.wat}.${complex ? ` Een half plaatje is de helft: ${nl(val / 2)}.` : ''} Tel de plaatjes en reken uit.`;
  const t = R(0, complex ? 4 : 3);
  const [i, j] = vb_pickN([...Array(n).keys()], 2);
  if (t === 0) return num(head + ctx.q(cats[i]), v[i], hint, { vis });
  if (t === 1) {
    if (v[i] === v[j]) return num(head + ctx.q(cats[j]), v[j], hint, { vis });
    const [a, b] = v[i] > v[j] ? [i, j] : [j, i];
    return num(`${head}Hoeveel ${ctx.wat} meer bij ${cats[a]} dan bij ${cats[b]}?`, v[a] - v[b], hint, { vis });
  }
  if (t === 2) {
    const mx = Math.max(...v), ii = v.indexOf(mx);
    return choice(`${head}Waar zijn de meeste ${ctx.wat}?`, cats[ii], cats.filter((_, k) => k !== ii), 'Zoek de rij met de meeste plaatjes.', { vis });
  }
  if (t === 3) return num(`${head}Hoeveel ${ctx.wat} zijn het in totaal?`, vb_sum(v), hint + ' Tel alle rijen bij elkaar op.', { vis });
  const k = pick([1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]) * val / 2;
  return num(`${head}Je wilt ${nl(k)} ${ctx.wat} tekenen. Hoeveel ${ctx.e} teken je dan? (een half plaatje is 0,5)`, k / val, `Eén ${ctx.e} is ${nl(val)} ${ctx.wat}. Hoe vaak past ${nl(val)} in ${nl(k)}?`, { vis });
}

defCat({
  id: 'diagrammen', domain: 'verbanden', title: 'Diagrammen', emoji: '📊', groups: [4, 5, 6, 7, 8],
  uitleg: `<p>Een <b>diagram</b> laat getallen zien als plaatje. Zo lees je het:</p>
    <ul><li>Lees eerst de <b>titel</b>: waar gaat het over?</li>
    <li>Kijk naar de <b>as</b> met getallen: hoeveel is één lijn erbij? Bijvoorbeeld 0, 10, 20, 30 → elke lijn is 10.</li>
    <li>Ligt een staaf of punt <b>precies tussen</b> 20 en 30? Dan is het 25.</li></ul>
    <div class="voorbeeld">Staaf tot halverwege 40 en 60 → <b>50</b></div>
    <p><b>Cirkeldiagram:</b> de hele cirkel is 100%. Een halve cirkel is 50%, een kwart 25%.</p>
    <div class="voorbeeld">25% van 80 kinderen = 80 : 4 = <b>20 kinderen</b></div>
    <p><b>Beelddiagram:</b> kijk wat één plaatje waard is. 🍎 = 10 → 🍎🍎🍎 = 30, een half plaatje = 5.</p>`,
  subs: [
    { id: 'lijn', title: 'Lijndiagrammen', groups: [5, 6, 7, 8], ex: [
      { id: 'g56', name: 'Niveau groep 5/6', groups: [5, 6], example: 'punten op de lijnen', gen: () => vb_lijn(56) },
      { id: 'g7', name: 'Niveau groep 7', groups: [7], example: 'punten tussen de lijnen', gen: () => vb_lijn(7) },
      { id: 'g8', name: 'Niveau groep 8', groups: [8], example: 'grote getallen, twee lijnen', gen: () => vb_lijn(8) }
    ]},
    { id: 'staaf', title: 'Staafdiagrammen', groups: [5, 6, 7, 8], ex: [
      { id: 'g56', name: 'Niveau groep 5/6', groups: [5, 6], example: 'staven aflezen', gen: () => vb_staaf(56) },
      { id: 'g7', name: 'Niveau groep 7', groups: [7], example: 'staven tussen de lijnen', gen: () => vb_staaf(7) },
      { id: 'g8', name: 'Niveau groep 8', groups: [8], example: 'grote getallen, dubbele staven', gen: () => vb_staaf(8) }
    ]},
    { id: 'cirkel', title: 'Cirkeldiagrammen', groups: [6, 7, 8], ex: [
      { id: 'g6', name: 'Niveau groep 6', groups: [6], example: 'half, kwart, achtste', gen: () => vb_cirkel(6) },
      { id: 'g7', name: 'Niveau groep 7', groups: [7], example: '25% van 80', gen: () => vb_cirkel(7) },
      { id: 'g8', name: 'Niveau groep 8', groups: [8], example: 'ontbrekend percentage', gen: () => vb_cirkel(8) }
    ]},
    { id: 'beeld', title: 'Beelddiagrammen', groups: [4, 5, 6], ex: [
      { id: 'eenv', name: 'Eenvoudige beelddiagrammen aflezen', groups: [4, 5], example: '🍎 = 2', gen: () => vb_beeldQ(false) },
      { id: 'complex', name: 'Complexe beelddiagrammen aflezen', groups: [5, 6], example: '🍎 = 50, halve plaatjes', gen: () => vb_beeldQ(true) }
    ]}
  ]
});

/* ===================== tabellen ===================== */
const vb_tbl = rows => `<div class="vb-wrap vb-tblwrap">${tableHTML(rows, 'vb-tbl')}</div>`;
const vb_tijd = m => `${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`;
function vb_tab5() {
  const t = R(0, 2);
  if (t === 0) {
    const dagen = VB_DAG.slice(0, 5), v = vb_vals(5, 1, 3, 25, false);
    const vis = vb_tbl([['dag', ...dagen.map(d => d[0])], ['boeken geleend', ...v.map(String)]]);
    const head = '<b>Boeken geleend in de bieb</b><br>';
    const r = R(0, 2), [i, j] = vb_pickN([0, 1, 2, 3, 4], 2);
    if (r === 0) return num(`${head}Hoeveel boeken werden er op ${dagen[i][1]} geleend?`, v[i], 'Zoek de kolom van die dag en kijk in de rij eronder.', { vis });
    if (r === 1) { const [a, b] = v[i] >= v[j] ? [i, j] : [j, i]; return num(`${head}Hoeveel boeken meer op ${dagen[a][1]} dan op ${dagen[b][1]}?`, v[a] - v[b], 'Zoek beide getallen op en trek ze van elkaar af.', { vis }); }
    const ii = v.indexOf(Math.max(...v));
    return choice(`${head}Op welke dag werden de meeste boeken geleend?`, dagen[ii][1], dagen.filter((_, k) => k !== ii).map(d => d[1]), 'Zoek het grootste getal in de tabel.', { vis });
  }
  const items = vb_pickN([['patat', 250], ['frikandel', 200], ['kroket', 225], ['ijsje', 150], ['appelsap', 125], ['tosti', 275], ['pannenkoek', 350], ['limonade', 100]], 4);
  const prijs = items.map(x => x[1] / 100 + pick([0, 0.25, 0.5]));
  const vis = vb_tbl([['snack', 'prijs'], ...items.map((x, k) => [x[0], euro(prijs[k])])]);
  const head = '<b>Prijslijst van de snackbar</b><br>';
  const [i, j] = vb_pickN([0, 1, 2, 3], 2);
  const mo = { unit: '€', pre: true, vis };
  if (t === 1) return num(`${head}Wat kost een ${items[i][0]}?`, round(prijs[i], 2), 'Zoek de rij van de snack en kijk naar de prijs ernaast.', Object.assign({ a: euro(prijs[i]) }, mo));
  return num(`${head}Je koopt een ${items[i][0]} en een ${items[j][0]}. Hoeveel betaal je samen?`, round(prijs[i] + prijs[j], 2), 'Zoek beide prijzen op en tel ze op.', Object.assign({ a: euro(prijs[i] + prijs[j]) }, mo));
}
function vb_tab6() {
  const t = R(0, 1);
  if (t === 0) {
    const steden = vb_pickN(['Groningen', 'Utrecht', 'Maastricht', 'Den Haag', 'Zwolle'], 3), dagen = VB_DAG.slice(0, 5);
    const T = steden.map(() => vb_vals(5, 1, 12, 28, false));
    const vis = vb_tbl([['°C', ...dagen.map(d => d[0])], ...steden.map((s, k) => [s, ...T[k].map(String)])]);
    const head = '<b>Hoogste temperatuur per dag (°C)</b><br>';
    const r = R(0, 2), s = R(0, 2), d = R(0, 4);
    if (r === 0) return num(`${head}Hoe warm werd het op ${dagen[d][1]} in ${steden[s]}?`, T[s][d], 'Zoek de rij van de stad en de kolom van de dag. Waar ze elkaar kruisen, staat het antwoord.', { vis, unit: '°C' });
    if (r === 1) {
      let s2 = (s + R(1, 2)) % 3;
      if (T[s][d] === T[s2][d]) return num(`${head}Hoe warm werd het op ${dagen[d][1]} in ${steden[s2]}?`, T[s2][d], 'Zoek de rij van de stad en de kolom van de dag.', { vis, unit: '°C' });
      const [a, b] = T[s][d] > T[s2][d] ? [s, s2] : [s2, s];
      return num(`${head}Hoeveel graden warmer was het op ${dagen[d][1]} in ${steden[a]} dan in ${steden[b]}?`, T[a][d] - T[b][d], 'Zoek beide temperaturen in de kolom van die dag. Trek ze van elkaar af.', { vis, unit: '°C' });
    }
    const mx = Math.max(...T[s]), mn = Math.min(...T[s]);
    return num(`${head}Hoeveel graden verschil is er in ${steden[s]} tussen de warmste en de koudste dag?`, mx - mn, 'Kijk alleen naar de rij van die stad. Zoek het grootste en het kleinste getal.', { vis, unit: '°C' });
  }
  const teams = vb_pickN(['Ajax', 'PSV', 'Feyenoord', 'AZ', 'Twente', 'Utrecht'], 4);
  const G = teams.map(() => [R(0, 5), R(0, 5), R(0, 5)]);
  const vis = vb_tbl([['team', 'wed 1', 'wed 2', 'wed 3'], ...teams.map((tm, k) => [tm, ...G[k].map(String)])]);
  const head = '<b>Doelpunten per wedstrijd</b><br>';
  const r = R(0, 2), i = R(0, 3), w = R(0, 2);
  if (r === 0) return num(`${head}Hoeveel doelpunten maakte ${teams[i]} in wedstrijd ${w + 1}?`, G[i][w], 'Zoek de rij van het team en de kolom van de wedstrijd.', { vis });
  if (r === 1) return num(`${head}Hoeveel doelpunten maakte ${teams[i]} in totaal?`, vb_sum(G[i]), 'Tel alle getallen in de rij van dat team op.', { vis });
  return num(`${head}Hoeveel doelpunten werden er in wedstrijd ${w + 1} gemaakt door alle teams samen?`, vb_sum(G.map(g => g[w])), 'Tel alle getallen in de kolom van die wedstrijd op.', { vis });
}
const VB_HALTES = ['Station', 'Markt', 'Ziekenhuis', 'Sporthal', 'Dorpsplein', 'Strand', 'Zwembad'];
function vb_dienst(nBus) {
  const h = vb_pickN(VB_HALTES, 5);
  const gaps = h.slice(1).map(() => pick([3, 4, 5, 6, 7, 8, 10, 12]));
  const start0 = R(7, 15) * 60 + pick([0, 5, 10, 15, 20, 25]);
  const freq = pick([15, 20, 30]);
  const bus = [];
  for (let b = 0; b < nBus; b++) { let tt = start0 + b * freq; const row = [tt]; gaps.forEach(g => { tt += g; row.push(tt); }); bus.push(row); }
  const rows = [['halte', ...bus.map((_, b) => `bus ${b + 1}`)], ...h.map((x, k) => [x, ...bus.map(r => vb_tijd(r[k]))])];
  return { h, bus, vis: vb_tbl(rows) };
}
function vb_tab7() {
  const t = R(0, 2);
  if (t < 2) {
    const D = vb_dienst(3), head = '<b>Dienstregeling buslijn 7</b><br>';
    const b = R(0, 2), i = R(0, 3), j = R(i + 1, 4);
    if (t === 0) {
      const m = D.bus[b][j];
      return multi(`${head}Hoe laat is bus ${b + 1} bij ${D.h[j]}?<br>{{0}} : {{1}}`, [Math.floor(m / 60), m % 60], 'Zoek de kolom van de bus en de rij van de halte.', { vis: D.vis, noFrac: true });
    }
    return num(`${head}Hoeveel minuten rijdt de bus van ${D.h[i]} naar ${D.h[j]}?`, D.bus[b][j] - D.bus[b][i], 'Zoek beide tijden op. Hoeveel minuten zitten ertussen? Tel eerst door tot een heel uur als dat nodig is.', { vis: D.vis, unit: 'min' });
  }
  const k = pick([4, 5, 6, 7, 8]), v = pick([8, 9, 10, 12, 14]), extra = pick([1, 2]);
  const vis = vb_tbl([['entree', 'doordeweeks', 'weekend'], ['kind', euro(k), euro(k + extra)], ['volwassene', euro(v), euro(v + extra)]]);
  const na = R(1, 2), nk = R(1, 4), weekend = Math.random() < 0.5;
  const tot = na * (v + (weekend ? extra : 0)) + nk * (k + (weekend ? extra : 0));
  return num(`<b>Prijzen van het zwembad</b><br>${na} volwassene${na > 1 ? 'n' : ''} en ${nk} kind${nk > 1 ? 'eren' : ''} gaan op ${weekend ? 'zaterdag' : 'woensdag'} zwemmen. Hoeveel betalen ze samen?`, tot,
    `Is het doordeweeks of weekend? Zoek de prijs voor een volwassene en voor een kind in die kolom. Doe ze keer het aantal personen en tel op.`, { vis, unit: '€', pre: true, a: euro(tot) });
}
function vb_tab8() {
  const t = R(0, 2);
  if (t === 0) {
    const namen = vb_pickN(NAMEN, 4), n = pick([4, 5]);
    const S = namen.map(() => {
      const a = []; for (let i = 0; i < n - 1; i++) a.push(R(4, 10));
      let last = R(4, 10);
      while ((vb_sum(a) + last) % n) last++;
      if (last > 10) { last -= n; }
      a.push(last); return shuffle(a);
    });
    const vis = vb_tbl([['naam', ...[...Array(n).keys()].map(i => `toets ${i + 1}`)], ...namen.map((x, k) => [x, ...S[k].map(String)])]);
    const i = R(0, 3);
    return num(`<b>Cijfers voor rekenen</b><br>Wat is het gemiddelde cijfer van ${namen[i]}?`, vb_sum(S[i]) / n, `Tel alle cijfers van ${namen[i]} op. Deel dat door het aantal toetsen.`, { vis });
  }
  if (t === 1) {
    const D = vb_dienst(4), head = '<b>Dienstregeling buslijn 12</b><br>';
    const i = R(0, 3), j = R(i + 1, 4), b = R(0, 2);
    const aankomst = D.bus[b][i] + R(1, 12);
    const nb = D.bus.findIndex(r => r[i] >= aankomst);
    if (nb < 0) return vb_tab8();
    return num(`${head}Je bent om ${vb_tijd(aankomst)} bij ${D.h[i]}. Je neemt de eerste bus die komt. Hoeveel minuten na ${vb_tijd(aankomst)} ben je bij ${D.h[j]}?`, D.bus[nb][j] - aankomst,
      'Zoek eerst welke bus je haalt. Kijk dan hoe laat die bus bij de andere halte is.', { vis: D.vis, unit: 'min' });
  }
  const steden = vb_pickN(['Amsterdam', 'Rotterdam', 'Eindhoven', 'Groningen', 'Arnhem'], 3);
  const ms = VB_MND.slice(0, 4);
  const Tm = steden.map(() => ms.map(() => R(30, 120)));
  const vis = vb_tbl([['regen (mm)', ...ms.map(m => m[0])], ...steden.map((s, k) => [s, ...Tm[k].map(String)])]);
  const s = R(0, 2), [a, b] = vb_pickN([0, 1, 2, 3], 2).sort((x, y) => x - y);
  const r = R(0, 1);
  if (r === 0) {
    const tot = vb_sum(Tm[s]);
    const g = tot / 4;
    return num(`<b>Neerslag per maand</b><br>Hoeveel regen viel er gemiddeld per maand in ${steden[s]}?`, round(g, 3), 'Tel de vier maanden op en deel door 4.', { vis, unit: 'mm' });
  }
  const s2 = (s + 1) % 3;
  const v1 = Tm[s][a] + Tm[s][b], v2 = Tm[s2][a] + Tm[s2][b];
  return num(`<b>Neerslag per maand</b><br>Hoeveel mm regen viel er in ${ms[a][1]} en ${ms[b][1]} samen in ${steden[s]} en ${steden[s2]} samen?`, v1 + v2,
    'Zoek de vier getallen op (twee steden, twee maanden) en tel ze op.', { vis, unit: 'mm' });
}

defCat({
  id: 'tabellen', domain: 'verbanden', title: 'Tabellen', emoji: '🗂️', groups: [4, 5, 6, 7, 8],
  uitleg: `<p>In een <b>tabel</b> staan gegevens in <b>rijen</b> (naar rechts) en <b>kolommen</b> (naar beneden).</p>
    <p>Zoek eerst de goede rij, dan de goede kolom. Waar ze elkaar kruisen, staat je getal.</p>
    <div class="voorbeeld">${tableHTML([['°C', 'ma', 'di'], ['Utrecht', '18', '21']], 'vb-tbl')} Dinsdag in Utrecht: <b>21 °C</b></div>
    <p><b>Dienstregeling:</b> vertrek 8:52, aankomst 9:07 → tot 9:00 is 8 min, plus 7 min = <b>15 minuten</b>.</p>
    <p><b>Gemiddelde:</b> tel alles op en deel door het aantal. 6, 8, 7 en 9 → 30 : 4 = <b>7,5</b></p>`,
  subs: [
    { id: 'niveau', title: 'Tabellen - niveau per groep', groups: [5, 6, 7, 8], ex: [
      { id: 'g5', name: 'Tabellen niveau groep 5', groups: [5], example: 'aflezen en verschil', gen: vb_tab5 },
      { id: 'g6', name: 'Tabellen niveau groep 6', groups: [6], example: 'rij en kolom, totaal', gen: vb_tab6 },
      { id: 'g7', name: 'Tabellen niveau groep 7', groups: [7], example: 'dienstregeling, prijzen', gen: vb_tab7 },
      { id: 'g8', name: 'Tabellen niveau groep 8', groups: [8], example: 'gemiddelde, overstappen', gen: vb_tab8 }
    ]}
  ]
});
