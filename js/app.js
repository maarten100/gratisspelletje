/* App: routes en schermen. Dit is het startpunt dat index.html laadt. */
import './oefeningen.js';   // eerst alle oefeningen registreren
import { NAAM, LOGO } from './config.js';
import { CAT, CATS, DOMAINS, EX, fracHTML, GROEPEN, nl, pick } from './kern.js';
import { KOPPELINGEN } from './koppelingen.js';
import { GAMES } from './spellen.js';
import { $, $$, beep, confetti, esc, fr, updateTop } from './scherm.js';
import { S, save, wisVoortgang } from './opslag.js';
import { addStars, gradeStars, inGroep, mastery, starStr, today, touchDay } from './voortgang.js';
import { runSession } from './speler.js';

const app = $('#app');
const AVATARS = ['🦊', '🐼', '🦁', '🐸', '🐙', '🦄', '🐯', '🐵', '🐧', '🐢', '🚀', '🤖'];

$('#sound').addEventListener('click', () => { S.sound = !S.sound; save(); updateTop(); beep('tap'); });
$('#back').addEventListener('click', () => { if (history.length > 1) history.back(); else location.hash = '#/'; });

/* ---------- router ---------- */
let cleanup = null;
function route() {
  if (cleanup) { cleanup(); cleanup = null; }
  const [path, qs] = (location.hash.slice(1) || '/').split('?');
  const params = new URLSearchParams(qs || '');
  const parts = path.split('/').filter(Boolean).map(decodeURIComponent);
  const view = parts[0];
  document.body.dataset.view = view || 'home';
  $('#back').hidden = !view;
  if (!S.profile && view !== 'profiel') return viewProfile(true);
  touchDay();
  const views = {
    oefenen: viewMenu, cat: viewCat, sessie: viewSessie, methoden: viewMethoden, koppeling: viewKoppeling,
    spellen: viewSpellen, spel: viewSpel, voortgang: viewVoortgang, profiel: () => viewProfile(false), ouders: viewOuders
  };
  (views[view] || viewHome)(parts.slice(1), params);
  updateTop();
  window.scrollTo(0, 0);
  app.focus({ preventScroll: true });
}
window.addEventListener('hashchange', route);
const sessionURL = (mode, ids, title, back) => `#/sessie/${mode}?ex=${encodeURIComponent(ids.join(','))}&t=${encodeURIComponent(title)}${back ? '&b=' + encodeURIComponent(back) : ''}`;

/* ---------- home ---------- */
function viewHome() {
  const p = S.profile, g = p.groep;
  const mine = p.methode && KOPPELINGEN.find(k => k.id === p.methode);
  const tiles = [
    ['oefenen', '📚', 'Oefenen', 'Alle onderwerpen per groep', 't1'],
    [mine ? `koppeling/${mine.id}?g=${g}` : 'methoden', '🏫', mine ? mine.short || mine.title : 'Mijn rekenmethode', mine ? `Groep ${g} · per blok` : 'Oefen per blok van je methode', 't3'],
    ['methoden?s=toetsen', '📝', 'Toetstraining', 'Cito LIB & IEP', 't4'],
    ['spellen', '🎮', 'Spelletjes', 'Reken je rot!', 't2'],
    ['voortgang', '🏆', 'Mijn voortgang', `${S.stars} sterren verdiend`, 't5']
  ];
  const recent = S.history.slice(0, 1)[0];
  app.innerHTML = `
    <section class="hero">
      <div class="avatar">${p.avatar}</div>
      <div><h1>Hoi ${esc(p.name)}!</h1>
      <p>Groep ${g} · ${S.streak > 1 ? `🔥 ${S.streak} dagen op rij aan het rekenen!` : 'Klaar om te rekenen?'}</p></div>
    </section>
    <div class="tiles">${tiles.map(([h, e, t, s, c]) => `<a class="tile ${c}" href="#/${h}"><span class="emoji">${e}</span><b>${esc(t)}</b><small>${s}</small></a>`).join('')}</div>
    ${recent ? `<p class="recent">Laatste toets: <b>${esc(recent.title)}</b> · ${recent.score}/${recent.total} · cijfer ${nl(recent.cijfer)}</p>` : ''}
    <div id="install"></div>
    <p class="foot"><a href="#/profiel">Profiel wijzigen</a> · <a href="#/ouders">Voor ouders &amp; leerkrachten</a></p>`;
  renderInstall();
}

