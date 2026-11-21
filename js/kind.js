/* Het gegevensformaat van één kind: aanmaken, oude gegevens omzetten, samenvoegen en tellen.

   Alles hier is "puur": geen browser, geen opslag. Daardoor kunnen de tests het zonder browser
   controleren, en kan de server later dezelfde regels gebruiken.

   Eén kind ziet er zo uit:
   {
     id,                         vaste code van dit kind (ook straks op de server)
     profile, profielTijd,       naam, groep, avatar, methode + wanneer dat voor het laatst veranderd is
     ex:    { oefening: { n, ok, last } }     pogingen, in één keer goed, laatste 10 (1 = goed)
     tests: { toets: hoogste cijfer (0-10) }
     timed: { oefening: hoogste aantal goed }
     games: { spel-groep: { plays, high, lower } }   lower = lager is beter (Memory: minder beurten)
     dagen: [ 'jjjj-mm-dd', ... ]  de dagen waarop de app gebruikt is (oud → nieuw)
     history: [ { id, t, title, score, total, cijfer, date, sec } ]   gemaakte toetsen (nieuw → oud)
     tellers: { apparaat: { stars, practice, tests, perfect, games, timed } }
                                 sterren en tellers houdt elk apparaat apart bij (zie samenvoegen)
     sound, filter               alleen voor dit apparaat; gaan niet mee naar andere apparaten
   }

   SAMENVOEGREGELS (als twee apparaten los van elkaar geoefend hebben):
   - per oefening telt de versie met de meeste pogingen;
   - sterren en tellers: per apparaat het hoogste getal, en het totaal is de optelsom van alle
     apparaten. Zo telt niets dubbel, hoe vaak je ook samenvoegt;
   - dagen: alle dagen van beide samen, elke dag één keer;
   - toetsgeschiedenis: samen, zonder dubbelingen (elke toets heeft een eigen id);
   - records (toetscijfer, op tijd, spelletjes): het beste telt;
   - naam, avatar, groep en methode: de laatste wijziging telt;
   - geluid en filter: die van dit apparaat blijven. */

export const TELLERS = ['stars', 'practice', 'tests', 'perfect', 'games', 'timed'];
const MAX_DAGEN = 400, MAX_GESCHIEDENIS = 50;

/* Een willekeurige code (zelfde vorm als een "uuid"). Werkt ook op een gewoon http-adres. */
export function nieuwId() {
  const b = crypto.getRandomValues(new Uint8Array(16));
  b[6] = (b[6] & 0x0f) | 0x40; b[8] = (b[8] & 0x3f) | 0x80;
  const h = [...b].map(x => x.toString(16).padStart(2, '0')).join('');
  return `${h.slice(0, 8)}-${h.slice(8, 12)}-${h.slice(12, 16)}-${h.slice(16, 20)}-${h.slice(20)}`;
}

/* Een nieuw, leeg kind */
export const nieuwKind = (id = nieuwId()) => ({
  id, profile: null, profielTijd: 0, ex: {}, tests: {}, timed: {}, games: {}, dagen: [], history: [], tellers: {},
  sound: true, filter: null
});

/* ---------- tellen ---------- */
export const teller = (kind, naam) => Object.values(kind.tellers || {}).reduce((som, t) => som + (+t[naam] || 0), 0);
export const sterren = kind => teller(kind, 'stars');

/* Rekenen met datums als 'jjjj-mm-dd' (in hele dagen, zonder last van zomer- en wintertijd) */
const dagNr = d => Date.UTC(+d.slice(0, 4), +d.slice(5, 7) - 1, +d.slice(8, 10)) / 864e5;
const naarDatum = nr => new Date(nr * 864e5).toISOString().slice(0, 10);

/* Dagen op rij tot en met vandaag (of gisteren, als er vandaag nog niet geoefend is) */
export function reeks(dagen, vandaag) {
  const set = new Set((dagen || []).map(dagNr));
  let d = dagNr(vandaag);
  if (!set.has(d)) d--;
  let n = 0;
  while (set.has(d)) { n++; d--; }
  return n;
}
/* De langste reeks ooit (voor de badges: een verdiende badge gaat niet meer weg) */
export function langsteReeks(dagen) {
  const nrs = [...new Set((dagen || []).map(dagNr))].sort((a, b) => a - b);
  let best = 0, n = 0;
  nrs.forEach((d, i) => { n = i && d === nrs[i - 1] + 1 ? n + 1 : 1; best = Math.max(best, n); });
  return best;
}

/* ---------- oude gegevens (versie 2 en 3) omzetten ---------- */
/* Kleine vaste "vingerafdruk" van een stuk tekst, voor id's van oude toetsen */
function hash(tekst) {
  let h = 2166136261;
  for (let i = 0; i < tekst.length; i++) h = Math.imul(h ^ tekst.charCodeAt(i), 16777619);
  return (h >>> 0).toString(36);
}

