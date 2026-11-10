/* De sommen-speler: toont vragen, laat het kind antwoorden en kijkt na.
   Per vraagsoort is er een "widget" (WIDGETS); runSession speelt een hele reeks af. */
import { clockSVG, euro, fracHTML, klokWoord, makeQ, moneyItem, nl, pick, plaatjes, R, shuffle } from './kern.js';
import { $, $$, beep, esc, fr } from './scherm.js';
import { save } from './opslag.js';
import { record } from './voortgang.js';

function parseAnswer(s) {
  s = String(s).trim().replace(/[€%]/g, '').replace(/\s+/g, ' ').replace(/,/g, '.').trim();
  let m;
  if ((m = s.match(/^(\d+) (\d+)\/(\d+)$/))) return +m[1] + m[2] / m[3];
  if ((m = s.match(/^(\d+(?:\.\d+)?)\/(\d+(?:\.\d+)?)$/))) return +m[2] === 0 ? NaN : m[1] / m[2];
  if (/^\d*\.?\d+$|^\d+\.$/.test(s)) return parseFloat(s);
  return NaN;
}
const same = (a, b) => Math.abs(a - b) < 1e-6;

/* Numpad (voor num en multi). onKey(k) krijgt '0'-'9', ',', '/', ' ', '⌫', 'ok' */
function padHTML(frac, mixed) {
  const keys = ['1', '2', '3', '⌫', '4', '5', '6', ',', '7', '8', '9', frac ? '/' : '', '0'];
  return `<div class="pad">${keys.map(k => k ? `<button type="button" class="key ${k === '⌫' ? 'del' : ''}" data-k="${k}" aria-label="${k === '⌫' ? 'wissen' : k}">${k}</button>` : '<span></span>').join('')}
    <button type="button" class="key ok" data-k="ok">Klaar ✓</button>${frac && mixed ? '<button type="button" class="key sp" data-k=" ">spatie</button>' : ''}</div>`;
}
function typeInto(str, k) {
  if (k === '⌫') return str.slice(0, -1);
  if (str.length >= 12) return str;
  const lastPart = str.split(/[ /]/).pop();
  if (k === ',' && lastPart.includes(',')) return str;
  if (k === '/' && str.includes('/')) return str;
  if (k === ' ' && (str.includes(' ') || !str)) return str;
  return str + k;
}

