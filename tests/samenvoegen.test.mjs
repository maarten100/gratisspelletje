/* Tests voor de samenvoegregels (js/kind.js): twee apparaten hebben los van elkaar geoefend. */
import { langsteReeks, nieuwKind, reeks, sterren, teller, voegSamen } from '../js/kind.js';

/* Alleen de velden die tussen apparaten gedeeld worden (geluid en filter blijven per apparaat) */
const gedeeld = k => JSON.stringify({ ...k, sound: null, filter: null });

/* Twee apparaten (A en B) met hetzelfde kind, dat eerst op A geoefend heeft en daarna op allebei */
function voorbeeld() {
  const basis = nieuwKind('kind-1');
  basis.profile = { name: 'Noor', groep: 4, avatar: '🐼', methode: '' }; basis.profielTijd = 1000;
  basis.ex = { 'plus.tot10': { n: 10, ok: 9, last: [1, 1, 1, 1, 1, 1, 1, 1, 0, 1] } };
  basis.tellers = { A: { stars: 50, practice: 5, tests: 1, perfect: 0, games: 0, timed: 0 } };
  basis.dagen = ['2026-11-01', '2026-11-02'];
  basis.history = [{ id: 'h1', t: 100, title: 'Plus', score: 8, total: 10, cijfer: 8, date: '2026-11-01' }];
  basis.games = { 'memory-4': { plays: 1, high: 14, lower: true }, 'tafelrace-4': { plays: 1, high: 10 } };
  basis.tests = { Plus: 8 };

  const a = structuredClone(basis), b = structuredClone(basis);
  /* op A: 4 pogingen erbij, 10 sterren, nieuwe dag, een toets */
  a.ex['plus.tot10'] = { n: 14, ok: 13, last: [1, 1, 1, 1, 1, 1, 0, 1, 1, 1] };
  a.tellers.A = { ...a.tellers.A, stars: 60, practice: 6 };
  a.dagen.push('2026-11-03');
  a.history.unshift({ id: 'h2', t: 300, title: 'Min', score: 10, total: 10, cijfer: 10, date: '2026-11-03' });
  a.games['memory-4'] = { plays: 2, high: 12, lower: true };
  a.sound = false;
  /* op B (offline): 2 pogingen bij een andere oefening, 7 sterren, andere dag, een toets, profiel gewijzigd */
  b.ex['min.tot10'] = { n: 2, ok: 1, last: [0, 1] };
  b.tellers.B = { stars: 7, practice: 1, tests: 1, perfect: 1, games: 0, timed: 0 };
  b.dagen.push('2026-11-04');
  b.history.unshift({ id: 'h3', t: 200, title: 'Keer', score: 10, total: 10, cijfer: 10, date: '2026-11-04' });
  b.profile = { ...b.profile, groep: 5 }; b.profielTijd = 2000;
  b.games['tafelrace-4'] = { plays: 3, high: 17 };
  b.tests = { Plus: 9 };
  return { a, b };
}

export function testSamenvoegen() {
  const fouten = [];
  const verwacht = (ok, tekst) => { if (!ok) fouten.push(tekst); };
  const { a, b } = voorbeeld();
  const ab = voegSamen(a, b), ba = voegSamen(b, a);

  verwacht(gedeeld(ab) === gedeeld(ba), 'A met B samenvoegen geeft iets anders dan B met A');
  verwacht(gedeeld(voegSamen(ab, ab)) === gedeeld(ab), 'twee keer hetzelfde samenvoegen verandert iets');
  verwacht(gedeeld(voegSamen(voegSamen(ab, a), b)) === gedeeld(ab), 'opnieuw samenvoegen met oude versies verandert iets');

  verwacht(sterren(ab) === 67, `sterren tellen dubbel of raken kwijt (${sterren(ab)} in plaats van 50 + 10 + 7 = 67)`);
  verwacht(teller(ab, 'practice') === 7 && teller(ab, 'tests') === 2 && teller(ab, 'perfect') === 1, 'tellers kloppen niet');
  verwacht(ab.ex['plus.tot10'].n === 14 && ab.ex['min.tot10'].n === 2, 'per oefening wint niet de versie met de meeste pogingen');
  verwacht(ab.dagen.join() === '2026-11-01,2026-11-02,2026-11-03,2026-11-04', `dagen niet goed samengevoegd (${ab.dagen})`);
  verwacht(reeks(ab.dagen, '2026-11-04') === 4 && langsteReeks(ab.dagen) === 4, 'dagen op rij kloppen niet na samenvoegen');
  verwacht(ab.history.map(h => h.id).join() === 'h2,h3,h1', `toetsgeschiedenis niet goed (${ab.history.map(h => h.id)})`);
  verwacht(ab.profile.groep === 5, 'de laatste profielwijziging wint niet');
  verwacht(ab.games['memory-4'].high === 12 && ab.games['tafelrace-4'].high === 17 && ab.games['tafelrace-4'].plays === 3, 'spelrecords niet goed (bij Memory is lager beter)');
  verwacht(ab.tests.Plus === 9, 'hoogste toetscijfer wint niet');
  verwacht(ab.sound === false && ba.sound === true, 'geluid hoort per apparaat te blijven');

  /* dagen op rij */
  verwacht(reeks(['2026-11-01', '2026-11-02'], '2026-11-03') === 2, 'reeks tot gisteren telt niet mee');
  verwacht(reeks(['2026-11-01', '2026-11-02'], '2026-11-04') === 0, 'onderbroken reeks telt nog mee');
  verwacht(reeks(['2026-03-28', '2026-03-29', '2026-03-30'], '2026-03-30') === 3, 'reeks over de zomertijd heen klopt niet');
  verwacht(langsteReeks(['2026-01-01', '2026-01-02', '2026-01-03', '2026-02-01']) === 3, 'langste reeks klopt niet');
  return fouten;
}