/* ---------- oefenmenu ---------- */
function groepChips(active, href) {
  return `<nav class="tabs" aria-label="Kies groep"><a href="${href(0)}" class="tab ${!active ? 'on' : ''}">Alle groepen</a>${GROEPEN.map(g => `<a href="${href(g)}" class="tab g${g} ${g === active ? 'on' : ''}">Groep ${g}</a>`).join('')}</nav>`;
}
function catProgress(cat, g) {
  const ids = cat.subs.filter(s => inGroep(s.groups, g)).flatMap(s => s.ex.map(e => e.fullId));
  const m = ids.filter(id => mastery(id) === 2).length, b = ids.filter(id => mastery(id) === 1).length;
  return { total: ids.length, m, b };
}
function viewMenu(_, params) {
  const g = params.has('g') ? +params.get('g') : (S.filter ?? S.profile.groep);
  S.filter = g; save();
  app.innerHTML = `<h1>Wat wil je oefenen?</h1>${groepChips(g, x => `#/oefenen?g=${x}`)}
    <div class="domains">${DOMAINS.map(d => {
      const cats = CATS.filter(c => c.domain === d.id && inGroep(c.groups, g));
      if (!cats.length) return '';
      return `<section class="domain d-${d.id}"><h2>${d.emoji} ${d.title}</h2><div class="cats">${cats.map(c => {
        const p = catProgress(c, g);
        return `<a class="catcard" href="#/cat/${c.id}?g=${g}"><span class="emoji">${c.emoji}</span><span class="tt"><b>${c.title}</b>
          <span class="mbar" title="${p.m} van ${p.total} beheerst"><i style="width:${p.total ? p.m / p.total * 100 : 0}%"></i><i class="b" style="width:${p.total ? p.b / p.total * 100 : 0}%"></i></span></span>${c.timed ? '<span class="clockbadge" title="Ook op tijd">⏱</span>' : ''}</a>`;
      }).join('')}</div></section>`;
    }).join('')}</div>
    <p class="foot">Groene balk = beheerst · gele balk = mee bezig</p>`;
}

/* ---------- categorie: uitleg + oefeningen aanvinken ---------- */
function viewCat([id], params) {
  const cat = CAT[id];
  if (!cat) return viewMenu([], params);
  const g = params.has('g') ? +params.get('g') : (S.filter ?? S.profile.groep);
  const subs = cat.subs.filter(s => inGroep(s.groups, g));
  const shown = subs.length ? subs : cat.subs;
  const mIcon = id => ['', '<span class="mi b" title="Mee bezig">●</span>', '<span class="mi m" title="Beheerst">✔</span>'][mastery(id)];
  app.innerHTML = `<div class="crumb"><a href="#/oefenen?g=${g}">${DOMAINS.find(d => d.id === cat.domain).title}</a></div>
    <h1><span class="emoji">${cat.emoji}</span> ${cat.title}</h1>
    <details class="card uitleg" ${S.ex[shown[0].ex[0].fullId] ? '' : 'open'}><summary>💡 Uitleg</summary><div>${cat.uitleg}</div></details>
    ${!subs.length ? `<p class="note">Dit onderwerp hoort niet bij groep ${g}. Je ziet alle niveaus.</p>` : ''}
    <form id="sel" class="subs">${shown.map(s => `
      <fieldset class="card sub">
        <legend><b>${s.title}</b> <small>groep ${s.groups.join(', ')}</small></legend>
        <div class="subtools"><button type="button" class="link" data-all="${s.id}">Alles aanvinken</button>
          <a class="btn small primary" href="${sessionURL('oefen', s.ex.map(e => e.fullId), `${cat.title} – ${s.title}`, location.hash)}">▶ Oefen alles</a></div>
        ${s.ex.map(e => `<label class="exrow"><input type="checkbox" name="ex" value="${e.fullId}" data-sub="${s.id}"><span class="exname">${esc(e.name)}</span><span class="exex">${fracHTML(esc(e.example || ''))}</span>${mIcon(e.fullId)}</label>`).join('')}
      </fieldset>`).join('')}
    </form>
    <div class="actionbar"><span id="selcount">Kies oefeningen</span>
      <button class="btn primary" data-mode="oefen" disabled>✏️ Oefenen</button>
      ${cat.timed ? '<button class="btn accent" data-mode="tijd" disabled>⏱ Op tijd</button>' : ''}
      <button class="btn" data-mode="toets" disabled>📝 Toets</button></div>`;
  const form = $('#sel');
  const update = () => {
    const n = $$('input[name=ex]:checked', form).length;
    $('#selcount').textContent = n ? `${n} gekozen` : 'Kies oefeningen';
    $$('.actionbar button').forEach(b => { b.disabled = !n; });
  };
  form.addEventListener('change', update);
  $$('[data-all]').forEach(b => b.addEventListener('click', () => {
    const boxes = $$(`input[data-sub="${b.dataset.all}"]`, form), all = boxes.every(x => x.checked);
    boxes.forEach(x => { x.checked = !all; }); b.textContent = all ? 'Alles aanvinken' : 'Alles uitvinken'; update();
  }));
  $$('.actionbar button').forEach(b => b.addEventListener('click', () => {
    const ids = $$('input[name=ex]:checked', form).map(x => x.value);
    const subs1 = [...new Set(ids.map(x => EX[x].sub.title))];
    const title = ids.length === 1 ? `${cat.title} – ${EX[ids[0]].name}` : subs1.length === 1 ? `${cat.title} – ${subs1[0]}` : cat.title;
    location.hash = sessionURL(b.dataset.mode, ids, title, location.hash);
  }));
}

/* ---------- methoden & toetsen ---------- */
function viewMethoden(_, params) {
  const card = k => `<a class="method" href="#/koppeling/${k.id}?g=${S.profile.groep}" style="--c:${k.color}"><span class="emoji">${k.emoji}</span><b>${k.title}</b><small>${k.desc}</small>${S.profile.methode === k.id ? '<span class="badge">Mijn methode</span>' : ''}</a>`;
  app.innerHTML = `<h1>Methode & toetsen</h1>
    <h2>🏫 Rekenmethodes</h2><p>Oefen precies wat er in jouw blok aan bod komt.</p>
    <div class="methods">${KOPPELINGEN.filter(k => k.kind === 'methode').map(card).join('')}</div>
    <h2 id="toetsen">📝 Toetstraining</h2><p>Oefen de onderdelen van de toetsen op school.</p>
    <div class="methods">${KOPPELINGEN.filter(k => k.kind === 'toets').map(card).join('')}</div>`;
  if (params && params.get('s') === 'toetsen') setTimeout(() => $('#toetsen').scrollIntoView({ behavior: 'smooth' }), 50);
}
function viewKoppeling([id], params) {
  const k = KOPPELINGEN.find(x => x.id === id);
  if (!k) return viewMethoden();
  const groepen = [...new Set(k.sections.map(s => s.groep))];
  let g = +params.get('g');
  if (!groepen.includes(g)) g = groepen.includes(S.profile.groep) ? S.profile.groep : groepen[0];
  const secs = k.sections.filter(s => s.groep === g);
  app.innerHTML = `<div class="crumb"><a href="#/methoden">Methode & toetsen</a></div>
    <h1><span class="emoji">${k.emoji}</span> ${k.title}</h1>
    <nav class="tabs">${groepen.map(x => `<a href="#/koppeling/${id}?g=${x}" class="tab g${x} ${x === g ? 'on' : ''}">Groep ${x}</a>`).join('')}</nav>
    ${k.note ? `<p class="note">${k.note}</p>` : ''}
    <div class="blokken">${secs.map((s, i) => {
      const ids = [...new Set(s.items.flatMap(it => it.ids))];
      const title = `${k.short || k.title} groep ${g} – ${s.title}`;
      const done = ids.filter(x => mastery(x) === 2).length;
      const best = S.tests[title];
      return `<details class="card blok" ${i === 0 ? 'open' : ''}><summary><b>${s.title}</b><span class="mbar small"><i style="width:${ids.length ? done / ids.length * 100 : 0}%"></i></span>${best != null ? `<small>toets ${best}/10</small>` : ''}</summary>
        <ul class="items">${s.items.map(it => `<li><a href="${sessionURL('oefen', it.ids, it.label, location.hash)}">${esc(it.label)}</a>${it.ids.every(x => mastery(x) === 2) ? '<span class="mi m">✔</span>' : ''}</li>`).join('')}</ul>
        <div class="row left"><a class="btn small primary" href="${sessionURL('oefen', ids, title, location.hash)}">✏️ Oefen alles</a><a class="btn small accent" href="${sessionURL('toets', ids, title, location.hash)}">📝 Toets</a></div></details>`;
    }).join('')}</div>`;
}

/* ---------- sessie ---------- */
function viewSessie([mode], params) {
  const ids = (params.get('ex') || '').split(',').filter(x => EX[x]);
  const title = params.get('t') || 'Oefenen';
  const back = params.get('b') || '#/oefenen';
  if (!ids.length) { app.innerHTML = '<div class="card result"><h1>Oeps</h1><p>Deze oefening bestaat niet (meer).</p><a class="btn primary" href="#/oefenen">Naar oefenen</a></div>'; return; }
  if (!['oefen', 'toets', 'tijd'].includes(mode)) mode = 'oefen';
  const total = mode === 'toets' ? (ids.length > 6 ? 20 : 10) : mode === 'tijd' ? Infinity : 10;
  const goal = 15, sec = 60;
  const intro = () => {
    app.innerHTML = `<div class="card result"><div class="emoji huge">${{ oefen: '✏️', toets: '📝', tijd: '⏱' }[mode]}</div>
      <h1>${{ oefen: 'Oefenen', toets: 'Toets', tijd: 'Op tijd' }[mode]}: ${esc(title)}</h1>
      <p>${{ oefen: '10 sommen. Na een fout krijg je een hulpje.', toets: `${total} vragen. Je ziet pas aan het eind wat je goed had. Neem rustig de tijd!`, tijd: `Hoeveel sommen maak jij goed in ${sec} seconden? Doel: ${goal} goed.` }[mode]}</p>
      <p class="small muted">${ids.length === 1 ? esc(EX[ids[0]].name) : `${ids.length} soorten sommen door elkaar`}</p>
      <button class="btn big primary" id="start">Start!</button></div>`;
    $('#start').addEventListener('click', go);
  };
  const go = () => {
    const t0 = Date.now();
    cleanup = runSession(app, { title, ids, mode, total, sec, onFinish: r => finish(r, Math.round((Date.now() - t0) / 1000)) });
  };
  const finish = (r, secs) => {
    const key = title;
    let html;
    if (mode === 'oefen') {
      S.counts.practice++; addStars(r.correct); save();
      if (r.correct === r.total) { beep('win'); confetti(); }
      html = `<div class="emoji huge">${r.correct >= 8 ? '🌟' : r.correct >= 5 ? '👍' : '💪'}</div>
        <h1>${r.correct >= 8 ? 'Super gedaan!' : r.correct >= 5 ? 'Goed bezig!' : 'Blijven oefenen!'}</h1>
        <p class="bigscore">${r.correct}/${r.total} <small>in één keer goed</small></p><p>Je verdiende <b>⭐ ${r.correct}</b> sterren.</p>`;
    } else if (mode === 'tijd') {
      S.counts.timed++;
      const prev = S.timed[key] || 0, newHigh = r.correct > prev;
      if (newHigh) S.timed[key] = r.correct;
      addStars(Math.ceil(r.correct / 2)); save();
      if (r.correct >= goal) { beep('win'); confetti(); }
      html = `<div class="emoji huge">${r.correct >= goal ? '🏆' : '⏱'}</div><h1>${r.correct >= goal ? 'Doel gehaald!' : 'Tijd is om!'}</h1>
        <p class="bigscore">${r.correct} <small>goed in ${sec} sec</small></p>
        <p>${r.wrong} fout · Doel: ${goal} · Record: <b>${Math.max(prev, r.correct)}</b>${newHigh && prev ? ' · <b>Nieuw record!</b>' : ''}</p>`;
    } else {
      const score = r.correct, cijfer = Math.max(1, Math.round((1 + 9 * score / r.total) * 10) / 10), norm = Math.round(score / r.total * 10);
      const prev = S.tests[key];
      S.tests[key] = Math.max(prev || 0, norm);
      S.counts.tests++; if (score === r.total) S.counts.perfect++;
      S.history.unshift({ title, score, total: r.total, cijfer, date: today(), sec: secs });
      S.history = S.history.slice(0, 50);
      addStars(score); save();
      if (score === r.total) { beep('win'); confetti(); } else if (norm >= 8) beep('win');
      const wrong = r.items.filter(x => !x.ok);
      html = `<div class="emoji huge">${norm >= 10 ? '🏆' : norm >= 8 ? '🌟' : norm >= 6 ? '👍' : '💪'}</div>
        <h1>${norm >= 8 ? 'Geweldig!' : norm >= 6 ? 'Voldoende, goed zo!' : 'Nog even oefenen'}</h1>
        <p class="bigscore">${score}/${r.total}</p>
        <p class="cijfer">Cijfer: <b>${nl(cijfer)}</b> · ${starStr(gradeStars(norm))}${prev != null && norm > prev ? ' · <b>Nieuw record!</b>' : ''}</p>
        <p>Je verdiende <b>⭐ ${score}</b> sterren.</p>
        ${wrong.length ? `<h2>Even nakijken</h2><ul class="review">${wrong.map(x => `<li>${x.vis ? `<div class="rvis">${x.vis.replace(/\{\{\d+\}\}/g, '…')}</div>` : ''}<span class="rq">${fr(x.q.replace(/\{\{\d+\}\}/g, '…'), x)}</span><span class="ra">Jij: <s>${x.given ? fr(esc(x.given), x) : '–'}</s> · Goed: <b>${fr(x.a, x)}</b></span><small>💡 ${x.hint}</small></li>`).join('')}</ul>` : '<p>Alles goed! Je bent een rekenkanjer! 🚀</p>'}`;
    }
    app.innerHTML = `<div class="card result">${html}
      <div class="row"><button class="btn big primary" id="again">${mode === 'toets' ? 'Toets opnieuw' : 'Nog een keer'}</button>
      ${mode !== 'oefen' ? `<a class="btn big" href="${sessionURL('oefen', ids, title, back)}">✏️ Oefenen</a>` : `<a class="btn big accent" href="${sessionURL('toets', ids, title, back)}">📝 Toets maken</a>`}
      <a class="btn big" href="${esc(back)}">Terug</a></div></div>`;
    $('#again').addEventListener('click', mode === 'oefen' ? go : intro);
  };
  if (mode === 'oefen') go(); else intro();
}

/* ---------- spelletjes ---------- */
function viewSpellen() {
  app.innerHTML = `<h1>Spelletjes 🎮</h1><p>De spelletjes passen zich aan bij <b>groep ${S.profile.groep}</b>. <a href="#/profiel">Wijzigen</a></p>
    <div class="games">${Object.entries(GAMES).map(([id, g]) => {
      const highs = Object.entries(S.games).filter(([k]) => k.startsWith(id + '-')).map(([, v]) => v.high);
      return `<a class="game" href="#/spel/${id}" style="--c:${g.color}"><span class="emoji">${g.emoji}</span><b>${g.title}</b><small>${g.desc}</small>${highs.length ? `<span class="badge">🏆 ${id === 'memory' ? Math.min(...highs) + ' beurten' : Math.max(...highs)}</span>` : ''}</a>`;
    }).join('')}</div>`;
}
function viewSpel([id]) {
  const g = GAMES[id];
  if (!g) return viewSpellen();
  app.innerHTML = '<div class="game-wrap"></div>';
  const ctx = {
    groep: S.profile.groep, beep, confetti,
    finish(key, score, { lower }) {
      const rec = S.games[key] = S.games[key] || { plays: 0 };
      const newHigh = rec.high == null || (lower ? score < rec.high : score > rec.high);
      if (newHigh) rec.high = score;
      rec.plays++; S.counts.games++;
      const stars = lower ? Math.max(1, 16 - score) : Math.ceil(score / (key.startsWith('getallenlijn') ? 100 : 3));
      addStars(stars); save();
      if (newHigh && rec.plays > 1) beep('win');
      return { newHigh: newHigh && rec.plays > 1, high: rec.high, stars };
    }
  };
  cleanup = g.start($('.game-wrap'), ctx);
}

/* ---------- voortgang ---------- */
function badges() {
  const g = S.profile.groep;
  const own = Object.values(EX).filter(e => e.groups.includes(g));
  const mastered = Object.keys(EX).filter(id => mastery(id) === 2).length;
  const gamesPlayed = new Set(Object.keys(S.games).map(k => k.split('-')[0])).size;
  const domainsDone = DOMAINS.filter(d => Object.values(EX).some(e => e.cat.domain === d.id && mastery(e.id) === 2)).length;
  return [
    ['👣', 'Eerste stap', 'Eén keer geoefend', S.counts.practice >= 1],
    ['📝', 'Toetsheld', 'Je eerste toets gemaakt', S.counts.tests >= 1],
    ['💯', 'Foutloos', 'Een toets helemaal goed', S.counts.perfect >= 1],
    ['⏱', 'Snelle rekenaar', 'Een keer op tijd geoefend', S.counts.timed >= 1],
    ['✔', 'Kenner', '10 soorten sommen beheerst', mastered >= 10],
    ['🧠', 'Rekenbaas', '50 soorten sommen beheerst', mastered >= 50],
    ['🌈', 'Allrounder', 'In alle 5 domeinen iets beheerst', domainsDone >= 5],
    ['⭐', 'Sterrenvanger', '100 sterren verdiend', S.stars >= 100],
    ['🌌', 'Sterrenkoning', '1000 sterren verdiend', S.stars >= 1000],
    ['🔥', 'Volhouder', '3 dagen op rij gerekend', S.streak >= 3],
    ['🗓️', 'Weekkampioen', '7 dagen op rij gerekend', S.streak >= 7],
    ['🎮', 'Spelletjesfan', 'Alle 5 spelletjes gespeeld', gamesPlayed >= 5],
    ['🚀', 'Rekenraket', `Alles van groep ${g} beheerst`, own.length > 0 && own.every(e => mastery(e.id) === 2)]
  ];
}
function viewVoortgang() {
  const b = badges(), g = S.profile.groep;
  app.innerHTML = `<h1>Mijn voortgang 🏆</h1>
    <div class="stats"><div class="card stat"><b>⭐ ${S.stars}</b><small>sterren</small></div><div class="card stat"><b>🔥 ${S.streak}</b><small>dagen op rij</small></div>
    <div class="card stat"><b>✔ ${Object.keys(EX).filter(id => mastery(id) === 2).length}</b><small>beheerst</small></div><div class="card stat"><b>📝 ${S.counts.tests}</b><small>toetsen</small></div></div>
    <h2>Badges (${b.filter(x => x[3]).length}/${b.length})</h2>
    <div class="badges">${b.map(([e, t, d, ok]) => `<div class="card bdg ${ok ? 'on' : ''}" title="${d}"><span class="emoji">${ok ? e : '🔒'}</span><b>${t}</b><small>${d}</small></div>`).join('')}</div>
    <h2>Onderwerpen groep ${g}</h2>
    ${DOMAINS.map(d => {
      const cats = CATS.filter(c => c.domain === d.id && inGroep(c.groups, g));
      if (!cats.length) return '';
      return `<details class="card prog"><summary>${d.emoji} ${d.title}</summary><ul>${cats.map(c => {
        const p = catProgress(c, g);
        return `<li><a href="#/cat/${c.id}?g=${g}">${c.emoji} ${c.title}</a><span class="mbar"><i style="width:${p.total ? p.m / p.total * 100 : 0}%"></i><i class="b" style="width:${p.total ? p.b / p.total * 100 : 0}%"></i></span><span>${p.m}/${p.total}</span></li>`;
      }).join('')}</ul></details>`;
    }).join('')}
    <h2>Laatste toetsen</h2>
    ${S.history.length ? `<div class="card"><table class="hist"><tr><th>Datum</th><th>Toets</th><th>Score</th><th>Cijfer</th></tr>${S.history.slice(0, 20).map(h => `<tr><td>${h.date.split('-').reverse().join('-')}</td><td>${esc(h.title)}</td><td>${h.score}/${h.total}</td><td>${nl(h.cijfer)}</td></tr>`).join('')}</table></div>` : '<p>Nog geen toetsen gemaakt.</p>'}`;
}

/* ---------- profiel ---------- */
function viewProfile(first) {
  const p = S.profile || { name: '', groep: 5, avatar: pick(AVATARS), methode: '' };
  $('#back').hidden = first;
  const methods = KOPPELINGEN.filter(k => k.kind === 'methode');
  app.innerHTML = `<div class="card profile">
    ${first ? '<div class="emoji huge">🚀</div><h1>Welkom bij ${NAAM}</h1><p>Oefen alles van rekenen in groep 1 tot en met 8: uitleg, oefenen, toetsen en spelletjes.</p>' : '<h1>Mijn profiel</h1>'}
    <form id="pf">
      <label>Hoe heet je?<input name="name" maxlength="20" required autocomplete="off" value="${esc(p.name)}" placeholder="Je voornaam"></label>
      <fieldset><legend>In welke groep zit je?</legend><div class="grp">${GROEPEN.map(g => `<label class="g${g}"><input type="radio" name="groep" value="${g}" ${g === p.groep ? 'checked' : ''}><span>${g}</span></label>`).join('')}</div></fieldset>
      <label>Welke rekenmethode gebruikt je school? <small class="muted">(mag je overslaan)</small>
        <select name="methode"><option value="">Weet ik niet / geen</option>${methods.map(m => `<option value="${m.id}" ${p.methode === m.id ? 'selected' : ''}>${m.title}</option>`).join('')}</select></label>
      <fieldset><legend>Kies je maatje</legend><div class="av">${AVATARS.map(a => `<label><input type="radio" name="avatar" value="${a}" ${a === p.avatar ? 'checked' : ''}><span>${a}</span></label>`).join('')}</div></fieldset>
      <button class="btn big primary" type="submit">${first ? 'Beginnen! 🚀' : 'Opslaan'}</button>
    </form>
    ${first ? '' : '<hr><button class="btn danger" id="reset">Alle voortgang wissen</button>'}</div>`;
  $('#pf').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target);
    const groep = +f.get('groep');
    if (S.profile && S.profile.groep !== groep) S.filter = groep;
    S.profile = { name: String(f.get('name')).trim().slice(0, 20) || 'Rekenaar', groep, avatar: f.get('avatar'), methode: f.get('methode') || '' };
    if (S.filter == null) S.filter = groep;
    save(); beep('good');
    if (location.hash === '#/' || !location.hash) route(); else location.hash = '#/';
  });
  const r = $('#reset');
  if (r) r.addEventListener('click', () => {
    if (r.dataset.sure) { wisVoortgang(); location.hash = '#/'; return; }
    r.dataset.sure = '1';
    r.textContent = 'Zeker weten? Tik nog een keer om alles te wissen';
    setTimeout(() => { delete r.dataset.sure; r.textContent = 'Alle voortgang wissen'; }, 5000);
  });
}

function viewOuders() {
  const n = Object.keys(EX).length;
  app.innerHTML = `<h1>Voor ouders & leerkrachten</h1>
    <article class="card uitleg"><h2>Wat is ${NAAM}</h2>
    <p>${NAAM} is een gratis oefenapp voor rekenen in groep 1 tot en met 8, met ${n} soorten oefeningen in ${CATS.length} onderwerpen, verdeeld over de domeinen ${DOMAINS.map(d => d.title.toLowerCase()).join(', ')}.</p>
    <ul><li><b>Oefenen</b>: kies een of meer soorten sommen. Na een fout volgt een hulpje.</li>
    <li><b>Op tijd</b>: automatiseren met een timer (plus/min, tafels, deeltafels).</li>
    <li><b>Toets</b>: 10 of 20 vragen met een cijfer en een nakijklijst.</li>
    <li><b>Methode</b>: oefeningen per blok van Wereld in getallen, Pluspunt en Getal &amp; Ruimte Junior.</li>
    <li><b>Toetstraining</b>: oefenen per onderdeel van Cito LIB (M3 t/m E7 en doorstroomtoets) en IEP.</li></ul>
    <p>Elke oefening is een link: deel bijvoorbeeld de link van een oefensessie met een leerling.</p>
    <h2>Beheerst</h2><p>Een soort som telt als <b>beheerst</b> als het kind er van de laatste 8 of meer pogingen minstens 80% in één keer goed had.</p>
    <h2>Privacy</h2><p>Alles wordt alleen op dit apparaat opgeslagen. Er gaat geen informatie naar internet, er zijn geen advertenties en er is geen account nodig.</p>
    <h2>Installeren</h2><p>${NAAM} werkt ook offline. Installeer de app via het menu van je browser ("App installeren" of "Zet op beginscherm").</p>
    <p class="small muted">${NAAM} is niet verbonden aan de genoemde uitgevers of toetsmakers. De koppeling met methodes is een hulpmiddel; controleer bij twijfel met de editie die op school wordt gebruikt.</p></article>`;
}

/* ---------- installeren (PWA) ---------- */
let installEvt = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); installEvt = e; renderInstall(); });
window.addEventListener('appinstalled', () => { installEvt = null; renderInstall(); });
function renderInstall() {
  const box = $('#install');
  if (!box) return;
  const standalone = matchMedia('(display-mode: standalone)').matches || navigator.standalone;
  const ios = /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  if (standalone) { box.innerHTML = ''; return; }
  if (installEvt) {
    box.innerHTML = `<div class="card install"><span class="emoji">📲</span><div><b>Zet ${NAAM} op je tablet of telefoon</b><small>Dan werkt het ook zonder internet.</small></div><button class="btn primary" id="inst">Installeren</button></div>`;
    $('#inst').addEventListener('click', async () => { installEvt.prompt(); await installEvt.userChoice; installEvt = null; renderInstall(); });
  } else if (ios) {
    box.innerHTML = `<div class="card install"><span class="emoji">📲</span><div><b>Zet ${NAAM} op je beginscherm</b><small>Tik op <b>Deel</b> ⬆️ en kies <b>Zet op beginscherm</b>.</small></div></div>`;
  } else box.innerHTML = '';
}

/* naam en logo uit config.js in de bovenbalk en de titel */
document.title = NAAM;
$('.logo').innerHTML = `<span>${LOGO}</span> ${esc(NAAM)}`;
$('.logo').setAttribute('aria-label', `${NAAM}, naar start`);

/* service worker aanzetten: daardoor werkt de app ook offline (zie sw.js) */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

route();
