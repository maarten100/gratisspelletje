/* Voortgang: dagen op rij, sterren, tellers, resultaten per oefening en beheersing */
import { updateTop } from './scherm.js';
import { APPARAAT, S, save } from './opslag.js';
import { TELLERS, langsteReeks, nieuwId, reeks, sterren, teller } from './kind.js';

export const today = (d = new Date()) => d.toLocaleDateString('sv');

/* Vandaag telt als een dag waarop gerekend is */
export function touchDay() {
  const t = today();
  if (S.dagen.includes(t)) return;
  S.dagen.push(t); S.dagen.sort(); save();
}
export const dagenOpRij = () => reeks(S.dagen, today());
export const langsteDagenOpRij = () => langsteReeks(S.dagen);

/* Tellers en sterren: elk apparaat houdt zijn eigen tellers bij (zie kind.js, samenvoegregels) */
export function tel(naam, n = 1) {
  const t = S.tellers[APPARAAT] = S.tellers[APPARAAT] || Object.fromEntries(TELLERS.map(x => [x, 0]));
  t[naam] = (t[naam] || 0) + n;
  save();
}
export const aantal = naam => teller(S, naam);
export const aantalSterren = () => sterren(S);
export function addStars(n) { if (n > 0) { tel('stars', n); updateTop(); } }

/* Een gemaakte toets bewaren in de geschiedenis (nieuwste eerst, maximaal 50) */
export function bewaarToets(toets) {
  S.history.unshift({ id: nieuwId(), t: Date.now(), ...toets });
  S.history = S.history.slice(0, 50);
  save();
}

export function record(id, ok) {
  const r = S.ex[id] = S.ex[id] || { n: 0, ok: 0, last: [] };
  r.n++; if (ok) r.ok++;
  r.last = (r.last || []).concat(ok ? 1 : 0).slice(-10);
  save();
}
/* beheersing: 0 = nog niet, 1 = bezig, 2 = beheerst (laatste 8+ pogingen ≥ 80% goed) */
export function mastery(id) {
  const r = S.ex[id];
  if (!r || !r.n) return 0;
  const l = r.last || [];
  return l.length >= 8 && l.reduce((s, x) => s + x, 0) / l.length >= 0.8 ? 2 : 1;
}
export const starStr = n => '★'.repeat(n) + '☆'.repeat(3 - n);
export const gradeStars = norm => (norm >= 10 ? 3 : norm >= 8 ? 2 : norm >= 6 ? 1 : 0);
export const inGroep = (groups, g) => !g || (groups || []).includes(g);
