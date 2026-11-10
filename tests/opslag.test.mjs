/* Tests voor de opslaglaag: gaat er bij het overzetten nooit voortgang verloren? */
import { laadVoortgang, SLEUTEL, VERSIE } from '../js/opslag.js';

/* Nep-bewaarplek die doet alsof hij localStorage is */
function nepPlek(begin = {}, { kapotBijSchrijven = false } = {}) {
  const m = new Map(Object.entries(begin));
  return { m, lees: k => (m.has(k) ? m.get(k) : null), schrijf: (k, t) => { if (kapotBijSchrijven) return false; m.set(k, t); return true; } };
}
const oudeVoortgang = {
  profile: { name: 'Sem', groep: 5, avatar: '🦊', methode: 'wig' }, filter: 5, stars: 137,
  ex: { 'keer.tafels.t2': { n: 12, ok: 11, last: [1, 1, 1, 1, 1, 1, 1, 1, 0, 1] } }, tests: { 'Tafels': 3 }, timed: {}, games: { 'tafelrace-5': 14 },
  sound: false, streak: 4, lastDay: '2026-11-08', history: [{ t: 'Toets', c: 8.2 }], counts: { practice: 9, tests: 2 }
};

export function testOpslag() {
  const fouten = [];
  const verwacht = (ok, tekst) => { if (!ok) fouten.push(tekst); };

  /* 1. Oude sleutel → wordt overgenomen, oude blijft staan */
  {
    const oudTekst = JSON.stringify(oudeVoortgang);
    const p = nepPlek({ 'rekenraket-v2': oudTekst });
    const { data, bron } = laadVoortgang(p);
    verwacht(bron === 'rekenraket-v2', 'oude sleutel wordt niet herkend');
    verwacht(data.stars === 137 && data.profile.name === 'Sem' && data.ex['keer.tafels.t2'].n === 12, 'voortgang niet goed overgenomen');
    verwacht(data.sound === false && data.streak === 4 && data.history.length === 1 && data.games['tafelrace-5'] === 14, 'instellingen of geschiedenis niet overgenomen');
    verwacht(data.counts.practice === 9 && data.counts.perfect === 0, 'tellers niet goed aangevuld');
    verwacht(data.versie === VERSIE, 'versienummer ontbreekt');
    verwacht(p.m.get('rekenraket-v2') === oudTekst, 'OUDE SLEUTEL IS VERANDERD OF GEWIST');
    verwacht(JSON.parse(p.m.get(SLEUTEL)).stars === 137, 'nieuwe sleutel niet geschreven');
  }
  /* 2. Nieuwe sleutel bestaat al → die wint, oude wordt niet opnieuw ingelezen */
  {
    const p = nepPlek({ 'rekenraket-v2': JSON.stringify(oudeVoortgang), [SLEUTEL]: JSON.stringify({ versie: 3, stars: 200, profile: { name: 'Sem' } }) });
    const { data, bron } = laadVoortgang(p);
    verwacht(bron === SLEUTEL && data.stars === 200, 'nieuwe sleutel krijgt geen voorrang');
  }
  /* 3. Helemaal niets → lege voortgang */
  {
    const { data, bron } = laadVoortgang(nepPlek());
    verwacht(bron === null && data.stars === 0 && data.profile === null, 'lege start klopt niet');
  }
  /* 4. Kapotte nieuwe gegevens → kopie bewaard, terugvallen op oude sleutel */
  {
    const p = nepPlek({ 'rekenraket-v2': JSON.stringify(oudeVoortgang), [SLEUTEL]: '{kapot' });
    const { data } = laadVoortgang(p);
    verwacht(data.stars === 137, 'valt bij kapotte gegevens niet terug op de reservekopie');
    verwacht([...p.m.keys()].some(k => k.startsWith(SLEUTEL + '-kapot-')), 'kapotte gegevens niet bewaard');
  }
  /* 5. Opslaan lukt niet (privé-venster) → app werkt gewoon door met de oude gegevens */
  {
    const p = nepPlek({ 'rekenraket-v2': JSON.stringify(oudeVoortgang) }, { kapotBijSchrijven: true });
    const { data } = laadVoortgang(p);
    verwacht(data.stars === 137, 'werkt niet als opslaan mislukt');
  }
  return fouten;
}