/* Elke vraagsoort heeft een "widget": mount → { value(), right(v), given(v), reset(), reveal(), key(k) } */
const WIDGETS = {
  num(q, area, api) {
    let input = '';
    area.innerHTML = `<div class="display-wrap">${q.pre && q.unit ? `<span class="unit">${q.unit}</span>` : ''}<div class="display" aria-live="polite"></div>${!q.pre && q.unit ? `<span class="unit">${q.unit}</span>` : ''}</div>${padHTML(q.frac, q.frac)}`;
    const draw = () => { $('.display', area).innerHTML = input ? fracHTML(esc(input)) : '<span class="ph">?</span>'; };
    const key = k => { if (k === 'ok') return input && api.submit(); input = typeInto(input, k); draw(); };
    $$('[data-k]', area).forEach(b => b.addEventListener('click', () => key(b.dataset.k)));
    draw();
    return { value: () => input || null, right: v => same(parseAnswer(v), q.v), given: v => v + (q.unit && !q.pre ? ' ' + q.unit : ''), reset() { input = ''; draw(); }, key };
  },
  multi(q, area, api, qarea) {
    const vals = q.blanks.map(() => '');
    let act = 0;
    $$('.blank', qarea).forEach(b => b.addEventListener('click', () => { act = +b.dataset.b; draw(); }));
    area.innerHTML = padHTML(false);
    const draw = () => $$('.blank', qarea).forEach(b => {
      const i = +b.dataset.b;
      b.innerHTML = vals[i] ? esc(vals[i]) : '&nbsp;';
      b.classList.toggle('act', i === act);
    });
    const key = k => {
      if (k === 'ok') {
        const empty = vals.findIndex(v => !v);
        if (empty < 0) return api.submit();
        if (vals[act]) { act = empty; draw(); }
        return;
      }
      vals[act] = typeInto(vals[act], k); draw();
    };
    $$('[data-k]', area).forEach(b => b.addEventListener('click', () => key(b.dataset.k)));
    draw();
    return {
      value: () => (vals.every(v => v) ? vals.slice() : null),
      right: v => v.every((x, i) => same(parseAnswer(x), q.blanks[i])),
      given: v => v.join(' · '),
      reset() {
        $$('.blank', qarea).forEach(b => {
          const i = +b.dataset.b, ok = same(parseAnswer(vals[i]), q.blanks[i]);
          b.classList.toggle('good', ok);
          if (!ok) vals[i] = '';
        });
        act = Math.max(0, vals.findIndex(v => !v)); draw();
      },
      key
    };
  },
  choice(q, area, api) {
    area.innerHTML = `<div class="choices ${q.choices.length === 4 ? 'four' : ''} ${q.choices.some(c => c.length > 40) ? 'pics' : ''}">${q.choices.map((c, i) => `<button type="button" class="btn choice" data-i="${i}">${fr(c, q)}</button>`).join('')}</div>`;
    const btns = $$('[data-i]', area);
    btns.forEach(b => b.addEventListener('click', () => api.submit(q.choices[+b.dataset.i], b)));
    return {
      choice: true, right: v => v === q.ans, given: v => v,
      key: k => { const b = btns[+k - 1]; if (b && !b.disabled) b.click(); },
      wrong(btn) { btn.classList.add('bad'); btn.disabled = true; },
      reveal() { btns.forEach(b => { if (q.choices[+b.dataset.i] === q.ans) b.classList.add('ok'); }); },
      mark(btn, cls) { if (btn) btn.classList.add(cls); }
    };
  },
  order(q, area, api) {
    let placed = [];   // indices in q.items
    area.innerHTML = `<div class="order-ans" aria-label="Jouw volgorde"></div><div class="order-pool"></div><div class="row"><button type="button" class="btn primary" data-ok>Klaar ✓</button></div>`;
    const draw = () => {
      $('.order-ans', area).innerHTML = placed.length ? placed.map((ix, i) => `<button type="button" class="chip on" data-p="${i}">${fr(q.items[ix], q)}</button>`).join(`<span class="lt">${q.desc ? '&gt;' : '&lt;'}</span>`) : `<span class="ph">Tik de ${q.desc ? 'grootste' : 'kleinste'} eerst</span>`;
      $('.order-pool', area).innerHTML = q.items.map((it, ix) => (placed.includes(ix) ? '' : `<button type="button" class="chip" data-ix="${ix}">${fr(it, q)}</button>`)).join('');
      $$('[data-p]', area).forEach(b => b.addEventListener('click', () => { placed.splice(+b.dataset.p, 1); draw(); }));
      $$('[data-ix]', area).forEach(b => b.addEventListener('click', () => { placed.push(+b.dataset.ix); beep('tap'); draw(); }));
    };
    $('[data-ok]', area).addEventListener('click', () => api.submit());
    draw();
    const strip = h => h.replace(/<span class="frac"><span>(\d+)<\/span><span>(\d+)<\/span><\/span>/g, '$1/$2').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
    return { value: () => (placed.length === q.items.length ? placed.map(ix => q.items[ix]) : null), right: v => v.every((x, i) => x === q.sorted[i]), given: v => v.map(strip).join(' · '), reset() { placed = []; draw(); }, key: k => k === 'ok' && api.submit() };
  },
  line(q, area, api) {
    let val = null;
    const fmt = q.fmt || (v => nl(v, true));
    area.innerHTML = `<div class="nline q-line"><div class="track"></div>
      ${Array.from({ length: q.ticks + 1 }, (_, i) => { const v = q.min + i * (q.max - q.min) / q.ticks; const lab = q.labels.some(l => same(l, v)); return `<div class="tick ${lab ? 'end' : ''}" style="left:${i / q.ticks * 100}%">${lab ? `<span>${fr(fmt(v), q)}</span>` : ''}</div>`; }).join('')}
      ${q.labels.filter(l => !Array.from({ length: q.ticks + 1 }, (_, i) => q.min + i * (q.max - q.min) / q.ticks).some(v => same(v, l))).map(l => `<div class="tick end" style="left:${(l - q.min) / (q.max - q.min) * 100}%"><span>${fmt(l)}</span></div>`).join('')}
      <div class="marker guess" hidden>▼</div><div class="marker real" hidden>🚩</div></div>
      <p class="small muted center">Tik op de lijn. Je kunt nog verschuiven.</p><div class="row"><button type="button" class="btn primary" data-ok>Klaar ✓</button></div>`;
    const ln = $('.nline', area), mk = $('.guess', ln);
    ln.addEventListener('pointerdown', e => {
      const r = ln.getBoundingClientRect(), p = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      val = q.min + p * (q.max - q.min);
      mk.style.left = p * 100 + '%'; mk.hidden = false;
    });
    $('[data-ok]', area).addEventListener('click', () => api.submit());
    return {
      value: () => val, right: v => Math.abs(v - q.v) <= q.tol * (q.max - q.min), given: v => '≈ ' + nl(Math.round(v * 100) / 100, true),
      reset() { val = null; mk.hidden = true; },
      reveal() { const r = $('.real', ln); r.style.left = (q.v - q.min) / (q.max - q.min) * 100 + '%'; r.hidden = false; },
      key: k => k === 'ok' && api.submit()
    };
  },
  clock(q, area, api) {
    const st = q.step;
    let h, m;
    do { h = R(1, 12); m = st >= 60 ? 0 : R(0, 60 / st - 1) * st; } while (h === q.h && m === q.m);
    area.innerHTML = `<div class="clockset"><div class="cs-clock"></div>
      <div class="cs-ctrl"><div><small>Uur</small><button type="button" class="key" data-d="h-">−</button><button type="button" class="key" data-d="h+">+</button></div>
      ${st < 60 ? `<div><small>Minuten (${st})</small><button type="button" class="key" data-d="m-">−</button><button type="button" class="key" data-d="m+">+</button></div>` : ''}</div></div>
      <div class="row"><button type="button" class="btn primary" data-ok>Klaar ✓</button></div>`;
    const draw = () => { $('.cs-clock', area).innerHTML = clockSVG(h, m, 'big'); };
    $$('[data-d]', area).forEach(b => b.addEventListener('click', () => {
      const d = b.dataset.d;
      if (d === 'h+') h = h % 12 + 1; else if (d === 'h-') h = (h + 10) % 12 + 1;
      else { const t = (h % 12) * 60 + m + (d === 'm+' ? st : -st), tt = (t + 720) % 720; h = Math.floor(tt / 60) || 12; m = tt % 60; }
      draw(); beep('tap');
    }));
    $('[data-ok]', area).addEventListener('click', () => api.submit());
    draw();
    return { value: () => ({ h, m }), right: v => v.h % 12 === q.h % 12 && v.m === q.m, given: v => klokWoord(v.h, v.m), reveal() { api.extra(clockSVG(q.h, q.m, 'small')); }, key: k => k === 'ok' && api.submit() };
  },
  count(q, area, api) {
    let n = 0;
    area.innerHTML = `<div class="countbox"><div class="cb-items"></div></div>
      <div class="row"><button type="button" class="btn big" data-c="-">−</button><button type="button" class="btn big" data-c="+">+ ${q.emoji}</button><button type="button" class="btn big primary" data-ok>Klaar ✓</button></div>`;
    const draw = () => { $('.cb-items', area).innerHTML = n ? plaatjes(n, q.emoji) : '<span class="ph">Tik op + om plaatjes neer te zetten</span>'; };
    $$('[data-c]', area).forEach(b => b.addEventListener('click', () => { n = Math.max(0, Math.min(q.max, n + (b.dataset.c === '+' ? 1 : -1))); beep('tap'); draw(); }));
    $('[data-ok]', area).addEventListener('click', () => api.submit());
    draw();
    return { value: () => n, right: v => v === q.n, given: v => String(v), reset() { n = 0; draw(); }, key: k => { if (k === 'ok') api.submit(); } };
  },
  pay(q, area, api) {
    let paid = [];
    area.innerHTML = `<div class="paybox"><small>Jouw geld:</small><div class="pb-tray money"></div></div>
      <div class="money pb-wallet">${q.money.slice().sort((a, b) => a - b).map(c => moneyItem(c, 'button', `type="button" data-c="${c}"`)).join('')}</div>
      <div class="row"><button type="button" class="btn primary" data-ok>Betalen ✓</button></div>`;
    const draw = () => {
      $('.pb-tray', area).innerHTML = paid.length ? paid.map((c, i) => moneyItem(c, 'button', `type="button" data-i="${i}" aria-label="weghalen"`)).join('') : '<span class="ph">Tik op munten en briefjes</span>';
      $$('[data-i]', area).forEach(b => b.addEventListener('click', () => { paid.splice(+b.dataset.i, 1); draw(); }));
    };
    $$('.pb-wallet [data-c]', area).forEach(b => b.addEventListener('click', () => { if (paid.length < 30) { paid.push(+b.dataset.c); paid.sort((a, b2) => b2 - a); beep('tap'); draw(); } }));
    $('[data-ok]', area).addEventListener('click', () => api.submit());
    draw();
    const sum = () => paid.reduce((s, c) => s + c, 0);
    return { value: () => (paid.length ? sum() : null), right: v => v === q.amount, given: v => euro(v / 100), reset() { paid = []; draw(); }, key: k => k === 'ok' && api.submit() };
  },
  colour(q, area, api) {
    const on = new Set();
    area.innerHTML = `<div class="cgrid" style="--cols:${q.cols}">${Array.from({ length: q.cells }, (_, i) => `<button type="button" class="cell" data-i="${i}" aria-label="vakje ${i + 1}"></button>`).join('')}</div>
      <div class="row"><button type="button" class="btn primary" data-ok>Klaar ✓</button></div>`;
    $$('.cell', area).forEach(b => b.addEventListener('click', () => { const i = +b.dataset.i; on.has(i) ? on.delete(i) : on.add(i); b.classList.toggle('on'); }));
    $('[data-ok]', area).addEventListener('click', () => api.submit());
    return { value: () => on.size, right: v => v === q.n, given: v => `${v} van de ${q.cells} vakjes`, reset() { on.clear(); $$('.cell', area).forEach(b => b.classList.remove('on')); }, key: k => k === 'ok' && api.submit() };
  }
};

