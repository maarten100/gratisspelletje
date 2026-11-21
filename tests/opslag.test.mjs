/* Tests voor de opslaglaag: gaat er bij het overzetten nooit voortgang verloren? */
import { laadVoortgang, SLEUTEL, VERSIE } from '../js/opslag.js';
import { langsteReeks, reeks, sterren, teller } from '../js/kind.js';

/* Nep-bewaarplek die doet alsof hij localStorage is */
function nepPlek(begin = {}, { kapotBijSchrijven = false } = {}) {
  const m = new Map(Object.entries(begin));
  return { m, lees: k => (m.has(k) ? m.get(k) : null), schrijf: (k, t) => { if (kapotBijSchrijven) return false; m.set(k, t); return true; } };
}
/* Zo zag de voortgang eruit in versie 2 en 3 */
const oudeVoortgang = {
  profile: { name: 'Sem', groep: 5, avatar: '🦊', methode: 'wig' }, filter: 5, stars: 137,
  ex: { 'keer.tafels.t2': { n: 12, ok: 11, last: [1, 1, 1, 1, 1, 1, 1, 1, 0, 1] } }, tests: { 'Tafels': 9 }, timed: { 'tafels-5': 23 },
  games: { 'tafelrace-5': { plays: 3, high: 14 }, 'memory-5': { plays: 2, high: 11 } },
  sound: false, streak: 4, lastDay: '2026-11-08',
  history: [{ title: 'Tafels', score: 9, total: 10, cijfer: 9, date: '2026-11-08', sec: 80 }, { title: 'Breuken', score: 6, total: 10, cijfer: 6, date: '2026-11-02', sec: 120 }],
  counts: { practice: 9, tests: 2 }
};
const kindVan = data => data.kinderen[data.actief];

/* Controleer dat alles van oudeVoortgang goed in het nieuwe formaat staat */
function controleerOvergezet(data, verwacht, wie) {
  const k = kindVan(data);
  verwacht(k && k.profile && k.profile.name === 'Sem' && k.profile.groep === 5, `${wie}: profiel niet overgenomen`);
  verwacht(sterren(k) === 137, `${wie}: sterren niet overgenomen (${sterren(k)})`);
  verwacht(k.ex['keer.tafels.t2'].n === 12 && k.tests.Tafels === 9 && k.timed['tafels-5'] === 23, `${wie}: resultaten niet overgenomen`);
  verwacht(k.games['tafelrace-5'].high === 14 && k.games['memory-5'].lower === true, `${wie}: spelletjes niet goed overgenomen`);
  verwacht(teller(k, 'practice') === 9 && teller(k, 'tests') === 2 && teller(k, 'perfect') === 0, `${wie}: tellers niet goed overgenomen`);
  verwacht(reeks(k.dagen, '2026-11-08') === 4 && langsteReeks(k.dagen) === 4 && k.dagen[0] === '2026-11-05', `${wie}: dagen op rij niet overgenomen (${k.dagen})`);
  verwacht(k.history.length === 2 && k.history.every(h => h.id) && k.history[0].title === 'Tafels', `${wie}: toetsgeschiedenis niet goed overgenomen`);
  verwacht(k.sound === false && k.filter === 5, `${wie}: instellingen niet overgenomen`);
  verwacht(data.versie === VERSIE && data.apparaat, `${wie}: versienummer of apparaatcode ontbreekt`);
}

export function testOpslag() {
  const fouten = [];
  const verwacht = (ok, tekst) => { if (!ok) fouten.push(tekst); };

  /* 1. Versie 2 → wordt overgenomen, oude sleutel blijft staan */
  {
    const oudTekst = JSON.stringify(oudeVoortgang);
    const p = nepPlek({ 'rekenraket-v2': oudTekst });
    const { data, bron } = laadVoortgang(p);
    verwacht(bron === 'rekenraket-v2', 'versie 2 wordt niet herkend');
    controleerOvergezet(data, verwacht, 'versie 2');
    verwacht(p.m.get('rekenraket-v2') === oudTekst, 'SLEUTEL VAN VERSIE 2 IS VERANDERD OF GEWIST');
    verwacht(p.m.has(SLEUTEL) && sterren(kindVan(JSON.parse(p.m.get(SLEUTEL)))) === 137, 'nieuwe sleutel niet goed geschreven');
    /* nog een keer laden: nu uit de nieuwe sleutel, met hetzelfde resultaat */
    const tweede = laadVoortgang(p);
    verwacht(tweede.bron === SLEUTEL && JSON.stringify(tweede.data) === JSON.stringify(data), 'tweede keer laden geeft iets anders');
  }
  /* 2. Versie 3 (met versie 2 ernaast) → versie 3 wint, beide blijven staan */
  {
    const v3 = JSON.stringify({ ...oudeVoortgang, versie: 3 });
    const v2 = JSON.stringify({ ...oudeVoortgang, stars: 5 });
    const p = nepPlek({ 'rekenraket-v2': v2, 'rekenjerot-v3': v3 });
    const { data, bron } = laadVoortgang(p);
    verwacht(bron === 'rekenjerot-v3', 'versie 3 krijgt geen voorrang boven versie 2');
    controleerOvergezet(data, verwacht, 'versie 3');
    verwacht(p.m.get('rekenjerot-v3') === v3 && p.m.get('rekenraket-v2') === v2, 'RESERVEKOPIEËN ZIJN VERANDERD OF GEWIST');
  }
  /* 3. Nieuwe sleutel bestaat al → die wint */
  {
    const p = nepPlek({ 'rekenraket-v2': JSON.stringify(oudeVoortgang) });
    const eerst = laadVoortgang(p).data;
    kindVan(eerst).tellers[eerst.apparaat].stars = 200;
    p.m.set(SLEUTEL, JSON.stringify(eerst));
    const { data, bron } = laadVoortgang(p);
    verwacht(bron === SLEUTEL && sterren(kindVan(data)) === 200, 'nieuwe sleutel krijgt geen voorrang');
  }
  /* 4. Helemaal niets → één leeg kind */
  {
    const { data, bron } = laadVoortgang(nepPlek());
    const k = kindVan(data);
    verwacht(bron === null && k && k.profile === null && sterren(k) === 0 && k.dagen.length === 0, 'lege start klopt niet');
  }
  /* 5. Kapotte nieuwe gegevens → kopie bewaard, terugvallen op de oude sleutel */
  {
    const p = nepPlek({ 'rekenraket-v2': JSON.stringify(oudeVoortgang), [SLEUTEL]: '{kapot' });
    const { data } = laadVoortgang(p);
    verwacht(sterren(kindVan(data)) === 137, 'valt bij kapotte gegevens niet terug op de reservekopie');
    verwacht([...p.m.keys()].some(k => k.startsWith(SLEUTEL + '-kapot-')), 'kapotte gegevens niet bewaard');
  }
  /* 6. Opslaan lukt niet (privé-venster) → app werkt gewoon door met de oude gegevens */
  {
    const p = nepPlek({ 'rekenraket-v2': JSON.stringify(oudeVoortgang) }, { kapotBijSchrijven: true });
    const { data } = laadVoortgang(p);
    verwacht(sterren(kindVan(data)) === 137, 'werkt niet als opslaan mislukt');
  }
  return fouten;
}