export function uitOudFormaat(oud, apparaat, id = nieuwId()) {
  const k = nieuwKind(id);
  oud = oud || {};
  if (oud.profile) { k.profile = oud.profile; k.profielTijd = 1; }
  for (const veld of ['ex', 'tests', 'timed']) if (oud[veld] && typeof oud[veld] === 'object') k[veld] = oud[veld];
  for (const [sleutel, w] of Object.entries(oud.games || {})) {
    const r = typeof w === 'number' ? { plays: 1, high: w } : { ...w };
    if (sleutel.startsWith('memory-')) r.lower = true;
    k.games[sleutel] = r;
  }
  /* dagen op rij: de laatste dag en de dagen ervoor die bij de reeks hoorden */
  if (typeof oud.lastDay === 'string' && /^\d{4}-\d\d-\d\d$/.test(oud.lastDay)) {
    const laatste = dagNr(oud.lastDay), n = Math.max(1, Math.min(+oud.streak || 1, MAX_DAGEN));
    for (let i = n - 1; i >= 0; i--) k.dagen.push(naarDatum(laatste - i));
  }
  k.history = (Array.isArray(oud.history) ? oud.history : []).map((h, i) => ({
    ...h, id: h.id || 'oud-' + hash(i + JSON.stringify(h)), t: h.t || (h.date ? Date.parse(h.date + 'T12:00:00Z') - i : 0)
  }));
  const c = oud.counts || {};
  k.tellers[apparaat] = { stars: +oud.stars || 0, practice: +c.practice || 0, tests: +c.tests || 0, perfect: +c.perfect || 0, games: +c.games || 0, timed: +c.timed || 0 };
  if (oud.sound === false) k.sound = false;
  if (oud.filter != null) k.filter = oud.filter;
  return k;
}

/* Vul ontbrekende velden aan, zodat oudere of halve gegevens ook werken */
export function aanvullenKind(k) {
  const s = Object.assign(nieuwKind(k && k.id), k || {});
  for (const veld of ['ex', 'tests', 'timed', 'games', 'tellers']) if (!s[veld] || typeof s[veld] !== 'object' || Array.isArray(s[veld])) s[veld] = {};
  for (const veld of ['dagen', 'history']) if (!Array.isArray(s[veld])) s[veld] = [];
  return s;
}

/* ---------- samenvoegen ---------- */
/* Vaste volgorde bij gelijkspel, zodat samenvoegen(a, b) en samenvoegen(b, a) hetzelfde opleveren */
const kiesVast = (a, b) => (JSON.stringify(a) >= JSON.stringify(b) ? a : b);

function perSleutel(a, b, kies) {
  const uit = {};
  for (const s of new Set([...Object.keys(a || {}), ...Object.keys(b || {})])) {
    const x = a && a[s], y = b && b[s];
    uit[s] = x === undefined ? y : y === undefined ? x : kies(x, y, s);
  }
  return uit;
}

export function voegSamen(hier, daar) {
  hier = aanvullenKind(hier); daar = aanvullenKind(daar);
  const uit = nieuwKind(hier.id);

  /* profiel: de laatste wijziging telt */
  const profielBron = hier.profielTijd !== daar.profielTijd ? (hier.profielTijd > daar.profielTijd ? hier : daar)
    : kiesVast(hier, daar) === hier ? hier : daar;
  uit.profile = profielBron.profile; uit.profielTijd = profielBron.profielTijd;
  if (!uit.profile) { uit.profile = hier.profile || daar.profile; }

  /* per oefening: de meeste pogingen */
  uit.ex = perSleutel(hier.ex, daar.ex, (x, y) => ((x.n || 0) !== (y.n || 0) ? ((x.n || 0) > (y.n || 0) ? x : y) : kiesVast(x, y)));
  /* records: het beste */
  uit.tests = perSleutel(hier.tests, daar.tests, (x, y) => Math.max(+x || 0, +y || 0));
  uit.timed = perSleutel(hier.timed, daar.timed, (x, y) => Math.max(+x || 0, +y || 0));
  uit.games = perSleutel(hier.games, daar.games, (x, y, s) => {
    const lower = !!(x.lower || y.lower || s.startsWith('memory-'));
    const highs = [x.high, y.high].filter(h => h != null);
    const r = { plays: Math.max(x.plays || 0, y.plays || 0) };
    if (highs.length) r.high = lower ? Math.min(...highs) : Math.max(...highs);
    if (lower) r.lower = true;
    return r;
  });
  /* dagen: allebei, elke dag één keer */
  uit.dagen = [...new Set([...hier.dagen, ...daar.dagen])].sort().slice(-MAX_DAGEN);
  /* toetsen: allebei, zonder dubbelingen, nieuwste eerst */
  const perId = new Map();
  for (const h of [...hier.history, ...daar.history]) if (!perId.has(h.id)) perId.set(h.id, h);
  uit.history = [...perId.values()].sort((x, y) => (y.t || 0) - (x.t || 0) || String(y.id).localeCompare(String(x.id))).slice(0, MAX_GESCHIEDENIS);
  /* tellers: per apparaat het hoogste getal */
  uit.tellers = perSleutel(hier.tellers, daar.tellers, (x, y) => Object.fromEntries(TELLERS.map(n => [n, Math.max(+x[n] || 0, +y[n] || 0)])));
  /* alleen voor dit apparaat */
  uit.sound = hier.sound; uit.filter = hier.filter;
  return uit;
}