export function runSession(el, { title, ids, mode, total, sec, onFinish }) {
  let i = 0, cur, w, tries = 0, locked = false, correct = 0, wrongN = 0, items = [], timeout, timer, bag = [];
  const end = mode === 'tijd' ? Date.now() + sec * 1000 : 0;
  el.innerHTML = `<div class="ex">
    <div class="ex-head"><b class="ex-title">${{ oefen: '✏️ ', toets: '📝 ', tijd: '⏱ ' }[mode]}${esc(title)}</b><span class="count"></span></div>
    <div class="progress" role="progressbar"><div class="bar"></div></div>
    <div class="card qcard"><div class="qarea"></div></div>
    <div class="feedback" aria-live="polite"></div>
    <div class="answer"></div></div>`;
  const qarea = $('.qarea', el), fb = $('.feedback', el), ans = $('.answer', el);
  /* eerlijk verdelen over de gekozen oefeningen */
  const nextId = () => { if (!bag.length) bag = shuffle(ids); return bag.pop(); };
  const api = {
    submit: (val, btn) => submit(val, btn),
    extra: html => { fb.insertAdjacentHTML('beforeend', `<div class="extra">${html}</div>`); }
  };
  function next() {
    if (mode !== 'tijd' && i >= total) return finish();
    let tries2 = 0;
    do { cur = makeQ(nextId()); } while (items.length && cur.q === items[items.length - 1].q && ++tries2 < 5);
    tries = 0; locked = false;
    $('.count', el).textContent = mode === 'tijd' ? `✔ ${correct}` : `${i + 1} / ${total}`;
    if (mode !== 'tijd') $('.bar', el).style.width = (i / total * 100) + '%';
    let qh = fr(cur.q, cur), vis = cur.vis || '';
    const blank = (m, n) => `<button type="button" class="blank" data-b="${n}" aria-label="invulvak ${+n + 1}">&nbsp;</button>`;
    if (cur.type === 'multi') { qh = qh.replace(/\{\{(\d+)\}\}/g, blank); vis = vis.replace(/\{\{(\d+)\}\}/g, blank); }
    qarea.innerHTML = `<div class="q">${qh}</div>${vis ? `<div class="vis">${vis}</div>` : ''}`;
    fb.innerHTML = ''; fb.className = 'feedback';
    w = (WIDGETS[cur.type] || WIDGETS.num)(cur, ans, api, qarea);
  }
  function submit(val, btn) {
    if (locked) return;
    if (val === undefined) val = w.value();
    if (val === null) { fb.className = 'feedback'; fb.textContent = 'Je bent nog niet klaar!'; return; }
    const ok = w.right(val);
    if (mode === 'toets') {
      locked = true;
      record(cur.ex, ok);
      items.push({ q: cur.q, vis: cur.vis, a: cur.a + (cur.type === 'num' && cur.unit && !cur.pre ? ' ' + cur.unit : ''), given: w.given(val), ok, hint: cur.hint, noFrac: cur.noFrac });
      if (ok) correct++;
      if (btn) btn.classList.add('picked');
      beep('tap');
      i++; timeout = setTimeout(next, 250);
      return;
    }
    tries++;
    if (ok) {
      locked = true;
      if (tries === 1) { correct++; record(cur.ex, true); }
      beep('good');
      if (btn) btn.classList.add('ok');
      fb.className = 'feedback ok';
      fb.innerHTML = pick(['Goed zo! 🎉', 'Super! ⭐', 'Knap hoor! 💪', 'Helemaal goed! ✅', 'Top! 🚀']);
      i++; timeout = setTimeout(next, mode === 'tijd' ? 350 : 900);
      return;
    }
    beep('bad');
    if (tries === 1) record(cur.ex, false);
    if (mode === 'tijd') {
      locked = true; wrongN++;
      if (btn) btn.classList.add('bad');
      if (w.reveal) w.reveal();
      fb.className = 'feedback bad';
      fb.innerHTML = `Het goede antwoord is <b>${fr(cur.a, cur)}</b>`;
      i++; timeout = setTimeout(next, 1500);
      return;
    }
    if (tries === 1) {
      if (btn && w.wrong) w.wrong(btn);
      fb.className = 'feedback bad';
      fb.innerHTML = `Bijna! Probeer het nog eens. <div class="hint">💡 ${cur.hint}</div>`;
      const qc = $('.qcard', el); qc.classList.add('shake'); setTimeout(() => qc.classList.remove('shake'), 400);
      if (w.reset) w.reset();
    } else {
      locked = true;
      if (btn) btn.classList.add('bad');
      fb.className = 'feedback bad';
      fb.innerHTML = `Het goede antwoord is <b>${fr(cur.a + (cur.type === 'num' && cur.unit && !cur.pre ? ' ' + cur.unit : ''), cur)}</b>. <div class="hint">💡 ${cur.hint}</div>`;
      if (w.reveal) w.reveal();
      fb.insertAdjacentHTML('beforeend', '<button class="btn primary" id="nextq">Volgende ➜</button>');
      $('#nextq').addEventListener('click', () => { i++; next(); });
      $('#nextq').focus();
    }
  }
  function finish() {
    clearInterval(timer); clearTimeout(timeout);
    $('.bar', el).style.width = '100%';
    document.removeEventListener('keydown', onKey);
    save();
    onFinish({ correct, wrong: wrongN, total: mode === 'tijd' ? correct + wrongN : total, items });
  }
  function onKey(e) {
    if (e.metaKey || e.ctrlKey || e.altKey || !w) return;
    if (e.key === 'Enter') { const n = $('#nextq'); if (n) n.click(); else w.key('ok'); e.preventDefault(); return; }
    if (w.choice) { if (/^[1-4]$/.test(e.key)) w.key(e.key); return; }
    if (/^\d$/.test(e.key)) w.key(e.key);
    else if (e.key === ',' || e.key === '.') w.key(',');
    else if (e.key === '/' && cur.frac) w.key('/');
    else if (e.key === ' ' && cur.frac) { w.key(' '); e.preventDefault(); }
    else if (e.key === 'Backspace') w.key('⌫');
  }
  document.addEventListener('keydown', onKey);
  if (mode === 'tijd') {
    $('.bar', el).style.width = '100%';
    timer = setInterval(() => {
      const left = Math.max(0, end - Date.now());
      $('.bar', el).style.width = (left / (sec * 1000) * 100) + '%';
      $('.bar', el).classList.toggle('low', left < 10000);
      if (left <= 0) finish();
    }, 100);
  }
  next();
  return () => { clearTimeout(timeout); clearInterval(timer); document.removeEventListener('keydown', onKey); };
}
