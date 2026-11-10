/* Spelletjes. Elk spel: start(el, ctx) → geeft een opruimfunctie terug.
   ctx = { groep, beep(type), finish(gameKey, score, {lower, label}) → html, confetti() } */
import { fracHTML, nearWrongs, nl, pick, R, shuffle } from './kern.js';

function gameIntro(el, g, extra, onStart) {
  el.innerHTML = `<div class="card game-intro">
    <div class="emoji huge">${g.emoji}</div><h1>${g.title}</h1><p>${g.how}</p>${extra || ''}
    ${extra ? '' : '<button class="btn big primary" data-start>Start!</button>'}</div>`;
  el.querySelectorAll('[data-start]').forEach(b => b.addEventListener('click', () => onStart(b.dataset.start)));
}
function gameOver(el, ctx, key, score, opts, restart) {
  const res = ctx.finish(key, score, opts || {});
  el.innerHTML = `<div class="card game-intro">
    <div class="emoji huge">${res.newHigh ? '🏆' : '🎉'}</div>
    <h1>${res.newHigh ? 'Nieuw record!' : 'Goed gedaan!'}</h1>
    <p class="bigscore">${score} <small>${(opts && opts.label) || 'punten'}</small></p>
    <p>Record: <b>${res.high}</b> · Verdiende sterren: <b>⭐ ${res.stars}</b></p>
    <div class="row"><button class="btn big primary" data-again>Nog een keer</button><a class="btn big" href="#/spellen">Andere spelletjes</a></div></div>`;
  el.querySelector('[data-again]').addEventListener('click', restart);
}
function hud(items) {
  return `<div class="hud">${items.map(([k, v]) => `<div><small>${k}</small><b data-hud="${k}">${v}</b></div>`).join('')}</div>`;
}
const setHud = (el, k, v) => { const n = el.querySelector(`[data-hud="${k}"]`); if (n) n.textContent = v; };

/* Snelle sommen voor spelletjes, aangepast aan de groep */
function quickQ(g) {
  const k = R(0, 9);
  if (g <= 2) { if (k < 6) { const a = R(0, 5), b = R(1, 10 - a > 5 ? 5 : 10 - a); return { q: `${a} + ${b}`, v: a + b }; } const a = R(3, 10), b = R(1, a); return { q: `${a} − ${b}`, v: a - b }; }
  if (g <= 3) { if (k < 5) { const a = R(1, 10), b = R(1, 10); return { q: `${a} + ${b}`, v: a + b }; } const a = R(5, 20), b = R(1, a); return { q: `${a} − ${b}`, v: a - b }; }
  if (g === 4) {
    if (k < 4) { const t = pick([1, 2, 3, 4, 5, 10]), b = R(1, 10); return { q: `${b} × ${t}`, v: b * t }; }
    if (k < 7) { const a = R(10, 80), b = R(1, 99 - a); return { q: `${a} + ${b}`, v: a + b }; }
    const a = R(20, 100), b = R(1, a); return { q: `${a} − ${b}`, v: a - b };
  }
  if (g <= 6) {
    if (k < 5) { const t = R(2, 10), b = R(1, 10); return { q: `${b} × ${t}`, v: b * t }; }
    if (k < 8) { const b = R(2, 10), c = R(1, 10); return { q: `${b * c} : ${b}`, v: c }; }
    const a = R(100, 900), b = R(1, 9) * 10; return { q: `${a} + ${b}`, v: a + b };
  }
  if (k < 3) { const t = R(3, 12), b = R(3, 12); return { q: `${b} × ${t}`, v: b * t }; }
  if (k < 5) { const b = R(3, 12), c = R(2, 12); return { q: `${b * c} : ${b}`, v: c }; }
  if (k < 7) { const p = pick([10, 25, 50]), base = (p === 25 ? 4 : p === 50 ? 2 : 10) * R(2, 15); return { q: `${p}% van ${base}`, v: p * base / 100 }; }
  if (k < 8) { const a = R(2, 12); return { q: `${a}²`, v: a * a }; }
  const a = R(2, 9), b = R(2, 9), c = R(1, 20); return { q: `${c} + ${a} × ${b}`, v: c + a * b };
}

