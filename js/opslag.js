/* Opslag van de voortgang op dit apparaat */

const KEY = 'rekenraket-v2';
export const fresh = () => ({ profile: null, filter: null, stars: 0, ex: {}, tests: {}, timed: {}, games: {}, sound: true, streak: 0, lastDay: null, history: [], counts: { practice: 0, tests: 0, perfect: 0, games: 0, timed: 0 } });
export let S = (() => {
  try {
    const s = Object.assign(fresh(), JSON.parse(localStorage.getItem(KEY)) || {});
    s.counts = Object.assign(fresh().counts, s.counts);
    return s;
  } catch (e) { return fresh(); }
})();
export function save() { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* privé-modus */ } }
/* Alle voortgang wissen, maar het profiel (naam, avatar, groep) houden */
export function wisVoortgang() { const prof = S.profile; S = fresh(); S.profile = prof; save(); }
