/* Voortgang: dagen op rij, sterren, resultaten per oefening en beheersing */
import { updateTop } from './scherm.js';
import { S, save } from './opslag.js';

export const today = (d = new Date()) => d.toLocaleDateString('sv');
export function touchDay() {
  const t = today();
  if (S.lastDay === t) return;
  S.streak = S.lastDay === today(new Date(Date.now() - 864e5)) ? S.streak + 1 : 1;
  S.lastDay = t; save();
}
export function addStars(n) { if (n > 0) { S.stars += n; save(); updateTop(); } }
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