export const GAMES = {
  /* ---------- TAFELRACE ---------- */
  tafelrace: {
    title: 'Tafelrace', desc: 'Hoeveel keersommen kun jij in 60 seconden?', emoji: '🏎️', color: '#FF5A5F',
    how: 'Hoeveel keersommen kun jij goed in 60 seconden? Kies een tafel en scheur weg!',
    start(el, ctx) {
      let timer = null, stopped = false;
      const intro = () => gameIntro(el, this, `<div class="tafelkeuze">${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(t => `<button class="btn" data-start="${t}">${t}</button>`).join('')}<button class="btn primary wide" data-start="mix">Alle tafels door elkaar</button></div>`, play);
      const play = t => {
        let score = 0, end = Date.now() + 60000, busy = false;
        el.innerHTML = `${hud([['Tijd', 60], ['Goed', 0]])}<div class="card qcard"><div class="q big" data-q></div></div><div class="choices four" data-c></div>`;
        const next = () => {
          const a = t === 'mix' ? R(2, 10) : +t, b = R(1, 10), v = a * b;
          el.querySelector('[data-q]').textContent = `${b} × ${a}`;
          const opts = shuffle([v, ...shuffle([...new Set([v + a, v - a, v + 1, v - 1, (b + 1) * (a + 1), v + 10].filter(x => x >= 0 && x !== v))]).slice(0, 3)]);
          const c = el.querySelector('[data-c]');
          c.innerHTML = opts.map(o => `<button class="btn choice" data-v="${o}">${o}</button>`).join('');
          c.querySelectorAll('button').forEach(btn => btn.addEventListener('click', () => {
            if (busy) return; busy = true;
            if (+btn.dataset.v === v) { score++; setHud(el, 'Goed', score); btn.classList.add('ok'); ctx.beep('good'); setTimeout(() => { busy = false; next(); }, 250); }
            else { btn.classList.add('bad'); c.querySelector(`[data-v="${v}"]`).classList.add('ok'); ctx.beep('bad'); setTimeout(() => { busy = false; next(); }, 800); }
          }));
        };
        next();
        timer = setInterval(() => {
          const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
          setHud(el, 'Tijd', left);
          if (left <= 0 && !stopped) { clearInterval(timer); gameOver(el, ctx, 'tafelrace-' + t, score, { label: 'goed' }, intro); if (score >= 20) ctx.confetti(); }
        }, 200);
      };
      intro();
      return () => { stopped = true; clearInterval(timer); };
    }
  },

  /* ---------- BALLONNEN ---------- */
  ballonnen: {
    title: 'Ballonnen knallen', desc: 'Knal de ballon met het goede antwoord!', emoji: '🎈', color: '#2D9CDB',
    how: 'Knal de ballon met het goede antwoord! Pas op: laat het goede antwoord niet wegvliegen. Je hebt 3 levens.',
    start(el, ctx) {
      let raf = null, alive = false;
      const play = () => {
        let score = 0, lives = 3, cur = quickQ(ctx.groep), qid = 0, balloons = [], last = performance.now(), spawnIn = 0, sinceCorrect = 0;
        el.innerHTML = `${hud([['Punten', 0], ['Levens', '❤️❤️❤️']])}<div class="card qcard small"><div class="q" data-q>${cur.q} = ?</div></div><div class="sky" data-sky></div>`;
        const sky = el.querySelector('[data-sky]');
        const H = () => sky.clientHeight;
        const colors = ['#FF5A5F', '#FFB800', '#2BB673', '#2D9CDB', '#6C4CF1', '#E94C89', '#FF8A3D'];
        const lose = () => {
          lives--; setHud(el, 'Levens', '❤️'.repeat(Math.max(lives, 0)) || '💔'); ctx.beep('bad');
          sky.classList.add('shake'); setTimeout(() => sky.classList.remove('shake'), 400);
          if (lives <= 0) { alive = false; cancelAnimationFrame(raf); setTimeout(() => gameOver(el, ctx, 'ballonnen-' + ctx.groep, score, {}, play), 500); }
        };
        const spawn = () => {
          const onScreen = balloons.some(b => b.v === cur.v && b.y > H() * 0.35);
          const correct = !onScreen && (sinceCorrect >= 2 || Math.random() < 0.4);
          let v = cur.v;
          if (!correct) { v = pick(nearWrongs(cur.v, 5)); } else sinceCorrect = -1;
          sinceCorrect++;
          const node = document.createElement('button');
          node.className = 'balloon';
          node.style.setProperty('--c', pick(colors));
          node.style.left = R(2, 78) + '%';
          node.textContent = v;
          const b = { v, y: H() + 10, node, popped: false, qid: correct ? qid : -1 };
          node.addEventListener('pointerdown', e => {
            e.preventDefault();
            if (!alive || b.popped) return;
            if (b.v === cur.v) {
              b.popped = true; node.classList.add('pop'); score++; setHud(el, 'Punten', score); ctx.beep('good');
              setTimeout(() => node.remove(), 250); balloons = balloons.filter(x => x !== b);
              cur = quickQ(ctx.groep); qid++; el.querySelector('[data-q]').textContent = `${cur.q} = ?`; sinceCorrect = 2;
            } else { node.classList.add('wrong'); setTimeout(() => node.classList.remove('wrong'), 300); lose(); }
          });
          sky.appendChild(node); balloons.push(b);
        };
        const loop = now => {
          if (!alive) return;
          const dt = Math.min(0.05, (now - last) / 1000); last = now;
          const speed = H() * (0.13 + Math.min(score, 30) * 0.008);
          spawnIn -= dt;
          if (spawnIn <= 0) { spawn(); spawnIn = Math.max(0.55, 1.3 - score * 0.03); }
          for (const b of balloons.slice()) {
            b.y -= speed * dt;
            b.node.style.transform = `translateY(${b.y}px)`;
            if (b.y < -90) {
              b.node.remove(); balloons = balloons.filter(x => x !== b);
              if (b.qid === qid && !b.popped) lose();
            }
          }
          raf = requestAnimationFrame(loop);
        };
        alive = true; raf = requestAnimationFrame(loop);
      };
      gameIntro(el, this, '', play);
      return () => { alive = false; cancelAnimationFrame(raf); };
    }
  },

  /* ---------- MEMORY ---------- */
  memory: {
    title: 'Sommen-memory', desc: 'Zoek de som en het antwoord die bij elkaar horen.', emoji: '🃏', color: '#2BB673',
    how: 'Zoek steeds de som en het antwoord dat erbij hoort. Lukt het met zo min mogelijk beurten?',
    start(el, ctx) {
      let timer = null;
      const play = () => {
        const pairs = [], seen = new Set();
        while (pairs.length < 6) { const q = quickQ(ctx.groep); if (!seen.has(q.v)) { seen.add(q.v); pairs.push(q); } }
        const cards = shuffle(pairs.flatMap((p, i) => [{ i, t: p.q, kind: 'q' }, { i, t: String(p.v), kind: 'a' }]));
        let open = [], moves = 0, found = 0, t0 = Date.now(), lock = false;
        el.innerHTML = `${hud([['Beurten', 0], ['Tijd', '0:00']])}<div class="memory">${cards.map((c, k) => `<button class="mcard ${c.kind}" data-k="${k}" aria-label="kaart"><span class="back">?</span><span class="front">${c.t}</span></button>`).join('')}</div>`;
        timer = setInterval(() => { const s = Math.floor((Date.now() - t0) / 1000); setHud(el, 'Tijd', `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`); }, 500);
        el.querySelectorAll('.mcard').forEach(btn => btn.addEventListener('click', () => {
          const k = +btn.dataset.k;
          if (lock || btn.classList.contains('flip') || btn.classList.contains('done')) return;
          btn.classList.add('flip'); open.push([k, btn]);
          if (open.length === 2) {
            moves++; setHud(el, 'Beurten', moves);
            const [[k1, b1], [k2, b2]] = open; open = [];
            if (cards[k1].i === cards[k2].i) {
              ctx.beep('good'); b1.classList.add('done'); b2.classList.add('done'); found++;
              if (found === 6) { clearInterval(timer); setTimeout(() => { ctx.confetti(); gameOver(el, ctx, 'memory-' + ctx.groep, moves, { lower: true, label: 'beurten' }, play); }, 700); }
            } else { lock = true; setTimeout(() => { b1.classList.remove('flip'); b2.classList.remove('flip'); lock = false; }, 900); }
          }
        }));
      };
      gameIntro(el, this, '', play);
      return () => clearInterval(timer);
    }
  },

  /* ---------- GROTER OF KLEINER ---------- */
  vergelijk: {
    title: 'Groter of kleiner?', desc: 'Kies &lt;, = of &gt; — zo snel als je kunt!', emoji: '🐊', color: '#FFB800',
    how: 'Welke kant is groter? Kies &lt;, = of &gt;. De krokodil eet altijd het grootste! Je hebt 45 seconden.',
    start(el, ctx) {
      let timer = null;
      const play = () => {
        let score = 0, end = Date.now() + 45000, L, Rr, busy = false;
        el.innerHTML = `${hud([['Tijd', 45], ['Goed', 0]])}
          <div class="vergelijk"><div class="card side" data-l></div><div class="card side mid" data-m>?</div><div class="card side" data-r></div></div>
          <div class="choices three">${['<', '=', '>'].map(s => `<button class="btn choice sym" data-s="${s}">${s}</button>`).join('')}</div>`;
        const next = () => {
          L = quickQ(ctx.groep);
          if (Math.random() < 0.3 && L.v > 1) { const a = R(1, L.v - 1); Rr = { q: `${a} + ${L.v - a}`, v: L.v }; } else Rr = quickQ(ctx.groep);
          if (Math.random() < 0.5) [L, Rr] = [Rr, L];
          el.querySelector('[data-l]').textContent = L.q; el.querySelector('[data-r]').textContent = Rr.q;
          el.querySelector('[data-m]').textContent = '?';
        };
        el.querySelectorAll('[data-s]').forEach(b => b.addEventListener('click', () => {
          if (busy) return;
          const good = L.v < Rr.v ? '<' : L.v > Rr.v ? '>' : '=';
          const m = el.querySelector('[data-m]');
          m.innerHTML = `<small>${L.v}</small> ${good} <small>${Rr.v}</small>`;
          if (b.dataset.s === good) { score++; setHud(el, 'Goed', score); ctx.beep('good'); m.className = 'card side mid ok'; busy = true; setTimeout(() => { busy = false; m.className = 'card side mid'; next(); }, 450); }
          else { ctx.beep('bad'); m.className = 'card side mid bad'; busy = true; setTimeout(() => { busy = false; m.className = 'card side mid'; next(); }, 1300); }
        }));
        next();
        timer = setInterval(() => {
          const left = Math.max(0, Math.ceil((end - Date.now()) / 1000));
          setHud(el, 'Tijd', left);
          if (left <= 0) { clearInterval(timer); gameOver(el, ctx, 'vergelijk-' + ctx.groep, score, { label: 'goed' }, play); }
        }, 200);
      };
      gameIntro(el, this, '', play);
      return () => clearInterval(timer);
    }
  },

  /* ---------- GETALLENLIJN ---------- */
  getallenlijn: {
    title: 'Getallenlijn', desc: 'Tik precies waar het getal op de lijn hoort.', emoji: '📏', color: '#6C4CF1',
    how: 'Waar hoort het getal op de getallenlijn? Tik zo precies mogelijk. 8 rondes, max 100 punten per ronde.',
    start(el, ctx) {
      let to = null;
      const range = g => {
        if (g <= 2) return { min: 0, max: 10, gen: () => { const v = R(1, 9); return { t: String(v), v }; } };
        if (g <= 3) return { min: 0, max: 20, gen: () => { const v = R(1, 19); return { t: String(v), v }; } };
        if (g === 4) return { min: 0, max: 100, gen: () => { const v = R(1, 99); return { t: String(v), v }; } };
        if (g === 5) return { min: 0, max: 1000, gen: () => { const v = R(1, 99) * 10; return { t: String(v), v }; } };
        if (g === 6) return { min: 0, max: 10, gen: () => { const v = R(1, 99) / 10; return { t: nl(v), v }; } };
        return { min: 0, max: 1, gen: () => pick([
          () => { const v = R(1, 99) / 100; return { t: nl(v), v }; },
          () => { const d = pick([2, 3, 4, 5, 8, 10]), n = R(1, d - 1); return { t: fracHTML(`${n}/${d}`), v: n / d }; },
          () => { const p = R(1, 19) * 5; return { t: p + '%', v: p / 100 }; }
        ])() };
      };
      const play = () => {
        const rg = range(ctx.groep);
        let round = 0, total = 0, cur, done = false;
        const lbl = x => rg.max === 1 ? nl(x) : nl(x);
        el.innerHTML = `${hud([['Ronde', '1/8'], ['Punten', 0]])}
          <div class="card qcard"><div class="q">Waar ligt <b data-t></b>?</div><div class="feedback" data-f>&nbsp;</div></div>
          <div class="nline" data-line><div class="track"></div>
          ${[0, 0.25, 0.5, 0.75, 1].map(p => `<div class="tick ${p === 0 || p === 1 ? 'end' : ''}" style="left:${p * 100}%"><span>${p === 0 || p === 1 || ctx.groep <= 4 ? lbl(rg.min + p * (rg.max - rg.min)) : ''}</span></div>`).join('')}
          <div class="marker guess" data-g hidden>▼</div><div class="marker real" data-r hidden>🚩</div></div>`;
        const line = el.querySelector('[data-line]');
        const next = () => {
          if (round >= 8) return gameOver(el, ctx, 'getallenlijn-' + ctx.groep, total, {}, play);
          cur = rg.gen(); done = false; round++;
          setHud(el, 'Ronde', `${round}/8`);
          el.querySelector('[data-t]').innerHTML = cur.t;
          el.querySelector('[data-f]').innerHTML = '&nbsp;';
          el.querySelector('[data-g]').hidden = true; el.querySelector('[data-r]').hidden = true;
        };
        line.addEventListener('pointerdown', e => {
          if (done) return; done = true;
          const r = line.getBoundingClientRect(), p = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
          const guess = rg.min + p * (rg.max - rg.min), err = Math.abs(guess - cur.v) / (rg.max - rg.min);
          const pts = Math.max(0, Math.round(100 - err * 500));
          total += pts; setHud(el, 'Punten', total);
          const g = el.querySelector('[data-g]'), rl = el.querySelector('[data-r]');
          g.style.left = p * 100 + '%'; g.hidden = false;
          rl.style.left = (cur.v - rg.min) / (rg.max - rg.min) * 100 + '%'; rl.hidden = false;
          el.querySelector('[data-f]').innerHTML = pts >= 90 ? `🎯 Super precies! +${pts}` : pts >= 60 ? `👍 Dichtbij! +${pts}` : `De vlag laat zien waar het hoort. +${pts}`;
          ctx.beep(pts >= 60 ? 'good' : 'bad');
          to = setTimeout(next, 1600);
        });
        next();
      };
      gameIntro(el, this, '', play);
      return () => clearTimeout(to);
    }
  }
};
